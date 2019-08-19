<template>
  <div>
    <Top class="header_center" />
    <div class="stripe stripe_center">
      <div class="stripe__in">
        <PageTitle>
          <translate>Password recovery</translate>
        </PageTitle>
        <RecoveryForm />
      </div>
    </div>
    <Bottom />
  </div>
</template>

<script>
  import Top from '~/components/Top.vue'
  import RecoveryForm from '~/components/RecoveryForm.vue'
  import Bottom from '~/components/Bottom.vue'
  import PageTitle from '~/components/PageTitle.vue'

  export default {
    components: {
      Top,
      RecoveryForm,
      Bottom,
      PageTitle
    }
  }
</script>
