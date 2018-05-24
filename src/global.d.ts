declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

interface CommitInfo {
  hash: string,
  message?: string,
  author?: {},
  committer?: {},
}

interface TreeNodeInfo {
  name: string
  size: number
  isFile: boolean
  mode: number
}
