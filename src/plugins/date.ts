import moment from 'moment'
import Vue from 'vue'

Vue.filter('date', (time: Date) => {
  return moment(time).toLocaleString()
})

Vue.filter('fromNow', (time: Date) => {
  return moment(time).fromNow()
})