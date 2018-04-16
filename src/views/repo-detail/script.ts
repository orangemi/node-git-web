import Vue from 'vue'
import axios from 'axios'
import Component from 'vue-class-component'
import fileList from './file-list/index.vue'

interface CommitInfo {
  hash: string
}

@Component({
  components: {
    'file-list': fileList
  }
})
export default class RepoDetailView extends Vue {
  commitInfo: CommitInfo = {hash: ''}
  branches: Array<string> = []
  // selBranch: string = ''
  defaultBranch: string = ''

  get repo () {
    return this.$route.params.repo
  }
  get rawPath () {
    return this.$route.params.path || ''
  }
  get branch () {
    return this.branches.filter(branch => this.rawPath.indexOf(branch) === 0)[0]
  }
  get tag () {
    // const tag = this.rawPath.split('/')[0]
    return !this.branch && !this.commit && tag || ''
  }
  get commit () {
    const commit = this.rawPath.split('/')[0]
    return /^[0-9a-f]{40}$/.test(commit) ? commit : ''
  }
  get path () {
    const branch = this.branch || this.tag || this.commit || ''
    return this.rawPath.substring(branch.length).replace(/^\//, '')
  }

  mounted () {
    this.fetchCommitInfo()
  }
  
  async fetchCommitInfo () {
    this.branches = await this.fetchBranches()
    if (this.branch) {
      this.commitInfo = await this.fetchBranch()
    } else if (this.tag) {
      this.commitInfo = await this.fetchTag()
    } else if (this.commit) {
      this.commitInfo = await this.fetchCommit()
    } else {
      this.defaultBranch = this.branches[0]
      this.commitInfo = await this.fetchBranch(this.defaultBranch)
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

  onChangeBranch(branch: string) {
    console.log('changing branch', branch)
  }
}
