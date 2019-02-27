import {QueryType, ServeMessage, ServeType} from '../../common/messages';

console.log('Loaded !');

const coverImg: HTMLImageElement = document.querySelector('.cover-img');
const ws = new WebSocket(`ws://${location.host}`);

ws.onopen = event => {
  wsSend(ws, { type: QueryType.GET_MUSIC }, () => {});
};

ws.onmessage = (event) => {
  let packet: ServeMessage;

  try {
    packet = JSON.parse(event.data);
  } catch (err) {
    console.log(event);
    console.error(err);
  }

  switch (packet.type) {
    case ServeType.NEW_MUSIC:
      coverImg.src = packet.data.imgUrl;
      break;
    case ServeType.STOP_MUSIC:
      coverImg.src = '';
      break;
    case ServeType.KEEP_ALIVE:
      break;
    case ServeType.ERROR:
      console.warn(`An error occured in the backend :${packet.data}`);
    default:
      console.warn('Unknown packet:', packet);
      break;
  }
};

function wsSend(ws, msg, cb) {
  ws.send(JSON.stringify(msg), (err) => cb(err));
}

export default {
  name: 'AlbumView',
};
