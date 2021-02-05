let initial = ['foo'];

let array = ['bar'];
// false
console.log(array[Symbol.isConcatSpreadable]);  // undefined
console.log(initial.concat(array));  // ['foo', 'bar']
array[Symbol.isConcatSpreadable] = false;
console.log(initial.concat(array));  //['foo', Array(1)]
// true
let arrayLikeObject = { length: 1, 0: 'baz'};
console.log(arrayLikeObject[Symbol.isConcatSpreadable]);  //undefined
console.log(initial.concat(arrayLikeObject));  //['foo', {...}]
arrayLikeObject[Symbol.isConcatSpreadable] = true;
console.log(initial.concat(arrayLikeObject));  //['foo', 'baz']
// set
let otherObject = new Set() . add('qux');
console.log(otherObject[Symbol.isConcatSpreadable]);  //undefined
console.log(initial.concat(otherObject));  // ['foo', Set(1)]
otherObject[Symbol.isConcatSpreadable] = true;
console.log(initial.concat(otherObject));  // ['foo']