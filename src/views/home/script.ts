import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class HomeView extends Vue {
  mounted () {
    console.log('Home mounted')
  }
}
