const EventEmitter = require('events').EventEmitter;

class Countdown extends EventEmitter {
    constructor(seconds, superstitious){
        super();

        this.seconds = seconds;
        this.superstitious = superstitious;
    }
    
    go() {
        const countdown = this;

        return new Promise(
            (resolve, reject) => {
                for(let i = countdown.seconds; i >= 0 ; i --){
                    setTimeout(() => {
                        if(countdown.superstitious && i === 13)
                            return reject(new Error("Not counting."));
                        countdown.emit('tick', i);
                        if(i === 0)
                            resolve();
                    }, (countdown.seconds - i) * 1000);
                }
            }
        );
    }
} 

const c = new Countdown(5);

c.on('tick', i => {
    if (i > 0)  console.log(i + '...');
});

c.go()
    .then(
        () => console.log("Go!")
    ).catch(
        err => console.error(err.message)
    );