<script setup lang="ts">
import { ref, onMounted, inject, watch, defineProps, toRaw } from 'vue';
import neocafeLogo from '@/assets/images/logos/favicon.svg';
import { formatCurrency } from '@/utils/string';
import popupDetail from "@/components/posonline/popup/DialogDetailsOrder.vue";


const Swal = inject('$swal') as any
const emit = defineEmits(['someEvent'])

// dialog
const orderCards = ref([] as any)
const showOff = ref(false)
const DetailBill = ref({} as any)
const swt1 = ref(true);
const nameRules = [
(    value: any) => {
      if (value) return true
      return 'Number is required.'
    },
(    value: string | any[]) => {
      if (value?.length == 10) return true
      return 'Number must be less than 10 characters.'
    },
  ]

const topping = ref([] as any)
const choice = ref({} as any)
const header = [
    { title: 'STT', align: 'start', key: 'stt' },
    { title: 'Tên', align: 'start', key: 'prodname' },
    { title: 'Giá', align: 'end', key: 'paid_price' },
    { title: 'Số lượng', align: 'end', key: 'quantity' },
    { title: 'Ghi Chú', align: 'end', key: 'note_detail' },
    { title: 'Trạng thái', align: 'end', key: 'is_complete' },
    { title: 'Trả lại', align: 'end', key: 'is_cancel' },
]
const virtualBoats = [
          {
            name: 'Speedster',
            speed: 35,
            length: 22,
            price: 300000,
            year: 2021,
          },
        //   {
        //     name: 'OceanMaster',
        //     speed: 25,
        //     length: 35,
        //     price: 500000,
        //     year: 2020,
        //   },
        //   {
        //     name: 'Voyager',
        //     speed: 20,
        //     length: 45,
        //     price: 700000,
        //     year: 2019,
        //   },
        //   {
        //     name: 'WaveRunner',
        //     speed: 40,
        //     length: 19,
        //     price: 250000,
        //     year: 2022,
        //   },
        //   {
        //     name: 'SeaBreeze',
        //     speed: 28,
        //     length: 31,
        //     price: 450000,
        //     year: 2018,
        //   },
        //   {
        //     name: 'HarborGuard',
        //     speed: 18,
        //     length: 50,
        //     price: 800000,
        //     year: 2017,
        //   },
        //   {
        //     name: 'SlickFin',
        //     speed: 33,
        //     length: 24,
        //     price: 350000,
        //     year: 2021,
        //   },
        //   {
        //     name: 'StormBreaker',
        //     speed: 22,
        //     length: 38,
        //     price: 600000,
        //     year: 2020,
        //   },
        //   {
        //     name: 'WindSail',
        //     speed: 15,
        //     length: 55,
        //     price: 900000,
        //     year: 2019,
        //   },
        //   {
        //     name: 'FastTide',
        //     speed: 37,
        //     length: 20,
        //     price: 280000,
        //     year: 2022,
        //   },
        ]

// Define the props
const props = defineProps({
  listProducts: Object,
  listCarts: Array,
  countCart: Object,
  complete: Boolean
})
// event vue
onMounted(() => {
    orderCards.value = { ...props.listCarts };
});

// Watch for changes in myStringProp
watch(() => props.listCarts, (newValue, oldValue) => {
    orderCards.value = { ...newValue };
    console.log('list card', orderCards.value)
})

// Watch for changes in myStringProp
watch(() => props.listProducts, (newValue, oldValue) => {
    // const temp = { ...newValue };
    // productsCard.value = temp.products
    // // phân loại array extras theo từng array khác nhau trong newValue
    // const categorizedExtras = productsCard.value.reduce((acc: any, extras: any) => {
    //     //add extra.quanlity
    //     extras.quanlity = 1
    //     // add totalPrice
    //     extras.totalPrice = extras.prodprice
    //     if (typeof extras.extras !== 'undefined' && extras.extras.length > 0){
    //         let temp = extras.extras.reduce((acc: any, extra: any) => {
    //             // console.log('extraddd', extra)
    //             return groupExtrasByType(extra);
    //         }, {});
    //         extras.listextras = temp;
    //         // console.log('list extras', temp)
    //     }
    // }, {});
    
})
// check change choice
watch(() => choice.value, (newValue, oldValue) => {
    // console.log('choice click', newValue)
    // // add Note
    // cardContent.value.note = choice.value.note

    // //'Size M / Nóng / Bánh ăn kèm 1 / trân châu'
    // const allNames = [choice.value?.option, ,choice.value?.size, choice.value?.extras, ...topping.value]
    // .flatMap((item:any) => item ? item.name_vn : []);
    // const resultString = `${allNames.join(' / ')}`;
    // cardContent.value.showOptions = resultString
    
    // // tính tổng của option choice
    // const TotalPrice = [choice.value?.option, ,choice.value?.size, choice.value?.extras, ...topping.value]
    // .flatMap((item:any) => item ? item.price : [])
    // let sum = 0;
    // TotalPrice.forEach((number: number) => sum += number? number:0 );
    // cardContent.value.totalPrice = cardContent.value.prodprice + sum

},{deep: true})


// function popup add item to carts
function handleClick(card: any) {
    console.log('handclick', card)
    DetailBill.value = {...card}
    showOff.value = true
}
function orderAdd(item:any) {
   console.log('orderId', item)
}

function cancelDetail(index:any, listId:any) {
    Swal({
        title: "Nhập lý do huỷ đơn",
        // content: "input",
        input: "text",
        focusConfirm:true,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#fc0d1c",
        confirmButtonText: "Đồng ý",
    }).then((result:any) => {
        if (result) {

        }
    })
    //@ts-ignore
    document.querySelector('.swal2-input').addEventListener('focus', function (e) { 
        console.log('click!')
        //@ts-ignore
        $(`.swal2-input`).keyboard({
            acceptValid: true,
            cancelClose: true,
            tabNavigation: true,
            usePreview: true, // no preveiw
            restrictInput : true, 
            appendLocally: true,
            position: {
                //@ts-ignore
                of: $(window),
                my: "center bottom",
                at: "center bottom",
                at2: "center bottom",
            }
        }).addTyping({
            showTyping: true,
            delay: 250,
        });
    })

    // const inputValue = 345.67
    // const inputStep = 0.01

    //     Swal.fire({
    //     title: 'input[number] + input[range]',
    //     html: `
    //         <input
    //         type="number"
    //         value="${inputValue}"
    //         step="${inputStep}"
    //         class="swal2-input"
    //         id="range-value">`,
    //     input: 'range',
    //     inputValue,
    //     inputAttributes: {
    //         min: '0',
    //         max: '1000',
    //         step: inputStep.toString(),
    //     },
    //     didOpen: () => {
    //         const inputRange = Swal.getInput()!
    //         const inputNumber = Swal.getPopup()!.querySelector('#range-value') as HTMLInputElement

    //         // remove default output
    //         Swal.getPopup()!.querySelector('output')!.style.display = 'none'
    //         inputRange.style.width = '100%'

    //         // sync input[type=number] with input[type=range]
    //         inputRange.addEventListener('input', () => {
    //         inputNumber.value = inputRange.value
    //         })

    //         // sync input[type=range] with input[type=number]
    //         inputNumber.addEventListener('change', () => {
    //         inputRange.value = inputNumber.value
    //         })
    //     },
    //     })
}
// chưa hoàn thành

// 
</script>
<style scoped>
@media (min-width: 600px){
    .v-col-sm-3 {
    flex: 0 0 20%;
    max-width: 20%;
}
}

.v-col-xxl, .v-col-xxl-auto, .v-col-xxl-12, .v-col-xxl-11, .v-col-xxl-10, .v-col-xxl-9, .v-col-xxl-8, .v-col-xxl-7, .v-col-xxl-6, .v-col-xxl-5, .v-col-xxl-4, .v-col-xxl-3, .v-col-xxl-2, .v-col-xxl-1, .v-col-xl, .v-col-xl-auto, .v-col-xl-12, .v-col-xl-11, .v-col-xl-10, .v-col-xl-9, .v-col-xl-8, .v-col-xl-7, .v-col-xl-6, .v-col-xl-5, .v-col-xl-4, .v-col-xl-3, .v-col-xl-2, .v-col-xl-1, .v-col-lg, .v-col-lg-auto, .v-col-lg-12, .v-col-lg-11, .v-col-lg-10, .v-col-lg-9, .v-col-lg-8, .v-col-lg-7, .v-col-lg-6, .v-col-lg-5, .v-col-lg-4, .v-col-lg-3, .v-col-lg-2, .v-col-lg-1, .v-col-md, .v-col-md-auto, .v-col-md-12, .v-col-md-11, .v-col-md-10, .v-col-md-9, .v-col-md-8, .v-col-md-7, .v-col-md-6, .v-col-md-5, .v-col-md-4, .v-col-md-3, .v-col-md-2, .v-col-md-1, .v-col-sm, .v-col-sm-auto, .v-col-sm-12, .v-col-sm-11, .v-col-sm-10, .v-col-sm-9, .v-col-sm-8, .v-col-sm-7, .v-col-sm-6, .v-col-sm-5, .v-col-sm-4, .v-col-sm-3, .v-col-sm-2, .v-col-sm-1, .v-col, .v-col-auto, .v-col-12, .v-col-11, .v-col-10, .v-col-9, .v-col-8, .v-col-7, .v-col-6, .v-col-5, .v-col-4, .v-col-3, .v-col-2, .v-col-1 {
    width: 100%;
    padding: 5px;
}
.v-card-item {
    padding: 5px 5px 3px;
    height: 70px;
}

.lineSpace {
    border: 1px solid #eff1ef;
}
.v-text-field input {
    text-align: center !important;
    height: 15px;
}
#no-background-hover {
    pointer-events: none
}
.text-cards {
    font-weight: bold; 
    text-align: center; 
    font-size: 14px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

</style>
<template>
    <div class="text-center">
        <v-dialog v-model="showOff" persistent :retain-focus="false" no-click-animation  scrollable max-width="800">
            <v-card>
                <v-card-text>

                <v-card-title>
                    <div class="text-h1 text-cards pa-0 pb-3 bg-red ">
                        <span>  Chi tiết đơn hàng </span>
                    </div>
                </v-card-title>
                
                <v-row>
                    <v-col col="12" md="6">
                        <span> Mã hoá đơn: {{ DetailBill.order.order_num }}</span>
                    </v-col>

                    <v-col col="12" md="6">
                        <span> Ngày Tạo: {{DetailBill.order.ordertime}} </span>
                    </v-col>                    
                </v-row>
                <v-row>
                    <v-col>
                        <span>  Nhân viên: {{DetailBill.order.userCheck}}</span>
                    </v-col>

                    <v-col>
                        <span> Bàn: {{DetailBill.order.shoptablename}}</span>
                    </v-col>                    
                </v-row>
                <v-row>
                    <v-col>
                        <span>  Mã khách: {{DetailBill.order.cust_id}}</span>
                    </v-col>

                    <v-col>
                        <span>  Hình thức thanh toán: {{DetailBill.order.typePay}} </span>
                    </v-col>                    
                </v-row>
                <v-row>
                    <v-col>
                        <span>  Nguồn đặt hàng: {{DetailBill.order.chanel_type_name }} </span>
                    </v-col>
                    <v-col>
                        <span>Người giao hàng: {{DetailBill.order.shiper_name }}</span>
                    </v-col>               
                </v-row>
                <v-row>
                    <v-col> 
                        <span>  Ghi chú: {{DetailBill.order.orderNote}} {{DetailBill.order.note_manager}} {{DetailBill.order.price_discount > 0 ? 'Giảm'+' '+DetailBill.order.price_discount+'đ' : ''}}</span>
                    </v-col>
                    <v-col>
                        <v-chip class="text-h6" style="color: #197468;"> {{DetailBill.order.statusOrder}} </v-chip>
                    </v-col>   
                </v-row>
              
                <v-data-table
                    :headers="header"
                    :items="DetailBill.orderDetail"
                    max-height="300"
                    item-value="name"
                    fixed-header
                    class="pt-4"
                >
                <template #item.stt="{ index }">
                    {{ index + 1 }}
                </template>
                <template #bottom></template>
                <template #item.paid_price="{ item }">
                    <v-chip size="large"> {{ formatCurrency(item.selectable.paid_price) }} </v-chip>
                </template>
                <template #item.is_complete="{ item }">
                    {{item.selectable.is_complete == 0 ? 'Chưa sản xuất' : 'Đã sản xuất'}},
                      {{item.selectable.is_served == 0 ? 'Chưa phục vụ' : 'Đã phục vụ'}},
                </template>
                <template #item.is_cancel="{ item }">
                    <v-btn class=" bg-reds" variant="outlined"
                        v-if="item.selectable.is_cancel == 0 && item.selectable.is_complete == 0 && DetailBill.order.cust_id <= 0"
                        @click="cancelDetail(item ,item.selectable.id)">
                        Huỷ
                      </v-btn>
                      <span v-if="item.selectable.is_cancel == 1" style="color:red;">
                        Đã huỷ</span>
                </template>
                </v-data-table>
                
               <!-- Button -->
                <v-card-actions class="justify-center">
                    <!-- <v-btn variant="outlined"  size="x-large" @click="orderNew(DetailBill)" class="--size-large px-12 bg-primary text-h6 text-cards">Đổi bàn</v-btn> -->
                    <v-btn variant="outlined"  size="x-large" @click="showOff=false" class="--size-large px-12 bg-reds text-h6 text-cards">Close</v-btn>
                </v-card-actions>
            </v-card-text>

            </v-card>
        </v-dialog>
    </div>
    
    <!-- list item carts -->
    <v-card style="background: transparent; " elevation="0" class="pl-0 ml-0">
        <v-card-text class="px-1 ml-0 pt-0">
            <v-row style="margin: 0;" scrollable>
                <v-col style="padding: 5px;" cols="12" lg="0" sm="3" v-for="(card, index) in orderCards" :key="card">
                    <v-card elevation="6" rounded="md" class="" style="height: 210px;">
                        <div class="text-h6 text-cards pa-3 bg-red">
                            <span> Bàn {{card.order.shoptablename}}</span>
                        </div>
                        <div @click="handleClick(card)" style="border-bottom: 1px solid red; border-top: 1px solid red; width: 100%;" class="pa-3">
                                <h6 v-text="card.order.ordertime" class="text-cards"></h6>
                                <span class="text-h6 text-cards pt-1" style="color: #197468;" v-text="formatCurrency(card.order.price_paid)"></span>
                                <span class="text-cards pb-0 pt-3" style="color: #197468;" v-text="card.order.statusOrder"></span>
                        </div>
                        <div class="d-flex justify-center py-3 px-1"
                        v-if="card.order.is_paid == 0 && props.complete"
                        >
                            <v-btn variant="outlined" size="40" class="flex-1-0 bg-primary" @click="orderAdd(card)"> Đặt thêm </v-btn>
                            <v-btn variant="outlined" size="40" class="flex-1-0 bg-warning" > Thanh toán/In </v-btn>
                        </div>
                        <div class="d-flex justify-center py-3 px-1"
                        v-if="card.order.is_paid == 1"
                        >
                            <v-btn variant="outlined" size="40" class="flex-1-0 bg-warning" @click="popupDetail"> IN </v-btn>
                        </div>
                        <div class="d-flex justify-center py-3 px-1"
                        v-if="!props.complete"
                        >
                            <v-btn variant="outlined" size="40" class="flex-1-0 bg-search" @click="popupDetail"> Hoàn thành </v-btn>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>
