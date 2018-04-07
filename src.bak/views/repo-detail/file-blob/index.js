'use strict'
const Vue = require('vue').default
const highlightJs = require('vue-highlightjs')
Vue.use(highlightJs)

const axios = require('axios')
const template = require('./template.pug')
require('./style.stylus')
module.exports = template({
  props: {
    urlPrefix: String,
    path: String,
    repo: String,
    commit: String
  },
  data: () => ({
    entry: {},
    blob: ''
  }),
  computed: {
    filename () {
      return this.entry.name
    },
    fileType () {
      return this.filename.split('.').pop() || ''
    },
    canShowBlob () {
      return this.entry.size < 10 * 1024
    }
  },
  watch: {
    path () {
      this.fetchList()
    },
    commit () {
      this.fetchList()
    },
    repo () {
      this.fetchList()
    }
  },
  mounted () {
    this.fetchList()
    // this.fetchBranches()
  },
  methods: {
    async fetchList () {
      if (!this.commit) return
      this.entry = {}
      this.blob = ''
      const url = ['/api/repos', this.repo, 'commits', this.commit, 'tree', this.path].join('/')
      const resp = await axios.get(url)
      this.entry = resp.data
      if (!this.entry.isFile) { throw new Error('entry not a file') }
      if (this.entry.size < 2 * 1024 * 1024) {
        await this.getBlob()
      }
    },
    async getBlob () {
      const urlArray = ['/api/repos', this.repo, 'commits', this.commit, 'blob', this.entry.path]
      const url = urlArray.join('/')
      const resp = await axios.get(url, {
        transformResponse: [data => data]
      })
      this.blob = resp.data
    }
  }
})
