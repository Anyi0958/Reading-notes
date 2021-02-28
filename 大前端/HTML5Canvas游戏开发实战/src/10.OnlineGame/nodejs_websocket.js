// const { request } = require('http');
const WebSocket = require('ws').Server;
const port = 80;
const wss = new WebSocket({port: `${port}`});

console.log('start...');

wss.on('connection', ws => {
    // console.log(ws);
    // console.log(ws.on('open', event => console.log('success')));
    console.log('open');
    ws.on('open', str => {
        console.log(`success: ${str}`);
        // ws.send('test');
        // conn.sendText('success');
    });
    
    ws.on('close', (code,reason) => {
        console.log(`close: ${code}-${reason}`);
    });
    
    ws.on('error', (code, reason) => {
        console.log(`error: ${code}-${reason}`);
    });
})

/* const WebSocket = require('ws').Server;
const ws = new WebSocket({port: 80});

ws.on('connection', event => {
    console.log('connected');
    event.on('open', msg => {
        console.log(msg);
        event.send('收到');
    })
}) */