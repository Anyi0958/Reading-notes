function* range(start, end){
    while(end > start)  yield start++;
}

for(let x of range(4,7)) console.log(x);
// 4
// 5
// 6

function* zeroes(n) {
    while(n--)  yield 0;
}

console.log(Array.from(zeroes(3))); // [0, 0, 0]