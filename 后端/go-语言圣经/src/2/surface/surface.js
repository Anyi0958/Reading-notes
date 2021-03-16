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