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
    //   path: '',
    //   name: 'repo-detail-summary',
    //   component: () => import('views/repo-detail/default/index.vue'),
    // }, {
      path: ':type(branch|tag|commit)/:name/tree/:path(.*)?',
      name: 'repo-branch-tree',
      component: () => import('views/repo-detail/file-list/index.vue'),
//     }, {
//       path: 'tags/:tag/tree/:path(.*)?',
//       name: 'repo-tag-file-tree',
//       component: resolve => require(['views/repo-detail/file-tree'], resolve)
//     }, {
//       path: 'commits/:commit/tree/:path(.*)?',
//       name: 'repo-commit-file-tree',
//       component: resolve => require(['views/repo-detail/file-tree'], resolve)
    }, {
      path: ':type(branch|tag|commit)/:name/blob/:path(.*)?',
      name: 'repo-branch-file',
      component: () => import('views/repo-detail/file-detail/index.vue'),
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