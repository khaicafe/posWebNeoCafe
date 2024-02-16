<script lang='ts' setup>
import { ref, onMounted, inject, watch } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import { useAuthStore } from '@/stores/auth';
import WriteExcel from '@/components/base/ExceltoFile/exceltofile.vue';
import { excelData } from '@/utils/excel';
import { firstDayOfMonth, lastDayOfMonth } from '@/utils/datetime';
import { useRoute } from 'vue-router';
import { formatCurrency } from '@/utils/string';


const page = ref({ title: 'Tổng khách giới thiệu' });
const breadcrumbs = ref([
    {
        text: 'Dashboard',
        disabled: false,
        href: '/'
    },
    {
        text: 'Tổng khách giới thiệu',
        disabled: true,
        href: '#'
    }
]);

const api: any = inject('$api');
const count = ref(0);
let loading = ref(false);
const dialog = ref(false);
const dialog2 = ref(false);
/* label */
const label = ref({ title: 'Tổng khách giới thiệu' });
/* Header Data */
const search = ref(null);
const customSearch = ref('');
const items = ref([]);
/* params */
const params = ref({} as any)
// date
const timeSelected = ref()
const listDate = ref([])
const y = new Date().getFullYear();
const m = new Date().getMonth();
const startDate = ref(new Date(y, m, 1).toLocaleDateString('en-GB').split('/').reverse().join('-'))
const endDate = ref(new Date(y, m + 1, 0).toLocaleDateString('en-GB').split('/').reverse().join('-'))
// export excel
const columnExcels = ref([]);
const dataExcel = ref([{}]);
const filename = ref();
const headers = ref([
{ title: 'Mã khách hàng', align: 'start', key: 'customer_id' },
    { title: 'Tên khách hàng', align: 'start', key: 'customer_name' },
    { title: 'Số điện thoại', align: 'start', key: 'customer_phone' },
    { title: 'Tổng đơn', align: 'start', key: 'total_orders' },
    { title: 'Tiền Tổng đơn', align: 'start', key: 'total_amount' },
    { title: 'Tiền nhận tạm tính', align: 'end', key: 'total_profit' }
]);
const props = defineProps({
    month: {
        type: Object,
        default: () => {}
    },
    code: String as any
});
watch([timeSelected], () => {
  setupTime()
})
onMounted(() => {
    setupInfo();
    try {
        params.value = props.month
        console.log('send params', params.value)
        if (params.value) {
            // startDate.value = params.value.fromAt
            // endDate.value = params.value.toAt
            timeSelected.value = params.value.month
        }
    } catch (error) {
        console.log('month', error)
    }
});
// function
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

async function fetch() {
    loading.value = true;

    const query = {
        code: props.code,
        // code: useAuthStore().user ? useAuthStore().user.username : '',
        fromAt: startDate.value + `T00:00:00Z`,
        toAt: endDate.value + `T23:59:59Z`
    };
    try {
        const { data } = await api.report.profitShippingDetails(query);
        console.log(data);
        items.value = data.data === null ? [] : data.data;

        // Format excel data
        if (items) {
            items.value.map((item, index) => {
                console.log(item, 'item table');
                const obj = {
                    'Mã khách hàng': (item as any).customer_id,
                    'Tên khách hàng': (item as any).customer_name,
                    'Số điện thoại': (item as any).customer_phone,
                    'Tổng đơn': (item as any).total_orders,
                    'Tiền Tổng đơn': (item as any).total_amount,
                    'Tiền nhận tạm tính': (item as any).total_profit
                };
                dataExcel.value.push(obj);
            });
            // excel export
            const data = excelData(`Thống kê ${label.value.title}`, headers.value, dataExcel.value);
            dataExcel.value = data.excels;
            columnExcels.value = [data.columnExcels] as any;
            filename.value = 'shipping-fee';
        }
    } catch (error) {
        console.log(error);
    }
    loading.value = false;
}
</script>

<template>
   
    <v-data-table
        :headers='headers'
        :items='items'
        :loading='loading'
        :search='customSearch'
        class='border rounded-md'
        items-per-page='5'>
       
    </v-data-table>
</template>
