import Vue from 'vue';

console.log('NAVBAR !');

export default Vue.extend({
  name: 'Navbar',
  props: ['isActive'],
  data() {
    return {
      timeDisplay: '',
      timeRefresher: null,
    };
  },
  mounted() {
    this.timeRefresher = setInterval(() => {
      const d = new Date();
      this.timeDisplay = `${d.getHours()}:${d.getMinutes()}`;
    }, 1000);
  },
});
