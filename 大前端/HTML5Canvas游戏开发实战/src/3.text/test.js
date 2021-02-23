function test(){
    return new Promise((resolve, reject) => {
        console.log('fuck');
        console.log('loading');
    });
}

test().then(
    () => {
        console.log('start');
    },
    err => console.log(err)
).catch(err => {console.log(err)}
)

async setTimeout()