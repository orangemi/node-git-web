'use strict'
const moment = require('moment')
module.exports = {
  install (Vue) {
    Vue.filter('fromNow', (time) => {
      return moment(time).fromNow()
    })
  }
}
