HTML5 Canvas核心技术 图形、动画与游戏开发 目录
[TOC]
***

# 前言

- 本文为阅读感言
- 涵盖内容：
  - 图形
  - 文本
  - 图像
  - 动画
  - 精灵：实现具备绘制器和行为策略的动画精灵对象
  - 物理效果
  - 碰撞检测
  - 游戏开发
  - 自定义控件
  - 移动开发

***

# 推荐阅读

- 《HTML5 Canvas核心技术 图形、动画与游戏开发》
- [本书配套网站](http://corehtml5canvas.com/)
- 

***

# 1. 基础知识

- 通过`css`更改`canvas`背景颜色：

```css
#canvas {
    margin: 10px;
    padding: 10px;
    background: #ffffff;
    border: thin inset #aaaaaa;
}
```

效果：

![0-canvasbg.png][01]

<span style="color:red;">只是在页面上显示黑色，下载后为无</span>

- `canvas`存在两套大小：`css`的元素本身大小和`canvas`元素绘图表面的大小

## 常见`API`

- `width`
- `height`
- `getContext()`：返回绘图环境
- `toDataURL(type, quality)`：返回一个数据地址(data url)，可以设置为`img`元素的`src`属性值
  - `type`：`image/jpeg, image/png`
  - `quality`：$1-10$

```js
let img = document.createElement('img');               let c = document.getElementById('canvas');
let ctx = c.getContext('2d');
img.src = c.toDataURL('image/png', 5);
console.log(img.src);
document.body.appendChild(img);
```



- `toBlob(callback, type, args...)`：创建一个用于展示此`canvas`元素图像文件的`Blob`。这个图片文件可以缓存或者保存到本地

```javascript
let url;
let img = document.createElement('img');        
let c = document.getElementById('canvas');
c.toBlob(blob => {
    url = URL.createObjectURL(blob);
    img.src = url;
},'image/png', 5);

img.onload = () => {
    URL.revokeObjectURL(url);
};

console.log(img.src);
document.body.appendChild(img);
```

## `2D`绘图环境

- `2d`绘图环境提供很多`API`

### `API`

- `fillStyle`：图形填充颜色、渐变色和图案
- `font`：字型
- `globalAlpha`：全局透明度设定，0-1
- `globalCompsiteOperation`：该值决定了浏览器将某个物体绘制再其他物体之上时，所采用的绘制方式
- `lineCap`：绘制线段的端点，`butt, round, square`
- `lineWidth`：线段宽度
- `lineJoin`：线段相交时，如何绘制焦点，`bevel, round, miter`
- `miterLimit`：如何绘制`miter`形式的线段焦点
- `shadowBlur`：阴影效果
- `shadowColor`：阴影颜色
- `shadowOffsetX`：水平偏移量
- `shadowOffsetY`：垂直偏移量
- `strokeStyle`：对路径进行描边时，所采用的绘制风格

提示：

可以扩充`2d`绘图环境对象的功能，也可对已有方法进行扩充

## `3D WebGL`

- `3d`绘图环境就是`WebGL`
- 完全符合`OpenGL ES`，推荐阅读：[WebGL标准](http://www.khronos.org/registry/webgl/specs/latest)

## 恢复和保存

- 进行绘图时，需要频繁设置值。临时性改变属性，就需要记录保存
- 比如：背景中绘制网格线，然后用粗线绘制。就需要先保存，再临时修改`lineWidth`
- `save()`：保存
- `restore()`：恢复

### `UserAgent`

- 将`canvas`元素的实现者称为`User Agent`简称`UA`

## 常见工具

- 性能分析器(profiler)
- 时间轴(timeline)

## 动画规范

- `canvas`
- 基于脚本的定时控制动画(Timing control for script-based animation)
- `H5`视频与音频

常用`window.setInterval()`和`window.setTimeout()`制作动画，但这个方法不适用于要求性能的动画，应用`window.requestAnimationFrame()`

### 技巧-编程方式启动和停止性能分析器

- `console.profile('core H5')` 开启
- `console.profileEnd()` 停止

## 时钟程序的绘制

- `arc`
- `beginPath`
- `clearRect`
- `fill`
- `fillText`
- `lineTo`
- `moveTo`
- `stroke`

```javascript
let c = document.getElementById('canvas');
// 设置画布的宽高
c.width = 400,
c.height = 400;

let ctx = c.getContext('2d');
// 常量设计
// 字体大小，边距
// 指针转动的
// 时针
// 数字间的间距
// 半径为减去边距的长
// 文字的横坐标
const FONT_HEIGHT = 15,
    MARGIN = 35,
    HAND_TRUNCATION = c.width / 25,
    HOUR_HAND_TRUNCATION = c.width / 10,
    NUMERAL_SPACING = 20,
    RADIUS = c.width / 2 - MARGIN,
    HAND_RADIUS = RADIUS + NUMERAL_SPACING;

// 绘圆
function drawCircle() {
    ctx.beginPath();
    // 中点做圆心
    ctx.arc(c.width/2, c.height/2,
            RADIUS, 0, Math.PI * 2,
            true);

    ctx.stroke();
}

// 绘刻度
function drawNumerals() {
    let numerals = [1,2,3,4,5,6,7,8,9,10,11,12],
        angle = 0,
        numeralWidth = 0;

    numerals.forEach(numeral => {
        // 平分为2pi/12
        angle = Math.PI/6 * (numeral - 3);
        
        numeralWidth = ctx.measureText(numeral).width;
        // 文字的位置
        ctx.fillText(numeral,
            c.width/2 + Math.cos(angle) * (HAND_RADIUS) - 
                numeralWidth/2,
            c.height/2 + Math.sin(angle) * (HAND_RADIUS) +
                FONT_HEIGHT/3);
    });
}

// 绘制圆心的小圆
function drawCenter() {
    ctx.beginPath();
    ctx.arc(c.width/2, c.height/2, 5, 0, Math.PI*2, true);
    ctx.fill();
}

// 绘指针
function drawHand(loc, isHour, thickness){
    let angle = (Math.PI*2) * (loc/60) - Math.PI/2,
        handRadius = isHour ? RADIUS - HAND_TRUNCATION - HOUR_HAND_TRUNCATION
                            : RADIUS - HAND_TRUNCATION;
    
    ctx.moveTo(c.width/2, c.height/2);
    ctx.lineWidth = thickness;
    ctx.lineTo(c.width/2 + Math.cos(angle)*handRadius,
                c.height/2 + Math.sin(angle)*handRadius);
    
    ctx.stroke();
}

function drawHands() {
    let date = new Date,
        hour = date.getHours();

    hour = hour > 12 ? hour - 12 : hour;

    drawHand(hour * 5 + (date.getMinutes()/60)*5, true, 0.5);
    drawHand(date.getMinutes(), false, 0.5);
    drawHand(date.getSeconds(), false, 0.2);
}

function drawClock() {
    ctx.clearRect(0,0,c.width,c.height);

    drawCircle();
    drawCenter();
    drawHands();
    drawNumerals();
}

ctx.font = FONT_HEIGHT + 'px Arial';
loop = setInterval(drawClock, 1000);
```



## 事件处理

- `H5`应用程序是以事件来驱动
- `canvas`都会处理鼠标或者触摸事件

### 鼠标事件

两种监听方式：

- `canvas.onmousedown`
- `canvas.addEventListener`

```js
// 1.
canvas.onmousedown = event => {};

// 2.
canvas.addEventListener('mousedown', event => {});
```

- 其他事件：`onmousemove, onmouseup, onmouseout`
- 如果要注册多个监听器的话，需要使用`addEventListener`

### 鼠标转换为`canvas`坐标

- `element.getBoundingClientRect()`：返回元素的大小及其相对于视口的位置

```js
let canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    readout = document.getElementById('readout'),
    spritesheet = new Image();

// function

/* 
    return: {x,y}坐标
*/
function windowToCanvs(canvas, x, y){
    let bbox = canvas.getBoundingClientRect();

    return {
        x: x - bbox.left * (canvas.width / bbox.width),
        y: y - bbox.top * (canvas.height / bbox.height)
    };
}

/*
    背景画线
*/
function drawBackground(){
    let VERICAL_LINE_SPACING = 12,
        i = ctx.canvas.height;
    
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.strokeStyle = 'lightgray';
    ctx.lineWidth = 0.5;

    while(i > VERICAL_LINE_SPACING * 4) {
        ctx.beginPath();
        ctx.moveTo(0,i);
        ctx.lineTo(ctx.canvas.width, i);
        ctx.stroke();

        i -= VERICAL_LINE_SPACING;
    }
}

/* 
    从(0,0)绘图
*/
function drawSpritesheet() {
    ctx.drawImage(spritesheet, 0, 0);
}

/* 
    鼠标画线
 */
function drawGuidelines(x,y){
    ctx.strokeStyle = 'rgba(0,0,230,0.8)';
    ctx.lineWidth = 1;

    drawVerticalLine(x);
    drawHorizontalLine(y);
}

/* 
    更新坐标
 */
function updateReadout(x,y){
    readout.innerHTML = `(${x.toFixed(0)}, ${y.toFixed(0)})`;
}

/* 
    画横线
 */
function drawHorizontalLine(y) {
    ctx.beginPath();
    ctx.moveTo(0,y+0.5);
    ctx.lineTo(ctx.canvas.width, y+0.5);
    ctx.stroke();
}


/* 
    画竖线
 */
function drawVerticalLine(x) {
    ctx.beginPath();
    ctx.moveTo(x + 0.5, 0);
    ctx.lineTo(x+0.5, ctx.canvas.height);
    ctx.stroke();
}

// event listener
canvas.onmousemove = event => {
    let loc = windowToCanvs(canvas,event.clientX, event.clientY);

    drawBackground();
    drawSpritesheet();
    drawGuidelines(loc.x, loc.y);
    updateReadout(loc.x, loc.y);
};

// initialization
spritesheet.src = 'windowToCanvas.png';
spritesheet.onload = event => {
    drawSpritesheet();
};

drawBackground();
```

#### `x,y`与`clientX, clientY`

- 现在已经分开，`clientX, clientY`获取鼠标事件发生的窗口坐标

#### 阻止监听

- 就是阻止事件冒泡：`preventDefault()`

### 键盘事件

- `canvas`是一个不可获取焦点的元素，新增键盘事件监听器是徒劳的
- 想要检测键盘事件的话，应该在`document`或`window`对象上新增键盘事件监听器

三种键盘事件：

1. `keydown`
2. `keypress`
3. `keyup`

- `keydown, keyup`是底层事件
- `keypress`在触发`keyup`事件之前
- 犹豫浏览器只会产生可打印字符时才会触发`keypress`事件，可使用`let key = String.fromCharCode(event.which)`获取字符

## 保存和恢复

- `canvas.save(), canvas.store()`
- `getImageData(), putImageData()`

- `SVG`保留模式：维护绘图形对象的列表
- `canvas`立即模式：立刻绘制，不保存

````js
function saveDrawingSurface() {
    drawdingSurfaceImageData = ctx.getImageData(0,0,canvas.width,canvas.height);
}

function restoreDrawingSurface() {
    ctx.putImageData(drawdingSurfaceImageData,0,0);
}
````



## `canvas`中使用`html`元素

- 使用`css`将控件放置在`canvas`上
- 在`canvas`规范中，首先考虑使用内置的`HTML`控件，而非使用`Canvas API`从头实现

### 不可见的`HTML`元素

- 用户拖动鼠标时，动态修改`DIV`大小 - 橡皮筋式

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
            background: rgba(100, 145, 150, 0.3);
        }

        #canvas {
            margin-left: 20px;
            margin-right: 0;
            margin-bottom: 20px;
            border: thin solid #aaaaaa;
            cursor: crosshair;
            padding: 0;
        }

        #controls {
            margin: 20px 0px 20px 20px;
        }

        #rubberbandDiv {
            position: absolute;
            border: 3px solid blue;
            cursor: crosshair;
            display: none;
        }
    </style>
</head>
<body>
    <div id="controls">
        <input type="button" id="resetButton" value="Reset">
    </div>

    <div id="rubberbandDiv"></div>

    <canvas id="canvas" width="800" height="520">
        Canvas Not Support
    </canvas>
    <script src="rubberband.js"></script>
</body>
</html>
```

```js
/* 
    功能：
    0. 选框由css设置为标签的框线
    1. 根据鼠标建立选框
    2. 根据选框进行放大
    3. 在原图的基础上进行放大
*/
let canvas =document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    rubberbandDiv = document.getElementById('rubberbandDiv'),
    resetButton = document.getElementById('resetButton'),
    image = new Image(),
    mousedown = {},
    rubberbandRectangle = {},
    dragging = false;

/* 
    Functions
 */
// 弹性框的开始坐标
function rubberbandStart(x, y){
    mousedown.x = x,
    mousedown.y = y;

    rubberbandRectangle.left = mousedown.x,
    rubberbandRectangle.top = mousedown.y;

    moveRubberbandDiv();
    showRubberbandDiv();
    // 标记选框状态
    dragging = true;
}

// 弹性框扩展
function rubberbandStretch(x, y){
    rubberbandRectangle.left = x < mousedown.x ? x : mousedown.x;
    rubberbandRectangle.top = y < mousedown.y ? y : mousedown.y;

    rubberbandRectangle.width = Math.abs(x - mousedown.x);
    rubberbandRectangle.height = Math.abs(y - mousedown.y);

    moveRubberbandDiv();
    resizeRubberbandDiv();
}

// 弹性框结束
function rubberbandEnd() {
    let bbox = canvas.getBoundingClientRect();

    try{
        // 在canvas的基础上进行图像的绘制
        context.drawImage(canvas,
                        rubberbandRectangle.left - bbox.left,
                        rubberbandRectangle.top - bbox.top,
                        rubberbandRectangle.width,
                        rubberbandRectangle.height,
                        0, 0, canvas.width, canvas.height);
        
    } catch(error){
        console.log('error');
    }

    // 绘图后重设弹性框设置
    resetRubberbandRectangle();

    // 标签的设置
    rubberbandDiv.style.width = 0,
    rubberbandDiv.style.height = 0;

    // 隐藏标签
    hideRubberbandDiv();

    dragging = false;
}

// 移动弹性框标签的位置
function moveRubberbandDiv() {
    rubberbandDiv.style.top = rubberbandRectangle.top + 'px',
    rubberbandDiv.style.left = rubberbandRectangle.left + 'px';
}

// 弹性框标签的宽高
function resizeRubberbandDiv() {
    rubberbandDiv.style.width = rubberbandRectangle.width + 'px',
    rubberbandDiv.style.height = rubberbandRectangle.height + 'px';
}

// 展示弹性框标签
function showRubberbandDiv() {
    rubberbandDiv.style.display = 'inline';
}

// 隐藏弹性框标签
function hideRubberbandDiv() {
    rubberbandDiv.style.display = 'none';
}

// 重设弹性框
function resetRubberbandRectangle() {
    rubberbandRectangle = {
        top: 0,
        left: 0,
        width: 0,
        height: 0
    };
}

// Event handlers
// 在canvas按下鼠标时，触发事件
// dom冒泡时取消，防止出现在canvas外时出现问题
canvas.onmousedown = function(e) {
    let x = e.clientX - 5,
        y = e.clientY - 5;

    e.preventDefault();
    rubberbandStart(x, y);
}

// 鼠标移动时，选框开始扩展
window.onmousemove = function(event) {
    let x = event.clientX,
        y = event.clientY;

    event.preventDefault();

    if(dragging){
        rubberbandStretch(x, y);
    }
}

// 放开鼠标
window.onmouseup = function(event) {
    event.preventDefault();

    rubberbandEnd();
}

// 图像加载
image.onload = function() {
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
}

resetButton.onclick = function(event) {
    context.clearRect(0, 0, context.canvas.width,
                            context.canvas.height);


    context.drawImage(image, 0, 0, canvas.width, canvas.height);
}

// Initialization
image.src = 'test.jpg';
```

![rubber][02]

![rubber][03]



## 打印`canvas`

- `toDataURL()`：给定`canvas`的数据地址
- `toBlob()`：保存至`blob`文件里

```js
let dataUrl = canvas.toDataURL(),
    img = new Image();
img.src = dataUrl;
```

## 离屏`canvas`

- 通过使用`toDataURL()`，将地址赋值给`img`标签的`src`属性

```html
<img id="snap" />
```

```js
let snap = document.getElementById('snap');
snap.src = canvas.toDataURL();
```

## 向量运算

- 二维向量：方向、大小

## 通过扩展`CanvasRenderingContext2D`来绘制虚线

- 增加类似`lineTo()`的`dashedLineTo()`方法
- 主要难点是获取`moveTo()`传入的位置参数

```js
let canvas = document.createElement('canvas');
canvas.id = 'canvas';
document.body.appendChild(canvas);

let context = document.getElementById('canvas').getContext('2d');

// 原型链声明类
// 继承moveTo
let moveToFunction = CanvasRenderingContext2D.prototype.moveTo;

// 上次点位置
CanvasRenderingContext2D.prototype.lastMoveToLocation = {};

// 继承并新增功能
// 记录位置
CanvasRenderingContext2D.prototype.moveTo = function(x, y){
    moveToFunction.apply(context, [x, y]);

    this.lastMoveToLocation.x = x;
    this.lastMoveToLocation.y = y;
};

// 绘制点
// dashLength：指定虚线的长度
CanvasRenderingContext2D.prototype.dashedLineTo = function (x, y, dashLength) {
    dashLength = dashLength || 5;

    let startX = this.lastMoveToLocation.x,
        startY = this.lastMoveToLocation.y;

    // 求出间隔的长度
    let deltaX = x - startX,
        deltaY = y - startY;

    // 获取线段中虚线的个数
    let numDashes = Math.floor(Math.sqrt(deltaX * deltaX + deltaY * deltaY) / dashLength);

    // 遍历个数，每次移动点并绘制短线段
    for(let i = 0; i < numDashes; i++){
        this[i%2 === 0 ? 'moveTo' : 'lineTo']
            (startX + (deltaX / numDashes) * i,
                startY + (deltaY / numDashes) * i);
    }
    // 更新最后的点
    this.moveTo(x, y);
};

context.lineWidth = 3;
context.strokeStyle = 'blue';

context.moveTo(20, 20);
context.dashedLineTo(context.canvas.width - 20, 20);
context.dashedLineTo(context.canvas.width - 20,
                    context.canvas.height - 20);

context.dashedLineTo(20, context.canvas.height - 20);
context.dashedLineTo(20, 20);
context.dashedLineTo(context.canvas.width - 20,
                    context.canvas.height - 20);

context.stroke();
```

## 高级路径操作

- `pointInPath()`：如果某点在当前路径中，返回`true`

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Dragging Polygons</title>

    <style>
      body {
         background: #aaaaaa;
      }

      #dragDiv {
         position: absolute;
         left: 25px;
         top: 50px;
      }
      
      #controls {
         position: absolute;
         left: 25px;
         top: 25px;
      }
      
      #canvas {
         background: #ffffff;
         cursor: crosshair;
         margin-left: 10px;
         margin-top: 10px;
         -webkit-box-shadow: 4px 4px 8px rgba(0,0,0,0.5);
         -moz-box-shadow: 4px 4px 8px rgba(0,0,0,0.5);
         box-shadow: 4px 4px 8px rgba(0,0,0,0.5);
      }

    </style>
  </head>

   <body>
      <canvas id='canvas' width='850' height='500'>
         Canvas not supported
      </canvas>

	 <div id='controls'>
       Stroke color: <select id='strokeStyleSelect'>
                        <option value='red'>red</option>
                        <option value='green'>green</option>
                        <option value='blue'>blue</option>
                        <option value='orange'>orange</option>
                        <option value='cornflowerblue' selected>cornflowerblue</option>
                        <option value='goldenrod'>goldenrod</option>
                        <option value='navy'>navy</option>
                        <option value='purple'>purple</option>
                     </select>

       Fill color: <select id='fillStyleSelect'>
                        <option value='rgba(255,0,0,0.5)'>semi-transparent red</option>
                        <option value='green'>green</option>
                        <option value='rgba(0,0,255,0.5)'>semi-transparent blue</option>
                        <option value='orange'>orange</option>
                        <option value='rgba(100,140,230,0.5)'>semi-transparent cornflowerblue</option>
                        <option value='goldenrod' selected>goldenrod</option>
                        <option value='navy'>navy</option>
                        <option value='purple'>purple</option>
                     </select>

       Sides: <select id='sidesSelect'>
                        <option value=4 select>4</option>
                        <option value=6>6</option>
                        <option value=8>8</option>
                        <option value=10>10</option>
                        <option value=12>12</option>
                        <option value=20>20</option>
                     </select>

       
       Start angle: <select id='startAngleSelect'>
                        <option value=0 select>0</option>
                        <option value=22.5>22.5</option>
                        <option value=45>45</option>
                        <option value=67.5>67.5</option>
                        <option value=90>90</option>
                     </select>

       Fill <input id='fillCheckbox' type='checkbox' checked/>
       <input id='eraseAllButton' type='button' value='Erase all'/>
    </div>

    <div id='dragDiv'>
      Edit: <input type='checkbox' id='editCheckbox'/>
    </div>
    
    <script src = './polygon.js'></script>
    <script src = './main.js'></script>
  </body>
</html>

```

```js
// polygon.js
var Point = function (x, y) {
   this.x = x;
   this.y = y;
};

var Polygon = function (centerX, centerY, radius, sides, startAngle, strokeStyle, fillStyle, filled) {
   this.x = centerX;
   this.y = centerY;
   this.radius = radius;
   this.sides = sides;
   this.startAngle = startAngle;
   this.strokeStyle = strokeStyle;
   this.fillStyle = fillStyle;
   this.filled = filled;
};

Polygon.prototype = {
   getPoints: function () {
      var points = [],
          angle = this.startAngle || 0;

      for (var i=0; i < this.sides; ++i) {
         points.push(new Point(this.x + this.radius * Math.sin(angle),
                           this.y - this.radius * Math.cos(angle)));
         angle += 2*Math.PI/this.sides;
      }
      return points;
   },

   createPath: function (context) {
      var points = this.getPoints();

      context.beginPath();

      context.moveTo(points[0].x, points[0].y);

      for (var i=1; i < this.sides; ++i) {
         context.lineTo(points[i].x, points[i].y);
      }

      context.closePath();
   },

   stroke: function (context) {
      context.save();
      this.createPath(context);
      context.strokeStyle = this.strokeStyle;
      context.stroke();
      context.restore();
   },

   fill: function (context) {
      context.save();
      this.createPath(context);
      context.fillStyle = this.fillStyle;
      context.fill();
      context.restore();
   },

   move: function (x, y) {
      this.x = x;
      this.y = y;
   },
};
```

```js
// main.js
var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    eraseAllButton = document.getElementById('eraseAllButton'),
    strokeStyleSelect = document.getElementById('strokeStyleSelect'),
    startAngleSelect = document.getElementById('startAngleSelect'),

    fillStyleSelect = document.getElementById('fillStyleSelect'),
    fillCheckbox = document.getElementById('fillCheckbox'),
    editCheckbox = document.getElementById('editCheckbox'),

    sidesSelect = document.getElementById('sidesSelect'),

    drawingSurfaceImageData,
   
    mousedown = {},
    rubberbandRect = {},

    dragging = false,
    draggingOffsetX,
    draggingOffsetY,

    sides = 8,
    startAngle = 0,

    guidewires = true,

    editing = false,
    polygons = [];

// Functions..........................................................

// 绘制网格
function drawGrid(color, stepx, stepy) {
   context.save()

   context.shadowColor = undefined;
   context.shadowBlur = 0;
   context.shadowOffsetX = 0;
   context.shadowOffsetY = 0;
   
   context.strokeStyle = color;
   context.fillStyle = '#ffffff';
   context.lineWidth = 0.5;
   context.fillRect(0, 0, context.canvas.width, context.canvas.height);

   context.beginPath();

   for (var i = stepx + 0.5; i < context.canvas.width; i += stepx) {
     context.moveTo(i, 0);
     context.lineTo(i, context.canvas.height);
   }
   context.stroke();

   context.beginPath();

   for (var i = stepy + 0.5; i < context.canvas.height; i += stepy) {
     context.moveTo(0, i);
     context.lineTo(context.canvas.width, i);
   }
   context.stroke();

   context.restore();
}

// 选拉框位置
function windowToCanvas(x, y) {
   var bbox = canvas.getBoundingClientRect();
   return { x: x - bbox.left * (canvas.width  / bbox.width),
            y: y - bbox.top  * (canvas.height / bbox.height)
          };
}

// Save and restore drawing surface...................................
// 获取canvas已经绘制的图
function saveDrawingSurface() {
   drawingSurfaceImageData = context.getImageData(0, 0,
                             canvas.width,
                             canvas.height);
}

// 将储存的图像恢复
function restoreDrawingSurface() {
   context.putImageData(drawingSurfaceImageData, 0, 0);
}

// Draw a polygon.....................................................
function drawPolygon(polygon) {
   context.beginPath();
   polygon.createPath(context);
   polygon.stroke(context);

   if (fillCheckbox.checked) {
      polygon.fill(context);
   }
}

// Rubberbands........................................................
// 选择框
function updateRubberbandRectangle(loc) {
   rubberbandRect.width = Math.abs(loc.x - mousedown.x);
   rubberbandRect.height = Math.abs(loc.y - mousedown.y);

   if (loc.x > mousedown.x) rubberbandRect.left = mousedown.x;
   else                     rubberbandRect.left = loc.x;

   if (loc.y > mousedown.y) rubberbandRect.top = mousedown.y;
   else                     rubberbandRect.top = loc.y;
} 

// 选择框的形状
function drawRubberbandShape(loc, sides, startAngle) {
   var polygon = new Polygon(mousedown.x, mousedown.y,
                     rubberbandRect.width, 
                     parseInt(sidesSelect.value),
                     (Math.PI / 180) * parseInt(startAngleSelect.value),
                     context.strokeStyle,
                     context.fillStyle,
                     fillCheckbox.checked);
   drawPolygon(polygon);
   
   if (!dragging) {
      polygons.push(polygon);
   }
}

// 更新
function updateRubberband(loc, sides, startAngle) {
   updateRubberbandRectangle(loc);
   drawRubberbandShape(loc, sides, startAngle);
}

// Guidewires.........................................................
// 根据选择的不同而绘制不同的图形
function drawHorizontalLine (y) {
   context.beginPath();
   context.moveTo(0,y+0.5);
   context.lineTo(context.canvas.width,y+0.5);
   context.stroke();
}

function drawVerticalLine (x) {
   context.beginPath();
   context.moveTo(x+0.5,0);
   context.lineTo(x+0.5,context.canvas.height);
   context.stroke();
}

function drawGuidewires(x, y) {
   context.save();
   context.strokeStyle = 'rgba(0,0,230,0.4)';
   context.lineWidth = 0.5;
   drawVerticalLine(x);
   drawHorizontalLine(y);
   context.restore();
}

function drawPolygons() {
   polygons.forEach( function (polygon) {
      drawPolygon(polygon);
   });
}

// Dragging...........................................................
// 拖拉选择
function startDragging(loc) {
  saveDrawingSurface();
  mousedown.x = loc.x;
  mousedown.y = loc.y;
}

function startEditing() {
   canvas.style.cursor = 'pointer';
   editing = true;
}

function stopEditing() {
   canvas.style.cursor = 'crosshair';
   editing = false;
}

// Event handlers.....................................................

canvas.onmousedown = function (e) {
   var loc = windowToCanvas(e.clientX, e.clientY);

   e.preventDefault(); // prevent cursor change

   if (editing) {
     polygons.forEach( function (polygon) {
        polygon.createPath(context);
        if (context.isPointInPath(loc.x, loc.y)) {
           startDragging(loc);
           dragging = polygon;
           draggingOffsetX = loc.x - polygon.x;
           draggingOffsetY = loc.y - polygon.y;
           return;
        }
     });
   }
   else {
     startDragging(loc);
     dragging = true;
   }
};

canvas.onmousemove = function (e) {
   var loc = windowToCanvas(e.clientX, e.clientY);

   e.preventDefault(); // prevent selections

   if (editing && dragging) {
      dragging.x = loc.x - draggingOffsetX;
      dragging.y = loc.y - draggingOffsetY;

      context.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid('lightgray', 10, 10);
      drawPolygons();
   }
   else {
     if (dragging) {
        restoreDrawingSurface();
        updateRubberband(loc, sides, startAngle);

        if (guidewires) {
           drawGuidewires(mousedown.x, mousedown.y);
        }
     }
   }
};

canvas.onmouseup = function (e) {
   var loc = windowToCanvas(e.clientX, e.clientY);

   dragging = false;

   if (editing) {
   }
   else {
      restoreDrawingSurface();
      updateRubberband(loc);
   }
};

eraseAllButton.onclick = function (e) {
   context.clearRect(0, 0, canvas.width, canvas.height);
   drawGrid('lightgray', 10, 10);
   saveDrawingSurface(); 
};

strokeStyleSelect.onchange = function (e) {
   context.strokeStyle = strokeStyleSelect.value;
};

fillStyleSelect.onchange = function (e) {
   context.fillStyle = fillStyleSelect.value;
};

editCheckbox.onchange = function (e) {
   if (editCheckbox.checked) {
      startEditing();
   }
   else {
      stopEditing();
   }  
};

// Initialization.....................................................

context.strokeStyle = strokeStyleSelect.value;
context.fillStyle = fillStyleSelect.value;

drawGrid('lightgray', 10, 10);

if (navigator.userAgent.indexOf('Opera') === -1)
   context.shadowColor = 'rgba(0, 0, 0, 0.4)';

context.shadowOffsetX = 2;
context.shadowOffsetY = 2;
context.shadowBlur = 4;

```

![image-20210314163244508](.\img\1-rubber.png)

# 2. 文本

## 实现文本编辑控件

### 指示文本输入位置的光标









***

[01]:./img/0-canvasbg.png "0-canvasbg.png"
[02]: ./img/0-rubberband.png "0-rubber"
[03]: ./img/1-rubberband.png "1-rubber"

