function test(n) {
    console.log(n);
    if(n <= 1) return 1;
    return arguments.callee(n-1);
}

test(10);