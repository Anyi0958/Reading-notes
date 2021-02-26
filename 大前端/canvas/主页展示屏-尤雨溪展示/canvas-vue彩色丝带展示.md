canvas-vue��ɫ˿��չʾ Ŀ¼
[TOC]
***

# ǰ��

- ���ص��ڣ�λ�õ�ѡ���ɫ�ʵ�ѡ��

# �Ƽ��Ķ�

- [����������������ǲ�������С̸EvanYou������ҳ��ʵ��](https://zhuanlan.zhihu.com/p/28257724 "��ɫ˿��")
- [Evan You](https://evanyou.me/ "Evan You")

# ԭ�����

- ������ѧ

```html
<canvas></canvas>
<script>
// �¼��Ķ���
// ���ʹ�ô�������������ʱ��������ֹ�¼�����
document.addEventListener('touchmove', event => event.preventDefault());

// ��ȡcanvas������󣬲����л������õĸ�ֵ
var c = document.getElementsByTagName('canvas')[0],
    x = c.getContext('2d'),
    pr = window.devicePixelRatio || 1,
    w = window.innerWidth,
    h = window.innerHeight,
    f = 90,
    q,
    m = Math,
    r = 0,
    u = m.PI*2,
    v = m.cos,
    z = m.random

// canvas����ĳ�������
c.width = w*pr
c.height = h*pr

// �Ի���������ݽ��зŴ�
x.scale(pr, pr)
// ͼ��͸��������
x.globalAlpha = 0.6

// ������ռ乩��ͼʹ��
function i(){
    x.clearRect(0,0,w,h)
    //�����ε���ʼ����
    // fΪ��ʼֵ
    q=[{x:0,y:h*.7+f},{x:0,y:h*.7-f}]
    //�ڶ��������εĺ������ڷ�Χ�ڣ��Ϳ�ʼ��ͼ
    while(q[1].x<w+f) d(q[0], q[1])
}

function d(i,j){   
    // ��ʼ�滭
    x.beginPath()
    // ����������
    x.moveTo(i.x, i.y)
    x.lineTo(j.x, j.y)

    // ��ȡ��3������
    var k = j.x + (z()*2-0.25)*f,
        n = y(j.y)
    x.lineTo(k, n)
    x.closePath()
    r-=u/-50
    x.fillStyle = '#'+(v(r)*127+128<<16 | v(r+u/3)*127+128<<8 | v(r+u/3*2)*127+128).toString(16)
    x.fill()
    q[0] = q[1]
    q[1] = {x:k,y:n}
}

function y(p){
    var t = p + (z()*2-1.1)*f
    return (t>h||t<0) ? y(p) : t
}

document.onclick = i
document.ontouchstart = i
i()

</script>
```

# ���ð汾

- ���ϸ���ʹ��ϰ��

```html
<canvas></canvas>
<script>
document.addEventListener('touchmove', event => event.preventDefault());

let ctx = document.getElementsByTagName('canvas')[0],
    c = ctx.getContext('2d'),
    basePixel = window.devicePixelRatio || 1,
    width = window.innerWidth,
    height = window.innerHeight,
    startOffset = 90,
    coordinateArr,
    startRadius = 0,
    radius = Math.PI * 2;
    
ctx.width = width * basePixel,
ctx.height = height * basePixel;

c.scale(basePixel, basePixel),
c.globalAlpha = 0.6;

// �¼�����
// ����ػ���϶��ػ�
document.onclick = initialPotray;
document.ontouchstart = initialPotray;
// ���û���¼���������ʼ����
initialPotray();

function initialPotray(){
    c.clearRect(0,0,width,height);
    // first
    // ����0.7height��λ�öԳ�
    coordinateArr = [    
        {x:0, y: height * .7 + startOffset},
        {x:0, y: height * .7 - startOffset}
    ];
    // �����һ�����ܳ�ȥ�������������С
    while(coordinateArr[1].x < width + startOffset) drawTraingleImage(coordinateArr[0],coordinateArr[1]);
}

function drawTraingleImage(coor1,coor2){
    c.beginPath();
    c.moveTo(coor1.x, coor1.y);
    c.lineTo(coor2.x, coor2.y);
    // xȡֵ��x2+[-22.5,157.5]��������ڿ�ȣ�����ѭ��
    // y��y2+[-22.5,157.5]֮�䣬������ڸ߶ȣ����³�ȡ
    let coor3 = {
        x: coor2.x + (Math.random()*2 - 0.25) * startOffset,
        y: reCalculate(coor2.y)
    };

    c.lineTo(coor3.x, coor3.y);
    c.closePath();

    startRadius -= radius / -50;
    // RGBת��
    // �������ֿɸ�
    c.fillStyle = '#' + (
        Math.cos(startRadius)*127 + 128<<16 |
        Math.cos(startRadius + radius/3)*127 + 128<<8 |
        Math.cos(startRadius + radius/3 * 2)*127 + 128
    ).toString(16);

    c.fill();

    // ��������
    coordinateArr[0] = coordinateArr[1],
    coordinateArr[1] = coor3;
}

function reCalculate(yNum){
    let tmp = yNum + (Math.random()*2 - 1.1) * startOffset;
    return (tmp > height || tmp < 0) ? reCalculate(yNum) : tmp;
}

</script>
```

# ���չʾ

![Ч��ͼ][01]

***

[01]:Ч��ͼ.png "Ч��ͼ"

