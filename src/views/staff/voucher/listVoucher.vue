<script lang='ts' setup>
import { ref, onMounted, inject, watch } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import { useAuthStore } from '@/stores/auth';
import WriteExcel from '@/components/base/ExceltoFile/exceltofile.vue';
import { excelData } from '@/utils/excel';
import { firstDayOfMonth, lastDayOfMonth } from '@/utils/datetime';
import { useRoute } from 'vue-router';
import { MoodSmileIcon, CircleXIcon } from 'vue-tabler-icons';

const page = ref({ title: 'Danh sách Voucher' });
const breadcrumbs = ref([
    {
        text: 'Dashboard',
        disabled: false,
        href: '/'
    },
    {
        text: 'Danh sách Voucher',
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
const label = ref({ title: 'Danh sách Voucher' });
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
    { title: 'STT', align: 'start', key: 'stt' },
    { title: 'Mã Voucher', align: 'start', key: 'code' },
    { title: 'Trạng thái', align: 'start', key: 'status' }
]);

onMounted(() => {
    fetch()
});
// function

async function fetch() {
    loading.value = true;

    const query = {
        code: useAuthStore().user ? useAuthStore().user.username : '',
        // fromAt: startDate.value + `T00:00:00Z`,
        // toAt: endDate.value + `T23:59:59Z`
    };
    try {
        const { data } = await api.voucher.getListVoucher(query.code);
        const temp = data.data === null ? [] : data.accumulation;
        console.log('list voucher', temp)
        if(temp){
            items.value = temp.map((item: any, index: number) => {
                return {
                    ...item,
                    stt: index + 1
                };
            })
        }
        console.log('query', query, 'data', items.value);
        // Format excel data
        // if (items) {
        //     items.value.map((item, index) => {
        //         // console.log(item, 'item table');
        //         const obj = {
        //             'Mã khách hàng': (item as any).customer_id,
        //             'Tên khách hàng': (item as any).customer_name,
        //             'Số điện thoại': (item as any).customer_phone,
        //             'Số luọng gói đã mua': (item as any).register_packages
        //         };
        //         dataExcel.value.push(obj);
        //     });
        //     // excel export
        //     const data = excelData(`Thống kê ${label.value.title}`, headers.value, dataExcel.value);
        //     dataExcel.value = data.excels;
        //     columnExcels.value = [data.columnExcels] as any;
        //     filename.value = 'customer-referrals';
        // }
    } catch (error) {
        console.log(error);
    }
    loading.value = false;
}
</script>

<template>
    <BaseBreadcrumb :breadcrumbs='breadcrumbs' :title='page.title'></BaseBreadcrumb>
    <v-row style="margin-bottom: 1px;">
        <v-col cols='12' sm='8'></v-col>
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
        <template #item.status="{ item }">
            <v-chip v-if="item.selectable.status=='assigned'" color="info" class="text-body-2">
                 Khả dụng
            </v-chip>
            <v-chip v-else-if="item.selectable.status=='claimed'" color="success" class="text-body-2">
                Đã dùng
            </v-chip>
            <v-chip v-else-if="item.selectable.status=='expired'" color="error" class="text-body-2">
                Hết hạn
                <CircleXIcon class="ml-2" start size="20" />
            </v-chip>
        </template>
    </v-data-table>
</template>
