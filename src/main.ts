import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { router } from './router';
import vuetify from './plugins/vuetify';
import supertokens from './plugins/supertokens';
import api from '@/plugins/api';
import '@/scss/style.scss';
import PerfectScrollbar from 'vue3-perfect-scrollbar';
import VueApexCharts from 'vue3-apexcharts';
import VueTablerIcons from 'vue-tabler-icons';

import 'vue3-carousel/dist/carousel.css';
import './_mockApis';
import VCalendar from 'v-calendar';
import VueRecaptcha from 'vue3-recaptcha-v2';
import Maska from 'maska';

// notify
import Toast from 'vue-toastification';
// Import the CSS or use your own!
import 'vue-toastification/dist/index.css';

// print
// import print from 'vue3-print-nb';
// Table
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
//i18
import { createI18n } from 'vue-i18n';
import messages from '@/utils/locales/messages';
//ScrollTop
import VueScrollTo from 'vue-scrollto';
// swal2
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { Html2CanvasPlugin } from 'vue3-html2canvas';

// keyboard number
import "https://code.jquery.com/jquery-2.1.3.min.js"; // Import jQuery from CDN
import "https://code.jquery.com/ui/1.11.3/jquery-ui.min.js"
import "https://cdnjs.cloudflare.com/ajax/libs/virtual-keyboard/1.30.1/js/jquery.keyboard.min.js"
import "https://cdnjs.cloudflare.com/ajax/libs/virtual-keyboard/1.30.1/js/jquery.keyboard.extension-all.min.js"
// printer
// import "https://cdn.jsdelivr.net/npm/dom-to-image-more@3.1.0/dist/dom-to-image-more.min.js "
// import "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"
// sound
// import VueAudio from 'vue-audio-better'

//@ts-ignore
console.log(process.env.NODE_ENV)
//@ts-ignore
if (process.env.NODE_ENV !== 'development') {
    // console.log('Thông tin gỡ lỗi');
    console.log = function() {};
}


const i18n = createI18n({
    locale: 'en',
    messages: messages,
    silentTranslationWarn: true,
    silentFallbackWarn: true
});

const app = createApp(App);
// fakeBackend();

// this will inject the $api property into all store instances.
const pinia = createPinia();
pinia.use(({ store }) => {
    store.$api = app.config.globalProperties.$api;

});
app.use(supertokens);
app.use(router);
app.component('EasyDataTable', Vue3EasyDataTable);
app.use(PerfectScrollbar);
app.use(pinia);
app.use(VCalendar, {});
app.use(VueTablerIcons);
// app.use(print);
app.use(VueRecaptcha, {
    siteKey: '6LdzqbcaAAAAALrGEZWQHIHUhzJZc8O-KSTdTTh_',
    alterDomain: false // default: false
});
app.use(i18n);
app.use(Maska);
app.use(VueApexCharts);
app.use(vuetify);
//ScrollTop Use
// app.use(VueScrollTo);
app.use(VueScrollTo, {
    duration: 1000,
    easing: 'ease'
});
app.use(api, {
    baseUrlBff: import.meta.env.VITE_API_URL,
    baseUrlOther: import.meta.env.VITE_API_URL_NEO_CAFE
});
app.use(Toast, {
    transition: 'Vue-Toastification__bounce',
    maxToasts: 20,
    newestOnTop: true
});
app.use(VueSweetalert2);
app.use(Html2CanvasPlugin);
// mount the app. Must be done after the init functions (end of the file)
app.mount('#app');