import Vue from 'vue';
import App from './App.vue';
import router from './router';


import Global from '@/components/public/Global.js';
Vue.prototype.$Global = Global;

import axios from 'axios';
axios.defaults.baseURL = Global.APIURL;
axios.defaults.withCredentials = true;

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


