#!/usr/bin/env node

import * as path from 'path';
import * as WebSocket from 'ws';
import * as http from 'http';
import express, { Express, Request, Response } from "express";
import { Server } from "http";

interface PoshettWebInterface {
    initServer(config?: (app: Express) => void);
    startServer(port?: number);
    onWebSocket(path: string, cb: (ws: WebSocket) => void);
    onGet(path: string, cb: (req: Request, res: Response) => void);
}

export default class PoshettWeb implements PoshettWebInterface {

    protected app: Express;
    protected server: Server;
    protected wsServer: WebSocket.Server;

    initServer(cb?) {
        this.app = express();
        this.app.use(express.static(`${__dirname}/public`));
        if (cb) {
            cb(this.app);
        }
        this.server = http.createServer(this.app);
        this.wsServer = new WebSocket.Server({ server: this.server });
    }

    onGet(path, cb: (req: Request, res: Response) => void) {
        this.app.get(path, (req, res) => {
            console.log(`GET '${path}'`);
            cb(req, res);
        });
    }

    onWebSocket(path, cb: (ws: WebSocket) => void) {
        this.wsServer.on(path, cb);
    }

    startServer(port = 3000) {
        this.server.listen(port, () => console.log(`App listening on port ${port}!`));
    }
}

if (require.main === module) {
    console.log("Poshett-web is supposed to be used as a module. However, here's an example usage of it.");

    const poshett = new PoshettWeb();

    poshett.initServer();

    poshett.onGet('/', (req, res) => {
        res.sendFile(path.resolve('public/index.html'));
    });

    poshett.onWebSocket('connection', (ws) => {
        ws.on('message', (message: string) => {
            console.log('received: %s', message);
            ws.send(`Hello, you sent -> ${message}`);
        });

        ws.send('Hi there, I am a WebSocket server');
    });

    poshett.startServer();
}
