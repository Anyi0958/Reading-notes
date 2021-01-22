const http = require('http');

const server = http.createServer(function(req, res) {
    
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Headers",  " Origin, X-Requested-With, Content-Type, Accept");
    res.end(JSON.stringify({
        platform: process.platform,
        nodeVersion: process.version,
        uptime: Math.round(process.uptime())
    }));
});

const port = 7070;
server.listen(port, () => {
    console.log(`Ajax server started on port ${port}`);

});