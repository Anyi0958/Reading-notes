canvas-简易画图应用程序,计算机绘图辅助程序 目录
[TOC]
***

# 前言

- 此文为基于`canvas`的多边形绘图，计算机绘图辅助程序

# 代码展示

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Dragging Polygons</title>

    <style>
      body {
         background: #aaaaaa;
      }

      #dragDiv {
         position: absolute;
         left: 25px;
         top: 50px;
      }
      
      #controls {
         position: absolute;
         left: 25px;
         top: 25px;
      }
      
      #canvas {
         background: #ffffff;
         cursor: crosshair;
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

	 <div id='controls'>
       Stroke color: <select id='strokeStyleSelect'>
                        <option value='red'>red</option>
                        <option value='green'>green</option>
                        <option value='blue'>blue</option>
                        <option value='orange'>orange</option>
                        <option value='cornflowerblue' selected>cornflowerblue</option>
                        <option value='goldenrod'>goldenrod</option>
                        <option value='navy'>navy</option>
                        <option value='purple'>purple</option>
                     </select>

       Fill color: <select id='fillStyleSelect'>
                        <option value='rgba(255,0,0,0.5)'>semi-transparent red</option>
                        <option value='green'>green</option>
                        <option value='rgba(0,0,255,0.5)'>semi-transparent blue</option>
                        <option value='orange'>orange</option>
                        <option value='rgba(100,140,230,0.5)'>semi-transparent cornflowerblue</option>
                        <option value='goldenrod' selected>goldenrod</option>
                        <option value='navy'>navy</option>
                        <option value='purple'>purple</option>
                     </select>

       Sides: <select id='sidesSelect'>
                        <option value=4 select>4</option>
                        <option value=6>6</option>
                        <option value=8>8</option>
                        <option value=10>10</option>
                        <option value=12>12</option>
                        <option value=20>20</option>
                     </select>

       
       Start angle: <select id='startAngleSelect'>
                        <option value=0 select>0</option>
                        <option value=22.5>22.5</option>
                        <option value=45>45</option>
                        <option value=67.5>67.5</option>
                        <option value=90>90</option>
                     </select>

       Fill <input id='fillCheckbox' type='checkbox' checked/>
       <input id='eraseAllButton' type='button' value='Erase all'/>
    </div>

    <div id='dragDiv'>
      Edit: <input type='checkbox' id='editCheckbox'/>
    </div>
    
    <script src = './polygon.js'></script>
    <script src = './main.js'></script>
  </body>
</html>

```

```js
// polygon.js
var Point = function (x, y) {
   this.x = x;
   this.y = y;
};

var Polygon = function (centerX, centerY, radius, sides, startAngle, strokeStyle, fillStyle, filled) {
   this.x = centerX;
   this.y = centerY;
   this.radius = radius;
   this.sides = sides;
   this.startAngle = startAngle;
   this.strokeStyle = strokeStyle;
   this.fillStyle = fillStyle;
   this.filled = filled;
};

Polygon.prototype = {
   getPoints: function () {
      var points = [],
          angle = this.startAngle || 0;

      for (var i=0; i < this.sides; ++i) {
         points.push(new Point(this.x + this.radius * Math.sin(angle),
                           this.y - this.radius * Math.cos(angle)));
         angle += 2*Math.PI/this.sides;
      }
      return points;
   },

   createPath: function (context) {
      var points = this.getPoints();

      context.beginPath();

      context.moveTo(points[0].x, points[0].y);

      for (var i=1; i < this.sides; ++i) {
         context.lineTo(points[i].x, points[i].y);
      }

      context.closePath();
   },

   stroke: function (context) {
      context.save();
      this.createPath(context);
      context.strokeStyle = this.strokeStyle;
      context.stroke();
      context.restore();
   },

   fill: function (context) {
      context.save();
      this.createPath(context);
      context.fillStyle = this.fillStyle;
      context.fill();
      context.restore();
   },

   move: function (x, y) {
      this.x = x;
      this.y = y;
   },
};
```

```js
// main.js
var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    eraseAllButton = document.getElementById('eraseAllButton'),
    strokeStyleSelect = document.getElementById('strokeStyleSelect'),
    startAngleSelect = document.getElementById('startAngleSelect'),

    fillStyleSelect = document.getElementById('fillStyleSelect'),
    fillCheckbox = document.getElementById('fillCheckbox'),
    editCheckbox = document.getElementById('editCheckbox'),

    sidesSelect = document.getElementById('sidesSelect'),

    drawingSurfaceImageData,
   
    mousedown = {},
    rubberbandRect = {},

    dragging = false,
    draggingOffsetX,
    draggingOffsetY,

    sides = 8,
    startAngle = 0,

    guidewires = true,

    editing = false,
    polygons = [];

// Functions..........................................................

// 绘制网格
function drawGrid(color, stepx, stepy) {
   context.save()

   context.shadowColor = undefined;
   context.shadowBlur = 0;
   context.shadowOffsetX = 0;
   context.shadowOffsetY = 0;
   
   context.strokeStyle = color;
   context.fillStyle = '#ffffff';
   context.lineWidth = 0.5;
   context.fillRect(0, 0, context.canvas.width, context.canvas.height);

   context.beginPath();

   for (var i = stepx + 0.5; i < context.canvas.width; i += stepx) {
     context.moveTo(i, 0);
     context.lineTo(i, context.canvas.height);
   }
   context.stroke();

   context.beginPath();

   for (var i = stepy + 0.5; i < context.canvas.height; i += stepy) {
     context.moveTo(0, i);
     context.lineTo(context.canvas.width, i);
   }
   context.stroke();

   context.restore();
}

// 选拉框位置
function windowToCanvas(x, y) {
   var bbox = canvas.getBoundingClientRect();
   return { x: x - bbox.left * (canvas.width  / bbox.width),
            y: y - bbox.top  * (canvas.height / bbox.height)
          };
}

// Save and restore drawing surface...................................
// 获取canvas已经绘制的图
function saveDrawingSurface() {
   drawingSurfaceImageData = context.getImageData(0, 0,
                             canvas.width,
                             canvas.height);
}

// 将储存的图像恢复
function restoreDrawingSurface() {
   context.putImageData(drawingSurfaceImageData, 0, 0);
}

// Draw a polygon.....................................................
function drawPolygon(polygon) {
   context.beginPath();
   polygon.createPath(context);
   polygon.stroke(context);

   if (fillCheckbox.checked) {
      polygon.fill(context);
   }
}

// Rubberbands........................................................
// 选择框
function updateRubberbandRectangle(loc) {
   rubberbandRect.width = Math.abs(loc.x - mousedown.x);
   rubberbandRect.height = Math.abs(loc.y - mousedown.y);

   if (loc.x > mousedown.x) rubberbandRect.left = mousedown.x;
   else                     rubberbandRect.left = loc.x;

   if (loc.y > mousedown.y) rubberbandRect.top = mousedown.y;
   else                     rubberbandRect.top = loc.y;
} 

// 选择框的形状
function drawRubberbandShape(loc, sides, startAngle) {
   var polygon = new Polygon(mousedown.x, mousedown.y,
                     rubberbandRect.width, 
                     parseInt(sidesSelect.value),
                     (Math.PI / 180) * parseInt(startAngleSelect.value),
                     context.strokeStyle,
                     context.fillStyle,
                     fillCheckbox.checked);
   drawPolygon(polygon);
   
   if (!dragging) {
      polygons.push(polygon);
   }
}

// 更新
function updateRubberband(loc, sides, startAngle) {
   updateRubberbandRectangle(loc);
   drawRubberbandShape(loc, sides, startAngle);
}

// Guidewires.........................................................
// 根据选择的不同而绘制不同的图形
function drawHorizontalLine (y) {
   context.beginPath();
   context.moveTo(0,y+0.5);
   context.lineTo(context.canvas.width,y+0.5);
   context.stroke();
}

function drawVerticalLine (x) {
   context.beginPath();
   context.moveTo(x+0.5,0);
   context.lineTo(x+0.5,context.canvas.height);
   context.stroke();
}

function drawGuidewires(x, y) {
   context.save();
   context.strokeStyle = 'rgba(0,0,230,0.4)';
   context.lineWidth = 0.5;
   drawVerticalLine(x);
   drawHorizontalLine(y);
   context.restore();
}

function drawPolygons() {
   polygons.forEach( function (polygon) {
      drawPolygon(polygon);
   });
}

// Dragging...........................................................
// 拖拉选择
function startDragging(loc) {
  saveDrawingSurface();
  mousedown.x = loc.x;
  mousedown.y = loc.y;
}

function startEditing() {
   canvas.style.cursor = 'pointer';
   editing = true;
}

function stopEditing() {
   canvas.style.cursor = 'crosshair';
   editing = false;
}

// Event handlers.....................................................

canvas.onmousedown = function (e) {
   var loc = windowToCanvas(e.clientX, e.clientY);

   e.preventDefault(); // prevent cursor change

   if (editing) {
     polygons.forEach( function (polygon) {
        polygon.createPath(context);
        if (context.isPointInPath(loc.x, loc.y)) {
           startDragging(loc);
           dragging = polygon;
           draggingOffsetX = loc.x - polygon.x;
           draggingOffsetY = loc.y - polygon.y;
           return;
        }
     });
   }
   else {
     startDragging(loc);
     dragging = true;
   }
};

canvas.onmousemove = function (e) {
   var loc = windowToCanvas(e.clientX, e.clientY);

   e.preventDefault(); // prevent selections

   if (editing && dragging) {
      dragging.x = loc.x - draggingOffsetX;
      dragging.y = loc.y - draggingOffsetY;

      context.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid('lightgray', 10, 10);
      drawPolygons();
   }
   else {
     if (dragging) {
        restoreDrawingSurface();
        updateRubberband(loc, sides, startAngle);

        if (guidewires) {
           drawGuidewires(mousedown.x, mousedown.y);
        }
     }
   }
};

canvas.onmouseup = function (e) {
   var loc = windowToCanvas(e.clientX, e.clientY);

   dragging = false;

   if (editing) {
   }
   else {
      restoreDrawingSurface();
      updateRubberband(loc);
   }
};

eraseAllButton.onclick = function (e) {
   context.clearRect(0, 0, canvas.width, canvas.height);
   drawGrid('lightgray', 10, 10);
   saveDrawingSurface(); 
};

strokeStyleSelect.onchange = function (e) {
   context.strokeStyle = strokeStyleSelect.value;
};

fillStyleSelect.onchange = function (e) {
   context.fillStyle = fillStyleSelect.value;
};

editCheckbox.onchange = function (e) {
   if (editCheckbox.checked) {
      startEditing();
   }
   else {
      stopEditing();
   }  
};

// Initialization.....................................................

context.strokeStyle = strokeStyleSelect.value;
context.fillStyle = fillStyleSelect.value;

drawGrid('lightgray', 10, 10);

if (navigator.userAgent.indexOf('Opera') === -1)
   context.shadowColor = 'rgba(0, 0, 0, 0.4)';

context.shadowOffsetX = 2;
context.shadowOffsetY = 2;
context.shadowBlur = 4;

```

# 效果展示

![image-20210314163244508](.\img\1-rubber.png)

