let s = new Set();

console.log(s);     // Set[0] {}
console.log(s.toString());      // [Object Set]
console.log(s[Symbol.toStringTag]); //Tag

class Foo {}
let foo = new Foo();

console.log(foo);       // Foo {}
console.log(foo.toString());    // [object Object]
console.log(foo[Symbol.toStringTag]);   // undefined

class Bar {
    constructor(){
        this[Symbol.toStringTag] = 'Bar';
    }
}
let bar = new Bar();

console.log(bar);       // Bar {}
console.log(bar.toString());    // [object object]
console.log(bar[Symbol.toStringTag]);   // bar
