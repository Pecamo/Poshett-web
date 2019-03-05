import Vue from 'vue';
import Router from 'vue-router';

// /!\ The router is currently not used as we only have one route.

import FullAlbumView from './themes/FullAlbumView.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'FullAlbumView',
      component: FullAlbumView,
    },
  ],
});
