// 等价的
function* generatorFn1() {
    for(const x of [1,2,3]) yield x;
}

function* generatorFn2() {
    yield* [1,2,3];
}

let test1 = generatorFn2();

for(const x of test1)   console.log(x);
// 1
// 2
// 3