/// <reference path="./vue-file-shims.d.ts" />
import 'style.sass';
import Vue from 'vue';
import App from './app/App.vue';
import router from './app/router';

// tslint:disable-next-line:no-unused-expression
new Vue({
  router,
  el: '#app',
  template: '<App/>',
  components: { App },
});
