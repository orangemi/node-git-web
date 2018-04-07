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
    files: [],
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
    canShowEntry () {
      return !!this.entry.sha
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
      this.files = []
      this.entry = {}
      this.blob = ''
      const path = this.path || ''
      const urlArray = ['/api/repos', this.repo, 'commits', this.commit, 'tree']
      if (path) urlArray.push(path)
      const url = urlArray.join('/')
      const resp = await axios.get(url)
      const entry = resp.data
      if (Array.isArray(entry)) {
        this.files = resp.data
        await this.getReadme()
      } else {
        this.entry = resp.data
        this.files = [this.entry]
        if (this.entry.size < 2 * 1024 * 1024) {
          await this.getBlob()
        }
      }
    },
    async getBlob () {
      const urlArray = ['/api/repos', this.repo, 'commits', this.commit, 'blob', this.entry.path]
      const url = urlArray.join('/')
      const resp = await axios.get(url, {
        transformResponse: [data => data]
      })
      this.blob = resp.data
    },
    async getReadme () {
      this.files.forEach(file => {
        if (/^readme(\.(txt|md))?$/i.test(file.name)) {
          this.entry = file
        }
      })
      if (this.entry && this.entry.path) await this.getBlob()
    }
  }
})
