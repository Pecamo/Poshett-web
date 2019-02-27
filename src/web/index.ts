/// <reference path="./vue-file-shims.d.ts" />
import "style.sass";
import Vue from 'vue';
import router from './app/router';
import App from './app/App.vue';

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
});
