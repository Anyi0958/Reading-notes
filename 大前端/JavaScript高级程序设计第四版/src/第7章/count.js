function* generatoCount(){
    for(let i = 0; ; ++i)
        yield i;
}

let index = generatoCount();
console.log(index.next().value);    // 0
console.log(index.next().value);    // 1
console.log(index.next().value);    // 2
console.log(index.next().value);    // 3