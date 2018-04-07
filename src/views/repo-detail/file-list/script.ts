import Vue from 'vue'
import axios from 'axios'
import Component from 'vue-class-component'
import {Watch} from 'vue-property-decorator'

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
export default class FileListView extends Vue {
  files = []
  canShowEntry = false
  entry = null

  branch: String
  tag: String
  // path: String
  repo: String
  commit: String

  get urlPrefix () {
    let urls = ['/repos', this.repo]
    if (this.branch) urls = urls.concat(['branch', this.branch])
    else if (this.tag) urls = urls.concat(['tag', this.tag])
    else urls = urls.concat(['commit', this.commit])
    return urls.join('/')
  }
  get rootTreeUrl () {
    return this.urlPrefix + '/tree'
  }
  get parentFilePaths() {
    let prefix = '/'
    return this.dirPath.split('/').filter(dir => dir).map(dir => {
      const result = {
        url: this.rootTreeUrl + prefix + dir,
        name: dir
      }
      prefix = prefix + dir + '/'
      return result
    })
  }
  get dirPath() {
    return this.$route.params.path || ''
  }
  
  @Watch('branch')
  onBranchChange() {
    this.fetchFiles()
  }
  @Watch('commit')
  onCommitChange() {
    this.fetchFiles()
  }
  @Watch('tag')
  onTagChange() {
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

  fillUrl (treeNode: any) {
    const filepath = this.dirPath ? this.dirPath + '/' + treeNode.name : treeNode.name
    if (treeNode.isFile) {
      return [this.urlPrefix, 'blob', filepath].join('/')
    } else {
      return [this.urlPrefix, 'tree', filepath].join('/')
    }
  }

  async fetchFiles () {
    const resp = await axios.get(['/api/repos', this.repo, 'commits', this.commit, 'tree', this.dirPath].join('/'))
    this.files = resp.data
  }

  mounted() {
    if (this.commit) this.fetchFiles()
  }
}
