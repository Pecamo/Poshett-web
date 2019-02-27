import {QueryType, ServeMessage, ServeType} from '../../common/messages';

console.log('Loaded !');

export default {
  name: 'AlbumView',
  data: () => ({
    imgSrc: '',
    ws: null,
  }),
  methods: {
    changeImg(newSrc: string) {
      this.imgSrc = newSrc;
    }
  },
  mounted: () => {
    this.ws = new WebSocket(`ws://${location.host}`);

    this.ws.onopen = event => {
      wsSend(this.ws, { type: QueryType.GET_MUSIC }, () => {});
    };

    this.ws.onmessage = (event) => {
      let packet: ServeMessage;

      try {
        packet = JSON.parse(event.data);
      } catch (err) {
        console.log(event);
        console.error(err);
      }

      switch (packet.type) {
        case ServeType.NEW_MUSIC:
          this.changeImg(packet.data.imgUrl);
          break;
        case ServeType.STOP_MUSIC:
          this.changeImg('');
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
  }
};
