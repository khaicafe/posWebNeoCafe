<script lang='ts' setup>
import { ref, onMounted, inject, watch } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import { useAuthStore } from '@/stores/auth';
import WriteExcel from '@/components/base/ExceltoFile/exceltofile.vue';
import { excelData } from '@/utils/excel';
import { firstDayOfMonth, lastDayOfMonth } from '@/utils/datetime';
import { useRoute } from 'vue-router';

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
    { title: 'Số luọng gói đã mua', align: 'start', key: 'register_packages' }
    // { title: 'Giá trị gói', align: 'end', key: 'budget' }
]);
watch([timeSelected], () => {
  setupTime()
})
onMounted(() => {
    setupInfo();
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
        code: useAuthStore().user ? useAuthStore().user.username : '',
        fromAt: startDate.value + `T00:00:00Z`,
        toAt: endDate.value + `T23:59:59Z`
    };
    try {
        const { data } = await api.report.referralDetails(query);
        console.log('query', query, 'data', data);
        items.value = data.data === null ? [] : data.data;

        // Format excel data
        if (items) {
            items.value.map((item, index) => {
                // console.log(item, 'item table');
                const obj = {
                    'Mã khách hàng': (item as any).customer_id,
                    'Tên khách hàng': (item as any).customer_name,
                    'Số điện thoại': (item as any).customer_phone,
                    'Số luọng gói đã mua': (item as any).register_packages
                };
                dataExcel.value.push(obj);
            });
            // excel export
            const data = excelData(`Thống kê ${label.value.title}`, headers.value, dataExcel.value);
            dataExcel.value = data.excels;
            columnExcels.value = [data.columnExcels] as any;
            filename.value = 'customer-referrals';
        }
    } catch (error) {
        console.log(error);
    }
    loading.value = false;
}
</script>

<template>
    <BaseBreadcrumb :breadcrumbs='breadcrumbs' :title='page.title'></BaseBreadcrumb>
    <v-row>
        <v-col cols='12' sm='4' class="py-0 my-0">
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
        </v-col>
        <v-col cols='12' sm='4'>
            <v-text-field v-model='customSearch' density='compact' hide-details label='Tìm kiếm' style='max-width: 65%;'
                          variant='outlined'></v-text-field>
        </v-col>
        <v-col class='text-right' cols='12' sm='4'>
            <write-excel
                :columns='columnExcels'
                :data='[dataExcel]'
                :file-name="`${filename + ((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)).replace('-', '')}`"
                :files="'1 file'"
                :sheet-names="[`${filename + ((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)).replace('-', '')}`]"
                class='mr-3'
            />
        </v-col>
    </v-row>

    <v-data-table
        :headers='headers'
        :items='items'
        :loading='loading'
        :search='customSearch'
        class='border rounded-md'
        items-per-page='5'>
       
    </v-data-table>
</template>
