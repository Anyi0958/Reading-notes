function* generatorFn() {
    yield* [1,2,3];
}

const g = generatorFn();

for(const x of g){
    if(x > 1)
        g.return(3);
    console.log(x);
}