canvas-ʵ�ַŴ�Ч�� Ŀ¼
[TOC]
***

# ǰ��

- ����Ϊ`canvas`ʵ�ַŴ�
- �߼��򵥣��ʺ���Ϊ������Ŀ����

# �Ƽ��Ķ�

- ��H5 canvas���ļ�����

# ����չʾ

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

# ���չʾ

![image-20210314000727732](.\img\0-rubberband.png)

![image-20210314000810585](.\img\1-rubberband.png)

