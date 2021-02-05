// 创建新符号
let fooGlobalSymbol = Symbol.for('foo');
// 重用已有符号
let otherFooGlobalSymbol = Symbol.for('foo');

console.log(fooGlobalSymbol === otherFooGlobalSymbol);  // true