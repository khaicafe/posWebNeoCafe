<script setup lang="ts">
import { ref, watch, inject, onMounted } from "vue";
import { formatCurrency } from '@/utils/string';
import neocafeLogo from '@/assets/images/logos/favicon.svg';

const api: any = inject('$api');
// const dialog = ref(false);
const topping = ref([] as any)
const choice = ref({} as any)
const cardContent = ref({} as any)
const variantDetails = ref({} as any)
const attribute = ref([] as any)
const priceProd = ref()
const addonString = ref('')
const variantString = ref('')

const emit = defineEmits(['update:modelValue', 'update:listCarts', 'update:countCart']);
function close() { emit('update:modelValue', false); }

// Define the props
const props = defineProps({
  modelValue: Boolean,
  isEdit: Boolean,
  listCarts: Array as any,
  cardContent: Object as any,
  countCart: Object as any
})
// onMounted(async () => {
   
// })
// Watch for changes in cardContent (get lại các giá trị đã chọn)
watch(() => props.modelValue,async (newValue, oldValue) => {
  console.log('show', variantDetails.value, 'cardconten', cardContent.value )

  if (newValue){
    variantDetails.value = await getVariant('225', props.cardContent.id)

    choice.value = cardContent.value.choice
    topping.value = cardContent.value.topping
    console.log('props choice topping', topping.value)


    // set giá măc đinh khi open popup
    console.log('popup details',  JSON.parse(props.cardContent.variant[0].options) )
    try {
        priceProd.value = props.cardContent.variant[0].price
        
    } catch (error) {
        priceProd.value = 0
    }


    // set variant default
    attribute.value = JSON.parse(props.cardContent.variant[0].options)
    variantDetails.value.metadata_variant.map((item:any) => {
        const choice = getElement(attribute.value, item.attribute_id)
        // return object variant set default
        item.choice = item.value.find((item:any) => item.name === choice);
        console.log(item)
    })

    console.log('variant default details', variantDetails.value)
  }
})
// Watch for changes in cardContent
watch(() => props.cardContent,(newValue, oldValue) => {
    cardContent.value = newValue;
    console.log('props cardContent', newValue)
    // getVariant('225', newValue.id)
})

// check change choice
watch(() => choice.value, (newValue, oldValue) => {
    console.log('choice click', newValue)
    // add Note
    cardContent.value.note = choice.value.note

    // //'Size M / Nóng / Bánh ăn kèm 1 / trân châu'
    // const allNames = [choice.value?.option, ,choice.value?.size, choice.value?.extras, ...topping.value]
    //  // @ts-ignore
    // .flatMap((item:any) => item ? item.name_vn : []);
    // const resultString = `${allNames.join(' / ')}`;
    // cardContent.value.showOptions = resultString
    
    // tính tổng của option choice
    // const TotalPrice = [choice.value?.option, ,choice.value?.size, choice.value?.extras, ...topping.value]
    //  // @ts-ignore
    // .flatMap((item:any) => item ? item.price : [])
    // let sum = 0;
    // TotalPrice.forEach((number: number) => sum += number? number:0 );
    // cardContent.value.totalPrice = cardContent.value.prodprice + sum

},{deep: true})

watch( () => variantDetails.value.metadata_variant, async (newValue, oldValue) => {
    console.log('change', newValue)
    //set price to prod
    newValue.price = await getElementInArray(newValue)
    // set total price
    priceProd.value = newValue.price
    // newValue.totalPrice = newValue.price
   
     //'Size M / Nóng / Bánh ăn kèm 1 / trân châu'
     const allNames =  newValue.filter((value:any) => value.choice.name)
     // @ts-ignore
    .flatMap((item:any) => item ? item.choice.name : []);
    variantString.value = `${allNames.join(' / ')}`;
    console.log('string', variantString.value)
    cardContent.value.showOptions = variantString.value + (addonString.value !=''?' / ':'') + addonString.value

    cardContent.value.totalPrice = priceProd.value

},{deep: true})
watch( () => variantDetails.value.metadata_add_on, async (newValue, oldValue) => {
    console.log('change new', newValue)
     // Lọc ra các phần tử có trường choice và lấy ra mảng variants
    const choiceAddons = newValue
    .filter((attribute:any) => attribute.choice)
    .map((attribute:any) => attribute.choice.name_variant);
    console.log('show choice variant', choiceAddons)
    addonString.value = `${choiceAddons.join(' / ')}`;
    console.log('string', addonString.value)
    cardContent.value.showOptions = variantString.value + (addonString.value!=''?' / ':'') + addonString.value

    let sum= 0
    const choiceAddonsPrice = newValue
    .filter((attribute:any) => attribute.choice)
    .map((attribute:any) => attribute.choice.price);
    choiceAddonsPrice.forEach((number: string) => sum += number ? parseInt(number):0 );
    console.log('price', sum)
    priceProd.value += sum 
    cardContent.value.totalPrice = priceProd.value
    console.log('price prod', priceProd.value)

},{deep: true})
// get variant check default
async function getVariant(shopId: any, prodId:any) {
    // api
    try {
        const { data } = await api.posOnline.getVariant(shopId, prodId);
        console.log('get variant', data)
        // variant.value = data
        return data
       
    } catch (error) {
        console.log(error);
        return null
    }
}
// lây ra phần tử với attributeId
function getElement(data:any, attribute_id:any) {
    // const data = [
    //     {
    //         "attribute_id": 1,
    //         "value": "nhỏ"
    //     },
    //     {
    //         "attribute_id": 2,
    //         "value": "Đá"
    //     }
    // ];

    // Tìm phần tử có attribute_id bằng 2
    const result = data.find((item:any) => item.attribute_id === attribute_id);
    console.log('object', result)
    // Nếu tìm thấy, lấy giá trị value, ngược lại trả về null hoặc một giá trị mặc định
    const value = result ? result.value : null;

    console.log(value);
    return value
}
// disable variant
function disableVariant(cardContent:any) {
    // check default
    const arrayToCheck = [7, 8, 13, 14];
    const updatedMetadataVariant = cardContent.metadata_variant.map((attribute:any) => {
        attribute.value = attribute.value.map((size:any) => {
            size.show = size.variants.some((variantId:any) => arrayToCheck.includes(variantId));
            return size;
        });
        return attribute;
    });

    console.log('default', updatedMetadataVariant);
}
// lấy các phần tữ giao nhau các array 
async function getElementInArray(metadataVariant:any) {
    // Lọc ra các phần tử có trường choice và lấy ra mảng variants
    const choiceVariants = metadataVariant
        .filter((attribute:any) => attribute.choice)
        .map((attribute:any) => attribute.choice.variants);
    console.log('show choice variant', choiceVariants)
    // Nếu có ít nhất một phần tử có trường choice, thì thực hiện việc lấy phần tử giao nhau
    let commonVariants = [] as any
    if (choiceVariants.length > 0) {
        //@ts-ignore
        commonVariants = choiceVariants.reduce((result, variants) => result.filter(value => variants.includes(value)));
        console.log('result', commonVariants);
    } else {
        console.log("Không có phần tử nào có trường choice.");
    }

    // query result set price to cardContent
    const newVariant = variantDetails.value.variant.find((item:any) => item.id === commonVariants[0]);
    console.log('price prod new', newVariant, commonVariants[0])
    return newVariant.price
}

// close dialog
async function orderNew(item:any) {
  console.log('test dialog', variantDetails.value, )
  //set price to prod
  item.price = await getElementInArray(variantDetails.value.metadata_variant)
  // set total price
//   item.totalPrice = item.price

  // khi có idcart thì change options
  if(props.isEdit){
    // Gọi hàm để xóa đối tượng với ID cụ thể
    removeObjectById(props.listCarts, item.idcart);
    // add object tạm để dùng show popup detais
    item.topping = topping.value
    item.choice = choice.value
    // add lại item prod
    props.listCarts.push(item)
    console.log('id cart', item.idcart, props.listCarts)
    close()
    return
  }
  //////////////////////////////////////////////
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
  
  if (JSON.stringify(tempObject) === JSON.stringify(tempItem)){
      // phần này check list thêm số lượng
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
      item.topping = topping.value
      item.choice = choice.value
      
      console.log('count dialog', item.idcart)
      // đánh id cho giỏ hàng
      item.idcart = props.countCart.count++
      props.listCarts?.push(item)
     
     
  }
  //////////////////////////////////////////////
  close()
}
// Hàm để xóa đối tượng từ mảng dựa trên trường id
function removeObjectById(array: any, id: any) {
    // Hàm để tìm index của đối tượng trong mảng dựa trên trường id
    let index = -1
    for (let i = 0; i < array.length; i++) {
        if (array[i].idcart === id) {
            index = i;
            // console.log('index', i, array[i].prodname)
            break; // Khi tìm thấy, thoát khỏi vòng lặp
        }
    }
    if (index !== -1) {
        array.splice(index, 1);
        // props.listCarts = array
        console.log(`Đối tượng với ID ${id} đã được xóa.`, index);
        // console.log('list carts clear item', array)
    } else {
        console.log(`Không tìm thấy đối tượng với ID ${id}.`, array);
    }
}
function choiceTopping() {
    // JSON.parse(JSON.stringify(b))
    // const qux = toRaw(topping.value)
   console.log('topping', topping.value)
   choice.value.topping = {...topping.value}
}
</script>

<template>
  <div class="text-center">
    <v-dialog v-model="modelValue" scrollable max-width="500">
        <v-card>
            <!-- header -->
            <div class="d-flex align-center mt-1 pa-4">
                <div>
                    <v-img 
                    :src="cardContent.images"
                    max-width="60" 
                    max-heigth="60"
                    class="rounded mr-1"
                    alt="Product Image"
                    >
                    <template v-slot:error>
                        <v-img
                            class="mx-auto"
                            height="60"
                            :src="neocafeLogo"
                        ></v-img>
                    </template>
                    </v-img>
                </div>
                <div>
                    <h4>{{ cardContent.name }}</h4>
                    <v-card-subtitle class="pa-0">{{ cardContent.desc }}</v-card-subtitle>
                    <strong style="color: #197468; bottom: 0;font-weight: bold;">{{ formatCurrency(priceProd) }}</strong>
                </div>
            </div>
            
            <hr style="height: 5px; background:#eff1ef; border: none;">
            <!-- content -->
            <v-card-text style="height: 350px; padding-top: 0;" class="overflow-auto">
                <!-- Note -->
                <div>
                    <p style="padding-top: 15px; padding-bottom: 5px;">Ghi chú</p>
                    <v-text-field
                        v-model="choice.note"
                        single-line
                        density='compact'
                        hide-details
                        placeholder="Nhập ghi chú"
                        >
                    </v-text-field>
                </div>
                <!-- variant -->
                <div 
                    v-for="(item, index) in variantDetails.metadata_variant"
                    :value="item"
                    :key="index"
                >
                    <p style="padding-top: 15px;">{{ item.name }}</p>
                    <v-radio-group v-model="item.choice">
                        <v-radio
                            v-for="(itemt, index) in item.value"
                            color="primary"
                            :value="itemt"
                            :key="index"
                            >
                            <template v-slot:label>
                                <div class="d-flex align-center justify-space-between ma-2 w-100 text-h5" style="width: 100%;">
                                    <span style="text-transform: capitalize;">{{ itemt.name }}</span>
                                    <!-- <strong style="color: #197468;">{{ formatCurrency(itemt.price) }}</strong> -->
                                </div> 
                            </template>
                        </v-radio>
                        
                    </v-radio-group>
                </div>
                <!-- Topping addon -->
                <div  v-for="(items, index) in variantDetails.metadata_add_on"
                    :value="items"
                    :key="index"
                >
                    <p style="padding-top: 15px;">{{ items.name }}</p>
                        <v-radio-group v-model="items.choice">
                            <v-radio
                                v-for="(itemt, index) in items.add_on"
                                color="primary"
                                :value="itemt"
                                :key="index"
                                >
                                <template v-slot:label>
                                    <div class="d-flex align-center justify-space-between ma-2 w-100 text-h5" style="width: 100%;">
                                        <span style="text-transform: capitalize;">{{ itemt.name_variant }}</span>
                                        <strong style="color: #197468;">{{ formatCurrency(itemt.price) }}</strong>
                                    </div> 
                                </template>
                            </v-radio>
                        </v-radio-group>
                    <!-- <v-checkbox
                        v-for="(item, index) in items.add_on"
                        v-model="item.choice"
                        color="primary"
                        :value="item"
                        dense
                        hide-details
                        style="height: 40px;"
                        @change="choiceTopping()"
                    >
                    <template v-slot:label>
                        <div class="d-flex align-center justify-space-between pa-0 ml-2 mr-2 w-100 text-h5" style="width: 100%;">
                            <span style="text-transform: capitalize;">{{ item.name_variant }}</span>
                            <strong style="color: #197468;">{{ formatCurrency(item.price) }}</strong>
                        </div> 
                    </template>
                </v-checkbox> -->
                </div>
            </v-card-text>
            <hr style="height: 5px; background:#eff1ef; border: none;">
            <!-- Button -->
            <v-card-actions class="justify-end">
                <v-row>
                    <div class="d-flex align-center ma-2">
                        <v-btn size="25" variant="outlined" @click="cardContent.quanlity--" :disabled="cardContent.quanlity<2">
                            <v-icon color="red">
                                mdi-minus
                            </v-icon>
                        </v-btn>
                        <v-btn size="25" id="no-background-hover" style="color: black;">{{ cardContent.quanlity }}</v-btn>
                        <v-btn size="25" variant="outlined" @click="cardContent.quanlity++">
                            <v-icon color="green">
                                mdi-plus
                            </v-icon>
                        </v-btn>
                    </div>
                </v-row>
                <v-btn variant="outlined" @click="orderNew(cardContent)" class="height px-4 bg-primary">Thêm vào giỏ hàng - {{ formatCurrency( priceProd) }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
  </div>
</template>

