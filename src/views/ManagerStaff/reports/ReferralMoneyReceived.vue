<script lang='ts' setup>
import { ref, onMounted, inject } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import { useAuthStore } from '@/stores/auth';
import WriteExcel from '@/components/base/ExceltoFile/exceltofile.vue';
import { excelData } from '@/utils/excel';
import { firstDayOfMonth, lastDayOfMonth } from '@/utils/datetime';
import { formatCurrency } from '@/utils/string';

const page = ref({ title: 'Tiền giới thiệu nhận tạm' });
const breadcrumbs = ref([
    {
        text: 'Dashboard',
        disabled: false,
        href: '/'
    },
    {
        text: 'Tiền giới thiệu tạm tính',
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
const label = ref({ title: 'Tiền giới thiệu tạm tính' });
/* Header Data */
const search = ref(null);
const customSearch = ref('');
const items = ref([]);

// export excel
const columnExcels = ref([]);
const dataExcel = ref([{}]);
const filename = ref();
const headers = ref([
    { title: 'Mã khách hàng', align: 'start', key: 'customer_id' },
    { title: 'Tên khách hàng', align: 'start', key: 'customer_name' },
    { title: 'Số điện thoại', align: 'start', key: 'customer_phone' },
    { title: 'Ngày đăng ký', align: 'start', key: 'register_at' },
    { title: 'Số lượng gói đã mua', align: 'start', key: 'register_packages' },
    { title: 'Tiền nhận tạm tính', align: 'end', key: 'profit' }
]);

onMounted(() => {
    console.log('money', formatCurrency(2000))
    fetchData();
});

async function fetchData() {
    loading.value = true;

    const query = {
        code: useAuthStore().user ? useAuthStore().user.username : '',
        fromAt: firstDayOfMonth + `T00:00:00Z`,
        toAt: lastDayOfMonth + `T23:59:59Z`
    };
    try {
        const { data } = await api.report.profitReferralDetails(query);
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
                    'Ngày đăng ký': (item as any).register_at,
                    'Số lượng gói đã mua': (item as any).register_packages,
                    'Tiền nhận tạm tính': (item as any).profit
                };
                dataExcel.value.push(obj);
            });
            // excel export
            const data = excelData(`Thống kê ${label.value.title}`, headers.value, dataExcel.value);
            dataExcel.value = data.excels;
            columnExcels.value = [data.columnExcels] as any;
            filename.value = 'money-referral';
        }
    } catch (error) {
        console.log(error);
    }
    loading.value = false;
}
</script>

<template>
    <BaseBreadcrumb :breadcrumbs='breadcrumbs' :title='page.title'></BaseBreadcrumb>
    <v-row dense style='margin: 10px 0;'>
        <v-col cols='12' sm='6'>
            <v-text-field v-model='customSearch' density='compact' hide-details label='Tìm kiếm' style='max-width: 65%;'
                          variant='outlined'></v-text-field>
        </v-col>
        <v-col class='text-right' cols='12' sm='6'>
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
        <template #item.profit="{ item }">
            {{ formatCurrency(item.selectable.profit) }}
        </template>
    </v-data-table>
    
</template>
