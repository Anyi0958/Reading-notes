function* generatorFn1() {
    yield* [1,2,3];
}

const g1 = generatorFn1();

console.log(g1);     // generatorFn {<suspended>}
try{
    g1.throw('foo');
}catch(e){
    console.log(e);     //foo
}
console.log(g1);     // generatorFn {<closed>}

function* generatorFn2() {
    //1
    for(const x of [1,2,3]) {
        try{
            yield x;
         }catch(e) {}
    }
    //2
    try{
        yield* [1,2,3];
    }catch(e){}

}

const g2 = generatorFn2();
console.log(g2.next());     // {done:false, value: 1}
g2.throw('foo');
console.log(g2.next());      // {done: false, value: 3}