<template>
  <div>
    <Top class="header_center" />
    <div class="stripe stripe_center">
      <div class="stripe__in">
        <PageTitle>
          <translate>Login</translate>
        </PageTitle>
        <SignInForm />
      </div>
    </div>
    <Bottom />
  </div>
</template>

<script>
  import Top from '~/components/Top.vue'
  import SignInForm from '~/components/SignInForm.vue'
  import Bottom from '~/components/Bottom.vue'
  import PageTitle from '~/components/PageTitle.vue'

  export default {
    components: {
      Top,
      SignInForm,
      Bottom,
      PageTitle
    }
  }
</script>
