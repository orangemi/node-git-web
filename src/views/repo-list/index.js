'use strict'
const axios = require('axios')
const template = require('./template.pug')
module.exports = template({
  components: {
    'new-repo-dialog': require('./new-repo-dialog')
  },
  data: () => ({
    showCreateRepoDialog: false,
    repos: []
  }),
  mounted () {
    this.fetchList()
  },
  methods: {
    async fetchList () {
      const resp = await axios.get('/api/repos')
      this.repos = resp.data
    }
  }
})
