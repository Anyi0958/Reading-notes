function* generatorFn() {}

const g = generatorFn();
console.log(g);     // generatorFn {<suspended>}
console.log(g.next); // f next() { [native code] }
console.log(g.return(4));  // f return() {[native code]}
console.log(g.throw);   // f throw() {[native code]}
console.log(g);