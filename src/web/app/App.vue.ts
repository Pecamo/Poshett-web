import _ from 'lodash';
import Vue from 'vue';
import { Fragment } from 'vue-fragment';
import {QueryType, ServeMessage, ServeType} from '../../common/messages';
import Navbar from './Navbar.vue';
import DetailsView from './themes/DetailsView.vue';
import FullAlbumView from './themes/FullAlbumView.vue';

export default Vue.extend({
  name: 'app',
  data() {
    return {
      activity: false,
      songData: {},
      ws: null,
      theme: 'FullAlbumView',
    };
  },
  components: {Navbar, Fragment, FullAlbumView, DetailsView},
  methods: {
    onThemeSelect(value) {
      this.theme = value;
    },
  },
  mounted() {
    // Overlay logic
    const deactivate = () => { this.activity = false; };
    const activate = () => { this.activity = true; };
    const debouncedDeactivate = _.debounce(() => { deactivate(); }, 2000);

    document.body.onmousemove = () => {
      activate();
      debouncedDeactivate();
    };

    // WebSocket logic
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
          if (!('data' in packet)) {
            break;
          }
          this.songData = packet.data;
          break;
        case ServeType.STOP_MUSIC:
          this.songData = {};
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
  },
});
