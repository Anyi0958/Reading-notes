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

### ���ɼ���`HTML`Ԫ��

- �û��϶����ʱ����̬�޸�`DIV`��С - ��Ƥ��ʽ















***

[01]:./img/0-canvasbg.png "0-canvasbg.png"