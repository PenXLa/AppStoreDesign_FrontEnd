import Vue from 'vue';
import App from './App.vue';
import router from './router';


import axios from 'axios';
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 
                                'https://impxl.cn/AppStoreAPI' : //生产环境API
                                'http://localhost:8080/AppStoreAPI';  //开发环境APi
axios.defaults.withCredentials = true;


import Global from '@/components/public/Global.js';
Vue.prototype.$Global = Global;

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


