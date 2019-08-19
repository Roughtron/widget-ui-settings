<template>
  <div
    class="widget is-desktop"
    :class="{ 'is-open' : isOpen }"
    ref="widget"
  >
    <div class="widget__in">
      <div
        class="widget__top"
        :style="{ backgroundColor: headerColor, color: headerTextColor }"
      >
        <h3 class="widget__title">
          {{ headerText }}
        </h3>
        <div class="widget__feedberry logo">
          <svg class="logo__icon">
            <use xlink:href="#logo"></use>
          </svg>
          <span
            class="logo__text"
            :style="{ color: headerTextColor }"
          >
            Feedberry
          </span>
        </div>
        <svg class="widget__icon">
          <use xlink:href="#bubble"></use>
        </svg>
      </div>
      <div
        class="widget__body"
        :class="{ 'is-open' : isOpen }"
        :style="{ backgroundColor: bodyColor, color: bodyTextColor }"
      >
        <div class="widget__credits">
          <translate>Widget provided</translate>
          <div class="widget__credits-link logo">
            <svg class="logo__icon">
              <use xlink:href="#logo"></use>
            </svg>
            <span class="widget__credits-text logo__text">Feedberry</span>
          </div>
        </div>
        <div class="widget__content">
          <form
            class="form"
            @submit.prevent=""
            :class="{ 'is-hide': isSend }"
          >
            <fieldset class="form-fields-group">
              <ul class="form-fields-list">

                <li class="form-fields-list__item">
                  <p
                    class="form-remark"
                    :style="{ color: bodyTextColor }"
                  >
                    {{ bodyText }}
                  </p>
                </li>

                <li class="form-fields-list__item">
                  <dl class="field-composition">
                    <dt class="field-composition__title visuallyhidden">
                      <label class="form-field-label" for="message" v-translate>
                        Your message*
                      </label>
                    </dt>

                    <dd class="field-composition__content">
                      <div class="form-field-box">
                        <textarea
                          name="message"
                          class="form-field form-field_type_textarea"
                          :placeholder="'Your message*' | translate"
                          :style="{ color: bodyTextColor }"></textarea>
                      </div>
                    </dd>
                  </dl>
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
                          class="form-field form-field_type_text"
                          :placeholder="'Your name' | translate"
                          :style="{ color: bodyTextColor }"
                        >
                      </div>
                    </dd>
                  </dl>
                </li>

                <li class="form-fields-list__item">
                  <dl class="field-composition">
                    <dt class="field-composition__title visuallyhidden">
                      <label class="form-field-label" for="email" v-translate>
                        Your email*
                      </label>
                    </dt>

                    <dd class="field-composition__content">
                      <div class="form-field-box">
                        <input
                          type="text"
                          name="email"
                          class="form-field form-field_type_text"
                          :placeholder="'Your email*' | translate"
                          :style="{ color: bodyTextColor }"
                        >
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
                          class="form-field form-field_type_text"
                          :placeholder="'Your phone number' | translate"
                          :style="{ color: bodyTextColor }"
                        >
                      </div>
                    </dd>
                  </dl>
                </li>

                <li class="form-fields-list__item form-fields-list__item_content_submit">
                  <button
                    type="submit"
                    class="button button_viewtype_primary"
                    :style="{ backgroundColor: primaryColor, color: buttonTextColor }"
                  >
                    <span class="button__text">
                      {{ sendButtonText }}
                    </span>
                  </button>
                </li>
              </ul>
            </fieldset>
          </form>

          <div
            class="success-send"
            :class="{ 'is-show': isSend }"
          >
            <div
              class="success-send__text"
              :style="{ color: bodyTextColor }"
            >
              {{ successSendText }}
            </div>
            <div class="success-send__action">
              <button
                type="button"
                class="button button_viewtype_primary"
                :style="{ backgroundColor: primaryColor, color: buttonTextColor }"
              >
                <span class="button__text">
                  {{ closeButtonText }}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        class="widget__close"
        v-if="isOpen"
      >
        <svg
          class="widget__close-icon"
          :style="{ fill: closeIconColor }"
        >
          <use xlink:href="#close"></use>
        </svg>
        <span class="visuallyhidden" v-translate>
          Close
        </span>
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      headerColor: String,
      headerTextColor: String,
      headerText: String,
      isOpen: {
        type: Boolean,
        default: false
      },
      bodyColor: String,
      bodyTextColor: String,
      bodyText: String,
      primaryColor: String,
      buttonTextColor: String,
      sendButtonText: String,
      successSendText: String,
      isSend: {
        type: Boolean,
        default: false
      },
      closeButtonText: String,
      closeIconColor: String
    }
  }
</script>

<style lang="stylus" scoped>
  button
    margin 0
    padding 0
    background none
    border none
    outline none

  a
    text-decoration none
    outline none

  .form-fields-list
    margin 0
    padding 0
    list-style none

    &__item
      margin-bottom 15px

      &_content_submit
        text-align right

  .form-field-box
    position relative

  .form-field-error
    position absolute
    top 50%
    right 5px
    width 15px
    height 15px
    transform translateY(-50%)

  .error
    color #ff6b6b

  .form-field
    &_type_text,
    &_type_textarea
      width 100%
      font-size 15px
      outline none
      background none
      border 1px solid #bcbcbc
      border-radius 2px
      transition border-color .3s
      box-sizing border-box

      &:focus
        border-color #00a7e1

      &::placeholder
        color inherit
        opacity .5

      &:-webkit-autofill
        animation-name autofill
        animation-fill-mode both

      &.is-error
        border-color #ff6b6b

    &_type_textarea
      height 100px
      padding 7px 10px
      resize none

      & + .form-field-error
        top 10px
        transform none

    &_type_text
      height 32px
      padding 0 10px

  .button
    display inline-block
    vertical-align top
    height 32px
    line-height 32px
    text-align center
    border-radius 4px
    box-sizing border-box
    cursor pointer
    transition background-color linear .3s
    user-select none

    &:disabled
      opacity .5
      cursor not-allowed

    &_viewtype_primary
      position relative
      padding 0 20px
      font-weight bold
      text-transform uppercase
      color #fff
      background-color #00a7e1

      &:after
        content ""
        position absolute
        top 0
        right 0
        bottom 0
        left 0
        border-radius 4px
        background-color #fff
        pointer-events none
        opacity 0
        transition opacity .3s
    
      &:enabled:hover
      &:enabled:focus
        &:after
          opacity .1

  .widget
    position absolute
    bottom 0
    padding 20px 20px 0

    &_small
      transform scale(.4)

    &_position_left
      transform-origin bottom left

    &_position_center
      left 50%
      transform translateX(-50%) scale(.4)
      transform-origin bottom center

    &_position_right
      right 0
      transform-origin bottom right

    &.is-open
      padding 0

      &.is-desktop
        padding 20px 30px 0

    &.is-open
      width 100%
      height 100%

      &.is-desktop
        width auto
        height auto

    &__in
      position relative
      width 65px
      height 65px
      color #fff
      border-radius 50%
      box-shadow 0 0 20px rgba(0, 0, 0, .4)
      -webkit-tap-highlight-color transparent

      .widget.is-desktop &
        width auto
        max-width 320px
        margin-left auto
        height 36px
        border-radius 0
        border-top-right-radius 5px
        border-top-left-radius 5px

      .widget.is-open &
        width 100%
        height 100%

    &__top
      display flex
      align-items center
      width 65px
      height 65px
      margin-left auto
      padding 8px 15px
      background-color #00a7e1
      border-radius 50%
      cursor pointer
      box-sizing border-box
      transition opacity .5s .2s, transform .3s .1s, background-color .3s

      .widget.is-desktop &
        width 100%
        height auto
        background-color #5d576b
        border-radius 0
        border-top-right-radius 5px
        border-top-left-radius 5px

      .widget.is-open &
        opacity 0
        transform translateY(20%)
        cursor default

      .widget.is-open.is-desktop &
        opacity 1
        transform none
        transition none

    &__body
      position absolute
      padding 50px 20px 10px
      color #566376
      background-color #fff
      opacity 0
      pointer-events none

      .widget.is-desktop &
        padding-top 30px
        transition opacity .3s .3s

      &.is-open
        position fixed
        top 0
        right 0
        bottom 0
        left 0
        opacity 1
        pointer-events auto

      
      .widget.is-desktop &
        &.is-open
          position relative
          top auto
          right auto
          bottom auto
          left auto
          transition opacity .3s

    &__content
      position relative

    &__title
      display none
      font-size 14px
      font-weight 100
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
      user-select none

      .widget.is-desktop &
        display block

    &__feedberry
      display none
      margin-left 20px

      .widget.is-desktop &
        display flex

    &__icon
      width 40px
      height 45px

      .widget.is-desktop &
        display none

    &__credits
      position absolute
      top 0
      left 0
      right 0
      height 40px
      padding 0 20px
      font-size 14px
      line-height 40px
      background #00a6e3
      color #fff

      .widget.is-desktop &
        display none

    &__close
      position absolute
      top 10px
      right 15px
      width 20px
      height 20px
      cursor pointer
      -webkit-tap-highlight-color transparent

      .widget.is-desktop &
        top 0
        left -25px
        right auto

    &__close-icon
      width 20px
      height 20px
      fill #fff
      pointer-events none

      .widget.is-desktop &
        fill #000

  .logo
    padding 0
    align-items center
    color #fff
    text-decoration none
    outline none

    &__icon
      width 20px
      height 20px
      vertical-align middle

    &__text
      font-size 14px
      color #fff

  .form-remark
    font-size 16px
    font-weight 100

  .expand-enter-active,
  .expand-leave-active
    transition-property opacity, height

  .expand-enter,
  .expand-leave-to
    opacity 0

  .form
    transition opacity .3s

    &.is-hide
      opacity 0
      pointer-events none

  .success-send
    position absolute
    top 0
    right 0
    bottom 0
    left 0
    display flex
    flex-direction column
    justify-content center
    line-height 1.2
    text-align center
    transition opacity .3s
    opacity 0
    pointer-events none

    &.is-show
      opacity 1
      pointer-events auto

    &__action
      margin-top 30px
</style>
