import Vue from 'vue';
import App from './App.vue';
import router from './router';

import Global from '@/components/public/Global.js';
Vue.prototype.$Global = Global;

import axios from 'axios';
axios.defaults.baseURL = Global.APIURL;
axios.defaults.withCredentials = true;

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.use(Antd)

Vue.use(require('vue-moment'));

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


