'use strict'
const axios = require('axios')
const template = require('./template.pug')
require('./style.stylus')
module.exports = template({
  name: 'repo-detail-branch-tree',
  components: {
    'branch-select': require('../branch-select'),
    'file-list': require('../file-list')
  },
  data: () => ({
    currentBranchObject: {}
  }),
  computed: {
    branchName () {
      return this.$route.params.branch
    },
    tagName () {
      return this.$route.params.tag
    },
    commitName () {
      return this.$route.params.commit
    },
    name () {
      return this.currentBranchObject.name || ''
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
      return this.currentBranchObject.commit
    },
    commitUrl () {
      return this.urlPrefix.replace(/tree$/, 'commits')
    },
    urlPrefix () {
      let typeName = 'commits'
      let typeId = this.currentBranchObject.commit
      if (this.currentBranchObject.isBranch) {
        typeName = 'branches'
        typeId = encodeURIComponent(this.name)
      } else if (this.currentBranchObject.isTag) {
        typeName = 'tags'
        typeId = encodeURIComponent(this.name)
      }
      return ['', 'repos', this.repo, typeName, typeId, 'tree'].join('/')
    }
  },
  watch: {
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      if (this.branchName) {
        const url = ['/api/repos', this.repo, 'branches', this.branchName].join('/')
        const resp = await axios.get(url)
        this.currentBranchObject = resp.data
      } else if (this.tagName) {
        const url = ['/api/repos', this.repo, 'tags', this.tagName].join('/')
        const resp = await axios.get(url)
        this.currentBranchObject = resp.data
      } else if (this.commitName) {
        const url = ['/api/repos', this.repo, 'commits', this.commitName].join('/')
        const resp = await axios.get(url)
        this.currentBranchObject = resp.data
      }
    },
    checkout (branchObject) {
      if (branchObject.isBranch) {
        this.$router.push({
          name: 'repo-branch-file-tree',
          params: {
            branch: branchObject.name,
            path: this.path
          }
        })
      } else if (branchObject.isTag) {
        this.$router.push({
          name: 'repo-tag-file-tree',
          params: {
            tag: branchObject.name,
            path: this.path
          }
        })
      } else {
        this.$router.push({
          name: 'repo-commit-file-tree',
          params: {
            commit: branchObject.name,
            path: this.path
          }
        })
      }
    }
  }
})
