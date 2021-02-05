// create global symbol
let s = Symbol.for('foo');
console.log(Symbol.keyFor(s));  // foo

// create ordinary symbol
let s2 = Symbol('bar');
console.log(Symbol.keyFor(s2)); // undefined

// type error
console.log(Symbol.keyFor(123));