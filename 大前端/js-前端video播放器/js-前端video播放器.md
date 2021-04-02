js-ǰ��video������ Ŀ¼
[TOC]
***

# ǰ��

- `Video, Blob URL`
- `HTTP Range`
- `HLS, DASH`
- `Flv.js`
- `MSE`
- `MP4`��`Fragmented MP4`������

# �Ƽ��Ķ�

- [ǰ��video](https://juejin.cn/post/6850037275579121671)
- [hls-����](https://github.com/hauk0101/video-hls-encrypt)
- [flv.js](https://github.com/Bilibili/flv.js/)

# ��ͳ����ģʽ

```html
<video id="mse" autoplay=true playsinline controls="controls">
   <source src="https://h5player.bytedance.com/video/mp4/xgplayer-demo-720p.mp4" type="video/mp4">
   ����������֧��Video��ǩ
</video>

```

## ��Ƶ��Ƭ - `Accept-Ranges`

![img](https://user-gold-cdn.xitu.io/2020/7/15/1734ff41d8698949?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

![img](https://user-gold-cdn.xitu.io/2020/7/15/1734ff41d091fd45?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

- `HTTP`������Ӧ��״̬����`206`
- `request`��`range: bytes=0-`���ڼ�������Ƿ�֧��`Range`����
- �����Ӧ�д���`Accept-Ranges`�ײ���ֵ��Ϊ`none`����ʾ�÷�����֧�ַ�Χ����
- `Accept-Ranges: bytes`��ʾ�綨��Χ�ĵ�λ��`bytes`
- `Content-Length`��Ҫ���ص���Ƶ��������С

## �������������ض��ķ�Χ

- `range`�ײ����ɸ������󣬸��ײ�ָʾ������Ӧ�÷����ļ�����һ���ֻ򼸲���

### ��һ��Χ

- ������Դ��ĳһ����

![img](https://user-gold-cdn.xitu.io/2020/7/15/1734ff41ca1325a5?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### ���ط�Χ

- `range`ͷ��֧��һ�������ĵ��Ķ�����֣�����Χ��һ�����ŷֿ�

```js
$ curl http://www.example.com -i -H "Range: bytes=0-50, 100-150"

```

`Response`:

![img](https://user-gold-cdn.xitu.io/2020/7/15/1734ff434039b33d?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### ����ʽ��Χ����

- �����¿�ʼ���������ԴƬ�ε�ʱ�򣬱���ȷ���Դ���һ��Ƭ�α�����֮�����Դû�н��й��޸�
- **��If-Range��** �����ײ�����������������ʽ��Χ���󣺼�����������Ļ�����������ͻ���Ч���������᷵��״̬��Ϊ 206 Partial ����Ӧ���Լ���Ӧ����Ϣ����
- ��������δ�ܵõ����㣬��ô�ͻ᷵��״̬��Ϊ **��200 OK��** ����Ӧ��ͬʱ����������Դ
- ���ײ������� **��Last-Modified��** ��֤������ **��ETag��** һ��ʹ�ã����Ƕ��߲���ͬʱʹ��

### ��Χ�������Ӧ

����״̬��

- ������ɹ�������£��������᷵�� **��206 Partial Content��** ״̬�롣
- ������ķ�ΧԽ�������£���Χֵ��������Դ�Ĵ�С�����������᷵�� **��416 Requested Range Not Satisfiable��** ������ķ�Χ�޷����㣩 ״̬�롣
- �ڲ�֧�ַ�Χ���������£��������᷵�� **��200 OK��** ״̬�롣

# ��ý��

- һ������ý������ѹ���󣬾�������ֶη������ݣ�ʹ�����ݰ���������ˮһ������
- �����ʹ�ô˼������ͱ�����ʹ��ǰ��������ý���ļ�
- ������ʽ���䷽ʽ��˳����ʽ�����ʵʱ��ʽ����

![img](https://user-gold-cdn.xitu.io/2020/7/15/1734ff41d79f0b50?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

`HLS`�ʹ�ͳ���ŵ�����

![img](https://user-gold-cdn.xitu.io/2020/7/15/1734ff421406b8d2?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## `Blob`

![img](https://user-gold-cdn.xitu.io/2020/7/15/1734ff4214d30fe5?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

# Blob vs ArrayBuffer

��ʵ��ǰ�˳��� **��Blob ����** ֮�⣬�㻹���ܻ����� **��ArrayBuffer ����**�������ڱ�ʾͨ�õģ��̶����ȵ�ԭʼ���������ݻ��������㲻��ֱ�Ӳ��� ArrayBuffer �����ݣ�������Ҫ����һ�� TypedArray ����� DataView ���󣬸ö������ض���ʽ��ʾ����������ʹ�øö����ȡ��д�뻺���������ݡ�

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

- ����ԭ���ǰ��������ֳ�һ����С�Ļ��� HTTP ���ļ������أ�ÿ��ֻ����һЩ����ý�������ڲ���ʱ���ͻ��˿���ѡ�����಻ͬ�ı���Դ���Բ�ͬ����������ͬ������Դ��������ý��Ự��Ӧ��ͬ���������ʡ�
- ���û����ź�ǿ�ȷ�������ʱ����Ƶ���ᶯ̬�������ṩ��ɫ������Ч��

![img](https://user-gold-cdn.xitu.io/2020/7/15/1734ff4227ae6eb2?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

##  HLS ����Ӧ������

- HLS ��һ������Ӧ��������Э�顣��ˣ�HLS �����Զ�̬��ʹ��Ƶ�ֱ�������Ӧÿ���˵�����״�������������ʹ�ø��� WiFi����������ֻ�����ʽ���������Ƶ�����ǣ�������������������ӵĹ�������������ϣ�������Խϵ͵ķֱ��ʹۿ���ͬ����Ƶ
- �ڿ�ʼһ����ý��Ựʱ���ͻ��˻�����һ������Ԫ���ݵ� Extended M3U��m3u8��Playlist �ļ�������Ѱ�ҿ��õ�ý����

![img](https://user-gold-cdn.xitu.io/2020/7/15/1734ff423933ac40?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### `m3u8`����

- ʹ�� [hls.js](https://github.com/video-dev/hls.js) ��� JavaScript ʵ�ֵ� HLS �ͻ��ˣ����ṩ�� [����ʾ��](https://hls-js.netlify.app/demo/)������һ�¾���� m3u8 �ļ�

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

### �ļ��б�

ͨ���۲� Master Playlist ��Ӧ�� m3u8 �ļ������ǿ���֪������Ƶ֧������ 5 �ֲ�ͬ�����ȵ���Ƶ��

- 1920x1080��1080P��
- 1280x720��720P��
- 848x480��480P��
- 512x288
- 320x184

��ͬ��������Ƶ��Ӧ��ý�岥���б��ᶨ���ڸ��Ե� m3u8 �ļ��С����������� 720P ����ƵΪ�������鿴���Ӧ�� m3u8 �ļ���

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

- ���û�ѡ��ĳ�������ȵ���Ƶ֮�󣬽������ظ������ȶ�Ӧ��ý�岥���б�m3u8 �ļ��������б��оͻ��г�ÿ��Ƭ�ε���Ϣ
- HLS �Ĵ���/��װ��ʽ�� MPEG-2 TS��MPEG-2 Transport Stream������һ�ִ���ʹ洢������Ƶ����Ƶ��ͨ��Э��������ݵı�׼��ʽ���������ֵ��ӹ㲥ϵͳ���� DVB��ATSC��IPTV �ȵ�
- ��Ҫע���������һЩ�ֳɵĹ��ߣ������ǿ��԰Ѷ�� TS �ļ��ϲ�Ϊ mp4 ��ʽ����Ƶ�ļ�
- ���Ҫ����Ƶ��Ȩ�����������ǿ��Կ���ʹ�öԳƼ����㷨������ AES-128 ����Ƭ���жԳƼ��ܡ����ͻ��˽��в���ʱ���ȸ��� m3u8 �ļ������õ���Կ��������ַ����ȡ�ԳƼ��ܵ���Կ��Ȼ�������ط�Ƭ������Ƭ������ɺ���ʹ��ƥ��ĶԳƼ����㷨���н��ܲ���

![img](https://user-gold-cdn.xitu.io/2020/7/15/1734ff423a6f6424?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

# `DASH`

- ���� HTTP �Ķ�̬����Ӧ����Ӣ�Dynamic Adaptive Streaming over HTTP����д DASH��Ҳ�� MPEG-DASH����һ������Ӧ��������������ʹ��������ý�����ͨ����ͳ�� HTTP ����������Ի���������
- ��ͬ�� HLS��HDS �� Smooth Streaming��DASH �����ı����������������Խ����κα����ʽ��������ݣ��� H.265��H.264��VP9 ��
- MPD��ý���ļ��������ļ���manifest������������ HLS �� m3u8 �ļ���
- Representation����Ӧһ����ѡ��������alternative������ 480p ��Ƶ��720p ��Ƶ��44100 ������Ƶ�ȶ�ʹ�� Representation ������
- Segment����Ƭ����ÿ�� Representation �Ữ��Ϊ��� Segment��Segment ��Ϊ 4 �࣬���У�����Ҫ���ǣ�Initialization Segment��ÿ�� Representation ������ 1 �� Init Segment����Media Segment��ÿ�� Representation ��ý�����ݰ������� Media Segment����

![img](https://user-gold-cdn.xitu.io/2020/7/15/1734ff423f39e851?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## ������Ƶ������`DASH`�����е�`MPD`�ļ�

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

## ͷ�ļ�

FLV ͷ�ļ�����9 �ֽڣ�

- 1-3��ǰ 3 ���ֽ����ļ���ʽ��ʶ��FLV 0x46 0x4C 0x56����
- 4-4���� 4 ���ֽ��ǰ汾��0x01����
- 5-5���� 5 ���ֽڵ�ǰ 5 �� bit �Ǳ����ı����� 0��
  - �� 5 ���ֽڵĵ� 6 �� bit ��Ƶ���ͱ�־��TypeFlagsAudio����
  - �� 5 ���ֽڵĵ� 7 �� bit Ҳ�Ǳ����ı����� 0��
  - ��5���ֽڵĵ�8��bit��Ƶ���ͱ�־��TypeFlagsVideo����
- 6-9: �� 6-9 ���ĸ��ֽڻ��Ǳ����ģ�������Ϊ 00000009��
- �����ļ�ͷ�ĳ��ȣ�һ���� 9��3+1+1+4����

![img](https://user-gold-cdn.xitu.io/2020/7/15/1734ff425e47d37b?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## `flv.js`

- [flv.js](https://github.com/Bilibili/flv.js/) ���ô� JavaScript ��д�� HTML5 Flash Video��FLV�������������ײ������� [Media Source Extensions](https://w3c.github.io/media-source/)����ʵ�����й����У������Զ����� FLV ��ʽ�ļ���ι��ԭ�� HTML5 Video ��ǩ��������Ƶ���ݣ�ʹ������ڲ����� Flash ������²��� FLV ��Ϊ���ܡ�
- ֧�ֲ��� H.264 + AAC / MP3 ����� FLV �ļ���
- ֧�ֲ��Ŷ�ηֶ���Ƶ��
- ֧�ֲ��� HTTP FLV ���ӳ�ʵʱ����
- ֧�ֲ��Ż��� WebSocket ����� FLV ʵʱ����
- ���� Chrome��FireFox��Safari 10��IE11 �� Edge��
- ���͵Ŀ�����֧���������Ӳ�����١�

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



## ����ԭ��

- flv.js �Ĺ���ԭ���ǽ� FLV �ļ���ת��Ϊ ISO BMFF��Fragmented MP4��Ƭ�Σ�Ȼ��ͨ�� Media Source Extensions API �� mp4 ��ι�� HTML5 `<video>` Ԫ��

![img](https://user-gold-cdn.xitu.io/2020/7/15/1734ff4260397d4f?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

# ��������ͼ

- ����`CanvasRenderingContext2D.drawImage()`��ʵ��

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>��������ͼʾ��</title>
  </head>
  <body>
    <h3>��������ͼʾ��</h3>
    <video id="video" controls="controls" width="460" height="270" crossorigin="anonymous">
      <!-- ���滻Ϊʵ����Ƶ��ַ -->
      <source src="https://xxx.com/vid_159411468092581" />
    </video>
    <button onclick="captureVideo()">��ͼ</button>
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

# `canvas`������Ƶ

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ʹ�� Canvas ������Ƶ</title>
  </head>
  <body>
    <h3>ʹ�� Canvas ������Ƶ</h3>
    <video id="video" controls="controls" style="display: none;">
      <!-- ���滻Ϊʵ����Ƶ��ַ -->
      <source src="https://xxx.com/vid_159411468092581" />
    </video>
    <canvas
      id="myCanvas"
      width="460"
      height="270"
      style="border: 1px solid blue;"
    ></canvas>
    <div>
      <button id="playBtn">����</button>
      <button id="pauseBtn">��ͣ</button>
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

- �˴������ʹ��`requestAnimationFrame`��ԭ����3��һ��`setTimeout`�ᵼ�µ�֡���������ܲ���ǻ�ͼ����(��üӸ�����canvas)���������˫������ƻ��������



