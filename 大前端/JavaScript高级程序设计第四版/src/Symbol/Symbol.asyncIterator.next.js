class Emitter {
    constructor(max) {
        this.max = max;
        this.asyncIdx = 0;
    }

    async *[Symbol.asyncIterator] () {
        while(this.asyncIdx < this.max) {
            yield new Promise((resolve) => resolve(this.asyncIdx++));
        }
    }
}

