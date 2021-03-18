svg-利用js-go生成仿真图 目录

[TOC]

****

# 前言

- 本程序基于`svg`建立的仿真图
- 开始思考，这种图像和工具没有关系，而和算法有关系。所以在学习中，我需要学习的应该是如何用工具做结果，而非追求工具本身。
- 绘图的方式有`canvas`和`svg`，相对来说，`svg`作为一种`xml`可以夸终端，而`canvas`则仅仅适合`web`

注意：

- `js`生成对资源占用极大，建议使用`worker`，最好是在后台生成后，前端只是展现结果
- 文末附有`golang`程序

# 结果展示

![show](./img/test.svg)

# 代码展示

```js
let testSvg = function(){
    this.width = 600,
    this.height = 320,
    this.cells = 100,
    this.xyrange = 30.0,
    this.xyscale = this.width / 2 / this.xyrange,
    this.zscale = this.height * 0.4,
    this.angle = Math.PI / 6,
    this.sx,
    this.sy,
    this.sinNum = Math.sin(this.angle),
    this.cosNum = Math.cos(this.angle);
    // this.dis = new Map();
}

// testSvg.prototype.sinNum = Math.sin(this.angle);
// testSvg.prototype.cosNum = Math.cos(this.angle);

testSvg.prototype.compute = function(i, j) {
    let r = Math.hypot(i, j);

    return Math.sin(r) / r;
}

testSvg.prototype.corner = function(i, j) {
    let x = this.xyrange * (parseFloat(i) / this.cells - 0.5),
        y = this.xyrange * (parseFloat(j) / this.cells - 0.5);
        
    let z = this.compute(x, y);
    
    // if(this.dis.has('sx'))    this.dis.delete('sx');
    // this.dis.set('sx', this.width/2+(x-y)*this.cosNum*this.xyscale);
    this.sx = this.width/2+(x-y)*this.cosNum*this.xyscale;
    
    // if(this.dis.has('sy'))    this.dis.delete('sy');
    // this.dis.set('sy', this.height/2+(x+y)*this.sinNum*this.xyscale - z*this.zscale);
    this.sy = this.height/2+(x+y)*this.sinNum*this.xyscale - z*this.zscale;    
}

testSvg.prototype.getval = function(x, y){
    this.corner(x,y);
    let arr = [];
    arr.push(this.sx,this.sy);
    // console.log(this.sx)
    return arr.join(',');
}

testSvg.prototype.main = function() {
    let svgtag = document.createElement('svg');
    svgtag.setAttribute('xmlns', "http://www.w3.org/2000/svg");
    svgtag.style = "stroke: grey; stroke-width: 0.7";
    svgtag.fill = "white"; 
    svgtag.width= this.width;
    svgtag.height=this.height;

    document.body.appendChild(svgtag);
    let tag = [];    
    for(let i = 0; i < this.cells; i++){
        for(let j = 0; j < this.cells; j++){            
            let ax = this.getval(i+1,j),
                bx = this.getval(i,j),
                cx = this.getval(i,j+1),
                dx = this.getval(i+1,j+1);
            tag.push(`<polygon points='${ax} ${bx} ${cx} ${dx}' />`)
        }
    }

    tag.map(val=>{
        console.log(val);
        svgtag.innerHTML += val;
    });
}

let test = new testSvg();
test.main();
```

# `go`展示

```go
// Surface computes an SVG rendering of a 3-D surface function.
package main

import (
    "fmt"
    "math"
)

const (
    width, height = 600, 320            // canvas size in pixels
    cells         = 100                 // number of grid cells
    xyrange       = 30.0                // axis ranges (-xyrange..+xyrange)
    xyscale       = width / 2 / xyrange // pixels per x or y unit
    zscale        = height * 0.4        // pixels per z unit
    angle         = math.Pi / 6         // angle of x, y axes (=30°)
)

var sin30, cos30 = math.Sin(angle), math.Cos(angle) // sin(30°), cos(30°)

func main() {
    fmt.Printf("<svg xmlns='http://www.w3.org/2000/svg' "+
        "style='stroke: grey; fill: white; stroke-width: 0.7' "+
        "width='%d' height='%d'>", width, height)
    for i := 0; i < cells; i++ {
        for j := 0; j < cells; j++ {
            ax, ay := corner(i+1, j)
            bx, by := corner(i, j)
            cx, cy := corner(i, j+1)
            dx, dy := corner(i+1, j+1)
            fmt.Printf("<polygon points='%g,%g %g,%g %g,%g %g,%g'/>\n",
                ax, ay, bx, by, cx, cy, dx, dy)
        }
    }
    fmt.Println("</svg>")
}

func corner(i, j int) (float64, float64) {
    // Find point (x,y) at corner of cell (i,j).
    x := xyrange * (float64(i)/cells - 0.5)
    y := xyrange * (float64(j)/cells - 0.5)

    // Compute surface height z.
    z := f(x, y)

    // Project (x,y,z) isometrically onto 2-D SVG canvas (sx,sy).
    sx := width/2 + (x-y)*cos30*xyscale
    sy := height/2 + (x+y)*sin30*xyscale - z*zscale
    return sx, sy
}

func f(x, y float64) float64 {
    r := math.Hypot(x, y) // distance from (0,0)
    return math.Sin(r) / r
}
```

# `canvas`展示

```js
const conf = {
    width: 600,
    height: 320,
    cells: 100,
    xyrange: 30.0,
    angle: Math.PI / 6
};

conf.xyscale = conf.width/2/conf.xyrange,
conf.zscale = conf.height * 0.4,
conf.sinNum = Math.sin(conf.angle),
conf.cosNum = Math.cos(conf.angle);

// console.log(conf);

let canvas = document.createElement('canvas');
canvas.id = "canvas";

document.body.insertBefore(canvas,null);

document.getElementById('canvas').width = 800,
document.getElementById('canvas').height = 600;

let context = canvas.getContext('2d');
context.lineWidth = 1;

let Point = function(x, y) {
    this.x = x;
    this.y = y;
}

function corner(i, j) {
    
    let points = [];
    let x = conf.xyrange * (parseFloat(i) / conf.cells - 0.5),
        y = conf.xyrange * (parseFloat(j) / conf.cells - 0.5);
    let r = Math.hypot(x,y),
        z = isNaN(Math.sin(r) / r) ? 1 : Math.sin(r) / r;
        
    let sx = conf.width / 2 + (x - y) * conf.sinNum * conf.xyscale,
        sy = conf.height / 2 + (x + y) * conf.cosNum * conf.xyscale - z * conf.zscale;
        // console.log(sinNum);
    // console.log(`${sx}, ${sy}`);
    // if(sx === 300 && isNaN(sy))  console.log(`${sx}, ${Math.sin(r)}`);
    points.push(new Point(sx, sy));
    // console.log(`${points[0].x}, ${points[0].y}`);
    return points;
}

let moveToFunc =  CanvasRenderingContext2D.prototype.moveTo;
CanvasRenderingContext2D.prototype.moveTo = function(x,y) {
    moveToFunc.apply(context, [x,y]);

    this.startX = x;
    this.startY = y;
}


let lineToFunc = CanvasRenderingContext2D.prototype.lineTo;
CanvasRenderingContext2D.prototype.lineTo = function(x,y){
    lineToFunc.apply(context, [x,y]);
    // console.log(`${this.startX}, ${this.startY.toFixed(0)}, ${x.toFixed(0)}, ${y.toFixed(0)}`);
    let grd = context.createLinearGradient(this.startX.toFixed(0), Math.floor(this.startY), Math.floor(x),Math.floor(y));
    
    grd.addColorStop(0.2, '#aaff00');
    grd.addColorStop(0.8, '#ff0000');

    context.strokeStyle = grd;

    this.startX = x;
    this.startY = y;
}

function getPolygonPoints() {
    
    for(let i = 0; i < conf.cells; i++) {
        for(let j = 0; j < conf.cells; j++){
            let ax = corner(i+1, j)[0].x,
                ay = corner(i+1,j)[0].y,

                bx = corner(i,j)[0].x,
                by = corner(i,j)[0].y,

                cx = corner(i,j+1)[0].x,
                cy = corner(i,j+1)[0].y,

                dx = corner(i+1,j+1)[0].x,
                dy = corner(i+1,j+1)[0].y;
            // console.log(`i:${i}, j:${j} -- ${ax},${ay} ${bx},${by} ${cx},${cy} ${dx},${dy}`);

            context.save();
            
            context.beginPath();
            context.moveTo(ax,ay);
            
            context.lineTo(bx,by);
            context.lineTo(cx,cy);
            context.lineTo(dx,dy);

            context.closePath();
            context.stroke();

            context.restore();
            
        }
    }

}

getPolygonPoints();
```

