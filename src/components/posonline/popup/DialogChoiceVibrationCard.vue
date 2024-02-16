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
  cardchoice: String,
  success: Boolean
})
const listCart = ref(Array(40).fill(null));
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
    emit('callbackEvent', {card: index, success: props.success});
    close()
}


</script>
<template>
  <div class="text-center">
    <v-dialog v-model="modelValue" persistent :retain-focus="false" no-click-animation max-width="800">
      <v-card>
        <v-card-text>
          <div class="container pb-2" style="font-size: 1.4rem; display: flex; align-items: center;justify-content: center;">
             Trãi nghiệm tại quán / Mang về / Foodapps
          </div>
        </v-card-text>
        <v-card-actions class="pa-0 mx-3 mb-4">
            <v-row>
                <v-col col="12" md="12">
                    <v-btn 
                    @click="confirm('mangve')" 
                    rounded 
                    min-width="92" 
                    type="button"
                    variant="outlined"
                    color="#8e9190"
                    class="ml-2 mb-2"
                    >
                        <h4>Mang về</h4>
                    </v-btn>

                    <v-btn 
                    @click="confirm('ShopeeFood')" 
                    rounded 
                    color="#8e9190" 
                    min-width="92" 
                    type="button"
                    variant="outlined"
                    class="ml-2 mb-2"
                    >
                        <h4>Shopee Food</h4>
                    </v-btn>

                    <v-btn 
                    @click="confirm('GrabFood')" 
                    rounded 
                    color="#8e9190" 
                    min-width="92" 
                    type="button"
                    variant="outlined"
                    class="ml-2 mb-2"
                    >
                        <h4>Grab Food</h4>
                    </v-btn>
                </v-col>
              
            </v-row>
        </v-card-actions>
          <v-sheet
              class="d-flex align-content-start flex-wrap mx-3 mb-5"
          >
            <v-btn 
              v-for="(card, index) in listCart" 
              :key="card" 
              @click="confirm(String(index))" 
              rounded 
              color="#8e9190"
              :style="{ background: props.cardchoice === String(index) ? '#0c685b' : 'default-color', color: props.cardchoice === String(index) ? 'white' : '#8e9190'}"
              min-width="92" 
              type="button"
              variant="outlined"
              class="ml-1 mb-2"
            >
                <h4>{{ `Thẻ ${index}` }}</h4>
            </v-btn>
          </v-sheet>
      </v-card>
    </v-dialog>
  </div>
</template>
