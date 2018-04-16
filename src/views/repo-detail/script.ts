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
  get path () {
    return this.$route.params.path || ''
  }
  get branchType () {
    return this.$route.params.type || 'branch'
  }
  get branch () {
    return this.branchType === 'branch' && (this.$route.params.name || this.defaultBranch) || ''
  }
  get tag () {
    return this.branchType === 'tag' && this.$route.params.name || ''
  }
  get commit () {
    return this.branchType === 'commit' && this.$route.params.name || ''
  }
  // get path () {
  //   const branch = this.branch || this.tag || this.commit || ''
  //   return this.rawPath.substring(branch.length).replace(/^\//, '')
  // }

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
