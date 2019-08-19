<template>
  <form class="form form_sign-up" @submit.prevent="validateBeforeSubmit">
    <fieldset class="form-fields-group">
      <ul class="form-fields-list">
        <li class="form-fields-list__item" v-if="formError">
          <div class="error">{{ formError }}</div>
        </li>
        <li class="form-fields-list__item">
          <dl class="field-composition">
            <dt class="field-composition__title visuallyhidden">
              <label class="form-field-label" for="name" v-translate>
                Your name
              </label>
            </dt>
            <dd class="field-composition__content">
              <div class="form-field-box">
                <input
                  type="text"
                  name="name"
                  class="form-field form-field_type_text is-big"
                  :placeholder="'Your name' | translate"
                  v-model="username"
                  v-validate="'required'"
                  :class="{'is-error': errors.has('name') }"
                >
                <span v-show="errors.has('name')" class="form-error">
                  {{ errors.first('name') }}
                </span>
              </div>
            </dd>
          </dl>
        </li>

        <li class="form-fields-list__item">
          <dl class="field-composition">
            <dt class="field-composition__title visuallyhidden">
              <label class="form-field-label" for="website" v-translate>
                Website address
              </label>
            </dt>
            <dd class="field-composition__content">
              <div class="form-field-box">
                <input
                  type="text"
                  name="website"
                  class="form-field form-field_type_text is-big"
                  :placeholder="'Your website address' | translate"
                  v-model="website"
                  v-validate="'required|url'"
                  :class="{'is-error': errors.has('website') }"
                  autocomplete="off"
                >
                <span v-show="errors.has('website')" class="form-error">
                  {{ errors.first('website') }}
                </span>
              </div>
            </dd>
          </dl>
        </li>

        <li class="form-fields-list__item">
          <dl class="field-composition">
            <dt class="field-composition__title visuallyhidden">
              <label class="form-field-label" for="phone" v-translate>
                Your phone number
              </label>
            </dt>
            <dd class="field-composition__content">
              <div class="form-field-box">
                <input
                  type="text"
                  name="phone"
                  class="form-field form-field_type_text is-big"
                  placeholder="Your phone number"
                  v-model="phone"
                  v-mask="{mask: '+7 (999) 99-99-999', greedy: true}"
                >
                <span class="form-remark" v-translate>This field is optional</span>
              </div>
            </dd>
          </dl>
        </li>

        <li class="form-fields-list__item form-fields-list__item_content_submit">
          <button type="submit" class="button button_primary button_type_block">
            <span class="button__text" v-translate>Continue</span>
          </button>
        </li>
      </ul>
    </fieldset>
  </form>
</template>

<script>
  import { mapGetters } from 'vuex'
  import normalizeUrl from 'normalize-url'

  export default {
    data () {
      return {
        username: '',
        website: '',
        phone: '',
        formError: null
      }
    },

    computed: {
      ...mapGetters([
        'userToken'
      ])
    },

    methods: {
      validateBeforeSubmit () {
        this.$validator.validateAll().then(isValid => {
          if (isValid) {
            this.sendForm()
          }
        })
      },

      async sendForm () {
        try {
          await this.$store.dispatch('updateUser', {
            username: this.username,
            website: normalizeUrl(this.website),
            phone: this.phone,
            token: this.userToken
          })

          this.$store.dispatch('changeSignUpScreen', {
            screen: 'SignUpScript',
            step: 2
          })
        } catch (e) {
          if (e.response) {
            this.formError = e.response.data.error
          } else {
            this.formError = e.message
          }
        }
      }
    }
  }
</script>

<style lang="stylus">
  .form_sign-up
    max-width 300px
    margin 0 auto
</style>
