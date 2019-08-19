<template>
  <ul class="radiogroup radiogroup_horizontal">
    <li
      class="radiogroup__item"
      v-for="item in positions"
      v-bind:key="item.id"
    >
      <label class="widget-position">
        <input
          type="radio"
          class="widget-position__input"
          :id="item.id"
          :checked="position === item.id"
          :value="item.id"
          @change="onPositionChange(item.id)"
        >
        <span
          class="widget-position__pseudo"
          :class="`widget-position__pseudo_${item.id}`"
          aria-hidden="true"
        ></span>
        <span class="widget-position__text visuallyhidden">{{ item.title }}</span>
      </label>
    </li>
  </ul>
</template>

<script>
  export default {
    data () {
      return {
        positions: [
          {
            id: 'left',
            title: this.$gettext('Left')
          },
          {
            id: 'center',
            title: this.$gettext('In the center')
          },
          {
            id: 'right',
            title: this.$gettext('Right')
          }
        ]
      }
    },
    computed: {
      position () {
        return this.$store.getters.widgetProperty('position')
      }
    },
    methods: {
      onPositionChange (position) {
        this.$store.dispatch('changeWidgetProperty', {
          property: 'position',
          value: position
        })
      }
    }
  }
</script>

<style lang="stylus">
  .widget-position
    position relative
    display block
    width 62px
    height 62px
    border 2px solid rgba(171, 180, 206, .5)
    border-radius 5px
    cursor pointer
    -webkit-tap-highlight-color transparent

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
        ~.widget-position__pseudo
          &:before
            border-color #00a7e1

    &__pseudo
      position absolute
      top 0
      right 0
      bottom 0
      left 0

      &:before
        content ""
        position absolute
        top -8px
        right -8px
        bottom -8px
        left -8px
        border: 4px solid transparent
        border-radius 4px
        transition border-color .3s

      &:after
        content ""
        position absolute
        bottom -2px
        width 24px
        height 7px
        border-radius 3px
        border-bottom-right-radius 0
        border-bottom-left-radius 0
        background-color #abb4ce

      &_left
        &:after
          left 12px

      &_center
        &:after
          left 50%
          transform translateX(-50%)
      
      &_right
        &:after
          right 12px
</style>
