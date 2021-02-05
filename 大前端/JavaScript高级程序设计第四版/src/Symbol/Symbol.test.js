let genericSymbol = Symbol();
let otherGenericSymbol = Symbol();

let foolSymbol = Symbol('foo');
let otherFoolSymbol = Symbol('foo');

console.log(genericSymbol == otherGenericSymbol);
console.log(foolSymbol == otherFoolSymbol);