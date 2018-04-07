import Router from 'vue-router'

// const Home = require('views/home')
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
    //   path: '',
    //   name: 'repo-detail-summary',
    //   component: () => import('views/repo-detail/default/index.vue'),
    // }, {
      path: 'branch/:branch/tree/:path(.*)?',
      name: 'repo-branch-file-tree',
      component: () => import('views/repo-detail/file-list/index.vue'),
//     }, {
//       path: 'tags/:tag/tree/:path(.*)?',
//       name: 'repo-tag-file-tree',
//       component: resolve => require(['views/repo-detail/file-tree'], resolve)
//     }, {
//       path: 'commits/:commit/tree/:path(.*)?',
//       name: 'repo-commit-file-tree',
//       component: resolve => require(['views/repo-detail/file-tree'], resolve)
//     }, {
//       path: 'branches/:branch/blob/:path',
//       name: 'repo-branch-commit-list2',
//       component: resolve => require(['views/repo-detail/commit-list'], resolve)
//     }, {
//       path: 'commits/:commit/commits',
//       name: 'repo-commit-list',
//       component: resolve => require(['views/repo-detail/commit-list'], resolve)
//     }, {
//       path: 'branches/:branch/commits',
//       name: 'repo-branch-commit-list',
//       component: resolve => require(['views/repo-detail/commit-list'], resolve)
//     }, {
//       path: 'tags/:tag/commits',
//       name: 'repo-tag-commit-list',
//       component: resolve => require(['views/repo-detail/commit-list'], resolve)
    }]
  }]
})

export default router