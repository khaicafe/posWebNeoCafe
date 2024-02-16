<template>
  <v-dialog
    v-model="dialogS"
    persistent
    fullscreen
    :scrim="false"
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar
        dark
        color="primary"
      >
        <v-hover v-slot="{ hover }">
          <v-btn icon dark :style="{ 'background-color': hover ? '#0391f040' : 'transparent' }" @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-hover>

        <v-toolbar-title> {{ title }}</v-toolbar-title>
        <v-spacer />
      </v-toolbar>
      <v-card-text>
        <div cols="12" md="12">
          <p style="font-size: 18px; font-weight: bold"> {{ label }} </p>
        </div>
        <!-- content dialog -->
        <slot />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    }
  },
  data () {
    return {

    }
  },
  computed: {
    dialogS () {
      return this.dialog
    }
  },
  methods: {
    close () {
      console.log('close')
      this.$emit('click-close')
    }
  }
})
</script>
