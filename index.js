// dependencies
const express = require('express');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;

const server = express().listen(6666, () => {
    console.log('Server started at 6666..');
});

const wss = new SocketServer({ server });

wss.on('connection', (ws) => {

    console.log('[Server] A client was connected.');

    ws.on('close', () => { console.log('[Server] Client disconnected.') });

    // ws.on('message', (message) => {
    //     console.log('[Server] Received message: %s', message);
       
    //     // broadcast to everyone else connected
    //     wss.clients.forEach(function each(client) {
    //         if ( client.readyState === WebSocket.OPEN) {
            
    //             client.send("Hello from server");
    //         }
    //     });

    // });

      ws.on('message', function incoming(data, isBinary) {
        console.log('[Server] Received Audio data: %s');
        wss.clients.forEach(function each(client) {
          if (client.readyState === WebSocket.OPEN) {
            console.log('[Server] sending audio data');
            client.send(data);
          }
        });
      });

});