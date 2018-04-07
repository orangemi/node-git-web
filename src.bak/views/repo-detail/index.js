'use strict'
const axios = require('axios')
const template = require('./template.pug')
require('./style.stylus')
module.exports = template({
  name: 'repo-detail',
  data: () => ({
    branchObject: {}
  }),
  computed: {
    repo () {
      return this.$route.params.repo
    },
    path () {
      return this.$route.params.path || ''
    },
    branch () {
      return this.$route.params.branch
    }
  },
  mounted () {
    this.fetchDefaultBranch()
  },
  methods: {
    async fetchDefaultBranch () {
      await this.fetchBranches()
      if (this.branches.length) {
        this.branchObject = this.branches[0]
      }
    },
    async fetchBranches () {
      const urlArray = ['/api/repos', this.repo, 'branches']
      const url = urlArray.join('/')
      const resp = await axios.get(url)
      this.branches = resp.data
    }
  }
})
