<template>
  <div>
    <form class="form form_recovery" @submit.prevent="validateBeforeSubmit" v-if="!isSend">
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
                  <input type="text" name="email" class="form-field form-field_type_text is-big" placeholder="Ваш email" v-model="email" v-validate="'required|email'">
                  <span v-show="errors.has('email')" class="form-error">
                    {{ errors.first('email') }}
                  </span>
                </div>
              </dd>
            </dl>
          </li>

          <li class="form-fields-list__item form-fields-list__item_content_submit">
            <Btn class="button_primary button_content_sign-in" type="submit">
              <span slot="text" class="button__text" v-translate>Recovery</span>
            </Btn>
          </li>
        </ul>
      </fieldset>
    </form>

    <div class="success-send" v-if="isSend">
      <p class="success-send__text">
        <translate :translate-params="{mail: email}">
          We have sent you an email with the new password on %{mail}
        </translate>
      </p>
      <div class="success-send__action">
        <nuxt-link to="/signin" class="button button_primary button_content_sign-in">
          <span class="button__text" v-translate>
            Login
          </span>
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
        formError: null,
        isSend: false
      }
    },

    methods: {
      ...mapActions(['recovery']),

      async recoveryPassword () {
        try {
          await this.recovery({
            email: this.email
          })
          this.isSend = true
          this.formError = null
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
            this.recoveryPassword()
          }
        } catch(e) {
          console.log(e)
        }
      }
    }
  }
</script>

<style lang="stylus">
  .form_recovery,
  .success-send
    max-width 300px
    margin 0 auto

  .success-send
    &__text
      font-size 18px
      text-align center

    &__action
      margin-top 20px
      text-align center
</style>
