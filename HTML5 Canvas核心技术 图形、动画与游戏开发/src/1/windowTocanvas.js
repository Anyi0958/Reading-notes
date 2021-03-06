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