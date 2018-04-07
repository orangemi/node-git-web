import Vue from 'vue'
const units = ['B', 'KB', 'MB', 'GB', 'TB']
Vue.filter('size', (number: number) => {
  let n = number
  let index = 0
  while (n > 1000) {
    n = n / 1024
    index++
  }
  return [index > 0 ? n.toFixed(1) : n, units[index]].join(' ')
})
