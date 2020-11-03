import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = ()=>import("@/views/Home.vue")
const Login = ()=>import("@/views/Login.vue")

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  routes,
  base: process.env.NODE_ENV === 'production' ? '/AppStore/' : '/'
})

export default router
