class Foo {}
let foo = new Foo();

console.log(3 + foo);   
console.log(3 - foo);
console.log(String(foo));

class Bar {
    constructor() {
        this[Symbol.toPrimitive] = function(hint) {
            switch(hint) {
                case 'number':
                    return 3;
                case 'string':
                    return 'string bar';
                case 'default':
                default:
                    return 'default bar';
            }
        }
    }
}

let bar = new Bar();

console.log(3 + bar);
console.log(3 - bar);
console.log(String(bar));