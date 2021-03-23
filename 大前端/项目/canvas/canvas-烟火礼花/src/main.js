// 全局配置
const config = {
    width: 360,
    height: 600,
    canvas: ['bg', 'firework'],
    skyColor: '',
    fireworkTime: {
        min: 30,
        max: 60
    },
    fireWorkOption: {
        x: undefined,
        y: undefined,
        xEnd: undefined,
        yEnd: undefined,
        particleCount: 300,
        disappearWait: undefined,
        opacity: 0.8
    }
};

// Particle
class Particle {
    constructor({x,y,size = 1, radius = 1.2} = {}){
        this.x = x,
        this.y = y,
        this.size = size,
        this.rate = Math.random(),
        // 偏移角度
        this.angle = Math.PI * 2 * Math.random();

        // 每次移动速度分解为横纵坐标移动(距离)
        this.vx = radius * Math.cos(this.angle) * this.rate;
        this.vy = radius * Math.sin(this.angle) * this.rate;        

        // 重力
        this.resistance = 0.02;
        // 空气阻力
        this.gravity = 0.98;

    }

    move(){
        this.x += this.vx;
        this.y += this.vy;

        this.vy += this.resistance;
        
        // 空气阻力
        this.vx *= this.gravity;
        this.vy *= this.gravity;
    }

    render(ctx){
        this.move();

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2, false);
        ctx.fill();
    }


}


class Firework {
    constructor({x, y = config.height, 
        xEnd, 
        yEnd, 
        particleCount = 300, 
        disappearWait} = {}){
        
        this.x = x || 
        config.width / 8 + 
        Math.random() * config.width * 3 / 4;

        this.y = y;
        this.xEnd = xEnd || this.x;
        this.yEnd = yEnd || 
        config.height / 8 +
        Math.random() * config.height * 3 / 8;

        this.size = 2;
        this.velocity = -3;        
        this.opacity = config.fireWorkOption.opacity;
        this.color = `hsla(${360 * Math.random() | 0}, 80%, 60%, 1)`;
        this.disappearWait = disappearWait || 30 + Math.random() * 30;

        // 微粒个数
        this.particleCount = particleCount;
        this.particles = [];
        this.createParticles();

        this.status = 1;
    }

    createParticles() {
        for(let i = 0; i < this.particleCount; ++ i)
            this.particles.push(new Particle({x:this.xEnd, y:this.yEnd}));
    }

    riseToSky(){
        this.y += this.velocity * 1;
        // 升空时阻力
        this.velocity += 0.005;

        // 到位置时，烟花渐渐隐藏
        if(this.y - this.yEnd <= 50)
            this.opacity = (this.y - this.yEnd) / 50;
        
        // 到位置后，准备炸裂
        if(this.y - this.yEnd <= 10) this.status = 2;

    }

    render(ctx){
        switch(this.status){
            case 1:
                ctx.save();

                ctx.beginPath();
                ctx.globalCompositeOperation = 'lighter';
                ctx.globalAlpha = this.opacity;
                ctx.translate(this.x, this.y);

                ctx.scale(0.8, 2.3);

                ctx.translate(-this.x, -this.y);

                ctx.fillStyle = this.color;
                ctx.arc(
                    this.x + 
                    Math.sin(Math.PI * 2 * Math.random()) / 2, 
                    this.y,
                    this.size,
                    0,
                    Math.PI * 2,
                    false);
                ctx.fill();
                ctx.restore();

                this.riseToSky();
                break;                
            case 2:
                if(--this.disappearWait <= 0){
                    this.opacity = 1;
                    this.status = 3;
                }
                break;
            case 3:
                ctx.save();
                ctx.globalCompositeOperation = 'lighter';
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = this.color;
                
                for(let i = 0; i < this.particles.length; ++i)
                    this.particles[i].render(ctx);
                ctx.restore();
                this.opacity -= 0.01;
                return this.opacity > 0;
                break;
            default:
                return false;                
        }
    }
    
}

class CanvasBg{
    constructor(){
        this.setProperty();
        this.renderBg();

        this.loop();
    }

    setProperty(){
        this.fireworks = [];
        this.width = config.width;
        this.height = config.height;

        this.fireworkTime = 
            (config.fireworkTime.min + 
                (config.fireworkTime.max - 
                    config.fireworkTime.min) 
            * Math.random()) | 
            0;
        
        this.bgCtx = document.getElementsByTagName('canvas')[0].getContext('2d');
        this.fireworkCtx = document.getElementsByTagName('canvas')[1].getContext('2d');

    }

    renderBg(){
        this.bgCtx.fillStyle = 'hsla(210,60%,5%,0.9)';
        this.bgCtx.fillRect(0,0,this.width,this.height);
    }

    loop(){
        requestAnimationFrame(this.loop.bind(this));
        this.fireworkCtx.clearRect(0,0,this.width,this.height);

        if(--this.fireworkTime <= 0){
            this.fireworks.push(new Firework(config.fireWorkOption));

            this.fireworkTime = (config.fireworkTime.min + 
                (config.fireworkTime.max - 
                    config.fireworkTime.min) 
                * Math.random()) | 0;
            
            for(let i = this.fireworks.length - 1; i >= 0; --i)
                !this.fireworks[i].render(this.fireworkCtx) &&
                    this.fireworks.splice(i,1);

        }
    }
}

const canvas = new CanvasBg();