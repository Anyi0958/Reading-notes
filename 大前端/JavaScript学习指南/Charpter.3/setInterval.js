const start = new Date();
console.log(start);
let i = 0;
const intervalId = setInterval(function() {
    let now = new Date();
    if(now.getMinutes() !== start.getMinutes() || ++i > 10){
        return clearInterval(intervalId);
    }
    console.log(`${i}: ${now}`);
}, 2 * 1000);