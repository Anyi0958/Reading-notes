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
## 1. canvas基本功能

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

## 2. 复杂图形

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
- 组合以上各个方法，从而实现一些特殊的图形
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
结果：
![17-2-10-customeGraphics][17]



## 3. 绘制文本

- 在`Canvas`的`API`中，只能显示文字，无法直接绘制一个输入框
- 需要输入框时，用`HTML`中的文本框来代替

### 1. 绘制文字

- 存在两种方法：`fillText`和`strokeText`

#### 1. `fillText`绘制文字

- `fillText(text,x,y,maxWidth)`

展示代码：

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

结果展示：

![18-3-1-fillText][18]



设定第4个参数：

```js
ctx.fillText("Hello World!", 100, 50, 50);
```

![19-3-1-fillText][19]



#### 2. `strokeText`绘制文字

- `strokeText(text, x, y, maxWidth)`
- 相当于线，属于虚心图形

代码展示：

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

结果：

![20-3-2-strokeText][20]



### 2. 文字设置

- 问你本存在多种字体格式、大小、粗细

#### 1. 大小

- `ctx.font = "30px Arial";`

多种字体展示：

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

##### 结果存在的问题

![21-3-3-MultiText][21]

- `canvas`绘制后，只显示一半，但问题并非是`css`设置，而是绘制的渲染问题
- <span style="color:red">解决办法：</span>
  - 指定`canvas`的长和宽：`c.width = window.innerWidth;c.height = window.innerHeight;`

#### 2. 文字字体

代码：

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



#### 3. 文字粗体效果

- 粗体效果：`ctx.font = 'normal 30px Arial';`

- 常见的值：`normal, bold, bolder, lighter, number`

#### 4. 文字斜体效果

- 类似于`font-style`
- 通过`font`来设置：`ctx.font = 'italic 30px Arial'; `
- 斜体有：`italic, oblique`

### 3. 对齐方式

- 对齐：`textAlign`和`textBaseline`
- `textAlign`：水平方向的文字对齐
  - 值包括：`center, end, left, right, start`
- `textBaseline`：竖直方向的对齐
  - 值包括：`alphabetic, bottom, hanging, ideographic, middle, top`

代码展示：

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



#### 结果仍旧存在问题

理想结果：

![24-3-5-align-2][24]

实际结果：

![23-3-5-align.png][23]

<span style="color:red">解决办法：</span>

- 指定`canvas`的长和宽：`c.width = window.innerWidth;c.height = window.innerHeight;`

## 4. 图片操作

- 开发游戏时，游戏中的地图、背景、人物、物品等都是由图片组成
- 提供绘制函数：`drawImage()`和`putImageData`

### 1. `drawImage()`绘制图片

- 存在3中函数原型：
  - `drawImage(image, dx, dy)`
  - `drawImage(image, dx, dy, dw, dh)`
  - `drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)`
- `image`：要绘制的对象，可以是`HTMLImageElement, HTMLCanvasElement, HTMLVideoElement`
- `dx, dy`：`image`在`Canvas`中定位的坐标值
- `dw, dh`：`image`在`canvas`中即将绘制区域的宽度和高度，相对于`dx, dy`的偏移量
- `sx, sy`：`image`所要绘制的起始位置
- `sw, sh`：`image`绘制区域(相对`image`的`sx,sy`坐标偏移量)的宽度和高度

实现代码：
#### 1. 设置`<img>`标签
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
        // 会加载出图片
/*         img.addEventListener('load', ()=> {
            ctx.drawImage(img, 20, 20);
        }); */
        // 会加载出来图片
        img.onload = () => {
            ctx.drawImage(img, 20, 20);
        }
    </script>
</body>
</html>
```

##### 注意

1. `drawImage()`函数，要等到`img`标签里指定的图像加载完成后，再开始绘图，否则会出现无图的情况
2. 可以声明两种加载方式：
   1. `img.onload = function() {drawImage()}`
   2. `window.onload = function() {drawImage()}`
3. 可以使用`addEventListener('load', () => {drawImage()})`，可以绘出图像
   1. 同理：`document.querySelector('#imgs').addEventListener('load', (event) => {drawImage()})`

```js
        let img = document.getElementById('imgs');
        // 会加载出图片	
        img.addEventListener('load', ()=> {
            ctx.drawImage(img, 20, 20);
        });
        // 会加载出来图片
        img.onload = () => {
            ctx.drawImage(img, 20, 20);
        }
```

#### 2. 也可以通过`Image`对象来获取
- `ctx.drawImage(image, 10, 10)`： 从(10,10)开始绘制整张图片
- `ctx.drawImage(image, 260, 10, 100, 100)`：从(260,10)开始绘制图片到长100，宽100的矩形区域内
- `ctx.drawImage(image, 50, 50, 100, 100, 260, 130, 100, 100)`：截取(50,50)到(100,100)的部分，从(260,130)开始绘制，放到长100，宽100的区域内

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
            // 从(10,10)开始绘制整张图片
            ctx.drawImage(image, 10, 10);
            // 从(260,10)开始绘制图片到长100，宽100的矩形区域内
            ctx.drawImage(image, 260, 10, 100, 100);
            // 截取(50,50)到(100,100)的部分，从(260,130)开始绘制，放到长100，宽100的区域内
            ctx.drawImage(image, 50, 50, 100, 100, 260, 130, 100, 100);
        };
    </script>
</body>
</html>
```
结果：
![25-drawImageshow][25]

### 2. `getImageData`和`putImageData`绘制图片

还存在其他的绘制办法：

- `putImageData(imagedata,dx,dy,sx,sy,sw,sh)`
  - `imgdata`:像素数据
  - `dx,dy`：绘图定位坐标值
  - `sx,sy`：`imgdata`要绘制的图片起始位置
  - `sw,sh`：`imgdata`要绘制区域的宽度和高度
- `getImageData(x,y,w,h)`：从`canvas`得到像素数据

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

#### 注意

- 直接在浏览器中的打开，会涉及到跨域问题，从而无法浏览
- 应该用本地服务器`live-server xx.html`来打开

![26-getImageData][26]

### 3. `createImageData`新建像素

两种函数原型：

- `createImageData(sw, sh)`：返回指定大小的`imageData`对象
- `createImageData(imagedata)`：返回与指定对象相同大小的`imageData`对象

代码展示：

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

# 高级功能

## 1. 变形

### 1. 放大与缩小

- 函数原型：`scale(x,y)`

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

### 图形的翻转

代码：

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



结果：

![28-rescale][28]

### 2. 平移

- 函数原型：`translate(x,y)`

- `x`：平移，`y`：竖直方向平移

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

结果：

![29-translate][29]

### 3. 旋转

- `rotate(angle)`
- `angle`是弧度，而不是角度
- 换算成弧度就是$\frac{angle\times MAth.PI}{180}$

代码：

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

结果：

![30-rotate][30]



### 4. `transform`矩阵实现多样化的变形

- 所有变形都可以通过变形矩阵`transform(a,b,c,d,e,f)`来实现的
- 相应位置的参数：<span style="color:red">$\left(\begin{array}{cols} a & c & e\\ b & d & f \\ 0 & 0 & 1\end{array}\right)$</span>

#### 1. 缩放

- 假设原始是`(x,y)`缩放为`(x1,y1)`，缩放的倍数是`a,d`
- $x1 = a\times x $
- $y1 = d \times y$

得到矩阵公式：
$$
\left(\begin{array}{cols}x1\\y1\\1\end{array}\right) = \left(\begin{array}{cols}a&0&0\\0&d&0\\0&0&1\end{array}\right)\left(\begin{array}{cols}x\\y\\1\end{array}\right)
$$

- 于是可以使用`transform(a,0,0,d,0,0)`替换`scale(a,d)`

#### 2. 平移

- $x1=x+e$
- $y1=y+f$

矩阵公式：
$$
\left(\begin{array}{cols}1&0&e\\0&1&f\\0&0&1\end{array}\right)\left(\begin{array}{cols}x\\y\\1\end{array}\right)
$$

- `transform(1,0,0,1,e,f)`替换`translate(e,f)`

#### 3. 旋转

矩阵公式：
$$
\left(\begin{array}{cols}x1\\y1\\1\end{array}\right)=\left(\begin{array}{cols}\cos \theta & -\sin \theta & 0\\\sin \theta& \cos \theta & 0\\0&0&1\end{array}\right)
$$

- $transform(\cos \theta, \sin \theta, -\sin\theta,\cos\theta,0,0)$来替换$rotate(\theta)$

#### `setTransform`

- 参数与`transform`相同
- `setTransform`先消去之前的`transform`变换，然后重新进行变换

#### 4. 倾斜

##### 倾斜图像1：

![33-tiltprinciple][33]

公式：
$$
\left(\begin{array}{cols}\frac{(P1.x - p0.x)}{width}&\frac{p2.x-p0.x}{height}&p0.x\\\frac{p1.y-p0.y}{width}&\frac{(p2.y-p0.y)}{height}&p0.y\\0&0&1\end{array}\right)
$$


##### 倾斜图像2：

![34-tiltprinciple2][34]

公式：
$$
\left(\begin{array}{cols}\frac{(p3.x-p2.x)}{width} & \frac{p3.x-p1.x}{height} & p2.x \\ \frac{(p3.y-p2.y)}{width} & \frac{p3.y-p1.y}{height} & p2.y \\ 0 & 0 & 1\end{array}\right)
$$


测试代码：

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

结果：

![31-tilt][31]

#### 5. 图片的扭曲

- 基于以上4种的变化，再加上`clip`函数，从而实现想要的效果

代码：

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

结果：

![32-special][32]

##### 代码解释

1. 左半边图形的绘制
	- 以`(80,0),(320,40),(0,200)`3个点为顶点绘制一个三角形
	- 用`clip`将这个三角形作为绘图的可视区域
```js
ctx.beginPath();

ctx.moveTo(80,0);
ctx.lineTo(320,40);
ctx.lineTo(0,200);
ctx.closePath();
//以以上图像变为窗口
ctx.clip();

ctx.setTransform((320-80)/240,40/240,-80/240,200/240,80,0);
ctx.drawImage(img,0,0);
```

![35-halftilt.png][35]

2. 右半边与此相同

- `save()`和`restore()`让两次变形和绘图互不干涉

## 2. 图形的渲染

- 颜色操作`API`：渐变、反色等

### 1. 线性渐变

可以实现线性渐变的函数：`createLinearGradient()`和`addColorStop()`

- `createLinearGradient(x1,y1,x2,y2)`
  - 渐变的出发点：`(x1,y1)`
  - 终点：`(x2,y2)`

- `addColorStop(position,color)`
  - `position`：0.0-1.0之间，表示渐变中颜色地点的相对地位
  - `color`：渐变的颜色

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

结果：

![36-gradient.png][36]

### 2. 径向渐变

- `createRadialGradient`和`addColorStop()`
- `createRadialGradient(x0,y0,r0,x1,y1,r1)`
  - `x0,y0`：圆心坐标
  - `r0`：圆的直径
  - `x1,y1`：结束圆的圆心坐标
  - `r1`：结束圆的直径

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

### 颜色合成之`globalCompositeOperation`属性

- `globalCompositeOperation`：绘制到画布上的颜色与画布上已有的颜色组合起来
- `source`：将要绘制的画布颜色，`destination`：画布上已经存在的颜色，默认是`source-over`

![38-detail][38]

例子：

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

### 颜色反转

- 每个像素进行颜色取反

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

### 灰度控制

- 灰度图

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
                // RGB取反
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



### 阴影

- 自动为绘制的任何图形添加下拉阴影的属性
- 阴影颜色：`shadowColor = "#ff0000"`
- `shadowOffsetX=10`：水平偏移量
- `shadowOffsetY=10`：垂直偏移量
- `shadowBlur=10`：阴影边缘的羽化量，阴影的程度

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



## 3. 自定义画板

### 思路

1. 鼠标按下，开始描画。鼠标按下事件。
2. 鼠标弹起，结束描画。鼠标弹起事件。
3. 鼠标按下移动，路径画线。鼠标移动事件。

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

        // 按下标记
        let onoff = false,
            oldx = -10,
            oldy = -10;

        // 设置颜色
        let linecolor = "white";

        // 设置线宽
        let linw = 4;

        // 添加鼠标事件
        // 按下
        c.addEventListener('mousedown', event => {
            onoff = true;
            // 位置 - 10是为了矫正位置，把绘图放在鼠标指针的顶端
            oldx = event.pageX - 10;
            oldy = event.pageY - 10;
        },false);
        // 移动
        c.addEventListener('mousemove', event => {
            if(onoff == true){
                let newx = event.pageX - 10,
                    newy = event.pageY - 10;

                // 绘图
                ctx.beginPath();
                ctx.moveTo(oldx,oldy);
                ctx.lineTo(newx,newy);
                ctx.strokeStyle = linecolor;
                ctx.lineWidth = linw;
                ctx.lineCap = "round";
                ctx.stroke();
			   // 处理完后，坐标更新
                oldx = newx,
                oldy = newy;
            }
        }, true);
        // 弹起
        c.addEventListener('mouseup', ()=> {
            onoff = false;
        },false);
    </script>
</body>
</html>
```

结果展示：

![43-blackBoard][43]

### 代码讲解

整体思路：按下鼠标，触发移动的开关，移动后开始记录线条（用移动后的坐标-移动前的坐标，然后绘线），每次移动都会更新旧坐标。松开鼠标后，释放移动开关。

1. 只有在鼠标按下，才会触发移动绘图的效果，所以需要增加一个状态判断。
2. 因为鼠标指针和实际位置有一个偏移量，所以在坐标定位的时候，需要增加`pagex-10`从而使坐标位于指针的尖端处。
3. 每次移动都要更新坐标位置，用小段的线段来模拟不规则的线。

### 更改线条颜色和宽度

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

        // 按下标记
        let onoff = false,
            oldx = -10,
            oldy = -10;

        // 设置颜色
        let linecolor = "white";

        // 设置线宽
        let linw = 4;

        // 添加鼠标事件
        // 按下
        c.addEventListener('mousedown', event => {
            onoff = true;
            // 位置 - 10是为了矫正位置，把绘图放在鼠标指针的顶端
            oldx = event.pageX - 10;
            oldy = event.pageY - 10;
        },false);
        // 移动
        c.addEventListener('mousemove', event => {
            if(onoff == true){
                let newx = event.pageX - 10,
                    newy = event.pageY - 10;

                // 绘图
                ctx.beginPath();
                ctx.moveTo(oldx,oldy);
                ctx.lineTo(newx,newy);
                ctx.strokeStyle = linecolor;
                ctx.lineWidth = linw;
                ctx.lineCap = "round";
                ctx.stroke();
                // 每次移动都要更新坐标位置
                oldx = newx,
                oldy = newy;
            }
        }, true);
        // 弹起
        c.addEventListener('mouseup', ()=> {
            onoff = false;
        },false);
    </script>
</body>
</html>
```

![44-board][44]

### 画布导出功能

- 给画板添加图片导出功能，即复制`canvas`画板的图像，保存为图片格式
- `canvas.toDataURL("image/png")`
- <span style="color:red;">如果要保存为图片，需要借助`PHP`或者`ASP`工具</span>

- 常见方式：新建`<img>`标签，然后将复制的`canvas`内容用`<img>`表示出来

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

        // 按下标记
        let onoff = false,
            oldx = -10,
            oldy = -10;

        // 设置颜色
        let linecolor = "white";

        // 设置线宽
        let linw = 4;

        // 添加鼠标事件
        // 按下
        c.addEventListener('mousedown', event => {
            onoff = true;
            // 位置 - 10是为了矫正位置，把绘图放在鼠标指针的顶端
            oldx = event.pageX - 10;
            oldy = event.pageY - 10;
        },false);
        // 移动
        c.addEventListener('mousemove', event => {
            if(onoff == true){
                let newx = event.pageX - 10,
                    newy = event.pageY - 10;

                // 绘图
                ctx.beginPath();
                ctx.moveTo(oldx,oldy);
                ctx.lineTo(newx,newy);
                ctx.strokeStyle = linecolor;
                ctx.lineWidth = linw;
                ctx.lineCap = "round";
                ctx.stroke();
                // 每次移动都要更新坐标位置
                oldx = newx,
                oldy = newy;
            }
        }, true);
        // 弹起
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



# `lufylegend`开源库件

开发游戏时，常见问题：
1. 各浏览器对`JS`和`HTML`解析不一致，`offsetX`和`layerX`
2. 手机浏览器和`PC`浏览器的区别，`touch`和`mouse`
3. 代码易读性

## 推荐阅读
- [官网](http://lufylegend.com/lufylegend "lufylegend")
- 代码分为原版和`min`版，分别适合学习和使用

## 1. 工作原理

- 利用`setInterval`对`canvas`周期性重绘，每次先运行`clearRect`
- 根据浏览器不同判断加载`mouse`还是`touch`
- 将加载的事件加入框架预先准备的数组中，当点击事件发生的时候，才会调用这个数组里的事件。好处在于，被加载的点击事件只是初始化时的一个，但被储存在数组中的事件可以是多个，就可以给多个对象加载点击事件。

## 使用流程

1. 引入库件
2. 创建`<div>`
3. 使用`init`函数初始化工作

### 代码解析
- `init(speed, divid, width, height, completeFuc, type)`
  - `speed`：游戏速度设定
  - `divid`：`canvas`传入此`div`内部
  - `width,height`：游戏宽高
  - `completeFunc`：游戏初始化完成后，调用此函数
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

## 图片的加载和显示

加载图片的步骤：

1. `Lloader`类加载图片数据
2. 读取完的图片数据保存到`LbitmapData`中
3. 利用`Lbitmap`将图片显示到画板

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
        // 因为封装，上面的不能使用
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
- 另一种方式展示：
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
            // setTimeout(function(){console.log("延迟1ms");}, 1);
            loader.load("show.jpg", "bitmapData");
        });

 
        
        // 因为封装，上面的不能使用
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

### 代码解析

```javascript
loader = new LLoader();            
loader.addEventListener(LEvent.COMPLETE, loadBitmapData);
loader.load("show.jpg", "bitmapData");

// 类似于
let image = new Image();
image.onload = () => {};
```

- `loader.content`就是一个`image`
- `LBitmapData`是`lufylegend`库件中的一个类，只是用来保存和读取`Image`对象的，如果需要显示在`canvas`上需要：`let bitmap = new LBitmap(bitmapdata);`，如果要添加对象到`canvas`上需要：`addChild(bitmap);`

## `LBitmapData`对象

- 构造器：`LBitmapData(image,x,y,width,height)`
- `x,y`：坐标
- `image`：对象
- `width,height`：可视范围

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

## `LBitmap`对象

- 显示图片到`canvas`上，还可以控制图片的各种属性
- 坐标，透明度，旋转，缩放等

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
                // 图片坐标
                bitmap.x = 50;
                bitmap.y = 50;
                // 旋转60度
                bitmap.rotate = 60;
                // 图片透明度设置0.4
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

## 层的概念

- 游戏里，任务在地图上行走、对话等，其实都是图片处理和现实的结果，让不同的图像按照先后顺序显示到屏幕上
- 图像现实的先后顺序以及位置决定了游戏的界面

- 分层：`LSprite`对象

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
                // 加入层LSprite
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

- `LSprite`和`LBitmap`一样，可以对坐标、透明度、旋转、缩放进行控制
- 不过`LSprite`控制的是整个层属性

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
                // 加入层LSprite
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

## `LGraphics`对象绘图

- `lufylegend`库件中的一个绘图类，内置了一些函数简化绘图
- 可以单独使用，也可以与`LSprite`配合使用

### 1. 绘制矩形

- `drawRect(thickness, lineColor, pointArray, isfill, color)`
  - `thickness`：边框线宽
  - `pointArray`：矩形范围数组（x,y,long,width）
  - `isfill`：是否填充

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

### 2. 绘制圆

- `drawArc(thickness,linecolor,pointArray,isfull,color)`
  - `pointArray`：`[x,y,r,start,end,顺时针或逆时针]`

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

### 3. 绘制多边形

- `drawVertices(thickness,linecolor,vertices,isfill,color)`
- `vertices`：顶点数组`[[顶点1],[顶点2],[顶点3]...]`
- <span style="color:red">顶点数组中的顶点个数必须大于等于3</span>

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

## `LGraphics`原始绘图函数

- `LGraphics`对象可以使用`canvas`原始绘图函数进行绘图

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

## `LSprite`对象绘图

- 每个`LSprite`对象都包含一个`LGraphics`对象，也可以用以上进行实现绘图

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

## `LGraphics`处理图片

### 1. 圆形区域

- `LGraphics`对象`beginBitmapFill`和`drawArc`结合

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

### 2. 矩形区域

- `LGraphics`对象的`beginBitmapFill`和`drawRect`

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



### 3. 多边形区域

- `LGraphics`对象的`beginBitmapFill`和`drawVertices`

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

### 4. 扭曲片段

- `LGraphics`对象的`beginBitmapFill`和`drawTriangles`

- `drawTraingles(vertices,indices,uvtData,thickness,color)`
  - `vertices`：数字构成的矢量`(x,y)`，每个顶点的坐标
  - `indices`：整数或索引构成的矢量，定义三角形
  - `uvtData`：纹理映射的标准坐标构成的矢量，每个顶点相对于整张图片的比例和位置

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

## 文本

### 1. 文本属性

- 创建的文本框对象不会自动加入可视化对象列表中
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

### 2. 输入框

- `LTextField`将文本变成输入框
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

## 事件

- 使用`addEventListener`可以为各种事件添加侦听

### 1. 鼠标事件

- `LMouseEvent.MOUSE_DOWN`：按下
- `LMouseEvent.MOUSE_UP`：弹起
- `LMouseEvent.MOUSE_MOVE`：移动

- 在手机上分别对应着`TOUCH_START,TOUCH_END,TOUCH_MOVE`
- 但在`lufylegend`中，不需要分辨，会自动转换

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





### 2. 循环事件

- 重复执行某段代码，需要用到循环事件的侦听
- 循环：不间断重复地广播某事件
- `LEvent.ENTER_FRAME`：添加侦听循环事件

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

### 3. 键盘事件

- `LKeyboardEvent.KEY_DOWN, LKeyboardEvent.KEY_UP, LKeyboardEvent.KEY_PRESS`
- 键盘事件需要加载到`window`上
- `LEvent.addEventListener`：加载键盘事件
- `LGlobal.window`：加载到`window`对象上，侦听整个浏览器窗口
- `event.keyCode`：按下键的值，根据这个判断游戏的按键

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

## 按钮

- 简化游戏开发，内置`LButton`添加按钮
- `LButton(DisplayObject_up, DisplayObject_over)`
  - `DisplayObject_up`：按钮默认`up`状态，鼠标离开的状态
  - `DisplayObject_over`：当鼠标移动到按钮上的状态
- 传入按钮的这两个状态对象，可以是`LSprite`和`LBitmap`

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

## 动画

- 动画是游戏的最基本组成部分
- 利用`LAnimation`类和循环时间，可以轻松实现一组动画的播放
- 准备一张照片，包含任务的动作

![54-animation][54]

- `LAnimation(layer,data,list)`
  - `layer`：`LSprite`对象
  - `data`：`LBitmapData`对象
  - `list`：存储坐标的二维数组
- 数组通过`LGlobal.divideCoordinate(width,height,row,col)`
  - `width,height`：宽，高
  - `row,col`：行数，列数
  - 此函数会将传入的宽高按照行数和列数进行拆分计算，从而得到二维数组
  - 例如图片为`256x256`，拆分代码`LGlobal.divideCoordinate(256,256,4,4)`

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

代码讲解：

- 人物动起来，其实是将第一行图片逐个循环播放

- `LAnimation`类的`onframe()`：将所播放的图片列号加1，在循环事件中播放，就成了动画

- 要实现所有的图片循环播放，需要用到`setAction`

- `setAction(rowIndex, colIndex)`：可以改变图片的行号和列号
  - `rowIndex`：数组行号
  - `colIndex`：数组列号

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

代码讲解：

- `getAction`取得当前播放动画的行号和列号，返回是个数组
- $[1,2,3,4]$分别代表着"下，左，右，上"4个方向，然后移动，根据到达的位置改变移动方向
- `layer.y += 5`：控制着图像移动的节奏和步伐
- `layer.y >= 350 - 287/2`：则控制着移动的空间，最大公式是:

$$
canvas高度 - \frac{整体图的高度}{分成的行数} \times 单个图在canvas显示的高度 \times 2
$$



***

# 开发实战

## 石头剪子布

### 游戏分析

游戏需要的东西：

1. 图片描画
2. 图形绘制
3. 文字绘制
4. 鼠标的点击
5. 电脑`AI`
6. 条件分支与判断

### 必要的`JS`知识

- 随机数
- 条件分支
- `canvas`操作，文本框、图像、切换
- `lufylegend`操作，最好分层

## 分层实现

1. 整个游戏界面
2. 出拳部分
3. 结果显示部分

## 代码实现

### 1.整个界面

```html
    <div id="legend"></div>
    <script>
        let backLayer;
        init(50,"legend", 800, 400, () =>{
            backLayer = new LSprite();
            addChild(backLayer);
            // 游戏背景
            backLayer.graphics.drawRect(10, '#008800',
                [0,0,LGlobal.width,LGlobal.height],
                true,
                '#000000');
            
            // 结果显示层初始化
            initResultLayer();
            // 操作层初始化
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

#### 代码解析

1. 分3个显示层：背景、结果、操作
2. `LGlobal.width,LGlobal.height`是`canvas`的宽、高

### 2. 出拳部分

- 准备素材

![58-hand][58]

![59-clip][59]

![60-ham][60]

- 图片读取函数：`LLoadManage.load(lits,onupdate,oncoplete)`
  - `list`：图片数组，格式必须为规定格式
  - `onupdate`：每读取数组中一张图片后调用的函数
  - `oncomplete`：读取完所有后调用的函数

```html
    <div id="legend"></div>
    <script>
        let backLayer;
        init(50,"legend", 800, 400, () =>{
            backLayer = new LSprite();
            addChild(backLayer);
            // loading画面
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

- 代码反思：虽然对着写是很好用，但是耦合性太强，需要考虑高内聚低耦合，建立函数模块

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
    // loading画面
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
- `imgData`中包含的是图片的路径`{name:"x",path:"y"}`
- 加载进度条：`loadingLayer = new LoadingSample3();backLayer.addChild(loadingLayer)`
- `lufylegend`中一共有3个进度条显示对象，`LoadingSample1,LoadingSample2,LoadingSample3`
- `LLoadManage.load()`利用静态类`LLoadManage`的`load`函数去读取数组中的图片
- `loadingLayer.setProgress(progress)`：获取图片个数占图片数组长度的比例，将这个比例通过`setProgress`传递，实现动态的进度条
- 读取完图片后的结果集赋值给`imglist`，然后一处画面上的进度条对象，再调用`gameInit`进入下一步

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
    // loading画面
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
    // 游戏背景
    backLayer.graphics.drawRect(10, '#008800',
                [0,0,LGlobal.width,LGlobal.height],
                true,
                '#000000');

    // 显示游戏标题
    let titleBitmap = new LBitmap(new LBitmapData(imgList["title"],20,20,50,50));
    // (全部-图的长度)/2 = 中点
    titleBitmap.x = (LGlobal.width - titleBitmap.width) / 2;
    titleBitmap.y = 10;
    // 加到背景层里
    backLayer.addChild(titleBitmap);

    // 玩家
    selfBitmap = new LBitmap(new LBitmapData(showList[0].image));
    selfBitmap.x = 400 - selfBitmap.width - 50;
    selfBitmap.y = 130;
    backLayer.addChild(selfBitmap);

    // 电脑
    computerBitmap = new LBitmap(new LBitmapData(showList[0].image));
    computerBitmap.x = 400 + 50;
    computerBitmap.y = 130;
    backLayer.addChild(computerBitmap);

    // 玩家，电脑名称设定
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

### 3. 结果层显示

- 用`win,loss,equal`表示结果的次数

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
    // loading画面
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
    // 游戏背景
    backLayer.graphics.drawRect(10, '#008800',
                [0,0,LGlobal.width,LGlobal.height],
                true,
                '#000000');

    // 显示游戏标题
    let titleBitmap = new LBitmap(new LBitmapData(imgList["title"],20,20,50,50));
    // (全部-图的长度)/2 = 中点
    titleBitmap.x = (LGlobal.width - titleBitmap.width) / 2;
    titleBitmap.y = 10;
    // 加到背景层里
    backLayer.addChild(titleBitmap);

    // 玩家
    selfBitmap = new LBitmap(new LBitmapData(showList[0].image));
    selfBitmap.x = 400 - selfBitmap.width - 50;
    selfBitmap.y = 130;
    backLayer.addChild(selfBitmap);

    // 电脑
    computerBitmap = new LBitmap(new LBitmapData(showList[0].image));
    computerBitmap.x = 400 + 50;
    computerBitmap.y = 130;
    backLayer.addChild(computerBitmap);

    // 玩家，电脑名称设定
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
        selfText.text = '猜拳次数: 0';
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

### 4. 控制层

- 添加替换按钮
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
    // loading画面
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
    // 游戏背景
    backLayer.graphics.drawRect(10, '#008800',
                [0,0,LGlobal.width,LGlobal.height],
                true,
                '#000000');

    // 显示游戏标题
    let titleBitmap = new LBitmap(new LBitmapData(imgList["title"],20,20,50,50));
    // (全部-图的长度)/2 = 中点
    titleBitmap.x = (LGlobal.width - titleBitmap.width) / 2;
    titleBitmap.y = 10;
    // 加到背景层里
    backLayer.addChild(titleBitmap);

    // 玩家
    selfBitmap = new LBitmap(new LBitmapData(showList[0].image));
    selfBitmap.x = 400 - selfBitmap.width - 50;
    selfBitmap.y = 130;
    backLayer.addChild(selfBitmap);

    // 电脑
    computerBitmap = new LBitmap(new LBitmapData(showList[0].image));
    computerBitmap.x = 400 + 50;
    computerBitmap.y = 130;
    backLayer.addChild(computerBitmap);

    // 玩家，电脑名称设定
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
        selfText.text = '猜拳次数: 0';
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
        msgText.text = "请出拳：";
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

### 5. 出拳

- 利用随机函数`Math.floor(Math.random() * 3)`对机器人进行赋值

### 6. 结果判定

制作判定数组：

![63-judge.png][63]

```js
let checkList = [
    [0,1,-1],
    [-1,0,1],
    [1,-1,0]
];
```

### 7. 游戏总体代码

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
    // loading画面
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
    // 游戏背景
    backLayer.graphics.drawRect(10, '#008800',
                [0,0,LGlobal.width,LGlobal.height],
                true,
                '#000000');

    // 显示游戏标题
    let titleBitmap = new LBitmap(new LBitmapData(imgList["title"],20,20,50,50));
    // (全部-图的长度)/2 = 中点
    titleBitmap.x = (LGlobal.width - titleBitmap.width) / 2;
    titleBitmap.y = 10;
    // 加到背景层里
    backLayer.addChild(titleBitmap);

    // 玩家
    selfBitmap = new LBitmap(new LBitmapData(showList[0].image));
    selfBitmap.x = 400 - selfBitmap.width - 50;
    selfBitmap.y = 130;
    backLayer.addChild(selfBitmap);

    // 电脑
    computerBitmap = new LBitmap(new LBitmapData(showList[0].image));
    computerBitmap.x = 400 + 50;
    computerBitmap.y = 130;
    backLayer.addChild(computerBitmap);

    // 玩家，电脑名称设定
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
        selfText.text = '猜拳次数: 0';
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
        msgText.text = "请出拳：";
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
    selfText.text = `次数： ${winCount + lossCount + equalCount}`;
}
</script>
</body>
</html>
```

![64-game1][64]

### 总结和评价

游戏制作思路：

1. 建立容器背景
2. 画出结果和操作栏
3. 画出显示栏
4. 通过操作从而实现更换图片，并记录数值，最后与机器人比较，并获得判定结果
5. 显示结果改变

总结：

- 用到的方法大体为：
  - 原生：图片引入，画文本框，输入文字
  - `luxylegend`：分层，`loading`动画，监听事件

- 原版代码水平质量较低，只是单纯的增加函数，而没有考虑做成模块，并且分类进行调取运用

### 模块

- <span style="colore:red">暂时存在`addChild问题，需要解决`</span>

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
        // 此处报错，暂时找不到问题和解决办法
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

        // 游戏背景
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

        this.textSetting('猜拳的次数： 0','bolder', '#000000',24,10,20, this.resultLayer);
        this.textSetting('win： 0','bolder', '#000000',24,10,40, this.resultLayer);
        this.textSetting('loss： 0','bolder', '#000000',24,10,60, this.resultLayer);
        this.textSetting('equal: 0','bolder', '#000000',24,10,80, this.resultLayer);
    }

    initClickLayer(){
        let clickLayer = new LSprite();

        clickLayer.graphics.drawRect(4, '#ff8800',
            [0,0,300,110],
            true,
            '#ffffff');

        this.textSetting('请出拳','bolder', '#000000',24,10,40, clickLayer);

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

        
        this.textSetting(`次数： ${this.winCount + this.lossCount + this.equalCount}`,'bolder', '#000000',24,10,20, this.resultLayer);
        this.textSetting(`win: ${this.winCount}`,'bolder', '#000000',24,10,40, this.resultLayer);
        this.textSetting(`loss: ${this.lossCount}`,'bolder', '#000000',24,10,60, this.resultLayer);
        this.textSetting(`equal: ${this.equalCount}`,'bolder', '#000000',24,10,80, this.resultLayer);
    }

}

const game = new GamePlay(50, 'legend', 800, 400);
game.backGroundPotray();
```



## 俄罗斯方块

- 循环播放事件、键盘事件、触屏事件

### 游戏分析

1. 图片绘画。背景和掉落方块都是图片。
2. 文字绘制。得分、消除层数、速度。
3. 循环播放事件。方块自动下落。
4. 键盘事件。对方块的操作。
5. 触屏事件。
6. 层次划分。
   1. 背景层
   2. 进度条显示层
   3. 方块绘制层
   4. 方块预览层

### 必要知识储备

- 二维数组，又叫矩阵。移动、变形、判定。
- 常见二维数组声明：
  - `var matrix = new Array(new Array(0,0), new Array(1,1))`
  - `var  matrix = [[0,0],[1,1]];`
- 常用于：游戏中的地图、网格

## 游戏标题画面显示

- `LSprite`对象的`graphics`和`LTextField`

素材：

![65-Teris.png][65]

- `backlayer.die()`：去掉所有的事件监听
- `removeAllChild()`

## 是男人就下100层

### 游戏分析

- 图片
- 文字绘制
- 循环播放事件
- 键盘事件
- 触屏事件
- 游戏层次划分：进度显示条、背景层、人物层、障碍层






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