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
// const listCart = ref(Array(20).fill(null));
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
<style scoped>
    .v-input__control {
    border: 2px solid #0c6b5e !important;
    border-radius: 10px !important;
}

</style>
<template>
  <div class="text-center">
    <v-dialog v-model="modelValue" persistent :retain-focus="false" no-click-animation max-width="600">
      <v-card>
        <v-card-text>
          <div class="container pb-2" style="font-size: 1.4rem; display: flex; align-items: center;justify-content: center;">
             Ghi chú đơn hàng
          </div>
          <v-row class="pa-2 d-flex justify-center">
            <v-col col="12" md="12" class="pr-0">
                <!-- <div class="d-flex"> -->
                    
                    <v-textarea
                        class="mx-2 pb-0 mb-0"
                        color="cyan"
                        bg-color="grey-lighten-2"
                        hide-details
                    ></v-textarea>
                    <span class="mx-2 text-h6">Nội dung tối đa 200 ký tự</span>
                <!-- </div> -->
            </v-col>
        </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="close()" variant="outlined" class="height mx-auto px-10" type="button">
              <h3>Hủy</h3>
          </v-btn>
          <v-btn @click="close()" class="height bg-primary mx-auto px-10" type="button">
              <h3>Xác nhận</h3>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
