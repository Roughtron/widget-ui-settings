<template>
  <header class="header stripe">
    <div class="header__in stripe__in">
      <div class="content-columns content-columns_header">
        <div class="content-column content-column_layout_a">
          <Logo />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  }
}
</script>

<style lang="stylus" scoped>
  .header
    position relative
    z-index 1
    padding 10px

    @media (max-width: 768px)
      position fixed
      top 0
      left 0
      right 0
      z-index 2
      display block
      padding 15px 10px
      background-color #fff
      box-shadow 0 2px 2px 0 rgba(0, 0, 0, .08)

    &_center
      position absolute
      top 0
      right 0
      left 0

      .content-columns_header
        justify-content center

  .content-columns_header
    display flex
    justify-content space-between
    align-items center

    @media (max-width: 768px)
      position fixed
      top 0
      left 0
      bottom 0
      z-index 1
      display block
      width 250px
      overflow auto
      background-color #fff
      transform translateX(-100%)
      transition transform .5s

    .content-column
      &_layout_b
        flex-grow 1
</style>
