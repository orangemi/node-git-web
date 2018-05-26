import Vue from 'vue'
import axios from 'axios'
import Component from 'vue-class-component'
import {Watch} from 'vue-property-decorator'

@Component({
  // name: 'repo-detail-branch-tree',
  props: {
    branch: String,
    tag: String,
    path: String,
    repo: String,
    commit: String,
  },
})
export default class FileListView extends Vue {
  commitInfo: CommitInfo = {hash: '', author: {}, committer: {}}
  files: Array<TreeNodeInfo> = []
  canShowEntry = false
  entry = {}

  branch: string
  tag: string
  path: string
  repo: string
  commit: string

  get dirPath() {
    return this.path || ''
  }
  get urlPrefix () {
    let urls = ['/repos', this.repo]
    if (this.branch) urls = urls.concat(['branch', encodeURIComponent(this.branch)])
    else if (this.tag) urls = urls.concat(['tag', encodeURIComponent(this.tag)])
    else urls = urls.concat(['commit', this.commit])
    urls.push('tree')
    return urls.join('/')
  }
  get parentFilePaths() {
    let prefix = '/'
    return this.dirPath.split('/').filter(dir => dir).map(dir => {
      const result = {
        url: this.urlPrefix + prefix + dir,
        name: dir
      }
      prefix = prefix + dir + '/'
      return result
    })
  }
  
  @Watch('commit')
  onCommitChange() {
    this.fetchFiles()
  }
  @Watch('repo')
  onRepoChange() {
    this.fetchFiles()
  }
  @Watch('dirPath')
  onPathChange() {
    this.fetchFiles()
  }

  fillUrl (treeNode: TreeNodeInfo) {
    const branchType = this.branch ? 'branch' : this.tag ? 'tag' : 'commit'
    const branch = encodeURIComponent(this.branch || this.tag || this.commit)
    const filepath = this.dirPath ? this.dirPath + '/' + treeNode.name : treeNode.name
    if (treeNode.isFile) {
      return ['/repos', this.repo, branchType, branch, 'blob', filepath].join('/')
    } else {
      return ['/repos', this.repo, branchType, branch, 'tree', filepath].join('/')
    }
  }

  async fetchFiles () {
    if (!this.commit) return
    this.commitInfo = await this.fetchCommitInfo()
    const resp = await axios.get(['/api/repos', this.repo, 'commits', this.commit, 'tree', this.dirPath].join('/'))
    this.files = resp.data as Array<TreeNodeInfo>
  }

  async fetchCommitInfo (): Promise<CommitInfo> {
    if (!this.commit) return
    const url = ['/api/repos', this.repo, 'commits', this.commit].join('/')
    const resp = await axios.get(url)
    return resp.data as CommitInfo
  }

  mounted() {
    this.fetchFiles()
  }
}
