'use strict'
const axios = require('axios')
const template = require('./template.pug')
module.exports = template({
  data: () => ({
    name: ''
  }),
  methods: {
    async createRepo () {
      const data = {
        name: this.name
      }
      await axios.post('/api/repos', data)
      this.$router.push({name: 'repo-detail', params: {repo: this.name}})
    }
  }
})
