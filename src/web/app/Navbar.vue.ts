import _ from 'lodash';
import Vue from 'vue';

export default Vue.extend({
  name: 'Navbar',
  props: ['isActive'],
  data() {
    return {
      timeDisplay: '',
      timeRefresher: null,
    };
  },
  methods: {
    selectTheme(event) {
      console.log(event.target.value);
      this.$emit('select-theme', event.target.value);
    },
  },
  mounted() {
    this.timeRefresher = setInterval(() => {
      const d = new Date();
      this.timeDisplay = `${d.getHours()}:${_.padStart(d.getMinutes(), 2, '0')}`;
    }, 1000);
  },
});
