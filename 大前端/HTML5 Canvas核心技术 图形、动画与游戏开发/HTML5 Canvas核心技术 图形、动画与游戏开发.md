HTML5 Canvas���ļ��� ͼ�Ρ���������Ϸ���� Ŀ¼
[TOC]
***

# ǰ��

- ����Ϊ�Ķ�����
- �������ݣ�
  - ͼ��
  - �ı�
  - ͼ��
  - ����
  - ���飺ʵ�־߱�����������Ϊ���ԵĶ����������
  - ����Ч��
  - ��ײ���
  - ��Ϸ����
  - �Զ���ؼ�
  - �ƶ�����

***

# �Ƽ��Ķ�

- ��HTML5 Canvas���ļ��� ͼ�Ρ���������Ϸ������
- [����������վ](http://corehtml5canvas.com/)
- 

***

# 1. ����֪ʶ

- ͨ��`css`����`canvas`������ɫ��

```css
#canvas {
    margin: 10px;
    padding: 10px;
    background: #ffffff;
    border: thin inset #aaaaaa;
}
```

Ч����

![0-canvasbg.png][01]

<span style="color:red;">ֻ����ҳ������ʾ��ɫ�����غ�Ϊ��</span>

- `canvas`�������״�С��`css`��Ԫ�ر����С��`canvas`Ԫ�ػ�ͼ����Ĵ�С

## ����`API`

- `width`
- `height`
- `getContext()`�����ػ�ͼ����
- `toDataURL(type, quality)`������һ�����ݵ�ַ(data url)����������Ϊ`img`Ԫ�ص�`src`����ֵ
  - `type`��`image/jpeg, image/png`
  - `quality`��$1-10$

```js
let img = document.createElement('img');               let c = document.getElementById('canvas');
let ctx = c.getContext('2d');
img.src = c.toDataURL('image/png', 5);
console.log(img.src);
document.body.appendChild(img);
```



- `toBlob(callback, type, args...)`������һ������չʾ��`canvas`Ԫ��ͼ���ļ���`Blob`�����ͼƬ�ļ����Ի�����߱��浽����

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

## `2D`��ͼ����

- `2d`��ͼ�����ṩ�ܶ�`API`

### `API`

- `fillStyle`��ͼ�������ɫ������ɫ��ͼ��
- `font`������
- `globalAlpha`��ȫ��͸�����趨��0-1
- `globalCompsiteOperation`����ֵ�������������ĳ�������������������֮��ʱ�������õĻ��Ʒ�ʽ
- `lineCap`�������߶εĶ˵㣬`butt, round, square`
- `lineWidth`���߶ο��
- `lineJoin`���߶��ཻʱ����λ��ƽ��㣬`bevel, round, miter`
- `miterLimit`����λ���`miter`��ʽ���߶ν���
- `shadowBlur`����ӰЧ��
- `shadowColor`����Ӱ��ɫ
- `shadowOffsetX`��ˮƽƫ����
- `shadowOffsetY`����ֱƫ����
- `strokeStyle`����·���������ʱ�������õĻ��Ʒ��

��ʾ��

��������`2d`��ͼ��������Ĺ��ܣ�Ҳ�ɶ����з�����������

## `3D WebGL`

- `3d`��ͼ��������`WebGL`
- ��ȫ����`OpenGL ES`���Ƽ��Ķ���[WebGL��׼](http://www.khronos.org/registry/webgl/specs/latest)

## �ָ��ͱ���

- ���л�ͼʱ����ҪƵ������ֵ����ʱ�Ըı����ԣ�����Ҫ��¼����
- ���磺�����л��������ߣ�Ȼ���ô��߻��ơ�����Ҫ�ȱ��棬����ʱ�޸�`lineWidth`
- `save()`������
- `restore()`���ָ�

### `UserAgent`

- ��`canvas`Ԫ�ص�ʵ���߳�Ϊ`User Agent`���`UA`

## ��������

- ���ܷ�����(profiler)
- ʱ����(timeline)

## �����淶

- `canvas`
- ���ڽű��Ķ�ʱ���ƶ���(Timing control for script-based animation)
- `H5`��Ƶ����Ƶ

����`window.setInterval()`��`window.setTimeout()`���������������������������Ҫ�����ܵĶ�����Ӧ��`window.requestAnimationFrame()`

### ����-��̷�ʽ������ֹͣ���ܷ�����

- `console.profile('core H5')` ����
- `console.profileEnd()` ֹͣ

## ʱ�ӳ���Ļ���

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
// ���û����Ŀ��
c.width = 400,
c.height = 400;

let ctx = c.getContext('2d');
// �������
// �����С���߾�
// ָ��ת����
// ʱ��
// ���ּ�ļ��
// �뾶Ϊ��ȥ�߾�ĳ�
// ���ֵĺ�����
const FONT_HEIGHT = 15,
    MARGIN = 35,
    HAND_TRUNCATION = c.width / 25,
    HOUR_HAND_TRUNCATION = c.width / 10,
    NUMERAL_SPACING = 20,
    RADIUS = c.width / 2 - MARGIN,
    HAND_RADIUS = RADIUS + NUMERAL_SPACING;

// ��Բ
function drawCircle() {
    ctx.beginPath();
    // �е���Բ��
    ctx.arc(c.width/2, c.height/2,
            RADIUS, 0, Math.PI * 2,
            true);

    ctx.stroke();
}

// ��̶�
function drawNumerals() {
    let numerals = [1,2,3,4,5,6,7,8,9,10,11,12],
        angle = 0,
        numeralWidth = 0;

    numerals.forEach(numeral => {
        // ƽ��Ϊ2pi/12
        angle = Math.PI/6 * (numeral - 3);
        
        numeralWidth = ctx.measureText(numeral).width;
        // ���ֵ�λ��
        ctx.fillText(numeral,
            c.width/2 + Math.cos(angle) * (HAND_RADIUS) - 
                numeralWidth/2,
            c.height/2 + Math.sin(angle) * (HAND_RADIUS) +
                FONT_HEIGHT/3);
    });
}

// ����Բ�ĵ�СԲ
function drawCenter() {
    ctx.beginPath();
    ctx.arc(c.width/2, c.height/2, 5, 0, Math.PI*2, true);
    ctx.fill();
}

// ��ָ��
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



## �¼�����

- `H5`Ӧ�ó��������¼�������
- `canvas`���ᴦ�������ߴ����¼�

### ����¼�

���ּ�����ʽ��

- `canvas.onmousedown`
- `canvas.addEventListener`

```js
// 1.
canvas.onmousedown = event => {};

// 2.
canvas.addEventListener('mousedown', event => {});
```

- �����¼���`onmousemove, onmouseup, onmouseout`
- ���Ҫע�����������Ļ�����Ҫʹ��`addEventListener`

### ���ת��Ϊ`canvas`����

- `element.getBoundingClientRect()`������Ԫ�صĴ�С����������ӿڵ�λ��

```js
let canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    readout = document.getElementById('readout'),
    spritesheet = new Image();

// function

/* 
    return: {x,y}����
*/
function windowToCanvs(canvas, x, y){
    let bbox = canvas.getBoundingClientRect();

    return {
        x: x - bbox.left * (canvas.width / bbox.width),
        y: y - bbox.top * (canvas.height / bbox.height)
    };
}

/*
    ��������
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
    ��(0,0)��ͼ
*/
function drawSpritesheet() {
    ctx.drawImage(spritesheet, 0, 0);
}

/* 
    ��껭��
 */
function drawGuidelines(x,y){
    ctx.strokeStyle = 'rgba(0,0,230,0.8)';
    ctx.lineWidth = 1;

    drawVerticalLine(x);
    drawHorizontalLine(y);
}

/* 
    ��������
 */
function updateReadout(x,y){
    readout.innerHTML = `(${x.toFixed(0)}, ${y.toFixed(0)})`;
}

/* 
    ������
 */
function drawHorizontalLine(y) {
    ctx.beginPath();
    ctx.moveTo(0,y+0.5);
    ctx.lineTo(ctx.canvas.width, y+0.5);
    ctx.stroke();
}


/* 
    ������
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

#### `x,y`��`clientX, clientY`

- �����Ѿ��ֿ���`clientX, clientY`��ȡ����¼������Ĵ�������

#### ��ֹ����

- ������ֹ�¼�ð�ݣ�`preventDefault()`

### �����¼�

- `canvas`��һ�����ɻ�ȡ�����Ԫ�أ����������¼���������ͽ�͵�
- ��Ҫ�������¼��Ļ���Ӧ����`document`��`window`���������������¼�������

���ּ����¼���

1. `keydown`
2. `keypress`
3. `keyup`

- `keydown, keyup`�ǵײ��¼�
- `keypress`�ڴ���`keyup`�¼�֮ǰ
- ��ԥ�����ֻ������ɴ�ӡ�ַ�ʱ�Żᴥ��`keypress`�¼�����ʹ��`let key = String.fromCharCode(event.which)`��ȡ�ַ�

## ����ͻָ�

- `canvas.save(), canvas.store()`
- `getImageData(), putImageData()`

- `SVG`����ģʽ��ά����ͼ�ζ�����б�
- `canvas`����ģʽ�����̻��ƣ�������

````js
function saveDrawingSurface() {
    drawdingSurfaceImageData = ctx.getImageData(0,0,canvas.width,canvas.height);
}

function restoreDrawingSurface() {
    ctx.putImageData(drawdingSurfaceImageData,0,0);
}
````



## `canvas`��ʹ��`html`Ԫ��

- ʹ��`css`���ؼ�������`canvas`��
- ��`canvas`�淶�У����ȿ���ʹ�����õ�`HTML`�ؼ�������ʹ��`Canvas API`��ͷʵ��

### ���ɼ���`HTML`Ԫ��

- �û��϶����ʱ����̬�޸�`DIV`��С - ��Ƥ��ʽ

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
    ���ܣ�
    0. ѡ����css����Ϊ��ǩ�Ŀ���
    1. ������꽨��ѡ��
    2. ����ѡ����зŴ�
    3. ��ԭͼ�Ļ����Ͻ��зŴ�
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
// ���Կ�Ŀ�ʼ����
function rubberbandStart(x, y){
    mousedown.x = x,
    mousedown.y = y;

    rubberbandRectangle.left = mousedown.x,
    rubberbandRectangle.top = mousedown.y;

    moveRubberbandDiv();
    showRubberbandDiv();
    // ���ѡ��״̬
    dragging = true;
}

// ���Կ���չ
function rubberbandStretch(x, y){
    rubberbandRectangle.left = x < mousedown.x ? x : mousedown.x;
    rubberbandRectangle.top = y < mousedown.y ? y : mousedown.y;

    rubberbandRectangle.width = Math.abs(x - mousedown.x);
    rubberbandRectangle.height = Math.abs(y - mousedown.y);

    moveRubberbandDiv();
    resizeRubberbandDiv();
}

// ���Կ����
function rubberbandEnd() {
    let bbox = canvas.getBoundingClientRect();

    try{
        // ��canvas�Ļ����Ͻ���ͼ��Ļ���
        context.drawImage(canvas,
                        rubberbandRectangle.left - bbox.left,
                        rubberbandRectangle.top - bbox.top,
                        rubberbandRectangle.width,
                        rubberbandRectangle.height,
                        0, 0, canvas.width, canvas.height);
        
    } catch(error){
        console.log('error');
    }

    // ��ͼ�����赯�Կ�����
    resetRubberbandRectangle();

    // ��ǩ������
    rubberbandDiv.style.width = 0,
    rubberbandDiv.style.height = 0;

    // ���ر�ǩ
    hideRubberbandDiv();

    dragging = false;
}

// �ƶ����Կ��ǩ��λ��
function moveRubberbandDiv() {
    rubberbandDiv.style.top = rubberbandRectangle.top + 'px',
    rubberbandDiv.style.left = rubberbandRectangle.left + 'px';
}

// ���Կ��ǩ�Ŀ��
function resizeRubberbandDiv() {
    rubberbandDiv.style.width = rubberbandRectangle.width + 'px',
    rubberbandDiv.style.height = rubberbandRectangle.height + 'px';
}

// չʾ���Կ��ǩ
function showRubberbandDiv() {
    rubberbandDiv.style.display = 'inline';
}

// ���ص��Կ��ǩ
function hideRubberbandDiv() {
    rubberbandDiv.style.display = 'none';
}

// ���赯�Կ�
function resetRubberbandRectangle() {
    rubberbandRectangle = {
        top: 0,
        left: 0,
        width: 0,
        height: 0
    };
}

// Event handlers
// ��canvas�������ʱ�������¼�
// domð��ʱȡ������ֹ������canvas��ʱ��������
canvas.onmousedown = function(e) {
    let x = e.clientX - 5,
        y = e.clientY - 5;

    e.preventDefault();
    rubberbandStart(x, y);
}

// ����ƶ�ʱ��ѡ��ʼ��չ
window.onmousemove = function(event) {
    let x = event.clientX,
        y = event.clientY;

    event.preventDefault();

    if(dragging){
        rubberbandStretch(x, y);
    }
}

// �ſ����
window.onmouseup = function(event) {
    event.preventDefault();

    rubberbandEnd();
}

// ͼ�����
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



## ��ӡ`canvas`

- `toDataURL()`������`canvas`�����ݵ�ַ
- `toBlob()`��������`blob`�ļ���

```js
let dataUrl = canvas.toDataURL(),
    img = new Image();
img.src = dataUrl;
```

## ����`canvas`

- ͨ��ʹ��`toDataURL()`������ַ��ֵ��`img`��ǩ��`src`����

```html
<img id="snap" />
```

```js
let snap = document.getElementById('snap');
snap.src = canvas.toDataURL();
```

## ��������

- ��ά���������򡢴�С

## ͨ����չ`CanvasRenderingContext2D`����������

- ��������`lineTo()`��`dashedLineTo()`����
- ��Ҫ�ѵ��ǻ�ȡ`moveTo()`�����λ�ò���

```js
let canvas = document.createElement('canvas');
canvas.id = 'canvas';
document.body.appendChild(canvas);

let context = document.getElementById('canvas').getContext('2d');

// ԭ����������
// �̳�moveTo
let moveToFunction = CanvasRenderingContext2D.prototype.moveTo;

// �ϴε�λ��
CanvasRenderingContext2D.prototype.lastMoveToLocation = {};

// �̳в���������
// ��¼λ��
CanvasRenderingContext2D.prototype.moveTo = function(x, y){
    moveToFunction.apply(context, [x, y]);

    this.lastMoveToLocation.x = x;
    this.lastMoveToLocation.y = y;
};

// ���Ƶ�
// dashLength��ָ�����ߵĳ���
CanvasRenderingContext2D.prototype.dashedLineTo = function (x, y, dashLength) {
    dashLength = dashLength || 5;

    let startX = this.lastMoveToLocation.x,
        startY = this.lastMoveToLocation.y;

    // �������ĳ���
    let deltaX = x - startX,
        deltaY = y - startY;

    // ��ȡ�߶������ߵĸ���
    let numDashes = Math.floor(Math.sqrt(deltaX * deltaX + deltaY * deltaY) / dashLength);

    // ����������ÿ���ƶ��㲢���ƶ��߶�
    for(let i = 0; i < numDashes; i++){
        this[i%2 === 0 ? 'moveTo' : 'lineTo']
            (startX + (deltaX / numDashes) * i,
                startY + (deltaY / numDashes) * i);
    }
    // �������ĵ�
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

## �߼�·������

- `pointInPath()`�����ĳ���ڵ�ǰ·���У�����`true`

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

// ��������
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

// ѡ����λ��
function windowToCanvas(x, y) {
   var bbox = canvas.getBoundingClientRect();
   return { x: x - bbox.left * (canvas.width  / bbox.width),
            y: y - bbox.top  * (canvas.height / bbox.height)
          };
}

// Save and restore drawing surface...................................
// ��ȡcanvas�Ѿ����Ƶ�ͼ
function saveDrawingSurface() {
   drawingSurfaceImageData = context.getImageData(0, 0,
                             canvas.width,
                             canvas.height);
}

// �������ͼ��ָ�
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
// ѡ���
function updateRubberbandRectangle(loc) {
   rubberbandRect.width = Math.abs(loc.x - mousedown.x);
   rubberbandRect.height = Math.abs(loc.y - mousedown.y);

   if (loc.x > mousedown.x) rubberbandRect.left = mousedown.x;
   else                     rubberbandRect.left = loc.x;

   if (loc.y > mousedown.y) rubberbandRect.top = mousedown.y;
   else                     rubberbandRect.top = loc.y;
} 

// ѡ������״
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

// ����
function updateRubberband(loc, sides, startAngle) {
   updateRubberbandRectangle(loc);
   drawRubberbandShape(loc, sides, startAngle);
}

// Guidewires.........................................................
// ����ѡ��Ĳ�ͬ�����Ʋ�ͬ��ͼ��
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
// ����ѡ��
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

# 2. �ı�

## ʵ���ı��༭�ؼ�

### ָʾ�ı�����λ�õĹ��









***

[01]:./img/0-canvasbg.png "0-canvasbg.png"
[02]: ./img/0-rubberband.png "0-rubber"
[03]: ./img/1-rubberband.png "1-rubber"

