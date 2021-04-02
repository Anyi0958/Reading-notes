H5-MediaSourceExtension 目录
[TOC]
***

# 前言

# 推荐阅读

- [MDN-MSE API](https://developer.mozilla.org/zh-CN/docs/Web/API/Media_Source_Extensions_API)
- [H5直播系列二 MSE(Media Source Extensions)-MSE-简书](https://www.jianshu.com/p/1bfe4470349b)
- [官方文档翻译](https://segmentfault.com/a/1190000011245394)

# 介绍

- 媒体源扩展 API（MSE） 提供了实现无插件且基于 Web 的流媒体的功能。
- 使用 MSE，媒体串流能够通过 JavaScript 创建，并且能通过使用`audio`和`video`元素进行播放。

# 诞生原因

- 现有架构过于简单，只能满足一次播放整个曲目的需要，无法实现拆分/合并数个缓冲文件。
- 流媒体直到现在还在使用 Flash 进行服务，以及通过 RTMP 协议进行视频串流的 Flash 媒体服务器。

# `MSE`标准

- `MSE`可以把单个媒体文件的`SRC`值替换成`MediaSource`一个包含即将播放的媒体文件的准备状态等信息的容器）对象，以及多个`SourceBuffer`对象（代表多个组成整个串流的不同媒体块）的元素
- `MSE`可以根据内容获取的大小和频率，或是内存占用详情（例如什么时候缓存被回收），进行更加精准地控制
- 基于它可扩展的 API 建立自适应比特率流客户端（例如DASH 或 HLS 的客户端）的基础

## 缺点

- 在现代浏览器中创造能兼容 MSE 的媒体（assets）非常费时费力，还要消耗大量计算机资源和能源，还须使用外部实用程序将内容转换成合适的格式
- 虽然浏览器支持兼容 MSE 的各种媒体容器，但采用 H.264 视频编码、AAC 音频编码和 MP4 容器的格式是非常常见的，且一定兼容
- MSE 提供了一个 API，用于运行时检测容器和编解码是否受支持

## 注意

- 如果没有精确的控制时间、媒体质量和内存释放等需求，使用`audio`和`video`是一个更加简单但够用的方案

# `DASH`协议

- DASH（Dynamic Adaptive Streaming over HTTP ）是一个规范了自适应内容应当如何被获取的协议
- 本质：建立在 MSE 顶部的一个层，用来构建自适应比特率串流客户端
- 虽然已经有一个类似的协议了（例如 HTTP 串流直播（HLS）），但 DASH 有最好的跨平台兼容性

## 优势

- DASH 将大量逻辑从网络协议中移出到客户端应用程序逻辑中，使用更简单的 HTTP 协议获取文件
- 可以用一个简单的静态文件服务器来支持 DASH，这对CDN也很友好
- 与之前的流传输解决方案形成鲜明对比，那些流解决方案需要昂贵的许可证来获得非标准的客户端/服务器协议才能实现
- 有非常多的自由开源的工具，能实现转码内容，并将其改造，以适应 DASH、DASH 文件服务器和用 JavaScript 编写的 DASH 客户端库

## 常见特点

- DASH 的两个最常见的用例涉及“点播”或“直播”观看内容
- 点播功能让开发者有时间把媒体文件转码出多种不同的分辨率质量

## 缺点与对比

- 实时处理内容会引入由转码和播发带来的延迟，`DASH`不适合用于类似`WebRTC`的即时通讯，但可以支持比`WebRTC`更多的客户端连接

# 接口

- `MediaSource`：对象播放的媒体资源
- `SourceBuffer`：一个经由`MediaSource`对象被传入`HTMLMediaElement`的媒体快
- `VideoPlaybackQuality`：`video`播放的视频的质量信息，如被丢弃或损坏的帧的数量，由`HTMLVideoElement.getVideoPlaybackQuality()`返回

# `MediaSource`

- 逐块加载视频，并在加载好后立刻播放

```js
let video = document.querySelector('video');

let assetURL = 'test.mp4';
// 需要具体说明有关编解码器的问题
let mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';

// 统一接口
if('MediaSource' in window && 
    MediaSource.isTypeSupported(mimeCodec)) {
        let mediaSource = new MediaSource();

        // closed
        console.log(mediaSource.readyState);

        video.src = URL.createObjectURL(mediaSource);
        // callback
        mediaSource.addEventListener('sourceopen', sourceOpen);
}else{
    console.error('Unsupported MIME type or codec: ', mimeCodec);
}

// 添加sourceBuffer
function sourceOpen(_){
    console.log(`sourceOpen:${this.readyState}`);

    let mediaSource = this;
    let sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);

    // 传送数据后，监听数据，并不断更新，将接收数据放入到sourceBuffer中
    fetchAB(assetURL, function(buf){
        sourceBuffer.addEventListener('updateend', function (_) {
            mediaSource.endOfStream();
            video.play();
            console.log(`fetchAB:${mediaSource.readyState}`);
        });

        sourceBuffer.appendBuffer(buf);
    });
}

// Ajax，以get方式，从后端获取`arrayBuffer`类型的数据，并且将返回数据放入回调函数cb中
function fetchAB(url, cb){
    console.log(url);

    let xhr = new XMLHttpRequest;

    xhr.open('get', url);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function(){
        cb(xhr.response);
    };

    xhr.send();
}
```

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
    <video></video>
    <script src="./main.js"></script>
</body>
</html>
```

## 注意

- 在`DASH`中，推荐使用的是`Fragmented Mp4`(fMp4)格式，与传统的`Mp4`不同
- 如果使用传统`MP4`就会报错：`Uncaught DOMException: Failed to execute 'endOfStream' on 'MediaSource': The MediaSource's readyState is not 'open'.`

### 解决办法

- 转换`MP4`为`fMP4`：[BenTo4](https://www.bento4.com/downloads/)

- `.\mp4fragment.exe .\v0temp.mp4 v0-new.mp4`

# `Media Source Extension`转码

- 当使用`Media Source Extension`时，需要先对`assets`资源进行条件调整，然后才能变成媒体流`stream`
- 以下是编码的工具链

## 开始

- 最重要一步，是确定文件包括容器`container`，编码器`codec`，以及浏览器支持
- 由于编码器`codec`不同，文件分片需要遵循`ISO BMFF spec`准则
  - [ISO BMFF Byte Stream Format](https://www.w3.org/TR/mse-byte-stream-format-isobmff/)
- 如果打算通过HTTP去使用动态适配流(DASH)去适配比特率流，需要将资源转成多个分辨率。大部分的`DASH`用户希望一个适应媒体展示清单文件。当生成多分辨率的文件时，他也同时出现。

# 测试的视频

- [视频-demo](http://wayback.archive.org/web/20161102172252id_/http://video.blendertestbuilds.de/download.php?file=download.blender.org/peach/trailer_1080p.mov)

# 需要的工具

- `ffmpeg` - [命令行](http://ffmpeg.org/download.html)
- `Bento4` - [命令行](https://www.bento4.com/downloads/)
- `python2` - `Bento4 uses it`

# 引入方法

```js
MediaSource.isTypeSupported('audio/mp3'); // false
MediaSource.isTypeSupported('video/mp4'); // true
MediaSource.isTypeSupported('video/mp4; codecs="avc1.4D4028, mp4a.40.2"'); // true
```

```shell
$ ffmpeg -i trailer_1080p.mov -c:v copy -c:a copy bunny.mp4
$ ls
bunny.mp4         trailer_1080p.mov
```

# 检测片段

```shell
ffmpeg -i trailer_1080p.mov -c:v copy -c:a copy -movflags frag_keyframe+empty_moov bunny_fragmented.mp4

$ ffmpeg -i non_fragmented.mp4 -movflags frag_keyframe+empty_moov fragmented.mp4

$ python mp4-dash-encode.py -b 5 -v bunny_fragmented.mp4
Encoding 5 bitrates, min bitrate = 500.0 max bitrate = 2000.0
Media Source: Video: resolution=640x360
ENCODING bitrate: 500, resolution: 256x144
ENCODING bitrate: 875, resolution: 384x216
ENCODING bitrate: 1250, resolution: 480x270
ENCODING bitrate: 1625, resolution: 560x316
ENCODING bitrate: 2000, resolution: 640x360

$ python mp4-dash.py video_0*
Parsing media file 1: video_00500.mp4
Parsing media file 2: video_00875.mp4
Parsing media file 3: video_01250.mp4
Parsing media file 4: video_01625.mp4
Parsing media file 5: video_02000.mp4
Splitting media file (audio) video_00500.mp4
Splitting media file (video) video_00500.mp4
Splitting media file (video) video_00875.mp4
Splitting media file (video) video_01250.mp4
Splitting media file (video) video_01625.mp4
Splitting media file (video) video_02000.mp4

$ tree -L 2 output
output
├── audio
│   └── und
├── stream.mpd
└── video
    ├── 1
    ├── 2
    ├── 3
    ├── 4
    └── 5

8 directories, 1 file
```

# 基于`Fetch API`

```js
var videoMp4 = document.querySelector('.js-player-mp4');
  if (window.MediaSource) {
    var mediaSource = new MediaSource();
    videoMp4.src = URL.createObjectURL(mediaSource);
    mediaSource.addEventListener('sourceopen', sourceOpen);
  } else {
  console.log("The Media Source Extensions API is not supported.")
  }

  function sourceOpen(e) {
    URL.revokeObjectURL(videoMp4.src);
    // 设置 媒体的编码类型
    var mime = 'video/webm; codecs="vorbis, vp8"';
    var mediaSource = e.target;
    var sourceBuffer = mediaSource.addSourceBuffer(mime);
    var videoUrl = './video/avegers3.webm';
    fetch(videoUrl)
      .then(function(response) {
        return response.arrayBuffer();
      })
      .then(function(arrayBuffer) {
      sourceBuffer.addEventListener('updateend', function(e) {
        if (!sourceBuffer.updating && mediaSource.readyState === 'open') {
          mediaSource.endOfStream();
          videoMp4.play().then(function() {
          }).catch(function(err) {
            log('.js-log-mp4', err)
          });
        }
      });
      sourceBuffer.appendBuffer(arrayBuffer);
      });
  }
```

