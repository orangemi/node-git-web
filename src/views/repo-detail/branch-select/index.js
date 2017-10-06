'use strict'
const axios = require('axios')
const template = require('./template.pug')
// require('./style.stylus')
module.exports = template({
  props: {
    path: String,
    repo: String,
    value: Object
    // branchObject: Object
  },
  data: () => ({
    branchName: 'master',
    branches: [],
    tags: []
  }),
  computed: {
    branchObject () {
      return this.value
    },
    commits () {
      let result = []
      result = result.concat(this.branches)
      result = result.concat(this.tags)
      if (!this.branchObject.isBranch && !this.branchObject.isTag) {
        result = result.concat(this.branchObject)
      }
      return result
    },
    currentBranchObject () {
      let results = this.commits
        .filter(branch => branch.name === this.branchName)
      return results[0]
    }
  },
  watch: {
    branchObject (branchObject) {
      this.branchName = branchObject.name
    },
    // branchName () {
    //   console.log('watch branchName', this.branchName, Object.assign({}, this.currentBranchObject))
    //   this.$emit('input', this.currentBranchObject)
    // },
    repo () {
      this.fetchList()
    }
  },
  mounted () {
    this.fetchList()
  },
  methods: {
    async fetchList () {
      await Promise.all([this.fetchBranches(), this.fetchTags()])
    },
    async fetchBranches () {
      this.branches = []
      const url = ['', 'api', 'repos', this.repo, 'branches'].join('/')
      const resp = await axios.get(url)
      this.branches = resp.data
    },
    async fetchTags () {
      this.tags = []
      const url = ['', 'api', 'repos', this.repo, 'tags'].join('/')
      const resp = await axios.get(url)
      this.tags = resp.data
    },
    onInput () {
      this.$emit('input', this.currentBranchObject)
    }
  }
})
