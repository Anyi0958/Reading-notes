HTML5Canvas游戏开发实战 目录
[TOC]
***
# 前言
- 本文为进阶，旨在为个人记录和学习，如有需要，请阅读原书
主要介绍内容：
1. 准备
2. 基础知识
3. 开发实战
4. 提高效率

# 推荐阅读
- 《HTML5 Canvas游戏开发实战》

# 准备工作
## H5新特性
- 地理位置引入：`Geolocation API`
- 本地数据库：`WebSQL`存储数据，`web storage API`实现离线缓存

## 1. video标签播放动画
```html
    <video width="640" height="360" preload="auto" poster="hoge.png" controls autoplay>
        <!-- webm type -->
        <source src="hoge.webm" type='video/webm; codecs="vp8, vorbis"'>
        <!-- ogv -->
        <source src="hoge.ogv" type='video/ogg; codecs="theora, vorbis"'>
        <!-- mp4 -->
        <source src="hoge.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
        <!-- 无法使用video -->
        <p>无法播放动画<a href="#">推荐环境请看这里</a></p>
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
效果：
![1-3-canvas][01]

## 4. 获取当前位置
```html
 <script>
        window.addEventListener('load', () => {
            // 判断可否使用geolocation
            if(navigator.geolocation){
                // regular get location
                navigator.geolocation.watchPosition(position => {
                    console.log(position);
                    // 纬度
                    let lat = position.coords.latitude;
                    // 经度
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
效果：
![1-4-geo-1][02]
![1-4-geo-2][03]

## 5. 大量数据保存在客户端
`LocalStorage`保存大量的数据
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
        // 用localstorage来保存数据
        localStorage.key = 'wantted data';
        // 取出来localstorage的值
        let hoge = localStorage.key;
        // 显示
        document.write(hoge);
        localStorage.setItem("fwx", "xwf");
    </script>
</body>
</html>
```

## 6. form强化
`form`常用功能
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
### 绘图
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
### 解释
- 获取`<canvas>`标签，一般是通过`id/name`获得
- 要使用`canvas`元素，必须判断浏览器是否支持使用
- `getContext`方法中传递一个`2d`参数，从而可以得到二维对象，并实现二维图像描画
- `fillStyle`画笔颜色

## canvas实现三维的推荐
如果要实现三维效果，需要借助第三方类库：
- `three.js`
- `Papervision3D`

## JS实现继承
- 创建两个构造函数
- 使用apply方法，将父对象的构造函数绑定在子对象上
- 方法的继承：循环使用父对象的`prototype`进行复制，即可达到继承的目的
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
# 第二部分：基础知识
## canvas基本功能
### 1. 画直线
- 获取`canvas`对象
- 返回环境后，选择`canvasRenderingContext2D`对象，制作二维图像
- 设置线条宽度：`xx.lineWidth`
- 设置画笔颜色：`xx.strokeStyle = "red"`
- 创建一个新的路径：`xx.beginPath()`
- 画笔光标位置移动到指定坐标：`xx.moveTo(x,y)`
- 从当前坐标开始，移动画笔到指定坐标，并绘制线：`xx.lineTo(x,y)`
- 开始绘制：`xx.stroke()`
- 定义线帽的样式：`xx.lineCap = "butt";`
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
效果图：
![2-1-line][04]

线帽：
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
效果图：
![2-1-line-2.png][05]

### 2. 画矩形
- `xx.strokeRect()`可以替换为`xx.rect();xx.stroke();`
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
结果：
![2-2-rectangle][06]
#### 实心矩阵
- 替换为`fillRect()`
- 也可以换做`ctx.rect();ctx.fill();`
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
结果：
![2-3-fillRect][07]

### 3. 圆形
- `arc(x,y,r,rid,endrid,yy)`
- `xx.fill()`填充实心圆
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

### 4. 画圆角矩形
- 圆角：`arcTo(x,y,x,y,r)`
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

### 5. 擦除Canvas画板
- 擦除矩形区域：`clerRect(x,y,long,width)`
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

## 复杂图形
### 1. 曲线
- 又名贝塞尔曲线，贝兹曲线或贝济埃曲线，应用于二维图形的数学曲线
#### 1. 二次贝塞尔曲线
- 存在一个控制点
- `quadraticCurveTo(cpx, cpy, x, y)`
- cpx,cpy 控制点的坐标
- x,y 终点坐标
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

#### 2. 三次贝塞尔曲线
- 三次贝塞尔又两个控制点
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

### 2. clip在指定区域绘图
- `clip`使用当前路径作为连续绘制操作的剪切区域
- 无论画板上绘制了多大的图形，最后的图形只能由`clip`这扇窗户决定
- 先绘制一个圆，`clip`函数把这个圆作为绘制操作的区域，之后的图形只能显示在这个区域离
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
对比
前：
![2-9-preclip][15]
后：
![2-9-postclip.png][16]

### 3. 自定义图形

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