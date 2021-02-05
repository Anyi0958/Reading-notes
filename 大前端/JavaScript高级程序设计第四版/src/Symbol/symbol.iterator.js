class Foo {
    *[Symbol.iterator]() {}
}

let f = new Foo();

console.log(f[Symbol.iterator]);

class Emitter{
    constructor(max) {
        this.max = max;
        this.idx = 0;
    }

    *[Symbol.iterator]() {
        while(this.idx < this.max){
            yield this.idx++;
        }
    }
}


function count() {
    let emitter = new Emitter(5);
    
    for (const x of emitter){
        console.log(x);
    }
}

count();