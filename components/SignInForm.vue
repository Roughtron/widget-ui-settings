<template>
  <div>
    <form class="form form_sign-in" @submit.prevent="validateBeforeSubmit">
      <fieldset class="form-fields-group">
        <ul class="form-fields-list">
          <li class="form-fields-list__item" v-if="formError">
            <div class="error">{{ formError }}</div>
          </li>
          <li class="form-fields-list__item">
            <dl class="field-composition" :class="{'has-danger': errors.has('email') }">
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
                  >
                  <span v-show="errors.has('email')" class="form-error">
                    {{ errors.first('email') }}
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
                  >
                  <span v-show="errors.has('password')" class="form-error">
                    {{ errors.first('password') }}
                  </span>
                </div>
              </dd>
            </dl>
          </li>

          <li class="form-fields-list__item form-fields-list__item_content_submit">
            <Btn class="button_primary button_content_sign-in" type="submit">
              <span slot="text" class="button__text" v-translate>Login</span>
            </Btn>
          </li>
        </ul>
      </fieldset>
    </form>
    <div class="no-acc">
      <div class="no-acc__item">
        <nuxt-link class="link" to="/signup">
          <translate>I do not have an account</translate>
        </nuxt-link>
      </div>
      <div class="no-acc__item">
        <nuxt-link class="link" to="/recovery">
          <translate>I forgot password</translate>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import '~/plugins/vee-validate'
  import Btn from '~/components/Button.vue'

  export default {
    components: {
      Btn
    },
    data () {
      return {
        email: '',
        password: '',
        formError: null
      }
    },
    methods: {
      ...mapActions(['login']),

      async login () {
        try {
          await this.$store.dispatch('login', {
            email: this.email,
            password: this.password
          })
          this.$router.replace({ path: '/' })
          this.formError = null
        } catch (e) {
          if (e.response) {
            this.formError = e.response.data.error
          } else {
            this.formError = e.message
          }
        }
      },

      validateBeforeSubmit (e) {
        this.$validator.validateAll().then(isValid => {
          if (isValid) {
            this.login()
          }
        }).catch(e => {
          console.log(e)
        })
      }
    }
  }
</script>

<style lang="stylus">
  .form_sign-in,
  .no-acc
    max-width 300px
    margin 0 auto

  .no-acc
    margin-top 40px
    text-align center

    &__item
      margin-bottom 10px

      &:last-of-type
        margin-bottom 0
</style>
