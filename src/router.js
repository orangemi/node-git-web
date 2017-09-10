'use strict'
const Vue = require('vue').default
const Router = require('vue-router').default
const ElementUI = require('element-ui')
Vue.use(Router)
Vue.use(ElementUI)
require('element-ui/lib/theme-default/index.css')

const Home = require('views/home')
const router = new Router({
  base: '/',
  mode: 'history',
  routes: [{
    path: '/',
    redirect: '/repos'
  }, {
    path: '/repos',
    name: 'repo-list',
    component: resolve => require(['views/repo-list'], resolve)
  }, {
    path: '/repos/:repo',
    component: resolve => require(['views/repo-detail'], resolve),
    children: [{
      path: '',
      name: 'repo-detail',
      component: resolve => require(['views/repo-detail/default'], resolve),
    }, {
      path: 'branches/:branch/tree/:path?',
      name: 'repo-branch-file-list',
      component: resolve => require(['views/repo-detail/file-list'], resolve),
    }]
  }]
})
Home.router = router
new Vue(Home).$mount('#app')
