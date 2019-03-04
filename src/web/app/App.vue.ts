import _ from 'lodash';
import Vue from 'vue';
import { Fragment } from 'vue-fragment';
import Navbar from './Navbar.vue';

export default Vue.extend({
  name: 'app',
  data() {
    return {
      activity: false,
    };
  },
  components: {Navbar, Fragment},
  mounted() {
    const deactivate = () => {
      this.activity = false;
      console.log('-');

    };
    const activate = () => {
      this.activity = true;
      console.log('+');
    };
    const debouncedDeactivate = _.debounce(() => { deactivate(); }, 2000);

    document.body.onmousemove = (e) => {
      activate();
      debouncedDeactivate();
    };
  },
});
