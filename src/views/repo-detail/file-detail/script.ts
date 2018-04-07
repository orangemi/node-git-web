import Vue from 'vue'
import axios from 'axios'
import Component from 'vue-class-component'
import {Watch} from 'vue-property-decorator'

interface TreeNodeInfo {
  name: string
  size: number
  isFile: boolean
  mode: number
}

@Component({
  // name: 'repo-detail-branch-tree',
  props: {
    branch: String,
    tag: String,
    // path: String,
    repo: String,
    commit: String,
  },
})
export default class FileDetailView extends Vue {
  fileInfo: TreeNodeInfo = {name: '', size: 0, isFile: true, mode: 0}
  blob: string = ''

  branch: String
  tag: String
  repo: String
  commit: String

  get urlPrefix () {
    let urls = ['/repos', this.repo]
    if (this.branch) urls = urls.concat(['branch', this.branch])
    else if (this.tag) urls = urls.concat(['tag', this.tag])
    else urls = urls.concat(['commit', this.commit])
    urls.push('tree')
    return urls.join('/')
  }
  get parentFilePaths() {
    let prefix = '/'
    return this.dirPath.split('/').map(dir => {
      const result = {
        url: this.urlPrefix + prefix + dir,
        name: dir
      }
      prefix = prefix + dir + '/'
      return result
    })
  }

  get filepath() {
    return this.$route.params.path || ''
  }
  get dirPath() {
    return this.filepath.replace(/\/[^/]+$/, '')
  }
  get filename() {
    return this.filepath.replace(/^.*\//, '')
  }
  get canBlob() {
    return this.commit && (this.fileInfo.mode & 0x8000 ) && this.fileInfo.size <= 5 * 1024 * 1024
  }
  get fileType() {
    return this.filename.replace(/^.*\./, '')
  }
  get downloadUrl() {
    const urls = ['/api/repos', this.repo, 'commits', this.commit, 'blob', this.filepath]
    return urls.join('/')
  }

  @Watch('branch')
  onBranchChange() {
    this.fetchFile()
  }
  @Watch('commit')
  onCommitChange() {
    this.fetchFile()
  }
  @Watch('tag')
  onTagChange() {
    this.fetchFile()
  }
  @Watch('repo')
  onRepoChange() {
    this.fetchFile()
  }
  @Watch('filepath')
  onPathChange() {
    this.fetchFile()
  }

  async fetchFileInfo (): Promise<TreeNodeInfo> {
    const resp = await axios.get(['/api/repos', this.repo, 'commits', this.commit, 'tree', this.dirPath].join('/'))
    const files: Array<TreeNodeInfo> = resp.data
    return files.filter(file => file.name === this.filename)[0]
  }
  async fetchFile () {
    this.fileInfo = await this.fetchFileInfo()
    if (!this.canBlob) return
    const resp = await axios.get(this.downloadUrl)
    this.blob = resp.data
  }

  mounted() {
    if (this.commit) this.fetchFile()
  }
}