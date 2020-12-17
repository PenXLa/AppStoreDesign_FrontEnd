import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Home = ()=>import("@/views/Home.vue");
const Login = ()=>import("@/views/Login.vue");
const AppDetail = ()=>import("@/views/AppDetail.vue");
const Publisher = ()=>import("@/views/Publisher/Publisher.vue");
const PubInfo = ()=>import("@/views/Publisher/PubInfo.vue");
const PublishedApps = ()=>import("@/views/Publisher/PublishedApps.vue");
const Report = ()=>import("@/views/Publisher/Report.vue");
const AppManage = ()=>import("@/views/Publisher/AppManage.vue");
const User = ()=>import("@/views/User/User.vue");
const UserInfo = ()=>import("@/views/User/UserInfo.vue");
const Orders = ()=>import("@/views/User/Orders.vue");
const MyApps = ()=>import("@/views/User/MyApps.vue");
const Billing = ()=>import("@/views/User/Billing.vue");
const Messages = ()=>import("@/views/User/Messages.vue");
const CustomService = ()=>import("@/views/CustomService/CustomService.vue");
const CustomServiceReturns = ()=>import("@/views/CustomService/Returns.vue");
const Team = ()=>import("@/views/Publisher/Team.vue");
const Admin = ()=>import("@/views/CustomService/Admin.vue");

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
        path: 'team',
        component: Team
      },
    ],
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/user',
    component: User,
    children: [ 
      {
        path: '',
        component: UserInfo
      },
      {
        path: 'orders',
        component: Orders
      },
      {
        path: 'myapps',
        component: MyApps
      },
      {
        path: 'billing',
        component: Billing
      },
      {
        path: 'messages',
        component: Messages
      }
    ],
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/custom-service',
    component: CustomService,
    children: [ 
      {
        path: '',
        component: CustomServiceReturns
      },
      {
        path: 'admin',
        component: Admin
      },
      
    ],
    meta: {
      keepAlive: false
    }
  },
]

const router = new VueRouter({
  routes,
  base: process.env.NODE_ENV === 'production' ? '/AppStore/' : '/'
})

export default router
