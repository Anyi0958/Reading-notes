H5-MediaSourceExtension Ŀ¼
[TOC]
***

# ǰ��

# �Ƽ��Ķ�

- [MDN-MSE API](https://developer.mozilla.org/zh-CN/docs/Web/API/Media_Source_Extensions_API)
- [H5ֱ��ϵ�ж� MSE(Media Source Extensions)-MSE-����](https://www.jianshu.com/p/1bfe4470349b)
- [�ٷ��ĵ�����](https://segmentfault.com/a/1190000011245394)

# ����

- ý��Դ��չ API��MSE�� �ṩ��ʵ���޲���һ��� Web ����ý��Ĺ��ܡ�
- ʹ�� MSE��ý�崮���ܹ�ͨ�� JavaScript ������������ͨ��ʹ��`audio`��`video`Ԫ�ؽ��в��š�

# ����ԭ��

- ���мܹ����ڼ򵥣�ֻ������һ�β���������Ŀ����Ҫ���޷�ʵ�ֲ��/�ϲ����������ļ���
- ��ý��ֱ�����ڻ���ʹ�� Flash ���з����Լ�ͨ�� RTMP Э�������Ƶ������ Flash ý���������

# `MSE`��׼

- `MSE`���԰ѵ���ý���ļ���`SRC`ֵ�滻��`MediaSource`һ�������������ŵ�ý���ļ���׼��״̬����Ϣ�������������Լ����`SourceBuffer`���󣨴�����������������Ĳ�ͬý��飩��Ԫ��
- `MSE`���Ը������ݻ�ȡ�Ĵ�С��Ƶ�ʣ������ڴ�ռ�����飨����ʲôʱ�򻺴汻���գ������и��Ӿ�׼�ؿ���
- ����������չ�� API ��������Ӧ���������ͻ��ˣ�����DASH �� HLS �Ŀͻ��ˣ��Ļ���

## ȱ��

- ���ִ�������д����ܼ��� MSE ��ý�壨assets���ǳ���ʱ��������Ҫ���Ĵ����������Դ����Դ������ʹ���ⲿʵ�ó�������ת���ɺ��ʵĸ�ʽ
- ��Ȼ�����֧�ּ��� MSE �ĸ���ý�������������� H.264 ��Ƶ���롢AAC ��Ƶ����� MP4 �����ĸ�ʽ�Ƿǳ������ģ���һ������
- MSE �ṩ��һ�� API����������ʱ��������ͱ�����Ƿ���֧��

## ע��

- ���û�о�ȷ�Ŀ���ʱ�䡢ý���������ڴ��ͷŵ�����ʹ��`audio`��`video`��һ�����Ӽ򵥵����õķ���

# `DASH`Э��

- DASH��Dynamic Adaptive Streaming over HTTP ����һ���淶������Ӧ����Ӧ����α���ȡ��Э��
- ���ʣ������� MSE ������һ���㣬������������Ӧ�����ʴ����ͻ���
- ��Ȼ�Ѿ���һ�����Ƶ�Э���ˣ����� HTTP ����ֱ����HLS�������� DASH ����õĿ�ƽ̨������

## ����

- DASH �������߼�������Э�����Ƴ����ͻ���Ӧ�ó����߼��У�ʹ�ø��򵥵� HTTP Э���ȡ�ļ�
- ������һ���򵥵ľ�̬�ļ���������֧�� DASH�����CDNҲ���Ѻ�
- ��֮ǰ���������������γ������Աȣ���Щ�����������Ҫ��������֤����÷Ǳ�׼�Ŀͻ���/������Э�����ʵ��
- �зǳ�������ɿ�Դ�Ĺ��ߣ���ʵ��ת�����ݣ���������죬����Ӧ DASH��DASH �ļ����������� JavaScript ��д�� DASH �ͻ��˿�

## �����ص�

- DASH ����������������漰���㲥����ֱ�����ۿ�����
- �㲥�����ÿ�������ʱ���ý���ļ�ת������ֲ�ͬ�ķֱ�������

## ȱ����Ա�

- ʵʱ�������ݻ�������ת��Ͳ����������ӳ٣�`DASH`���ʺ���������`WebRTC`�ļ�ʱͨѶ��������֧�ֱ�`WebRTC`����Ŀͻ�������

# �ӿ�

- `MediaSource`�����󲥷ŵ�ý����Դ
- `SourceBuffer`��һ������`MediaSource`���󱻴���`HTMLMediaElement`��ý���
- `VideoPlaybackQuality`��`video`���ŵ���Ƶ��������Ϣ���类�������𻵵�֡����������`HTMLVideoElement.getVideoPlaybackQuality()`����

# `MediaSource`

- ��������Ƶ�����ڼ��غú����̲���

```js
let video = document.querySelector('video');

let assetURL = 'test.mp4';
// ��Ҫ����˵���йر������������
let mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';

// ͳһ�ӿ�
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

// ���sourceBuffer
function sourceOpen(_){
    console.log(`sourceOpen:${this.readyState}`);

    let mediaSource = this;
    let sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);

    // �������ݺ󣬼������ݣ������ϸ��£����������ݷ��뵽sourceBuffer��
    fetchAB(assetURL, function(buf){
        sourceBuffer.addEventListener('updateend', function (_) {
            mediaSource.endOfStream();
            video.play();
            console.log(`fetchAB:${mediaSource.readyState}`);
        });

        sourceBuffer.appendBuffer(buf);
    });
}

// Ajax����get��ʽ���Ӻ�˻�ȡ`arrayBuffer`���͵����ݣ����ҽ��������ݷ���ص�����cb��
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

## ע��

- ��`DASH`�У��Ƽ�ʹ�õ���`Fragmented Mp4`(fMp4)��ʽ���봫ͳ��`Mp4`��ͬ
- ���ʹ�ô�ͳ`MP4`�ͻᱨ��`Uncaught DOMException: Failed to execute 'endOfStream' on 'MediaSource': The MediaSource's readyState is not 'open'.`

### ����취

- ת��`MP4`Ϊ`fMP4`��[BenTo4](https://www.bento4.com/downloads/)

- `.\mp4fragment.exe .\v0temp.mp4 v0-new.mp4`

# `Media Source Extension`ת��

- ��ʹ��`Media Source Extension`ʱ����Ҫ�ȶ�`assets`��Դ��������������Ȼ����ܱ��ý����`stream`
- �����Ǳ���Ĺ�����

## ��ʼ

- ����Ҫһ������ȷ���ļ���������`container`��������`codec`���Լ������֧��
- ���ڱ�����`codec`��ͬ���ļ���Ƭ��Ҫ��ѭ`ISO BMFF spec`׼��
  - [ISO BMFF Byte Stream Format](https://www.w3.org/TR/mse-byte-stream-format-isobmff/)
- �������ͨ��HTTPȥʹ�ö�̬������(DASH)ȥ���������������Ҫ����Դת�ɶ���ֱ��ʡ��󲿷ֵ�`DASH`�û�ϣ��һ����Ӧý��չʾ�嵥�ļ��������ɶ�ֱ��ʵ��ļ�ʱ����Ҳͬʱ���֡�

# ���Ե���Ƶ

- [��Ƶ-demo](http://wayback.archive.org/web/20161102172252id_/http://video.blendertestbuilds.de/download.php?file=download.blender.org/peach/trailer_1080p.mov)

# ��Ҫ�Ĺ���

- `ffmpeg` - [������](http://ffmpeg.org/download.html)
- `Bento4` - [������](https://www.bento4.com/downloads/)
- `python2` - `Bento4 uses it`

# ���뷽��

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

# ���Ƭ��

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
������ audio
��   ������ und
������ stream.mpd
������ video
    ������ 1
    ������ 2
    ������ 3
    ������ 4
    ������ 5

8 directories, 1 file
```

# ����`Fetch API`

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
    // ���� ý��ı�������
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

