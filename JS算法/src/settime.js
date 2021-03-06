function count(start, end) {
    let timer = setInterval(()=>{
        if(start <= end)    console.log(start++);
        else    clearInterval(timer);           
    },100);
}

count(1,10);