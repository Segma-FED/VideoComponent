# VideoComponent
## 简介
Easy Sense视频直播Vue组件（WebRtc版）

## 仓库地址
https://github.com/Segma-FED/VideoComponent

## 快速开始
### 1.安装（需要设置npm源为npm.segma.tech）
```shell script
npm i @segma/video-component
```

### 2.项目中使用
```javascript
import {VideoComponent, playStatus, playErrors} from '@segma/video-component';
```

```vue
<video-component    :device-id="17"
                    :service-ip="'10.76.7.8'"
                    :service-port="30886"></video-component>
```

## 组件参数
| 参数 | 类型 | 必填 | 说明 | 默认值 |  
| ------ | ------ | ------ | ----- | ----- |
| deviceId | Number | 是| 相机ID  | |
| serviceIp | String | 是| 服务器IP | |
| serviceIp | Number | 是| 服务器端口  | -1 |
| autoPlay | Boolean | 否 | 自动播放  | true |
| playIndex | Number | 否| 用于区分播放窗口的索引，在状态监听的回调函数中会传参 | deviceId |
| showLog | Boolean | 否  | 播放器是否打印日志 | false |
| timeout | Number | 否  | 超时时间，视频加载超过该时间，状态会变为ERROR，默认三分钟 | 3 * 60 |
| changePlayState(playState,errorState) | Function | 否  | 播放器状态改变回调 | |

### playStatus
| 参数 | 值 | 说明 | 
| ------ | ------ | ------ |
| UNINITIALIZED | 'UNINITIALIZED' | 尚未初始化 | 
| INITIALIZED | 'INITIALIZED' | 已经初始未播放 | 
| ON_PLAY | 'ON_PLAY' | 正常播放 | 
| PAUSED | 'PAUSED' | 正常暂停 | 
| LOADING | 'LOADING' | 加载中 | 
| ERROR | 'ERROR' | 错误状态 | 

### playErrors
| 参数 | 值 | 说明 | 
| ------ | ------ | ------ |
| PLAY_FAIL | 'PLAY_FAIL' | 播放失败 | 
| UNKNOWN | 'UNKNOWN' | 未知错误 | 

## 组件函数
除了以上参数外，组件还提供了`play()`、`stop()`、`forceReplay()`三个接口用于手动控制视频，**一般情况下是用不到的**。
| 函数名 | 说明 |
| ------ | ------ | ------ |
| play | 开始直播 |
| stop | 暂停直播 |
| forceReplay | 强制播放：销毁播放器 =》创建播放器 =》开始直播，慎用 |

**特别提醒：** 由于视频组件源码原因，本组件会默认在全局环境中引入jQuery 3.5.1，如果有冲突请谨慎使用。

