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

# �ܽ�

1. ��ȡ�û�ý��
2. `RTCPeerConnection, ICE, SDP, offer, answer`
3. `STUN`���������
4. ����������Ŀ
5. ��������
6. ���ܺͰ�ȫ

δ������

- ��Ե�ͨ��
- ��Ե㴫������
- ��������ȫ
- ��Ϸ���������¶Ե�ͨ��

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

- �ҵ�`ip`



## `STUN`

- �����������������������ת��

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

## �Ҷϵ绰

- ֪ͨ�����û��ر�ͨ��
- ���ٱ������ӣ���������µ�ͨ��

���̣�

1. ֪ͨ���������Ͽ�����
2. ֪ͨ`RTCPeerConnection`�رգ�ֹͣ�����������������û�
3. �ٴ����ã�����ʵ������Ϊ��״̬���Խ����µ�ͨ��

```js
hangUpButton.addEventListener("click", ()=>{
    send({
        type: "leave"
    });

    onLeave();
});

function onLeave() {
    connectedUser = null;
    theirVideo.srcObject = null;
    yourConnection.close();
    yourConnection.onicecandidate = null;
    yourConnection.onaddstream = null;
    setupPeerConnection(stream);
}
```

## �ܽ�

- ȫ����������

```js
// ��������
let name,
    connectedUser;

let connection = new WebSocket('ws://localhost:8888');

let yourVideo = document.querySelector('#yours'),
    theirVideo = document.querySelector('#theirs'),
    yourConnection,
    stream;

let loginPage = document.querySelector('#login-page'),
    usernameInput = document.querySelector('#username'),
    loginButton = document.querySelector('#login'),
    callPage = document.querySelector('#call-page'),
    theirUsernameInput = document.querySelector('#their-username'),
    callButton = document.querySelector('#call'),
    hangUpButton = document.querySelector('#hang-up');

callPage.style.display = 'none';

// �����ť��¼
loginButton.addEventListener('click', event=>{
    name = usernameInput.value;

    if(name.length > 0){
        send({
            type: "login",
            name: name
        });
    }
});

// websocket ����
connection.onopen = function() {
    console.log("Connected");
};

// ����websocket��Ϣ
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

// websocket������Ϣ
connection.onerror = function(err) {
    console.log(err);
}

// Alia ��JSON��ʽ������Ϣ
function send(message) {
    if(connectedUser) {
        message.name = connectedUser;
    }

    connection.send(JSON.stringify(message));
}

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

// call����
callButton.addEventListener('click', function(){
    let theirUsername = theirUsernameInput.value;

    if(theirUsername.length > 0){
        startPeerConnection(theirUsername);
    }
});

// �Ҷ�
hangUpButton.addEventListener("click", ()=>{
    send({
        type: "leave"
    });

    onLeave();
});

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


function onLeave() {
    connectedUser = null;
    theirVideo.srcObject = null;
    yourConnection.close();
    yourConnection.onicecandidate = null;
    yourConnection.onaddstream = null;
    setupPeerConnection(stream);
}


// ������polyfill
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

// ��ʼ����
function startConnection() {
    if(hasUserMedia()){
        navigator.getUserMedia({
            video: true,
            audio: false
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

// 
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
    // ����ICE�����¼�
    yourConnection.onicecandidate = function(event) {
        if(event.candidate){
            send({
                type: "candidate",
                candidate: event.candidate
            });
        }
    };
}

// ��ʼ����offer
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
```

# 6. `WebRTC`��������

- ������Ƶ����Ƶ�������������ݵĴ���

## �������ݸ�

- ����������ͨ����Ӧ`webRTC`����
- ����ڶԵ������д���һ������ͨ������
- ���ܺͰ�ȫ����
- ����ͨ����Ǳ������

## �����ƴ���Э������ݴ���

- �Ե������д������ݣ�ʹ���ϸ��`TCP`��`AJAX`��`WebSocket`�Ը��������ֿ���
- �����ƴ���Э��(SCTP)��λ��`UDP`��

��ջͼ��

![07][07]

`SCTP`�ص㣺

- �����İ�ȫ�ԣ�����`DTLS`��
- �������������ڿɿ��Ļ򲻿ɿ���ģʽ��
- �������Ե��������޵������ݰ�˳��
- ������������Ϣ���д����ģ�������Ϣ�ֽ⴫�䣬�ڽ��ն�����
- �����֧������������Э��
- �����`TCP`���⣬������`UDP`�Ĵ�������

�淶��

- ʹ���˶���˵㣬����Ϣ�ֽ�ɶ������з�������
  - �˵㣺������`IP`λ��֮�䶨���������ݵ�����
  - ��Ϣ�������Ӧ�÷��͵�`SCTP`�������
  - �飺��׼��ͨ�����´�������ݰ�����ʾ��Ϣ��һ����

![8-SCTP.png][08]

## `RTCDataChannel`����

```js
let peerConnection = new RTCPeerConnection();

//�����Ե�����ʹ���ź�
let dataChannel = peerConnection.createDataChannel("myLabel",
    dataChannelOptions);
```

����ͨ�����ڵ�״̬��

- �����У�����ͨ���ȴ�һ������
- �����������Ѿ������������Խ���ͨ��
- �ر��У�ͨ�����ڱ�����
- �رգ�ͨ���رգ��޷�����ͨ��

### `ondatachannel`�¼�

```js
dataChannel.onerror = function (error) {
    console.log("Data channel error:", error);
};

dataChannel.onmessage = function (event) {
    console.log("Data channel message:", event.data);
}

dataChannel.onopen = function () {
    console.log("Data channel opened, ready to send message!");
    dataChannel.send("Hello World!");
}

dataChannel.onclose = function () {
    console.log("Data channel has been closed");
}
```

- ����ͨ����`WebSocket`����

## ����ͨ��ѡ�� - `dataChannelOptions`����

```js
let dataChannelOptions = {
    reliable: false,
    maxRetransmitTime: 3000
};
```

- ��Щ����ʹӦ����`UDP`��`TCP`������֮����б仯
  - `reliable, ordered`������Ϊ`true`��`TCP`��`false`��`UDP`
- `reliable`��������Ϣ�����Ƿ���е���
- `ordered`��������Ϣ�Ľ����Ƿ���Ҫ���շ���ʱ��˳��
- `maxRetransmitTime`��������Ϣ����ʧ��ʱ��������·���
- `maxRetransmit`��������Ϣ����ʧ��ʱ������ط�����
- `protocol`������ǿ��ʹ��������Э��
- `negotiated`�����ÿ�����Ա�Ƿ������������ߴ�������ͨ��������������Զ�����������
- `id`������ͨ����Ψһ��ʶ���ڶ�ͨ��ʱ��������

## ��������

- ����ͨ����`send`��`websocket`��`send`
- ֧�ֵ��������ͣ�
  - `String`
  - `Blob`
  - `ArrayBuffer`
  - `ArrayBufferView`

```js
dataChannel.onmessage = function (event) {
    console.log("Data channel message:", event.data);

    let data = event.data;

    if (data instanceof Blob){

    }else if (data instanceof ArrayBuffer) {

    }else if (data instanceof ArrayBufferView){

    }else {
    //    string
    }
}
```

## ���ܰ�ȫ

- `WebRTC`����ʱ����������Э���ʵ�֣�����ǿ��ִ�м��ܹ���
- �������ÿһ���Ե����ӣ����Զ����ڸߵİ�ȫ������
- ʹ��`DTLS`

## �����������

### `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div id="call-page" class="page">
    <video id="yours" autoplay></video>
    <video id="theirs" autoplay></video>
    <input type="text" id="their-username">
    <button id="call">Call</button>
    <button id="hang-up">Hang Up</button>

    <input type="text" id="message">
    <button id="send">Send</button>
    <div id="received"></div>
</div>
</body>
<script src="main.js"></script>
</html>
```

### `main.js`

```js
let yourConnection = new RTCPeerConnection(),
    received = document.getElementById("received");


function openDataChannel() {
    let dataChannelOptions = {
        reliable: true
    };

    dataChannel = yourConnection.createDataChannel("myLabel", dataChannelOptions);

    dataChannel.onerror = function (error){
        console.log("Data Channel Error: ", error);
    }

    dataChannel.onmessage = function (event) {
        console.log("Got Data Channel Message: ", event.data);

        received.innerHTML += "recv: " + event.data + "<br />";
        received.scrollTop = received.scrollHeight;
    };

    dataChannel.onopen = function () {
        dataChannel.send(name + "has connected.");
    };

    dataChannel.onclose = function (){
        console.log("The data channel is closed");
    };
}
```

- ��ӣ�`{optional: [{RtpDataChannels: true}]}`

����¼���������

```js
//���ı���������Ϣ������
let sendButton = document.getElementById('send'),
    messageInput = document.getElementById('message');

sendButton.addEventListener('click', event => {
    let val = messageInput.value;
    received.innerHTML += "send: " + val + "<br />";
    received.scrollTop = received.scrollHeight;
    dataChannel.send(val);
});
```

### ��Ϣ����ʽ

```css
#received {
    display: block;
    width: 480px;
    height: 100px;
    background: white;
    padding: 10px;
    margin-top: 10px;
    color: black;
    overflow: scroll;
}
```

## Ӧ��

- `DTLS`֧���û�֮�䴫���κ����͵�����
- ��Ϸ��Ե�ͨ��
- ��Ϸ���½�����Ե�ͨ��
  - ���������ļ��������磬�����˰�������ķ�����
  - ����Ϊ�û�֮����д����ݴ���

��Ե���Ϸ�����粼�֣�

![9-ptp.png][09]



- �û���ʹ��`webRTC`������������Щ�ļ����������Ĵ����������ݷַ�ϵͳ(CDN)



# 7. �ļ�����

- ӵ�е�Ե�����ݴ��������������ļ�`API`����
- ����`WebRTC`��`Data Channel`�Լ��ļ�`API`������һ�����׵��ļ�����Ӧ��
  - ��Ҫ�������û�(peer)�乲�����ݵ�Ӧ��
  - ��Ӧ�õĻ���Ҫ����ʵʱ�ԣ������û�����ͬʱ��ҳ���ϣ��Թ���һ���ļ�

���裺

1. �û�`A`��ҳ�棬����һ��Ψһ��`ID`��
2. �û�`B`��ͬ����ҳ�棬������`A`��ͬ��`ID`��
3. �����û�ʹ��`RTCPeerConnection`ʵ�ֻ���
4. һ�����ӽ���������һ���û���ѡ��һ�������ļ����ڹ���
5. ��һ���û������ļ�����ʱ�յ�֪ͨ��������ļ�����ͨ�����Ӵ��䵽�Է��ļ��������������

- �������ʰȡ�ļ������ļ��ֿ鲢��ʹ��`RTCPeerConnection API`�����͸���һ���û�

## ʹ���ļ�`API`ʰȡ�ļ�

### `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        body{
            background-color: #404040;
            margin-top: 15px;
            font-family: sans-serif;
            color: white;
        }

        .thumb {
            height: 75px;
            border: 1px solid #000;
            margin: 10px 5px 0 0;
        }

        .page{
            position: relative;
            display: block;
            margin: 0 auto;
            width: 500px;
            height: 500px;
        }

        #byte_content {
            margin: 5px 0;
            max-height: 100px;
            overflow-y: auto;
            overflow-x: hidden;
        }

        #byte_range {
            margin-top: 5px;
        }
    </style>
</head>
<body>
<div id="login-page" class="page">
    <h2>Login As</h2>
    <input type="text" id="username">
    <button id="login">Login</button>
</div>

<div id="share-page" class="page">
    <h2>File Sharing</h2>
    <input type="text" id="their-username">
    <button id="connect">Connect</button>
    <div id="ready">Ready!</div>

    <br>
    <br>

    <input type="file" id="files" name="file"> Read bytes:
    <button id="send">Send</button>
</div>
</body>
<script src="client.js"></script>
</html>
```



## ��Ե����Ӻ����ݹܵ�

```js
let name,
    connectedUser,
    connection = new WebSocket('ws://localhost:8888');

connection.onopen = function () {
    console.log("Connected");
};

//����������Ϣ
connection.onmessage = function (message) {
    console.log("Got message:", message.data);

    let data = JSON.parse(message.data);

    switch (data.type){
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

//�������
connection.onerror = function (err) {
    console.log("Got error:", err);
}

//JSON��ʽ������Ϣ
function send(message){
    if (connectedUser){
        message.name = connectedUser;
    }

    connection.send(JSON.stringify(message));
}

let loginPage = document.querySelector('#login-page'),
    usernameInput = document.querySelector('#username'),
    loginButton = document.querySelector('#login'),
    theirUsernameInput = document.querySelector('#their-username'),
    connectButton = document.querySelector('#connect'),
    sharePage = document.querySelector('#share-page'),
    sendButton = document.querySelector('#send'),
    readyText = document.querySelector('#ready'),
    statusText = document.querySelector('#status');

sharePage.style.display = 'none';
readyText.style.display = 'none';

//�û������ť��¼
loginButton.addEventListener('click', event=>{
    name = usernameInput.value;

    if (name.length > 0){
        send({
            type: "login",
            name: name
        });
    }
});

function onLogin(success) {
    if (success === false){
        alert("Login ʧ�ܣ���ʹ�ò�ͬ������");
    }else{
        loginPage.style.display = 'none';
        sharePage.style.display = 'block';

    //    Ϊÿ������������
        startConnection();
    }
}

let yourConnection,
    dataChannel,
    currentFile,
    currentFileSize,
    currentFileMeta;

function startConnection() {
    if (hasRTCPeerConnection()){
        setupPeerConnection();
    }else {
        alert("��֧��webRTC");
    }
}

function setupPeerConnection() {
    let configuration = {
        "iceServers":[{
            "url": "stun:localhost:8888"
        }]
    };

    yourConnection = new RTCPeerConnection(configuration, {optional:[]});

//    set up ice handling
    yourConnection.onicecandidate = function (event){
        if (event.candidate){
            send({
                type: "candidate",
                candidate: event.candidate
            });
        }
    }
    openDataChannel();
}

function openDataChannel() {
    let dataChannelOptions = {
        ordered: true,
        reliable: true,
        negotiated: true,
        id: "myChannel"
    };

    dataChannel = yourConnection.createDataChannel("myLabel", dataChannelOptions);

    dataChannel.onerror = function (error){
        console.log("Data channel error:", error);
    };

    dataChannel.onmessage = function (event) {

    }

    dataChannel.onopen = function (){
        readyText.style.display = 'inline-block';
    };

    dataChannel.onclose = function (){
        readyText.style.display = "none";
    }
}

// ������polyfill
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

function hasFileApi() {
    return window.File && window.FileReader && window.FileList && window.Blob;
}

//�¼�����
connectButton.addEventListener("click", ()=>{
    let theirUsername = theirUsernameInput.value;

    if (theirUsername.length > 0){
        startPeerConnection(theirUsername);
    }
});

function startPeerConnection(user) {
    connectedUser = user;

//    ��ʼ�½���������
    yourConnection.createOffer(offer=>{
        send({
            type: "offer",
            offer: offer
        });

        yourConnection.setLocalDescription(offer);
    },
    error=>{
        alert("error");
    });
}

function onOffer(offer, name) {
    connectedUser = name;
    yourConnection.setRemoteDescription(new RTCSessionDescription(offer));

    yourConnection.createAnswer(answer=>{
        yourConnection.setLocalDescription(answer);

        send({
            type: "answer",
            answer: answer
        });
    },
    error =>    alert("error")
    );
}

function onAnswer(answer) {
    yourConnection.setRemoteDescription(new RTCSessionDescription(answer));
}

function onCandidate(candidate) {
    yourConnection.addIceCandidate(new RTCIceCandidate(candidate));
}

function onLeave() {
    connectedUser = null;

    yourConnection.close();
    yourConnection.onicecandidate = null;
    setupPeerConnection();
}
```

- ͨ�������������Ӧ���������û�������һ��
- ���ӽ���������������ͨ�����ط������������������Ϣ

## ��ȡ���ļ�������

```js
let name,
    connectedUser,
    connection = new WebSocket('ws://localhost:8888');

connection.onopen = function () {
    console.log("Connected");
};

//����������Ϣ
connection.onmessage = function (message) {
    console.log("Got message:", message.data);

    let data = JSON.parse(message.data);

    switch (data.type){
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

//�������
connection.onerror = function (err) {
    console.log("Got error:", err);
}

//JSON��ʽ������Ϣ
function send(message){
    if (connectedUser){
        message.name = connectedUser;
    }

    connection.send(JSON.stringify(message));
}

let loginPage = document.querySelector('#login-page'),
    usernameInput = document.querySelector('#username'),
    loginButton = document.querySelector('#login'),
    theirUsernameInput = document.querySelector('#their-username'),
    connectButton = document.querySelector('#connect'),
    sharePage = document.querySelector('#share-page'),
    sendButton = document.querySelector('#send'),
    readyText = document.querySelector('#ready'),
    statusText = document.querySelector('#status');

sharePage.style.display = 'none';
readyText.style.display = 'none';

//�û������ť��¼
loginButton.addEventListener('click', event=>{
    name = usernameInput.value;

    if (name.length > 0){
        send({
            type: "login",
            name: name
        });
    }
});

function onLogin(success) {
    if (success === false){
        alert("Login ʧ�ܣ���ʹ�ò�ͬ������");
    }else{
        loginPage.style.display = 'none';
        sharePage.style.display = 'block';

    //    Ϊÿ������������
        startConnection();
    }
}

let yourConnection,
    dataChannel,
    currentFile,
    currentFileSize,
    currentFileMeta;

function startConnection() {
    if (hasRTCPeerConnection()){
        setupPeerConnection();
    }else {
        alert("��֧��webRTC");
    }
}

function setupPeerConnection() {
    let configuration = {
        "iceServers":[{
            "url": "stun:localhost:8888"
        }]
    };

    yourConnection = new RTCPeerConnection(configuration, {optional:[]});

//    set up ice handling
    yourConnection.onicecandidate = function (event){
        if (event.candidate){
            send({
                type: "candidate",
                candidate: event.candidate
            });
        }
    }
    openDataChannel();
}

function openDataChannel() {
    let dataChannelOptions = {
        ordered: true,
        reliable: true,
        negotiated: true,
        id: "myChannel"
    };

    dataChannel = yourConnection.createDataChannel("myLabel", dataChannelOptions);

    dataChannel.onerror = function (error){
        console.log("Data channel error:", error);
    };

    dataChannel.onmessage = function (event) {

    }

    dataChannel.onopen = function (){
        readyText.style.display = 'inline-block';
    };

    dataChannel.onclose = function (){
        readyText.style.display = "none";
    }
}

// ������polyfill
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

function hasFileApi() {
    return window.File && window.FileReader && window.FileList && window.Blob;
}

//�¼�����
connectButton.addEventListener("click", ()=>{
    let theirUsername = theirUsernameInput.value;

    if (theirUsername.length > 0){
        startPeerConnection(theirUsername);
    }
});

function startPeerConnection(user) {
    connectedUser = user;

//    ��ʼ�½���������
    yourConnection.createOffer(offer=>{
        send({
            type: "offer",
            offer: offer
        });

        yourConnection.setLocalDescription(offer);
    },
    error=>{
        alert("error");
    });
}

function onOffer(offer, name) {
    connectedUser = name;
    yourConnection.setRemoteDescription(new RTCSessionDescription(offer));

    yourConnection.createAnswer(answer=>{
        yourConnection.setLocalDescription(answer);

        send({
            type: "answer",
            answer: answer
        });
    },
    error =>    alert("error")
    );
}

function onAnswer(answer) {
    yourConnection.setRemoteDescription(new RTCSessionDescription(answer));
}

function onCandidate(candidate) {
    yourConnection.addIceCandidate(new RTCIceCandidate(candidate));
}

function onLeave() {
    connectedUser = null;

    yourConnection.close();
    yourConnection.onicecandidate = null;
    setupPeerConnection();
}

sendButton.addEventListener("click", event=>{
    let files = document.querySelector('#files').files;

    if(files.length > 0){
        dataChannelSend({
            type: "start",
            data: files[0]
        });

        sendFile(files[0]);
    }
});
```

- `dataChannelSend, sendFile`��ʱ��д
- ��ʱ���Ի�ȡ�ļ�����Ϣ

## �ļ��ֿ�

- ����ͨ��ͨ��`SCTP`Э����д����ļ�
- ������粻�ѣ��ᵼ���ļ���ʧ
- ����`BitTorrent`ʵ���ļ����з֣�ÿ��ֻ��С��
- ������ʹ������ͨ��ǰʹ����һ��

## �ļ��ֿ�ɶ�

- ��Ϊ`JS`�ײ�Ҫ��ʹ���ַ�����ʽ����Ҫ����`Base64`����
- ���ͣ�ת��Ϊ`Base64`���� -> ���͹�ȥ��һ���û�������õ����

���룺

```js
function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return btoa(binary);
}
```

- ����Ϊ`ArrayBuffer`�����ļ�`API`��ȡ�ļ�����ʱ�ķ���ֵ
- `fromCharcode`תΪ�ַ�
- `bota`����

���룺

```js
function base64ToBlob(b64Data, contentType) {
    contentType = contentType || '';

    var byteArrays = [], byteNumbers, slice;

    for (var i = 0; i < b64Data.length; i++) {
        slice = b64Data[i];

        byteNumbers = new Array(slice.length);
        for (var n = 0; n < slice.length; n++) {
            byteNumbers[n] = slice.charCodeAt(n);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
}
```

- `charCodeAt`ÿһ���ַ�ת���ɶ���������
- �õ�����������󣬽���ת��Ϊ`Blob`�����`JS`���Զ����ݽ��н�������������Ϊ�ļ�

## �ļ���ȡ�ͷ���

- ���ļ��ж�ȡ���������ݣ����ҷ��͸���һ���û�
- ����ͨ����`Base64`������Ч���

```js
var CHUNK_MAX = 16000;
function sendFile(file) {
    var reader = new FileReader();

    reader.onloadend = function(evt) {
        if (evt.target.readyState == FileReader.DONE) {
            var buffer = reader.result,
                start = 0,
                end = 0,
                last = false;

            function sendChunk() {
                end = start + CHUNK_MAX;

                if (end > file.size) {
                    end = file.size;
                    last = true;
                }

                var percentage = Math.floor((end / file.size) * 100);
                statusText.innerHTML = "Sending... " + percentage + "%";

                dataChannel.send(arrayBufferToBase64(buffer.slice(start, end)));

                // If this is the last chunk send our end message, otherwise keep sending
                if (last === true) {
                    dataChannelSend({
                        type: "end"
                    });
                } else {
                    start = end;
                    // Throttle the sending to avoid flooding
                    setTimeout(function () {
                        sendChunk();
                    }, 100);
                }
            }

            sendChunk();
        }
    };

    reader.readAsArrayBuffer(file);
}
```

- ʵ����`FileReader`����
- ��װ��`JavaScript`��ʹ�ò�ͬ��ʽ��ȡ�ļ��ķ���
- ��`ArrayBuffer`����ʽ��ȡ�������ļ�

�ļ���ȡ�����̣�

1. ȷ��`FileReader`������`DONE`״̬
2. ��ʼ������ȡ�ļ����ݵĻ���������
3. ����һ���ݹ麯����ʵ�ַ����ļ���Ĺ���
4. �ں����У���0��ʼ��ȡһ���ļ�����ֽ�
5. ȷ��û�г����ļ�β������û�����ݿɶ�
6. ������ͨ��`Base64`��ʽ���б��룬���ҽ��з���
7. ��������һ���ļ��飬������һ���û��Ѿ�����ļ�����
8. ����������Ҫ���䣬�ڹ̶���ʱ�������һ���ֿ��ֹ`API`�����鷺
9. `sendChunk`��ʼ�ݹ�

## �ڽ��ն�����ļ���

- ����������ͨ����ʹ����`Ordered`ѡ��û��յ����ļ��ֿ��������
- ���뺯�����ļ����

```js
dataChannel.onmessage = function (event) {
    try {
        var message = JSON.parse(event.data);

        switch (message.type) {
            case "start":
                currentFile = [];
                currentFileSize = 0;
                currentFileMeta = message.data;
                console.log("Receiving file", currentFileMeta);
                break;
            case "end":
                saveFile(currentFileMeta, currentFile);
                break;
        }
        //������м��ļ��������뱨������
    } catch (e) {
        // Assume this is file content
        currentFile.push(atob(event.data));

        currentFileSize += currentFile[currentFile.length - 1].length;

        var percentage = Math.floor((currentFileSize / currentFileMeta.size) * 100);
        statusText.innerHTML = "Receiving... " + percentage + "%";
    }
};
```

## �ļ��Զ�����

```js
function saveFile(meta, data) {
    var blob = base64ToBlob(data, meta.type);
    console.log(blob);

    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = meta.name;
    link.click();
}
```

- �ļ�����ת���ɼ�����
- �½�`link`����`url`ָ�����ݣ�ģ��������
- `createObjectURL`����αλ��

## ���û�չʾ����

```js
if (end > file.size) {
    end = file.size;
    last = true;
}

var percentage = Math.floor((end / file.size) * 100);
statusText.innerHTML = "Sending... " + percentage + "%";
```

���ܶˣ�

```js
// Assume this is file content
currentFile.push(atob(event.data));

currentFileSize += currentFile[currentFile.length - 1].length;

var percentage = Math.floor((currentFileSize / currentFileMeta.size) * 100);
statusText.innerHTML = "Receiving... " + percentage + "%";
```

## �ܽ�

```js
var name,
    connectedUser;

var connection = new WebSocket('ws://localhost:8888');

connection.onopen = function () {
    console.log("Connected");
};

// Handle all messages through this callback
connection.onmessage = function (message) {
    console.log("Got message", message.data);

    var data = JSON.parse(message.data);

    switch(data.type) {
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

connection.onerror = function (err) {
    console.log("Got error", err);
};

// Alias for sending messages in JSON format
function send(message) {
    if (connectedUser) {
        message.name = connectedUser;
    }

    connection.send(JSON.stringify(message));
};

var loginPage = document.querySelector('#login-page'),
    usernameInput = document.querySelector('#username'),
    loginButton = document.querySelector('#login'),
    theirUsernameInput = document.querySelector('#their-username'),
    connectButton = document.querySelector('#connect'),
    sharePage = document.querySelector('#share-page'),
    sendButton = document.querySelector('#send'),
    readyText = document.querySelector('#ready'),
    statusText = document.querySelector('#status');

sharePage.style.display = "none";
readyText.style.display = "none";

// Login when the user clicks the button
loginButton.addEventListener("click", function (event) {
    name = usernameInput.value;

    if (name.length > 0) {
        send({
            type: "login",
            name: name
        });
    }
});

function onLogin(success) {
    if (success === false) {
        alert("Login unsuccessful, please try a different name.");
    } else {
        loginPage.style.display = "none";
        sharePage.style.display = "block";

        // Get the plumbing ready for a call
        startConnection();
    }
};

var yourConnection, connectedUser, dataChannel, currentFile, currentFileSize, currentFileMeta;

function startConnection() {
    if (hasRTCPeerConnection()) {
        setupPeerConnection();
    } else {
        alert("Sorry, your browser does not support WebRTC.");
    }
}

function setupPeerConnection() {
    var configuration = {
        "iceServers": [{ "url": "stun:127.0.0.1:8888" }]
    };
    yourConnection = new RTCPeerConnection(configuration, {optional: []});

    // Setup ice handling
    yourConnection.onicecandidate = function (event) {
        if (event.candidate) {
            send({
                type: "candidate",
                candidate: event.candidate
            });
        }
    };

    openDataChannel();
}

function openDataChannel() {
    var dataChannelOptions = {
        ordered: true,
        reliable: true,
        negotiated: true,
        id: 0
    };
    dataChannel = yourConnection.createDataChannel('myLabel', dataChannelOptions);

    dataChannel.onerror = function (error) {
        console.log("Data Channel Error:", error);
    };

    dataChannel.onmessage = function (event) {
        try {
            var message = JSON.parse(event.data);

            switch (message.type) {
                case "start":
                    currentFile = [];
                    currentFileSize = 0;
                    currentFileMeta = message.data;
                    console.log(`message.data: `)
                    console.log(message.data)
                    console.log("Receiving file", currentFileMeta);
                    break;
                case "end":
                    saveFile(currentFileMeta, currentFile);
                    break;
            }
        } catch (e) {
            // Assume this is file content
            currentFile.push(atob(event.data));

            currentFileSize += currentFile[currentFile.length - 1].length;

            var percentage = Math.floor((currentFileSize / currentFileMeta.size) * 100);
            statusText.innerHTML = "Receiving... " + percentage + "%";
        }
    };

    dataChannel.onopen = function () {
        readyText.style.display = "inline-block";
    };

    dataChannel.onclose = function () {
        readyText.style.display = "none";
    };
}

// Alias for sending messages in JSON format
function dataChannelSend(message) {
    dataChannel.send(JSON.stringify(message));
}

function saveFile(meta, data) {
    var blob = base64ToBlob(data, meta.type);
    console.log(blob);

    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = meta.name;
    link.click();
}

function hasUserMedia() {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    return !!navigator.getUserMedia;
}

function hasRTCPeerConnection() {
    window.RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
    window.RTCSessionDescription = window.RTCSessionDescription || window.webkitRTCSessionDescription || window.mozRTCSessionDescription;
    window.RTCIceCandidate = window.RTCIceCandidate || window.webkitRTCIceCandidate || window.mozRTCIceCandidate;
    return !!window.RTCPeerConnection;
}

function hasFileApi() {
    return window.File && window.FileReader && window.FileList && window.Blob;
}

connectButton.addEventListener("click", function () {
    var theirUsername = theirUsernameInput.value;

    if (theirUsername.length > 0) {
        startPeerConnection(theirUsername);
    }
});

function startPeerConnection(user) {
    connectedUser = user;

    // Begin the offer
    yourConnection.createOffer(function (offer) {
        send({
            type: "offer",
            offer: offer
        });
        yourConnection.setLocalDescription(offer);
    }, function (error) {
        alert("An error has occurred.");
    });
};

function onOffer(offer, name) {
    connectedUser = name;
    yourConnection.setRemoteDescription(new RTCSessionDescription(offer));

    yourConnection.createAnswer(function (answer) {
        yourConnection.setLocalDescription(answer);

        send({
            type: "answer",
            answer: answer
        });
    }, function (error) {
        alert("An error has occurred");
    });
};

function onAnswer(answer) {
    yourConnection.setRemoteDescription(new RTCSessionDescription(answer));
};

function onCandidate(candidate) {
    yourConnection.addIceCandidate(new RTCIceCandidate(candidate));
};

function onLeave() {
    connectedUser = null;
    yourConnection.close();
    yourConnection.onicecandidate = null;
    setupPeerConnection();
};

function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return btoa(binary);
}

function base64ToBlob(b64Data, contentType) {
    contentType = contentType || '';

    var byteArrays = [], byteNumbers, slice;

    for (var i = 0; i < b64Data.length; i++) {
        slice = b64Data[i];

        byteNumbers = new Array(slice.length);
        for (var n = 0; n < slice.length; n++) {
            byteNumbers[n] = slice.charCodeAt(n);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
}

var CHUNK_MAX = 16000;
function sendFile(file) {
    var reader = new FileReader();

    reader.onloadend = function(evt) {
        if (evt.target.readyState == FileReader.DONE) {
            var buffer = reader.result,
                start = 0,
                end = 0,
                last = false;

            function sendChunk() {
                end = start + CHUNK_MAX;

                if (end > file.size) {
                    end = file.size;
                    last = true;
                }

                var percentage = Math.floor((end / file.size) * 100);
                statusText.innerHTML = "Sending... " + percentage + "%";

                dataChannel.send(arrayBufferToBase64(buffer.slice(start, end)));

                // If this is the last chunk send our end message, otherwise keep sending
                if (last === true) {
                    dataChannelSend({
                        type: "end"
                    });
                } else {
                    start = end;
                    // Throttle the sending to avoid flooding
                    setTimeout(function () {
                        sendChunk();
                    }, 100);
                }
            }

            sendChunk();
        }
    };

    reader.readAsArrayBuffer(file);
}

sendButton.addEventListener("click", function (event) {
    var files = document.querySelector('#files').files;

    if (files.length > 0) {
        dataChannelSend({
            type: "start",
            data: files[0],
            name: files[0].name
        });
        console.log(`datachannel start[0]: `)
        console.log(files[0])
        sendFile(files[0]);
    }
});

```

# 8. �߰�ȫ�Ժʹ��ģ�Ż�

- �����о����Ķ�
- �Է�����Ϊ��

## �������������

- ����Ҫ�������Խ����޸�

###  ʹ�ñ���

- ǿ�Ƽ��ܣ����������������Ϣ���м���
- ���ܷ�ʽ`HTTPS, WSS`
- `HTTPS`��`HTTP`���е�`SSL`���ܷ�ʽ
- `WSS`��`TLS`�ϻ���`WebSocket`��`SSL`���ܷ�ʽ

### `OAuth`�ṩ��

- ����һ������������ṩ��
- ����ԭ��`token`��һ���������ֺ���ĸ������ַ���

ʵ��ǰ�Ŀ��ǣ�

- ˫���û����γ�����֮ǰ�������¼
- ˫���û������໥��ʶ���ܱ�������жԻ�
- ˫���û��ڶԻ�ʱ�����ܵ����繥������Ū

## �ƶ��豸

- ������������������Ƶ��С

```js
let mobile = {
    video: {
        mandatory: {
            maxWidth: 640,
            maxHeight: 360
        }
    }
};

let desktop = {
    video: {
        mandatory: {
            minWidth: 1280,
            minHeight: 720
        }
    }
};

let constraints;

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(navigator.userAgent)) {
    constraints = mobile;
}else {
    constraints = desktop;
}

navigator.getUserMedia(constraints, success, function (error)){

};
```

## ��������

- һ��һ���һ�Զ�
- ����ÿһ���ڵ���������нڵ���һ��ȫ������жԻ�

## ���Դ���

```js
var src = "example-image.jpg",
    size = 5000000,
    image = new Image(),
    startTime,
    endTime,
    totalTime = 0,
    speed = 0;

image.onload = function () {
  endTime = (new Date()).getTime();
  totalTime = (endTime - startTime) / 1000;
  speed = (size * 8 / totalTime); // bytes per second
};

startTime = (new Date()).getTime();
image.src = src + "?cacheBust=" + startTime;

```








***
[01]: ./img/1-RTCPeerConnection.png "1-RTCPeerConnection"
[02]: ./img/2-WebRTCframework.png "2-WebRTCframework"
[03]:./img/3-process.png "3-process.png"
[04]:./img/4-ICE.png "4-ICE.png"
[05]:./img/5-ICE.png "5-ICE.png"
[06]: ./img/6-websocket.png "6-websocket.png"

[07]:./img/7-stack.png "7-stack.png"
[08]:./img/8-SCTP.png "8-SCTP.png"
[09]:./img/9-ptp.png "9-ptp.png"