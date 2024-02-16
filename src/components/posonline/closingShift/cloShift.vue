<script setup lang="ts">
import { ref, onMounted, watch, inject } from "vue";
import DialogConfirmPay from "@/components/posonline/popup/DialogConfirmPay.vue";
import { formatCurrency, formatCurrencyPoint } from '@/utils/string';
// Use sweetalert2
const Swal = inject('$swal') as any
const emit = defineEmits(['update:modelValue', 'update:isEdit', 'callbackEvent']);
function close() { emit('update:modelValue', false); }

// Define the props
const props = defineProps({
  modelValue: Boolean,
  isEdit: Boolean
})
const customer = ref({
  "cust_id": 12345,
  "name": "TAOHELIOBD",
  "phones": "+84967222345",
  "balance1": 250000,
  "balance2": 0
})
const closingShift = ref({
    "shop_id": 53,
    "shop_name": "Trà Chanh Bụi Phố Phùng Khoang",
    "user_id": 1408,
    "username": "thungan-pk",
    "open_time": "21/12/2023 09:51:22",
    "close_time": "07/01/2024 12:43:03",
    "begin_balance": 0,
    "net_revenue": 0,
    "revenue_total": 113200,
    "real_revenue": 0,
    "cash_in_tk1_cash": 550000,
    "cash_in_tk1_vn_pay": 0,
    "cash_in_tk1_banking": 0,
    "cash_in_tk1_momo": 0,
    "cash_in_tk1_mpos": 0,
    "revenue_offline": 113200,
    "revenue_online": 0,
    "revenue_cash": 663200,
    "close_balance": 663200,
    "revenue_offline_cash": 113200,
    "revenue_offline_vn_pay": 0,
    "revenue_offline_banking": 0,
    "revenue_offline_momo": 0,
    "revenue_offline_mpos": 0,
    "revenue_origin_branch": 113200,
    "revenue_origin_grab_food": 0,
    "revenue_origin_shope_food": 0,
    "revenue_origin_go_food": 0,
    "revenue_origin_be_food": 0
})
const listCustomer = ref([
    {
      "cust_id": 94650,
      "in_amt_tk1": 100000
    },
    {
      "cust_id": 12345,
      "in_amt_tk1": 100000
    },
    {
      "cust_id": 12345,
      "in_amt_tk1": 150000
    },
    {
      "cust_id": 12345,
      "in_amt_tk1": 200000
    }
  ])

const dialogId = ref(false)
const payMoney = ref(0)

function beginRevenue() {
    Swal({
        title: "Cập nhật số dư đầu ca",
        // content: "input",
        input: "text",
        focusConfirm:true,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#fc0d1c",
        confirmButtonText: "Đồng ý",
    }).then((result:any) => {
        if (result) {
            console.log('swal', result.value)
            closingShift.value.begin_balance = result.value
        }
    })
    //@ts-ignore
    document.querySelector('.swal2-input').addEventListener('focus', function (e) { 
        console.log('click!')
        //@ts-ignore
        $(`.swal2-input`).keyboard({
            display: {
                bksp: "\u2190",
            },
            layout: "custom",
            customLayout: {
                normal: [
                    "0 1 2 3 4",
                    "5 6 7 8 9",
                    ", .",
                    "{bksp} {accept} {cancel}",
                ],
            },
            // autoAccept: true,
            acceptValid: true,
            cancelClose: true,
            tabNavigation: true,
            usePreview: false, // no preveiw
            restrictInput : true, 
            appendLocally: true,
        }).addTyping({
            showTyping: true,
            delay: 250,
        });
    })
}
function realRevenue() {
    Swal({
        title: "Cập nhật tổng tiền thực thu",
        // content: "input",
        input: "text",
        focusConfirm:true,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#fc0d1c",
        confirmButtonText: "Đồng ý",
    }).then((result:any) => {
        if (result) {
            console.log('swal', result.value)
            closingShift.value.real_revenue = result.value
        }
    })
    //@ts-ignore
    document.querySelector('.swal2-input').addEventListener('focus', function (e) { 
        console.log('click!')
        //@ts-ignore
        $(`.swal2-input`).keyboard({
            display: {
                bksp: "\u2190",
            },
            layout: "custom",
            customLayout: {
                normal: [
                    "0 1 2 3 4",
                    "5 6 7 8 9",
                    ", .",
                    "{bksp} {accept} {cancel}",
                ],
            },
            // autoAccept: true,
            acceptValid: true,
            cancelClose: true,
            tabNavigation: true,
            usePreview: false, // no preveiw
            restrictInput : true, 
            appendLocally: true,
        }).addTyping({
            showTyping: true,
            delay: 250,
        });
    })
}
function closingShifts() {
    Swal({
      // toast: true,
      html: `Chốt ca thành công`,
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });
    emit('callbackEvent')
}

function chiaArray(array:any) {
    // console.log(' get cus paid: ', response.data.data)
    const result = array || [];
    let convertdata = [] as any;
    result.map((a:any) => {
        if (convertdata.length === 0) {
            convertdata.push({
                cus1: a.cust_id,
                tk1: a.in_amt_tk1,
                cus2: null,
                tk2: null,
                cus3: null,
                tk3: null,
            });
        } else {
            if (convertdata[convertdata.length - 1].cus2 === null) {
                convertdata[convertdata.length - 1].cus2 = a.cust_id;
                convertdata[convertdata.length - 1].tk2 = a.in_amt_tk1;
            } else if (convertdata[convertdata.length - 1].cus3 === null) {
                convertdata[convertdata.length - 1].cus3 = a.cust_id;
                convertdata[convertdata.length - 1].tk3 = a.in_amt_tk1;
            } else {
                convertdata.push({
                    cus1: a.cust_id,
                    tk1: a.in_amt_tk1,
                    cus2: null,
                    tk2: null,
                    cus3: null,
                    tk3: null,
                });
            }
        }
    });
    // console.log('convertdata: ', convertdata)
    return convertdata;
}
const header = [
    { title: 'Id Khách', align: 'start', key: 'cus1', class: 'bg-reds' },
    { title: 'Số tiền nạp', align: 'start', key: 'tk1' },
    { title: 'Id Khách', align: 'end', key: 'cus2' },
    { title: 'Số tiền nạp', align: 'end', key: 'tk2' },
    { title: 'Id Khách', align: 'end', key: 'cus3' },
    { title: 'Số tiền nạp', align: 'end', key: 'tk3' },
]
listCustomer.value = chiaArray(listCustomer.value)
console.log('chia array', listCustomer.value)
</script>

<template>
    <div style="background: transparent; font-family: 'Times New Roman', Times, serif; height: calc(100vh - 100px); overflow-y: scroll">
        <v-card class="px-3 justify-center" elevation="0" >
            <div class="container bg-red" style="font-size: 2rem; display: flex; align-items: center;justify-content: center;">
                <b>Chốt ca</b>
            </div>
            <div class="container pb-3 color-blue" style="font-size: 1.3rem; display: flex; align-items: center;justify-content: center;">
                <b>{{ closingShift.username }}</b>
            </div>
            <v-table class="">
                <thead>
                    <tr>
                        <th class="text-h4 font-weight-semibold">Thông tinh chung</th>
                        <th class="text-h4 font-weight-semibold">Tiền mặt</th>
                        <th class="text-h4 font-weight-semibold">Không phải tiền mặt</th>
                        <th class="text-h4 font-weight-semibold">Food App</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="text-h5">
                        <td style="vertical-align: top;" class="px-0">
                            <p><b>Thời gian bắt đầu: </b>{{ closingShift.open_time }}</p>
                            <p><b>Tiền tồn đầu ca: </b>{{ formatCurrency(closingShift.begin_balance) }}</p>
                            <p><b> Doanh thu bán hàng: </b>{{ formatCurrency(closingShift.revenue_total) }}</p>
                            <p><b>Doanh thu tiền: </b>{{ formatCurrency(closingShift.revenue_cash) }}</p>
                            <p><b>Tổng tiền trong két: </b>{{ formatCurrency(closingShift.revenue_cash + closingShift.revenue_total) }}</p>
                            <p><b>Tổng tiền thực thu: </b>{{ formatCurrency(closingShift.real_revenue) }}</p>
                        </td>
                        <td style="vertical-align: top;" class="px-1">
                            <p><b>Tiền mặt: </b>{{ formatCurrency(closingShift.revenue_cash) }}</p>
                            <p><b>+ Đơn offline (tiền mặt): </b>{{ formatCurrency(closingShift.revenue_offline) }}</p>
                            <p><b>+ Nạp App TK1 (tiền mặt): </b>{{ formatCurrency(closingShift.cash_in_tk1_cash) }}</p>
                        </td>
                        <td style="vertical-align: top;" class="px-0">
                            <p><b>Chuyển khoản về cty: </b>{{ formatCurrency(0) }}</p>
                            <p><b>+ Đơn offline (chuyển khoản): </b>{{ formatCurrency(0) }}</p>
                            <p><b>+ Đặt hàng tại quán (chuyển khoản): </b>{{ formatCurrency(0) }}</p>
                            <p><b>+ Food Apps (chuyển khoản): </b>{{ formatCurrency(0) }}</p>
                            <p><b>+ Nạp App TK1 (chuyển khoản): </b>{{ formatCurrency(0) }}</p>
                            <p><b>Thanh toán VNPAY: </b>{{ formatCurrency(closingShift.cash_in_tk1_vn_pay + closingShift.revenue_offline_vn_pay)}}</p>
                            <p><b>+ Đơn offline (VNPAY): </b>{{ formatCurrency(closingShift.revenue_offline_vn_pay) }}</p>
                            <p><b>+ Nạp TK1 (VNPAY): </b>{{ formatCurrency(closingShift.cash_in_tk1_vn_pay) }}</p>
                            <p><b>Thanh toán MOMO: </b>{{ formatCurrency(closingShift.revenue_offline_momo + closingShift.cash_in_tk1_momo)}}</p>
                            <p><b>+ Đơn offline (MOMO): </b>{{ formatCurrency(closingShift.revenue_offline_momo) }}</p>
                            <p><b>+ Nạp TK1 (MOMO): </b>{{ formatCurrency(closingShift.cash_in_tk1_momo) }}</p>
                            <p><b>Thanh toán MPOS: </b>{{ formatCurrency(closingShift.revenue_offline_mpos + closingShift.cash_in_tk1_mpos) }}</p>
                            <p><b>+ Đơn offline (MPOS): </b>{{ formatCurrency(closingShift.revenue_offline_mpos) }}</p>
                            <p><b>+ Nạp TK1 (MPOS): </b>{{ formatCurrency(closingShift.cash_in_tk1_mpos) }}</p>
                        </td>
                        <td style="vertical-align: top;"  class="px-0">
                            <p><b>Shopee Food: </b>{{ formatCurrency(closingShift.revenue_origin_shope_food) }}</p>
                            <p><b>Grap Food: </b>{{ formatCurrency(closingShift.revenue_origin_grab_food) }}</p>
                            <p><b>Be Food: </b>{{ formatCurrency(closingShift.revenue_origin_be_food) }}</p>
                            <p><b>Go Food: </b>{{ formatCurrency(closingShift.revenue_origin_go_food) }}</p>
                        </td>
                    </tr>
                    
                </tbody>
            </v-table>
             <!-- Button -->
             <v-card-actions class="justify-center">
                <v-btn variant="outlined"  size="x-large" @click="beginRevenue()" class="--size-large px-12 bg-primary text-h6 text-cards">Cập nhật số dư đầu</v-btn>
                <v-btn variant="outlined"  size="x-large" @click="realRevenue()" class="--size-large px-12 bg-primary text-h6 text-cards">Cập nhật số tiền thực thu</v-btn>
                <v-btn variant="outlined"  size="x-large" @click="closingShifts()" class="--size-large px-12 bg-primary text-h6 text-cards">Chốt ca</v-btn>
            </v-card-actions>

            <div>
                <v-data-table
                    :headers="header"
                    :items="listCustomer"
                    max-height="300"
                    item-value="name"
                    fixed-header
                    class="pt-4"
                >
                <!-- <template #item.stt="{ index }">
                    {{ index + 1 }}
                </template> -->
                <template v-slot:item.cus1="{ item }">
                    <v-chip v-if="item.selectable.cus1" size="large" class="color-green"> {{ item.selectable.cus1 }} </v-chip>
                </template>
                <template v-slot:item.cus2="{ item }">
                    <v-chip v-if="item.selectable.cus2" size="large" class="color-green"> {{ item.selectable.cus2 }} </v-chip>
                </template>
                <template v-slot:item.cus3="{ item }">
                    <v-chip v-if="item.selectable.cus3" size="large" class="color-green"> {{ item.selectable.cus3 }} </v-chip>
                </template>
                <template #bottom></template>
                <template #item.tk1="{ item }">
                    <v-chip v-if="item.selectable.tk1" size="large" class="color-red"> {{ formatCurrency(item.selectable.tk1) }} </v-chip>
                </template>
                <template #item.tk2="{ item }">
                    <v-chip v-if="item.selectable.tk2" size="large" class="color-red"> {{ formatCurrency(item.selectable.tk2) }} </v-chip>
                </template>
                <template v-slot:item.tk3="{ item }">
                    <v-chip v-if="item.selectable.tk3" size="large" class="color-red"> {{ formatCurrency(item.selectable.tk3) }} </v-chip>
                </template>
               
                </v-data-table>
            </div>
        </v-card>
    </div>
    <!-- <DialogConfirmPay
        v-model="dialogId"
        :pay="payMoney"
        @callback-event="callbackPay"
    /> -->
</template>