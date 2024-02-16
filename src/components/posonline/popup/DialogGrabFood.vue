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
  cardchoice: Number
})
// const listCart = ref(Array(40).fill(null));
// console.log('list card', listCart.value)

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

function confirm(index:any) {  
    emit('callbackEvent', {card: index,});
    close()
}


</script>
<template>
  <div class="text-center">
    <v-dialog v-model="modelValue" persistent :retain-focus="false" no-click-animation max-width="600">
      <v-card>
        <v-card-text>
          <div class="container pb-4" style="font-size: 1.4rem; display: flex; align-items: center;justify-content: center;">
             Thông tin đơn GrabFood
          </div>
          <div class="justify-center">
            <v-row class="d-flex justify-center align-center">
                <v-col col="12" md="9">
                    <div class="d-flex justify-space-between align-center">
                        <p>Nguyên giá</p>
                        <h4>{{ formatCurrency(100000) }}</h4>
                    </div>
                </v-col>
            </v-row>

            <v-row class="d-flex justify-center align-center">
                <v-col col="12" md="9">
                    <div class="d-flex justify-space-between align-center">
                        <p>Tổng đơn</p>
                        <v-text-field
                        inputmode="none"
                        style="text-align:right; max-width: 230px;"
                        hide-details
                        class="ml-10 right-input"
                        >
                        </v-text-field>
                        <!-- <h4>{{ formatCurrency(100000) }}</h4> -->
                    </div>
                </v-col>
            </v-row>

            <v-row class="d-flex justify-center align-center">
                <v-col col="12" md="9">
                    <div class="d-flex justify-space-between align-center">
                        <p>Tổng giảm giá</p>
                        <h4>{{ formatCurrency(100000) }}</h4>
                    </div>
                </v-col>
            </v-row>
            <v-row class="d-flex justify-center align-center">
                <v-col col="12" md="9">
                    <div class="d-flex justify-space-between align-center">
                        <p>Thực thu (25% CK)</p>
                        <h4>{{ formatCurrency(100000) }}</h4>
                    </div>
                </v-col>
            </v-row>
            <v-row class="d-flex justify-center align-center">
                <v-col col="12" md="9">
                    <div class="d-flex justify-space-between align-center">
                        <p>Mã đơn Grabfood *</p>
                        <v-text-field
                        inputmode="none"
                        style="text-align:right; max-width: 230px;"
                        hide-details
                        class="ml-6 right-input"
                        >
                        </v-text-field>
                        <!-- <h4>{{ formatCurrency(100000) }}</h4> -->
                    </div>
                </v-col>
            </v-row>
            <v-row class="d-flex justify-center align-center">
                <v-col col="12" md="9">
                    <div class="d-flex justify-space-between align-center">
                        <p>SĐT khách hàng *</p>
                        <v-text-field
                        inputmode="none"
                        style="text-align:right; max-width: 230px;"
                        hide-details
                        class="ml-10 right-input"
                        >
                        </v-text-field>
                        <!-- <h4>{{ formatCurrency(100000) }}</h4> -->
                    </div>
                </v-col>
            </v-row>
        </div>
        <v-card-actions class="d-flex justify-center align-center pt-8">
            <v-btn @click="close()" class="height bg-primary px-10 mr-0 ml-5" type="button">
              <h3>Tiếp tục</h3>
          </v-btn>
        </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
