import {
    MusicInformations
} from "./music";

export interface BaseMessage {
    type: string;
    data?: any;
}

export enum ServeType {
    newMusic = 'newMusic',
    stopMusic = 'stopMusic',
    keepAlive = 'keepAlive',
    error = 'error'
}

export enum QueryType {
    getMusic = 'getMusic',
}

export interface QueryMessage extends BaseMessage {
    type: QueryType;
}

export interface ServeMessage extends BaseMessage {
    type: ServeType;
}

export type Message = QueryMessage | ServeMessage;

export interface NewMusicMessage extends ServeMessage {
    type: ServeType.newMusic;
    data: MusicInformations;
}

export interface StopMusicMessage extends ServeMessage {
    type: ServeType.stopMusic;
}

export interface KeepAliveMessage extends ServeMessage {
    type: ServeType.keepAlive;
}

export interface ErrorMessage extends ServeMessage {
    type: ServeType.error;
    data?: string;
}

export interface GetMusicMessage extends QueryMessage {
    type: QueryType.getMusic;
}
