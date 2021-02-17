HTML5Canvas��Ϸ����ʵս Ŀ¼
[TOC]
***
# ǰ��
- ����Ϊ���ף�ּ��Ϊ���˼�¼��ѧϰ��������Ҫ�����Ķ�ԭ��
��Ҫ�������ݣ�
1. ׼��
2. ����֪ʶ
3. ����ʵս
4. ���Ч��

# �Ƽ��Ķ�
- ��HTML5 Canvas��Ϸ����ʵս��

# ׼������
## H5������
- ����λ�����룺`Geolocation API`
- �������ݿ⣺`WebSQL`�洢���ݣ�`web storage API`ʵ�����߻���

## 1. video��ǩ���Ŷ���
```html
    <video width="640" height="360" preload="auto" poster="hoge.png" controls autoplay>
        <!-- webm type -->
        <source src="hoge.webm" type='video/webm; codecs="vp8, vorbis"'>
        <!-- ogv -->
        <source src="hoge.ogv" type='video/ogg; codecs="theora, vorbis"'>
        <!-- mp4 -->
        <source src="hoge.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
        <!-- �޷�ʹ��video -->
        <p>�޷����Ŷ���<a href="#">�Ƽ������뿴����</a></p>
    </video>
```

## 2. audio
```html
    <audio controls loop>
        <!-- only ogg -->
        <source src="hoge.ogg">
        <!-- only wav -->
        <source src="hoge.wav">
        <!-- only mp3 -->
        <source src="hoge.mp3">
        <!-- can't use audio tag -->
        <p>Can't use audio tag.<a href="#">Click there.</a></p>
    </audio>
```

## 3. Canvas
```html
    <canvas id="canvas" width="640" height="360"></canvas>

    <script>
        let canvas = document.getElementById("canvas");
        if(canvas.getContext){
            let context = canvas.getContext('2d');
            // color
            context.fillStyle = 'rgb(255, 0, 0)';
            // potray 64x36 matrix from (20, 30)
            context.fillRect(20,30,64,36);
        }
    </script>
```
Ч����
![1-3-canvas][01]

## 4. ��ȡ��ǰλ��
```html
 <script>
        window.addEventListener('load', () => {
            // �жϿɷ�ʹ��geolocation
            if(navigator.geolocation){
                // regular get location
                navigator.geolocation.watchPosition(position => {
                    console.log(position);
                    // γ��
                    let lat = position.coords.latitude;
                    // ����
                    let lng = position.coords.longitude;
                    // performance
                    document.write(`lattitude: ${lat}, longitude: ${lng}`);
                }, err => {
                    console.log("error, can't use");
                });
            }
        }, false);

    </script>
```
Ч����
![1-4-geo-1][02]
![1-4-geo-2][03]

## 5. �������ݱ����ڿͻ���
`LocalStorage`�������������
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
        // ��localstorage����������
        localStorage.key = 'wantted data';
        // ȡ����localstorage��ֵ
        let hoge = localStorage.key;
        // ��ʾ
        document.write(hoge);
        localStorage.setItem("fwx", "xwf");
    </script>
</body>
</html>
```

## 6. formǿ��
`form`���ù���
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
    <!-- verify type -->
    <input name="email" type="email">
    <!-- require -->
    <input name="text" type="text" required>
    <!-- focus -->
    <input name="text" type="text" placeholder="name">
</body>
</html>
```

## canvas
### ��ͼ
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
    <canvas id="canvas" width="200" height="100"></canvas>
    <script>
        onload = () => {
            // find canvas based id
            let canvas = document.getElementById('canvas');
            // verify
            if(!canvas || !canvas.getContext)   return false;
            // create context object
            let ctx = canvas.getContext('2d');
            // potray
            ctx.fillStyle = '#FF0000';
            ctx.fillRect(0, 0, 150, 75);
        };
    </script>
</body>
</html>
```
### ����
- ��ȡ`<canvas>`��ǩ��һ����ͨ��`id/name`���
- Ҫʹ��`canvas`Ԫ�أ������ж�������Ƿ�֧��ʹ��
- `getContext`�����д���һ��`2d`�������Ӷ����Եõ���ά���󣬲�ʵ�ֶ�άͼ���軭
- `fillStyle`������ɫ

## canvasʵ����ά���Ƽ�
���Ҫʵ����άЧ������Ҫ������������⣺
- `three.js`
- `Papervision3D`

## JSʵ�ּ̳�
- �����������캯��
- ʹ��apply��������������Ĺ��캯�������Ӷ�����
- �����ļ̳У�ѭ��ʹ�ø������`prototype`���и��ƣ����ɴﵽ�̳е�Ŀ��
```js
function PeopleClass() {
    this.type = "human";
}

PeopleClass.prototype = {
    getType: function() {
        alert("this is a man.");
    }
};

function StudentClass(name, sex) {
    PeopleClass.apply(this, arguments);
    let prop;
    for (prop in PeopleClass.prototype){
        let proto = this.constructor.prototype;
        if(!proto[prop])    proto[prop] = PeopleClass.prototype[prop];

        proto[prop]["super"] = PeopleClass.prototype;
    }

    this.name = name;
    this.sex = sex;
}

let stu = new StudentClass("lufy", "man");
alert(stu.type);
stu.getType();
```
# �ڶ����֣�����֪ʶ
## canvas��������
### 1. ��ֱ��
- ��ȡ`canvas`����
- ���ػ�����ѡ��`canvasRenderingContext2D`����������άͼ��
- ����������ȣ�`xx.lineWidth`
- ���û�����ɫ��`xx.strokeStyle = "red"`
- ����һ���µ�·����`xx.beginPath()`
- ���ʹ��λ���ƶ���ָ�����꣺`xx.moveTo(x,y)`
- �ӵ�ǰ���꿪ʼ���ƶ����ʵ�ָ�����꣬�������ߣ�`xx.lineTo(x,y)`
- ��ʼ���ƣ�`xx.stroke()`
- ������ñ����ʽ��`xx.lineCap = "butt";`
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
    <canvas id="canvas" width="200" height="200"></canvas>
    <script>
        let c = document.getElementById('canvas');
        let ctx = c.getContext('2d');

        ctx.lineWidth = 10;
        ctx.strokeStyle = "red";
        ctx.beginPath();

        ctx.moveTo(10, 10);
        ctx.lineTo(150, 50);
        ctx.stroke();

    </script>
</body>
</html>
```
Ч��ͼ��
![2-1-line][04]

��ñ��
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
    <canvas id="canvas"></canvas>
    <script>
        let c = document.getElementById("canvas");
        let ctx = c.getContext('2d');
        ctx.lineWidth = 10;
        ctx.strokeStyle = "blue";

        ctx.lineCap = "butt";
        ctx.beginPath();
        ctx.moveTo(10,10);
        ctx.lineTo(150,10);
        ctx.stroke();

        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(10,40);
        ctx.lineTo(150,40);
        ctx.stroke();

        ctx.lineCap = "square";
        ctx.beginPath();
        ctx.moveTo(10,70);
        ctx.lineTo(150,70);
        ctx.stroke();                
    </script>
</body>
</html>
```
Ч��ͼ��
![2-1-line-2.png][05]

### 2. ������


***
[01]: ./img/1-3-canvas.png "1-3-canvas"
[02]: ./img/1-4-geo-1.png "1-4-geo-1"
[03]: ./img/1-4-geo-2.png "1-4-geo-2"
[04]: ./img/2-1-line.png "2-1-line"
[05]: ./img/2-1-line-2.png "2-1-line-2.png"