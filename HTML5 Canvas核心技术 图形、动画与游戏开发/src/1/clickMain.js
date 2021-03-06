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