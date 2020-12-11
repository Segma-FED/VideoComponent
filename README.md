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
<video-component    :auto-play="true"
                    :device-id="17"
                    :service-ip="'10.76.7.8'"
                    :service-port="30886"></video-component>
```

## 组件参数
| 参数 | 类型 | 说明 | 必填 | 默认值 |  
| ------ | ------ | ------ | ----- | ----- |
| mode | String | 播放器模式（'realPlay'直播, 'backPlay'点播） | 否 | 'realPlay' |
| autoPlay | Boolean | 自动播放 | 否 | false |
| deviceId | Number | 相机ID | 是 | |
| playIndex | Number | 用于区分播放窗口的索引，在状态监听的回调函数中会传参 | 否 | deviceId |
| fileId | String | 文件ID，点播模式下为必须 | 否 | '' |
| serviceIp | String | 服务器IP | 是 | |
| serviceIp | Number | 服务器端口 | 是 | -1 |
| showLog | Boolean | 播放器是否打印日志 | 否 | false |
| changePlayState(playState,errorState) | Function | 播放器状态改变回调 | 否 | |

### playStatus
| 参数 | 值 | 说明 | 
| ------ | ------ | ------ |
| UNINITIALIZED | -1 | 尚未初始化 | 
| INITIALIZED | 10 | 已经初始未播放 | 
| ON_PLAY | 20 | 正常播放 | 
| PAUSED | 30 | 正常暂停 | 
| LOADING | 40 | 加载中 | 
| ERROR | 50 | 错误状态 | 

### playErrors
| 参数 | 值 | 说明 | 
| ------ | ------ | ------ |
| INCOMPLETE_PARAMETERS | 300 | 不完整参数，如：没有fileId | 
| PLAY_FAIL | 400 | 播放失败 | 
| BREAK_OFF | 500 | 中断，如：视频链接中断 | 
| UNKNOWN | 600 | 未知错误 | 

**特别提醒：** 由于视频组件源码原因，本组件会默认在全局环境中引入jQuery 3.5.1，如果有冲突请谨慎使用。

