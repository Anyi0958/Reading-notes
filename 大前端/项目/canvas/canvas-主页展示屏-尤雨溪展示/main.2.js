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

// 事件调用
// 点击重绘和拖动重绘
document.onclick = initialPotray;
document.ontouchstart = initialPotray;
// 如果没有事件发生，初始绘制
initialPotray();

function initialPotray(){
    c.clearRect(0,0,width,height);
    // first
    // 基于0.7height的位置对称
    coordinateArr = [    
        {x:0, y: height * .7 + startOffset},
        {x:0, y: height * .7 - startOffset}
    ];
    // 让最后一个点跑出去，不至于最后狭小
    while(coordinateArr[1].x < width + startOffset) drawTraingleImage(coordinateArr[0],coordinateArr[1]);
}

function drawTraingleImage(coor1,coor2){
    c.beginPath();
    c.moveTo(coor1.x, coor1.y);
    c.lineTo(coor2.x, coor2.y);
    // x取值在x2+[-22.5,157.5]，如果大于宽度，跳出循环
    // y在y2+[-22.5,157.5]之间，如果大于高度，重新抽取
    let coor3 = {
        x: coor2.x + (Math.random()*2 - 0.25) * startOffset,
        y: reCalculate(coor2.y)
    };

    c.lineTo(coor3.x, coor3.y);
    c.closePath();

    startRadius -= radius / -50;
    // RGB转换
    // 内容数字可改
    c.fillStyle = '#' + (
        Math.cos(startRadius)*127 + 128<<16 |
        Math.cos(startRadius + radius/3)*127 + 128<<8 |
        Math.cos(startRadius + radius/3 * 2)*127 + 128
    ).toString(16);

    c.fill();

    // 更换坐标
    coordinateArr[0] = coordinateArr[1],
    coordinateArr[1] = coor3;
}

function reCalculate(yNum){
    let tmp = yNum + (Math.random()*2 - 1.1) * startOffset;
    return (tmp > height || tmp < 0) ? reCalculate(yNum) : tmp;
}
