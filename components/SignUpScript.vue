<template>
  <form class="form">
    <fieldset class="form-fields-group">
      <ul class="form-fields-list">
        <li class="form-fields-list__item">
          <div class="remark" v-translate>
            Install the following code on each page of your site before the closing tag &lt;/body&gt;
          </div>
        </li>

        <li class="form-fields-list__item">
          <textarea class="form-field form-field_type_textarea form-field_content_code" readonly v-model="code"></textarea>
        </li>

        <li class="form-fields-list__item form-fields-list__item_content_submit">
          <ul class="form-field-groupbox" v-bind:class="isInbox ? 'form-field-groupbox_viewtype_center' : ''">
            <li class="form-field-groupbox__section">
              <button type="button" class="button button_primary button_content_sign-up" @click="doCopy">
                <span class="button__text" v-if="!isCopied" v-translate>
                  Copy code
                </span>

                <span class="button__text" v-else v-translate>
                  Copied!
                </span>
              </button>
            </li>

            <li class="form-field-groupbox__section" v-if="!isInbox">
              <nuxt-link to="/" class="button button_primary button_content_sign-up">
                <span class="button__text" v-translate>
                  Go to your account
                </span>
              </nuxt-link>
            </li>
          </ul>
        </li>
      </ul>
    </fieldset>
  </form>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    props: {
      isInbox: Boolean
    },

    data () {
      return {
        isCopied: false
      }
    },

    computed: {
      ...mapGetters(['formId']),

      code () {
        /* eslint-disable */
        return `<script>!function(){window.addEventListener("load",function(){var t;(t=document.createElement("script")).async=!0,t.src="https://feedberry.ru/backend/api/public/widget/loader/${this.formId}/file.js",document.body.appendChild(t)})}()<\/script>`
        /* eslint-enable */
      }
    },

    methods: {
      async doCopy () {
        await this.$copyText(this.code)
        this.isCopied = true

        setTimeout(() => {
          this.isCopied = false
        }, 3000)
      }
    }
  }
</script>