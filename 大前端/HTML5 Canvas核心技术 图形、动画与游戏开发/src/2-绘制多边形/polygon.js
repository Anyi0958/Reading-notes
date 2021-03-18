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

// let download = document.getElementById('download');
try {
    let blob = new Blob([context.getImageData(0,0,canvas.width,canvas.height)], {type: 'image/png'});    
    blob.arrayBuffer().then(arr=>{
        console.log(arr);
    })
    // console.log(blob.arrayBuffer().then(array=>console.log(array)));
    const downloadElement = document.createElement('a');
    let href = window.URL.createObjectURL(blob);
    // console.log(href);
    downloadElement.href = href;
    document.body.appendChild(downloadElement);
    downloadElement.click();
    document.body.removeChild(downloadElement);
    window.URL.revokeObjectURL(href);
}catch(err){
    console.log(err);
}
