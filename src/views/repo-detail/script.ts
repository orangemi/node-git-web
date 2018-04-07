import Vue from 'vue'
import axios from 'axios'
import Component from 'vue-class-component'
import fileList from './file-list/index.vue'

interface RepoInfo {
  name: string
  url: string
}

interface CommitInfo {
  hash: string
}

@Component({
  components: {
    'file-list': fileList
  }
})
export default class RepoDetailView extends Vue {
  repos: Array<RepoInfo> = []
  commitInfo: CommitInfo = {hash: ''}

  get repo () {
    return this.$route.params.repo
  }
  get path () {
    return this.$route.params.path || ''
  }
  get branch () {
    return this.$route.params.branch || ''
  }
  get tag () {
    return this.$route.params.tag || ''
  }
  get commit () {
    return this.$route.params.commit || ''
  }

  mounted () {
    this.fetchCommitInfo()
  }
  
  async fetchCommitInfo () {
    if (this.branch) {
      this.commitInfo = await this.fetchBranch()
    } else if (this.tag) {
      this.commitInfo = await this.fetchTag()
    } else if (this.commit) {
      this.commitInfo = await this.fetchCommit()
    } else {
      const branches = await this.fetchBranches()
      const branch = branches[0]
      this.commitInfo = await this.fetchBranch(branch)
    }
  }

  async fetchBranch (branch?: string): Promise<CommitInfo> {
    branch = branch || this.branch
    const url = ['/api/repos', this.repo, 'branches', branch].join('/')
    const resp = await axios.get(url)
    return resp.data
  }
  async fetchTag (tag?: string): Promise<CommitInfo> {
    tag = tag || this.tag
    const url = ['/api/repos', this.repo, 'tages', tag].join('/')
    const resp = await axios.get(url)
    return resp.data
  }
  async fetchCommit (commit?: string): Promise<CommitInfo> {
    commit = commit || this.commit
    const url = ['/api/repos', this.repo, 'commites', commit].join('/')
    const resp = await axios.get(url)
    return resp.data
  }
  async fetchBranches (): Promise<Array<string>> {
    const urlArray = ['/api/repos', this.repo, 'branches']
    const url = urlArray.join('/')
    const resp = await axios.get(url)
    return resp.data
  }
}
