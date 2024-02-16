
<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'CustomDatePicker',
  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: () => new Date().toLocaleDateString()
    },
    isRequired: {
      type: Boolean,
      default: () => true
    },
    isClassed: {
      type: String,
      default: () => ''
    },
    isStyle: {
      type: Object,
      default: () => {}
    },
    isDense: {
      type: Boolean,
      default: () => false
    },
    isOutlined: {
      type: Boolean,
      default: () => false
    }
  },
  data () {
    return {
      menu1: null,
      date: null
    }
  },

  computed: {
    selected: {
      get () {
        return this.value
      },
      // @ts-ignore
      set (value) {
        this.$emit('input', value)
      }
    },
    computedDateFormatted () {
      return this.formatDate(this.date)
    }
  },

  watch: {
    date (val) {
      // @ts-ignore
      this.value = this.formatDate(this.date)
    }
  },
  methods: {
    // @ts-ignore
    formatDate (date) {
      if (!date) { return null }
      return date
    },
    // @ts-ignore
    parseDate (date) {
      if (!date) { return null }

      const [year, month, day] = date.split('-')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }
  }
})
</script>
<template>
  <!-- Date picker -->
  <v-menu
    ref="menu1"
    v-model="menu1"
    :close-on-content-click="false"
    transition="scale-transition"
    min-width="auto"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="selected"
        :class="isClassed"
        value
        :outlined="isOutlined"
        :dense="isDense"
        :label="label"
        :style="isStyle"
        readonly
        color="green lighten-1"
        :rules="isRequired ? [$validator.required, $validator.date] : []"
        @v-on:input="$emit('input', $event)"
        @blur="date = parseDate(value)"
        v-on="on"
      />
    </template>
    <v-date-picker
      v-model="selected"
      no-title
      header-color="green lighten-1"
      color="green lighten-1"
      @input="menu1 = false"
    />
  </v-menu>
  <!-- end of date picker -->
</template>
