import Vue from 'vue';
import App from './App.vue';
import router from './router';


import axios from 'axios';
axios.defaults.baseURL = 'http://127.0.0.1:8080/AppStoreAPI';
axios.defaults.withCredentials = true;


import Global from '@/components/public/Global.js';
Vue.prototype.$Global = Global;
Global.updateUserInfo();

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


