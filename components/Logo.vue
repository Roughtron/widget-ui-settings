<template>
  <div>
    <div class="logo" v-if="$route.path == '/'">
      <svg class="logo__icon">
        <use xlink:href="#logo"></use>
      </svg>
      <span class="logo__text">
        <span>Feed</span>berry
      </span>
    </div>
    <nuxt-link to="/" class="logo" v-else>
      <svg class="logo__icon">
        <use xlink:href="#logo"></use>
      </svg>
      <span class="logo__text">
        <span>Feed</span>berry
      </span>
    </nuxt-link>
  </div>
</template>

<style lang="stylus">
  .logo
    text-decoration none

    @media (max-width: 768px)
      padding 20px 15px
      text-align center

    &__icon
      display inline-block
      vertical-align middle
      width 25px
      height 25px

    &__text
      display inline-block
      vertical-align middle
      font-weight bold
      color #f46c6b

      span
        color #76b08f

    .is-dashboard & 
      display block
</style>
