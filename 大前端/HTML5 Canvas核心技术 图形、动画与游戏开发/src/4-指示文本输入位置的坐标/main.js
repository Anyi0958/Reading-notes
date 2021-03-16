// 获取select框的值
let canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),

    fontSelect = document.getElementById('fontSelect'),
    sizeSelect = document.getElementById('sizeSelect'),
    strokeStyleSelect = document.getElementById('strokeStyleSelect'),
    fillStyleSelect = document.getElementById('fillStyleSelect');

// 网格的基本设定: 线条格式、横纵间隔
const GRID_STROKE_STYLE = 'lightgray',
    GRID_HORIZONTAL_SPACING = 10,
    GRID_VERTICAL_SPACING = 10;

let drawingSurfaceImageData,
    cursor = new TextCursor(),
    paragraph;

// General-purpose functions.....................................

// 背景方格线
function drawBackground() {
   var STEP_Y = 12,
       i = context.canvas.height;
   
   context.strokeStyle = 'rgba(0,0,200,0.225)';
   context.lineWidth = 0.5;

   context.save();
   context.restore();

    // 绘制横线
   while(i > STEP_Y*4) {
      context.beginPath();
      context.moveTo(0, i);
      context.lineTo(context.canvas.width, i);
      context.stroke();
      i -= STEP_Y;
   }

   context.save();

   context.strokeStyle = 'rgba(100,0,0,0.3)';
   context.lineWidth = 1;

   context.beginPath();
    // 绘制红头纵线
   context.moveTo(35,0);
   context.lineTo(35,context.canvas.height);
   context.stroke();

   context.restore();
}

// 建立文本框
function windowToCanvas(canvas, x, y) {
   var bbox = canvas.getBoundingClientRect();

   return { 
        x: x - bbox.left * (canvas.width  / bbox.width),
        y: y - bbox.top  * (canvas.height / bbox.height)
    };
}

// Drawing surface...............................................
// 保存canvas图像数据
function saveDrawingSurface() {
   drawingSurfaceImageData = context.getImageData(0, 0,
                             canvas.width,
                             canvas.height);
}

// Text..........................................................
// 设置文本的字体大小
function setFont() {
   context.font = sizeSelect.value + 'px ' + fontSelect.value;
}

// Event handlers................................................
// 在canvas上按下鼠标键
canvas.onmousedown = function (e) {
   var loc = windowToCanvas(canvas, e.clientX, e.clientY),
       fontHeight,
       line;

   cursor.erase(context, drawingSurfaceImageData);
   saveDrawingSurface();

   if (paragraph && paragraph.isPointInside(loc)) {
      paragraph.moveCursorCloseTo(loc.x, loc.y);
   }
   else {
      fontHeight = context.measureText('W').width,
      fontHeight += fontHeight/6;

      paragraph = new Paragraph(context, loc.x, loc.y - fontHeight,
                               drawingSurfaceImageData,
                               cursor);

      paragraph.addLine(new TextLine(loc.x, loc.y));
   }
};

fillStyleSelect.onchange = function (e) {
   cursor.fillStyle = fillStyleSelect.value;
}

strokeStyleSelect.onchange = function (e) {
   cursor.strokeStyle = strokeStyleSelect.value;
}

// Key event handlers............................................

document.onkeydown = function (e) {
   if (e.keyCode === 8 || e.keyCode === 13) {
      // The call to e.preventDefault() suppresses
      // the browser's subsequent call to document.onkeypress(),
      // so only suppress that call for backspace and enter.
      e.preventDefault();
   }
   
   if (e.keyCode === 8) {  // backspace
      paragraph.backspace();
   }
   else if (e.keyCode === 13) { // enter
      paragraph.newline();
   }
}
   
document.onkeypress = function (e) {
   var key = String.fromCharCode(e.which);

   // Only process if user is editing text
   // and they aren't holding down the CTRL
   // or META keys.

   if (e.keyCode !== 8 && !e.ctrlKey && !e.metaKey) {
     e.preventDefault(); // no further browser processing

     context.fillStyle = fillStyleSelect.value;
     context.strokeStyle = strokeStyleSelect.value;

     paragraph.insert(key);
   }
}

// Initialization................................................

fontSelect.onchange = setFont;
sizeSelect.onchange = setFont;

cursor.fillStyle = fillStyleSelect.value;
cursor.strokeStyle = strokeStyleSelect.value;

context.lineWidth = 2.0;
setFont();

drawBackground();
saveDrawingSurface();
