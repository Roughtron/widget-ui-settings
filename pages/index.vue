<template>
  <div class="box">
    <form class="form form_settings" @submit.prevent="saveForm">
      <div class="content-columns content-columns_content_settings">
        <div class="content-column content-column_layout_a">
          <fieldset class="form-fields-group">
            <legend class="form-fields-group__title" v-translate>
              1. Customize the location of the widget
            </legend>
            <ul class="form-fields-list">
              <li class="form-fields-list__item">
                <p class="form-remark form-remark_large" v-translate>
                  We recommend placing the widget at the bottom right. So it will not overlap the main content of the site.
                </p>
              </li>
              <li class="form-fields-list__item">
                <dl class="field-composition">
                  <dt class="field-composition__title visuallyhidden">
                    <label class="form-field-label" v-translate>
                      Widget Position:
                    </label>
                  </dt>
                  <dd class="field-compostion__content">
                    <WidgetPosition />
                  </dd>
                </dl>
              </li>
            </ul>
          </fieldset>
        </div>

        <div class="content-column content-column_layout_b">
          <div class="example">
            <div class="example__in example__in_site">
              <Widget class="widget_small"
                :class="positionClass"
                v-bind="widgetUI"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="content-columns content-columns_content_settings">
        <div class="content-column content-column_layout_a">
          <fieldset class="form-fields-group">
            <legend class="form-fields-group__title" v-translate>
              2. Customize widget
            </legend>
            <ul class="form-fields-list">
              <li class="form-fields-list__item">
                <p class="form-remark form-remark_large" v-translate>
                  Choose a widget color:
                </p>
              </li>
              <li class="form-fields-list__item">
                <dl class="field-composition">
                  <dt class="field-composition__title visuallyhidden">
                    <label class="form-field-label" v-translate>
                      Widget color:
                    </label>
                  </dt>
                  <dd class="field-compostion__content">
                    <ColorPalette
                      :property="'headerColor'"
                      :colors="defaultColors"
                    />
                  </dd>
                </dl>
              </li>
            </ul>
          </fieldset>
        </div>

        <div class="content-column content-column_layout_b">
          <div class="example">
            <div class="example__in example__in_site">
              <Widget class="widget_small"
                :class="positionClass"
                v-bind="widgetUI"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="content-columns content-columns_content_settings">
        <div class="content-column content-column_layout_a">
          <fieldset class="form-fields-group">
            <ul class="form-fields-list">
              <li class="form-fields-list__item">
                <p class="form-remark form-remark_large" v-translate>
                  Choose a color for the widget text:
                </p>
              </li>
              <li class="form-fields-list__item">
                <dl class="field-composition">
                  <dt class="field-composition__title visuallyhidden">
                    <label class="form-field-label" v-translate>
                      Widget color
                    </label>
                  </dt>
                  <dd class="field-compostion__content">
                    <ColorPalette
                      :property="'headerTextColor'"
                      :colors="['#fff', '#dddddd', '#bada55']"
                    />
                  </dd>
                </dl>
              </li>
            </ul>
          </fieldset>
        </div>

        <div class="content-column content-column_layout_b">
          <div class="example">
            <div class="example__in example__in_site">
              <Widget class="widget_small"
                :class="positionClass"
                v-bind="widgetUI"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="content-columns content-columns_content_settings">
        <div class="content-column content-column_layout_a">
          <fieldset class="form-fields-group">
            <ul class="form-fields-list">
              <li class="form-fields-list__item">
                <p class="form-remark form-remark_large" v-translate>
                  Change the text of the widget:
                </p>
              </li>
              <li class="form-fields-list__item">
                <dl class="field-composition">
                  <dt class="field-composition__title visuallyhidden">
                    <label class="form-field-label" v-translate>
                      Change the text of the widget:
                    </label>
                  </dt>
                  <dd class="field-compostion__content">
                    <TextEditor :property="'headerText'" />
                  </dd>
                </dl>
              </li>
            </ul>
          </fieldset>
        </div>

        <div class="content-column content-column_layout_b">
          <div class="example">
            <div class="example__in example__in_site">
              <Widget class="widget_small"
                :class="positionClass"
                v-bind="widgetUI"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="content-columns content-columns_content_settings">
        <div class="content-column content-column_layout_a">
          <fieldset class="form-fields-group">
            <ul class="form-fields-list">
              <li class="form-fields-list__item">
                <p class="form-remark form-remark_large" v-translate>
                  Change the background color of the main content of the widget:
                </p>
              </li>
              <li class="form-fields-list__item">
                <dl class="field-composition">
                  <dt class="field-composition__title visuallyhidden">
                    <label class="form-field-label" v-translate>
                      Change the background color of the main content of the widget:
                    </label>
                  </dt>
                  <dd class="field-compostion__content">
                    <ColorPalette
                      :property="'bodyColor'"
                      :colors="defaultColors"
                    />
                  </dd>
                </dl>
              </li>
            </ul>
          </fieldset>
        </div>

        <div class="content-column content-column_layout_b">
          <div class="example">
            <div class="example__in example__in_site">
              <Widget class="widget_small"
                :class="positionClass"
                :isOpen="true"
                v-bind="widgetUI"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="content-columns content-columns_content_settings">
        <div class="content-column content-column_layout_a">
          <fieldset class="form-fields-group">
            <ul class="form-fields-list">
              <li class="form-fields-list__item">
                <p class="form-remark form-remark_large" v-translate>
                  Change the text color of the main content of the widget:
                </p>
              </li>
              <li class="form-fields-list__item">
                <dl class="field-composition">
                  <dt class="field-composition__title visuallyhidden">
                    <label class="form-field-label" v-translate>
                      Change the text color of the main content of the widget:
                    </label>
                  </dt>
                  <dd class="field-compostion__content">
                    <ColorPalette
                      :property="'bodyTextColor'"
                      :colors="defaultColors"
                    />
                  </dd>
                </dl>
              </li>
            </ul>
          </fieldset>
        </div>

        <div class="content-column content-column_layout_b">
          <div class="example">
            <div class="example__in example__in_site">
              <Widget class="widget_small"
                :class="positionClass"
                :isOpen="true"
                v-bind="widgetUI"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="content-columns content-columns_content_settings">
        <div class="content-column content-column_layout_a">
          <fieldset class="form-fields-group">
            <ul class="form-fields-list">
              <li class="form-fields-list__item">
                <p class="form-remark form-remark_large" v-translate>
                  Change the text of the main content of the widget:
                </p>
              </li>
              <li class="form-fields-list__item">
                <dl class="field-composition">
                  <dt class="field-composition__title visuallyhidden">
                    <label class="form-field-label" v-translate>
                      Change the text of the main content of the widget:
                    </label>
                  </dt>
                  <dd class="field-compostion__content">
                    <TextEditor :property="'bodyText'" />
                  </dd>
                </dl>
              </li>
            </ul>
          </fieldset>
        </div>

        <div class="content-column content-column_layout_b">
          <div class="example">
            <div class="example__in example__in_site">
              <Widget class="widget_small"
                :class="positionClass"
                :isOpen="true"
                v-bind="widgetUI"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="content-columns content-columns_content_settings">
        <div class="content-column content-column_layout_a">
          <fieldset class="form-fields-group">
            <ul class="form-fields-list">
              <li class="form-fields-list__item">
                <p class="form-remark form-remark_large" v-translate>
                  Change the color of the button:
                </p>
              </li>
              <li class="form-fields-list__item">
                <dl class="field-composition">
                  <dt class="field-composition__title visuallyhidden">
                    <label class="form-field-label" v-translate>
                      Change the color of the button:
                    </label>
                  </dt>
                  <dd class="field-compostion__content">
                    <ColorPalette
                      :property="'primaryColor'"
                      :colors="defaultColors"
                    />
                  </dd>
                </dl>
              </li>
            </ul>
          </fieldset>
        </div>

        <div class="content-column content-column_layout_b">
          <div class="example">
            <div class="example__in example__in_site">
              <Widget class="widget_small"
                :class="positionClass"
                :isOpen="true"
                v-bind="widgetUI"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="content-columns content-columns_content_settings">
        <div class="content-column content-column_layout_a">
          <fieldset class="form-fields-group">
            <ul class="form-fields-list">
              <li class="form-fields-list__item">
                <p class="form-remark form-remark_large" v-translate>
                  Change the button text color:
                </p>
              </li>
              <li class="form-fields-list__item">
                <dl class="field-composition">
                  <dt class="field-composition__title visuallyhidden">
                    <label class="form-field-label" v-translate>
                      Change the button text color:
                    </label>
                  </dt>
                  <dd class="field-compostion__content">
                    <ColorPalette
                      :property="'buttonTextColor'"
                      :colors="defaultColors"
                    />
                  </dd>
                </dl>
              </li>
            </ul>
          </fieldset>
        </div>

        <div class="content-column content-column_layout_b">
          <div class="example">
            <div class="example__in example__in_site">
              <Widget class="widget_small"
                :class="positionClass"
                v-bind="widgetUI"
                :isOpen="true"
                :isSend="true"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="content-columns content-columns_content_settings">
        <div class="content-column content-column_layout_a">
          <fieldset class="form-fields-group">
            <ul class="form-fields-list">
              <li class="form-fields-list__item">
                <p class="form-remark form-remark_large" v-translate>
                  Change the text of the send message button:
                </p>
              </li>
              <li class="form-fields-list__item">
                <dl class="field-composition">
                  <dt class="field-composition__title visuallyhidden">
                    <label class="form-field-label" v-translate>
                      Change the text of the send message button:
                    </label>
                  </dt>
                  <dd class="field-compostion__content">
                    <TextEditor :property="'sendButtonText'" />
                  </dd>
                </dl>
              </li>
            </ul>
          </fieldset>
        </div>

        <div class="content-column content-column_layout_b">
          <div class="example">
            <div class="example__in example__in_site">
              <Widget class="widget_small"
                :class="positionClass"
                v-bind="widgetUI"
                :isOpen="true"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="content-columns content-columns_content_settings">
        <div class="content-column content-column_layout_a">
          <fieldset class="form-fields-group">
            <ul class="form-fields-list">
              <li class="form-fields-list__item">
                <p class="form-remark form-remark_large" v-translate>
                  Change the text of the success message:
                </p>
              </li>
              <li class="form-fields-list__item">
                <dl class="field-composition">
                  <dt class="field-composition__title visuallyhidden">
                    <label class="form-field-label" v-translate>
                      Change the text of the success message:
                    </label>
                  </dt>
                  <dd class="field-compostion__content">
                    <TextEditor :property="'successSendText'" />
                  </dd>
                </dl>
              </li>
            </ul>
          </fieldset>
        </div>

        <div class="content-column content-column_layout_b">
          <div class="example">
            <div class="example__in example__in_site">
              <Widget class="widget_small"
                :class="positionClass"
                v-bind="widgetUI"
                :isOpen="true"
                :isSend="true"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="content-columns content-columns_content_settings">
        <div class="content-column content-column_layout_a">
          <fieldset class="form-fields-group">
            <ul class="form-fields-list">
              <li class="form-fields-list__item">
                <p class="form-remark form-remark_large" v-translate>
                  Change the text on the close button of the widget:
                </p>
              </li>
              <li class="form-fields-list__item">
                <dl class="field-composition">
                  <dt class="field-composition__title visuallyhidden">
                    <label class="form-field-label" v-translate>
                      Change the text on the close button of the widget:
                    </label>
                  </dt>
                  <dd class="field-compostion__content">
                    <TextEditor :property="'closeButtonText'" />
                  </dd>
                </dl>
              </li>
            </ul>
          </fieldset>
        </div>

        <div class="content-column content-column_layout_b">
          <div class="example">
            <div class="example__in example__in_site">
              <Widget class="widget_small"
                :class="positionClass"
                v-bind="widgetUI"
                :isOpen="true"
                :isSend="true"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="content-columns content-columns_content_settings">
        <div class="content-column content-column_layout_a">
          <fieldset class="form-fields-group">
            <ul class="form-fields-list">
              <li class="form-fields-list__item">
                <p class="form-remark form-remark_large" v-translate>
                  Change the color of the widget close icon:
                </p>
              </li>
              <li class="form-fields-list__item">
                <dl class="field-composition">
                  <dt class="field-composition__title visuallyhidden">
                    <label class="form-field-label" v-translate>
                      Change the color of the widget close icon:
                    </label>
                  </dt>
                  <dd class="field-compostion__content">
                    <ColorPalette
                      :property="'closeIconColor'"
                      :colors="defaultColors"
                    />
                  </dd>
                </dl>
              </li>
            </ul>
          </fieldset>
        </div>

        <div class="content-column content-column_layout_b">
          <div class="example">
            <div class="example__in example__in_site">
              <Widget class="widget_small"
                :class="positionClass"
                v-bind="widgetUI"
                :isOpen="true"
                :isSend="true"
              />
            </div>
          </div>
        </div>
      </div>
      <br>
      <br>
      <button type="submit" class="button button_primary is-small">
        <span class="button__text" v-translate>
          Save
        </span>
      </button>
      <br>
      <br>
    </form>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Widget from '~/components/Widget.vue'
  import WidgetPosition from '~/components/WidgetPosition.vue'
  import ColorPalette from '~/components/ColorPalette.vue'
  import TextEditor from '~/components/TextEditor.vue'

  export default {
    layout: 'settings',
    middleware: ['admin'],
    data () {
      return {
        defaultColors: [
          '#5d576b',
          '#0d1f2d',
          '#6f9283',
          '#e4c3ad',
          '#547aa5',
          '#f1bf98',
          '#eb9486'
        ]
      }
    },
    async fetch ({ store }) {
      await store.dispatch('getSettings', store.getters.userToken)
    },
    computed: {
      ...mapGetters([
        'settings',
        'userToken',
        'widgetUI'
      ]),
      position () {
        return this.$store.getters.widgetPosition
      },
      positionClass () {
        return `widget_position_${this.position}`
      }
    },
    components: {
      Widget,
      WidgetPosition,
      ColorPalette,
      TextEditor
    },
    methods: {
      saveForm () {
        try {
          this.$store.dispatch('saveSettings', {
            payload: this.settings,
            token: this.userToken
          })
         this.$toast.success(this.$gettext('Changes saved successfully!'))
        } catch (e) {
          this.$toast.error(this.$gettext('Oops! Something went wrong. Refresh the page and try again.'))
        }
      }
    },
  }
</script>

<style lang="stylus" scoped>
  .dashboard__content
    position fixed
    display flex
    flex-basis 100%
    transform translateX(100%)
    opacity 0

    @media (min-width: 768px)
      position static
      height 100%
      overflow auto
      padding 50px 5px 10px 50px
      transform none
      opacity 1
      box-sizing border-box

    &.is-show-mobile
      @media (max-width: 767px)
        position static
        padding 40px 15px 0
        overflow auto
        transform none
        opacity 1

  .content-columns_content_settings
    @media (min-width: 768px)
      display flex

    .content-column
      &_layout_a
        margin-bottom 30px

        @media (min-width: 768px)
          flex-basis 50%
          margin-bottom 0

      &_layout_b
        @media (min-width: 768px)
          flex-basis 50%
          padding 0 25px

    + .content-columns_content_settings
      margin-top 100px

  .form_settings
    width 100%

  .example
    background #f8f8f9

    @media (min-width: 768px)
      padding 30px 20px

    &__in
      position relative
      min-height 208px
      overflow hidden
      background-image url('/images/store.jpg')
      background-size cover
</style>
