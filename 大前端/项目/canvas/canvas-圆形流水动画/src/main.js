let ctx = document.createElement('canvas').getContext('2d');

const conf = {
    width: 600,
    height: 600,
    rings: [],
    ringsLength: 0,
    PI: Math.PI,
    cos: Math.cos,
    sin: Math.sin,
    random: Math.random,
    lineWidth: 0.2,
    color: [
        "#ABF8FF", 
        "#E76B76", 
        "#1D2439", 
        "#4F3762", 
        "#67F9FF", 
        "#0C0F18"
    ]
};

conf.cx = conf.width / 2,
conf.cy = conf.height / 2,
conf.PI_HALF = conf.PI / 2;
/* ring {
    t:total_particles, 
    r:radius, 
    d:distance, 
    s:speed, 
    c:color
} */
conf.data = [
    [
        {t:80, r:(conf.cx-10), d:40, s:30, c:conf.color[1]},
        {t:60, r:(conf.cx-20), d:40, s:80, c:conf.color[2]},
        {t:20, r:(conf.cx-30), d:20, s:80, c:conf.color[2]},
      ],
      [
          {t:80, r:(conf.cx-80),  d:40, s:40, c:conf.color[4]},
         {t:80, r:(conf.cx-90),  d:20, s:40, c:conf.color[4]},
         {t:20, r:(conf.cx-100), d:20, s:40, c:conf.color[2]},
         {t:40, r:(conf.cx-110), d:20, s:40, c:conf.color[2]},
      ],
      [
          {t:60, r:(conf.cx-160), d:40, s:20, c:conf.color[2]},
         {t:20, r:(conf.cx-170), d:30, s:60, c:conf.color[2]},
         {t:40, r:(conf.cx-180), d:40, s:60, c:conf.color[2]},
      ],
      [
          {t:40, r:(conf.cx-230), d:40, s:20, c:conf.color[5]},
         {t:20, r:(conf.cx-240), d:20, s:10, c:conf.color[5]},
      ],
      [
         {t:10, r:(conf.cx-290), d:10, s:10, c:conf.color[4]}
      ]
];

/* 
* 粒子类声明
*/

let P = function(radius, distance, speed, color, opacity) {
    this.a = conf.PI / 180,
    this.d = distance,
    this.d2 = (this.d * this.d),
    this.x = conf.cx + radius * conf.cos(this.a),
    this.y = conf.cy + radius * conf.sin(this.a),
    this.c = color,
    this.r = (conf.random() * 8),
    this.R = conf.random() > 0.5 ? radius : radius - 5,
    this.s = speed,
    this.pos = conf.random() * 360;
    this.opacity = opacity || 0.12;
};



// 调用
ctx.canvas.width = conf.width,
ctx.canvas.height = conf.height;
document.body.appendChild(ctx.canvas);

conf.data.forEach(group => {
    let ring = [];

    group.forEach((orbit,index)=>{
        let totalParticles = orbit.t;

        for(let start = 0; start < totalParticles; start++){
            let radius = orbit.r,
                distance = orbit.d,
                speed = conf.random() / orbit.s;
                speed = index % 2 ? speed : speed * -1;
            
            let color = orbit.c,
                opacity = orbit.o;

            ring.push(new P(radius, distance, speed, color, opacity));            
        }
    });

    conf.rings.push(ring);
});
conf.ringsLength = conf.rings.length;

function draw() {
    ctx.beginPath();
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#151a28';
    ctx.fill();
    ctx.closePath();

    for(let i = 0; i < conf.rings.length; i++){
        let ring = conf.rings[i],
            ringLength = ring.length,
            ringLength2 = ringLength - 100;

        for(let j = 0; j < ringLength; j++){
            let particle = ring[j];
            
            particle.x = conf.cx + particle.R * conf.sin(conf.PI_HALF + particle.pos);
            particle.y = conf.cy + particle.R * conf.cos(conf.PI_HALF + particle.pos);
            particle.pos += particle.s;

            ctx.beginPath();
            ctx.globalAlpha = particle.opacity;
            ctx.globalCompositeOperation = 'lighter';
            ctx.fillStyle = particle.c;
            ctx.arc(particle.x, particle.y, particle.r, conf.PI * 2, false);
            ctx.fill();
            ctx.closePath();

            for(let k = 0; k < ringLength2; k++){
                let p2 = ring[k];

                let yd = p2.y - particle.y,
                    xd = p2.x - particle.x,
                    d = ((xd * xd) + (yd * yd));

                if(d < particle.d2){
                    ctx.beginPath();
                    ctx.globalAlpha = 1;
                    ctx.lineWidth = conf.lineWidth;
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = p2.c;
                    ctx.stroke();
                    ctx.closePath();
                }
            }
        }
    }
};

function loop() {
    // let ctx = document.getElementsByTagName('canvas')[0].getContext('2d');
    draw();

    requestAnimationFrame(loop);
};

loop();
