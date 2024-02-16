<script setup lang='ts'>
import { ref, inject, onMounted, watch } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import IconsWithLabelTabs from "@/components/dashboards/staff/IconsWithLabelTabs.vue";
import popupTable from "@/components/dashboards/staff/popupTable.vue";
import { useRoute } from 'vue-router';
// detail poupup
import StaffDetailGuestIntro from '@/components/dashboards/staff/StaffDetailGuestIntro.vue';
import StaffDetailCustomerCancelsRenewal from '@/components/dashboards/staff/StaffDetailCustomerCancelsRenewal.vue';
import StaffDetailReferralMoneyReceived from '@/components/dashboards/staff/StaffDetailReferralMoneyReceived.vue';
import StaffDetailShippingFeeEstimated from '@/components/dashboards/staff/StaffDetailShippingFeeEstimated.vue';

import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import { formatCurrency } from '@/utils/string';
// ==========================================================

const api: any = inject('$api');
const time = ref(null);
const page = ref({ title: 'Danh sách nhân viên' });
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
        text: 'Manager',
        disabled: false,
        href: '/dashboards/manager-staff'
    },
    {
        text: 'Danh sách nhân viên',
        disabled: true,
        href: '#'
    }
]);
/* params */
const params = ref({} as any)
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
const tableSelect = ref({})
const customSearch = ref()
const userStaffs = ref()
const ref_code = ref()
// dialog
const showOff = ref(false)
let querys= ref({} as any)
// =========================


// function
async function fetch() {
    if (typeof userStaffs.value != 'undefined'){
        loading.value = true
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
            console.log('get value manage', data)
            // total
            total_ref_users.value = data.total_ref_users
            total_ref_idle_users.value = data.total_ref_idle_users
            total_ref_profit.value = data.total_ref_profit
            total_shipping_amount_orders.value = data.total_shipping_amount_orders
            // list detail
            if(data.data.length > 0){
                items.value = data.data.map((item: any, index: number) => {
                    return {
                        ...item,
                        stt: index + 1
                    };
                })
            }
            // console.log('get value manage', data, items.value)
        } catch (error) {
            console.log(error);
        }
        loading.value = false
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
// function popup
function handleClick(e: any, row: any) {
    console.log(row.item.columns)
    ref_code.value = row.item.columns.ref_code
    // open dialog
    showOff.value = true
}
function closePopup() {
    showOff.value = false
}
watch([timeSelected, userStaffs], () => {
  setupTime()
})
onMounted(() => {
    fetchListStaffs()
    setupInfo()
    const route = useRoute();
    const id = route.params.id;
    // Sử dụng giá trị id ở đây
    try {
        params.value = JSON.parse(decodeURIComponent(id as any))
        console.log('send params', params.value)
        if (params.value) {
            // startDate.value = params.value.fromAt
            // endDate.value = params.value.toAt
            timeSelected.value = params.value.month
        }
    } catch (error) {
        console.log('id paramddddd', id)
    }
})
</script>

<template>
    <BaseBreadcrumb :breadcrumbs='breadcrumbs' :title='page.title'></BaseBreadcrumb>
    <!--  :label="'abddd'" -->
    <popupTable
        :dialog="showOff"
        :title="`Báo cáo chi tiết ${ref_code}`"
        @click-close="closePopup()"
    >
        <IconsWithLabelTabs>
            <v-window-item value="1">
                <StaffDetailGuestIntro
                :month="querys"
                :code="ref_code"
                >
            </StaffDetailGuestIntro>
            </v-window-item>
            <v-window-item value="2">
                <StaffDetailCustomerCancelsRenewal
                :month="querys"
                :code="ref_code"
                >
                </StaffDetailCustomerCancelsRenewal>
            </v-window-item>
            <v-window-item value="3">
                <StaffDetailReferralMoneyReceived
                :month="querys"
                :code="ref_code"
                >
                </StaffDetailReferralMoneyReceived>
            </v-window-item>
            <v-window-item value="4">
                <StaffDetailShippingFeeEstimated
                :month="querys"
                :code="ref_code"
                >
                </StaffDetailShippingFeeEstimated>
            </v-window-item>
        </IconsWithLabelTabs>
    </popupTable>
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
    <v-row>
        <v-col cols="12" sm="12">
            <!-- fixed-header -->
            <v-data-table
                :headers='headers'
                :items='items'
                :loading='loading'
                :search='customSearch'
                class='border rounded-md'
                items-per-page='5'
                @click:row="handleClick"
                >
                <template #item.profit="{ item }">
                    {{ formatCurrency(item.selectable.total_shipping_amount_orders) }}
                </template>
            </v-data-table>
        </v-col>
    </v-row>
      
</template>