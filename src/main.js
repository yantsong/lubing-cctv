import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import router from './router'
import store from './store'
import '@/styles/index.scss' // global css
import 'ant-design-vue/dist/antd.css'
console.log(App,Antd)
Vue.use(Antd)
Vue.config.productionTip = false
console.log(router,'router')
// router.addRoutes(asyncRouterMap)
// debugger

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
