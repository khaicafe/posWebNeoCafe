<script setup lang="ts">
import { ref, onMounted, watch, inject } from "vue";
import { formatCurrency, formatCurrencyPoint } from '@/utils/string';

const Swal = inject('$swal') as any
const emit = defineEmits(['update:modelValue', 'callbackEvent']);
function close() { emit('update:modelValue', false); }

// Define the props
const props = defineProps({
  modelValue: Boolean,
  pay: Number,
  // isEdit: Boolean,
  // listCarts: Array as any,
  // cardContent: Object as any,
  // countCart: Object as any
})
const dialog = ref(false);
const textId = ref('')
const contain = ref(`
  
`)
watch(() => props.modelValue, 
  (newListCarts) => {
  if (newListCarts){
    // setTimeout(() => {
    //   inputNumber('idpopupPay')
    // }, 100);
  }
},
  {deep: true})
onMounted(async () => {

});
function inputNumber(input:any) {
    //@ts-ignore
// document.querySelector('#idpopupPay').addEventListener('touchstart', function(event) {
//     // Kiểm tra điều kiện nếu cần ngăn chặn mặc định
//         event.preventDefault();
// }, { passive: false });


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
        usePreview: false, // no preveiw quan trong nè
        restrictInput : true,
        // give the preview initial focus when the keyboard
        // becomes visible
        initialFocus: true,
        // Avoid focusing the input the keyboard is attached to
        noFocus: true,

        reposition: true,
        stayOpen: true,

        //@ts-ignore
        accepted: function(e, keyboard, el) {
          console.log('change keyboard', e)
          confirm(props.pay)
          // close()
        },
         //@ts-ignore
        canceled: function(e, keyboard, el) {
          close()
        },
    };
    //@ts-ignore
    $(`#${input}`).keyboard(keyboard)
    .addTyping({
        showTyping: true,
        delay: 250,
    });
    console.log('text', input)
}
function confirm(money:any) {
  // Swal({
  //       title: "Nhập lý do huỷ đơn",
  //       // content: "input",
  //       input: "text",
  //       focusConfirm:true,
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#fc0d1c",
  //       confirmButtonText: "Đồng ý",
  //   }).then((result:any) => {
  //       if (result) {

  //       }
  //   })
  
  emit('callbackEvent', money);
  // fect send api money
  Swal({
      // toast: true,
      html: `Nạp <b class="color-red"> ${formatCurrencyPoint(money)} </b> Point thành công`,
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
  });
  close()
}

// document.addEventListener('touchstart', function(event) {
//     // Kiểm tra điều kiện nếu cần ngăn chặn mặc định
//         event.preventDefault();
// }, { passive: false });

// Kiểm tra xem trình duyệt có hỗ trợ bàn phím ảo không
//@ts-ignore
// if ('keyboard' in navigator) {
  // Tắt bàn phím ảo
  //@ts-ignore
//   navigator.keyboard.lock().then(() => {
//     console.log('Virtual keyboard locked');
//     alert('Virtual keyboard locked')
//   }).catch((error:any) => {
//     console.error('Failed to lock virtual keyboard:', error);
//     alert('Failed to lock virtual keyboard')
//   });
// } else {
//   console.warn('Virtual keyboard is not supported in this browser.');
//   alert('virtual keyboard is not supported in this browser')
// }

// document.querySelector('#idpopupPay').blur();
// document.body.focus();


</script>
<style scoped>
    .v-input__control {
    border: 2px solid #0c6b5e !important;
    border-radius: 10px !important;
}

</style>
<template>
  <div class="text-center">
    <v-dialog v-model="modelValue" persistent :retain-focus="false" no-click-animation max-width="800">
      <v-card>
        <v-card-text>
          <div class="container bg-red pb-2" style="font-size: 2rem; display: flex; align-items: center;justify-content: center;">
             <b class="bg-red">Nạp Point</b>
          </div>
          <p class="text-h3 text-md-center">Xác nhận nạp point</p>
          <p class="text-h4 text-md-center">Xác nhận nạp <b class="color-red">{{ formatCurrencyPoint(props.pay) }}</b> vào tài khoản 1 cho khách hàng <b class="color-red">TAOHELIOBD</b></p>
          <br>
          <p class="text-h6 text-md-center"><b>Nhập mật khẩu</b></p>
          <div class="text-h6 text-md-center" style="font-size: 2rem;">
            <div class="mx-auto w-50 v-input v-input--horizontal v-input--center-affix v-input--density-comfortable v-locale--is-ltr v-text-field" data-v-e7bfa14f="">
                    <div class="v-input__control">
                        <div class="v-field v-field--center-affix v-field--no-label v-field--variant-outlined v-theme--GREEN_THEME v-locale--is-ltr" role="textbox">
                            <div class="v-field__overlay"></div>
                            <div class="v-field__loader">
                                <div class="v-progress-linear v-theme--GREEN_THEME v-locale--is-ltr" role="progressbar" aria-hidden="true" aria-valuemin="0" aria-valuemax="100" style="top: 0px; height: 0px; --v-progress-linear-height: 2px; left: 50%; transform: translateX(-50%);">
                                    <div class="v-progress-linear__background bg-primary" style="width: 100%;"></div>
                                    <div class="v-progress-linear__indeterminate">
                                        <div class="v-progress-linear__indeterminate long bg-primary"></div>
                                        <div class="v-progress-linear__indeterminate short bg-primary"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="v-field__field" data-no-activator="">
                                <label class="v-label v-field-label" for="idpopupPay"></label>
                                <input @click="inputNumber('idpopupPay')" readonly="true" style="font-size: 1.3rem; font-weight:bolder ;" placeholder="Mật khẩu" size="1" type="text" id="idpopupPay" aria-describedby="input-15-messages" class="v-field__input py-0">
                            </div>
                            <div class="v-field__outline">
                                <div class="v-field__outline__start"></div>
                                <div class="v-field__outline__end"></div>
                            </div>
                        </div>
                    </div>
                    <div class="v-input__details"><div class="v-messages" role="alert" aria-live="polite" id="input-15-messages"></div>
                </div>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="close()" class="height bg-reds mx-auto px-10" type="button">
              <h3>Hủy</h3>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
