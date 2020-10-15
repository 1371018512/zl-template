import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/icons' // icon
import '@/styles/index.scss' // global css
import '@/styles/theme.scss' // global css
import '@/assets/icon/iconfont.css'
import '@/assets/icon/iconfont.js'

import './permission' // permission control

Vue.config.productionTip = false
Vue.config.devtools = true
Vue.use(ElementUI)


new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
