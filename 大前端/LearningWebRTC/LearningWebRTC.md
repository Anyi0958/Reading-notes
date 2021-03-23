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

# 3. �����򵥵�WebRTCӦ��
- �����κ�WebRTCӦ�õ��׸�������Ǵ���`RTCPeerConnection`
- �ɹ�����һ��`RTCPeerConnection`��ǰ�ᣬ������Ҫ�������������Ե����ӵ��ڲ�����ԭ��
## ��������
1. ���`UDP`����Э���ʵʱ����
2. �ڱ����������û���������ͽ���
3. ��Web���ҵ������û���NAT��͸
4. ����`RTCPeerConnection`

## ���`UDP`����Э���ʵʱ����
ʵʱ����Ҫ��˫�����п��ٵ������ٶȡ�
- ���͵��������ӣ���Ҫ����Ƶ����Ƶ�ŵ�ͬһ֡�У�����40-60֡���ٶȷ��͸���һ���û�
- ��Ϊ�������ݶ�ʧ�����Ի�Զ�ʧ��֡�Զ����ɣ�����UDP���ʺϣ�����������Ӧ��
- TCP���ʺ���Ϸ�е������ݣ���Ϸ����Ҫ�ɿ���ֻ��Ҫ��
UDP���䲻��֤�����飺
1. ����֤���ݷ��ͻ���յ��Ⱥ�˳��
2. ����֤ÿһ�����ݰ����ܹ����͵����ն�
3. ������ÿ�����ݰ���״̬

## WebRTC API
��Ҫ������
1. RTCPeerConnection����
2. �źŴ��ݺͽ���
3. �Ự����Э��-SDP
4. ����ʽ���ӽ���-ICE

## RTCPeerConnection����
`API`�������
- ��ʼ��һ�����������Լ�������ý����Ϣ
- ��������һ���û�����UDP����
- ���ܣ�
	- ά��������ڻỰ�ͶԵ����ӵ�״̬
	- �Ե����ӽ���

![1-RTCPeerConnection][01]

ʵ��������
```js
let myConnection = new RTCPeerConnection(configuration);
myConnection.onaddstream = stream => console.log(stream);
```

## �źŴ��ݺͽ���
�����ַ��`IP`��ַ�Ͷ˿ں����
��������Ĺ��̣�
1. �Ե����Ӵ���Ǳ�ڵĺ�ѡ�б�
2. ѡ���û�����
3. �����֪ͨ�û����ӣ��Ƿ���ܻ�ܾ�
4. ���ӽ��պ��֪ͨ
5. ��������Ӳ���������Ϣ
6. ����λ����Ϣ
7. ���ӳɹ���ʧ��

## �Ự����Э��-SDP
- �û���Ҫ������Ϣָ����Ƶ���������������硣
- SDP�ǻ����ַ����Ķ��������ݶ���`<key>=<value>\n`

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
## ������·�ߵ��û�

- Ϊ�˱�֤���簲ȫ

ʹ�õĶ��ּ�����
- NAT�Ự��͸���� - STUN
- �м̼�����͸NAT - TURN
- ����ʽ���ӽ��� - ICE

���͵�`WebRTC`���ӹ��̵ļܹ���
![2-WebRTCframework][02]

<<<<<<< HEAD
## STUN
=======
- �ҵ�`ip`



## `STUN`

- �����������������������ת��
>>>>>>> dev

ʹ��STUNЭ����Ҫ��һ��֧��STUNЭ��ķ�����

- ������������WebRTCӦ��ʵ������Ҫ�������������Ҫ�ṩһ��STUN��TURN������

## `TURN`

- �ͻ����ڶԵ����ӵ�˫��֮������һ��ת��
- ��Դ���Ķ�
- ��Ҫ��`TURN`������ȥ���ء������ض���ÿһ���û����͹��������ݰ�

## `ICE`

- `STUN`��`TURN`��Ϻ�ı�׼
- ÿһ��`ICE`��ѡ·������ͨ��`STUN`��`TURN`���ҵ���

## WebRTCӦ��

- ����һ��`RTCPeerConnection`
- ����`DSP offer`�ͻ�Ӧ
- Ϊ˫���ҵ�`ICE`��ѡ·��
- ����һ���ɹ���`WebRTC`����

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
- `hasRTCPeerConnection()`��ȷ���ܹ�ʹ��

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

#### ִ��״̬����ͼ

![03][03]

1. ���û��õ�ý����
2. �����Ե�����
3. һ������`offer`����һ����׼����`offer`�ͷ��ض��Ƿ�����������е�һ����
4. �ҵ����ʵĶ˿ں�`IP`��Ͻ������ӣ��ɹ���ʼ������Ϣ

#### �����û�������ͷ

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
            alert("����������֧��webRTC");
        }
    }, error => {
        alert("����������֧��WebRtc");
    });
}
```

#### `RTCPeerConnection`����

- ����`SCP offer`�ͷ��أ�Ϊ˫��Ѱ��`ICE`��ѡ·��

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



#### ����`SDP Offer`�ͷ���

- ִ��`offer`�ͷ���`answer`��������Թ��ɶԵ�����

```js
function startPeerConnection(stream) {
    let configuration = {
        "iceServers": [
            {"url": "stun:127.0.0.1:9876"}
        ]
    };

    yourConnection = new webkitRTCPeerConnection(configuration);
    theirConnection = new webkitRTCPeerConnection(configuration);

    // ��ʼoffer
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

- ����ͨ��˫����ͬһ������������У�ȷ���û��յ�`offer`ʱ����ִ�ж���첽������ʵ��`offer/answer`����

#### Ѱ��`ICE`��ѡ·��

- �����û�����ͬһ���������ʱ������Ҫһ��������������Ҫ�������������ִ�У����������ͬ���������ᵼ�»������ȶ�
- �����Ե����ӵ����һ�����ǣ���˫���䴫��`ICE`��ѡ·�����Ա��໥����

```js
function startPeerConnection(stream) {
    let configuration = {
        "iceServers": [
            {"url": "stun:127.0.0.1:9876"}
        ]
    };

    yourConnection = new webkitRTCPeerConnection(configuration);
    theirConnection = new webkitRTCPeerConnection(configuration);

    // ����ICE����
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

    // ��ʼoffer
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

- ȫ�����¼�����
- Ѱ��`ICE`��ѡ·�����첽��
- ������᲻ͣ����Ѱ��ֱ�������ܶ�Ĵ����������ȶ��ĶԵ����ӵĺ�ѡ·��
- �����Ǵ�`theirConnection`�л�ȡ`ICE`��ѡ·��ʱ����Ҫ��·�����뵽`yourConnections`�С�����һ�������ǲ���ͬһ������ʱ����Щ���ݻ�������������

#### �������ʹ�ĥ

- ����`onaddstream`��֪ͨ�û������Ѿ�������

```js
// �������Ĵ���
yourConnection.addStream(stream);
theirConnection.onaddstream = function(e) {
    theirVideo.src = window.URL.createObjectURL(e.stream);
};

//�޸ĺ�
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

#### ����`css`��ʽ

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

### �����ܽ�

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

    // ����ICE����
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

    // ��ʼoffer
    yourConnection.createOffer(offer => {
        yourConnection.setLocalDescription(offer);
        theirConnection.setRemoteDescription(offer);

        theirConnection.createAnswer(offer => {
            theirConnection.setLocalDescription(offer);
            yourConnection.setRemoteDescription(offer);
        });
    });

    // ����������
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
            alert("����������֧��webRTC");
        }
    }, error => {
        alert("����������֧��WebRtc");
    });
}
```

# 4. �������������

- ����������`WebRTC`Ӧ�ã���Ҫ�׿��ͻ��˵Ŀ�����ת��Ϊ����˵Ŀ���

## ��������

1. `Node.js`
2. `WebSocket`
3. ʶ���û�
4. �����Ӧ��`WebRTC`ͨ��
5. ����`ICE`��ѡ·���Ĵ���
6. �Ҷ�ͨ��

## �������������

- ������ͬһ�������е������û���������
- ��������Ŀ����ͨ�����紫�����ԭ�ȵ��������
- �Զ���û�������Ӧ��
  - ����һ���û�������һ���Ӷ���˫���佨��`WebRTC`����
  - һ���û���������һ����������������˫���䴫������Ӧ���`ICE`��ѡ·��

![05][05]

���̣�

- ��������������ʱ����Ϣ��
- ��½��������ʼ����¼��������˷���һ���ַ�����ʽ���û���ʶ��ȷ��û�б�ʹ��
- ��¼���룬��ʼ���У�ͨ��ʹ�öԷ��ı�ʶ�뷢������
- �����뿪��Ϣ����ֹ����
- ��������Ҫ������Ϊ���෢����Ϣ��ͨ��

ע�⣺

- ���ڷ��������ʵ��û���κι��򣬿���ʹ������Э�顢��������ģʽ

## `WebSockets`

- ����`WebRTC`��������Ĳ��������ʵʱ�ģ����ʹ��`WebSockets`������ʹ��`WebRTC`�Ե�����ʵʱ������Ϣ

- `Socket`���ַ����Ͷ������뷽ʽ˫������Ϣ
- ��ȫ������`WebSocket`��ܣ�`Meteor JavaScript framework`

- `npm`��װ`websocket`��`npm install ws`
- `wscat`��`npm install wscat`

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

- �����������˵�`connection`�¼������û������������`websocket`����ʱ������ôˣ��������ӷ���������Ϣ

- ��װ`wscat`���в��ԣ�`npm install -g ws`, `wscat -c ws://localhost:8888`������ǰ�˲���

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



## ʶ���û�

- ���͵�����Ӧ���У���������Ҫһ�ַ�����ʶ�����ӵ��û�
- ��ѭΨһ������ÿһ���û���һ���ַ�����ʽ�ı�ʶ�����û���

����һ��`id`����ʶ

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

- ����`websocket`ֻ�����ַ��Ͷ��������ݣ���`JSON`��ʽ�Ľṹ����Ϣ

## �洢����

- �ù�ϣͼ�洢���ݣ���`JS`�нж���

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

## `login`��¼

- �û�����`login`������Ϣ���ܵ�¼
- �ͻ��˷���ÿһ����Ϣ����`type`�ֶ�

�������ˣ�

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

- ������û���¼`ID`���;ܾ�

�Ͽ���β��

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

�������ݣ�`{"type": "login", "name": "foo"}`

## ����ͨ��

- ����`offer`���������û�����������һ��

- ���г�ʼ���Ĺ��̺�`WebRTC`��`offer`�ֿ���ã����˴����

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

���⣺

1. ���Ȼ�ȡ��ͼ�����û���`connection`����
2. �����һ�û��Ƿ��ڷ������ϣ�����������`offer`
3. �˷���ʹ�����κ�˫����ĺ��м���
4. ȱ�ٴ���ʧ�ܴ���

## ����Ӧ��

- Ӧ�𣺷�����������Ϣ��Ϊ`answer`���ݸ���һ��

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

- ���һ���û��ȷ���`answer`����`offer`���������ҷ�������ʵ��
- ��ʵ����`webRTC`��`RTCPeerConnection`��`createOffer`��`createAnswer`

���ԣ�

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

## ����`ICE`��ѡ·��

- `WebRTC`��������һ���������û��䴦��`ICE`��ѡ·��
- ʹ��֮ǰ�ļ������û��䴫����Ϣ����������Ϣ�Ĳ�ͬ����,ÿһ���û����ܶ���Ҫ���Ͷ��,����˫���û�������κ�˳����

���`candidate`��������

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

- ����ͨ���Ѿ�����������Ҫ�ں����������һ���û�������������`offer, answer`����˫���䴫����Ϣ

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

## ���йҶ�

- �û�����һ���Ͽ����Ӷ����Ժ��������û�
- ֪ͨ�������Ͽ��û�����

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

- ��δ���Ҳ��֪ͨ��һ���û�`leave`�¼��Ĵ������������ԶԵȵضϿ��Ե�����
- ���û����������������ʱ������Ҳ��Ҫ����Ӧ�Ĵ��������ṩ���񣬽���ͨ��

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

## ���������������

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

- `websocket`֧��`SSL`����������`wss://`

## `websocket`����

- ����ǽ����
- �ڴ��������·ǳ����ȶ�
- `webrtc`��ʱ������Ϣ�������

## ���漼�� - `XMPP, SIP`

- `XMPP`
- `SIP`

# 5. ���ӿͻ���

## ��������

- �ӿͻ��˻�ȡ��������������
- ʶ��������Ӷ˵��û�
- ����Զ���û�����ͨ��
- ����ͨ��

## ����

- ��������ҳ�棺�����û��������������û�

## ����ҳ��

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

## ��ȡһ������

- �������������������

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

## ��¼

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

    // ׼����ͨ����ͨ��
    startConnection();

}
```

## ��ʼ�Ե�����

1. ������л�ȡ��Ƶ��
2. ��֤�û���������Ƿ�֧��`WebRTC`
3. ����`RTCPeerConnection`����

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
                alert("��֧��webRTC");
            }
        },
        error => {
            console.log(error);
        }
        );
    }else{
        alert("��֧��webRTC");
    }
}

function setupPeerConnection(stream) {
    let configuration = {
        "iceServers":[
            {"url":"stun:localhost:8888"}
        ]
    };

    yourConnection = new RTCPeerConnection(configuration);

    // ������������
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

## ����ͨ��

- `setLocalDescription()`�����������ӹ����ı�����������˵��ָ�����ӵı��ض˵����ԣ�����ý���ʽ��
- `setRemoteDescription()`����ָ���ĻỰ��������ΪԶ�̶Եȷ��ĵ�ǰ�ṩ��Ӧ������ָ������Զ�˵����ԣ�����ý���ʽ��
- `addIceCandidate()`��ͨ�������ŵ���Զ�̶Եȷ������µ�ICE��ѡ����ͨ�����ý��½��յĺ�ѡ���͵��������ICE����

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

## ���ͨ��

- ����ʵʱӦ�������ڣ�����¼�������ͬһʱ�̣�Ҫ��������ĳһʱ�̷�����ʲô����

- `Chrome`��`View`->`Developer`->`Developer Tools`���Կ���`webSocket`��ͨ��״̬




***
[01]: ./img/1-RTCPeerConnection.png "1-RTCPeerConnection"
[02]: ./img/2-WebRTCframework.png "2-WebRTCframework"
[03]:./img/3-process.png "3-process.png"
[04]:./img/4-ICE.png "4-ICE.png"
[05]:./img/5-ICE.png "5-ICE.png"
[06]: ./img/6-websocket.png "6-websocket.png"

