import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Home = ()=>import("@/views/Home.vue");
const Login = ()=>import("@/views/Login.vue");
const AppDetail = ()=>import("@/views/AppDetail.vue");

const routes = [
  {
    path: '/',
    component: Home,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/login',
    component: Login,
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/app/:id',
    component: AppDetail,
    meta: {
      keepAlive: false
    }
  }
]

const router = new VueRouter({
  routes,
  base: process.env.NODE_ENV === 'production' ? '/AppStore/' : '/'
})

export default router
