/* eslint-disable no-inner-declarations */
import Vue from 'vue'
import GetTextPlugin from 'vue-gettext'
import translations from './../i18n/translations.json'

export default ({ store }) => {
  var config = {
    availableLanguages: store.getters.availableLanguages,
    defaultLanguage: store.getters.language,
    languageVmMixin: {
      computed: {
        currentKebabCase: function () {
          return this.current.toLowerCase().replace('_', '-')
        }
      }
    },
    translations: translations,
    silent: true
  }

  Vue.use(GetTextPlugin, config)
}
