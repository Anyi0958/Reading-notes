const s = new Set();

const functionVal = function() {};
const symbolVal = Symbol();
const objectVal = new Object();

s.add(functionVal)
 .add(symbolVal)
 .add(objectVal);

console.log(s.has(functionVal) 
            && s.has(symbolVal) 
            && s.has(objectVal));    //true

// SameValueZero检查
console.log(s.has(function() {}));  // false