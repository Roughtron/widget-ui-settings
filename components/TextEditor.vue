<template>
  <div class="text-editor">
    <textarea class="form-field form-field_type_textarea text-editor__input" v-model="text" @input="onInput"></textarea>
  </div>
</template>

<script>
  export default {
    props: {
      property: {
        type: String
      }
    },
    computed: {
      text () {
        return this.$store.getters.widgetProperty(this.property)
      }
    },
    methods: {
      onInput (e) {
        this.$store.dispatch('changeWidgetProperty', { property: this.property, value: e.target.value })
      }
    }
  }
</script>
