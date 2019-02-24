import {
    MusicInformations
} from "./music";

export interface BaseMessage {
    type: string;
    data?: any;
}

export enum ServeType {
    NEW_MUSIC = 'NEW_MUSIC',
    STOP_MUSIC = 'STOP_MUSIC',
    KEEP_ALIVE = 'KEEP_ALIVE',
    ERROR = 'ERROR'
}

export enum QueryType {
    GET_MUSIC = 'GET_MUSIC',
}

export interface QueryMessage extends BaseMessage {
    type: QueryType;
}

export interface ServeMessage extends BaseMessage {
    type: ServeType;
}

export type Message = QueryMessage | ServeMessage;

export interface NewMusicMessage extends ServeMessage {
    type: ServeType.NEW_MUSIC;
    data: MusicInformations;
}

export interface StopMusicMessage extends ServeMessage {
    type: ServeType.STOP_MUSIC;
}

export interface KeepAliveMessage extends ServeMessage {
    type: ServeType.KEEP_ALIVE;
}

export interface ErrorMessage extends ServeMessage {
    type: ServeType.ERROR;
    data?: string;
}

export interface GetMusicMessage extends QueryMessage {
    type: QueryType.GET_MUSIC;
}
