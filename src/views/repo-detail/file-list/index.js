'use strict'
const axios = require('axios')
const template = require('./template.pug')
require('./style.stylus')
module.exports = template({
  data: () => ({
    branches: [],
    files: [],
    entry: {},
    blob: ''
  }),
  computed: {
    path () {
      return this.$route.params.path || ''
    },
    branch () {
      return this.$route.params.branch || ''
    },
    repo () {
      return this.$route.params.repo || ''
    },
    paths () {
      const paths = []
      let previousPath = ''
      this.path.split('/').forEach((name, i) => {
        if (!name) return
        previousPath += '/' + name
        paths.push({
          name: name,
          path: previousPath.substring(1)
        })
      })
      return paths
    }
  },
  watch: {
    path () {
      this.fetchList()
    },
    branch () {
      this.fetchList()
    },
    repo () {
      this.fetchBranches()
      this.fetchList()
    }
  },
  mounted () {
    this.fetchList()
    this.fetchBranches()
  },
  methods: {
    changeBranch (branch) {
      this.$router.push({params: {branch: branch}})
    },
    async fetchBranches () {
      this.branches = []
      const urlArray = ['/api/repos', this.repo, 'branches']
      const url = urlArray.join('/')
      const resp = await axios.get(url)
      this.branches = resp.data.map(branch => branch.name)
    },
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
        await this.getReadme()
      } else {
        this.entry = resp.data
        await this.getBlob()
      }
    },
    async getBlob () {
      const urlArray = ['/api/repos', this.repo, 'branches', this.branch, 'blob', this.entry.path]
      const url = urlArray.join('/')
      const resp = await axios.get(url)
      this.blob = resp.data
    },
    async getReadme () {
      this.files.forEach(file => {
        if (/^readme\.(txt|md)/i.test(file.name)) {
          this.entry = file
        }
      })
      await this.getBlob()
    }
  }
})
