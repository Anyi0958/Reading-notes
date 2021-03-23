let ctx = document.getElementsByTagName('canvas')[0],
    c = ctx.getContext('2d');

ctx.width = window.innerWidth;
ctx.height = 200;

let img = new Image();
img.src = 'animate-four-legged-slide-09.jpg';
img.onload = () => {
    beginDraw(img);
};

