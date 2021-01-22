const fs = require('fs');
const http = require('http');

const server = http.createServer((req, res) => {
    if(req.method === 'GET' && req.url === '/favicon.ico'){
        fs.createReadStream('favicon.ico');
        fs.pipe(res);  // 代替了end
    }else{
        res.end('Hello World.');
    }
});