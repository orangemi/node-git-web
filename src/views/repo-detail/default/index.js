'use strict'
// const axios = require('axios')
const template = require('./template.pug')
module.exports = template({
  name: 'repo-detail-default',
  components: {
    'file-list': require('../file-list')
  },
  props: {
    branchObject: Object
  },
  data: () => ({
  }),
  computed: {
    repo () {
      return this.$route.params.repo
    },
    commit () {
      return this.branchObject.commit
    },
    urlPrefix () {
      return ['', 'repos', this.repo, 'branches', this.branchObject.name, 'tree'].join('/')
    }
  },
  watch: {
  },
  mounted () {
  },
  methods: {
  }
})
