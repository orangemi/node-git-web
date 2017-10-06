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
    currentBranchObject: {},
    commits: []
  }),
  computed: {
    branchName () {
      return this.$route.params.branch
    },
    branch () {
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
    }
  },
  watch: {
    currentBranchObject () {
      this.fetchCommit()
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      let url = ['/api/repos', this.repo, 'branches', this.branchName].join('/')
      const resp = await axios.get(url)
      this.currentBranchObject = resp.data
    },
    checkout (branchObject) {
      this.currentBranchObject = branchObject
      this.$router.push({params: {branch: this.branch}})
    },
    async fetchCommit () {
      this.commits = []
      const url = ['', 'api', 'repos', this.repo, 'commits', this.commit, 'commits'].join('/')
      const resp = await axios.get(url)
      this.commits = resp.data
    },
    // brwoseFile (commit) {
    //   this.$router
    // }
  }
})
