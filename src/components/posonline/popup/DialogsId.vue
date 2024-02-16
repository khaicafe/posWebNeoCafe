<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

const emit = defineEmits(['update:modelValue', 'eventPopup']);
function close() { emit('update:modelValue', false); }

// Define the props
const props = defineProps({
  modelValue: Boolean,
  isEdit: Boolean,
  // listCarts: Array as any,
  // cardContent: Object as any,
  // countCart: Object as any
})
const dialog = ref(false);
const textId = ref('')
watch(() => props.modelValue, 
  (newListCarts) => {
  if (newListCarts){
    setTimeout(() => {
      inputNumber('idpopupPay')
    }, 100);
  }
},
  {deep: true})
onMounted(async () => {

});
function inputNumber(input:any) {
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
        //     // give the preview initial focus when the keyboard
        // becomes visible
        // initialFocus: false,
        // // Avoid focusing the input the keyboard is attached to
        // noFocus: false,
        reposition: true,
        stayOpen: true,

        //@ts-ignore
        accepted: function(e, keyboard, el) {
          // console.log('change keyboard', keyboard)
          emit('eventPopup', el.value);
          close()
        },
         //@ts-ignore
        canceled: function(e, keyboard, el) {
          close()
        },
    };
     //@ts-ignore
    //  $(`#${input}`).preventKeyboard();
    //@ts-ignore
    $(`#${input}`).keyboard(keyboard)
    .addTyping({
        showTyping: false,
        delay: 250,
    });
  
    console.log('text', input)
}

window.addEventListener('native.keyboardshow', keyboardShowHandler);
//@ts-ignore
function keyboardShowHandler(e){
    alert("keyboard open"); //This never fires!
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
    <v-dialog v-model="modelValue" persistent :retain-focus="false" no-click-animation max-width="500">
      <v-card>
        <v-card-text>

          <div class="container bg-red pb-5" style="font-size: 2rem; display: flex; align-items: center;justify-content: center;">
             <b>Tài khoản</b>
            
          </div>
          <h4><b>Nhập ID tài khoản</b></h4>

          
          <div class="container bg-red pb-5" style="font-size: 2rem; display: flex; align-items: center;justify-content: center;">
            <div class="v-input v-input--horizontal v-input--center-affix v-input--density-comfortable v-locale--is-ltr v-text-field" data-v-e7bfa14f="">
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
                                <input @focus="inputNumber('idpopupPay')" inputmode="none" style="font-size: 1.3rem; font-weight:bolder ;" placeholder="Nhập ID khách hàng" size="1" type="text" id="idpopupPay" aria-describedby="input-15-messages" class="v-field__input py-0">
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
          <!-- <v-btn color="secondary" class="px-4  mx-auto"  @click="close()" variant="tonal"
            >Close Dialog</v-btn
          > -->
          <v-btn @click="close()" class="height bg-reds mx-auto px-8" type="button"  style="">
              <h4><b>Hủy</b></h4>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
