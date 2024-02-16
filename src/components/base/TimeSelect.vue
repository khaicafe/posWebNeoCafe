
<script lang="ts">
import DatePicker from '@/components/base/DatePicker.vue'
import { defineComponent } from 'vue';
export default defineComponent({
  components: { DatePicker },
  props: {
    isDense: {
      type: Boolean,
      default: () => false
    },
    isFilled: {
      type: Boolean,
      default: () => true
    },
    isOutlined: {
      type: Boolean,
      default: () => true
    },
    fromDate: {
      type: String,
      default: () => ''
    },
    timeSelector: {
      type: Number,
      default: () => -1
    },
    toDate: {
      type: String,
      default: () => ''
    },
    isStyle: {
      type: Object,
      default: () => {}
    },
    listTime: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      timeSelected: -1,
      timeTypeReport: [
        { name: 'Hôm qua', id: 1 },
        { name: '3 ngày gần nhất', id: 6 },
        { name: '7 ngày gần nhất', id: 2 },
        { name: '1 tháng gần nhất', id: 3 },
        { name: '3 tháng gần nhất', id: 4 },
        { name: 'Thời gian cụ thể', id: 5 }
      ],
      fromDay: '',
      toDay: ''
    }
  },
  watch: {
    fromDate (v) {
      if (this.fromDay !== v) {
        this.fromDay = v
      }
    },
    toDate (v) {
      if (this.toDay !== v) {
        this.toDay = v
      }
    },
    fromDay (v) {
      if (this.compareDate('from', v)) {
        this.$emit('update')
      } else {
        this.fromDay = this.formatDate('date', 1)
      }
    },
    toDay (v) {
      if (this.compareDate('to', v)) {
        this.$emit('update')
      } else {
        this.toDay = this.formatDate('', 0)
      }
    },
    timeSelected (v) {
      if (v && v !== -1) {
        this.getDateByType(v)
        this.$emit('update')
      }
    }
  },
  mounted () {
    if (this.timeSelector !== -1) {
      // @ts-ignore
      this.timeSelected = this.timeSelector
    }
    if (this.listTime && this.listTime.length > 0) {
      // @ts-ignore
      this.timeTypeReport = this.listTime
    }
  },
  methods: {
    // @ts-ignore
    getDateByType (v) {
      if (this.listTime && this.listTime.length > 0) {
        if (v === 1) {
          this.fromDay = this.formatDate('date', 6)
          this.toDay = this.formatDate('', 0)
        } else if (v === 2) {
          this.fromDay = this.formatDate('month', 1)
          this.toDay = this.formatDate('', 0)
        } else if (v === 3) {
          this.fromDay = this.formatDate('month', 2)
          this.toDay = this.formatDate('', 0)
        } else if (v === 4) {
          this.fromDay = this.formatDate('month', 3)
          this.toDay = this.formatDate('', 0)
        } else if (v === 5) {
          this.fromDay = this.formatDate('month', 4)
          this.toDay = this.formatDate('', 0)
        }
      } else if (v === 1) {
        this.fromDay = this.formatDate('date', 1)
        this.toDay = this.formatDate('', 0)
      } else if (v === 2) {
        this.fromDay = this.formatDate('date', 6)
        this.toDay = this.formatDate('', 0)
      } else if (v === 3) {
        this.fromDay = this.formatDate('month', 1)
        this.toDay = this.formatDate('', 0)
      } else if (v === 4) {
        this.fromDay = this.formatDate('month', 3)
        this.toDay = this.formatDate('', 0)
      } else if (v === 6) {
        this.fromDay = this.formatDate('date', 2)
        this.toDay = this.formatDate('', 0)
      }
    },
    // @ts-ignore
    formatDate (type, dt) {
      const currentDate = new Date()
      if (type === 'date') {
        currentDate.setDate(currentDate.getDate() - dt)
      } else if (type === 'month') {
        currentDate.setMonth(currentDate.getMonth() - dt)
      }
      const date = ('0' + currentDate.getDate()).slice(-2)
      const month = ('0' + (currentDate.getMonth() + 1)).slice(-2)
      const year = currentDate.getFullYear()
      return `${year}-${month}-${date}`
    },
    // @ts-ignore
    compareDate (type, val) {
      let from = 0
      let to = 0
      if (type === 'from') {
        from = Date.parse(val)
        to = Date.parse(this.toDay)
      } else {
        from = Date.parse(this.fromDay)
        to = Date.parse(val)
      }
      return from <= to
    },
    getFromDate () {
      return this.fromDay
    },
    getToDate () {
      return this.toDay
    },
    getTimeType () {
      return this.timeSelected
    }
  }
})
</script>
<template>
  <div class="px-0">
    <div>
      <v-select
        v-model="timeSelected"
        :items="timeTypeReport"
        :label="'Chọn thời gian'"
        single-line
        hide-details="true"
        item-text="name"
        :outlined="isOutlined"
        :filled="isFilled"
        :dense="isDense"
        item-value="id"
        prepend-inner-icon="mdi-clock"
      />
    </div>
    <div
      v-if="timeSelected === 5"
      class="py-6"
    >
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <date-picker
            v-model="fromDay"
            :label="'Bắt đầu'"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <date-picker
            v-model="toDay"
            :style="isStyle"
            :label="'Kết thúc'"
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>
