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
