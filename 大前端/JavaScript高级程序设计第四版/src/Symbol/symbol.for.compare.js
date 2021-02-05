let test1 = Symbol('foo');
let test2 = Symbol.for('foo');

console.log(test1 === test2);   // false