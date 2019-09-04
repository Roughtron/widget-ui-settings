<template>
  <div>
    <Top class="header_center" />
    <div class="stripe stripe_center">
      <div class="stripe__in">
        <PageTitle>
          {{ getPageTitle() }}
        </PageTitle>
        <ul class="progress" aria-hidden="true" v-if="!token">
          <li
            class="progress__item"
            v-for="step in [0, 1, 2]"
            v-bind:key="step"
            v-bind:class="isActiveStep(step) ? 'is-active': ''"
          >
            <span class="visuallyhidden">
              <translate :translate-params="{ stepText: step + 1 }">
                Step %{stepText}
              </translate>
            </span>
          </li>
        </ul>
        <div class="container">
          <transition name="component-fade" mode="out-in">
            <component v-bind:is="screen" :token="token"></component>
          </transition>
        </div>
      </div>
    </div>
    <Bottom />
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import Top from '~/components/Top.vue'
  import SignUpForm from '~/components/SignUpForm.vue'
  import SignUpSecondScreen from '~/components/SignUpSecondScreen.vue'
  import SignUpScript from '~/components/SignUpScript.vue'
  import Bottom from '~/components/Bottom.vue'
  import PageTitle from '~/components/PageTitle.vue'

  export default {
    computed: {
      ...mapGetters({
        screen: 'signUpScreen',
        step: 'signActiveStep'
      }),
      token () {
        return this.$route.query.token
      }
    },
    components: {
      Top,
      SignUpForm,
      SignUpSecondScreen,
      SignUpScript,
      Bottom,
      PageTitle
    },
    methods: {
      ...mapActions(['resetSignUpPage']),

      isActiveStep (step) {
        return this.step === step
      },

      getPageTitle () {
        switch (this.step) {
          case 0:
            if (this.token) return this.$gettext('Register at Feedberry')
            return this.$gettext('Registration')
          case 1:
            return this.$gettext('Fill in your details')
          case 2:
            return this.$gettext('Install the script on the site')
        }
      }
    },
    beforeRouteLeave (to, from, next) {
      next(setTimeout(() => this.resetSignUpPage(), 300))
    }
  }
</script>

<style lang="stylus" scoped>
  .container
    max-width 450px
    margin 0 auto

  .component-fade-leave-active,
  .component-fade-enter-active
    transition opacity .3s ease

  .component-fade-leave-to
    opacity 0

  .component-fade-enter
    opacity 0

  .component-fade-enter-to
    opacity 1

  .progress
    display flex
    justify-content space-between
    max-width 300px
    margin 0 auto 40px
    padding 0
    list-style none

    &__item
      flex-basis 30%
      height 5px
      background-color #f7f8fb

      &.is-active
        background-color #00a7e1
</style>
