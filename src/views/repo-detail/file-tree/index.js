'use strict'
const template = require('./template.pug')
require('./style.stylus')
module.exports = template({
  name: 'repo-detail-branch-tree',
  components: {
    'branch-select': require('../branch-select'),
    'file-list': require('../file-list')
  },
  props: {
    branchObject: Object
  },
  computed: {
    branch () {
      return this.branchObject.name
    },
    path () {
      return this.$route.params.path || ''
    },
    paths () {
      let pathPrefix = ''
      const result = []
      const pathArray = this.path.split('/')
      pathArray.forEach(name => {
        if (!name) return
        result.push({
          name: name,
          to: this.urlPrefix + pathPrefix + '/' + name
        })
        pathPrefix += '/' + name
      })
      return result
    },
    repo () {
      return this.$route.params.repo
    },
    commit () {
      return this.branchObject.commit
    },
    urlPrefix () {
      let typeName = 'commits'
      let typeId = this.branchObject.commit
      if (this.branchObject.isBranch) {
        typeName = 'branches'
        typeId = this.branch
      } else if (this.branchObject.isTag) {
        typeName = 'tags'
        typeId = this.branch
      }
      return ['', 'repos', this.repo, typeName, typeId, 'tree'].join('/')
    }
  },
  methods: {
    init () {
      console.log(this.$route)
    }
  }
})
