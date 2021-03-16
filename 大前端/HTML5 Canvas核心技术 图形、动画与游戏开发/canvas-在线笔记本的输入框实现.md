canvas-在线笔记本的输入框实现 目录
[TOC]
***

# 前言

- 目前只实现了文本框的输入和更改

缺乏：

1. 已输入文本框的定位和内容更改
2. 插入和保存图片
3. 保存笔记
4. `Markdown`长文本转换
5. 导出多格式
6. `websocket`聊天室

# 推荐阅读

- 《HTML5 canvas》

# 效果展现

![image-20210316202000319](.\img\0-canvasText.png)

# 代码实现

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Paragraphs</title>

    <style>
      body {
         background: #eeeeee;
      }

      #fontSelectDiv {
         position: absolute;
         left: 20px;
         top: 20px;
      }

      #canvas {
         background: #ffffff;
         cursor: text;
         margin-left: 10px;
         margin-top: 10px;
         -webkit-box-shadow: 4px 4px 8px rgba(0,0,0,0.5);
         -moz-box-shadow: 4px 4px 8px rgba(0,0,0,0.5);
         box-shadow: 4px 4px 8px rgba(0,0,0,0.5);
      }
    </style>
  </head>

   <body>
      <canvas id='canvas' width='850' height='500'>
         Canvas not supported
      </canvas>

      <div id='fontSelectDiv'>
         Font: <select id='fontSelect'>
                  <option value='Arial'>Arial</option>
                  <option value='Comic Sans' selected>Comic Sans</option>
                  <option value='Lucida Sans'>Lucida Sans</option>
                  <option value='Helvetica'>Helvetica</option>
                  <option value='Palatino'>Palatino</option>
               </select>

         Size: <select id='sizeSelect'>
                  <option value='32'>32 px</option>
                  <option value='48' selected>48 px</option>
                  <option value='64'>64 px</option>
                  <option value='128'>128 px</option>
               </select>

          Text stroke color: <select id='strokeStyleSelect'>
                  <option value='red'>red</option>
                  <option value='green'>green</option>
                  <option value='blue'>blue</option>
                  <option value='orange'>orange</option>
                  <option value='cornflowerblue'>cornflowerblue</option>
                  <option value='goldenrod'>goldenrod</option>
                  <option value='navy' selected>navy</option>
                  <option value='purple'>purple</option>
               </select>

       Text fill color: <select id='fillStyleSelect'>
                  <option value='rgba(255,0,0,0.5)'>semi-transparent red</option>
                  <option value='green'>green</option>
                  <option value='rgba(0,0,255,0.5)'>semi-transparent blue</option>
                  <option value='orange'>orange</option>
                  <option value='rgba(100,140,230,0.5)'>semi-transparent cornflowerblue</option>
                  <option value='rgba(218,165,32,0.5)' selected>semi-transparent goldenrod</option>
                  <option value='navy'>navy</option>
                  <option value='purple'>purple</option>
               </select>

         Fill: <input id='fillCheckbox' type='checkbox' checked/>
      </div>
      
    <script src = 'text.js'></script>
    <script src = 'example.js'></script>
  </body>
</html>

```

```js
//text.js
// Cursor.........................................................

TextCursor = function (fillStyle, width) {
    this.fillStyle   = fillStyle || 'rgba(0, 0, 0, 0.7)';
    this.width       = width || 2;
    this.left        = 0;
    this.top         = 0;
 };
 
 TextCursor.prototype = {
    getHeight: function (context) {
       var w = context.measureText('W').width;
       return w + w/6;
    },
       
    createPath: function (context) {
       context.beginPath();
       context.rect(this.left, this.top,
                    this.width, this.getHeight(context));
    },
    
    draw: function (context, left, bottom) {
       context.save();
 
       this.left = left;
       this.top = bottom - this.getHeight(context);
 
       this.createPath(context);
 
       context.fillStyle = this.fillStyle;
       context.fill();
          
       context.restore();
    },
 
    erase: function (context, imageData) {
       context.putImageData(imageData, 0, 0,
          this.left, this.top,
          this.width, this.getHeight(context));
    }
 };
 
 // Text lines.....................................................
 
 TextLine = function (x, y) {
    this.text = '';
    this.left = x;
    this.bottom = y;
    this.caret = 0;
 };
 
 TextLine.prototype = {
    insert: function (text) {
       var first = this.text.slice(0, this.caret),
           last = this.text.slice(this.caret);
 
       first += text;
       this.text = first;
       this.text += last;
       this.caret += text.length;
    },
 
    getCaretX: function (context) {
       var s = this.text.substring(0, this.caret),
           w = context.measureText(s).width;
 
       return this.left + w;
    },
    
    removeCharacterBeforeCaret: function () {
       if (this.caret === 0)
          return;
 
       this.text = this.text.substring(0, this.caret-1) +
                   this.text.substring(this.caret); 
 
       this.caret--;
    },
 
    removeLastCharacter: function () {
       this.text = this.text.slice(0, -1);
    },
 
    getWidth: function(context) {
       return context.measureText(this.text).width;
    },
 
    getHeight: function (context) {
       var h = context.measureText('W').width;
       return h + h/6;
    },
    
    draw: function(context) {
       context.save();
       context.textAlign = 'start';
       context.textBaseline = 'bottom';
        
       context.strokeText(this.text, this.left, this.bottom);
       context.fillText(this.text, this.left, this.bottom);
 
       context.restore();
    },
 
    erase: function (context, imageData) {
       context.putImageData(imageData, 0, 0);
    }
 };
 
 // Paragraphs.....................................................
 
 Paragraph = function (context, left, top, imageData, cursor) {
    this.context = context;
    this.drawingSurface = imageData;
    this.left = left;
    this.top = top;
    this.lines = [];
    this.activeLine = undefined;
    this.cursor = cursor;
    this.blinkingInterval = undefined;
 };
 
 Paragraph.prototype = {
    isPointInside: function (loc) {
       var c = this.context;
 
       c.beginPath();
       c.rect(this.left, this.top, 
              this.getWidth(), this.getHeight());
 
       return c.isPointInPath(loc.x, loc.y);
    },
    
    getHeight: function () {
       var h = 0;
 
       this.lines.forEach( function (line) {
          h += line.getHeight(this.context); 
       });
 
       return h;
    },
    
    getWidth: function () {
       var w = 0,
           widest = 0;
 
       this.lines.forEach( function (line) {
          w = line.getWidth(this.context); 
          if (w > widest) {
             widest = w;
          }
       });
 
       return widest;
    },
 
    draw: function () {
       this.lines.forEach( function (line) {
          line.draw(this.context);
       });
    },
 
    erase: function (context, imageData) {
       context.putImageData(imageData, 0, 0);
    },
    
    addLine: function (line) {
       this.lines.push(line);
       this.activeLine = line;
       this.moveCursor(line.left, line.bottom);
    },
 
    insert: function (text) {
      this.erase(this.context, this.drawingSurface);
      this.activeLine.insert(text);
 
      var t = this.activeLine.text.substring(0, this.activeLine.caret),
          w = this.context.measureText(t).width;
       
      this.moveCursor(this.activeLine.left + w,
                      this.activeLine.bottom);
 
      this.draw(this.context);
    },
 
    blinkCursor: function (x, y) {
       var self = this,
           BLINK_OUT = 200,
           BLINK_INTERVAL = 900;
 
       this.blinkingInterval = setInterval( function (e) {
          cursor.erase(context, self.drawingSurface);
       
          setTimeout( function (e) {
             cursor.draw(context, cursor.left,
                         cursor.top + cursor.getHeight(context));
          }, BLINK_OUT);
       }, BLINK_INTERVAL);
    },
 
    moveCursorCloseTo: function (x, y) {
       var line = this.getLine(y);
 
       if (line) {
          line.caret = this.getColumn(line, x);
          this.activeLine = line;
          this.moveCursor(line.getCaretX(context),
                          line.bottom);
       }
    },
    
    moveCursor: function (x, y) {
       this.cursor.erase(this.context, this.drawingSurface);
       this.cursor.draw(this.context, x, y);
 
       if ( ! this.blinkingInterval)
          this.blinkCursor(x, y);
    },
 
    moveLinesDown: function (start) {
       for (var i=start; i < this.lines.length; ++i) {
          line = this.lines[i];
          line.bottom += line.getHeight(this.context);
       }
    },
    
    newline: function () {
       var textBeforeCursor = this.activeLine.text.substring(0, this.activeLine.caret),
           textAfterCursor = this.activeLine.text.substring(this.activeLine.caret),
           height = this.context.measureText('W').width +
                    this.context.measureText('W').width/6,
           bottom  = this.activeLine.bottom + height,
           activeIndex,
           line;
 
       this.erase(this.context, this.drawingSurface);     // Erase paragraph
       this.activeLine.text = textBeforeCursor;           // Set active line's text
 
       line = new TextLine(this.activeLine.left, bottom); // Create a new line
       line.insert(textAfterCursor);                      // containing text after cursor
 
       activeIndex = this.lines.indexOf(this.activeLine); // Splice in new line
       this.lines.splice(activeIndex+1, 0, line);
 
       this.activeLine = line;                            // New line is active with
       this.activeLine.caret = 0;                         // caret at first character
 
       activeIndex = this.lines.indexOf(this.activeLine); // Starting at the new line...
 
       for(var i=activeIndex+1; i < this.lines.length; ++i) { //...loop over remaining lines
          line = this.lines[i];
          line.bottom += height; // move line down one row
       }
 
       this.draw();
       this.cursor.draw(this.context, this.activeLine.left, this.activeLine.bottom);
    },
 
    getLine: function (y) {
       var line;
       
       for (i=0; i < this.lines.length; ++i) {
          line = this.lines[i];
          if (y > line.bottom - line.getHeight(context) &&
              y < line.bottom) {
             return line;
          }
       }
       return undefined;
    },
 
    getColumn: function (line, x) {
       var found = false,
           before,
           after,
           closest,
           tmpLine,
           column;
 
       tmpLine = new TextLine(line.left, line.bottom);
       tmpLine.insert(line.text);
          
       while ( ! found && tmpLine.text.length > 0) {
          before = tmpLine.left + tmpLine.getWidth(context);
          tmpLine.removeLastCharacter();
          after = tmpLine.left + tmpLine.getWidth(context);
             
          if (after < x) {
             closest = x - after < before - x ? after : before;
             column = closest === before ?
                      tmpLine.text.length + 1 : tmpLine.text.length;
             found = true;
          }
       }
       return column;
    },
 
    activeLineIsOutOfText: function () {
       return this.activeLine.text.length === 0;
    },
 
    activeLineIsTopLine: function () {
       return this.lines[0] === this.activeLine;
    },
 
    moveUpOneLine: function () {
       var lastActiveText, line, before, after;
       
       lastActiveLine = this.activeLine;
       lastActiveText = '' + lastActiveLine.text;
             
       activeIndex = this.lines.indexOf(this.activeLine);
       this.activeLine = this.lines[activeIndex - 1];
       this.activeLine.caret = this.activeLine.text.length;
 
       this.lines.splice(activeIndex, 1);
             
       this.moveCursor(
          this.activeLine.left + this.activeLine.getWidth(this.context),
          this.activeLine.bottom);
 
       this.activeLine.text += lastActiveText;
 
       for (var i=activeIndex; i < this.lines.length; ++i) {
          line = this.lines[i];
          line.bottom -= line.getHeight(this.context);
       }
    },
 
    backspace: function () {
       var lastActiveLine,
           activeIndex,
           t, w;
 
       this.context.save();
 
       if (this.activeLine.caret === 0) {
          if ( ! this.activeLineIsTopLine()) {
             this.erase(this.context, this.drawingSurface);
             this.moveUpOneLine();
             this.draw();
          }
       }
       else {  // active line has text
         this.context.fillStyle = fillStyleSelect.value;
          this.context.strokeStyle = strokeStyleSelect.value;
 
          this.erase(this.context, this.drawingSurface);
          this.activeLine.removeCharacterBeforeCaret();
 
          t = this.activeLine.text.slice(0, this.activeLine.caret),
          w = this.context.measureText(t).width;
       
          this.moveCursor(this.activeLine.left + w,
                      this.activeLine.bottom);
 
          this.draw(this.context);
 
          context.restore();
       }
    }
 };
 
```

```js
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

```

