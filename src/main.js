import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import router from './router'
import store from './store'
import '@/styles/index.scss' // global css

import 'ant-design-vue/dist/antd.css'
Vue.use(Antd)
Vue.config.productionTip = false
// router.addRoutes(asyncRouterMap)
// debugger

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
