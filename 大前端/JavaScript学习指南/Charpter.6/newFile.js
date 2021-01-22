const fs = require('fs');
const path = require('path');

fs.writeFile(path.join(__dirname, 'a'), 'hello from node', err => {
    if(err) return console.log(`ERR: ${err.message}`);
});

fs.readFile(path.join(__dirname, 'a'), {encoding: 'utf-8'}, (err, data) => {
    if(err) return console.error(`${err.message}`);
    console.log(data);

});