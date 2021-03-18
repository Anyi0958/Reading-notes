let canvas = document.createElement('canvas');
canvas.id = "canvas";

let context = canvas.getContext('2d');
ctx.beginPath()
ctx.moveTo(100,150);
ctx.lineTo(150,50);
ctx.lineTo(200,150);
ctx.lineTo(150,250);
ctx.lineTo(100,150);
ctx.closePath();
ctx.stroke();