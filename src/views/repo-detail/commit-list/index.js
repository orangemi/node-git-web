'use strict'
const axios = require('axios')
const template = require('./template.pug')
require('./style.stylus')
module.exports = template({
  data: () => ({
    branches: [],    
    commits: []
  }),
  computed: {
    branch () {
      return this.$route.params.branch || ''
    },
    repo () {
      return this.$route.params.repo || ''
    }
  },
  watch: {
    branch () {
      this.fetchList()
    },
    repo () {
      this.fetchBranches()
      this.fetchList()
    }
  },
  mounted () {
    this.fetchList()
    this.fetchBranches()
  },
  methods: {
    changeBranch () {
      this.$router.push({params: {branch: branch}})
    },
    async fetchBranches () {
      this.branches = []
      const urlArray = ['/api/repos', this.repo, 'branches']
      const url = urlArray.join('/')
      const resp = await axios.get(url)
      this.branches = resp.data.map(branch => branch.name)
    },
    async fetchList () {
      this.commits = []
      const urlArray = ['/api/repos', this.repo, 'branches', this.branch, 'commits']
      const url = urlArray.join('/')
      const resp = await axios.get(url)
      this.commits = resp.data
    }
  }
})
