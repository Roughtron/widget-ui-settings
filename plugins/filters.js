import Vue from 'vue'

Vue.filter('translate', val => Vue.prototype.$gettext(val))
