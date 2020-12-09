# NetClient.js

## 引入方式
```html
<!--public/index.html-->
<script src="<%= BASE_URL %>NetClient.js"></script>
```

或

```javascript
let NetClient = require('../../public/net_client/NetClient');
```

**注意：文件名/文件内容/内容格式不可改变，否则会报错**

## 使用

### NetClient.Init()
例：
```javascript
NetClient.Init();
```

### NetClient.CreatePlayer(dom, index, callback);
创建播放器
| Param  | Type                | Description  |  
| ------ | ------------------- | ------------ |  
| dom  | <code>Object</code> | 播放器video标签父级容器 |  
| index | <code>Number</code> | 用于区分播放窗口的索引，callback回调会传递 |  
| callback | <code>Function</code> | 回调函数，函数参数<code>{type,index,reason}</code> |  
| @Return | <code>Number</code> | 返回值，小于0失败，大于等于为playId |  

callback例：
```javascript
function PlayerCallBack(event){
    switch(event.type){
        case 1://请求视频流失败，视频链接断开
            let ptr1 = "播放器id:" + event.index + "播放失败，失败原因：" + event.reason;
            console.log(ptr1);
            break;
        case 2://视频流来了
            let ptr2 = "播放器id:" + event.index + "stream come";
            console.log(ptr2);
            break;
        case 3://视频流中断
            let ptr3 = "播放器id:" + event.index + "stream cut";
            console.log(ptr3);
            break;
    }
}
```

列：
```javascript
NetClient.CreatePlayer(document.getElementById('div1'), 0, PlayerCallBack);
```

### NetClient.StartRealPlay(playerId,deviceId)  
开始直播
| Param  | Type                | Description  |  
| ------ | ------------------- | ------------ |  
| playerId  | <code>Number</code> | 播放id |  
| deviceId | <code>Number</code> | 设备id |  
| remoteHost  | <code>string</code> | 服务器ip |  
| remotePort | <code>Number</code> | 服务器端口 |  
| @Return | <code>Number</code> | 返回值，小于0失败否则成功 |  

### NetClient.StartBackPlay(playerId,deviceId,fileId)  
开始点播
| Param  | Type                | Description  |  
| ------ | ------------------- | ------------ |  
| playerId  | <code>Number</code> | 播放id |  
| deviceId | <code>Number</code> | 设备id |  
| fileID | <code>Number</code> | 录像文件ID（SearchBackList返回） |  
| @Return | <code>Number</code> | 返回值，小于0失败否则成功 |  

###  NetClient.StopPlay(playerId) 
暂停播放  
| Param  | Type                | Description  |  
| ------ | ------------------- | ------------ |  
| playerId  | <code>Number</code> | 播放id |  
| @Return | 无 | 无 |  

###  NetClient.ReleasePlayer(playerId) 
销毁播放器   
| Param  | Type                | Description  |  
| ------ | ------------------- | ------------ |  
| playerId  | <code>Number</code> | 播放id |  
| @Return | <code>Number</code> | 返回值，小于0失败否则成功 |

----------------------------------------------------------------------
