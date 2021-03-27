canvas-���������Ч Ŀ¼
[TOC]
***

# ǰ��

- `canvas`ʵ��ǰ�˵���Ч����

# ���չʾ

![01][01]

![02][02]

# ����

## `html`

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
    <script src="./main.js"></script>
</body>
</html>
```

## `main.js`

```js
/*          
*���ӻ��๹��
    *�๦�ܣ�
    *1.��ʼ���������������涨�������Եȣ�
    *2.����ͼ���ҽ��л��� 
    *3.������ɫ����
    *4.�����ƶ���ƫ��Ƕ�
*/

// ��������
let Particle = function(context, options){
    let random = Math.random();
    this.context = context;
    // �ڻ������x����
    this.x = options.x;
    // �ڻ������y����
    this.y = options.y;
    // ȡ�������1/2���ԽǶȽ�������Ŵ�
    this.s = 0.5 + Math.random();
    // this.s = 1 + Math.random();
    // �����˶��ı仯�Ƕ�
    this.a = 0;
    // ���
    this.w = window.innerWidth;
    // �߶�
    this.h = window.innerHeight;
    // �뾶
    this.radius = options.radius || 0.5 + Math.random() * 10;
    // ��ɫ
    this.color = options.color || "#E5483F";
    // console.log(this.color);
    // ָ��3�����ã�
    // ������ӵİ뾶����0.5,�����µ����ӡ�
    setTimeout(function(){
        if(this.radius > 0.5){
            particles.push(
                new Particle(context, {
                  x: this.x,
                  y: this.y,
                  color: this.radius / 2 > 1 ? "#d6433b" : "#FFFFFF",
                  radius: this.radius / 2.2 })
            );
        }
    }.call(Particle), 3000);
};

// ��Ⱦͼ��
Particle.prototype.render = function() {
        //��(0,0)��ʼ�µ�·����
        this.context.beginPath();
        // �������߻�
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        // ��ͼ���������
        this.context.lineWidth = 2;
        //��ɫ��� 
        this.context.fillStyle = this.color;
        // ��䵱ǰͼ���·��
        this.context.fill();
        // ���س�ʼ��,���һ�����������ʼλ��
        this.context.closePath();
};

Particle.prototype.swapColor = function() {
    // �ų���ɫ
    if (this.color != "#FFFFFF") {
        // �ж����ҽ���,���Ҹ���ɫ��ֵ
        if (this.x < this.w / 2) {
            // ����
            this.color = "#36fcfa";            
        } else {
            // �Ұ��
            this.color = "#E5483F";            
        }
        }
    
};

Particle.prototype.move = function() {
    // ��ɫ����
    this.swapColor();

    // �����갴��cos�ǶȽ��б任�����Ҷ������������Ŵ�
    // ƫ��Ƕ��Ա��������ֿ�
    this.x += Math.cos(this.a) * this.s;
    this.y += Math.sin(this.a) * this.s;

    // this.y += Math.cos(this.a) * this.s;
    // this.x += Math.sin(this.a) * this.s;
    // �ڱ仯�󣬶�����ǶȽ�������ȡ��
    this.a += Math.random() * 0.8 - 0.4;

    // �ж�ȫΪ0�����Ӻ��������ƶ���
    if (this.x < 0 || this.x > this.w - this.radius) {
      return false;
    }
    // �������������ƶ���
    if (this.y < 0 || this.y > this.h - this.radius) {
      return false;
    }

    // ���»���ͼ��
    this.render();

    return true;  
};


let canvas = document.createElement('canvas');
canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 30;
document.body.insertBefore(canvas, null);
let context = canvas.getContext('2d');

const conf = {
    frequency: 50,
    x: canvas.width,
    y: canvas.height
};

let particles = [],
    frequency = conf.frequency;

setInterval(function(){
    popolate();
}.bind(null), frequency);

function popolate(){
    particles.push(
        new Particle(context, {
          x: conf.x / 2,
          y: conf.y / 2
        })
    );

    return particles.length;
}

function clear() {
    context.globalAlpha = 0.04;
    context.fillStyle = '#000042';
    context.fillRect(0,0,canvas.width, canvas.height);
    context.globalAlpha = 1;
}

function update(){
    particles = particles.filter(p => p.move());
    clear();
    requestAnimationFrame(arguments.callee);
}

update();
```

***

[01]:./img/0-anime.gif
[02]: ./img/1-particles.png

