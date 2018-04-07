import Vue from 'vue'
import axios from 'axios'
import Component from 'vue-class-component'

interface RepoInfo {
  name: string
  url: string
}

@Component({})
export default class RepoListView extends Vue {
  repos: Array<RepoInfo> = []

  mounted () {
    console.log('RepoList mounted')
    this.fetchList()
  }

  async fetchList () {
    const resp = await axios.get('/api/repos')
    console.log(resp)
    this.repos = resp.data
  }
}
