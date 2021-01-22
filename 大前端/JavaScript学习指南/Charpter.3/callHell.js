const fs = require('fs');

fs.readFile('a', (err, dataA) => {
    if (err)    console.err(err);
    fs.readFile('b', (err, dataB) => {
        if(err) console.err(err);
        fs.readFile('c', (err, dataC) => {
            if(err) console.log(err);
            setTimeout(() => {
                fs.writeFile('d', dataA + dataB + dataC, err => {
                    if(err) console.error(err);
                });
            }, 2 * 1000); 
        })
    })
});