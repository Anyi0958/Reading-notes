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

