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
    // components: {},
    // directives: {},
    // filters: {},
    // model: {},
    props: {
        // 播放模式，实时播放和点播
        mode: {
            type: String,
            required: false,
            default: 'realPlay',
            validator: (value) => {
                return ['realPlay', 'backPlay'].indexOf(value) !== -1;
            }
        },
        // 自动播放，组件在初始化完毕后自动加载视频并播放
        autoPlay: {
            type: Boolean,
            default: false
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
        // 文件ID，点播模式下为必须
        fileId: {
            type: String,
            required: false,
            default: ''
        },
        // 底层平台的IP
        serviceIp: {
            type: String,
            default: ''
        },
        // 底层平台的端口
        servicePort: {
            type: Number,
            default: -1
        },
        showLog: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            playId: -1,
            playState: -1,
            errorState: '',
            // 是否已经断网
            isOffline: false
        };
    },
    computed: {
        netClient() {
            return window.NetClient;
        },
        _playIndex() {
            let index = this.playIndex === undefined ? `${this.deviceId}-${uid()}` : this.playIndex;
            return this.mode === 'backPlay' ? `${String(index)}-backplay` : String(index);
        },
        // 联合ID，通过deviceId和fileId改变重新加载相机
        jointId() {
            return `${this.deviceId}-${this.fileId}`;
        },
        hasInit() {
            return this.playState !== playStatus.UNINITIALIZED;
        },
        // deviceId为合规的
        deviceIdValid() {
            return this.deviceId > 0;
        },
        // fileId为合规的
        fileIdValid() {
            return this.fileId !== '' && typeof this.fileId !== 'undefined';
        }
    },
    watch: {
        jointId() {
            // console.log('jointId changed', val);
            this.createPlayer();
        },
        playState(val) {
            // console.log('播放状态改变', val);
            this.$emit('changePlayState', val);
            // 如果播放器准备就绪且自动播放，则播放
            if (val === playStatus.INITIALIZED && this.autoPlay) {
                this.play();
            }
        }
    },
    mounted() {
        this.createPlayer();
        window.addEventListener("online", this.play);
        this.$once('hook:beforeDestroy', () => {
            window.removeEventListener("online", this.play);
        });
    },
    beforeDestroy() {
        this.releasePlayer();
    },
    // destroyed() {},
    methods: {
        setPlayState(val, err = playErrors.UNKNOWN) {
            this.playState = val;
            this.errorState = val === playStatus.ERROR ? err : '';
        },
        /**
         * 创建播放器
         * */
        createPlayer() {
            if (this.hasInit) {
                this.releasePlayer();
            }
            // 如果这里需要watch到 UNINITIALIZED => INITIALIZED的转变才能play：如果播放器在createPlayer之前为INITIALIZED状态而没有使用$nextTick则监听不到变化，无法执行play函数
            this.$nextTick(() => {
                if (!this.deviceIdValid) {
                    return;
                }
                this.playId = this.netClient.CreatePlayer(this.$refs.videoWrapper, this._playIndex, this.playerCallBack);
                this.log('创建播放器');
                this.setPlayState(this.playId > 0 ? playStatus.INITIALIZED : this.UNINITIALIZED);
            });
        },
        /**
         * 播放器状态改变回调
         * */
        playerCallBack(event) {
            this.log('event.type', event.type);
            switch (event.type) {
                case 1://请求视频流失败，视频链接断开
                    this.setPlayState(playStatus.ERROR, playErrors.BREAK_OFF);
                    this.play();
                    break;
                case 2://视频流来了
                    this.setPlayState(playStatus.ON_PLAY);
                    break;
                case 3://视频流中断
                    this.setPlayState(playStatus.LOADING);
                    this.play();
                    break;
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
                this.log('init player first');
                return;
            }
            if (!this.deviceIdValid) {
                this.setPlayState(playStatus.ERROR, playErrors.INCOMPLETE_PARAMETERS);
                this.log('play need playId and deviceId');
                return;
            }
            this.setMute();
            this.playFun = this.mode === 'realPlay' ? this.startRealPlay : this.startBackPlay;
            if (this.playFun() < 0) {
                this.setPlayState(playStatus.ERROR, playErrors.PLAY_FAIL);
            }
            this.log('this.playState', this.playState);
        },
        /**
         * 根据index和playId开始直播
         * */
        startRealPlay() {
            this.log('开始直播');
            return this.netClient.StartRealPlay(
                this.playId,
                this.deviceId,
                this.serviceIp,
                this.servicePort
            );
        },
        /**
         * 根据index，playId，filedId开始点播
         * */
        startBackPlay() {
            if (!this.fileIdValid) {
                this.setPlayState(playStatus.ERROR, playErrors.INCOMPLETE_PARAMETERS);
                return;
            }
            this.log('开始点播');
            return this.netClient.StartBackPlay(
                this.playId,
                this.deviceId,
                this.fileId
            );
        },
        /**
         * 根据playId暂停播放
         * */
        stopPlay() {
            this.log('暂停播放', this.playId);
            this.netClient.StopPlay(this.playId);
            this.setPlayState(playStatus.PAUSED);
        },
        /**
         * 销毁播放器
         * */
        releasePlayer() {
            if (this.hasInit) {
                this.log('释放播放器');
                this.netClient.ReleasePlayer(this.playId);
                this.setPlayState(playStatus.UNINITIALIZED);
            } else {
                this.log(`palyer doesn't init yet`);
            }
        },
        /**
         * 打印日志
         * */
        log() {
            if (this.showLog) {
                console.log(Array.from(arguments).join())
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
