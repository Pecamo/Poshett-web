// @ts-ignore
import express from 'express';
import * as http from 'http';
import * as path from 'path';
import * as WebSocket from 'ws';
import {QueryMessage, QueryType, ServeMessage, ServeType} from '../common/messages';
import {MusicInformations} from '../common/music';

interface PoshettWebInterface {
  initServer(callback?: (expressApp: express.Express) => void): void;
  startServer(port?: number): void;
  setCurrentMusic(music: MusicInformations): void;
  stopCurrentMusic(): void;
}

/**
 * Web server that serves the page displaying the currently playing track.
 */
export default class PoshettWeb implements PoshettWebInterface {
  protected app: express.Express;
  protected server: http.Server;
  protected wsServer: WebSocket.Server;

  private music: MusicInformations;
  private wsClients: Array<WebSocket> = [];

  /**
   * Creates the initial Express app. Allows a callback to be passed in order to customize the Express app.
   *
   * @param callback - Will be executed with the Express app passed as a parameter.
   */
  initServer(callback?: (expressApp: express.Express) => void) {
    this.app = express();
    this.app.use('/', express.static(path.resolve(__dirname, '../web')));

    if (callback) {
      callback(this.app);
    }
  }

  /**
   * Starts the app.
   *
   * @param port - Port on which to listen. If no port is specified, the server will try to listen on port 3000, and
   * increment the port number up to 3015 if each port is already used.
   */
  startServer(port?) {
    this.server = http.createServer(this.app);
    let finalPort = port;
    if (finalPort === undefined) { // Try other ports when it wasn't specified
      finalPort = 3000;
      this.server.on('error', (err: any) => {
        if (err.code === 'EADDRINUSE') {
          finalPort++;
          console.log(`Port already in use, retrying on port ${finalPort}`);
          setTimeout(() => {
            if (finalPort < 3015) {
              this.startServer(finalPort);
            } else {
              console.error('Too many port retries.');
            }
          }, 0);
        } else {
          console.error(finalPort);
        }
      });
    }

    this.server.listen(finalPort, () => {
      this.wsServer = new WebSocket.Server({ server: this.server });
      this.wsServer.on('connection', (ws: WebSocket) => this.handleWsConnection(ws));
      console.log(`App listening on port ${finalPort}!`);
    });
  }

  /**
   * Tells the app to change the currently playing music.
   *
   * @param newMusic
   */
  setCurrentMusic(newMusic: MusicInformations) {
    this.music = newMusic;
    this.notifyAll();
  }

  stopCurrentMusic() {
    this.music = null;
    this.notifyAll();
  }

  // Private methods

  private notifyAll() {
    this.wsClients.forEach((ws: WebSocket) => {
      this.wsSend(ws, this.getCurrentMusicMessage());
    });
  }

  private getCurrentMusicMessage() {
    if (this.music === null) {
      return {
        type: ServeType.STOP_MUSIC,
      };
    }
    return {
      type: ServeType.NEW_MUSIC,
      data: this.music,
    };
  }

  private handleWsConnection(ws: WebSocket) {
    this.wsClients.push(ws);

    ws.on('message', (packet: string) => {
      let message: QueryMessage;

      try {
        message = JSON.parse(packet);
      } catch (err) {
        console.log(message);
        console.error(err);
      }

      switch (message.type) {
        case QueryType.GET_MUSIC:
          this.wsSend(ws, this.getCurrentMusicMessage());
          break;
        default:
          console.warn('Unknown packet:', message);
          break;
      }

      this.notifyAll();

    });

    ws.on('close', () => {
      this.wsClients.splice(this.wsClients.indexOf(ws), 1);
    });

    this.wsSend(ws, { type: ServeType.KEEP_ALIVE });
  }

  private wsSend(ws: WebSocket, msg: ServeMessage, cb: (err?: Error) => void = (err) => {}) {
    ws.send(JSON.stringify(msg), (err) => cb(err));
  }
}
