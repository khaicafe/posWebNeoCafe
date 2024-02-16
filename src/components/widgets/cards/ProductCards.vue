<script setup lang="ts">
import { ref, onMounted, inject, watch, defineProps, toRaw } from 'vue';
import neocafeLogo from '@/assets/images/logos/favicon.svg';
import { formatCurrency } from '@/utils/string';
import DialogDetailsOrder from '@/components/posonline/popup/DialogDetailsOrder.vue';

const emit = defineEmits(['someEvent', 'callbackEvent'])
// const emit = defineEmits(['update:modelValue', 'update:listCarts']);
// function close() { emit('update:listCarts', false); }
// function savelistCarts() { emit('update:listCarts', true); }

// dialog
const productsCard = ref({} as any)
const showOff = ref(false)
const cardContent = ref({} as any)
const topping = ref([] as any)
const choice = ref({} as any)

// popup details
const dialogDetails = ref(false)

// Define the props
const props = defineProps({
  listProducts: Object,
  listCarts: Array as any,
  countCart: Object as any
})
// onMounted(async () => {
//     const temp = { ...props.listProducts };
//     console.log('listProducts', temp)
//     productsCard.value = temp.products
//     // phân loại array extras theo từng array khác nhau trong newValue
//     const categorizedExtras = productsCard.value.reduce((acc: any, extras: any) => {
//         //add extra.quanlity
//         extras.quanlity = 1
//         // add totalPrice
//         extras.totalPrice = extras.prodprice
//         if (typeof extras.extras !== 'undefined' && extras.extras.length > 0){
//             let temp = extras.extras.reduce((acc: any, extra: any) => {
//                 // console.log('extraddd', extra)
//                 return groupExtrasByType(extra);
//             }, {});
//             extras.listextras = temp;
//             // console.log('list extras', temp)
//         }
//     }, {});
// });
// Watch for changes in myStringProp
watch(() => props.listProducts, (newValue, oldValue) => {
    const temp = { ...newValue };
    console.log('listProducts', temp)
    productsCard.value = temp.products
    if (productsCard.value != null){
         // phân loại array extras theo từng array khác nhau trong newValue
        const categorizedExtras = productsCard.value.reduce((acc: any, extras: any) => {
            //add extra.quanlity
            extras.quanlity = 1
            // add totalPrice
            extras.totalPrice = extras.prodprice
            if (typeof extras.extras !== 'undefined' && extras.extras.length > 0){
                let temp = extras.extras.reduce((acc: any, extra: any) => {
                    // console.log('extraddd', extra)
                    return groupExtrasByType(extra);
                }, {});
                extras.listextras = temp;
                // console.log('list extras', temp)
            }
        }, {});
    }
   
    
})
// check change choice
watch(() => choice.value, (newValue, oldValue) => {
    console.log('choice click', newValue)
    // add Note
    cardContent.value.note = choice.value.note

    //'Size M / Nóng / Bánh ăn kèm 1 / trân châu'
    const allNames = [choice.value?.option, ,choice.value?.size, choice.value?.extras, ...topping.value]
     // @ts-ignore
    .flatMap((item:any) => item ? item.name_vn : []);
    const resultString = `${allNames.join(' / ')}`;
    cardContent.value.showOptions = resultString
    
    // tính tổng của option choice
    const TotalPrice = [choice.value?.option, ,choice.value?.size, choice.value?.extras, ...topping.value]
     // @ts-ignore
    .flatMap((item:any) => item ? item.price : [])
    let sum = 0;
    TotalPrice.forEach((number: number) => sum += number? number:0 );
    cardContent.value.totalPrice = cardContent.value.prodprice + sum

},{deep: true})

// Phân loại extras theo group_type
function groupExtrasByType(extras: any) {
    const groupedExtras = {
        1: [], // group_type 1
        2: [], // group_type 2
        0: []  // group_type 0
    };
    //@ts-ignore
    extras.forEach(extra => {
        //@ts-ignore
        groupedExtras[extra.group_type].push(extra);
    });

    return groupedExtras;
}
// function popup add item to carts
function handleClick(card: any) {
    // reset choice option
    choice.value = {}
    topping.value = []

    console.log('handclick', card, topping.value)
    // check có extras hay không ()
    if (!card.extras){
        orderNew({...card})
        return
    }
    cardContent.value = {...card}
    showOff.value = true
}
function orderNew(item:any) {
    console.log('item', toRaw(choice.value))

    // check item trong giỏ hàng
    const foundObject = props.listCarts.find((obj: any) => obj.prodid === item.prodid);
    const tempObject = { ...foundObject }
    const tempItem = { ...item }

    // Xóa thuộc tính 'idcart' và 'quanlity' khỏi đối tượng (2 đối tượng này thay đổi)
    delete tempObject.idcart;
    delete tempObject.quanlity;
    // delete tempObject.note;
    delete tempItem.idcart;
    delete tempItem.quanlity;
    // delete tempItem.note;
    console.log('so sanh',JSON.stringify(tempObject) === JSON.stringify(tempItem), tempObject , tempItem)
    if (JSON.stringify(tempObject) === JSON.stringify(tempItem)){
        for (let i = 0; i < props.listCarts.length; i++) {
            if (props.listCarts[i].prodid === item.prodid) {
                // console.log(`Object with ID ${props.listCarts[i]['quanlity']} found and updated:`, props.listCarts[i]);
                props.listCarts[i].quanlity = (props.listCarts[i]?.quanlity ?? 0) + item.quanlity;
                // found = true;
                console.log(`Object with ID ${item.quanlity} found and updated:`, props.listCarts[i]);
                break; // Khi tìm thấy, thoát khỏi vòng lặp
            }
        }

    } else {
        // add object tạm để dùng show popup detais
        // item.topping = topping.value
        // item.choice = choice.value

        // đánh id cho giỏ hàng
        item.idcart = props.countCart.count++
        console.log('count', item.idcart)
        props.listCarts?.push(item)
        // savelistCarts()
        console.log('list carts', props.listCarts)
        showOff.value = false
        // emit('someEvent')
    }
   
}
function choiceTopping() {
    // JSON.parse(JSON.stringify(b))
    const qux = toRaw(topping.value)
   console.log('topping', qux)
   choice.value.topping = {...topping.value}
}

// popup details
function dialogDetail(item:any){
    emit('callbackEvent')
    console.log('item prod', item)
    // add Note
    item.choice = { note: ''}
    item.topping = []
    // check variant
    if(item.variant.length > 1){
        dialogDetails.value = true
        cardContent.value = {...item}
    } else {
        console.log('khong co variat')
        orderNew({...item})
    }



    // check có extras hay không ()
    // if(item.extras || item.option){
    //     dialogDetails.value = true
    //     cardContent.value = {...item}
    // }else if (!item.extras && !item.option) {
    //     console.log('khong co extras option')
    //     orderNew({...item})
    //     // return
    // }
}


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
    /* font-weight: bold;  */
    text-align: center; 
    font-size: 1.4em;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
</style>
<template>
    <DialogDetailsOrder
        v-model="dialogDetails"
        :isEdit="false"
        :cardContent="cardContent"
        :listCarts="props.listCarts"
        :countCart="props.countCart"
    />
    <!-- list item carts -->
    <v-card style="background: transparent; font-family: 'Times New Roman', Times, serif;" elevation="0" class="pl-0 ml-0">
        <!-- <v-card-text class="px-1 ml-0 pt-0"> -->
            <v-row style="margin: 0;" scrollable>
                <v-col style="padding: 5px;" cols="12" sm="3" v-for="card in productsCard" :key="card">
                    <!-- @click="dialogDetail(card)" -->
                    <v-card elevation="0" rounded="md" style="z-index: 100;" @click="dialogDetail(card)">
                            <v-img :src="card.images ==''? 'error': card.images" height="120" class="rounded-t-md">
                                <template v-slot:error>
                                    <v-img
                                        class="rounded-t-md"
                                        height="120"
                                        :src="neocafeLogo"
                                    ></v-img>
                                </template>
                            </v-img>
                        <v-card-item class="pa-0" style="position: relative;">
                            <div style="position: absolute; top: 5px; width: 100%;">
                                <div>
                                    <span v-text="card.name" class="text-cards px-1 text-h6"></span>
                                </div>
                            </div>
                            <div class="d-flex justify-center" style="position: absolute; bottom: 5px; width: 100%;">
                                <div>
                                    <span class="text-h6" style="color: #197468;" v-text="formatCurrency(card.variant[0].price)"></span>
                                </div>
                            </div>
                        </v-card-item>
                    </v-card>
                </v-col>

                <!-- <v-col style="padding: 5px;" cols="12" lg="0" sm="3" v-if="productsCard">
                    <v-card elevation="0" rounded="md" style="z-index: 100;">
                    </v-card>
                </v-col>
                <v-col style="padding: 5px;" cols="12" lg="0" sm="3" v-if="productsCard">
                    <v-card elevation="0" rounded="md" style="z-index: 100;">
                    </v-card>
                </v-col> -->
            </v-row>
        <!-- </v-card-text>  -->
    </v-card>
</template>
