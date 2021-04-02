js-前端video播放器 目录
[TOC]
***

# 前言

- `Video, Blob URL`
- `HTTP Range`
- `HLS, DASH`
- `Flv.js`
- `MSE`
- `MP4`和`Fragmented MP4`的区别

# 推荐阅读

- [前端video](https://juejin.cn/post/6850037275579121671)
- [hls-加密](https://github.com/hauk0101/video-hls-encrypt)
- [flv.js](https://github.com/Bilibili/flv.js/)

# 传统播放模式

```html
<video id="mse" autoplay=true playsinline controls="controls">
   <source src="https://h5player.bytedance.com/video/mp4/xgplayer-demo-720p.mp4" type="video/mp4">
   你的浏览器不支持Video标签
</video>

```

## 视频切片 - `Accept-Ranges`

![img](https://user-gold-cdn.xitu.io/2020/7/15/1734ff41d8698949?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

![img](https://user-gold-cdn.xitu.io/2020/7/15/1734ff41d091fd45?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

- `HTTP`请求响应的状态码是`206`
- `request`的`range: bytes=0-`用于检测服务端是否支持`Range`请求
- 如果响应中存在`Accept-Ranges`首部，值不为`none`，表示该服务器支持范围请求
- `Accept-Ranges: bytes`表示界定范围的单位是`bytes`
- `Content-Length`：要下载的视频的完整大小

## 服务器端请求特定的范围

- `range`首部生成该类请求，该首部指示服务器应该返回文件的哪一部分或几部分

### 单一范围

- 请求资源的某一部分

![img](https://user-gold-cdn.xitu.io/2020/7/15/1734ff41ca1325a5?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### 多重范围

- `range`头部支持一次请求文档的多个部分，请求范围用一个逗号分开

```js
$ curl http://www.example.com -i -H "Range: bytes=0-50, 100-150"

```

`Response`:

![img](https://user-gold-cdn.xitu.io/2020/7/15/1734ff434039b33d?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### 条件式范围请求

- 当重新开始请求更多资源片段的时候，必须确保自从上一个片段被接收之后该资源没有进行过修改
- **「If-Range」** 请求首部可以用来生成条件式范围请求：假如条件满足的话，条件请求就会生效，服务器会返回状态码为 206 Partial 的响应，以及相应的消息主体
- 假如条件未能得到满足，那么就会返回状态码为 **「200 OK」** 的响应，同时返回整个资源
- 该首部可以与 **「Last-Modified」** 验证器或者 **「ETag」** 一起使用，但是二者不能同时使用

### 范围请求的响应

三种状态：

- 在请求成功的情况下，服务器会返回 **「206 Partial Content」** 状态码。
- 在请求的范围越界的情况下（范围值超过了资源的大小），服务器会返回 **「416 Requested Range Not Satisfiable」** （请求的范围无法满足） 状态码。
- 在不支持范围请求的情况下，服务器会返回 **「200 OK」** 状态码。

# 流媒体

- 一连串的媒体数据压缩后，经过网络分段发送数据，使得数据包得以像流水一样发送
- 如果不使用此技术，就必须在使用前下载整个媒体文件
- 两种流式传输方式：顺序流式传输和实时流式传输

![img](https://user-gold-cdn.xitu.io/2020/7/15/1734ff41d79f0b50?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

`HLS`和传统播放的区别

![img](https://user-gold-cdn.xitu.io/2020/7/15/1734ff421406b8d2?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## `Blob`

![img](https://user-gold-cdn.xitu.io/2020/7/15/1734ff4214d30fe5?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

# Blob vs ArrayBuffer

其实在前端除了 **「Blob 对象」** 之外，你还可能会遇到 **「ArrayBuffer 对象」**。它用于表示通用的，固定长度的原始二进制数据缓冲区。你不能直接操纵 ArrayBuffer 的内容，而是需要创建一个 TypedArray 对象或 DataView 对象，该对象以特定格式表示缓冲区，并使用该对象读取和写入缓冲区的内容。

## `Ajax`

```js
function GET(url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'arraybuffer'; // or xhr.responseType = "blob";
  xhr.send();

  xhr.onload = function(e) {
    if (xhr.status != 200) {
      alert("Unexpected status code " + xhr.status + " for " + url);
      return false;
    }
    callback(new Uint8Array(xhr.response)); // or new Blob([xhr.response]);
  };
}

```

# `HLS`

- 工作原理是把整个流分成一个个小的基于 HTTP 的文件来下载，每次只下载一些。当媒体流正在播放时，客户端可以选择从许多不同的备用源中以不同的速率下载同样的资源，允许流媒体会话适应不同的数据速率。
- 当用户的信号强度发生抖动时，视频流会动态调整以提供出色的再现效果

![img](https://user-gold-cdn.xitu.io/2020/7/15/1734ff4227ae6eb2?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

##  HLS 自适应比特流

- HLS 是一种自适应比特率流协议。因此，HLS 流可以动态地使视频分辨率自适应每个人的网络状况。如果你正在使用高速 WiFi，则可以在手机上流式传输高清视频。但是，如果你在有限数据连接的公共汽车或地铁上，则可以以较低的分辨率观看相同的视频
- 在开始一个流媒体会话时，客户端会下载一个包含元数据的 Extended M3U（m3u8）Playlist 文件，用于寻找可用的媒体流

![img](https://user-gold-cdn.xitu.io/2020/7/15/1734ff423933ac40?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### `m3u8`讲解

- 使用 [hls.js](https://github.com/video-dev/hls.js) 这个 JavaScript 实现的 HLS 客户端，所提供的 [在线示例](https://hls-js.netlify.app/demo/)，来看一下具体的 m3u8 文件

```js
#EXTM3U
#EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=2149280,CODECS="mp4a.40.2,avc1.64001f",RESOLUTION=1280x720,NAME="720"
url_0/193039199_mp4_h264_aac_hd_7.m3u8
#EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=246440,CODECS="mp4a.40.5,avc1.42000d",RESOLUTION=320x184,NAME="240"
url_2/193039199_mp4_h264_aac_ld_7.m3u8
#EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=460560,CODECS="mp4a.40.5,avc1.420016",RESOLUTION=512x288,NAME="380"
url_4/193039199_mp4_h264_aac_7.m3u8
#EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=836280,CODECS="mp4a.40.2,avc1.64001f",RESOLUTION=848x480,NAME="480"
url_6/193039199_mp4_h264_aac_hq_7.m3u8
#EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=6221600,CODECS="mp4a.40.2,avc1.640028",RESOLUTION=1920x1080,NAME="1080"
url_8/193039199_mp4_h264_aac_fhd_7.m3u8
```

### 文件列表

通过观察 Master Playlist 对应的 m3u8 文件，我们可以知道该视频支持以下 5 种不同清晰度的视频：

- 1920x1080（1080P）
- 1280x720（720P）
- 848x480（480P）
- 512x288
- 320x184

不同清晰度视频对应的媒体播放列表，会定义在各自的 m3u8 文件中。这里我们以 720P 的视频为例，来查看其对应的 m3u8 文件：

```js
#EXTM3U
#EXT-X-VERSION:3
#EXT-X-PLAYLIST-TYPE:VOD
#EXT-X-TARGETDURATION:11
#EXTINF:10.000,
url_462/193039199_mp4_h264_aac_hd_7.ts
#EXTINF:10.000,
url_463/193039199_mp4_h264_aac_hd_7.ts
#EXTINF:10.000,
url_464/193039199_mp4_h264_aac_hd_7.ts
#EXTINF:10.000,
...
url_525/193039199_mp4_h264_aac_hd_7.ts
#EXT-X-ENDLIST

```

- 当用户选定某种清晰度的视频之后，将会下载该清晰度对应的媒体播放列表（m3u8 文件），该列表中就会列出每个片段的信息
- HLS 的传输/封装格式是 MPEG-2 TS（MPEG-2 Transport Stream），是一种传输和存储包含视频、音频与通信协议各种数据的标准格式，用于数字电视广播系统，如 DVB、ATSC、IPTV 等等
- 需要注意的是利用一些现成的工具，我们是可以把多个 TS 文件合并为 mp4 格式的视频文件
- 如果要做视频版权保护，那我们可以考虑使用对称加密算法，比如 AES-128 对切片进行对称加密。当客户端进行播放时，先根据 m3u8 文件中配置的密钥服务器地址，获取对称加密的密钥，然后再下载分片，当分片下载完成后再使用匹配的对称加密算法进行解密播放

![img](https://user-gold-cdn.xitu.io/2020/7/15/1734ff423a6f6424?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

# `DASH`

- 基于 HTTP 的动态自适应流（英语：Dynamic Adaptive Streaming over HTTP，缩写 DASH，也称 MPEG-DASH）是一种自适应比特率流技术，使高质量流媒体可以通过传统的 HTTP 网络服务器以互联网传递
- 不同于 HLS、HDS 和 Smooth Streaming，DASH 不关心编解码器，因此它可以接受任何编码格式编码的内容，如 H.265、H.264、VP9 等
- MPD：媒体文件的描述文件（manifest），作用类似 HLS 的 m3u8 文件。
- Representation：对应一个可选择的输出（alternative）。如 480p 视频，720p 视频，44100 采样音频等都使用 Representation 描述。
- Segment（分片）：每个 Representation 会划分为多个 Segment。Segment 分为 4 类，其中，最重要的是：Initialization Segment（每个 Representation 都包含 1 个 Init Segment），Media Segment（每个 Representation 的媒体内容包含若干 Media Segment）。

![img](https://user-gold-cdn.xitu.io/2020/7/15/1734ff423f39e851?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 西瓜视频播放器`DASH`例子中的`MPD`文件

```xml
<?xml version="1.0"?>
<!-- MPD file Generated with GPAC version 0.7.2-DEV-rev559-g61a50f45-master  at 2018-06-11T11:40:23.972Z-->
<MPD xmlns="urn:mpeg:dash:schema:mpd:2011" minBufferTime="PT1.500S" type="static" mediaPresentationDuration="PT0H1M30.080S" maxSegmentDuration="PT0H0M1.000S" profiles="urn:mpeg:dash:profile:full:2011">
 <ProgramInformation moreInformationURL="http://gpac.io">
  <Title>xgplayer-demo_dash.mpd generated by GPAC</Title>
 </ProgramInformation>

 <Period duration="PT0H1M30.080S">
  <AdaptationSet segmentAlignment="true" maxWidth="1280" maxHeight="720" maxFrameRate="25" par="16:9" lang="eng">
   <ContentComponent id="1" contentType="audio" />
   <ContentComponent id="2" contentType="video" />
   <Representation id="1" mimeType="video/mp4" codecs="mp4a.40.2,avc3.4D4020" width="1280" height="720" frameRate="25" sar="1:1" startWithSAP="0" bandwidth="6046495">
    <AudioChannelConfiguration schemeIdUri="urn:mpeg:dash:23003:3:audio_channel_configuration:2011" value="2"/>
    <BaseURL>xgplayer-demo_dashinit.mp4</BaseURL>
    <SegmentList timescale="1000" duration="1000">
     <Initialization range="0-1256"/>
      <SegmentURL mediaRange="1257-1006330" indexRange="1257-1300"/>
      <SegmentURL mediaRange="1006331-1909476" indexRange="1006331-1006374"/>
      ...
      <SegmentURL mediaRange="68082016-68083543" indexRange="68082016-68082059"/>
    </SegmentList>
   </Representation>
  </AdaptationSet>
 </Period>
</MPD>

```

# `FLV`

![img](https://user-gold-cdn.xitu.io/2020/7/15/1734ff425075f415?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 头文件

FLV 头文件：（9 字节）

- 1-3：前 3 个字节是文件格式标识（FLV 0x46 0x4C 0x56）。
- 4-4：第 4 个字节是版本（0x01）。
- 5-5：第 5 个字节的前 5 个 bit 是保留的必须是 0。
  - 第 5 个字节的第 6 个 bit 音频类型标志（TypeFlagsAudio）。
  - 第 5 个字节的第 7 个 bit 也是保留的必须是 0。
  - 第5个字节的第8个bit视频类型标志（TypeFlagsVideo）。
- 6-9: 第 6-9 的四个字节还是保留的，其数据为 00000009。
- 整个文件头的长度，一般是 9（3+1+1+4）。

![img](https://user-gold-cdn.xitu.io/2020/7/15/1734ff425e47d37b?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## `flv.js`

- [flv.js](https://github.com/Bilibili/flv.js/) 是用纯 JavaScript 编写的 HTML5 Flash Video（FLV）播放器，它底层依赖于 [Media Source Extensions](https://w3c.github.io/media-source/)。在实际运行过程中，它会自动解析 FLV 格式文件并喂给原生 HTML5 Video 标签播放音视频数据，使浏览器在不借助 Flash 的情况下播放 FLV 成为可能。
- 支持播放 H.264 + AAC / MP3 编码的 FLV 文件；
- 支持播放多段分段视频；
- 支持播放 HTTP FLV 低延迟实时流；
- 支持播放基于 WebSocket 传输的 FLV 实时流；
- 兼容 Chrome，FireFox，Safari 10，IE11 和 Edge；
- 极低的开销，支持浏览器的硬件加速。

```js
<script src="flv.min.js"></script>
<video id="videoElement"></video>
<script>
    if (flvjs.isSupported()) {
        var videoElement = document.getElementById('videoElement');
        var flvPlayer = flvjs.createPlayer({
            type: 'flv',
            url: 'http://example.com/flv/video.flv'
        });
        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.load();
        flvPlayer.play();
    }
</script>

```



## 工作原理

- flv.js 的工作原理是将 FLV 文件流转换为 ISO BMFF（Fragmented MP4）片段，然后通过 Media Source Extensions API 将 mp4 段喂给 HTML5 `<video>` 元素

![img](https://user-gold-cdn.xitu.io/2020/7/15/1734ff4260397d4f?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

# 播放器截图

- 利用`CanvasRenderingContext2D.drawImage()`来实现

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>播放器截图示例</title>
  </head>
  <body>
    <h3>播放器截图示例</h3>
    <video id="video" controls="controls" width="460" height="270" crossorigin="anonymous">
      <!-- 请替换为实际视频地址 -->
      <source src="https://xxx.com/vid_159411468092581" />
    </video>
    <button onclick="captureVideo()">截图</button>
    <script>
      let video = document.querySelector("#video");
      let canvas = document.createElement("canvas");
      let img = document.createElement("img");
      img.crossOrigin = "";
      let ctx = canvas.getContext("2d");

      function captureVideo() {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        img.src = canvas.toDataURL();
        document.body.append(img);
      }
    </script>
  </body>
</html>

```

# `canvas`播放视频

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>使用 Canvas 播放视频</title>
  </head>
  <body>
    <h3>使用 Canvas 播放视频</h3>
    <video id="video" controls="controls" style="display: none;">
      <!-- 请替换为实际视频地址 -->
      <source src="https://xxx.com/vid_159411468092581" />
    </video>
    <canvas
      id="myCanvas"
      width="460"
      height="270"
      style="border: 1px solid blue;"
    ></canvas>
    <div>
      <button id="playBtn">播放</button>
      <button id="pauseBtn">暂停</button>
    </div>
    <script>
      const video = document.querySelector("#video");
      const canvas = document.querySelector("#myCanvas");
      const playBtn = document.querySelector("#playBtn");
      const pauseBtn = document.querySelector("#pauseBtn");
      const context = canvas.getContext("2d");
      let timerId = null;

      function draw() {
        if (video.paused || video.ended) return;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        timerId = setTimeout(draw, 0);
      }

      playBtn.addEventListener("click", () => {
        if (!video.paused) return;
        video.play();
        draw();
      });

      pauseBtn.addEventListener("click", () => {
        if (video.paused) return;
        video.pause();
        clearTimeout(timerId);
      });
    </script>
  </body>
</html>

```

- 此代码最好使用`requestAnimationFrame`，原因有3，一是`setTimeout`会导致掉帧，二是性能差，三是绘图卡顿(最好加个离屏canvas)，浏览器的双缓冲机制会出现问题



