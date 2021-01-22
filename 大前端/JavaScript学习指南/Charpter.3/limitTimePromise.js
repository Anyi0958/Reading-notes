function launch() {
    return new Promise((resolve, reject) => {
        if(Math.random() < 0.5) return; //超时返回
        console.log("Lift off!");

        setTimeout( () => {
            resolve("In orbit.");
        }, 2 * 1000);
    });
}

function addTimeout(fn, timeout){
    if(timeout === undefined)   timeout = 1000; //默认超时
    return function(...args){
        return new Promise((resolve, reject) => {
            const tid = setTimeout(reject, timeout,
                new Error("promise timed out."));
            fn(...args)
                .then((...args)  => {
                    clearTimeout(tid);
                    resolve(...args);
                })
                .catch((...args) => {
                    clearTimeout(tid);
                    reject(...args);
                });
        });
    }
}

c.go()
    .then(addTimeout(launch, 4 * 1000));