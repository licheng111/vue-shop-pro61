import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/global.css'
import './assets/fonts/iconfont.css'
import axios from 'axios'
// import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.prototype.$http = axios
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
