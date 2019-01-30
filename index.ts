#!/usr/bin/env node

import * as path from 'path';
import * as WebSocket from 'ws';
import * as http from 'http';
import express, { Express } from "express";
import { Server } from "http";

interface AllMusicInformations {
    title: string;
    album: string;
    artist: string;
    imgUrl: string;
}

export type MusicInformations = Partial<AllMusicInformations>;

interface PoshettWebInterface {
    initServer(cb?: (app: Express) => void);
    startServer(port?: number);
    setCurrentMusic(music: MusicInformations);
}

export default class PoshettWeb implements PoshettWebInterface {

    protected app: Express;
    protected server: Server;
    protected wsServer: WebSocket.Server;

    private music: MusicInformations;

    initServer(cb?) {
        this.app = express();
        this.app.use(express.static(`${__dirname}/public`));
        this.app.get('/', (req, res) => {
            res.sendFile(path.resolve('public/index.html'));
        });
        if (cb) {
            cb(this.app);
        }
        this.server = http.createServer(this.app);
        this.wsServer = new WebSocket.Server({ server: this.server });
        this.wsServer.on('connection', (ws) => {
            ws.on('message', (message: string) => {
                console.log('received: %s', message);
                ws.send(`Hello ! How are you ?`);
            });

            ws.on('currentMusic', () => {
                if (!this.music) {
                    ws.send('No music is currently');
                }
                ws.send(JSON.stringify(this.music));
            });

            ws.send('Hi there, I am a WebSocket server');
        });
    }

    startServer(port = 3000) {
        this.server.listen(port, () => console.log(`App listening on port ${port}!`));
    }

    setCurrentMusic(newMusic: MusicInformations) {
        this.music = newMusic;
    }
}

if (require.main === module) {
    console.log("Poshett-web is supposed to be used as a module. However, here's an example usage of it.");

    const poshett = new PoshettWeb();

    poshett.initServer();

    poshett.startServer();

    poshett.setCurrentMusic({
        title: 'Never Gonna Give You Up',
        artist: 'Rick Astley',
        album: 'Whenever You Need Somebody',
        imgUrl: 'https://upload.wikimedia.org/wikipedia/en/1/1c/Rick_Astley_-_Whenever_You_Need_Somebody.png'
    });
}
