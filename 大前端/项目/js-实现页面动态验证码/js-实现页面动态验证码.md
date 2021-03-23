js-ǰ��ʵ��ҳ�涯̬��֤�� Ŀ¼
[TOC]


***

# ǰ��

- ǰ��ʵ����֤������

# �Ƽ��Ķ�

- [JS-ʵ��ҳ�涯̬��֤��](https://blog.csdn.net/dkm123456/article/details/114990229)

# ��Ŀ˼·

1. ͨ��`ASCII`�õ�4������ַ�
2. ��Ⱦ��֤��
3. ��Ӹ�����
4. ��֤��Ʒ

# 1. ��������ַ�

```js
// ��ȡ����ַ�
let randomStr = function(length){
    let indexRange = [48,57,65,90,97,122];
    let result = [];
    this.randomStr;

    for(let i = 0; i < length; i++){
        switch(Math.floor(Math.random()*3+0)){
            case 0:
                result.push(Math.floor(
                    Math.random()*(indexRange[1]-indexRange[0]+1)+indexRange[0])
                    );
                break;
            case 1:
                result.push(Math.floor(
                    Math.random()*(indexRange[3]-indexRange[2]+1)+indexRange[2])
                );
                break;
            case 2:
                result.push(Math.floor(
                    Math.random()*(indexRange[5]-indexRange[4]+1)+indexRange[4]
                ));
        }
    }

    this.randomStr = result.map(val => String.fromCharCode(val));
    console.log(this.randomStr);
}

randomStr.prototype.drawText = function(bgContext) {
    let textWidth = 40;
    let ctx = bgContext;
    this.randomStr.forEach((val,index) => {
        let x = ctx.width / (this.randomStr.length - index) - textWidth;
        // console.log(Math.floor(x));
        // console.log(val);
        let text = new Text(val, {
            x: Math.floor(x),
            y: textWidth - 10,
            text: val,
            fillStyle: '#412D6A'            
        });

        text.render(ctx);
    });
}

// ��������
let Text = function(text, obj, font = "40px Arial", 
                    textAlign = "center", 
                    fillStyle = "#0000ff") {
    this.x = 0,
    this.y = 0,

    this.text = text || 'none',
    this.font = font,
    this.textAlign = textAlign;
    this.fillStyle = fillStyle;

    // this.str = new Set();
    this.assignStr(obj);
};

Text.prototype.assignStr = function(obj) {
    for(let key in obj) {
        this[key] = obj[key];
    }
}

// para:    canvas��������
Text.prototype.render = function(bgContext) {
    let ctx = bgContext;

    ctx.save();
    ctx.beginPath();
    ctx.translate(this.x, this.y);

    ctx.font = this.font || "40px Arial";
    ctx.textAlign = this.textAlign || "center";
    ctx.fillStyle = this.fillStyle || "#0000ff";

    // ctx.fillText = this.text || "û�������ı�";
    ctx.fillText(this.text,this.x, this.y);
    console.log(this.x);
    return this;
}

// ��������߶�
let Line = function(bgContext,obj,thin = false){
    this.x = 0,
    this.y = 0,

    this.startX = 0,
    this.startY = 0,

    this.endX = 0,
    this.endY = 0;

    this.thin = thin;
    this.ctx = bgContext;

    this.init(obj);
};

Line.prototype.init = function(obj) {
    for(let key in obj) {
        this[key] = obj[key];
    }
};

Line.prototype.render = function() {
    let ctx = this.ctx;

    ctx.save();
    ctx.beginPath();

    ctx.translate(this.x, this.y);

    ctx.thin ? ctx.translate(0.5,0.5) : null;

    ctx.lineWidth = this.lineWidth || '2px';
    ctx.strokeStyle = this.strokeStyle || '#0000ff';

    ctx.moveTo(this.startX, this.startY);
    ctx.lineTo(this.endX, this.endY);

    ctx.stroke();
    ctx.restore();

    return this;
}

// ����
let canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');

    context.width = 800,
    context.height = 800;
console.log(context.width);
let test = new randomStr(4);
test.drawText(context);
```

