<!--视频直播/点播组件-->
<template>
    <div ref="videoWrapper"
         class="base-video-wrapper">
    </div>
</template>

<script>
import { uid } from '@segma/snippet';
import { playStatus, playErrors } from '@/utils/constant';
import $ from 'jquery'

!window.$ && (window.$ = $);
const NetClient = require('../../public/net_client/NETClient');
if (!window.NetClientInitialized) {
    window.NetClient = NetClient;
    NetClient.Init();
    window.NetClientInitialized = true;
}
export default {
    name: 'BaseVideo',
    props: {
        // 自动播放，组件在初始化完毕后自动加载视频并播放
        autoPlay: {
            required: false,
            type: Boolean,
            default: true
        },
        // 相机ID
        deviceId: {
            required: true,
            type: Number
        },
        // 用于区分播放窗口的索引，在状态监听的回调函数中会传参，默认为deviceId
        playIndex: {
            type: Number,
            required: false
        },
        // 底层平台的IP
        serviceIp: {
            required: true,
            type: String,
            default: ''
        },
        // 底层平台的端口
        servicePort: {
            required: true,
            type: Number,
            default: -1
        },
        // 是否展示日志
        showLog: {
            required: false,
            type: Boolean,
            default: false
        },
        // 超时时间，默认三分钟（s为单位）
        timeout: {
            required: false,
            type: Number,
            default: 60 * 3
        }
    },
    data() {
        return {
            playId: -1,
            playState: playStatus.UNINITIALIZED,
            errorState: '',
            loadingTimer: null // 用于控制加载超时的定时器
        };
    },
    computed: {
        netClient() {
            return window.NetClient;
        },
        _playIndex() {
            let index = this.playIndex === undefined ? `${this.deviceId}-${uid()}` : this.playIndex;
            return String(index);
        },
        hasInit() {
            return this.playState !== playStatus.UNINITIALIZED;
        }
    },
    watch: {
        deviceId() {
            this.createPlayer();
        },
        playState(status) {
            this.log('Status changed', status)
            this.$emit('changePlayState', status, this.errorState);
            if (status === playStatus.INITIALIZED && this.autoPlay) {
                this.play();
            } else if (status === playStatus.LOADING) {
                this.startTimer();
                // this.play();
            } else if (status === playStatus.ON_PLAY) {
                this.clearTimer();
            } else if (status === playStatus.PAUSED) {
                this.clearTimer();
            } else if (status === playStatus.ERROR) {
                this.clearTimer();
            }
        }
    },
    mounted() {
        this.createPlayer();
        window.addEventListener("online", this.play);
        this.$once('hook:beforeDestroy', () => {
            window.removeEventListener("online", this.play);
            this.releasePlayer();
        });
    },
    methods: {
        setPlayState(status, err = playErrors.UNKNOWN) {
            this.playState = status;
            this.errorState = status === playStatus.ERROR ? err : '';
        },
        /**
         * 创建播放器
         * */
        async createPlayer() {
            if (this.hasInit) {
                this.releasePlayer();
            }
            await this.$nextTick();
            this.playId = this.netClient.CreatePlayer(this.$refs.videoWrapper, this._playIndex, this.playerCallBack);
            this.log('Create player');
            this.setPlayState(this.playId > 0 ? playStatus.INITIALIZED : this.UNINITIALIZED);
        },
        /**
         * 播放器状态改变回调
         * */
        playerCallBack(event) {
            // console.log('event.type', event.type);
            switch (event.type) {
                case 1:// 请求视频流失败，视频链接断开
                    this.setPlayState(playStatus.ERROR, playErrors.PLAY_FAIL);
                    break;
                case 2:// 视频流来了
                    this.setPlayState(playStatus.ON_PLAY);
                    break;
                case 3:// 视频流加载中
                    this.setPlayState(playStatus.LOADING);
                    break;
            }
        },
        startTimer() {
            this.clearTimer();
            this.loadingTimer = setTimeout(() => {
                this.log('Time out');
                this.setPlayState(playStatus.ERROR, playErrors.PLAY_FAIL)
            }, this.timeout * 1000)
        },
        clearTimer() {
            if (this.loadingTimer) {
                clearTimeout(this.loadingTimer)
                this.loadingTimer = null
            }
        },
        /**
         * 设置播放器静音
         * */
        setMute() {
            let videoDom = this.$refs.videoWrapper.getElementsByTagName("video")[0];
            if (videoDom) {
                videoDom.muted = true;
            }
        },
        play() {
            if (this.playState === playStatus.UNINITIALIZED) {
                this.log('Init player first');
                return;
            }
            this.setMute();
            this.log('Start live broadcast');
            let realPlayResult = this.netClient.StartRealPlay(
                this.playId,
                this.deviceId,
                this.serviceIp,
                this.servicePort
            );
            if (realPlayResult < 0) {
                this.setPlayState(playStatus.ERROR, playErrors.PLAY_FAIL);
            }
        },
        /**
         * 根据playId暂停播放
         * */
        pause() {
            this.log('Pause playback');
            this.netClient.StopPlay(this.playId);
            this.setPlayState(playStatus.PAUSED);
        },
        /**
         * 销毁播放器
         * */
        releasePlayer() {
            if (this.hasInit) {
                this.log('Release player');
                this.netClient.ReleasePlayer(this.playId);
                this.setPlayState(playStatus.UNINITIALIZED);
            } else {
                this.log('Player doesn\'t init yet');
            }
        },
        /**
         * 强制重新播放
         * */
        async forceReplay() {
            this.releasePlayer();
            await this.$nextTick();
            this.play();
        },
        /**
         * 打印日志
         * */
        log() {
            if (this.showLog) {
                console.log(`视频组件：${this._playIndex} - ${JSON.stringify(Array.from(arguments).join())}`)
            }
        }
    }
};
</script>

<style lang="less"
       scoped>
.base-video-wrapper {
    width: 100%;
    height: 100%;

    /deep/ video {
        background: transparent !important;
    }
}
</style>
