'use strict'
const axios = require('axios')
const template = require('./template.pug')
module.exports = template({
  data: () => ({
  }),
  computed: {
    repo () {
      return this.$route.params.repo
    }
  },
  watch: {
    repo () {
      this.fetchDefaultBranch()
    }
  },
  mounted () {
    console.log('default mounted')
    this.fetchDefaultBranch()
  },
  methods: {
    async fetchDefaultBranch () {
      const urlArray = ['/api/repos', this.repo, 'branches']
      const url = urlArray.join('/')
      const resp = await axios.get(url)
      const branches = resp.data
      this.$emit('branches', branches)
      if (branches.length) {
        this.$router.replace({name: 'repo-branch-file-list', params: {repo: this.repo, branch: branches[0].name}})
      }
    }
  }
})
