<script setup lang="ts">
import { ref, computed, onMounted, inject } from "vue";
import { getPrimary, getSecondary } from '@/utils/UpdateColors';
import { useAuthStore } from '@/stores/auth';
import { firstDayOfMonth, lastDayOfMonth } from '@/utils/datetime';
import { formatCurrency } from '@/utils/string';
import { router } from '@/router'

const api: any = inject('$api');
const props = defineProps({
    label: {
        type: Object,
        default: () => {}
    },
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
/*Chart */
const Chart = computed(() => {
    return {
        series: [
            // {
            //     name: "Tiền ship tạm tính",
            //     data: [1, 19, 3, 13, 2, 19],
            // },
        ],

        chart: {
            toolbar: {
                show: false,
            },
            foreColor: "#adb0bb",
            fontFamily: `inherit`,
            type: "line",
            height: 55,
            sparkline: {
                enabled: true,
            },
        },
        colors: ["rgb(255,255,255)"],

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
        },
    }
});
onMounted(() => {
    fetchData();
});
async function fetchData() {
    // loading.value = true;

    const query = {
        code: useAuthStore().user ? useAuthStore().user.username : '',
        fromAt: firstDayOfMonth + `T00:00:00Z`,
        toAt: lastDayOfMonth+ `T23:59:59Z`
    };
    try {
        const { data } = await api.report.profitShippingDetails(query);
        console.log(data);
        const items = data.data === null ? null : data.data;
        const datas = [] as any
        if (items) {
            items.value.map((item: any, index: any) => {
                datas.push((item as any).total_profit);
            });
        }
        const obj = {
            name: "Tiền ship tạm tính",
            data: datas
        }
        // @ts-ignore
        Chart.value.series.push(obj)
    } catch (error) {
        console.log(error);
    }
}
async function router_page () {
    console.log('label', props)
    try {
        if (props.label.id === 4){
            await router.push({ name: 'Tiền ship tạm tính', params: { id: encodeURIComponent(JSON.stringify(props.package)) } })
        }
    } catch (error) {
        console.log(error)
    }
    
}

</script>

<template>
    <v-card elevation="10" class="position-relative bg-primary" @click="router_page">
        <v-card-text  class="pb-sm-7">
            <h2 class="text-h4">Tiền ship tạm tính</h2>
            <div class="mt-4">
                <apexchart type="line" height="55px" :options="Chart" :series="Chart.series"></apexchart>
            </div>
            <h2 class=" text-h4 pt-8  d-flex align-items-end">
                {{ formatCurrency(props.money) }}
                <span class="text-subtitle-1 ml-2 d-flex align-center font-weight-medium "><ArrowUpLeftIcon  size="18"/>Tháng này</span>
            </h2>
        </v-card-text>
    </v-card>
</template>
