<script setup lang="ts">
// import { computed } from 'vue';
import { ref, inject, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import { formatCurrency } from '@/utils/string';
import { useTheme } from 'vuetify';
import { getPrimary, getSecondary } from '@/utils/UpdateColors';
// import { ref } from 'vue';

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
// chart 
const xaxis = ref([])
const series = ref([{}])
const chartOptions = ref({
        chart: {
            type: 'bar',
            height: 350,
            fontFamily: `inherit`,
            toolbar: {
              show: false,
            },
        },
        colors: ['#6ac3fd', '#0b70fb', '#f64e60'],
        plotOptions: {
            bar: {
                horizontal: false,
                endingShape: 'rounded',
                columnWidth: '20%'
            }
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },

        xaxis: {
            categories: []
        },
        // yaxis: {
        //   title: {
        //     text: '$ (thousands)',
        //   },
        // },
        fill: {
            opacity: 1
        },
       
        tooltip: {
            theme: 'dark',
            y: {
              formatter(val:any) {
                return `${val}`;
              },
            },
        },
        grid: {
          show: false,
        },
        legend: {
          show: true,
          position: 'bottom',
          width: '50px',
        },
        responsive: [
            {
                breakpoint: 600,
                options: {
                    yaxis: {
                        show: false
                    }
                }
            }
        ]
    });
const columnChart = ref({
    series: [
        {
            name: 'Tổng khách giới thiệu',
            data: []
        },
        {
            name: 'Tổng khách hủy gia hạn',
            data: []
        },
        {
            name: 'Tiền giới thiệu nhận tạm',
            data: []
        },
        {
            name: 'Tiền ship tạm tính',
            data: []
        }
    ]
});
console.log('data chart',columnChart.value)
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
            console.log('get value chart', data)
            // total
            total_ref_users.value = data.total_ref_users
            total_ref_idle_users.value = data.total_ref_idle_users
            total_ref_profit.value = data.total_ref_profit
            total_shipping_amount_orders.value = data.total_shipping_amount_orders
            // list detail
            if(data.data.length > 0){
                items.value = data.data.map((item: any, index: number) => {
                    // chart format
                    // @ts-ignore
                    chartOptions.value.xaxis.categories.push(item.ref_code)
                    // @ts-ignore
                    columnChart.value.series[0].data.push(item.total_ref_active_users)
                    // @ts-ignore
                    columnChart.value.series[1].data.push(item.total_ref_idle_users)
                    // @ts-ignore
                    columnChart.value.series[2].data.push(item.total_ref_profit)
                    // @ts-ignore
                    columnChart.value.series[3].data.push(item.total_shipping_amount_orders)
                    
                    return {
                        ...item,
                        stt: index + 1
                    };
                })
            }
            console.log('format data', items.value, 'xaxis', chartOptions.value, columnChart.value)
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
    <!-- ---------------------------------------------------- -->
    <!-- Column Chart -->
    <!-- ---------------------------------------------------- -->
    <!-- <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
        <v-col cols="12">
            <UiParentCard title="Column Chart">
                <apexchart type="bar" height="300" :options="chartOptions" :series="columnChart.series"> </apexchart>
            </UiParentCard>
        </v-col>
    </v-row> -->
    <apexchart type="bar" height="300" :options="chartOptions" :series="columnChart.series"> </apexchart>
</template>
