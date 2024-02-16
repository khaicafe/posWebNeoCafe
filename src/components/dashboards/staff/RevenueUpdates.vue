<script setup lang="ts">
import { ref, computed, onMounted, inject } from "vue";
import { getPrimary, getSecondary } from '@/utils/UpdateColors';
import { useAuthStore } from '@/stores/auth';
import { firstDayOfMonth, lastDayOfMonth } from '@/utils/datetime';
const api: any = inject('$api');
let totalProfit = ref(0)
/*Chart */
const seriesRevenue = ref([] as any)
const chartRevenueOption = ref({
        // colors: ['yellow',getSecondary.value],
        // fill: {
        //     type: "solid",
        //     opacity: 1,
        // },
        // chart: {
        //     toolbar: {
        //         show: false,
        //     },
        //     type: "line",
        //     foreColor: "#adb0bb",
        //     fontFamily: `inherit`,
        //     height: 300,
        // },
        // dataLabels: {
        //     enabled: false,
        // },
        // markers: {
        //     size: 4,
        //     border: 1,
        // },
        // legend: {
        //     show: false,
        // },
        // xaxis: {
        //     categories: [
        //         // "16/08",
        //         // "17/08",
        //         // "18/08",
        //         // "19/08",
        //         // "20/08",
        //         // "21/08",
        //         // "22/08",
        //         // "23/08",
        //     ],
        // },
        // grid: {
        //     show: true,
        //     borderColor: "rgba(0, 0, 0, .2)",
        //     color: "#777e89",
        //     strokeDashArray: 2,
        //     xaxis: {
        //         lines: {
        //             show: false,
        //         },
        //     },
        //     yaxis: {
        //         lines: {
        //             show: true,
        //         },
        //     },
        // },
        // stroke: {
        //     curve: "smooth",
        //     width: 3,
        // },
        // tooltip: {
        //     x: {
        //         format: "dd/MM/yy HH:mm",
        //     },
        //     theme: "dark",
        // },
});
const chartRevenueOptionBar = ref({} as any)

onMounted(() => {
    fetchDataExpired();
    fetchDataCustom();
});

async function fetchDataExpired() {
    const query = {
        code: useAuthStore().user ? useAuthStore().user.username : '',
        fromAt: firstDayOfMonth + `T00:00:00Z`,
        toAt: lastDayOfMonth + `T23:59:59Z`
    };
    try {
        const { data } = await api.report.expiredReferralDetails(query);
        console.log(data);
        const items = data.data === null ? null : data.data;
        console.log('tong huy', items)
        const datas = [] as any
        const categories = [] as any
        if (items) {
            items.map((item: any, index: any) => {
                datas.push((item as any).total_profit);
                categories.push((item as any).customer_name);
            });
        }
        const obj = {
            name: "Tổng khách hủy gia hạn",
            data: datas
        }
        // seriesRevenue.value.push(obj)
        // chartRevenueOption.value.xaxis.categories = categories
        // console.log('apex', seriesRevenue.value)
    } catch (error) {
        console.log(error);
    }
}
async function fetchDataCustom() {
    const query = {
        code: useAuthStore().user ? useAuthStore().user.username : '',
        fromAt: firstDayOfMonth + `T00:00:00Z`,
        toAt: lastDayOfMonth+ `T23:59:59Z`
    };
    try {
        const { data } = await api.report.referralDetails(query);
        const items = data.data === null ? null : data.data;
        const datas = [] as any
        const categories = [] as any
        if (items) {
            items.map((item: any, index: any) => {
                datas.push((item as any).register_packages);
                categories.push((item as any).customer_name);
            });
        }
        // const obj = {
        //     name: "Số lượng gói đã mua",
        //     data: datas
        // }
         // chartRevenueOptionBar.value = {
        //     chart: {
        //         // height: 800,
        //         type: 'line',
        //         toolbar: {
        //             show: false,
        //         }
        //     },
        //     plotOptions: {
        //         bar: {
        //             distributed: true,
        //             horizontal: false,
        //             columnWidth: '20%'
        //         }
        //     },
        //     toolbar: {
        //         show: false,
        //     },
        //     legend: {
        //         show: false,
        //     },
        //     xaxis: {
        //         labels: {
        //             show: true,
        //             style: {
        //             colors: 'white',
        //             fontSize: '12px'
        //             },
        //         },
        //         categories: categories
        //     },
        //     yaxis: {
        //         labels: {
        //             show: true,
        //             style: {
        //             colors: 'white',
        //             fontSize: '12px'
        //             },
        //         },
        //     },
        //     tooltip: {
        //         theme: 'dark',
        //         y: {
        //         formatter(val:any) {
        //             return ` ${val} gói`;
        //         },
        //         },
        //     },
        //     grid: {
        //     show: false,
        //     },
        //     annotations: {
        //     yaxis: [
        //         {
        //         y: 0,
        //         strokeDashArray: 0,
        //         borderColor: '#fff',
        //         borderWidth: 1,
        //         opacity: 1
        //         }
        //     ],
        //     xaxis: [
        //         {
        //         x: 0,
        //         strokeDashArray: 0,
        //         borderColor: '#fff',
        //         borderWidth: 1,
        //         opacity: 1
        //         }
        //     ]
        //     }
        // }
        // test chart
        
        const obj =   {
                name: "Đăng ký mới",
                data: [],
            }
        seriesRevenue.value.push(obj)
        seriesRevenue.value.push( {
                name: "Hủy gói",
                data: [],
            })
        chartRevenueOptionBar.value = {
            colors: ['yellow',getSecondary.value],
            fill: {
                type: "solid",
                opacity: 1,
            },
            chart: {
                toolbar: {
                    show: false,
                },
                type: "line",
                foreColor: "#adb0bb",
                fontFamily: `inherit`,
                height: 300,
            },
            dataLabels: {
                enabled: false,
            },
            markers: {
                size: 4,
                border: 1,
            },
            legend: {
                show: false,
            },
            xaxis: {
                categories: [
                    "16/08",
                    "17/08",
                    "18/08",
                    "19/08",
                    "20/08",
                    "21/08",
                    "22/08",
                    "23/08",
                ],
            },
            grid: {
                show: true,
                borderColor: "rgba(0, 0, 0, .2)",
                color: "#777e89",
                strokeDashArray: 2,
                xaxis: {
                    lines: {
                        show: false,
                    },
                },
                yaxis: {
                    lines: {
                        show: false,
                    },
                },
            },
            stroke: {
                curve: "smooth",
                width: 3,
            },
            tooltip: {
                x: {
                    format: "dd/MM/yy HH:mm",
                },
                theme: "dark",
            },
        }
        // chartRevenueOptionBar.value.xaxis.categories = categories
        // console.log('apex', chartRevenueOptionBar.value)
    } catch (error) {
        console.log(error);
    }
}
</script>

<template>
    <v-card elevation="10" class="bg-primary">
        <v-card-text>
            <div class="d-sm-flex align-start">
                <div>
                    <h2 class="text-h4">Thống kê gói</h2>
                </div>
                <v-spacer></v-spacer>
            </div>
            <div>
                <apexchart type="line" height="330px" :options="chartRevenueOptionBar" :series="seriesRevenue">
                </apexchart>
            </div>
            <div class="d-flex justify-center">
                <div class="d-flex align-center px-2">
                    <span class="text-overline">
                        <i class="mdi mdi-brightness-1 mx-1"></i>
                    </span>
                    <span class="font-weight-regular">Đăng ký mới</span>
                </div>
                <div class="d-flex align-center px-2 text-secondary">
                    <span class="text-overline">
                        <i class="mdi mdi-brightness-1 mx-1"></i>
                    </span>
                    <span class="font-weight-regular">Hủy gói</span>
                </div>
            </div>
        </v-card-text>
    </v-card>
</template>