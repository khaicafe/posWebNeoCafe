<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import DialogConfirmPay from "@/components/posonline/popup/DialogConfirmPay.vue";
import { formatCurrency, formatCurrencyPoint } from '@/utils/string';

const emit = defineEmits(['update:modelValue', 'update:isEdit']);
function close() { emit('update:modelValue', false); }

// Define the props
const props = defineProps({
  modelValue: Boolean,
  isEdit: Boolean,
  // listCarts: Array as any,
  cardContent: Object as any,
  // countCart: Object as any
})
const customer = ref({
  "cust_id": "12345",
  "name": "TAOHELIOBD",
  "phones": "+84967222345",
  "balance1": "250000",
  "balance2": "0"
})
const listPrice = [
    '100000',
    '150000',
    '200000',
    '500000'
]
const dialogId = ref(false)
const payMoney = ref(0)
// nap tiền
const valuein = ref('')

function inputNumber(input:any) {
    // $(function () {
    let keyboard = {
        display: {
            bksp: "\u2190",
        },
        layout: "custom",
        customLayout: {
            normal: [
                // "n(a):title_or_tooltip"; n = new key, (a) = actual key, ":label" = title_or_tooltip (use an underscore "_" in place of a space " ")
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
        usePreview: true, // no preveiw
        restrictInput : true, 
        // appendLocally: true,
        //     // Used by jQuery UI position utility
        position: {
        // null = attach to input/textarea;
        // use $(sel) to attach elsewhere
        //@ts-ignore
        of: $(window),
        my: 'center',
        at: 'center',
        // used when "usePreview" is false
        at2: 'center bottom'
        },
         //@ts-ignore
         accepted: function(e, keyboard, el) {
            Pay(el.value)
        },
    };
    //@ts-ignore
    $(`#${input}`).keyboard(keyboard).addTyping({
        showTyping: true,
        delay: 250,
    });
    // valuein.value = inputsa.value
    // console.log('text', valuein.value)
}
function inputText(input:any) {
    let keyboard = {
        autoAccept: true,
        tabNavigation: true,
        usePreview: true, // no preveiw
        restrictInput : true,

        position: {
        // null = attach to input/textarea
        // use $(sel) to attach elsewhere
        //@ts-ignore
        of: $(window),
        my: "center bottom",
        at: "center bottom",
        at2: "center bottom",
        }
    };
    //@ts-ignore
    $(`#${input}`).keyboard(keyboard).addTyping({
        showTyping: true,
        delay: 250,
    });
}
function Pay(val:any) {
    dialogId.value = true
    // pay choice
    if (typeof parseInt(val) == 'number'){
        console.log('paymonent', customer.value.balance1)
        payMoney.value = parseInt(val)
    } 
    else {
        // pay khác
        //@ts-ignore
        console.log('paymonent element', parseInt($(`#${val}`).val()))
        //@ts-ignore
        payMoney.value = parseInt($(`#${val}`).val())
    }
}
function callbackPay(money:any) {
    //@ts-ignore
    customer.value.balance1 = parseInt(money) + parseInt(customer.value.balance1)
    console.log('nap success', customer.value.balance1)
}
</script>
<style scoped>
.showOffPay{
  display: none !important;
}
</style>
<template>
    <v-row :class="props.isEdit ? null : 'showOffPay'" class="justify-center" style="background: transparent;">

        <v-col col="12" md="10">
            <!-- info customer -->
            <div>
                <v-card class="px-12 justify-center" elevation="0" >
                    <div class="container bg-red" style="font-size: 2rem; display: flex; align-items: center;justify-content: center;">
                        <b>Thông tin Tài khoản</b>
                    </div>
                    <div class="container pb-5 color-blue" style="font-size: 2rem; display: flex; align-items: center;justify-content: center;">
                        <b>ID: {{ customer.cust_id }}</b>
                    </div>

                    <v-row class="my-1 py-0">
                        <v-col col="12" md="6" class="ma-0 pa-0">
                            <span class="text-h4"> <b>Tên Đăng nhập:</b> <span>{{ customer.name }}</span></span>
                        </v-col>
                        <v-col col="12" md="6" class="ma-0 pa-0">
                            <span class="text-h4"> <b>Số dư TK1: </b><span class="bg-red">{{ formatCurrencyPoint(customer.balance1) }}</span></span>
                        </v-col>
                                
                    </v-row>
                    
                    <v-row class="py-0 my-4">
                        <v-col col="12" md="6" class="ma-0 pa-0">
                            <span class="text-h4"> <b>Phone:</b> {{ customer.phones }}</span>
                        </v-col> 
                        <v-col col="12" md="6" class="ma-0 pa-0">
                            <span class="text-h4"> <b>Số dư TK2: </b><span class="bg-red">{{ formatCurrencyPoint(customer.balance2) }}</span></span>
                        </v-col>       
                                        
                    </v-row>
                </v-card>
                
            </div>
            <!-- nạp point -->
            <div class="pa-0">
                <v-card class="px-12" elevation="6">
                    <div class="bg-red py-5 pb-6 pt-3" style="font-size: 2rem; display: flex; align-items: center;justify-content: center;"> 
                        <b>Nạp point</b>
                    </div>

                    <v-row>
                        <v-col col="12" md="6">
                            <v-row>
                                <div class="d-flex">
                                    <h4> <b>Hình Thức Thanh Toán: </b></h4>
                                </div>
                            </v-row>
                            <v-row>
                                <div style="width: 50%; margin-bottom: 10px;">
                                    <v-select 
                                        label="Chọn"
                                        :items="['Tiền mặt', 'VNPay', 'MoMo', 'Chuyển khoản qua ngân hàng', 'Quẹt thẻ ngân hàng Mpos',]"
                                        class="input__border"
                                    />
                                </div>
                            </v-row>
                        </v-col>
                        
                        <v-col col="12" md="6">
                            <v-row>
                                <div class="d-flex align-center justify-space-between">
                                    <h4><b>Voucher khách: </b></h4>
                                </div>
                            </v-row>
                            <v-row>
                                <!-- <v-col col="12" md="12" class="ma-0 pa-0"> -->
                                    <div class="d-flex w-100">
                                        <v-btn class="height bg-primary mr-2 flex-1-0" type="button"  style="">
                                            <span class="text-h5">Xác minh</span>
                                        </v-btn>
                                        <div style="width: 50%; margin-bottom: 10px;">
                                            <v-select 
                                            label="Chọn"
                                            :items="['Tiền mặt', 'VNPay', 'MoMo', 'Chuyển khoản qua ngân hàng', 'Quẹt thẻ ngân hàng Mpos',]"
                                            class="input__border"
                                            />
                                        </div>
                                    </div>
                                <!-- </v-col> -->
                                <!-- <v-col col="12" md="6" class="ma-0 pa-0">
                                    <v-btn style="color: #ffffff; background-color: #4CAF50; height: 44px;" > Xác minh</v-btn>
                                </v-col> -->
                            </v-row>
                            
                        </v-col>                   
                    </v-row>

                    <v-row>
                        <v-col col="12" md="6">
                            <v-row>
                                <div class="d-flex">
                                    <h4><b>Voucher Quản lý:</b> </h4>
                                    
                                </div>
                            </v-row>
                            <v-row>
                                <div style="width: 50%; margin-bottom: 10px;">
                                    <!-- @focus="blur()" -->
                                    <v-text-field
                                        v-model="valuein"
                                        placeholder="nhập voucher"
                                        @click="inputText('inputtex2')"
                                        
                                        inputmode="none"
                                        class="input__border"
                                        autocomplete="off" 
                                        id="inputtex2"
                                    />
                                </div>
                            </v-row>
                        </v-col>
                        <!-- <v-col col="12" md="6" class="ma-0 pa-0">
                            <v-btn class="tknap" type="button" style="color: #ffffff; background-color: #4CAF50;" ng-click="confirmCode()">
                        Xác minh</v-btn>
                        </v-col>                     -->
                    </v-row>

                    <v-row class="my-0 py-0 pb-5">
                        <v-col col="12" md="12">
                            <v-row>
                                <div class="d-flex">
                                    <h4><b>Chọn Số Point Nạp</b></h4>
                                </div>
                            </v-row>
                            <v-row>
                                <div>
                                    <v-btn v-for="(card, index) in listPrice" :key="card" @click="Pay(card)" class="mr-2 mb-2 height" type="button" style="color: #ffffff; background-color: #4CAF50;">
                                        {{ formatCurrency(card) }}
                                    </v-btn>
                                    <v-btn @click="Pay('inputtex3')" class="height bg-green mr-2 flex-1-0 mb-2" type="button"  style="">
                                        <span class="text-h5">Point khác</span>
                                    </v-btn>
                                </div>
                                <!-- <div style="width: 30%; margin-bottom: 10px;">
                                        <v-text-field
                                            v-model="valuein"
                                            placeholder="nhập point"
                                            @focus="inputNumber('inputtex3')"
                                            id="inputtex3"
                                            class="input__border"
                                        />
                                    </div> -->
                            </v-row>
                            
                        </v-col>
                        <!-- <v-col col="12" md="5">
                            <v-row>
                                <div class="d-flex">
                                    <h4><b>Chọn Số Point khác:</b></h4>
                                </div>
                            </v-row>
                            <v-row>
                                <div class="d-flex w-100">
                                    <v-btn @click="Pay('inputtex3')" class="height bg-green mr-2 flex-1-0" type="button"  style="">
                                        <span class="text-h5">Point khác</span>
                                    </v-btn>
                                    <div style="width: 50%; margin-bottom: 10px;">
                                        <v-text-field
                                            v-model="valuein"
                                            placeholder="nhập point"
                                            @focus="inputNumber('inputtex3')"
                                            id="inputtex3"
                                            class="input__border"
                                        />
                                    </div>
                                </div>
                            </v-row>
                            
                        </v-col>                     -->
                    </v-row>
                </v-card>
              
            </div>
        </v-col>
        
    </v-row>
    <DialogConfirmPay
        v-model="dialogId"
        :pay="payMoney"
        @callback-event="callbackPay"
    />
</template>