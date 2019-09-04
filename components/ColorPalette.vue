<template>
  <ul class="radiogroup radiogroup_horizontal">
    <li class="radiogroup__item radiogroup__item_custom">
      <div class="color-example color-example_custom">
        <span
          class="color-example__text"
          v-translate
        >
          Choose your color
        </span>
        <span
          class="color-example__pseudo"
          v-bind:style="{ backgroundColor: getPickerColorHex() }"
          v-bind:class="{ 'is-active' : isCustomColorActive }"
          aria-hidden="true"
          @click.prevent="toggleColorPicker"
        ></span>
        <chrome-picker
          v-model="pickerColor"
          v-if="showColorPicker"
          class="color-picker"
          @input="onCustomColorChange"
        />
      </div>
    </li>
    <li
      class="radiogroup__item"
      v-for="item in colors"
      v-bind:key="item"
    >
      <label class="color-example">
        <input
          type="radio"
          class="color-example__input"
          v-bind:value="item"
          :checked="color === item"
          @change="onColorChange(item)"
        >
        <span
          class="color-example__pseudo"
          v-bind:style="{ backgroundColor: item }"
          aria-hidden="true"
          @click="onColorClick"
        >
        </span>
        <span class="color-example__text visuallyhidden">
          {{item}}
        </span>
      </label>
    </li>
  </ul>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import { Chrome } from 'vue-color'

  export default {
    data () {
      return {
        pickerColor: this.getPickerColor(),
        showColorPicker: false,
        isCustomColorActive: false
      }
    },

    props: {
      property: String,
      colors: Array
    },

    components: {
      'chrome-picker': Chrome
    },

    computed: {
      ...mapState({
        UI: state => state.UI.Widget
      }),

      color () {
        return this.UI[this.property]
      }
    },

    methods: {
      ...mapActions(['changeWidgetProperty']),

      onColorChange (color) {
        this.changeWidgetProperty({
          property: this.property,
          value: color
        })
      },

      toggleColorPicker () {
        this.showColorPicker = !this.showColorPicker
      },

      getPickerColor () {
        const color = {
          hex: '#444846'
        }

        if (!this.colors.includes(this.color)) {
          return { hex: this.color }
        }

        return color
      },

      getPickerColorHex () {
        return this.pickerColor.hex
      },

      onCustomColorChange ({ hex }) {
        this.isCustomColorActive = true
        this.onColorChange(hex)
      },

      onColorClick () {
        this.showColorPicker = false
        this.isCustomColorActive = false
      }
    }
  }
</script>

<style lang="stylus">
  .color-example
    position relative
    display block
    width 28px
    height 28px
    cursor pointer
    -webkit-tap-highlight-color transparent

    &_custom
      display flex
      align-items center
      width auto
      height auto
      padding-right 10px
      border-right 1px solid rgba(86, 99, 118, .1)

      .color-example__text
        margin-right 10px

    &__input
      position absolute!important
      width 1px
      height 1px
      margin -1px
      padding 0
      overflow hidden
      white-space nowrap
      border 0
      clip rect(0 0 0 0)
      clip-path inset(50%)

      &:checked
        ~.color-example__pseudo
          border-color transparent

          &:after
            border-color #00a7e1

    &__pseudo
      display block
      position relative
      width 28px
      height 28px
      flex-shrink 0
      border-radius 50%
      border 1px solid #ddd
      box-sizing border-box
      transition border-color .3s

      &:after
        content ""
        position absolute
        top -4px
        right -4px
        bottom -4px
        left -4px
        border 2px solid transparent
        border-radius 50%
        transition border-color .3s

      &.is-active
        border-color transparent

        &:after
          border-color #00a7e1

    &__text
      font-size 13px
      color #566376

  .color-picker
    position absolute
    top 50%
    left 100%
    z-index 1
    margin-left 15px
    transform translateY(-50%)

    @media (max-width: 768px)
      top 100%
      left 0
      margin-top 15px
      transform none

    .vc-chrome-alpha-wrap
      display none

    .vc-chrome-hue-wrap
      margin-top 10px
      margin-bottom 0

    .vc-chrome-toggle-btn
      display none
</style>