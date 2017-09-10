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
  }
})
