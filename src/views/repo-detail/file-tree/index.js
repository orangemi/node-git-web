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
  data: () => ({
    currentBranch: {}
  }),
  computed: {
    branch () {
      return this.currentBranch.name || ''
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
      return this.currentBranch.commit
    },
    urlPrefix () {
      let typeName = 'commits'
      let typeId = this.currentBranch.commit
      if (this.currentBranch.isBranch) {
        typeName = 'branches'
        typeId = this.branch
      } else if (this.currentBranch.isTag) {
        typeName = 'tags'
        typeId = this.branch
      }
      return ['', 'repos', this.repo, typeName, typeId, 'tree'].join('/')
    }
  },
  watch: {
    branchObject (branchObject) {
      this.checkout(branchObject)
    }
  },
  mounted () {
    // this.checkout(this.branchObject)
  },
  methods: {
    checkout (branchObject) {
      console.log('checkout', branchObject.name, branchObject)
      this.currentBranch = branchObject
    }
  }
})
