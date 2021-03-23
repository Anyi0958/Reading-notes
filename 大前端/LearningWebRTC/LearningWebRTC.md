LearningWebRTC 目录
[TOC]
***
# 前言
- 适合`HTML`和`JavaScript`构建`Web`应用程序的有经验者
- 打算利用用户间音频和视频交流力量来构建新的应用程序
- 通过在用户之间转移高性能数据来实现应用程序
- 本书是写给新入门的网络工程师
- 实时通信的内部工作原理

## 前提
- 掌握编程概念和网络基础
sample:
```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Learning WebRTC - Chapter 4: Creating a RTCPeerCOnnection</title>
</head>
<body>
    <div id="container">
        <video id="yours" autoplay></video>
        <video id="theirs" autoplay></video>
    </div>

    <script src="main.js"></script>
</body>
</html>
```

## 推荐阅读
- 《Learning WebRTC》
- WebRTC作者[Github](http://github.com/binux "Github")
- [博客](https://bloggeek.me "博客")
- [WebRTC](http://www.webrtc.org/ "WebRTC实现源码")
- [编解码器](http://www.webrtc.org/faq "codec")
- [W3C-webrtc具体细节](http://www.w3.org/TR/webrtc/ "webrtc具体细节")
***
# 1. 开启WebRTC之旅
本章基础知识：
- 音频和视频领域的发展现状
- WebRTC对音视频领域的影响
- WebRTC主要特性及使用方法

## 在WebRTC平台传输音频和视频
需要考虑：
	- 连接断开
	- 数据丢失
	- NAT穿透
API:
	- 捕捉摄像头和麦克风
	- 音视频解码
	- 传输层
	- 会话管理

- 音频和视频的编解码：codec(多媒体数字信号编解码器)
- 内置的编解码器：H.264, Opus, iSAC, VP8
- WebRTC借鉴了其他传输层(AJAX, WebSockets)
- 会话管理：通常称为**信令**，负责在浏览器中建立并管理多个连接

## WebRTC的应用
- 核心：在两个浏览器之间建立起来的一条点对点连接
- 可以应用在：文件共享、文本聊天、多人游戏、货币流通
- 连接低延迟、高性能，使用底层协议来提供高速性能，从而加速数据在网络间的流动，实现在短时间内传输大量的数据

# 2. 获取用户媒体
主要内容：
1. 如何访问媒体设备
2. 如何约束媒体流
3. 如何处理多种设备
4. 如何修改流数据

## 配置静态服务器
1. `npm install -g node-static`
2. `static`指定端口

## 媒体流页面
sample:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Learning WebRTC - Chapter 2: Get User Media</title>
</head>
<body>
    <video autoplay></video>
    <script src="main.js"></script>
</body>
</html>
```

```js
// 函数
function hasUserMedia() {
    return !!(navigator.getUserMedia
            || navigator.webkitGetUserMedia
            || navigator.mozGetUserMedia
            || navigator.msGetUserMedia);
}

if(hasUserMedia()){
    navigator.getUserMedia = navigator.getUserMedia
                            || navigator.webkitGetUserMedia
                            || navigator.mozGetUserMedia
                            || navigator.msGetUserMedia;
    navigator.getUserMedia({
        video: true,
        audio: true
    }, stream => {
        let video = document.querySelector('video');
        try {
            video.src = window.URL.createObjectURL(stream);
        } catch(error){
            video.srcObject = stream;
        }
    }, err => {
        console.log(err);
    });
} else {
    alert("抱歉，你的浏览器不支持 getUserMedia");
}
```
```js
// 类
class UserMedia {
    constructor() {
        this.hasUserMedia = !!(navigator.getUserMedia
            || navigator.webkitGetUserMedia
            || navigator.mozGetUserMedia
            || navigator.msGetUserMedia);
    }

    getMedia(tag){
        if(this.hasUserMedia){
            navigator.getUserMedia = navigator.getUserMedia
                || navigator.webkitGetUserMedia
                || navigator.mozGetUserMedia
                || navigator.msGetUserMedia;
            
            navigator.getUserMedia({
                video: true,
                audio: true
            }, stream => {
                let video = document.querySelector(tag);
                try {
                    video.src = window.URL.createObjectURL(stream);
                } catch(error){
                    video.srcObject = stream;
                }
            }, err => {                
                console.log(err);
                return err;
            });
        }else {
            alert("版本不支持");
            return;
        }
    }
}

let media = new UserMedia();
media.getMedia('video');
```

- `<video>`通过`window.URL.createObjectURL`将流加载到该元素中
- `<video>`不能接收`JS`作为参数，只能通过一些字符串来换取视频流
- 函数在获取流对象后，会将它转换成一个本地的URL，这样标签就能从这个地址获取流数据
### 注意
- `<video>`元素中应该包含一个`autoplay`属性，表示自动播放
- 从摄像头获取`stream`对象并导入页面上的视频元素这个过程，如果用C/C++是非常繁琐的

## 媒体流的方法- getUserMedia API
### API处理方法
```js
navigator.getUserMedia({video: false, audio: true}, function (stream){
	// 视频流里不包含视频
})
```
### 限制视频捕捉
#### 推荐阅读
- [getUserMedia API](http://tools.ietf.org/html/draft-alvestrand-constraints-resolution-03 "限制规范细节")
例如：
1. 最低分辨率
2. 帧速率
3. 视频宽高比

#### 应用实例
1. 长宽比sample:
```js
function hasUserMedia() {
    return !!(navigator.getUserMedia
            || navigator.webkitGetUserMedia
            || navigator.mozGetUserMedia
            || navigator.msGetUserMedia);
}

if(hasUserMedia()){
    navigator.getUserMedia = navigator.getUserMedia
                            || navigator.webkitGetUserMedia
                            || navigator.mozGetUserMedia
                            || navigator.msGetUserMedia;
    navigator.getUserMedia({
        video: {
            mandatory: {
                minAspectRatio: 1.777,
                maxAspectRatio: 1.778,
                minWidth: 640,
                maxHeight: 480
            }
        },
        audio: false
    }, function (stream) {
        let video = document.querySelector('video');
        try {
            video.src = window.URL.createObjectURL(stream);
        } catch(error){
            video.srcObject = stream;
        }
    }, function (err) {
        console.log(err);
    });
} else {
    alert("抱歉，你的浏览器不支持 getUserMedia");
}
```
2. 移动端使用
```js
let constraints = {
    video: {
        mandatory: {
            minWidth: 640,
            minHeight: 480
        }
    },
    audio: false
};

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i
    .test(navigator.userAgent)){
        constraints = {
            video: {
                mandatory: {
                    minWidth: 480,
                    minHeight: 320,
                    maxWidth: 1024,
                    maxHeight: 768
                }
            },
            audio: false
        };
    }

navigator.getUserMedia(constraints, stream => {
    let video = document.querySelector('video');
    try{
        video.src = window.URL.createObjectURL(stream);
    }catch(error){
        video.srcObject = stream;
    }
}, err => {
    console.log(err);
});
```
- 限制配置，决定着webRTC应用的性能

### 多设备处理
- 设备上接驳多台摄像头和麦克风
- 暴露了`MediaSourceTrack`的API
- `MediaStreamTrack.getSources`已经弃用，现在用`navigator.mediaDevices.enumerateDevices().then(function(sources))`
```js
navigator.mediaDevices.enumerateDevices().then(sources => {
    let audioSource = null;
    let videoSource = null;

    for(let i = 0; i < sources.length; ++i){
        let source = sources[i];
        if(source.kind === 'audio'){
            console.log("发现麦克风:", source.label, source.id);
            audioSource = source.id;
        } else if(source.kind === "video"){
            console.log("发现摄像头:", source.label, source.id);
            videoSource = source.id;
        } else {
            console.log("发现未知资源:", source);
        }
    }

    let constraints = {
        audio: {
            optional: [{sourceId: audioSource}]
        },
        video: {
            optional: [{sourceId: videoSource}]
        }
    };

    navigator.getUserMedia(constraints, stream => {
        let video = document.querySelector('video');
        try{
            video.src = window.URL.createObjectURL(stream);
        }catch(error){
            video.srcObject = stream;
        }
    },
        error => console.log(`出现错误${error}`)
    );
});
```

##  创建一个拍照
- canvas可以绘制线条、图形和图片，可以制作游戏
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Learning WebRTC - Chapter 2: Get User Media</title>
    <style>

        video, canvas{
            border: 1px solid gray;
            width: 480px;
            height: 320px;
        }
    </style>
</head>
<body>
    <video autoplay></video>    
    <canvas></canvas>
    <button id="capture">Capture</button>
    <script src="photobooth.js"></script>
</body>
</html>
```

```js
function hasUserMedia() {
    return !!(navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia);
}

if(hasUserMedia()){
    navigator.getUserMedia = navigator.getUserMedia
                        || navigator.webkitGetUserMedia
                        || navigator.mozGetUserMedia
                        || navigator.msContentScript;
    
    let video = document.querySelector('video');
    let canvas = document.querySelector('canvas');
    let streaming = false;

    navigator.getUserMedia({
        video: true,
        audio: false
    }, stream => {
        streaming = true;
        try{
            video.src = window.URL.createObjectURL(stream);
        }catch(error){
            video.srcObject = stream;
        }
    }, err => console.log(err)
    );

    document.querySelector('#capture').addEventListener('click',
        event => {
            if(streaming){
                canvas.width = video.clientWidth;
                canvas.height = video.clientHeight;
                
                let context = canvas.getContext('2d');
                context.drawImage(video, 0, 0);
            }
        }
    );
} else {
    alert("对不起，您的浏览器不支持");
}
```

## 修改媒体流
- 图片滤镜
添加css样式
```css
.grayscale {
    -webkit-filter: grayscale(1);
    -moz-filter: grayscale(1);
    -ms-filter: grayscale(1);
    -o-filter: grayscale(1);
    filter: grayscale(1);
}

.sepia {
    -webkit-filter: sepia(1);
    -moz-filter: sepia(1);
    -ms-filter: sepia(1);
    -o-filter: sepia(1);
    filter: sepia(1);    
}

.invert {
    -webkit-filter: invert(1);
    -moz-filter: invert(1);
    -ms-filter: invert(1);
    -o-filter: invert(1);
    filter: invert(1);
}
```
js增加滤镜功能：
```js
function hasUserMedia() {
    return !!(navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia);
}

if(hasUserMedia()){
    navigator.getUserMedia = navigator.getUserMedia
                        || navigator.webkitGetUserMedia
                        || navigator.mozGetUserMedia
                        || navigator.msContentScript;
    
    let video = document.querySelector('video');
    let canvas = document.querySelector('canvas');
    let streaming = false;

    navigator.getUserMedia({
        video: true,
        audio: false
    }, stream => {
        streaming = true;
        try{
            video.src = window.URL.createObjectURL(stream);
        }catch(error){
            video.srcObject = stream;
        }
    }, err => console.log(err)
    );

    document.querySelector('#capture').addEventListener('click',
        event => {
            if(streaming){
                canvas.width = video.clientWidth;
                canvas.height = video.clientHeight;
                
                let context = canvas.getContext('2d');
                context.drawImage(video, 0, 0);
            }
        }
    );

    let filters = ['', 'grayscale', 'sepia', 'invert'];
    let currentFilter = 0;

    document.querySelector('video').addEventListener('click', 
        event => {
            if(streaming){
                canvas.width = video.clientWidth;
                canvas.height = video.clientHeight;
                let context = canvas.getContext('2d');

                context.drawImage(video, 0, 0);
                currentFilter++;
                if(currentFilter > filters.length - 1)  currentFilter = 0;
                canvas.className = filters[currentFilter];
            }
        }
    );
} else {
    alert("对不起，您的浏览器不支持");
}
```
- 图片添加文字
```js
context.fillStyle = "white";
context.fillText("Hello World!", 10, 10);
```

# 3. 创建简单的WebRTC应用
- 开发任何WebRTC应用的首个步骤就是创建`RTCPeerConnection`
- 成功创建一个`RTCPeerConnection`的前提，就是需要理解浏览器创建对等连接的内部工作原理
## 本章内容
1. 理解`UDP`传输协议和实时传输
2. 在本地与其他用户发送信令和交涉
3. 在Web上找到其他用户和NAT穿透
4. 创建`RTCPeerConnection`

## 理解`UDP`传输协议和实时传输
实时传输要求双方间有快速的连接速度。
- 典型的网络连接：需要将音频和视频放到同一帧中，并以40-60帧的速度发送给另一个用户
- 因为允许数据丢失，人脑会对丢失的帧自动补成，所以UDP更适合，创建高性能应用
- TCP不适合游戏中的流数据，游戏不需要可靠，只需要快
UDP传输不保证的事情：
1. 不保证数据发送或接收的先后顺序
2. 不保证每一个数据包都能够传送到接收端
3. 不跟踪每个数据包的状态

## WebRTC API
主要技术：
1. RTCPeerConnection对象
2. 信号传递和交涉
3. 会话描述协议-SDP
4. 交互式连接建立-ICE

## RTCPeerConnection对象
`API`的主入口
- 初始化一个连接他人以及传送流媒体信息
- 负责与另一个用户建立UDP连接
- 功能：
	- 维护浏览器内会话和对等连接的状态
	- 对等连接建立

![1-RTCPeerConnection][01]

实例化对象：
```js
let myConnection = new RTCPeerConnection(configuration);
myConnection.onaddstream = stream => console.log(stream);
```

## 信号传递和交涉
网络地址：`IP`地址和端口号组成
发送信令的过程：
1. 对等连接创建潜在的候选列表
2. 选择用户连接
3. 信令层通知用户连接，是否接受或拒绝
4. 连接接收后的通知
5. 交换电脑硬件和软件信息
6. 交换位置信息
7. 连接成功或失败

## 会话描述协议-SDP
- 用户需要传出信息指明视频解码器，何种网络。
- SDP是基于字符串的二进制数据对象：`<key>=<value>\n`

sample:

```js
let configuration = {
    bundlePolicy: "max-compat"
};
let myConnection = new RTCPeerConnection(configuration);
myConnection.onaddstream = function(stream) {
    console.log(stream);
};
```
## 清晰的路线到用户

- 为了保证网络安全

使用的多种技术：
- NAT会话穿透技术 - STUN
- 中继技术穿透NAT - TURN
- 交互式连接建立 - ICE

典型的`WebRTC`连接过程的架构：
![2-WebRTCframework][02]

<<<<<<< HEAD
## STUN
=======
- 找到`ip`



## `STUN`

- 发请求给服务器，服务器再转发
>>>>>>> dev

使用STUN协议需要由一个支持STUN协议的服务器

- 建立高质量的WebRTC应用实际上需要多个服务器，需要提供一套STUN和TURN服务器

## `TURN`

- 客户端在对等连接的双方之间增加一个转播
- 资源消耗多
- 需要从`TURN`服务器去下载、处理并重定向每一个用户发送过来的数据包

## `ICE`

- `STUN`和`TURN`结合后的标准
- 每一个`ICE`候选路径都是通过`STUN`和`TURN`来找到的

## WebRTC应用

- 创建一个`RTCPeerConnection`
- 创建`DSP offer`和回应
- 为双方找到`ICE`候选路径
- 创建一个成功的`WebRTC`连接

###  `RTCPeerConnection`

#### `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Learning WebRTC</title>
</head>
<body>
    <div id="container">
        <video id="yours" autoplay></video>
        <video id="theirs" autoplay></video>
    </div>
    <script src="./main.js"></script>
    <!-- <script src="main.js"></script> -->
</body>
</html>
```

#### `main.js`

- `hasUserMedia()`
- `hasRTCPeerConnection()`：确保能够使用

```js
function hasUserMedia() {
    navigator.getUserMedia = navigator.getUserMedia
                        || navigator.webkitGetUserMedia
                        || navigator.mozGetUserMedia
                        || navigator.msGetUserMedia;
    return !!navigator.getUserMedia;
}

function hasRTCPeerConnection() {
    window.RTCPeerConnection = window.RTCPeerConnection
                            || window.webkitRTCPeerConnection
                            || window.mozRTCPeerConnection;
    return !!window.RTCPeerConnection;
}
```

#### 执行状态流程图

![03][03]

1. 从用户得到媒体流
2. 建立对等连接
3. 一方创建`offer`，另一方做准备。`offer`和返回都是发送信令过程中的一部分
4. 找到合适的端口和`IP`组合进行链接，成功后开始共享信息

#### 捕获用户的摄像头

```js
let yourVideo = document.querySelector("#yours");
let theirVideo = document.querySelector("#theirs");
let yourConnection, theirConnection;

if(hasUserMedia()){
    navigator.getUserMedia({
        video: true,
        audio: false
    }, stream => {
        
            try{
                yourVideo.src = window.URL.createObjectURL(stream);
            }catch(error){
                yourVideo.srcObject = stream;
            }


        if(hasRTCPeerConnection()){
            startPeerConnection(stream);
        } else {
            alert("你的浏览器不支持webRTC");
        }
    }, error => {
        alert("你的浏览器不支持WebRtc");
    });
}
```

#### `RTCPeerConnection`对象

- 建立`SCP offer`和返回，为双方寻找`ICE`候选路径

```js
function startPeerConnection(stream) {
    let configuration = {
        {
        	"iceServers": [{"url": "stun:127.0.0.1:9876"}]
    	}
    };

	yourConnection = new webkitRTCPeerConnection(configuration);
	theirConnection = new webkitRTCPeerConnection(configuration);
};
```



#### 建立`SDP Offer`和返回

- 执行`offer`和返回`answer`这个过程以构成对等连接

```js
function startPeerConnection(stream) {
    let configuration = {
        "iceServers": [
            {"url": "stun:127.0.0.1:9876"}
        ]
    };

    yourConnection = new webkitRTCPeerConnection(configuration);
    theirConnection = new webkitRTCPeerConnection(configuration);

    // 开始offer
    yourConnection.createOffer(offer => {
        yourConnection.setLocalDescription(offer);
        theirConnection.setRemoteDescription(offer);

        theirConnection.createAnswer(offer => {
            theirConnection.setLocalDescription(offer);
            yourConnection.setRemoteDescription(offer);
        });
    });    
}
```

- 由于通信双方在同一个浏览器窗口中，确保用户收到`offer`时不用执行多次异步操作，实现`offer/answer`机制

#### 寻找`ICE`候选路径

- 连接用户不在同一个浏览器中时，将需要一个服务器。由于要跨多个浏览器窗口执行，将发生许多同步操作，会导致环境不稳定
- 建立对等连接的最后一部分是，在双方间传递`ICE`候选路径，以便相互连接

```js
function startPeerConnection(stream) {
    let configuration = {
        "iceServers": [
            {"url": "stun:127.0.0.1:9876"}
        ]
    };

    yourConnection = new webkitRTCPeerConnection(configuration);
    theirConnection = new webkitRTCPeerConnection(configuration);

    // 创建ICE处理
    yourConnection.onicecandidate = event => {
        if(event.candidate){
            theirConnection.addIceCandidate(new RTCIceCandidate(event.candidate));
        }
    };

    theirConnection.onicecandidate = event => {
        if(event.candidate){
            yourConnection.addIceCandidate(new RTCIceCandidate(event.candidate));
        }
    };

    // 开始offer
    yourConnection.createOffer(offer => {
        yourConnection.setLocalDescription(offer);
        theirConnection.setRemoteDescription(offer);

        theirConnection.createAnswer(offer => {
            theirConnection.setLocalDescription(offer);
            yourConnection.setRemoteDescription(offer);
        });
    });
}
```

- 全部是事件驱动
- 寻找`ICE`候选路径是异步的
- 浏览器会不停地搜寻，直到尽可能多的创建良好且稳定的对等连接的候选路径
- 当我们从`theirConnection`中获取`ICE`候选路径时，需要将路径加入到`yourConnections`中。当另一方跟我们不在同一个网络时，这些数据会横跨整个互联网

#### 加入流和打磨

- 调用`onaddstream`来通知用户，流已经被加入

```js
// 监听流的创建
yourConnection.addStream(stream);
theirConnection.onaddstream = function(e) {
    theirVideo.src = window.URL.createObjectURL(e.stream);
};

//修改后
stream.getTracks().forEach(track => {
    yourConnection.addTrack(track, stream);
    theirConnection.onTrack = event => {
        try{
            theirVideo.src = window.URL.createObjectURL(event.stream);
        }catch(error){
            theirVideo.srcObject = event.stream;
        }

    };
});
```

#### 增加`css`样式

```css
body {
    background-color: #3D6DF2;
    margin-top: 15px;
}

video {
    background: black;
    border: 1px solid gray;
}

#container {
    position: relative;
    display: block;
    margin: 0 auto;
    width: 500px;
    height: 500px;    
}

#yours {
    width: 150px;
    height: 150px;
    position: absolute;
    top: 15px;
    right: 15px;
}

#theirs {
    width: 500px;
    height: 500px;
}body {
    background-color: #3D6DF2;
    margin-top: 15px;
}

video {
    background: black;
    border: 1px solid gray;
}

#container {
    position: relative;
    display: block;
    margin: 0 auto;
    width: 500px;
    height: 500px;    
}

#yours {
    width: 150px;
    height: 150px;
    position: absolute;
    top: 15px;
    right: 15px;
}

#theirs {
    width: 500px;
    height: 500px;
}
```

![04][04]

### 代码总结

`index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Learning WebRTC</title>
    <link rel="stylesheet" href="./style.css" type="text/css">
</head>
<body>
    <div id="container">
        <video id="yours" autoplay></video>
        <video id="theirs" autoplay></video>
    </div>
    <script src="./main.js"></script>
    <!-- <script src="main.js"></script> -->
</body>
</html>
```

`style.css`

```css
body {
    background-color: #3D6DF2;
    margin-top: 15px;
}

video {
    background: black;
    border: 1px solid gray;
}

#container {
    position: relative;
    display: block;
    margin: 0 auto;
    width: 500px;
    height: 500px;    
}

#yours {
    width: 150px;
    height: 150px;
    position: absolute;
    top: 15px;
    right: 15px;
}

#theirs {
    width: 500px;
    height: 500px;
}
```

`main.js`

```js
function hasUserMedia() {
    navigator.getUserMedia = navigator.getUserMedia
                        || navigator.webkitGetUserMedia
                        || navigator.mozGetUserMedia
                        || navigator.msGetUserMedia;
    return !!navigator.getUserMedia;
}

function hasRTCPeerConnection() {
    window.RTCPeerConnection = window.RTCPeerConnection
                            || window.webkitRTCPeerConnection
                            || window.mozRTCPeerConnection;
    return !!window.RTCPeerConnection;
}

function startPeerConnection(stream) {
    let configuration = {
        "iceServers": [
            {"url": "stun:127.0.0.1:9876"}
        ]
    };

    yourConnection = new webkitRTCPeerConnection(configuration);
    theirConnection = new webkitRTCPeerConnection(configuration);

    // 创建ICE处理
    yourConnection.onicecandidate = event => {
        if(event.candidate){
            theirConnection.addIceCandidate(new RTCIceCandidate(event.candidate));
        }
    };

    theirConnection.onicecandidate = event => {
        if(event.candidate){
            yourConnection.addIceCandidate(new RTCIceCandidate(event.candidate));
        }
    };

    // 开始offer
    yourConnection.createOffer(offer => {
        yourConnection.setLocalDescription(offer);
        theirConnection.setRemoteDescription(offer);

        theirConnection.createAnswer(offer => {
            theirConnection.setLocalDescription(offer);
            yourConnection.setRemoteDescription(offer);
        });
    });

    // 监听流创建
    stream.getTracks().forEach(track => {
        yourConnection.addTrack(track, stream);
        theirConnection.onTrack = event => {
            try{
                theirVideo.src = window.URL.createObjectURL(event.stream);
            }catch(error){
                theirVideo.srcObject = event.stream;
            }

        };
    });
    
}

let yourVideo = document.querySelector("#yours");
let theirVideo = document.querySelector("#theirs");
let yourConnection, theirConnection;

if(hasUserMedia()){
    navigator.getUserMedia({
        video: true,
        audio: false
    }, stream => {
        
            try{
                yourVideo.src = window.URL.createObjectURL(stream);
            }catch(error){
                yourVideo.srcObject = stream;
            }


        if(hasRTCPeerConnection()){
            startPeerConnection(stream);
        } else {
            alert("你的浏览器不支持webRTC");
        }
    }, error => {
        alert("你的浏览器不支持WebRtc");
    });
}
```

# 4. 创建信令服务器

- 创建完整的`WebRTC`应用，需要抛开客户端的开发，转而为服务端的开发

## 涵盖内容

1. `Node.js`
2. `WebSocket`
3. 识别用户
4. 发起和应答`WebRTC`通话
5. 处理`ICE`候选路径的传送
6. 挂断通话

## 构建信令服务器

- 将不在同一个电脑中的两个用户连接起来
- 服务器的目的是通过网络传输代替原先的信令机制
- 对多个用户做出回应：
  - 允许一方用户呼叫另一方从而在双方间建立`WebRTC`连接
  - 一旦用户呼叫了另一方，服务器将会在双方间传递请求，应答和`ICE`候选路径

![05][05]

流程：

- 服务器建立连接时的信息流
- 登陆服务器开始，登录向服务器端发送一个字符串形式的用户标识，确保没有被使用
- 登录进入，开始呼叫，通过使用对方的标识码发送请求
- 发送离开信息来终止连接
- 此流程主要用来作为互相发送信息的通道

注意：

- 由于发送信令的实现没有任何规则，可以使用任意协议、技术或者模式

## `WebSockets`

- 建立`WebRTC`连接所需的步骤必须是实时的，最好使用`WebSockets`，不能使用`WebRTC`对等连接实时传递消息

- `Socket`以字符串和二进制码方式双向发送信息
- 完全依赖于`WebSocket`框架：`Meteor JavaScript framework`

- `npm`安装`websocket`：`npm install ws`
- `wscat`：`npm install wscat`

### `server.js`

```js
const WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({port: 8888});

wss.on("connection", connection => {
    console.log("User connected");

    connection.on("message", message => {
        console.log("Got message:", message);
    });

    connection.send("hello world!")
});
```

- 监听服务器端的`connection`事件，当用户与服务器建立`websocket`连接时，会调用此，并有连接方的所有信息

- 安装`wscat`进行测试：`npm install -g ws`, `wscat -c ws://localhost:8888`，或者前端测试

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <script>
        let websocket = new WebSocket("ws://localhost:8888");

    </script>
</body>
</html>
```



## 识别用户

- 典型的网络应用中，服务器需要一种方法来识别连接的用户
- 遵循唯一规则，让每一个用户有一个字符串形式的标识，即用户名

仅需一个`id`来标识

```js
const WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({port: 8888});

wss.on("connection", connection => {
    console.log("User connected");

    connection.on("message", message => {
        // console.log("Got message:", message);
        let data;

        try{
            data = JSON.parse(message);
        }catch(e) {
            console.log(e);
            data = {};
        }
    });

    connection.send("hello world!")
});
```

- 由于`websocket`只允许字符和二进制数据，用`JSON`格式的结构化消息

## 存储对象

- 用哈希图存储数据，在`JS`中叫对象

```js
const WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({port: 8888}),
      users = {};
wss.on("connection", connection => {
    console.log("User connected");

    connection.on("message", message => {
        // console.log("Got message:", message);
        let data;

        try{
            data = JSON.parse(message);
        }catch(e) {
            console.log(e);
            data = {};
        }
    });

    connection.send("hello world!")
});
```

## `login`登录

- 用户发送`login`类型信息才能登录
- 客户端发送每一个信息增加`type`字段

服务器端：

```js
const WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({port: 8888}),
    users = {};

wss.on("connection", connection => {
    console.log("User connected");

    connection.on("message", message => {
        // console.log("Got message:", message);
        let data;

        try{
            data = JSON.parse(message);
        }catch(e) {
            console.log(e);
            data = {};
        }


        switch(data.type) {
            case "login":
                console.log("User logged in as", data.name);
                if(users[data.name]) {
                    sendTo(connection, {
                        type: "login",
                        success: false
                    });
                }else {
                    users[data.name] = connection;
                    connection.name = data.name;
                    sendTo(connection, {
                        type: "login",
                        success: true
                    });
                }
                break;
                
            default:
                sendTo(connection, {
                    type: "error",
                    message: "Unrecognized command: " + data.type;
                });

                break;
        }
    });

    connection.send("hello world!")
});

function sendTo(conn, message) {
    conn.send(JSON.stringify(message));
}
```

- 如果有用户登录`ID`，就拒绝

断开收尾：

```js
const WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({port: 8888}),
    users = {};

wss.on("connection", connection => {
    console.log("User connected");

    connection.on("message", message => {
        // console.log("Got message:", message);
        let data;

        try{
            data = JSON.parse(message);
        }catch(e) {
            console.log(e);
            data = {};
        }


        switch(data.type) {
            case "login":
                console.log("User logged in as", data.name);
                if(users[data.name]) {
                    sendTo(connection, {
                        type: "login",
                        success: false
                    });
                }else {
                    users[data.name] = connection;
                    connection.name = data.name;
                    sendTo(connection, {
                        type: "login",
                        success: true
                    });
                }
                break;
                
            default:
                sendTo(connection, {
                    type: "error",
                    message: "Unrecognized command: " + data.type
                });

                break;
        }
    });

});

wss.on("close", function(){
    if(connection.name){
        delete users[connection.name];
    }
});

function sendTo(conn, message) {
    conn.send(JSON.stringify(message));
}
```

测试数据：`{"type": "login", "name": "foo"}`

## 发起通话

- 创建`offer`处理器，用户用来呼叫另一方

- 呼叫初始化的过程和`WebRTC`的`offer`分开最好，但此处结合

```js
case "offer":
    console.log("sending offer to:", data.name);
    let conn = users[data.name];

    if(conn != null){
        connection.otherName = data.name;
        sendTo(conn, {
            type: "offer",
            offer: data.offer,
            name: connection.name
        });
    }
    break;
```

讲解：

1. 首先获取试图呼叫用户的`connection`对象
2. 检查另一用户是否在服务器上，若存在则发送`offer`
3. 此方法使用于任何双方间的呼叫技术
4. 缺少错误失败处理

## 呼叫应答

- 应答：服务器仅将消息作为`answer`传递给另一方

```js
case "answer":
    console.log("sending answer to:", data.name);
    let conn = users[data.name];

    if(conn != null){
        connection.otherName = data.name;
        sendTo(conn, {
            type: "answer",
            answer: data.answer
        })
    }
    break;
```

- 如果一个用户先发送`answer`而非`offer`，将会扰乱服务器的实现
- 但实现了`webRTC`的`RTCPeerConnection`的`createOffer`和`createAnswer`

测试：

```bash
# 1
{"type": "login", "name": "UserA"}
# 2
{"type": "login", "name": "UserB"}
# 1
{"type": "offer", "name": "UserB", "offer": "hello"}
# 2
{"type": "answer", "name": "UserA", "answer": "hello to you too!"}
```

![06][06]

## 处理`ICE`候选路径

- `WebRTC`信令的最后一部分是在用户间处理`ICE`候选路径
- 使用之前的技术在用户间传递消息。但此类消息的不同在于,每一个用户可能都需要发送多次,且在双方用户间会以任何顺序发送

添加`candidate`处理器：

```js
case "candidate":
    console.log("sending to", data.name);
    conn = users[data.name];
    if(conn != null){
        sendTo(conn, {
            type: "candidate",
            candidate: data.candidate
        });
    }
    break;
```

- 由于通信已经建立，不需要在函数里添加另一方用户的名字类似于`offer, answer`，在双方间传递消息

```bash
# 1
{"type": "login", "name": "UserA"}
# 2
{"type": "login", "name": "UserB"}
# 1
{"type": "offer", "name": "UserB", "offer": "hello"}
# 2
{"type": "answer", "name": "UserA", "answer": "hello to you too!"}
# 1
{"type": "candidate", "name": "userA", "candidate": "test"}
```

## 呼叫挂断

- 用户从另一方断开，从而可以呼叫其他用户
- 通知服务器断开用户引用

```js
case "leave":
    console.log("Disconnected user from ", data.name);
    conn = users[data.name];
    conn.otherName = null;

    if(conn != null){
        sendTo(conn, {
            type: "leave"
        });
    }
    break;
```

- 这段代码也会通知另一个用户`leave`事件的触发，这样可以对等地断开对等连接
- 当用户从信令服务器掉线时，我们也需要做响应的处理，不再提供服务，结束通话

```js
wss.on("close", function(){
    if(connection.name){
        delete users[connection.name];

        if(connection.otherName) {
            console.log("Disconnected,",connection.otherName);
            let conn = users[connection.otherName];
            conn.otherName = null;

            if(conn != null){
                sendTo(conn,{
                    type: "leave"
                });
            }
        }
    }
});
```

## 完整的信令服务器

```js
const WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({port: 8888}),
    users = {};

wss.on("connection", connection => {
    console.log("User connected");

    connection.on("message", message => {
        // console.log("Got message:", message);
        let data, conn;

        try{
            data = JSON.parse(message);
        }catch(e) {
            console.log(e);
            data = {};
        }


        switch(data.type) {
            case "login":
                console.log("User logged in as", data.name);
                if(users[data.name]) {
                    sendTo(connection, {
                        type: "login",
                        success: false
                    });
                }else {
                    users[data.name] = connection;
                    connection.name = data.name;
                    sendTo(connection, {
                        type: "login",
                        success: true
                    });
                }
                break;
            
            case "offer":
                console.log("sending offer to:", data.name);
                conn = users[data.name];

                if(conn != null){
                    connection.otherName = data.name;
                    sendTo(conn, {
                        type: "offer",
                        offer: data.offer,
                        name: connection.name
                    });
                }
                break;

            case "answer":
                console.log("sending answer to:", data.name);
                conn = users[data.name];

                if(conn != null){
                    connection.otherName = data.name;
                    sendTo(conn, {
                        type: "answer",
                        answer: data.answer
                    })
                }
                break;

            case "candidate":
                console.log("sending to", data.name);
                conn = users[data.name];

                if(conn != null){
                    sendTo(conn, {
                        type: "candidate",
                        candidate: data.candidate
                    });
                }
                break;
            
            case "leave":
                console.log("Disconnected user from ", data.name);
                conn = users[data.name];
                conn.otherName = null;

                if(conn != null){
                    sendTo(conn, {
                        type: "leave"
                    });
                }
                break;
                
            default:
                sendTo(connection, {
                    type: "error",
                    message: "Unrecognized command: " + data.type
                });

                break;
        }
    });

});

wss.on("close", function(){
    if(connection.name){
        delete users[connection.name];

        if(connection.otherName) {
            console.log("Disconnected,",connection.otherName);
            let conn = users[connection.otherName];
            conn.otherName = null;

            if(conn != null){
                sendTo(conn,{
                    type: "leave"
                });
            }
        }
    }
});

wss.on("listening", () => {
    console.log("Server started...");
});

function sendTo(conn, message) {
    conn.send(JSON.stringify(message));
}
```

- `websocket`支持`SSL`，可以启用`wss://`

## `websocket`困境

- 防火墙问题
- 在代理设置下非常不稳定
- `webrtc`延时导致消息处理混乱

## 代替技术 - `XMPP, SIP`

- `XMPP`
- `SIP`

# 5. 连接客户端

## 涵盖内容

- 从客户端获取到服务器的连接
- 识别各个连接端的用户
- 两个远程用户发起通话
- 结束通话

## 连接

- 包含两个页面：输入用户名，呼叫其他用户

## 创建页面

### `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    body{
        background-color: #3D6DF2;
        margin-top: 15px;
        font-family: sans-serif;
        color: white;
    }

    video {
        background: black;
        border: 1px solid gray;
    }

    .page {
        position: relative;
        display: block;
        margin: 0 auto;
        width: 500px;
        height: 500px;
    }

    #yours{
        width: 150px;
        height: 150px;
        position: absolute;
        top: 15px;
        right: 15px;
    }

    #theirs {
        width: 500px;
        height: 500px;
    }
</style>
<body>
    <div id="login-page" class="page">
        <h2>Login As</h2>
        <input type="text" id="username">
        <button id="login">Login</button>
    </div>

    <div id="call-page" class="page">
        <video id="yours" autoplay></video>
        <video id="theirs" autoplay></video>

        <input type="text" id="their-username">
        <button id="call">Call</button>
        <button id="hang-up">Hang Up</button>
    </div>
</body>
<script src="client.js"></script>
</html>
```

## 获取一个连接

- 与信令服务器创建连接

```js
let name,
    connectedUser;

let connection = new WebSocket('ws://localhost:8888');

connection.onopen = function() {
    console.log("Connected");
};

connection.onmessage = function(message){
    console.log("Got message", message.data);

    let data = JSON.parse(message.data);

    switch(data.type){
        case "login":
            onLogin(data.success);
            break;
        case "offer":
            onOffer(data.offer, data.name);
            break;
        case "answer":
            onAnswer(data.answer);
            break;
        case "candidate":
            onCandidate(data.candidate);
            break;
        case "leave":
            onLeave();
            break;
        default:
            break;
    }
};

connection.onerror = function(err) {
    console.log(err);
}

function send(message) {
    if(connectedUser) {
        message.name = connectedUser;
    }

    connection.send(JSON.stringify(message));
}
```

## 登录

```js
let loginPage = document.querySelector('#login-page'),
    usernameInput = document.querySelector('#username'),
    loginButton = document.querySelector('#login'),
    callPage = document.querySelector('#call-page'),
    theirUsernameInput = document.querySelector('#theirusername'),
    callButton = document.querySelector('#call'),
    hangUpButton = document.querySelector('#hang-up');

callPage.style.display = 'none';

loginButton.addEventListener('click', event=>{
    name = usernameInput.value;

    if(name.length > 0){
        send({
            type: "login",
            name: name
        });
    }
});

function onLogin(success) {
    if(success === false){
        alert("Login unsuccessfully, please try a different name.");
    }else {
        loginPage.style.display = 'none';
        callPage.style.display = 'block';
    }

    // 准备好通话的通道
    startConnection();

}
```

## 开始对等连接

1. 从相机中获取视频流
2. 验证用户的浏览器是否支持`WebRTC`
3. 创建`RTCPeerConnection`对象

```js
let yourVideo = document.querySelector('#yours'),
    theirVideo = document.querySelector('#theirs'),
    yourConnection,
    connectedUser,
    stream;

function startConnection() {
    if(hasUserMedia()){
        navigator.getUserMedia({
            video: true,
            audio: true
        },
        myStream => {
            stream = myStream;
            
            try{
                yourVideo.src = window.URL.createObjectURL(stream);
            }catch(e){
                yourVideo.srcObject = stream;
            }

            if(hasRTCPeerConnection()){
                setupPeerConnection(stream);
            }else{
                alert("不支持webRTC");
            }
        },
        error => {
            console.log(error);
        }
        );
    }else{
        alert("不支持webRTC");
    }
}

function setupPeerConnection(stream) {
    let configuration = {
        "iceServers":[
            {"url":"stun:localhost:8888"}
        ]
    };

    yourConnection = new RTCPeerConnection(configuration);

    // 设置流量监听
    yourConnection.addStream(stream);
    yourConnection.onaddstream = function(e) {
        try{
            theirVideo.src = window.URL.createObjectURL(e.stream);
        }catch(e){
            theirVideo.srcObject = stream;
        }
    };

    yourConnection.onicecandidate = function(event) {
        if(event.candidate){
            send({
                type: "candidate",
                candidate: event.candidate
            });
        }
    };
}

function hasUserMedia() {
    navigator.getUserMedia = navigator.getUserMedia
                        || navigator.webkitGetUserMedia
                        || navigator.mozGetUserMedia
                        || navigator.msGetUserMedia;
    return !!navigator.getUserMedia;
}

function hasRTCPeerConnection() {
    window.RTCPeerConnection = window.RTCPeerConnection
                            || window.webkitRTCPeerConnection
                            || window.mozRTCPeerConnection;

    window.RTCSessionDescription = window.RTCSessionDescription
                            || window.webkitRTCSessionDescription
                            || window.mozRTCSessionDescription;
    
    window.RTCIceCandidate = window.RTCIceCandidate
                            || window.webkitRTCIceCandidate
                            || window.mozeRTCIceCandidate;

    return !!window.RTCPeerConnection;
}
```

## 发起通话

- `setLocalDescription()`：更改与连接关联的本地描述。此说明指定连接的本地端的属性，包括媒体格式。
- `setRemoteDescription()`：将指定的会话描述设置为远程对等方的当前提供或应答。描述指定连接远端的属性，包括媒体格式。
- `addIceCandidate()`：通过信令信道从远程对等方接收新的ICE候选，它通过调用将新接收的候选发送到浏览器的ICE代理

```js
callButton.addEventListener('click', function(){
    let theirUsername = theirUsernameInput.value;

    if(theirUsername.length > 0){
        startPeerConnection(theirUsername);
    }
});

function startPeerConnection(user) {
    connectedUser = user;

    // offer
    yourConnection.createOffer(offer=>{
        send({
            type: "offer",
            offer: offer
        });
        yourConnection.setLocalDescription(offer);
    },
    err => {
        alert("An error has occurred");
    });
}

function onOffer(offer, name) {
    connectedUser = name;
    yourConnection.setRemoteDescription(new RTCSessionDescription(offer));

    yourConnection.createAnswer(function(answer){
        yourConnection.setLocalDescription(answer);

        send({
            type: "answer",
            answer: answer
        });
    },
    err =>{
        alert("An error");
    }
    );
}

function onAnswer(answer){
    yourConnection.setRemoteDescription(new RTCSessionDescription(answer));
}

function onCandidate(candidate){
    yourConnection.addIceCandidate(new RTCIceCandidate(candidate));
}
```

## 检测通信

- 调试实时应用困难在：许多事件发生在同一时刻，要完整描述某一时刻发生了什么很难

- `Chrome`中`View`->`Developer`->`Developer Tools`可以看到`webSocket`得通信状态




***
[01]: ./img/1-RTCPeerConnection.png "1-RTCPeerConnection"
[02]: ./img/2-WebRTCframework.png "2-WebRTCframework"
[03]:./img/3-process.png "3-process.png"
[04]:./img/4-ICE.png "4-ICE.png"
[05]:./img/5-ICE.png "5-ICE.png"
[06]: ./img/6-websocket.png "6-websocket.png"

