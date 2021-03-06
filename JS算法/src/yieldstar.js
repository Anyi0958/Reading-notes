function* test(n){
    if(n > 0){
        yield* test(n-1);
        yield n-1;
    }
}

for(const i of test(4))  console.log(i);

