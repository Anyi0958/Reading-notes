canvas-图像动画 目录
[TOC]
***

# 前言

- `canvas`开发手册里提到的图像动画效果

# 效果展示

![anime](./img/anime.gif)



# 代码展示

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
            background-color: rgba(100, 145, 250, 0.3);
        }

        #canvas {
            margin-left: 20px;
            margin-right: 0px;
            margin-bottom: 20px;
            border: thin solid #aaffcc;
            cursor: crosshair;
            padding: 0;
        }

        #controls {
            margin: 20px;
        }

        a {
            font: 18px Times Roman;
            text-decoration: none;
            margin-right: 15px;
        }
    </style>
</head>
<body>
    <div id="controls">
        <input type="button" id="fadeButton" value="Fade Out">
    </div>

    <canvas id="canvas" width="800" height="520">
        Canvas Not Supported!
    </canvas>

    <script src="main.js"></script>
</body>
</html>
```

```js
// main.js
var image = new Image(),
    canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    fadeButton = document.getElementById('fadeButton'),
    originalImageData = null,
    interval = null;

// Functions.....................................................

function increaseTransparency(imagedata, steps) {
   var alpha, currentAlpha, step, length = imagedata.data.length;

   for (var i=3; i < length; i+=4) { // For every alpha component
      alpha = originalImageData.data[i];

      if (alpha > 0 && imagedata.data[i] > 0) { // not totally transparent yet
         currentAlpha = imagedata.data[i];
         step = Math.ceil(alpha/steps);

         if (currentAlpha - step > 0) { // not too close to the end
            imagedata.data[i] -= step;  // increase transparency
         }
         else {
            imagedata.data[i] = 0; // end: totally transparent
         }
      }
   }
}

function fadeOut(context, imagedata, x, y,
                 steps, millisecondsPerStep) { 
   var frame = 0,
       length = imagedata.data.length;

   interval = setInterval(function () { // Once every millisecondsPerStep ms
      frame++;

      if (frame > steps) { // animation is over
          clearInterval(interval); // end animation
          animationComplete();     // put picture back in 1s
      }
      else {
        increaseTransparency(imagedata, steps);
         context.putImageData(imagedata, x, y);
      }
   }, millisecondsPerStep);
};

// Animation.....................................................

function animationComplete() {
   setTimeout(function() {
      context.drawImage(image,0,0,canvas.width,canvas.height);
   }, 1000);
}

// Initialization................................................

fadeButton.onclick = function() {
   fadeOut(context,
      context.getImageData(0, 0, canvas.width, canvas.height),
      0, 0, 20, 1000/60);
};

image.src = './log-crossing.png';
image.onload = function() {
   context.drawImage(image, 0, 0, canvas.width, canvas.height);
   originalImageData = context.getImageData(0, 0, canvas.width, canvas.height);
};
```

