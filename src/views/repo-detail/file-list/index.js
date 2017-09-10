'use strict'
const axios = require('axios')
const template = require('./template.pug')
module.exports = template({
  props: {
    repo: String,
    branch: String,
    path: String
  },
  data: () => ({
    files: [],
    entry: {},
    blob: ''
  }),
  computed: {
    _path () {
      return '/' + (this.path || '')
    },
    parent () {
      let path = this.path || ''
      let paths = path.split('/')
      paths.pop()
      return paths.join('/')
    }
  },
  watch: {
    path () {
      this.fetchList()
    }
  },
  mounted () {
    this.fetchList()
  },
  methods: {
    async fetchList () {
      this.files = []
      this.entry = {}
      const path = this.path || ''
      const urlArray = ['/api/repos', this.repo, 'branches', this.branch, 'tree']
      if (path) urlArray.push(path)
      const url = urlArray.join('/')
      const resp = await axios.get(url)
      const entry = resp.data
      if (Array.isArray(entry)) {
        this.files = resp.data
        // TODO check README.* OR something can render ...
      } else {
        this.entry = resp.data
        await this.getBlob()
      }
    },
    async getBlob () {
      const urlArray = ['/api/repos', this.repo, 'branches', this.branch, 'blob', this.path]
      const url = urlArray.join('/')
      const resp = await axios.get(url)
      this.blob = resp.data
    }
  }
})
