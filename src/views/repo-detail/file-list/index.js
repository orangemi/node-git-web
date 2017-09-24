'use strict'
const axios = require('axios')
const template = require('./template.pug')
require('./style.stylus')
module.exports = template({
  props: {
    // branch: String,
    // tag: String,
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
    // _routerName () {
    //   return this.routerName ? this.routerName : this.$route.name
    // },
    paths () {
      return []
    //   const paths = []
    //   let previousPath = ''
    //   this.path.split('/').forEach((name, i) => {
    //     if (!name) return
    //     previousPath += '/' + name
    //     paths.push({
    //       name: name,
    //       path: previousPath.substring(1)
    //     })
    //   })
    //   return paths
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
        await this.getBlob()
      }
    },
    async getBlob () {
      const urlArray = ['/api/repos', this.repo, 'commits', this.commit, 'blob', this.entry.path]
      const url = urlArray.join('/')
      const resp = await axios.get(url)
      this.blob = resp.data
    },
    async getReadme () {
      this.files.forEach(file => {
        if (/^readme(\.(txt|md))?$/i.test(file.name)) {
          this.entry = file
        }
      })
      await this.getBlob()
    }
  }
})
