<template>
  <footer class="footer">
    <div class="footer__in">
      <nav class="footer-menu">
        <ul class="footer-menu__list">
          <li class="footer-menu__item">
            <a class="footer-menu__link" href="mailto:support@feedberry.ru">
              support@feedberry.ru
            </a>
          </li>
          <li class="footer-menu__item">
            <a class="footer-menu__link" @click.prevent="showOffer">
              <translate>Offer</translate>
            </a>
          </li>
          <li class="footer-menu__item">
            <a class="footer-menu__link" @click.prevent="showPersonal">
              <translate>About personal data</translate>
            </a>
          </li>
          <!-- <li class="footer-menu__item">
            <a class="footer-menu__link" href="#">
              Документация
            </a>
          </li> -->
        </ul>
      </nav>
      <div class="copyright">
        &copy; Feedberry, 2017
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    methods: {
      showPersonal () {
        const message = `<iframe src="https://docs.google.com/document/d/e/2PACX-1vQlppus6ekSwml_xUAZTEYRYpKv-YbwyvOjZEsKGlfJnP123Focp7fh8tSC1Bzs2_hfuwLThPCNX3Zy/pub?embedded=true" style="min-width:100%;height:100%;border: 0;"></iframe>`
        this.$dialog.alert(message, {
          html: true,
          backdropClose: true,
          customClass: 'is-docs'
        })
      },

      showOffer () {
        const message = `<iframe src="https://docs.google.com/document/d/e/2PACX-1vQ9ZVCbZ4avI3KWqPpJpLG5smjDyeO-mrBXu5TV5O7RlJbZgD2sEXRj1gTcK2HQmgtiaaUsFRP3aqNK/pub?embedded=true" style="min-width:100%;height:100%;border: 0;"></iframe>`
        this.$dialog.alert(message, {
          html: true,
          backdropClose: true,
          customClass: 'is-docs'
        })
      }
    }
  }
</script>

<style lang="stylus">
  .footer
    padding 15px
    text-align left
    color #000
    background #fff
    box-sizing border-box

    &__in
      display flex
      justify-content space-between
      width 100%
      max-width 1200px
      margin 0 auto

      @media (max-width: 768px)
        flex-direction column
        align-items center

  .footer-menu
    &__list
      margin 0
      padding 0
      list-style none
      margin-left -20px
      font-size 0

      @media (max-width: 768px)
        margin-left 0

    &__item
      display inline-block
      margin-left 20px
      font-size 15px

      @media (max-width: 768px)
        display list-item
        margin-left 0
        margin-bottom 10px
        text-align center

    &__link
      color #000
      text-decoration none
      border-bottom 1px solid transparent
      transition border-bottom-color .3s
      cursor pointer

      &:hover
        border-bottom-color rgba(0, 0, 0, .6)

  .copyright
    font-size: 15px;
    opacity: .9;
</style>