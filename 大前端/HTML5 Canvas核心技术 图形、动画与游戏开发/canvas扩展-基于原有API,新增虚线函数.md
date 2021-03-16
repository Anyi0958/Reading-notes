canvas��չ-����ԭ��API,�������ߺ��� Ŀ¼
[TOC]
***

# ǰ��

- ��ԭ����`canvas API`�޷���������ʱ����`CanvasRenderingContext2D`���й�����չ
- ����Ϊ���ӻ������ߺ���

# ����չʾ

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

# ���չʾ

![image-20210314150940392](.\img\0-dashedline.png)

