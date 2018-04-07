'use strict'
const moment = require('moment')
module.exports = {
  install (Vue) {
    Vue.filter('date', (time) => {
      return moment(time).toLocaleString()
    })
  }
}
