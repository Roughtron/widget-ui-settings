<template>
  <div>
    <form class="form form_sign-up" @submit.prevent="validateBeforeSubmit">
      <fieldset class="form-fields-group">
        <ul class="form-fields-list">
          <li class="form-fields-list__item" v-if="formError">
            <div class="error">{{ formError }}</div>
          </li>
          <li class="form-fields-list__item" v-if="!token">
            <dl class="field-composition">
              <dt class="field-composition__title visuallyhidden">
                <label class="form-field-label" for="email" v-translate>
                  Email
                </label>
              </dt>
              <dd class="field-composition__content">
                <div class="form-field-box">
                  <input
                    type="text"
                    name="email"
                    class="form-field form-field_type_text is-big"
                    :placeholder="'Your email' | translate"
                    v-model="email"
                    v-validate="'required|email'"
                    :class="{'is-error': errors.has('email') }"
                  >
                  <span v-show="errors.has('email')" class="form-error">
                    {{ errors.first('email') }}
                  </span>
                </div>
              </dd>
            </dl>
          </li>

          <li class="form-fields-list__item" v-if="token">
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
                    v-model="name"
                    v-validate="'required'"
                    :class="{'is-error': errors.has('name') }"
                  >
                  <span v-show="errors.has('name')" class="form-error">
                    {{ errors.first('name') }}
                  </span>
                  <span class="form-remark" v-translate>
                    This name will be shown to clients in the chat
                  </span>
                </div>
              </dd>
            </dl>
          </li>

          <li class="form-fields-list__item" v-if="token">
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
                    :placeholder="'Your phone number' | translate"
                    v-model="phone"
                    v-mask="{mask: '+7 (999) 99-99-999', greedy: true}"
                  >
                  <span class="form-remark" v-translate>
                    This field is optional
                  </span>
                </div>
              </dd>
            </dl>
          </li>

          <li class="form-fields-list__item">
            <dl class="field-composition">
              <dt class="field-composition__title visuallyhidden">
                <label class="form-field-label" for="password" v-translate>
                  Password
                </label>
              </dt>
              <dd class="field-composition__content">
                <div class="form-field-box">
                  <input
                    type="password"
                    name="password"
                    class="form-field form-field_type_text is-big"
                    :placeholder="'Password' | translate"
                    v-model="password"
                    v-validate="'required'"
                    :class="{'is-error': errors.has('password') }"
                  >
                  <span v-show="errors.has('password')" class="form-error">
                    {{ errors.first('password') }}
                  </span>
                </div>
              </dd>
            </dl>
          </li>

          <li class="form-fields-list__item form-fields-list__item_content_submit">
            <Btn class="button_primary button_type_block" type="submit">
              <span slot="text" class="button__text" v-translate>
                Continue
              </span>
            </Btn>
          </li>
        </ul>
      </fieldset>
    </form>
    <div class="have-acc" v-if="!token">
      <nuxt-link class="link" to="/signin">
        <translate>I have an account</translate>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import Btn from '~/components/Button.vue'

  export default {
    props: {
      token: String
    },

    components: {
      Btn
    },

    data () {
      return {
        email: '',
        password: '',
        name: '',
        phone: '',
        formError: null
      }
    },

    computed: {
      ...mapGetters(['formId'])
    },

    methods: {
      ...mapActions(['signUp', 'signUpOperator', 'changeSignUpScreen']),

      async signupUser () {
        try {
          await this.signup({
            email: this.email,
            password: this.password
          })
          this.changeSignUpScreen({
            screen: 'SignUpSecondScreen',
            step: 1
          })
          this.formError = null
        } catch (e) {
          if (e.response) {
            this.formError = e.response.data.error
          } else {
            this.formError = e.message
          }
        }
      },

      async signupOperator () {
        try {
          await this.signupOperator({
            password: this.password,
            phone: this.phone,
            token: this.token,
            username: this.name
          })
          this.$router.push({ path: `/settings/account/${this.formId}`, query: { new: 1 } })
        } catch (e) {
          if (e.response) {
            this.formError = e.response.data.error
          } else {
            this.formError = e.message
          }
        }
      },

      async validateBeforeSubmit (e) {
        try {
          const isValid = await this.$validator.validateAll()
          if (isValid) {
            if (!this.token) {
              this.signupUser()
            } else {
              this.signupOperator()
            }
          }
        } catch (e) {
          console.log(e)
        }
      }
    }
  }
</script>

<style lang="stylus">
  .form_sign-up,
  .have-acc
    max-width 300px
    margin 0 auto

  .have-acc
    margin-top 40px
    text-align center
</style>
