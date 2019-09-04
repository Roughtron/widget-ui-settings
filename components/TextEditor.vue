<template>
  <div class="text-editor">
    <textarea
      class="form-field form-field_type_textarea text-editor__input"
      :value="text"
      @input="onInput">
    </textarea>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    props: {
      property: {
        type: String
      }
    },

    computed: {
      ...mapGetters(['widgetProperty']),

      text () {
        return this.widgetProperty(this.property)
      }
    },

    methods: {
      ...mapActions(['changeWidgetProperty']),

      onInput (e) {
        this.changeWidgetProperty({ property: this.property, value: e.target.value })
      }
    }
  }
</script>
