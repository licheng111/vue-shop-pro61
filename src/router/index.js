import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Home from '@/components/home'
import Welcome from '@/components/welcome'

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [{ path: '/welcome', component: Welcome }]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    return next()
  }
  var token = window.sessionStorage.getItem('token')
  if (!token) {
    return next('/')
  }
  next()
})
export default router
