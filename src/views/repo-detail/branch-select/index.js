'use strict'
const axios = require('axios')
const template = require('./template.pug')
// require('./style.stylus')
module.exports = template({
  props: {
    path: String,
    repo: String,
    value: String
  },
  data: () => ({
    branchName: 'master',
    branches: []
  }),
  computed: {
    currentBranch () {
      return this.branches.filter(branch => branch.name === this.branchName)[0]
    }
  },
  watch: {
    value () {
      this.branchName = this.value
    },
    repo () {
      this.fetchBranches()
      this.fetchList()
    }
  },
  mounted () {
    this.fetchList()
  },
  methods: {
    async fetchList () {
      const url = ['', 'api', 'repos', this.repo, 'branches'].join('/')
      const resp = await axios.get(url)
      this.branches = resp.data
      console.log('hhhh', this.branches)
    },
    onInput () {
      this.$emit('input', this.currentBranch)
    }
  }
})
