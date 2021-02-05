let s1 = Symbol('foo'),
    s2 = Symbol('bar'),
    s3 = Symbol('baz'),
    s4 = Symbol('qux');

let o = {
    [s1]: 'foo val'
};

console.log(o);

o[s2] = 'bar val';
console.log(o);


Object.defineProperty(o, s3, {value: 'baz val' });

console.log(o);

Object.defineProperties(o, {
    [s4]: {value: 'qux val'}
});

console.log(o);

console.log(Object.getOwnPropertyNames(o));
console.log(Object.getOwnPropertySymbols(o));
console.log(Object.getOwnPropertyDescriptor(o));
console.log(Reflect.ownKeys(o));