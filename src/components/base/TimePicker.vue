<template>
  <v-menu
    ref="menu"
    v-model="menu2"
    :close-on-content-click="false"
    :nudge-right="40"
    :return-value.sync="time"
    transition="scale-transition"
    offset-y
    max-width="330px"
    min-width="270px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="selected"
        :label="label"
        prepend-icon="mdi-clock-time-four-outline"
        readonly
        placeholder="00:00:00"
        :dense="isDense"
        :style="styled"
        @v-on:input="$emit('input', $event)"
        v-on="on"
      />
    </template>
    <v-time-picker
      v-if="menu2"
      v-model="selected"
      full-width
      use-seconds
      @click:second="$refs.menu.save(selected)"
    />
  </v-menu>
</template>
<script>
export default defineComponent({
  props: {
    value: {
      type: String,
      default: () => ''
    },
    label: {
      type: String,
      default: () => 'Time'
    },
    styled: {
      type: Object,
      default: () => {}
    },
    isDense: {
      type: Boolean,
      default: () => false
    }
  },
  data () {
    return {
      time: null,
      menu2: false
    }
  },
  computed: {
    selected: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  }
})
</script>
