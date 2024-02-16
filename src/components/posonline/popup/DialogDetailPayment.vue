<script setup lang="ts">
import { ref, onMounted, watch, inject } from "vue";
import { formatCurrency, formatCurrencyPoint } from '@/utils/string';
// import { parse } from "path";

const Swal = inject('$swal') as any
const emit = defineEmits(['update:modelValue', 'update:cardContent', 'callbackEvent']);
function close() { emit('update:modelValue', false); }

// Define the props
const props = defineProps({
  modelValue: Boolean,
  cardchoice: Number,
  totalPayment: Number
})
// const listCart = ref(Array(20).fill(null));
// console.log('list card', listCart.value)
const btnShow = ref('tienmat')
const loading = ref(false)

watch(() => props.modelValue, 
  (newListCarts) => {
  if (newListCarts){
    // setTimeout(() => {
    //   inputNumber('idpopupPay')
    // }, 100);
  }
},
  {deep: true})
watch(() => props.cardchoice, 
(newListCarts) => {
if (newListCarts){

}
},
{deep: true})
watch(() => btnShow.value, 
(newListCarts) => {
    switch(newListCarts) {
        case "tienmat":
            // code block
            loading.value= true 
            break;
        case 'MoMo':
            // code block
            loading.value= true
            setTimeout(momo, 4000)
            break;
        default:
            // code block
        }
})
function confirm() {  
    emit('callbackEvent');
    close()
}
function momo() {
    loading.value= false          
}
function cancelOrder(){
    loading.value= true
    btnShow.value = 'tienmat'
}
</script>
<style>
 .dashed-line {
      border: none;
      border-top: 1px dashed #888686be; /* Adjust color and thickness as needed */
      margin: 10px 0; /* Add margin for spacing above and below the line */
    }
.right-input input {
    text-align: right !important;
    font-size: 16px;
}
</style>
<template>
  <div class="text-center">
    <v-dialog v-model="modelValue" persistent :retain-focus="false" no-click-animation max-width="600" style="padding: 20px;">
      <v-card class="px-3">
        <v-card-text>
          <div class="container pb-4" style="font-size: 1.4rem; display: flex; align-items: center;justify-content: center;">
             Chi tiết thanh toán
          </div>
          <v-row class="pt-2">
            <!-- content left -->
            <v-col col="12" sm="3">
               <v-row>
                    <v-btn
                    @click="btnShow='tienmat'"
                    class="mb-4 px-6"
                    :style="{ height: '3rem', width: '10rem', 'background-color': '#EFF1EF', border: btnShow==='tienmat' ? '1px solid #0c685b' : 'none'}"
                    >
                    <template v-slot:prepend>
                        <img class="mr-2" src="@/assets/images/logos/money.png" height="30"/>
                        <h3>Tiền mặt</h3>
                    </template>
                    </v-btn>
                </v-row>
                
                <v-row>
                    <v-btn
                    @click="btnShow='MoMo'"
                    class="mb-4 px-6 d-flex justify-start"
                    :style="{ height: '3rem', width: '10rem', 'background-color': '#EFF1EF', border: btnShow==='MoMo' ? '1px solid #0c685b' : ''}"
                    >
                    <template v-slot:prepend>
                        <img class="mr-2" src="@/assets/images/logos/MoMo_Logo.png" height="30"/>
                        <h3>MoMo</h3>
                    </template>
                    </v-btn>
               </v-row>

               <v-row>
                    <v-btn
                    @click="btnShow='VNPAY'"
                    class="mb-4 px-6 d-flex justify-start"
                    :style="{ height: '3rem', width: '10rem', 'background-color': '#EFF1EF', border: btnShow==='VNPAY' ? '1px solid #0c685b' : ''}"
                    >
                    <template v-slot:prepend>
                        <img class="mr-2" src="@/assets/images/logos/VNPAY-QR.png" height="30"/>
                        <h3>VNPAY</h3>
                    </template>
                    
                    </v-btn>
               </v-row>

               <v-row>
                    <v-btn
                    @click="btnShow='The'"
                    class="mb-4 px-6 d-flex justify-start"
                    :style="{ height: '3rem', width: '10rem', 'background-color': '#EFF1EF', border: btnShow==='The' ? '1px solid #0c685b' : ''}"
                    >
                    <template v-slot:prepend>
                        <img class="mr-2" src="@/assets/images/logos/card.png" height="30"/>
                        <h3>Thẻ</h3>
                        </template>
                    </v-btn>
               </v-row>

               <v-row>
                    <!-- @click="btnShow='Foodapps'" -->
                    <v-btn
                    class="mb-4 px-6 d-flex justify-start"
                    :style="{ height: '3rem', width: '10rem', 'background-color': '#EFF1EF', border: btnShow==='Foodapps' ? '1px solid #0c685b' : ''}"
                    >
                    <template v-slot:prepend>
                        <img class="mr-2" src="@/assets/images/logos/food.png" height="30"/>
                    <h3>Foodapps</h3>
                    </template>
                    
                    </v-btn>
               </v-row>
            </v-col>
            <!-- content right -->
            <v-col col="12" sm="9" style="padding-left: 30px;padding-right: 0;">
                <!-- thanh toán tiền mặt -->
                <div v-if="btnShow==='tienmat'" style="width: 100%;">
                    <v-row>
                        <v-col col="12" md="12">
                            <div class="d-flex justify-space-between align-center">
                                <p>Tổng đơn</p>
                                <h4>{{ formatCurrency(props.totalPayment) }}</h4>
                            </div>
                            <hr class="dashed-line">
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col col="12" md="12">
                            <div class="d-flex justify-space-between align-center">
                                <p>Tiển khách đưa</p>
                                <v-text-field
                                inputmode="none"
                                style="text-align:right;"
                                hide-details
                                class="ml-10 right-input"
                                >
                                </v-text-field>
                                <!-- <h4>{{ formatCurrency(100000) }}</h4> -->
                            </div>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col col="12" md="12">
                            <div class="d-flex justify-space-between align-center">
                                <v-btn 
                                    v-for="(card, index) in 3" 
                                    :key="card"
                                    color="#8e9190"
                                    style="background-color: #fedcc6;"
                                    type="button"
                                    class="ml-1 mb-2"
                                    >
                                    <h4>{{ `${formatCurrency((index+1)*100000)}` }}</h4>
                                </v-btn>
                            </div>
                            <hr class="dashed-line">
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col col="12" md="12">
                            <div class="d-flex justify-space-between align-center">
                                <p>Trả lại khách</p>
                                <h4>{{ formatCurrency(100000) }}</h4>
                            </div>
                        </v-col>
                    </v-row>
                </div>
                 <!-- thanh toán momo -->
                 <div v-if="btnShow==='MoMo'" style="width: 100%;">
                    <v-row>
                        <v-col col="12" md="12">
                            <div class="d-flex justify-space-between align-center">
                                <p>Tổng đơn</p>
                                <h4>{{ formatCurrency(props.totalPayment) }}</h4>
                            </div>
                            <hr class="dashed-line">
                        </v-col>
                    </v-row>
                    <v-row v-if="!loading">
                        <v-col col="12" md="12">
                            <div class="py-3 text-center">
                            <v-icon
                                class="mb-6"
                                color="success"
                                icon="mdi-check-circle-outline"
                                size="128"
                            ></v-icon>
                            <div class="text-h4">Thanh toán thành công</div>
                            </div>
                        </v-col>
                    </v-row>
                    <!--  -->
                    <v-row v-if="loading">
                        <v-col col="12" md="12">
                            <div class="py-6 text-center pb-1">
                                <v-progress-circular
                                :size="90"
                                v-if="loading"
                                color="#8E9190"
                                indeterminate
                                ></v-progress-circular>
                                <div class="pt-4">Đang chờ khách thanh toán</div>
                            </div>
                            <div class="text-center pt-0">
                                <v-btn @click="cancelOrder" variant="outlined" class=" mx-auto color-green" type="button">
                                    Hủy PTTT
                                </v-btn>
                            </div>
                        </v-col>
                    </v-row>

                    <!-- <v-row v-if="loading">
                        <v-col col="12" md="12">
                            
                        </v-col>
                    </v-row> -->
                </div>
                <!-- thanh toán mspos -->
                <div v-if="btnShow==='The'" style="width: 100%;">
                    <v-row>
                        <v-col col="12" md="12">
                            <div class="d-flex justify-space-between align-center">
                                <p>Tổng đơn</p>
                                <h4>{{ formatCurrency(props.totalPayment) }}</h4>
                            </div>
                            <hr class="dashed-line">
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col col="12" md="12">
                            <div class="py-3 text-center">
                            <v-icon
                                class="mb-6"
                                icon="mdi-credit-card-multiple"
                                size="128"
                            ></v-icon>

                            <div class="">Thực hiện Thanh toán qua MPOS</div>
                            </div>
                        </v-col>
                    </v-row>
                </div>
                <!-- thanh toán mspos -->
                <div v-if="btnShow==='Foodapps'" style="width: 100%;">
                    <v-row>
                        <v-col col="12" md="12">
                            <div class="d-flex justify-space-between align-center">
                                <p>Tổng đơn</p>
                                <h4>{{ formatCurrency(props.totalPayment) }}</h4>
                            </div>
                            <hr class="dashed-line">
                        </v-col>
                    </v-row>
                </div>

            </v-col>
         </v-row>
        </v-card-text>
        <v-sheet class="d-flex mb-6 mr-2 justify-space-between" style="margin: auto;">
            <v-btn v-if="loading && btnShow==='MoMo'" @click="close()" variant="outlined" class="height mr-16" type="button">
                <h3>Hủy đơn hàng</h3>
            </v-btn>
            <v-btn @click="confirm()" class="height bg-primary px-10 mr-0 ml-5" type="button" style="float: inline-end !important;">
                <h3>Hoàn thành</h3>
            </v-btn>
        </v-sheet>
      </v-card>
    </v-dialog>
  </div>
</template>
