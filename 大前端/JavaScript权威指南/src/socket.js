const http = require('http');
const ws = require('websocket');

let httpserver = new http.Server();
let webserver = ws.createServer({server: httpserver});

webserver.on('connection', socket=> {
    console.log(socket);
}).listen(8081)