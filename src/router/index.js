import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Home = ()=>import("@/views/Home.vue");
const Login = ()=>import("@/views/Login.vue");
const AppDetail = ()=>import("@/views/AppDetail.vue");
const Publisher = ()=>import("@/views/Publisher/Publisher.vue");
const PubInfo = ()=>import("@/views/Publisher/PubInfo.vue");
const PublishedApps = ()=>import("@/views/Publisher/PublishedApps.vue");
const PushApp = ()=>import("@/views/Publisher/PushApp.vue");
const Overview = ()=>import("@/views/Publisher/Overview.vue");
const Report = ()=>import("@/views/Publisher/Report.vue");
const AppManage = ()=>import("@/views/Publisher/AppManage.vue");

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
  },
  {
    path: '/publisher',
    component: Publisher,
    children: [ 
      {
        path: '',
        component: Overview
      },
      {
        path: 'pubinfo',
        component: PubInfo
      },
      {
        path: 'report',
        component: Report
      },
      {
        path: 'apps',
        component: PublishedApps
      },
      {
        path: 'app/:id',
        component: AppManage
      },
      {
        path: 'newapp',
        component: PushApp
      }
    ],
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
