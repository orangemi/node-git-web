'use strict'
// const axios = require('axios')
const template = require('./template.pug')
module.exports = template({
  components: {
    'file-list': require('./file-list')
  },
  data: () => ({
  }),
  computed: {
    repo () {
      return this.$route.params.repo
    },
    path () {
      return this.$route.params.path || ''
    }
  },
  mounted () {
  },
  methods: {
    async fetchDefaultBranch () {
      const urlArray = ['/api/repos', this.repo, 'branches']
      const url = urlArray.join('/')
      const resp = await axios.get(url)
      const branches = this.branches = resp.data
      this.$emit('branches', branches)
      if (branches.length) {
        this.$router.replace({name: 'repo-branch-file-list', params: {repo: this.repo, branch: branches[0].name}})
      }
    }
  }
})
