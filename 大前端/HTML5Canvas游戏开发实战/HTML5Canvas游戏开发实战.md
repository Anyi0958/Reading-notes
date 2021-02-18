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
- `xx.strokeRect()`�����滻Ϊ`xx.rect();xx.stroke();`
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
    <script type="text/javascript">
        let c = document.getElementById('canvas');
        let ctx = c.getContext('2d');

        ctx.lineWidth = 5;
        ctx.strokeStyle = "blue";
        ctx.beginPath();
        ctx.strokeRect(10, 10, 70, 40);        
    </script>
</body>
</html>
```
�����
![2-2-rectangle][06]
#### ʵ�ľ���
- �滻Ϊ`fillRect()`
- Ҳ���Ի���`ctx.rect();ctx.fill();`
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
    <script type="text/javascript">
        let c = document.getElementById('canvas');
        let ctx = c.getContext('2d');

        ctx.lineWidth = 5;
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.fillRect(10, 10, 70, 40);        

    </script>
</body>
</html>
```
�����
![2-3-fillRect][07]

### 3. Բ��
- `arc(x,y,r,rid,endrid,yy)`
- `xx.fill()`���ʵ��Բ
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
        let c = document.getElementById('canvas');
        let ctx = c.getContext('2d');

        ctx.lineWidth = 5;
        ctx.strokeStyle = 'red';
        ctx.beginPath();
        ctx.arc(100, 100, 70, 0, 130*Math.PI/100, true);
        ctx.stroke();
    </script>
</body>
</html>
```
![2-4-circle][08]

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
        let c = document.getElementById('canvas');
        let ctx = c.getContext('2d');

        ctx.lineWidth = 5;
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(100, 100, 70, 0, 130*Math.PI/100, true);
        ctx.fill();
    </script>
</body>
</html>
```
![2-4-circle-2.png][09]

### 4. ��Բ�Ǿ���
- Բ�ǣ�`arcTo(x,y,x,y,r)`
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
        let c = document.getElementById('canvas');
        let ctx = c.getContext('2d');

        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.moveTo(20, 20);
        ctx.lineTo(70, 20);
        ctx.arcTo(120, 30, 120, 70, 50);
        ctx.lineTo(120, 120);
        ctx.stroke();
    </script>
</body>
</html>
```
![2-5-arline][10]

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
        let c = document.getElementById('canvas');
        let ctx = c.getContext('2d');

        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.moveTo(40, 20);
        ctx.lineTo(120, 20);
        ctx.arcTo(120, 20, 120, 40, 20);
        ctx.lineTo(120, 70);

        ctx.arcTo(120,90,100,90,20);
        ctx.lineTo(40,90);

        ctx.arcTo(20,90,20,70,20);
        ctx.lineTo(20, 40);

        ctx.arcTo(20,20,40,20,20);
        ctx.stroke();
    </script>
</body>
</html>
```
![2-5-arline-2.png][11]

### 5. ����Canvas����
- ������������`clerRect(x,y,long,width)`
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
        let c = document.getElementById('canvas');
        let ctx = c.getContext('2d');

        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.fillRect(10,10,200,100);
        ctx.clearRect(30,30,50,50);
    </script>
</body>
</html>
```
![2-6-clear][12]

## ����ͼ��
### 1. ����
- �������������ߣ��������߻򱴼ð����ߣ�Ӧ���ڶ�άͼ�ε���ѧ����
#### 1. ���α���������
- ����һ�����Ƶ�
- `quadraticCurveTo(cpx, cpy, x, y)`
- cpx,cpy ���Ƶ������
- x,y �յ�����
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
        let c = document.getElementById('canvas');
        let ctx = c.getContext('2d');

        ctx.strokeStyle = 'red';
        ctx.beginPath();

        ctx.moveTo(100, 100);
        ctx.quadraticCurveTo(20, 50, 200, 20);
        ctx.stroke();
    </script>
</body>
</html>
```
![2-7-quadratic][13]

#### 2. ���α���������
- ���α��������������Ƶ�
- `bezierCurveTo(cx1,cy1,cx2,cy2,endx,endy)`
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
        let c = document.getElementById('canvas');
        let ctx = c.getContext('2d');

        ctx.strokeStyle = 'red';
        ctx.beginPath();

        ctx.moveTo(68, 130);
        ctx.bezierCurveTo(20,10,268,10,268,170);
        ctx.stroke();
    </script>
</body>
</html>
```
![2-8-tridratic][14]

### 2. clip��ָ�������ͼ
- `clip`ʹ�õ�ǰ·����Ϊ�������Ʋ����ļ�������
- ���ۻ����ϻ����˶���ͼ�Σ�����ͼ��ֻ����`clip`���ȴ�������
- �Ȼ���һ��Բ��`clip`���������Բ��Ϊ���Ʋ���������֮���ͼ��ֻ����ʾ�����������
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
        let c = document.getElementById('canvas');
        let ctx = c.getContext('2d');

        ctx.arc(100,100,40,0,360*Math.PI/180,true);
        ctx.clip();

        ctx.beginPath();

        ctx.fillStyle = "lightblue";
        ctx.fillRect(0,0,300,150);

    </script>
</body>
</html>
```
�Ա�
ǰ��
![2-9-preclip][15]
��
![2-9-postclip.png][16]

### 3. �Զ���ͼ��

***
[01]: ./img/1-3-canvas.png "1-3-canvas"
[02]: ./img/1-4-geo-1.png "1-4-geo-1"
[03]: ./img/1-4-geo-2.png "1-4-geo-2"
[04]: ./img/2-1-line.png "2-1-line"
[05]: ./img/2-1-line-2.png "2-1-line-2.png"
[06]: ./img/2-2-rectangle.png "2-2-rectangle"
[07]: ./img/2-3-fillRect.png "2-3-fillRect"
[08]: ./img/2-4-circle.png "2-4-circle"
[09]: ./img/2-4-circle-2.png "2-4-circle-2.png"
[10]: ./img/2-5-arline.png "2-5-arline"
[11]: ./img/2-5-arline-2.png "2-5-arline-2.png"
[12]: ./img/2-6-clear.png "2-6-clear"
[13]: ./img/2-7-quadratic.png "2-7-quadratic"
[14]: ./img/2-8-tridratic.png "2-8-tridratic"
[15]: ./img/2-9-preclip.png "2-9-preclip"
[16]: ./img/2-9-postclip.png "2-9-postclip.png"