<script setup lang='ts'>
import { ref, inject, onMounted, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import RevenueUpdates from "@/components/dashboards/staff/RevenueUpdates.vue";
import MonthlyEarnings from "@/components/dashboards/staff/MonthlyEarnings.vue";
import Customers from "@/components/dashboards/staff/Customers.vue";
import TheEarnings from '@/components/dashboards/staff/TheEarnings.vue';
// ==========================================================

const api: any = inject('$api');
const time = ref(null);
const page = ref({ title: 'Dashboard' });
const label = ref([
                { id: 1, title: 'Tổng khách giới thiệu' },
                { id: 2, title: 'Tổng khách hủy gia hạn' },
                { id: 3, title: 'Tiền giới thiệu nhận tạm' },
                { id: 4, title: 'Tiền ship tạm tính' }
            ]);
const total = ref({
                total_ref_users: 0,
                total_ref_idle_users: 0,
                total_shipping_amount_orders: 0,
                total_ref_profit: 0
            })
const total_ref_users = ref(0)
const total_ref_idle_users =ref(0)
const total_ref_profit = ref(0)
const total_shipping_amount_orders = ref(0)

const breadcrumbs = ref([
    {
        text: 'Home',
        disabled: false,
        href: '/'
    },
    {
        text: 'Dashboard',
        disabled: true,
        href: '#'
    }
]);
const timeSelected = ref()
const listDate = ref([])
const y = new Date().getFullYear();
const m = new Date().getMonth();
const startDate = ref(new Date(y, m, 1).toLocaleDateString('en-GB').split('/').reverse().join('-'))
const endDate = ref(new Date(y, m + 1, 0).toLocaleDateString('en-GB').split('/').reverse().join('-'))
const branchSelected = ref()
const branch = ref()
let querys= ref({} as any)
// =========================


// function
async function fetch() {
    const query = {
        code: (useAuthStore().user ? `${useAuthStore().user.username},` : ''),
        fromAt: startDate.value + `T00:00:00Z`,
        toAt: endDate.value + `T23:59:59Z`
    };
    querys.value = query
    querys.value.month = timeSelected.value
    // console.log('query', query)
    try {
        const { data } = await api.report.getTotal(query);
        total.value = data;
        total_ref_users.value = data.total_ref_users
        total_ref_idle_users.value = data.total_ref_idle_users
        total_ref_profit.value = data.total_ref_profit
        total_shipping_amount_orders.value = data.total_shipping_amount_orders
        console.log('get data', total.value)
    } catch (error) {
        console.log(error);
    }
}

function setupInfo() {
//   const currentUser = authStore.user
//   if (currentUser) {
//     branch.value = currentUser.branch || []
//     branchSelected.value = branch.value[0]
//   }
  let date = new Date(), y = date.getFullYear(), m = date.getMonth();
  for(let i = 1; i <= m+1; i++) {
    if ( i <= 9) {
      (listDate as any).value.push({ id: i + 1, name: `Tháng 0${i}`})
      console.log('i', i, m)
    } else {
      (listDate as any).value.push({ id: i + 1, name: `Tháng ${i}`})
    }
  }
  timeSelected.value = listDate.value[m]
  let firstDay = new Date(y, m, 1).toLocaleDateString('en-GB').split('/').reverse().join('-');
  let lastDay = new Date(y, m + 1, 0).toLocaleDateString('en-GB').split('/').reverse().join('-');
  startDate.value = firstDay
  endDate.value = lastDay
  console.log('starDate', firstDay)
}

function setupTime() {
  let date = new Date(), y = date.getFullYear();
  let month = timeSelected.value.id - 1
  let firstDay = new Date(y, month - 1, 1).toLocaleDateString('en-GB').split('/').reverse().join('-');
  let lastDay = new Date(y, month, 0).toLocaleDateString('en-GB').split('/').reverse().join('-');
  startDate.value = firstDay || ''
  endDate.value = lastDay || ''
  console.log('abcd', startDate.value)
  fetch()
}

watch([timeSelected], () => {
  setupTime()
})
onMounted(() => {
  setupInfo()
  fetch()
})
</script>

<template>
    <BaseBreadcrumb :breadcrumbs='breadcrumbs' :title='page.title'></BaseBreadcrumb>
    <v-select
        v-model="timeSelected"
        :items="listDate"
        item-value="id"
        color="primary"
        item-title="name"
        label="Chọn"
        autofocus
        outlined
        return-object
        style="width: 40%;"
        />
    <v-row class='mt-0'>
        <v-col class='' cols='12' sm="6">
            <TheEarnings
                :label='label[0]'
                :title='label[0].title'
                :money='total_ref_users.toString()'
                :package="querys"
             />
        </v-col>
        <v-col class='' cols='12' sm="6">
            <TheEarnings
                :label='label[1]'
                :title='label[1].title'
                :money='total_ref_idle_users.toString()' 
                :package="querys"
                />
        </v-col>
        <!---Revenue updates---->
        <v-col cols="12" sm="12" lg="8">
            <RevenueUpdates />
        </v-col>
        <!---Monthly earnings / Customers---->
        <v-col cols="12" sm="12" lg="4">
            <MonthlyEarnings 
                :label='label[2]'
                :money='total_ref_profit'
                :package="querys"
            />
            <Customers 
                :label='label[3]'
                :money='total_shipping_amount_orders'
                :package="querys"
            />
        </v-col>
    </v-row>
    <!-- </v-container> -->
</template>