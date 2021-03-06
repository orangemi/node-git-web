
import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import highlightJs from 'vue-highlightjs'

import './plugins'
import Home from 'views/home/index.vue'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Router)
Vue.use(ElementUI)
Vue.use(highlightJs)

const home = new Home({
  router: router
})
home.$mount('#app')