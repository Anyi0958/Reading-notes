const fs = require('fs');

const ws = fs.createWriteStream('a', {encoding: 'utf-8'});
ws.write('line 1\n');
ws.write('line 2\n');
ws.end();

const rs = fs.createReadStream('a', {encoding: 'utf-8'});
rs.on('data', data => {
    console.log(data);
});

rs.on('end', data => {
    console.log(data);
});