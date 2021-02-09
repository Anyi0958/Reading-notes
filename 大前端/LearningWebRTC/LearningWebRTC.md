LearningWebRTC Ŀ¼
[TOC]
***
# ǰ��
- �ʺ�`HTML`��`JavaScript`����`Web`Ӧ�ó�����о�����
- ���������û�����Ƶ����Ƶ���������������µ�Ӧ�ó���
- ͨ�����û�֮��ת�Ƹ�����������ʵ��Ӧ�ó���
- ������д�������ŵ����繤��ʦ
- ʵʱͨ�ŵ��ڲ�����ԭ��

## ǰ��
- ���ձ�̸�����������
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

## �Ƽ��Ķ�
- ��Learning WebRTC��
- WebRTC����[Github](http://github.com/binux "Github")
- [����](https://bloggeek.me "����")
- [WebRTC](http://www.webrtc.org/ "WebRTCʵ��Դ��")
- [�������](http://www.webrtc.org/faq "codec")
- [W3C-webrtc����ϸ��](http://www.w3.org/TR/webrtc/ "webrtc����ϸ��")
***
# 1. ����WebRTC֮��
���»���֪ʶ��
- ��Ƶ����Ƶ����ķ�չ��״
- WebRTC������Ƶ�����Ӱ��
- WebRTC��Ҫ���Լ�ʹ�÷���

## ��WebRTCƽ̨������Ƶ����Ƶ
��Ҫ���ǣ�
	- ���ӶϿ�
	- ���ݶ�ʧ
	- NAT��͸
API:
	- ��׽����ͷ����˷�
	- ����Ƶ����
	- �����
	- �Ự����

- ��Ƶ����Ƶ�ı���룺codec(��ý�������źű������)
- ���õı��������H.264, Opus, iSAC, VP8
- WebRTC��������������(AJAX, WebSockets)
- �Ự����ͨ����Ϊ**����**��������������н���������������

## WebRTC��Ӧ��
- ���ģ������������֮�佨��������һ����Ե�����
- ����Ӧ���ڣ��ļ������ı����졢������Ϸ��������ͨ
- ���ӵ��ӳ١������ܣ�ʹ�õײ�Э�����ṩ�������ܣ��Ӷ�����������������������ʵ���ڶ�ʱ���ڴ������������

# 2. ��ȡ�û�ý��
��Ҫ���ݣ�
1. ��η���ý���豸
2. ���Լ��ý����
3. ��δ�������豸
4. ����޸�������

## ���þ�̬������
1. `npm install -g node-static`
2. `static`ָ���˿�

## ý����ҳ��
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
// ����
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
    alert("��Ǹ������������֧�� getUserMedia");
}
```
```js
// ��
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
            alert("�汾��֧��");
            return;
        }
    }
}

let media = new UserMedia();
media.getMedia('video');
```

- `<video>`ͨ��`window.URL.createObjectURL`�������ص���Ԫ����
- `<video>`���ܽ���`JS`��Ϊ������ֻ��ͨ��һЩ�ַ�������ȡ��Ƶ��
- �����ڻ�ȡ������󣬻Ὣ��ת����һ�����ص�URL��������ǩ���ܴ������ַ��ȡ������
### ע��
- `<video>`Ԫ����Ӧ�ð���һ��`autoplay`���ԣ���ʾ�Զ�����
- ������ͷ��ȡ`stream`���󲢵���ҳ���ϵ���ƵԪ��������̣������C/C++�Ƿǳ�������

## ý�����ķ���- getUserMedia API
### API������
```js
navigator.getUserMedia({video: false, audio: true}, function (stream){
	// ��Ƶ���ﲻ������Ƶ
})
```
### ������Ƶ��׽
#### �Ƽ��Ķ�
- [getUserMedia API](http://tools.ietf.org/html/draft-alvestrand-constraints-resolution-03 "���ƹ淶ϸ��")
���磺
1. ��ͷֱ���
2. ֡����
3. ��Ƶ��߱�

#### Ӧ��ʵ��
1. �����sample:
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
    alert("��Ǹ������������֧�� getUserMedia");
}
```
2. �ƶ���ʹ��
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
- �������ã�������webRTCӦ�õ�����

### ���豸����
- �豸�ϽӲ���̨����ͷ����˷�
- ��¶��`MediaSourceTrack`��API
- `MediaStreamTrack.getSources`�Ѿ����ã�������`navigator.mediaDevices.enumerateDevices().then(function(sources))`
```js
navigator.mediaDevices.enumerateDevices().then(sources => {
    let audioSource = null;
    let videoSource = null;

    for(let i = 0; i < sources.length; ++i){
        let source = sources[i];
        if(source.kind === 'audio'){
            console.log("������˷�:", source.label, source.id);
            audioSource = source.id;
        } else if(source.kind === "video"){
            console.log("��������ͷ:", source.label, source.id);
            videoSource = source.id;
        } else {
            console.log("����δ֪��Դ:", source);
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
        error => console.log(`���ִ���${error}`)
    );
});
```

##  ����һ������
- canvas���Ի���������ͼ�κ�ͼƬ������������Ϸ
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
    alert("�Բ��������������֧��");
}
```

## �޸�ý����
- ͼƬ�˾�
���css��ʽ
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
js�����˾����ܣ�
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
    alert("�Բ��������������֧��");
}
```
- ͼƬ�������
```js
                context.fillStyle = "white";
                context.fillText("Hello World!", 10, 10);
```

