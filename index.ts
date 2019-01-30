#!/usr/bin/env node

import * as path from 'path';
import express = require('express');
import * as WebSocket from 'ws';
import * as http from 'http';
import * as getCover from '../poshett-musicbrainz';

const app = express();
app.use(express.static(`${__dirname}/public`));

const server = http.createServer(app);
const wsServer = new WebSocket.Server({ server });

wsServer.on('connection', (ws: WebSocket) => {
    ws.on('message', (message: string) => {
        console.log('received: %s', message);
        ws.send(`Hello, you sent -> ${message}`);
    });

    ws.send('Hi there, I am a WebSocket server');
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve('index.html'));
});

let port = process.argv[2] || 3000;
server.listen(port, () => console.log(`App listening on port ${port}!`));
