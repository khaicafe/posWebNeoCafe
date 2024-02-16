<script setup lang="ts">
import { ref, computed, inject } from "vue";
import { getPrimary, getSecondary } from '@/utils/UpdateColors';
import { useAuthStore } from '@/stores/auth';
import { firstDayOfMonth, lastDayOfMonth } from '@/utils/datetime';
import { formatCurrency } from '@/utils/string';
import { router } from '@/router'

const props = defineProps({
    label: Object as any,
    money: {
        type: Number,
        default: '0'
    },
    headers: {
      type: Array,
      default: () => []
    },
    package: {
        type: Object,
        default: () => {}
    }
});
const api: any = inject('$api');
let totalProfit = ref(0)
/*Chart */
let Chart = computed(() => {
    return {
        series: [
            // {
            //     name: "Tiền giới thiệu nhận tạm",
            //     data: [6, 10, 9, 11, 9, 10, 12, 10, 9, 11, 9, 10, 12],
            // },
        ],

        chart: {
            toolbar: {
                show: false,
            },
            foreColor: "#adb0bb",
            fontFamily: `inherit`,
            type: "bar",
            height: 45,
            sparkline: {
                enabled: true,
            },
        },
        colors: ["rgba(255,255,255,0.5)"],

        marker: {
            size: 0,
        },

        tooltip: {
            theme: "dark",
        },

        grid: {
            show: false,
        },

        stroke: {
            show: true,
            width: 2,
            curve: "smooth",
            colors: ["transparent"],
        },

        plotOptions: {
            bar: {
                horizontal: false,
                startingShape: "flat",
                endingShape: "flat",
                columnWidth: "30%",
                barHeight: "100%",
            },
        },
    }
});

async function fetchData() {
    const query = {
        code: useAuthStore().user ? useAuthStore().user.username : '',
        fromAt: firstDayOfMonth + `T00:00:00Z`,
        toAt: lastDayOfMonth + `T23:59:59Z`
    };
    try {
        const { data } = await api.report.profitReferralDetails(query);
        console.log(data);
        const items = data.data === null ? null : data.data;
        const datas = [] as any
        if (items) {
            totalProfit.value = data.total_profit
            items.value.map((item: any, index: any) => {
                // const obj = {
                    // 'Mã khách hàng': (item as any).customer_id,
                    // 'Tên khách hàng': (item as any).customer_name,
                    // 'Số điện thoại': (item as any).customer_phone,
                    // 'Ngày đăng ký': (item as any).register_at,
                    // 'Số lượng gói đã mua': (item as any).register_packages,
                    // 'Tiền nhận tạm tính': (item as any).profit
                // };
                datas.push((item as any).profit);
            });
        }
        const obj = {
            name: "Tiền giới thiệu nhận tạm",
            data: datas
        }
        // @ts-ignore
        Chart.value.series.push(obj)
        console.log('tiền tạm nhận', Chart.value)
        return obj
    } catch (error) {
        console.log('tiền tạm nhận', error);
    }
}
    
fetchData()
async function router_page () {
    console.log('label', props)
    try {
        if (props.label.id === 3){
            await router.push({ name: 'Tiền giới thiệu tạm tính', params: { id: encodeURIComponent(JSON.stringify(props.package)) } })
        }
    } catch (error) {
        console.log(error)
    }
}

const select = ref("March");
const items = ref(["March", "April", "May", "June"]);
</script>

<template>
    <v-card elevation="10" class="mb-4 bg-primary" @click="router_page">
        <v-card-text class="pb-sm-7">
            <h3 class="text-h4">Tiền giới thiệu</h3>
            <div class="mt-4">
                <apexchart type="bar" height="45px" :options="Chart" :series="Chart.series">
                </apexchart>
            </div>
            <h2 class=" text-h4 pt-8  d-flex align-items-end">
                {{ formatCurrency(money) }}
                <span class="text-subtitle-1 ml-2 d-flex align-center font-weight-medium "><ArrowUpLeftIcon  size="18"/>Tháng này</span>
            </h2>
        </v-card-text>
    </v-card>
</template>
