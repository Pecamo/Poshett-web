import Vue from 'vue';
import Router from 'vue-router';

import AlbumView from './AlbumView.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AlbumView',
      component: AlbumView,
    },
  ],
});
