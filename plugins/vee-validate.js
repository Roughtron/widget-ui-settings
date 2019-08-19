import Vue from 'vue'
import VeeValidate, {Validator} from 'vee-validate'

const dictionary = {
  ru: {
    custom: {
      email: {
        email: () => Vue.prototype.$gettext('This does not seem to be email'),
        required: () => Vue.prototype.$gettext('Enter email')
      },
      password: {
        required: () => Vue.prototype.$gettext('Enter password')
      },
      name: {
        required: () => Vue.prototype.$gettext('Enter your name')
      },
      website: {
        required: () => Vue.prototype.$gettext('Enter website address'),
        url: () => Vue.prototype.$gettext('This is not like url')
      }
    }
  }
}

Validator.updateDictionary(dictionary)

const validator = new Validator()

validator.setLocale('ru')

Vue.use(VeeValidate)
