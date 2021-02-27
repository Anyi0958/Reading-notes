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
## 1. canvas��������

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

## 2. ����ͼ��

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
- ������ϸ����������Ӷ�ʵ��һЩ�����ͼ��
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

        ctx.beginPath();

        ctx.moveTo(100, 150);
        
        ctx.bezierCurveTo(50,100,100,0,150,50);
        ctx.bezierCurveTo(200,0,250,100,200,150);
        ctx.bezierCurveTo(250,200,200,300,150,250);
        ctx.bezierCurveTo(100,300,50,200,100,150);

        ctx.closePath();

        ctx.moveTo(100,150);
        ctx.lineTo(150,50);
        ctx.lineTo(200,150);
        ctx.lineTo(150,250);
        ctx.lineTo(100,150);

        ctx.lineWidth = 5;
        ctx.strokeStyle = '#ff0000';
        ctx.stroke();
    </script>
</body>
</html>
```
�����
![17-2-10-customeGraphics][17]



## 3. �����ı�

- ��`Canvas`��`API`�У�ֻ����ʾ���֣��޷�ֱ�ӻ���һ�������
- ��Ҫ�����ʱ����`HTML`�е��ı���������

### 1. ��������

- �������ַ�����`fillText`��`strokeText`

#### 1. `fillText`��������

- `fillText(text,x,y,maxWidth)`

չʾ���룺

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

        // set the font size and type
        ctx.font = "30px Arial";
        // set the context
        ctx.fillText("Hello World!", 100, 50);
    </script>
</body>
</html>
```

���չʾ��

![18-3-1-fillText][18]



�趨��4��������

```js
ctx.fillText("Hello World!", 100, 50, 50);
```

![19-3-1-fillText][19]



#### 2. `strokeText`��������

- `strokeText(text, x, y, maxWidth)`
- �൱���ߣ���������ͼ��

����չʾ��

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

        ctx.font = "30px Arial";
        ctx.strokeText("hello World!", 100, 50);
    </script>
</body>
</html>
```

�����

![20-3-2-strokeText][20]



### 2. ��������

- ���㱾���ڶ��������ʽ����С����ϸ

#### 1. ��С

- `ctx.font = "30px Arial";`

��������չʾ��

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
        var c = document.getElementById('canvas');
        var ctx = c.getContext('2d');

        ctx.beginPath();
        // 30px
        ctx.font = "30px Arial";
        ctx.fillText("Hello World", 100, 50);

        ctx.beginPath();
        // 50px
        ctx.font = "50px Arial";
        ctx.fillText("Hello World", 100, 150);

        ctx.beginPath();
        // 100px
        ctx.font = "100px Arial";
        ctx.fillText("Hello World", 100, 250);
    </script>
</body>
</html>
```

##### ������ڵ�����

![21-3-3-MultiText][21]

- `canvas`���ƺ�ֻ��ʾһ�룬�����Ⲣ����`css`���ã����ǻ��Ƶ���Ⱦ����
- <span style="color:red">����취��</span>
  - ָ��`canvas`�ĳ��Ϳ�`c.width = window.innerWidth;c.height = window.innerHeight;`

#### 2. ��������

���룺

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
        ctx.font = "30px Arial";
        ctx.fillText("Hello World Arial", 50, 50);

        ctx.beginPath();
        ctx.font = "30px Verdana";
        ctx.fillText("Hello World Verdana", 50, 100);

        ctx.beginPath();
        ctx.font = "30px Times New Roman";
        ctx.fillText("Hello World Times New Roman", 50, 150);

        ctx.beginPath();
        ctx.font = "30px Courier New";
        ctx.fillText("Hello World Courier New", 50, 200);
    </script>
</body>
</html>
```

![22-3-4-font][22]



#### 3. ���ִ���Ч��

- ����Ч����`ctx.font = 'normal 30px Arial';`

- ������ֵ��`normal, bold, bolder, lighter, number`

#### 4. ����б��Ч��

- ������`font-style`
- ͨ��`font`�����ã�`ctx.font = 'italic 30px Arial'; `
- б���У�`italic, oblique`

### 3. ���뷽ʽ

- ���룺`textAlign`��`textBaseline`
- `textAlign`��ˮƽ��������ֶ���
  - ֵ������`center, end, left, right, start`
- `textBaseline`����ֱ����Ķ���
  - ֵ������`alphabetic, bottom, hanging, ideographic, middle, top`

����չʾ��

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

        ctx.moveTo(160, 0);
        ctx.lineTo(160, 500);
        ctx.stroke();

        ctx.beginPath();
        ctx.textAlign = 'start';
        ctx.font = '30px Arial';
        ctx.fillText("Hello World(start)",160,50);


        ctx.beginPath();
        ctx.textAlign = 'end';
        ctx.font = '30px Arial';
        ctx.fillText("Hello World",160,100);

        ctx.beginPath();
        ctx.textAlign = 'left';
        ctx.font = '30px Arial';
        ctx.fillText("Hello World",160,150);

        ctx.beginPath();
        ctx.textAlign = 'center';
        ctx.font = '30px Arial';
        ctx.fillText("Hello World",160,200);

        ctx.beginPath();
        ctx.textAlign = 'right';
        ctx.font = '30px Arial';
        ctx.fillText("Hello World",160,250);
    </script>
</body>
</html>
```



#### ����Ծɴ�������

��������

![24-3-5-align-2][24]

ʵ�ʽ����

![23-3-5-align.png][23]

<span style="color:red">����취��</span>

- ָ��`canvas`�ĳ��Ϳ�`c.width = window.innerWidth;c.height = window.innerHeight;`

## 4. ͼƬ����

- ������Ϸʱ����Ϸ�еĵ�ͼ�������������Ʒ�ȶ�����ͼƬ���
- �ṩ���ƺ�����`drawImage()`��`putImageData`

### 1. `drawImage()`����ͼƬ

- ����3�к���ԭ�ͣ�
  - `drawImage(image, dx, dy)`
  - `drawImage(image, dx, dy, dw, dh)`
  - `drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)`
- `image`��Ҫ���ƵĶ��󣬿�����`HTMLImageElement, HTMLCanvasElement, HTMLVideoElement`
- `dx, dy`��`image`��`Canvas`�ж�λ������ֵ
- `dw, dh`��`image`��`canvas`�м�����������Ŀ�Ⱥ͸߶ȣ������`dx, dy`��ƫ����
- `sx, sy`��`image`��Ҫ���Ƶ���ʼλ��
- `sw, sh`��`image`��������(���`image`��`sx,sy`����ƫ����)�Ŀ�Ⱥ͸߶�

ʵ�ִ��룺
#### 1. ����`<img>`��ǩ
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
    img <br />
    <img id="imgs" width="240" height="240" src="../../img/show.jpg">
    <hr />
    canvas<br />
    <canvas id="canvas" width="500" height="350"></canvas>
    <script>
        let c = document.getElementById('canvas');
        let ctx = c.getContext('2d');

        let img = document.getElementById('imgs');
        // ����س�ͼƬ
/*         img.addEventListener('load', ()=> {
            ctx.drawImage(img, 20, 20);
        }); */
        // ����س���ͼƬ
        img.onload = () => {
            ctx.drawImage(img, 20, 20);
        }
    </script>
</body>
</html>
```

##### ע��

1. `drawImage()`������Ҫ�ȵ�`img`��ǩ��ָ����ͼ�������ɺ��ٿ�ʼ��ͼ������������ͼ�����
2. �����������ּ��ط�ʽ��
   1. `img.onload = function() {drawImage()}`
   2. `window.onload = function() {drawImage()}`
3. ����ʹ��`addEventListener('load', () => {drawImage()})`�����Ի��ͼ��
   1. ͬ��`document.querySelector('#imgs').addEventListener('load', (event) => {drawImage()})`

```js
        let img = document.getElementById('imgs');
        // ����س�ͼƬ	
        img.addEventListener('load', ()=> {
            ctx.drawImage(img, 20, 20);
        });
        // ����س���ͼƬ
        img.onload = () => {
            ctx.drawImage(img, 20, 20);
        }
```

#### 2. Ҳ����ͨ��`Image`��������ȡ
- `ctx.drawImage(image, 10, 10)`�� ��(10,10)��ʼ��������ͼƬ
- `ctx.drawImage(image, 260, 10, 100, 100)`����(260,10)��ʼ����ͼƬ����100����100�ľ���������
- `ctx.drawImage(image, 50, 50, 100, 100, 260, 130, 100, 100)`����ȡ(50,50)��(100,100)�Ĳ��֣���(260,130)��ʼ���ƣ��ŵ���100����100��������

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
    canvas<br />
    <canvas id="canvas" width="500" height="350"></canvas>
    <script>
        let c = document.getElementById('canvas');
        let ctx = c.getContext('2d');

        let image = new Image();
        image.src = "../../img/show.jpg";
        image.onload = () => {
            // ��(10,10)��ʼ��������ͼƬ
            ctx.drawImage(image, 10, 10);
            // ��(260,10)��ʼ����ͼƬ����100����100�ľ���������
            ctx.drawImage(image, 260, 10, 100, 100);
            // ��ȡ(50,50)��(100,100)�Ĳ��֣���(260,130)��ʼ���ƣ��ŵ���100����100��������
            ctx.drawImage(image, 50, 50, 100, 100, 260, 130, 100, 100);
        };
    </script>
</body>
</html>
```
�����
![25-drawImageshow][25]

### 2. `getImageData`��`putImageData`����ͼƬ

�����������Ļ��ư취��

- `putImageData(imagedata,dx,dy,sx,sy,sw,sh)`
  - `imgdata`:��������
  - `dx,dy`����ͼ��λ����ֵ
  - `sx,sy`��`imgdata`Ҫ���Ƶ�ͼƬ��ʼλ��
  - `sw,sh`��`imgdata`Ҫ��������Ŀ�Ⱥ͸߶�
- `getImageData(x,y,w,h)`����`canvas`�õ���������

```html
<!DOCTYPE html>
<html lang="zh">
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

        let image = new Image();

        image.src = "./show.jpg";
        image.onload = () => {
            ctx.drawImage(image,10,10);
            let imgdata = ctx.getImageData(10,10,400,400);
            ctx.putImageData(imgdata,10,260);
            ctx.putImageData(imgdata,200,260,50,50,100,100);
        };
    </script>
</body>
</html>
```

#### ע��

- ֱ����������еĴ򿪣����漰���������⣬�Ӷ��޷����
- Ӧ���ñ��ط�����`live-server xx.html`����

![26-getImageData][26]

### 3. `createImageData`�½�����

���ֺ���ԭ�ͣ�

- `createImageData(sw, sh)`������ָ����С��`imageData`����
- `createImageData(imagedata)`��������ָ��������ͬ��С��`imageData`����

����չʾ��

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

        let image = new Image();
        image.src = "./show.jpg";
        image.onload = () => {
            ctx.drawImage(image, 10, 10);
            let imgdata = ctx.getImageData(50,50,200,200);

            let imgdata01 = ctx.createImageData(imgdata);
            for(let i = 0; i < imgdata01.width * imgdata01.height * 4; i +=4){
                imgdata01.data[i+0] = 255;
                imgdata01.data[i+1] = 0;
                imgdata01.data[i+2] = 0;
                imgdata01.data[i+3] = 255;
            }
            ctx.putImageData(imgdata01,10,260);

            let imgdata02 = ctx.createImageData(imgdata);
            for(let i = 0; i < imgdata02.width * imgdata02.height * 4; i +=4){
                imgdata01.data[i+0] = 255;
                imgdata01.data[i+1] = 0;
                imgdata01.data[i+2] = 0;
                imgdata01.data[i+3] = 155;
            }
            ctx.putImageData(imgdata01,220,260);
        };
    </script>    
</body>
</html>
```

# �߼�����

## 1. ����

### 1. �Ŵ�����С

- ����ԭ�ͣ�`scale(x,y)`

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
        window.onload = () => {
            let c = document.getElementById('canvas');
            c.width = window.innerWidth;
            c.height = window.innerHeight;
            let ctx = c.getContext('2d');

            ctx.beginPath();
            ctx.strokeStyle = '#0000000';
            ctx.strokeRect(10,10,150,150);

            ctx.scale(3,3);
            ctx.beginPath();
            ctx.strokeStyle = '#cccccc';
            ctx.strokeRect(10, 10, 150, 100);        
        }
    </script>
</body>
</html>
```

![27-scale][27]

### ͼ�εķ�ת

���룺

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
        window.onload = () => {
            let c = document.getElementById('canvas');
            c.width = window.innerWidth;
            c.height = window.innerHeight;
            let ctx = c.getContext('2d');

            let image = new Image();
            image.src = './show.jpg';
            image.onload = () => {
                ctx.drawImage(image, 10, 10,100,100);
                ctx.scale(1, -1);
                ctx.drawImage(image, 250, -250,100,100);
            }
        }
    </script>
</body>
</html>
```



�����

![28-rescale][28]

### 2. ƽ��

- ����ԭ�ͣ�`translate(x,y)`

- `x`��ƽ�ƣ�`y`����ֱ����ƽ��

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
        window.onload = () => {
            let c = document.getElementById('canvas');
            c.width = window.innerWidth;
            c.height = window.innerHeight;
            let ctx = c.getContext('2d');

            ctx.beginPath();
            ctx.strokeStyle = '#0000000';
            ctx.strokeRect(10,10,150,150);

            ctx.translate(50,100);
            ctx.beginPath();
            ctx.strokeStyle = '#cccccc';
            ctx.strokeRect(10, 10, 150, 100);

            
        }
    </script>
</body>
</html>
```

�����

![29-translate][29]

### 3. ��ת

- `rotate(angle)`
- `angle`�ǻ��ȣ������ǽǶ�
- ����ɻ��Ⱦ���$\frac{angle\times MAth.PI}{180}$

���룺

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
        window.onload = () => {
            let c = document.getElementById('canvas');
            c.width = window.innerWidth;
            c.height = window.innerHeight;
            let ctx = c.getContext('2d');
            ctx.strokeRect(200,50,100,50);

            ctx.rotate(45 * Math.PI/180);
            ctx.beginPath();
            ctx.strokeStyle = '#0000000';
            ctx.strokeRect(200,50,100,50);
           
        }
    </script>
</body>
</html>
```

�����

![30-rotate][30]



### 4. `transform`����ʵ�ֶ������ı���

- ���б��ζ�����ͨ�����ξ���`transform(a,b,c,d,e,f)`��ʵ�ֵ�
- ��Ӧλ�õĲ�����<span style="color:red">$\left(\begin{array}{cols} a & c & e\\ b & d & f \\ 0 & 0 & 1\end{array}\right)$</span>

#### 1. ����

- ����ԭʼ��`(x,y)`����Ϊ`(x1,y1)`�����ŵı�����`a,d`
- $x1 = a\times x $
- $y1 = d \times y$

�õ�����ʽ��
$$
\left(\begin{array}{cols}x1\\y1\\1\end{array}\right) = \left(\begin{array}{cols}a&0&0\\0&d&0\\0&0&1\end{array}\right)\left(\begin{array}{cols}x\\y\\1\end{array}\right)
$$

- ���ǿ���ʹ��`transform(a,0,0,d,0,0)`�滻`scale(a,d)`

#### 2. ƽ��

- $x1=x+e$
- $y1=y+f$

����ʽ��
$$
\left(\begin{array}{cols}1&0&e\\0&1&f\\0&0&1\end{array}\right)\left(\begin{array}{cols}x\\y\\1\end{array}\right)
$$

- `transform(1,0,0,1,e,f)`�滻`translate(e,f)`

#### 3. ��ת

����ʽ��
$$
\left(\begin{array}{cols}x1\\y1\\1\end{array}\right)=\left(\begin{array}{cols}\cos \theta & -\sin \theta & 0\\\sin \theta& \cos \theta & 0\\0&0&1\end{array}\right)
$$

- $transform(\cos \theta, \sin \theta, -\sin\theta,\cos\theta,0,0)$���滻$rotate(\theta)$

#### `setTransform`

- ������`transform`��ͬ
- `setTransform`����ȥ֮ǰ��`transform`�任��Ȼ�����½��б任

#### 4. ��б

##### ��бͼ��1��

![33-tiltprinciple][33]

��ʽ��
$$
\left(\begin{array}{cols}\frac{(P1.x - p0.x)}{width}&\frac{p2.x-p0.x}{height}&p0.x\\\frac{p1.y-p0.y}{width}&\frac{(p2.y-p0.y)}{height}&p0.y\\0&0&1\end{array}\right)
$$


##### ��бͼ��2��

![34-tiltprinciple2][34]

��ʽ��
$$
\left(\begin{array}{cols}\frac{(p3.x-p2.x)}{width} & \frac{p3.x-p1.x}{height} & p2.x \\ \frac{(p3.y-p2.y)}{width} & \frac{p3.y-p1.y}{height} & p2.y \\ 0 & 0 & 1\end{array}\right)
$$


���Դ��룺

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
        window.onload = () => {
            let c = document.getElementById('canvas');
            c.width = window.innerWidth;
            c.height = window.innerHeight;
            let ctx = c.getContext('2d');

            ctx.setTransform(1,10/150,-40/100,1,40,10);
            ctx.rect(50,50,150,100);
            ctx.stroke();
        }
    </script>
</body>
</html>
```

�����

![31-tilt][31]

#### 5. ͼƬ��Ť��

- ��������4�ֵı仯���ټ���`clip`�������Ӷ�ʵ����Ҫ��Ч��

���룺

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
        window.onload = () => {
            let c = document.getElementById('canvas');
            c.width = window.innerWidth;
            c.height = window.innerHeight;
            let ctx = c.getContext('2d');

            let img = new Image();
            img.src = './show.jpg';
            img.onload = () => {
                ctx.save();
                ctx.beginPath();

                ctx.moveTo(80,0);
                ctx.lineTo(320,40);
                ctx.lineTo(0,200);
                ctx.closePath();

                ctx.clip();

                ctx.setTransform((320-80)/240,40/240,-80/240,200/240,80,0);
                ctx.drawImage(img,0,0);
                ctx.restore();

                ctx.save();
                ctx.beginPath();
                ctx.moveTo(320,40);
                ctx.lineTo(0,200);
                ctx.lineTo(200,150);
                ctx.closePath();

                ctx.clip();

                ctx.setTransform(200/240,(150-200)/240,(200-320)/240,(150-40)/240,0,200);
                ctx.drawImage(img,0,0-240);
                ctx.restore();
            };
        }
    </script>
</body>
</html>
```

�����

![32-special][32]

##### �������

1. ����ͼ�εĻ���
	- ��`(80,0),(320,40),(0,200)`3����Ϊ�������һ��������
	- ��`clip`�������������Ϊ��ͼ�Ŀ�������
```js
ctx.beginPath();

ctx.moveTo(80,0);
ctx.lineTo(320,40);
ctx.lineTo(0,200);
ctx.closePath();
//������ͼ���Ϊ����
ctx.clip();

ctx.setTransform((320-80)/240,40/240,-80/240,200/240,80,0);
ctx.drawImage(img,0,0);
```

![35-halftilt.png][35]

2. �Ұ�������ͬ

- `save()`��`restore()`�����α��κͻ�ͼ��������

## 2. ͼ�ε���Ⱦ

- ��ɫ����`API`�����䡢��ɫ��

### 1. ���Խ���

����ʵ�����Խ���ĺ�����`createLinearGradient()`��`addColorStop()`

- `createLinearGradient(x1,y1,x2,y2)`
  - ����ĳ����㣺`(x1,y1)`
  - �յ㣺`(x2,y2)`

- `addColorStop(position,color)`
  - `position`��0.0-1.0֮�䣬��ʾ��������ɫ�ص����Ե�λ
  - `color`���������ɫ

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
        window.onload = () => {
            let c = document.getElementById('canvas');
            c.width = window.innerWidth;
            c.height = window.innerHeight;
            let ctx = c.getContext('2d');

            let grd = ctx.createLinearGradient(0,0,200,0);
            grd.addColorStop(0.2, "#00ff00");
            grd.addColorStop(0.8, "#ff0000");

            ctx.fillStyle = grd;
            ctx.fillRect(0,0,200,100);
        }
    </script>
</body>
</html>
```

�����

![36-gradient.png][36]

### 2. ���򽥱�

- `createRadialGradient`��`addColorStop()`
- `createRadialGradient(x0,y0,r0,x1,y1,r1)`
  - `x0,y0`��Բ������
  - `r0`��Բ��ֱ��
  - `x1,y1`������Բ��Բ������
  - `r1`������Բ��ֱ��

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
        window.onload = () => {
            let c = document.getElementById('canvas');
            c.width = window.innerWidth;
            c.height = window.innerHeight;
            let ctx = c.getContext('2d');

            let grd = ctx.createRadialGradient(100,100,10,100,100,50);
            grd.addColorStop(0, "#00ff00");
            grd.addColorStop(1, "#ff0000");

            ctx.fillStyle = grd;
            ctx.fillRect(0,0,200,200);
        }
    </script>
</body>
</html>
```



![37-radial.png][37]

### ��ɫ�ϳ�֮`globalCompositeOperation`����

- `globalCompositeOperation`�����Ƶ������ϵ���ɫ�뻭�������е���ɫ�������
- `source`����Ҫ���ƵĻ�����ɫ��`destination`���������Ѿ����ڵ���ɫ��Ĭ����`source-over`

![38-detail][38]

���ӣ�

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
        window.onload = () => {
            let c = document.getElementById('canvas');
            c.width = window.innerWidth;
            c.height = window.innerHeight;
            let ctx = c.getContext('2d');

            ctx.fillStyle = "#00ff00";
            ctx.fillRect(10,10,50,50);
            ctx.globalCompositeOperation = "source-over";
            ctx.beginPath();
            ctx.fillStyle = "#ff0000";
            ctx.arc(50,50,30,0,2*Math.PI);
            ctx.fill();
        }
    </script>
</body>
</html>
```



![39-globalComposite.png][39]

### ��ɫ��ת

- ÿ�����ؽ�����ɫȡ��

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
            c.width = window.innerWidth;
            c.height = window.innerHeight;
            let ctx = c.getContext('2d');

            let image = new Image();
            image.src = "./show.jpg";
            image.onload = () => {
                ctx.drawImage(image, 0, 0,250,250);
                let imgdata = ctx.getImageData(0,0,250,250);
                let pixels = imgdata.data;

                for(let i = 0, n = pixels.length; i < n; i += 4){
                    pixels[i] = 255 - pixels[i];
                    pixels[i+1] = 255 - pixels[i+1];
                    pixels[i+2] = 255 - pixels[i+2];
                }

                ctx.putImageData(imgdata, 260, 0);
            };


    </script>
</body>
</html>
```



![40-reverse.png][40]

### �Ҷȿ���

- �Ҷ�ͼ

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
            c.width = window.innerWidth;
            c.height = window.innerHeight;
            let ctx = c.getContext('2d');

            let image = new Image();
            image.src = "./show.jpg";
            image.onload = () => {
                ctx.drawImage(image, 0, 0,250,250);
                let imgdata = ctx.getImageData(0,0,250,250);
                let pixels = imgdata.data;
                // RGBȡ��
                for(let i = 0, n = pixels.length; i < n; i += 4){
                    let grayscale = pixels[i] * .3 + 
                                pixels[i+1] * .59 +
                                pixels[i+2] * .11;
                    pixels[i] = grayscale;  // red
                    pixels[i+1] = grayscale;    // green
                    pixels[i+2] = grayscale;    // blue
                }

                ctx.putImageData(imgdata, 260, 0);
            };


    </script>
</body>
</html>
```

![41-gray][41]



### ��Ӱ

- �Զ�Ϊ���Ƶ��κ�ͼ�����������Ӱ������
- ��Ӱ��ɫ��`shadowColor = "#ff0000"`
- `shadowOffsetX=10`��ˮƽƫ����
- `shadowOffsetY=10`����ֱƫ����
- `shadowBlur=10`����Ӱ��Ե����������Ӱ�ĳ̶�

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
            c.width = window.innerWidth;
            c.height = window.innerHeight;
            let ctx = c.getContext('2d');

            ctx.shadowColor = "#ff0000";
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 20;
            ctx.shadowOffsetY = 30;

            let image = new Image();
            image.src = "./show.jpg";
            image.onload = () => {
                ctx.drawImage(image, 0, 0,250,250);
            };


    </script>
</body>
</html>
```



![42-shadow][42]



## 3. �Զ��廭��

### ˼·

1. ��갴�£���ʼ�軭����갴���¼���
2. ��굯�𣬽����軭����굯���¼���
3. ��갴���ƶ���·�����ߡ�����ƶ��¼���

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
        c.width = window.innerWidth;
        c.height = window.innerHeight;
        let ctx = c.getContext('2d');

        // draw one black board
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,600,300);

        // ���±��
        let onoff = false,
            oldx = -10,
            oldy = -10;

        // ������ɫ
        let linecolor = "white";

        // �����߿�
        let linw = 4;

        // �������¼�
        // ����
        c.addEventListener('mousedown', event => {
            onoff = true;
            // λ�� - 10��Ϊ�˽���λ�ã��ѻ�ͼ�������ָ��Ķ���
            oldx = event.pageX - 10;
            oldy = event.pageY - 10;
        },false);
        // �ƶ�
        c.addEventListener('mousemove', event => {
            if(onoff == true){
                let newx = event.pageX - 10,
                    newy = event.pageY - 10;

                // ��ͼ
                ctx.beginPath();
                ctx.moveTo(oldx,oldy);
                ctx.lineTo(newx,newy);
                ctx.strokeStyle = linecolor;
                ctx.lineWidth = linw;
                ctx.lineCap = "round";
                ctx.stroke();
			   // ��������������
                oldx = newx,
                oldy = newy;
            }
        }, true);
        // ����
        c.addEventListener('mouseup', ()=> {
            onoff = false;
        },false);
    </script>
</body>
</html>
```

���չʾ��

![43-blackBoard][43]

### ���뽲��

����˼·��������꣬�����ƶ��Ŀ��أ��ƶ���ʼ��¼���������ƶ��������-�ƶ�ǰ�����꣬Ȼ����ߣ���ÿ���ƶ�������¾����ꡣ�ɿ������ͷ��ƶ����ء�

1. ֻ������갴�£��Żᴥ���ƶ���ͼ��Ч����������Ҫ����һ��״̬�жϡ�
2. ��Ϊ���ָ���ʵ��λ����һ��ƫ���������������궨λ��ʱ����Ҫ����`pagex-10`�Ӷ�ʹ����λ��ָ��ļ�˴���
3. ÿ���ƶ���Ҫ��������λ�ã���С�ε��߶���ģ�ⲻ������ߡ�

### ����������ɫ�Ϳ��

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
    <button id="yellow" style="width: 80px;height: 80px;background-color: yellow;" onclick='linecolor = "yellow";'></button>
    <button id="red" style="width: 80px;height: 80px;background-color: red;" onclick='linecolor = "red";'></button>
    <button id="line" style="width: 80px;height: 80px;background-color: black;" onclick='linw = 44;'>44px</button>
    <script>
        let c = document.getElementById('canvas');
        c.width = window.innerWidth;
        c.height = window.innerHeight;
        let ctx = c.getContext('2d');

        // draw one black board
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,600,300);

        // ���±��
        let onoff = false,
            oldx = -10,
            oldy = -10;

        // ������ɫ
        let linecolor = "white";

        // �����߿�
        let linw = 4;

        // �������¼�
        // ����
        c.addEventListener('mousedown', event => {
            onoff = true;
            // λ�� - 10��Ϊ�˽���λ�ã��ѻ�ͼ�������ָ��Ķ���
            oldx = event.pageX - 10;
            oldy = event.pageY - 10;
        },false);
        // �ƶ�
        c.addEventListener('mousemove', event => {
            if(onoff == true){
                let newx = event.pageX - 10,
                    newy = event.pageY - 10;

                // ��ͼ
                ctx.beginPath();
                ctx.moveTo(oldx,oldy);
                ctx.lineTo(newx,newy);
                ctx.strokeStyle = linecolor;
                ctx.lineWidth = linw;
                ctx.lineCap = "round";
                ctx.stroke();
                // ÿ���ƶ���Ҫ��������λ��
                oldx = newx,
                oldy = newy;
            }
        }, true);
        // ����
        c.addEventListener('mouseup', ()=> {
            onoff = false;
        },false);
    </script>
</body>
</html>
```

![44-board][44]

### ������������

- ���������ͼƬ�������ܣ�������`canvas`�����ͼ�񣬱���ΪͼƬ��ʽ
- `canvas.toDataURL("image/png")`
- <span style="color:red;">���Ҫ����ΪͼƬ����Ҫ����`PHP`����`ASP`����</span>

- ������ʽ���½�`<img>`��ǩ��Ȼ�󽫸��Ƶ�`canvas`������`<img>`��ʾ����

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
    img<br />
    <button id="export" style="width: 80px;height: 80px;"></button>
    <hr />
    <canvas id="canvas"></canvas>
    
    <script>
        let c = document.getElementById('canvas');
        c.width = window.innerWidth;
        c.height = window.innerHeight;
        let ctx = c.getContext('2d');

        // draw one black board
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,600,300);

        // ���±��
        let onoff = false,
            oldx = -10,
            oldy = -10;

        // ������ɫ
        let linecolor = "white";

        // �����߿�
        let linw = 4;

        // �������¼�
        // ����
        c.addEventListener('mousedown', event => {
            onoff = true;
            // λ�� - 10��Ϊ�˽���λ�ã��ѻ�ͼ�������ָ��Ķ���
            oldx = event.pageX - 10;
            oldy = event.pageY - 10;
        },false);
        // �ƶ�
        c.addEventListener('mousemove', event => {
            if(onoff == true){
                let newx = event.pageX - 10,
                    newy = event.pageY - 10;

                // ��ͼ
                ctx.beginPath();
                ctx.moveTo(oldx,oldy);
                ctx.lineTo(newx,newy);
                ctx.strokeStyle = linecolor;
                ctx.lineWidth = linw;
                ctx.lineCap = "round";
                ctx.stroke();
                // ÿ���ƶ���Ҫ��������λ��
                oldx = newx,
                oldy = newy;
            }
        }, true);
        // ����
        c.addEventListener('mouseup', ()=> {
            onoff = false;
        },false);

        document.getElementById("export").addEventListener('click', event => {
            let src = c.toDataURL("image/png");
            let img = document.createElement("img");
            img.src = src;
            document.body.appendChild(img);
            
        });
    </script>
</body>
</html>
```



![45-export][45]



# `lufylegend`��Դ���

������Ϸʱ���������⣺
1. ���������`JS`��`HTML`������һ�£�`offsetX`��`layerX`
2. �ֻ��������`PC`�����������`touch`��`mouse`
3. �����׶���

## �Ƽ��Ķ�
- [����](http://lufylegend.com/lufylegend "lufylegend")
- �����Ϊԭ���`min`�棬�ֱ��ʺ�ѧϰ��ʹ��

## 1. ����ԭ��

- ����`setInterval`��`canvas`�������ػ棬ÿ��������`clearRect`
- �����������ͬ�жϼ���`mouse`����`touch`
- �����ص��¼�������Ԥ��׼���������У�������¼�������ʱ�򣬲Ż���������������¼����ô����ڣ������صĵ���¼�ֻ�ǳ�ʼ��ʱ��һ�������������������е��¼������Ƕ�����Ϳ��Ը����������ص���¼���

## ʹ������

1. ������
2. ����`<div>`
3. ʹ��`init`������ʼ������

### �������
- `init(speed, divid, width, height, completeFuc, type)`
  - `speed`����Ϸ�ٶ��趨
  - `divid`��`canvas`�����`div`�ڲ�
  - `width,height`����Ϸ���
  - `completeFunc`����Ϸ��ʼ����ɺ󣬵��ô˺���
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="./lufylegend-1.10.1.min.js"></script>
</head>
<body>
    <div id="legend">Loading...</div>
    <script>
        init(50, "legend", 500, 350, () => {
            console.log("lufylegend start.");
        });        
    </script>
</body>
</html>
```

## ͼƬ�ļ��غ���ʾ

����ͼƬ�Ĳ��裺

1. `Lloader`�����ͼƬ����
2. ��ȡ���ͼƬ���ݱ��浽`LbitmapData`��
3. ����`Lbitmap`��ͼƬ��ʾ������

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="./lufylegend-1.10.1.min.js"></script>
</head>
<body>
    <div id="legend">Loading...</div>
    <script>
        let loader;
/*         init(50, "legend", 500, 350, () => {
            console.log("lufylegend start.");
            loader = new LLoader();
            console.log("1");
            loader.addEventListener(LEvent.COMPLETE, function(event) {
                let bitmapdata = new LBitmapData(loader.content);
                let bitmap = new LBitmap(bitmapdata);
                addChild(bitmap);                
                console.log('2');
            });
            loader.load("show.jpg", "bitmapdata");
            console.log('3');
        });         */
        // ��Ϊ��װ������Ĳ���ʹ��
        init(50, "legend", 500,350,main);
        function main(){
            loader = new LLoader();
            console.log('1');
            loader.addEventListener(LEvent.COMPLETE, loadBitmapData);
            loader.load("show.jpg", "bitmapData");
            console.log('3');
        }

        function loadBitmapData(event) {
            let bitmapdata = new LBitmapData(loader.content);
            let bitmap = new LBitmap(bitmapdata);
            addChild(bitmap);
            console.log('2');
        }
    </script>
</body>
</html>
```
- ��һ�ַ�ʽչʾ��
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="./lufylegend-1.10.1.js"></script>
</head>
<body>
    <div id="legend">Loading...</div>
    <script>
        /*init(50, "legend", 500, 350, () => {
            console.log("lufylegend start.");
            console.log("1");
            let addEventListener = new Promise(function(resolve, reject){
                let loader = new LLoader();
                loader.addEventListener(LEvent.COMPLETE, function(event) {
                    let bitmapdata = new LBitmapData(loader.content);
                    let bitmap = new LBitmap(bitmapdata);
                    addChild(bitmap);                
                    console.log('2');
                });
                resolve(loader);
            })
            addEventListener.then(function(aLoder){
                aLoder.load("show.jpg", "bitmapdata");
                console.log('3');
            });
        });*/
        init(50, "legend", 500, 350, () => {
            console.log("lufylegend start.");
            let loader = new LLoader();            
            loader.addEventListener(LEvent.COMPLETE, function(event) {
                let bitmapdata = new LBitmapData(loader.content);
                let bitmap = new LBitmap(bitmapdata);
                addChild(bitmap);                            
            });
            // setTimeout(function(){console.log("�ӳ�1ms");}, 1);
            loader.load("show.jpg", "bitmapData");
        });

 
        
        // ��Ϊ��װ������Ĳ���ʹ��
        /*init(50, "legend", 500,350,main);
        function main(){
            loader = new LLoader();
            console.log('1');
            loader.addEventListener(LEvent.COMPLETE, loadBitmapData);
            loader.load("show.jpg", "bitmapData");
            console.log('3');
        }

        function loadBitmapData(event) {
            let bitmapdata = new LBitmapData(loader.content);
            let bitmap = new LBitmap(bitmapdata);
            addChild(bitmap);
            console.log('2');
        }*/
    </script>
</body>
</html>
```

![46-lufylegend][46]

### �������

```javascript
loader = new LLoader();            
loader.addEventListener(LEvent.COMPLETE, loadBitmapData);
loader.load("show.jpg", "bitmapData");

// ������
let image = new Image();
image.onload = () => {};
```

- `loader.content`����һ��`image`
- `LBitmapData`��`lufylegend`����е�һ���ֻ࣬����������Ͷ�ȡ`Image`����ģ������Ҫ��ʾ��`canvas`����Ҫ��`let bitmap = new LBitmap(bitmapdata);`�����Ҫ��Ӷ���`canvas`����Ҫ��`addChild(bitmap);`

## `LBitmapData`����

- ��������`LBitmapData(image,x,y,width,height)`
- `x,y`������
- `image`������
- `width,height`�����ӷ�Χ

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="./lufylegend-1.10.1.js"></script>
</head>
<body>
    <div id="legend">Loading...</div>
    <script>
        init(50, "legend", 500, 350, () => {
            let loader = new LLoader();
            loader.addEventListener(LEvent.COMPLETE, event => {
                let bitmapdata = new LBitmapData(loader.content, 50,50,150,150);
                let bitmap = new LBitmap(bitmapdata);
                addChild(bitmap);
            });
            // setTimeout(()=>{console.log("1ms")},1);
            loader.load("show.jpg", "bitmapData");
        });
    </script>
</body>
</html>
```

![47-LBitmapData][47]

## `LBitmap`����

- ��ʾͼƬ��`canvas`�ϣ������Կ���ͼƬ�ĸ�������
- ���꣬͸���ȣ���ת�����ŵ�

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="./lufylegend-1.10.1.js"></script>
</head>
<body>
    <div id="legend">Loading...</div>
    <script>
        init(50, "legend", 500, 350, () => {
            let loader = new LLoader();
            loader.addEventListener(LEvent.COMPLETE, event => {
                let bitmapdata = new LBitmapData(loader.content, 50,50,150,150);
                let bitmap = new LBitmap(bitmapdata);
                // ͼƬ����
                bitmap.x = 50;
                bitmap.y = 50;
                // ��ת60��
                bitmap.rotate = 60;
                // ͼƬ͸��������0.4
                bitmap.alpha = 0.4;
                
                addChild(bitmap);
            });
            // setTimeout(()=>{console.log("1ms")},1);
            loader.load("show.jpg", "bitmapData");
        });
    </script>
</body>
</html>

```

![48-LBitmap][48]

## ��ĸ���

- ��Ϸ������ڵ�ͼ�����ߡ��Ի��ȣ���ʵ����ͼƬ�������ʵ�Ľ�����ò�ͬ��ͼ�����Ⱥ�˳����ʾ����Ļ��
- ͼ����ʵ���Ⱥ�˳���Լ�λ�þ�������Ϸ�Ľ���

- �ֲ㣺`LSprite`����

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="./lufylegend-1.10.1.js"></script>
</head>
<body>
    <div id="legend">Loading...</div>
    <script>
        init(50, "legend", 500, 350, () => {
            let loader = new LLoader();
            loader.addEventListener(LEvent.COMPLETE, event => {
                let bitmapdata = new LBitmapData(loader.content, 50,50,150,150);
                let bitmap = new LBitmap(bitmapdata);
                // �����LSprite
                let layer = new LSprite();                
                
                addChild(layer);
                layer.addChild(bitmap);
            });
            // setTimeout(()=>{console.log("1ms")},1);
            loader.load("show.jpg", "bitmapData");
        });
    </script>
</body>
</html>

```

- `LSprite`��`LBitmap`һ�������Զ����ꡢ͸���ȡ���ת�����Ž��п���
- ����`LSprite`���Ƶ�������������

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="./lufylegend-1.10.1.js"></script>
</head>
<body>
    <div id="legend">Loading...</div>
    <script>
        init(50, "legend", 500, 350, () => {
            let loader = new LLoader();
            loader.addEventListener(LEvent.COMPLETE, event => {
                let bitmapdata = new LBitmapData(loader.content, 50,50,150,150);
                let bitmap = new LBitmap(bitmapdata);
                // �����LSprite
                let layer = new LSprite();                
                
                addChild(layer);
                layer.addChild(bitmap);

                layer.x = 50;
                layer.y = 50;
                layer.rotate = 60;
            });
            // setTimeout(()=>{console.log("1ms")},1);
            loader.load("show.jpg", "bitmapData");
        });
    </script>
</body>
</html>

```

## `LGraphics`�����ͼ

- `lufylegend`����е�һ����ͼ�࣬������һЩ�����򻯻�ͼ
- ���Ե���ʹ�ã�Ҳ������`LSprite`���ʹ��

### 1. ���ƾ���

- `drawRect(thickness, lineColor, pointArray, isfill, color)`
  - `thickness`���߿��߿�
  - `pointArray`�����η�Χ���飨x,y,long,width��
  - `isfill`���Ƿ����

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="./lufylegend-1.10.1.js"></script>
</head>
<body>
    <div id="legend">Loading...</div>
    <script>
        init(50, "legend", 500, 350, () => {
            let graphics = new LGraphics();
            addChild(graphics);
            graphics.drawRect(1,'#000000',[50,50,100,100]);
            graphics.drawRect(1,'#000000',[170,50,100,100],true,'#cccccc');
        });
    </script>
</body>
</html>

```

![49-graphics][49]

### 2. ����Բ

- `drawArc(thickness,linecolor,pointArray,isfull,color)`
  - `pointArray`��`[x,y,r,start,end,˳ʱ�����ʱ��]`

```html
    <div id="legend">Loading...</div>
    <script>
        init(50, "legend", 500, 350, () => {
            let graphics = new LGraphics();
            addChild(graphics);
            graphics.drawArc(1,'#000000',[60,60,50,0,360*Math.PI/180]);
            graphics.drawArc(1,'#000000',[180,60,50,0,360*Math.PI/10],
                true,'#cccccc');
        });
    </script>
```

### 3. ���ƶ����

- `drawVertices(thickness,linecolor,vertices,isfill,color)`
- `vertices`����������`[[����1],[����2],[����3]...]`
- <span style="color:red">���������еĶ������������ڵ���3</span>

```html
    <div id="legend">Loading...</div>
    <script>
        init(50, "legend", 500, 350, () => {
            let graphics = new LGraphics();
            addChild(graphics);
            graphics.drawVertices(1,'#000000',
                [[50,20],[80,20],[100,50],[80,80],[50,80],[30,50]]);
            graphics.drawVertices(1,'#000000',
                [[150,20],[180,20],[200,50],[180,80],[150,80],[130,50]],
                true,'#cccccc');
        });
    </script>
```

## `LGraphics`ԭʼ��ͼ����

- `LGraphics`�������ʹ��`canvas`ԭʼ��ͼ�������л�ͼ

```html
    <div id="legend">Loading...</div>
    <script>
        init(50, "legend", 500, 350, () => {
            let graphics = new LGraphics();
            addChild(graphics);
            graphics.add((coodx,coody)=>{
                LGlobal.canvas.strokeStyle = '#000000';
                LGlobal.canvas.moveTo(20,20);
                LGlobal.canvas.lineTo(200,200);
                LGlobal.canvas.stroke();
            });
        });
    </script>
```

## `LSprite`�����ͼ

- ÿ��`LSprite`���󶼰���һ��`LGraphics`����Ҳ���������Ͻ���ʵ�ֻ�ͼ

```html
    <div id="legend">Loading...</div>
    <script>
        init(50, "legend", 500, 350, () => {
            let layer = new LSprite();
            addChild(layer);
            layer.graphics.drawRect(1,'#000000',[50,50,100,100]);
            layer.graphics.drawArc(1,'#000000',[60,60,50,0,360*Math.PI/180],
                        true, '#cccccc');
        });
    </script>
```

![50-LSpriteArc][50]

## `LGraphics`����ͼƬ

### 1. Բ������

- `LGraphics`����`beginBitmapFill`��`drawArc`���

```html
    <div id="legend">Loading...</div>
    <script>
        init(50, "legend", 500, 350, () => {
            let  loader = new LLoader();
            loader.addEventListener(LEvent.COMPLETE, event => {
                let bitmapdata = new LBitmapData(loader.content);
                let backLayer = new LSprite();
                addChild(backLayer);
                backLayer.graphics.beginBitmapFill(bitmapdata);
                backLayer.graphics.drawArc(1,'#000000',[60,60,50,0,360*Math.PI/180],
                        true, '#cccccc');
            });
            loader.load('show.jpg', "bitmapData");
        });
    </script>
```

![51-Lsprite][51]

### 2. ��������

- `LGraphics`�����`beginBitmapFill`��`drawRect`

```html
    <div id="legend">Loading...</div>
    <script>
        init(50, "legend", 500, 350, () => {
            let  loader = new LLoader();
            loader.addEventListener(LEvent.COMPLETE, event => {
                let bitmapdata = new LBitmapData(loader.content);
                let backLayer = new LSprite();
                addChild(backLayer);
                backLayer.graphics.beginBitmapFill(bitmapdata);
                backLayer.graphics.drawRect(1,'#000000',
                    [80,50,70,100]);
            });
            loader.load('show.jpg', "bitmapData");
        });
    </script>
```



### 3. ���������

- `LGraphics`�����`beginBitmapFill`��`drawVertices`

```html
    <div id="legend">Loading...</div>
    <script>
        init(50, "legend", 500, 350, () => {
            let  loader = new LLoader();
            loader.addEventListener(LEvent.COMPLETE, event => {
                let bitmapdata = new LBitmapData(loader.content);
                let backLayer = new LSprite();
                addChild(backLayer);
                backLayer.graphics.beginBitmapFill(bitmapdata);
                backLayer.graphics.drawVertices(1,'#000000',
                    [[120,50],[100,200],[200,150]]);
            });
            loader.load('show.jpg', "bitmapData");
        });
    </script>

```

### 4. Ť��Ƭ��

- `LGraphics`�����`beginBitmapFill`��`drawTriangles`

- `drawTraingles(vertices,indices,uvtData,thickness,color)`
  - `vertices`�����ֹ��ɵ�ʸ��`(x,y)`��ÿ�����������
  - `indices`���������������ɵ�ʸ��������������
  - `uvtData`������ӳ��ı�׼���깹�ɵ�ʸ����ÿ���������������ͼƬ�ı�����λ��

```html
<div id="legend">Loading...</div>
    <script>
        let vertices = new Array();
        vertices.push(0,0);
        vertices.push(0,120);
        vertices.push(0,240);
        vertices.push(120,0);
        vertices.push(120,120);
        vertices.push(120,240);
        vertices.push(240,0);
        vertices.push(240,120);
        vertices.push(240,240);

        let indices = new Array();
        indices.push(0,3,1);
        indices.push(3,1,4);
        indices.push(1,4,2);
        indices.push(4,2,5);
        indices.push(3,6,4);
        indices.push(6,4,7);
        indices.push(4,7,5);
        indices.push(7,5,8);

        let uvtData = new Array();
        uvtData.push(0,0);
        uvtData.push(0,0.5);
        uvtData.push(0,1);
        uvtData.push(0.5,0);
        uvtData.push(0.5,0.5);
        uvtData.push(0.5,1);
        uvtData.push(1,0);
        uvtData.push(1,0.5);
        uvtData.push(1,1);

        init(50, "legend", 500, 350, () => {
            let  loader = new LLoader();
            loader.addEventListener(LEvent.COMPLETE, event => {
                let bitmapdata = new LBitmapData(loader.content);
                let backLayer = new LSprite();
                backLayer.x = 100;
                addChild(backLayer);
                backLayer.graphics.beginBitmapFill(bitmapdata);
                backLayer.graphics.drawTriangles(vertices,indices,uvtData);
            });
            loader.load('show.jpg', "bitmapData");
        });
    </script>
```

![52-traingles][52]

## �ı�

### 1. �ı�����

- �������ı�����󲻻��Զ�������ӻ������б���
- `addChild()`

```html
    <div id="legend">Loading...</div>
    <script>

        init(50, "legend", 500, 350, () => {
            let layer = new LSprite();
            addChild(layer);
            
            let field = new LTextField();
            field.text = 'Hello World';
            field.x = 50;
            field.y = 50;
            field.size = 25;
            field.color = '#333333';
            field.weight = "bolder";
            layer.addChild(field);
            
        });
    </script>
```

### 2. �����

- `LTextField`���ı���������
- `field.setType(LTextFieldType.INPUT)`

```html
    <div id="legend">Loading...</div>
    <script>

        init(50, "legend", 500, 350, () => {
            let layer = new LSprite();
            addChild(layer);
            
            let field = new LTextField();

            field.x = 50;
            field.y = 50;
            field.setType(LTextFieldType.INPUT);

            layer.addChild(field);

        });
    </script>
```

![53-text][53]

## �¼�

- ʹ��`addEventListener`����Ϊ�����¼��������

### 1. ����¼�

- `LMouseEvent.MOUSE_DOWN`������
- `LMouseEvent.MOUSE_UP`������
- `LMouseEvent.MOUSE_MOVE`���ƶ�

- ���ֻ��Ϸֱ��Ӧ��`TOUCH_START,TOUCH_END,TOUCH_MOVE`
- ����`lufylegend`�У�����Ҫ�ֱ棬���Զ�ת��

```html
    <div id="legend">Loading...</div>
    <script>

        init(50, "legend", 500, 350, () => {
            let layer = new LSprite();
            layer.graphics.drawRect(1,'#cccccc',[0,0,300,300],true,'#cccccc');
            addChild(layer);
            
            let field = new LTextField();
            field.text = 'Wait';
            field.x = 50;
            field.y = 50;
            
            layer.addChild(field);

            layer.addEventListener(LMouseEvent.MOUSE_DOWN, event => {
                field.text = 'Down';
            });

            layer.addEventListener(LMouseEvent.MOUSE_UP, event => {
                field.text = 'up';
            });

        });
    </script>
```





### 2. ѭ���¼�

- �ظ�ִ��ĳ�δ��룬��Ҫ�õ�ѭ���¼�������
- ѭ����������ظ��ع㲥ĳ�¼�
- `LEvent.ENTER_FRAME`���������ѭ���¼�

```html
    <div id="legend">Loading...</div>
    <script>

        init(50, "legend", 500, 350, () => {
            let layer = new LSprite();
            layer.graphics.drawRect(1,'#cccccc',[0,0,300,300],true,'#cccccc');
            addChild(layer);
            
            let field = new LTextField();
            field.text = '0';
            field.x = 50;
            field.y = 50;
            
            layer.addChild(field);

            layer.addEventListener(LEvent.ENTER_FRAME, event => {
                field.text = parseInt(field.text) + 1;
            });

        });
    </script>
```

### 3. �����¼�

- `LKeyboardEvent.KEY_DOWN, LKeyboardEvent.KEY_UP, LKeyboardEvent.KEY_PRESS`
- �����¼���Ҫ���ص�`window`��
- `LEvent.addEventListener`�����ؼ����¼�
- `LGlobal.window`�����ص�`window`�����ϣ������������������
- `event.keyCode`�����¼���ֵ����������ж���Ϸ�İ���

```html
    <div id="legend">Loading...</div>
    <script>

        init(50, "legend", 500, 350, () => {
            let layer = new LSprite();
            layer.graphics.drawRect(1,'#cccccc',[0,0,300,300],true,'#cccccc');
            addChild(layer);
            
            let field = new LTextField();
            field.text = 'click';
            field.x = 50;
            field.y = 50;
            
            layer.addChild(field);

            LEvent.addEventListener(LGlobal.window,
                LKeyboardEvent.KEY_DOWN, event => {
                field.text = event.keyCode + 'down';
            });

            LEvent.addEventListener(LGlobal.window,LKeyboardEvent.KEY_UP, event => {
                field.text = event.keyCode + 'up';
            });
        });
    </script>
```

## ��ť

- ����Ϸ����������`LButton`��Ӱ�ť
- `LButton(DisplayObject_up, DisplayObject_over)`
  - `DisplayObject_up`����ťĬ��`up`״̬������뿪��״̬
  - `DisplayObject_over`��������ƶ�����ť�ϵ�״̬
- ���밴ť��������״̬���󣬿�����`LSprite`��`LBitmap`

```html
    <div id="legend">Loading...</div>
    <script>

        init(50, "legend", 500, 350, () => {
            let loader = new LLoader();
            loader.addEventListener(LEvent.COMPLETE, event => {
                let bitmapup = new LBitmap(new LBitmapData(loader.content));
                loader = new LLoader();
                loader.addEventListener(LEvent.COMPLETE, () => {
                    let bitmapover = new LBitmap(new LBitmapData(loader.content));
                    let layer = new LSprite();
                    addChild(layer);

                    let field = new LTextField();
                    field.text = 'click';
                    layer.addChild(field);

                    let button = new LButton(bitmapup, bitmapover);
                    button.y = 50;
                    layer.addChild(button);
                    button.addEventListener(LMouseEvent.MOUSE_DOWN, event => {
                        field.text = "button click";
                    });
                });
                loader.load("show.jpg", "bitmapData");
            });
            loader.load("show.jpg", "bitmapData",20,20);
            
        });
    </script>
```

## ����

- ��������Ϸ���������ɲ���
- ����`LAnimation`���ѭ��ʱ�䣬��������ʵ��һ�鶯���Ĳ���
- ׼��һ����Ƭ����������Ķ���

![54-animation][54]

- `LAnimation(layer,data,list)`
  - `layer`��`LSprite`����
  - `data`��`LBitmapData`����
  - `list`���洢����Ķ�ά����
- ����ͨ��`LGlobal.divideCoordinate(width,height,row,col)`
  - `width,height`������
  - `row,col`������������
  - �˺����Ὣ����Ŀ�߰����������������в�ּ��㣬�Ӷ��õ���ά����
  - ����ͼƬΪ`256x256`����ִ���`LGlobal.divideCoordinate(256,256,4,4)`

```html
    <div id="legend">Loading...</div>
    <script>

        init(50, "legend", 500, 350, () => {
            let loader = new LLoader();
            loader.addEventListener(LEvent.COMPLETE, event => {
                let bitmapdata = new LBitmapData(loader.content, 0,0,64,64);
                let list = LGlobal.divideCoordinate(287,287,4,4)
                
                let layer = new LSprite();
                addChild(layer);

                let anime = new LAnimation(layer, bitmapdata, list);
                layer.addEventListener(LEvent.ENTER_FRAME, () => {
                    anime.onframe();
                });
            });
            loader.load("animation.png", "bitmapData");
            
        });
    </script>
```

![55-animation][55]

���뽲�⣺

- ���ﶯ��������ʵ�ǽ���һ��ͼƬ���ѭ������

- `LAnimation`���`onframe()`���������ŵ�ͼƬ�кż�1����ѭ���¼��в��ţ��ͳ��˶���

- Ҫʵ�����е�ͼƬѭ�����ţ���Ҫ�õ�`setAction`

- `setAction(rowIndex, colIndex)`�����Ըı�ͼƬ���кź��к�
  - `rowIndex`�������к�
  - `colIndex`�������к�

```html
    <div id="legend">Loading...</div>
    <script>

        init(50, "legend", 500, 350, () => {
            let loader = new LLoader();
            loader.addEventListener(LEvent.COMPLETE, event => {
                let bitmapdata = new LBitmapData(loader.content, 0,0,64,64);
                let list = LGlobal.divideCoordinate(287,287,4,4)
                
                let layer = new LSprite();
                addChild(layer);

                let anime = new LAnimation(layer, bitmapdata, list);
                layer.addEventListener(LEvent.ENTER_FRAME, () => {
                    let action = anime.getAction();
                    switch(action[0]) {
                        case 0:
                            layer.y += 5;
                            if(layer.y >= 200)  anime.setAction(2);
                            break;
                        case 1:
                            layer.x -= 5;
                            if(layer.x <= 0)    anime.setAction(0);
                            break;
                        case 2:
                            layer.x += 5;
                            if(layer.x >= 200)  anime.setAction(3);
                            break;
                        case 3:
                            layer.y -= 5;
                            if(layer.y <= 0)    anime.setAction(1);
                            break;
                    }
                    anime.onframe();
                });
            });
            loader.load("animation.png", "bitmapData");
            
        });
    </script>
```

![56-animation][56]

���뽲�⣺

- `getAction`ȡ�õ�ǰ���Ŷ������кź��кţ������Ǹ�����
- $[1,2,3,4]$�ֱ������"�£����ң���"4������Ȼ���ƶ������ݵ����λ�øı��ƶ�����
- `layer.y += 5`��������ͼ���ƶ��Ľ���Ͳ���
- `layer.y >= 350 - 287/2`����������ƶ��Ŀռ䣬���ʽ��:

$$
canvas�߶� - \frac{����ͼ�ĸ߶�}{�ֳɵ�����} \times ����ͼ��canvas��ʾ�ĸ߶� \times 2
$$



***

# ����ʵս

## ʯͷ���Ӳ�

### ��Ϸ����

��Ϸ��Ҫ�Ķ�����

1. ͼƬ�軭
2. ͼ�λ���
3. ���ֻ���
4. ���ĵ��
5. ����`AI`
6. ������֧���ж�

### ��Ҫ��`JS`֪ʶ

- �����
- ������֧
- `canvas`�������ı���ͼ���л�
- `lufylegend`��������÷ֲ�

## �ֲ�ʵ��

1. ������Ϸ����
2. ��ȭ����
3. �����ʾ����

## ����ʵ��

### 1.��������

```html
    <div id="legend"></div>
    <script>
        let backLayer;
        init(50,"legend", 800, 400, () =>{
            backLayer = new LSprite();
            addChild(backLayer);
            // ��Ϸ����
            backLayer.graphics.drawRect(10, '#008800',
                [0,0,LGlobal.width,LGlobal.height],
                true,
                '#000000');
            
            // �����ʾ���ʼ��
            initResultLayer();
            // �������ʼ��
            initClickLayer();
        });

        function initResultLayer() {
            let resultLayer = new LSprite();
            resultLayer.graphics.drawRect(4,'#ff8800',
                [0,0,150,110],
                true,
                '#ffffff');
                resultLayer.x = 10;
                resultLayer.y = 100;

                backLayer.addChild(resultLayer);
        }
        function initClickLayer() {
            let clickLayer = new LSprite();
            clickLayer.graphics.drawRect(4,'#ff8800',
                [0,0,300,110],
                true,
                '#ffffff');
                clickLayer.x = 250;
                clickLayer.y = 275;
                backLayer.addChild(clickLayer);
        }
    </script>
```

![57-game-1][57]

#### �������

1. ��3����ʾ�㣺���������������
2. `LGlobal.width,LGlobal.height`��`canvas`�Ŀ���

### 2. ��ȭ����

- ׼���ز�

![58-hand][58]

![59-clip][59]

![60-ham][60]

- ͼƬ��ȡ������`LLoadManage.load(lits,onupdate,oncoplete)`
  - `list`��ͼƬ���飬��ʽ����Ϊ�涨��ʽ
  - `onupdate`��ÿ��ȡ������һ��ͼƬ����õĺ���
  - `oncomplete`����ȡ�����к���õĺ���

```html
    <div id="legend"></div>
    <script>
        let backLayer;
        init(50,"legend", 800, 400, () =>{
            backLayer = new LSprite();
            addChild(backLayer);
            // loading����
            let loadingLayer = new LoadingSample3();

            backLayer.addChild(loadingLayer);

            // imglist
            let imgList = {};
            let imgData = new Array(
                {name: "title", path: "./show.jpg"},
                {name: "hand", path: "./58-hand.png"},
                {name: "hand", path: "./59-clip.png"},
                {name: "hand", path: "./60-ham.png"},
                );
            // manage
            LLoadManage.load(
                imgData,
                progress => {
                    loadingLayer.setProgress(progress);
                },
                result => {
                    imgList = result;
                    backLayer.removeChild(loadingLayer);
                    loadingLayer = null;

                    backLayer.graphics.drawRect(10, '#008800',
                        [0,0,LGlobal.width,LGlobal.height],
                        true,
                        '#000000');
                    initResultLayer();
                    initClickLayer();
                }
            );
            
        });

        function initResultLayer() {
            let resultLayer = new LSprite();
            resultLayer.graphics.drawRect(4,'#ff8800',
                [0,0,150,110],
                true,
                '#ffffff');
                resultLayer.x = 10;
                resultLayer.y = 100;

                backLayer.addChild(resultLayer);
        }
        function initClickLayer() {
            let clickLayer = new LSprite();
            clickLayer.graphics.drawRect(4,'#ff8800',
                [0,0,300,110],
                true,
                '#ffffff');
                clickLayer.x = 250;
                clickLayer.y = 275;
                backLayer.addChild(clickLayer);
        }
    </script>
```

![61-loading][61]

- ���뷴˼����Ȼ����д�Ǻܺ��ã����������̫ǿ����Ҫ���Ǹ��ھ۵���ϣ���������ģ��

```js
init(50,"legend", 800, 400, main);
// imglist
let imgList = {},
        backLayer;
let imgData = new Array(
        {name: "title", path: "./show.jpg"},
        {name: "hand", path: "./58-hand.png"},
        {name: "clip", path: "./59-clip.png"},
        {name: "ham", path: "./60-ham.png"},
        );
    
function main() {
    backLayer = new LSprite();
    addChild(backLayer);
    // loading����
    let loadingLayer = new LoadingSample3();

    backLayer.addChild(loadingLayer);
    // manage
    LLoadManage.load(
        imgData,
        progress => {
            loadingLayer.setProgress(progress);
        },
        result => {
            imgList = result;
            backLayer.removeChild(loadingLayer);
            loadingLayer = null;
            gameInit();
        }
    );
}

function gameInit() {
    backLayer.graphics.drawRect(10, '#008800',
                [0,0,LGlobal.width,LGlobal.height],
                true,
                '#000000');
    initResultLayer();
    initClickLayer();

}

function initResultLayer() {
    let resultLayer = new LSprite();
    resultLayer.graphics.drawRect(4,'#ff8800',
        [0,0,150,110],
        true,
        '#ffffff');
        resultLayer.x = 10;
        resultLayer.y = 100;

        backLayer.addChild(resultLayer);
}
function initClickLayer() {
    let clickLayer = new LSprite();
    clickLayer.graphics.drawRect(4,'#ff8800',
        [0,0,300,110],
        true,
        '#ffffff');
        clickLayer.x = 250;
        clickLayer.y = 275;
        backLayer.addChild(clickLayer);
}
```
- `imgData`�а�������ͼƬ��·��`{name:"x",path:"y"}`
- ���ؽ�������`loadingLayer = new LoadingSample3();backLayer.addChild(loadingLayer)`
- `lufylegend`��һ����3����������ʾ����`LoadingSample1,LoadingSample2,LoadingSample3`
- `LLoadManage.load()`���þ�̬��`LLoadManage`��`load`����ȥ��ȡ�����е�ͼƬ
- `loadingLayer.setProgress(progress)`����ȡͼƬ����ռͼƬ���鳤�ȵı��������������ͨ��`setProgress`���ݣ�ʵ�ֶ�̬�Ľ�����
- ��ȡ��ͼƬ��Ľ������ֵ��`imglist`��Ȼ��һ�������ϵĽ����������ٵ���`gameInit`������һ��

```html
<div id="legend"></div>
<script>

init(50,"legend", 800, 400, main);
// imglist
let imgList = {},
        backLayer,
        showList = new Array();
let imgData = new Array(
        {name: "title", path: "./show.jpg"},
        {name: "hand", path: "./58-hand.png"},
        {name: "clip", path: "./59-clip.png"},
        {name: "ham", path: "./60-ham.png"},
        );
    
function main() {
    backLayer = new LSprite();
    addChild(backLayer);
    // loading����
    let loadingLayer = new LoadingSample3();

    backLayer.addChild(loadingLayer);
    // manage
    LLoadManage.load(
        imgData,
        progress => {
            loadingLayer.setProgress(progress);
        },
        result => {
            imgList = result;
            backLayer.removeChild(loadingLayer);
            loadingLayer = null;
            gameInit();
        }
    );
}

function gameInit() {
    // console.log(imgList);
    showList.push(new LBitmapData(imgList["ham"]));
    showList.push(new LBitmapData(imgList["clip"]));
    showList.push(new LBitmapData(imgList["hand"]));
    // console.log(showList[0].image);
    // console.log(showList[0] == imgList["ham"]);
    // ��Ϸ����
    backLayer.graphics.drawRect(10, '#008800',
                [0,0,LGlobal.width,LGlobal.height],
                true,
                '#000000');

    // ��ʾ��Ϸ����
    let titleBitmap = new LBitmap(new LBitmapData(imgList["title"],20,20,50,50));
    // (ȫ��-ͼ�ĳ���)/2 = �е�
    titleBitmap.x = (LGlobal.width - titleBitmap.width) / 2;
    titleBitmap.y = 10;
    // �ӵ���������
    backLayer.addChild(titleBitmap);

    // ���
    selfBitmap = new LBitmap(new LBitmapData(showList[0].image));
    selfBitmap.x = 400 - selfBitmap.width - 50;
    selfBitmap.y = 130;
    backLayer.addChild(selfBitmap);

    // ����
    computerBitmap = new LBitmap(new LBitmapData(showList[0].image));
    computerBitmap.x = 400 + 50;
    computerBitmap.y = 130;
    backLayer.addChild(computerBitmap);

    // ��ң����������趨
    let nameText;
    nameText = new LTextField();
    nameText.text = 'Player';
    nameText.weight = 'bolder';
    nameText.color = '#ffffff';
    nameText.size = 24;
    nameText.x = selfBitmap.x + 
        (selfBitmap.width - nameText.getWidth()) / 2;
    nameText.y = 95;
    backLayer.addChild(nameText);

    nameText = new LTextField();
    nameText.text = 'computer';
    nameText.weight = 'bolder';
    nameText.color = '#ffffff';
    nameText.size = 24;
    nameText.x = computerBitmap.x + 
        (computerBitmap.width - nameText.getWidth())/2;
    nameText.y = 95;
    backLayer.addChild(nameText);


    initResultLayer();
    initClickLayer();
}

function initResultLayer() {
    let resultLayer = new LSprite();
    resultLayer.graphics.drawRect(4,'#ff8800',
        [0,0,150,110],
        true,
        '#ffffff');
        resultLayer.x = 10;
        resultLayer.y = 100;

        backLayer.addChild(resultLayer);
}
function initClickLayer() {
    let clickLayer = new LSprite();
    clickLayer.graphics.drawRect(4,'#ff8800',
        [0,0,300,110],
        true,
        '#ffffff');
        clickLayer.x = 250;
        clickLayer.y = 275;
        backLayer.addChild(clickLayer);
}
</script>
```

![62-gameText.png][62]

### 3. �������ʾ

- ��`win,loss,equal`��ʾ����Ĵ���

```html
<div id="legend"></div>
<script>

init(50,"legend", 800, 400, main);
// imglist
let imgList = {},
        backLayer,
        showList = new Array();
let imgData = new Array(
        {name: "title", path: "./show.jpg"},
        {name: "hand", path: "./58-hand.png"},
        {name: "clip", path: "./59-clip.png"},
        {name: "ham", path: "./60-ham.png"},
        );
    
function main() {
    backLayer = new LSprite();
    addChild(backLayer);
    // loading����
    let loadingLayer = new LoadingSample3();

    backLayer.addChild(loadingLayer);
    // manage
    LLoadManage.load(
        imgData,
        progress => {
            loadingLayer.setProgress(progress);
        },
        result => {
            imgList = result;
            backLayer.removeChild(loadingLayer);
            loadingLayer = null;
            gameInit();
        }
    );
}

function gameInit() {
    // console.log(imgList);
    showList.push(new LBitmapData(imgList["ham"]));
    showList.push(new LBitmapData(imgList["clip"]));
    showList.push(new LBitmapData(imgList["hand"]));
    // console.log(showList[0].image);
    // console.log(showList[0] == imgList["ham"]);
    // ��Ϸ����
    backLayer.graphics.drawRect(10, '#008800',
                [0,0,LGlobal.width,LGlobal.height],
                true,
                '#000000');

    // ��ʾ��Ϸ����
    let titleBitmap = new LBitmap(new LBitmapData(imgList["title"],20,20,50,50));
    // (ȫ��-ͼ�ĳ���)/2 = �е�
    titleBitmap.x = (LGlobal.width - titleBitmap.width) / 2;
    titleBitmap.y = 10;
    // �ӵ���������
    backLayer.addChild(titleBitmap);

    // ���
    selfBitmap = new LBitmap(new LBitmapData(showList[0].image));
    selfBitmap.x = 400 - selfBitmap.width - 50;
    selfBitmap.y = 130;
    backLayer.addChild(selfBitmap);

    // ����
    computerBitmap = new LBitmap(new LBitmapData(showList[0].image));
    computerBitmap.x = 400 + 50;
    computerBitmap.y = 130;
    backLayer.addChild(computerBitmap);

    // ��ң����������趨
    let nameText;
    nameText = new LTextField();
    nameText.text = 'Player';
    nameText.weight = 'bolder';
    nameText.color = '#ffffff';
    nameText.size = 24;
    nameText.x = selfBitmap.x + 
        (selfBitmap.width - nameText.getWidth()) / 2;
    nameText.y = 95;
    backLayer.addChild(nameText);

    nameText = new LTextField();
    nameText.text = 'computer';
    nameText.weight = 'bolder';
    nameText.color = '#ffffff';
    nameText.size = 24;
    nameText.x = computerBitmap.x + 
        (computerBitmap.width - nameText.getWidth())/2;
    nameText.y = 95;
    backLayer.addChild(nameText);


    initResultLayer();
    initClickLayer();
}

function initResultLayer() {
    let resultLayer = new LSprite();
    resultLayer.graphics.drawRect(4,'#ff8800',
        [0,0,150,110],
        true,
        '#ffffff');
        resultLayer.x = 10;
        resultLayer.y = 100;

        backLayer.addChild(resultLayer);

        let selfText = new LTextField();
        selfText.text = '��ȭ����: 0';
        selfText.weight = 'bolder';
        selfText.x = 10;
        selfText.y = 20;
        resultLayer.addChild(selfText);
        
        let win = new LTextField();
        win.text = 'win: 0';
        win.weight = 'bolder';
        win.x = 10;
        win.y = 40;
        resultLayer.addChild(win);

        let loss = new LTextField();
        loss.text = 'loss: 0';
        loss.weight = 'bolder';
        loss.x = 10;
        loss.y = 60;
        resultLayer.addChild(loss);

        let equal = new LTextField();
        equal.text = 'equal: 0';
        equal.weight = "bolder";
        equal.x = 10;
        equal.y = 80;
        resultLayer.addChild(equal);
}
function initClickLayer() {
    let clickLayer = new LSprite();
    clickLayer.graphics.drawRect(4,'#ff8800',
        [0,0,300,110],
        true,
        '#ffffff');
        clickLayer.x = 250;
        clickLayer.y = 275;
        backLayer.addChild(clickLayer);
}
```

### 4. ���Ʋ�

- ����滻��ť
- `LButton(up,down)`

```html
<div id="legend"></div>
<script>

init(50,"legend", 800, 400, main);
// imglist
let imgList = {},
        backLayer,
        showList = new Array();
let imgData = new Array(
        {name: "title", path: "./show.jpg"},
        {name: "hand", path: "./58-hand.png"},
        {name: "clip", path: "./59-clip.png"},
        {name: "ham", path: "./60-ham.png"},
        );
    
function main() {
    backLayer = new LSprite();
    addChild(backLayer);
    // loading����
    let loadingLayer = new LoadingSample3();

    backLayer.addChild(loadingLayer);
    // manage
    LLoadManage.load(
        imgData,
        progress => {
            loadingLayer.setProgress(progress);
        },
        result => {
            imgList = result;
            backLayer.removeChild(loadingLayer);
            loadingLayer = null;
            gameInit();
        }
    );
}

function gameInit() {
    // console.log(imgList);
    showList.push(new LBitmapData(imgList["ham"]));
    showList.push(new LBitmapData(imgList["clip"]));
    showList.push(new LBitmapData(imgList["hand"]));
    // console.log(showList[0].image);
    // console.log(showList[0] == imgList["ham"]);
    // ��Ϸ����
    backLayer.graphics.drawRect(10, '#008800',
                [0,0,LGlobal.width,LGlobal.height],
                true,
                '#000000');

    // ��ʾ��Ϸ����
    let titleBitmap = new LBitmap(new LBitmapData(imgList["title"],20,20,50,50));
    // (ȫ��-ͼ�ĳ���)/2 = �е�
    titleBitmap.x = (LGlobal.width - titleBitmap.width) / 2;
    titleBitmap.y = 10;
    // �ӵ���������
    backLayer.addChild(titleBitmap);

    // ���
    selfBitmap = new LBitmap(new LBitmapData(showList[0].image));
    selfBitmap.x = 400 - selfBitmap.width - 50;
    selfBitmap.y = 130;
    backLayer.addChild(selfBitmap);

    // ����
    computerBitmap = new LBitmap(new LBitmapData(showList[0].image));
    computerBitmap.x = 400 + 50;
    computerBitmap.y = 130;
    backLayer.addChild(computerBitmap);

    // ��ң����������趨
    let nameText;
    nameText = new LTextField();
    nameText.text = 'Player';
    nameText.weight = 'bolder';
    nameText.color = '#ffffff';
    nameText.size = 24;
    nameText.x = selfBitmap.x + 
        (selfBitmap.width - nameText.getWidth()) / 2;
    nameText.y = 95;
    backLayer.addChild(nameText);

    nameText = new LTextField();
    nameText.text = 'computer';
    nameText.weight = 'bolder';
    nameText.color = '#ffffff';
    nameText.size = 24;
    nameText.x = computerBitmap.x + 
        (computerBitmap.width - nameText.getWidth())/2;
    nameText.y = 95;
    backLayer.addChild(nameText);


    initResultLayer();
    initClickLayer();
}

function initResultLayer() {
    let resultLayer = new LSprite();
    resultLayer.graphics.drawRect(4,'#ff8800',
        [0,0,150,110],
        true,
        '#ffffff');
        resultLayer.x = 10;
        resultLayer.y = 100;

        backLayer.addChild(resultLayer);

        let selfText = new LTextField();
        selfText.text = '��ȭ����: 0';
        selfText.weight = 'bolder';
        selfText.x = 10;
        selfText.y = 20;
        resultLayer.addChild(selfText);
        
        let win = new LTextField();
        win.text = 'win: 0';
        win.weight = 'bolder';
        win.x = 10;
        win.y = 40;
        resultLayer.addChild(win);

        let loss = new LTextField();
        loss.text = 'loss: 0';
        loss.weight = 'bolder';
        loss.x = 10;
        loss.y = 60;
        resultLayer.addChild(loss);

        let equal = new LTextField();
        equal.text = 'equal: 0';
        equal.weight = "bolder";
        equal.x = 10;
        equal.y = 80;
        resultLayer.addChild(equal);
}
function initClickLayer() {
    let clickLayer = new LSprite();
    clickLayer.graphics.drawRect(4,'#ff8800',
        [0,0,300,110],
        true,
        '#ffffff');

        let msgText = new LTextField();
        msgText.text = "���ȭ��";
        msgText.weight = 'bolder';
        msgText.x = 10;
        msgText.y = 10;

        clickLayer.addChild(msgText);

        let btnHam = getButton('ham');
        btnHam.x = 30;
        btnHam.y = 35;
        clickLayer.addChild(btnHam);

        let btnClip = getButton('clip');
        btnClip.x = 115;
        btnClip.y = 35;
        clickLayer.addChild(btnClip);

        let btnHand = getButton('hand');
        btnHand.x = 200;
        btnHand.y = 35;
        clickLayer.addChild(btnHand);

        clickLayer.x = 250;
        clickLayer.y = 275;
        backLayer.addChild(clickLayer);
}

function getButton(value){
    let btnUp = new LBitmap(new LBitmapData(imgList[value]));
    btnUp.scaleX = 0.5;
    btnUp.scaleY = 0.5;

    let btnOver = new LBitmap(new LBitmapData(imgList[value]));
    btnOver.scaleX = 0.5;
    btnOver.scaleY = 0.5;
    btnOver.x = 2;
    btnOver.y = 2;

    let btn = new LButton(btnUp, btnOver);
    btn.name = value;
    return btn;
}
</script>
```

### 5. ��ȭ

- �����������`Math.floor(Math.random() * 3)`�Ի����˽��и�ֵ

### 6. ����ж�

�����ж����飺

![63-judge.png][63]

```js
let checkList = [
    [0,1,-1],
    [-1,0,1],
    [1,-1,0]
];
```

### 7. ��Ϸ�������

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="./lufylegend-1.10.1.js"></script>
</head>
<body>
<div id="legend"></div>
<script>

init(50,"legend", 800, 400, main);
// imglist
let imgList = {},
        backLayer,
        showList = new Array(),
        selfBitmap,
        computerBitmap,
        win,
        loss,
        equal,
        selfText,        
        lossCount = 0,
        winCount = 0,
        equalCount = 0;
let imgData = new Array(
        {name: "title", path: "./show.jpg"},
        {name: "hand", path: "./58-hand.png"},
        {name: "clip", path: "./59-clip.png"},
        {name: "ham", path: "./60-ham.png"},
        );
let checkList = [
    [0,1,-1],
    [-1,0,1],
    [1,-1,0]
];

function main() {
    backLayer = new LSprite();
    addChild(backLayer);
    // loading����
    let loadingLayer = new LoadingSample3();

    backLayer.addChild(loadingLayer);
    // manage
    LLoadManage.load(
        imgData,
        progress => {
            loadingLayer.setProgress(progress);
        },
        result => {
            imgList = result;
            backLayer.removeChild(loadingLayer);
            loadingLayer = null;
            gameInit();
        }
    );
}

function gameInit() {
    // console.log(imgList);
    showList.push(new LBitmapData(imgList["ham"]));
    showList.push(new LBitmapData(imgList["clip"]));
    showList.push(new LBitmapData(imgList["hand"]));
    // console.log(showList[0].image);
    // console.log(showList[0] == imgList["ham"]);
    // ��Ϸ����
    backLayer.graphics.drawRect(10, '#008800',
                [0,0,LGlobal.width,LGlobal.height],
                true,
                '#000000');

    // ��ʾ��Ϸ����
    let titleBitmap = new LBitmap(new LBitmapData(imgList["title"],20,20,50,50));
    // (ȫ��-ͼ�ĳ���)/2 = �е�
    titleBitmap.x = (LGlobal.width - titleBitmap.width) / 2;
    titleBitmap.y = 10;
    // �ӵ���������
    backLayer.addChild(titleBitmap);

    // ���
    selfBitmap = new LBitmap(new LBitmapData(showList[0].image));
    selfBitmap.x = 400 - selfBitmap.width - 50;
    selfBitmap.y = 130;
    backLayer.addChild(selfBitmap);

    // ����
    computerBitmap = new LBitmap(new LBitmapData(showList[0].image));
    computerBitmap.x = 400 + 50;
    computerBitmap.y = 130;
    backLayer.addChild(computerBitmap);

    // ��ң����������趨
    let nameText;
    nameText = new LTextField();
    nameText.text = 'Player';
    nameText.weight = 'bolder';
    nameText.color = '#ffffff';
    nameText.size = 24;
    nameText.x = selfBitmap.x + 
        (selfBitmap.width - nameText.getWidth()) / 2;
    nameText.y = 95;
    backLayer.addChild(nameText);

    nameText = new LTextField();
    nameText.text = 'computer';
    nameText.weight = 'bolder';
    nameText.color = '#ffffff';
    nameText.size = 24;
    nameText.x = computerBitmap.x + 
        (computerBitmap.width - nameText.getWidth())/2;
    nameText.y = 95;
    backLayer.addChild(nameText);


    initResultLayer();
    initClickLayer();
}

function initResultLayer() {
    let resultLayer = new LSprite();
    resultLayer.graphics.drawRect(4,'#ff8800',
        [0,0,150,110],
        true,
        '#ffffff');
        resultLayer.x = 10;
        resultLayer.y = 100;

        backLayer.addChild(resultLayer);

        selfText = new LTextField();
        selfText.text = '��ȭ����: 0';
        selfText.weight = 'bolder';
        selfText.x = 10;
        selfText.y = 20;
        resultLayer.addChild(selfText);
        
        win = new LTextField();
        win.text = 'win: 0';
        win.weight = 'bolder';
        win.x = 10;
        win.y = 40;
        resultLayer.addChild(win);

        loss = new LTextField();
        loss.text = 'loss: 0';
        loss.weight = 'bolder';
        loss.x = 10;
        loss.y = 60;
        resultLayer.addChild(loss);

        equal = new LTextField();
        equal.text = 'equal: 0';
        equal.weight = "bolder";
        equal.x = 10;
        equal.y = 80;
        resultLayer.addChild(equal);
}
function initClickLayer() {
    let clickLayer = new LSprite();
    clickLayer.graphics.drawRect(4,'#ff8800',
        [0,0,300,110],
        true,
        '#ffffff');

        let msgText = new LTextField();
        msgText.text = "���ȭ��";
        msgText.weight = 'bolder';
        msgText.x = 10;
        msgText.y = 10;

        clickLayer.addChild(msgText);

        let btnHam = getButton('ham');
        btnHam.x = 30;
        btnHam.y = 35;
        clickLayer.addChild(btnHam);
        btnHam.addEventListener(LMouseEvent.MOUSE_UP, onclick);

        let btnClip = getButton('clip');
        btnClip.x = 115;
        btnClip.y = 35;
        clickLayer.addChild(btnClip);
        btnClip.addEventListener(LMouseEvent.MOUSE_UP, onclick);

        let btnHand = getButton('hand');
        btnHand.x = 200;
        btnHand.y = 35;
        clickLayer.addChild(btnHand);
        btnHand.addEventListener(LMouseEvent.MOUSE_UP, onclick);

        clickLayer.x = 250;
        clickLayer.y = 275;
        backLayer.addChild(clickLayer);
}

function getButton(value){
    let btnUp = new LBitmap(new LBitmapData(imgList[value]));
    btnUp.scaleX = 0.5;
    btnUp.scaleY = 0.5;

    let btnOver = new LBitmap(new LBitmapData(imgList[value]));
    btnOver.scaleX = 0.5;
    btnOver.scaleY = 0.5;
    btnOver.x = 2;
    btnOver.y = 2;

    let btn = new LButton(btnUp, btnOver);
    btn.name = value;
    return btn;
}

function onclick(event, display){
    let selfValue, computerValue;

    if(display.name == 'ham')   selfValue = 0;
    else if(display.name == 'clip') selfValue = 1;
    else if(display.name == 'hand') selfValue = 2;

    computerValue = Math.floor(Math.random()*3);
    console.log(computerValue);
    selfBitmap.bitmapData = showList[selfValue];
    computerBitmap.bitmapData = showList[computerValue];

    let result = checkList[selfValue][computerValue];
    if(result == -1)    lossCount += 1;
    else if(result == 1)    winCount += 1;
    else if(result == 0)    equalCount += 1;

    win.text = `win: ${winCount}`,
    loss.text = `loss: ${lossCount}`,
    equal.text = `equal: ${equalCount}`;
    selfText.text = `������ ${winCount + lossCount + equalCount}`;
}
</script>
</body>
</html>
```

![64-game1][64]

### �ܽ������

��Ϸ����˼·��

1. ������������
2. ��������Ͳ�����
3. ������ʾ��
4. ͨ�������Ӷ�ʵ�ָ���ͼƬ������¼��ֵ�����������˱Ƚϣ�������ж����
5. ��ʾ����ı�

�ܽ᣺

- �õ��ķ�������Ϊ��
  - ԭ����ͼƬ���룬���ı�����������
  - `luxylegend`���ֲ㣬`loading`�����������¼�

- ԭ�����ˮƽ�����ϵͣ�ֻ�ǵ��������Ӻ�������û�п�������ģ�飬���ҷ�����е�ȡ����

### ģ��

- <span style="colore:red">��ʱ����`addChild���⣬��Ҫ���`</span>

```javascript
class GamePlay {
    constructor(linethickness, idName, width, height){
        const checkList = [
            [0,1,-1],
            [-1,0,1],
            [1,-1,0]
        ];
        this.variable = new Map({
            [Symbol.iterator]: function*() {
                yield* [
                    [Symbol.for('imgList'), {}],
                    [Symbol.for('showList'), []],
                    [Symbol.for('imgData'), []],
                    [Symbol.for('checkList'), checkList]
                ];
            }
        });

        this.linethickness = linethickness,
        this.idName = idName,
        this.width = width,
        this.height = height;
        this.lossCount = 0,
        this.winCount = 0,
        this.equalCount = 0;

        this.backLayer = new LSprite();
        console.log(this.backLayer);
        // �˴�������ʱ�Ҳ�������ͽ���취
        this.prototype.LSprite().addChild(this.backLayer);
        this.resultLayer = new LSprite();  
        this.list = ['ham', 'clip', 'hand'];
        
    }

    setVal(id, val){
        this.variable.set(Symbol.for(id), val);
    }

    getVal(id){
        return this.variable.get(Symbol.for(id));
    }

    pushImgData(name,path){
        let imgData = Symbol.for('imgData');
        this.variable.get(imgData).push({name:name, path:path});
        return this.variable.get(imgData);
    }

    backGroundPotray(){
        init(this.linethickness, this.idName, this.width, this.height, this.load);
    }

    load(){        
        
        // loading
        let loadingLayer = new LoadingSample3();

        this.backLayer.addChild(loadingLayer);
        this.pushImgData('title','./show.jpg');
        this.pushImgData('hand','./58-hand.png');
        this.pushImgData('clip','./59-clip.png');
        this.pushImgData('ham','./60-ham.png');
        // manage
        LLoadManage.load(
            this.getVal('imgData'),
            progress => loadingLayer.setProgress(progress),
            result => {
                this.getVal('imgList').data = result;
                this.backLayer.removeChild(loadingLayer);
                loadingLayer = null;
                this.gameInit();
            });
    }

    gameInit(){
        for(let val of this.list)   this.getVal('showList').push(new LBitmapData(this.getVal('imgList').data[val]));

        // ��Ϸ����
        this.backLayer.graphics.drawRect(10, '#008800',
            [0,0,LGlobal.width,LGlobal.height],
            true,
            '#000000');

        // title
        let titleBitmap = new LBitmap(new LBitmapData(
            this.getVal('imgList').data['title'],20,20,50,50
        ));
        this.location(titleBitmap, (LGlobal.width - titleBitmap.width)/2, 10);
        
        // player
        let selfBitmap = new LBitmap(new LBitmapData(this.getVal('showList')[0].image));
        this.setVal('selfBitmap', selfBitmap);
        this.location(selfBitmap, 400 - selfBitmap.width - 50, 130);

        // computer
        let computerBitmap = new LBitmap(new LBitmapData(this.getVal('showList')[0].image));
        this.setVal('computerBitmap', computerBitmap);
        this.location(computerBitmap, 400 + 500, 130);

        // text setting
        this.textSetting('Player', 'bolder', '#ffffff', 24, 
            this.getVal('selfBitmap').x + (this.getVal('selfBitmap').width/2),
            95, this.backLayer);

        this.textSetting('computer', 'bolder', '#ffffff', 24,
            this.getVal('computerBitmap').x + this.getVal('computerBitmap').width/2,
            95, this.backLayer);

        this.initResultLayer();

    }

    initResultLayer(){
        
        this.resultLayer.graphics.drawRect(4, '#ff8800',
            [0,0,150,110],
            true,
            '#ffffff');
        this.resultLayer.x = 0;
        this.resultLayer.y = 100;

        this.backLayer.addChild(this.resultLayer);

        this.textSetting('��ȭ�Ĵ����� 0','bolder', '#000000',24,10,20, this.resultLayer);
        this.textSetting('win�� 0','bolder', '#000000',24,10,40, this.resultLayer);
        this.textSetting('loss�� 0','bolder', '#000000',24,10,60, this.resultLayer);
        this.textSetting('equal: 0','bolder', '#000000',24,10,80, this.resultLayer);
    }

    initClickLayer(){
        let clickLayer = new LSprite();

        clickLayer.graphics.drawRect(4, '#ff8800',
            [0,0,300,110],
            true,
            '#ffffff');

        this.textSetting('���ȭ','bolder', '#000000',24,10,40, clickLayer);

        this.getButton('ham', 30, 35, clickLayer, onclick);
        this.getButton('ham', 115, 35, clickLayer, onclick);
        this.getButton('ham', 200, 35, clickLayer, onclick);
    }

    location(bitmap, x, y){
        bitmap.x = x;
        bitmap.y = y;
        this.backLayer.addChild(bitmap);
    }

    textSetting(text, weight, color, size, x, y, layer){
        let nameText = new LTexField();

        nameText.text = text;
        nameText.weight = weight;
        nameText.color = color;
        nameText.sieze = size;
        nameText.x = x;
        nameText.y = y;
        layer.addChild(nameText);
    }

    getButton(value, x, y, layer, callback){
        let btnUp = new LBitmap(new LBitmapData(this.getVal('imgList').data[value]));
        btnUp.scaleX = 0.5;
        btnUp.scaleY = 0.5;

        let btnOver = new LBitmap(new LBitmapData(this.getVal('imgList').data[value]));
        btnOver.scaleX = 0.5;
        btnOver.scaleY = 0.5;
        btnOver.x = 2;
        btnOver.y = 2;
        
        let btn = new LButton(btnUp, btnOver);
        btn.name = value;
        
        btn.x = x;
        btn.y = y;
        layer.addChild(btn);

        btn.addEventListener(LMouseEvent.MOUSE_UP, callback);
    }

    onclick(event, display){
        let selfValue, computer;
        
        if(display.name == 'ham')   selfValue = 0;
        else if(display.name == 'clip') selfValue = 1;
        else if(display.name == 'hand') selfValue = 2;
    
        computerValue = Math.floor(Math.random()*3);
        console.log(computerValue);
        this.getVal('selfBitmap').bitmapData = this.getVal('showList')[selfValue];
        this.getVal('computerBitmap').bitmapData = this.getVal('showList')[computerValue];
    
        let result = checkList[selfValue][computerValue];
        if(result == -1)    this.lossCount += 1;
        else if(result == 1)    this.winCount += 1;
        else if(result == 0)    this.equalCount += 1;

        
        this.textSetting(`������ ${this.winCount + this.lossCount + this.equalCount}`,'bolder', '#000000',24,10,20, this.resultLayer);
        this.textSetting(`win: ${this.winCount}`,'bolder', '#000000',24,10,40, this.resultLayer);
        this.textSetting(`loss: ${this.lossCount}`,'bolder', '#000000',24,10,60, this.resultLayer);
        this.textSetting(`equal: ${this.equalCount}`,'bolder', '#000000',24,10,80, this.resultLayer);
    }

}

const game = new GamePlay(50, 'legend', 800, 400);
game.backGroundPotray();
```



## ����˹����

- ѭ�������¼��������¼��������¼�

### ��Ϸ����

1. ͼƬ�滭�������͵��䷽�鶼��ͼƬ��
2. ���ֻ��ơ��÷֡������������ٶȡ�
3. ѭ�������¼��������Զ����䡣
4. �����¼����Է���Ĳ�����
5. �����¼���
6. ��λ��֡�
   1. ������
   2. ��������ʾ��
   3. ������Ʋ�
   4. ����Ԥ����

### ��Ҫ֪ʶ����

- ��ά���飬�ֽо����ƶ������Ρ��ж���
- ������ά����������
  - `var matrix = new Array(new Array(0,0), new Array(1,1))`
  - `var  matrix = [[0,0],[1,1]];`
- �����ڣ���Ϸ�еĵ�ͼ������

## ��Ϸ���⻭����ʾ

- `LSprite`�����`graphics`��`LTextField`

�زģ�

![65-Teris.png][65]

- `backlayer.die()`��ȥ�����е��¼�����
- `removeAllChild()`

## �����˾���100��

### ��Ϸ����

- ͼƬ
- ���ֻ���
- ѭ�������¼�
- �����¼�
- �����¼�
- ��Ϸ��λ��֣�������ʾ���������㡢����㡢�ϰ���






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
[17]: ./img/17-2-10-customeGraphics.png "17-2-10-customeGraphics"
[18]: ./img/18-3-1-fillText.png "18-3-1-fillText"
[19]: ./img/19-3-1-fillText.png "19-3-1-fillText"
[20]: ./img/20-3-2-strokeText.png "20-3-2-strokeText"
[21]: ./img/21-3-3-MultiText.png "21-3-3-MultiText"
[22]: ./img/22-3-4-font.png "22-3-4-font"
[23]: ./img/23-3-5-align.png "23-3-5-align.png"
[24]: ./img/24-3-5-align-2.png "24-3-5-align-2"
[25]: ./img/25-drawImageshow.png "25-drawImageshow"
[26]: ./img/26-getImageData.png "26-getImageData"
[27]: ./img/27-scale.png "27-scale"
[28]: ./img/28-rescale.png "28-rescale"
[29]: ./img/29-translate.png "29-translate"
[30]: ./img/30-rotate.png "30-rotate"
[31]:./img/31-tilt.png "31-tilt"
[32]:./img/32-special.png "32-special"
[33]: ./img/33-tiltprinciple.png "33-tiltprinciple"
[34]:./img/34-tiltprinciple2.png "34-tiltprinciple2"
[35]: ./img/35-halftilt.png "35-halftilt.png"
[36]: ./img/36-gradient.png "36-gradient.png"
[37]: ./img/37-radial.png "37-radial.png"
[38]:./img/38-detail.png "38-detail"
[39]: ./img/39-globalComposite.png "39-globalComposite.png"
[40]: ./img/40-reverse.png "40-reverse.png"
[41]: ./img/41-gray.png "41-gray"
[42]: ./img/42-shadow.png "42-shadow"
[43]: ./img/43-blackBoard.png "43-blackBoard"
[44]:./img/44-board.png "44-board"
[45]:./img/45-export.png "45-export"
[46]: ./img/46-lufylegend.png "46-lufylegend"
[47]: ./img/47-LBitmapData.png "47-LBitmapData"
[48]:./img/48-LBitmap.png "48-LBitmap"
[49]:./img/49-graphics.png "49-graphics"
[50]:./img/50-LSpriteArc.png "50-LSpriteArc"
[51]: ./img/51-Lsprite.png "51-Lsprite"
[52]: ./img/52-traingles.png "52-traingles"
[53]:./img/53-text.png "53-text"
[54]: ./img/animation.png "animation"
[55]:./img/55-animation.gif "55-animation"
[56]:./img/56-animation.gif "56-animation"

[57]:./img/57-game-1.png "57-game-1"
[58]:./img/58-hand.png "58-hand"
[59]:./img/59-clip.png "59-clip"
[60]:./img/60-ham.png "60-ham"
[61]:./img/61-loading.gif "61-loading"

[62]:./img/62-gameText.png "62-gameText.png"
[63]:./img/63-judge.png "63-judge"
[64]:./img/64-game1.png "64-game1"
[65]: ./img/65-Teris.png "65-Teris.png"