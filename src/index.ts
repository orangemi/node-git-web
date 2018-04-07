import router from './router'

import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'

import './plugins'
import Home from 'views/home/index.vue'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Router)
Vue.use(ElementUI)

const home = new Home({
  router: router
})
console.log('index done')
home.$mount('#app')