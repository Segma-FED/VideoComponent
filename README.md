# VideoComponent
## 简介
Easy Sense视频直播Vue组件

## 仓库地址
https://github.com/Segma-FED/VideoComponent

## 快速开始
### 1.安装（需要设置npm源为npm.segma.tech）
```shell script
npm i @segma/video-component
```

### 2.项目中使用
```javascript
import VideoComponent from '@segma/video-component';
```

```vue
<video-component :auto-play="true"
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

**特别提醒：** 由于视频组件源码原因，本组件会默认在全局环境中引入jQuery 3.5.1，如果有冲突请谨慎使用。

