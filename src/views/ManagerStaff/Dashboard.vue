<script setup lang='ts'>
import { ref, inject, onMounted, watch } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import RevenueUpdates from "@/components/dashboards/staff/RevenueUpdates.vue";
import MonthlyEarnings from "@/components/dashboards/staff/MonthlyEarnings.vue";
import Customers from "@/components/dashboards/staff/Customers.vue";
import TheEarnings from '@/components/dashboards/staff/TheEarnings.vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import { formatCurrency } from '@/utils/string';
import ChartbarStaff from '@/components/dashboards/staff/ChartbarStaff.vue';
// ==========================================================

const api: any = inject('$api');
const time = ref(null);
const page = ref({ title: 'Thông kê' });
const label = ref([
                { id: 1, title: 'Tổng khách giới thiệu' },
                { id: 2, title: 'Tổng khách hủy gia hạn' },
                { id: 3, title: 'Tiền giới thiệu nhận tạm' },
                { id: 4, title: 'Tiền ship tạm tính' },
                { id: 5, title: 'Danh sách nhân viên' }
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
        text: 'Manager',
        disabled: true,
        href: '#'
    },
    {
        text: 'Thống Kê',
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
// list staffs
const headers = ref([
    { title: 'STT', align: 'start', key: 'stt' },
    { title: 'Mã nhân viên', align: 'start', key: 'ref_code' },
    // { title: 'Số điện thoại', align: 'start', key: 'customer_phone' },
    { title: 'Tổng khách giới thiệu', align: 'start', key: 'total_ref_users' },
    { title: 'Tổng khách hủy gia hạn', align: 'start', key: 'total_ref_idle_users' },
    { title: 'Tiền giới thiệu nhận tạm', align: 'end', key: 'total_shipping_amount_orders' },
    { title: 'Tiền ship tạm tính', align: 'end', key: 'total_ref_profit' }
])
const items = ref([])
const loading = ref(false)
const customSearch = ref()
const userStaffs = ref()
let querys= ref({} as any)
// apex chart

// =========================


// function
async function fetch() {
    if (typeof userStaffs.value != 'undefined'){
        const query = {
            // code: (useAuthStore().user ? `${useAuthStore().user.username},` : ''),
            // branchId: 234,
            code: userStaffs.value,
            fromAt: startDate.value + `T00:00:00Z`,
            toAt: endDate.value + `T23:59:59Z`
        };
        querys.value = query
        querys.value.month = timeSelected.value
        console.log('query', query)
        try {
            const { data } = await api.report.getTotal(query);
            // total
            total_ref_users.value = data.total_ref_users
            total_ref_idle_users.value = data.total_ref_idle_users
            total_ref_profit.value = data.total_ref_profit
            total_shipping_amount_orders.value = data.total_shipping_amount_orders
            // list detail
            // items.value = data.data.map((item: any, index: number) => {
            //     return {
            //         ...item,
            //         stt: index + 1
            //     };
            // })
            console.log('get value manage', data, items.value)
        } catch (error) {
            console.log(error);
        }
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
async function fetchListStaffs (){
    
    const { data } = await axios.get(`https://dev-api.neocafe.tech/staffs/v1/users`);
    const result = await data.users.filter((item: { branch_id: number; }) => 
        item.branch_id === useAuthStore().user.branch_id
    )
    console.log('info user', useAuthStore().user.branch_id, result)

    userStaffs.value = []
    result.map((item: { username: string }) => {
        userStaffs.value += item.username + ','
    })

    console.log('filter', result, userStaffs.value)
}
watch([timeSelected, userStaffs], () => {
  setupTime()
})
onMounted(() => {
    fetchListStaffs()
  setupInfo()
//   fetch()
    
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
                :label="label[4]"
                :title='label[0].title'
                :money='total_ref_users.toString()'
                :package="querys"
             />
        </v-col>
        <v-col class='' cols='12' sm="6">
            <TheEarnings
                :title='label[1].title'
                :money='total_ref_idle_users.toString()' 
                :package="querys"
                />
        </v-col>
        <!---Revenue updates---->
        <v-col cols="12" sm="12" lg="8">
            <!-- <RevenueUpdates /> -->
            <ChartbarStaff></ChartbarStaff>
        </v-col>
        <!---Monthly earnings / Customers---->
        <v-col cols="12" sm="12" lg="4">
            <MonthlyEarnings 
                :money='total_ref_profit'
                :package="querys"
            />
            <Customers 
                :money='total_shipping_amount_orders'
                :package="querys"
            />
        </v-col>
    </v-row>
</template>