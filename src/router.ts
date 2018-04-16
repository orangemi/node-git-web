import Router from 'vue-router'

const router = new Router({
  base: '/',
  mode: 'history',
  routes: [{
    path: '/',
    redirect: '/repos'
  }, {
    path: '/repos',
    name: 'repo-list',
    component: () => import('views/repo-list/index.vue'),
  }, {
    path: '/repos/:repo',
    name: 'repo-detail',
    component: () => import('views/repo-detail/index.vue'),
    children: [{
      path: 'tree/:path(.*)?',
      name: 'repo-tree',
      component: () => import('views/repo-detail/file-list/index.vue'),
    }, {
      path: 'blob/:path(.*)?',
      name: 'repo-blob',
      component: () => import('views/repo-detail/file-detail/index.vue'),
//     }, {
//       path: 'commits/:commit/commits',
//       name: 'repo-commit-list',
//       component: resolve => require(['views/repo-detail/commit-list'], resolve)
    }]
  }]
})

export default router