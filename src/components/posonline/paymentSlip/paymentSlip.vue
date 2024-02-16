<script setup lang="ts">
import { ref, onMounted, watch, inject } from "vue";
import DialogConfirmPay from "@/components/posonline/popup/DialogConfirmPay.vue";
import { formatCurrency, formatCurrencyPoint } from '@/utils/string';
// Use sweetalert2
const Swal = inject('$swal') as any
const emit = defineEmits(['update:modelValue', 'callbackEvent']);
function close() { emit('update:modelValue', false); }

// Define the props
const props = defineProps({
  modelValue: Boolean,
  
})
const deviceShop = [
    {
        "id": 1,
        "name": "Chi phí quỹ lương",
        "priority": 2,
        "items": [
            {
                "id": 1,
                "name": "Chi phí quỹ lương",
                "priority": 1,
                "group_id": 1,
                "is_required": true,
                "need_approved": true,
                "created_at": "2023-03-19T01:10:11Z",
                "updated_at": "2023-07-15T03:16:58Z"
            }
        ],
        "closing_expense_details": null,
        "cost": 0,
        "created_at": "2023-03-19T01:08:35Z",
        "updated_at": "2023-10-18T08:14:20Z"
    },
    {
        "id": 4,
        "name": "Chi phí thuê máy móc, thiết bị",
        "priority": 3,
        "items": [
            {
                "id": 4,
                "name": "Thuê máy cà phê",
                "priority": 1,
                "group_id": 4,
                "is_required": false,
                "need_approved": true,
                "created_at": "2023-06-11T12:05:10Z",
                "updated_at": "2023-07-15T03:16:58Z"
            },
            {
                "id": 5,
                "name": "Thuê máy rửa cốc",
                "priority": 2,
                "group_id": 4,
                "is_required": false,
                "need_approved": true,
                "created_at": "2023-06-11T12:05:37Z",
                "updated_at": "2023-07-15T03:16:58Z"
            }
        ],
        "closing_expense_details": null,
        "cost": 0,
        "created_at": "2023-06-11T12:01:44Z",
        "updated_at": "2023-06-11T12:01:44Z"
    },
    {
        "id": 5,
        "name": "Chi phí điện, nước, internet",
        "priority": 4,
        "items": [
            {
                "id": 6,
                "name": "Tiền điện",
                "priority": 1,
                "group_id": 5,
                "is_required": false,
                "need_approved": true,
                "created_at": "2023-06-11T12:06:05Z",
                "updated_at": "2023-07-15T03:16:58Z"
            },
            {
                "id": 7,
                "name": "Tiền nước",
                "priority": 2,
                "group_id": 5,
                "is_required": false,
                "need_approved": true,
                "created_at": "2023-06-11T12:06:24Z",
                "updated_at": "2023-07-15T03:16:58Z"
            },
            {
                "id": 8,
                "name": "Tiền internet",
                "priority": 3,
                "group_id": 5,
                "is_required": false,
                "need_approved": true,
                "created_at": "2023-06-11T12:06:43Z",
                "updated_at": "2023-07-15T03:16:58Z"
            }
        ],
        "closing_expense_details": null,
        "cost": 0,
        "created_at": "2023-06-11T12:02:03Z",
        "updated_at": "2023-06-11T12:02:03Z"
    },
    {
        "id": 6,
        "name": "Chi phí thuê mặt bằng",
        "priority": 5,
        "items": null,
        "closing_expense_details": null,
        "cost": 0,
        "created_at": "2023-06-11T12:02:16Z",
        "updated_at": "2023-06-11T12:02:16Z"
    },
    {
        "id": 7,
        "name": "Chí phí đầu tư thêm máy móc, CCDC …",
        "priority": 6,
        "items": [
            {
                "id": 14,
                "name": "Chi phí đầu tư thêm máy moc, CCDC ...",
                "priority": 1,
                "group_id": 7,
                "is_required": false,
                "need_approved": true,
                "created_at": "2023-06-30T11:08:50Z",
                "updated_at": "2023-07-15T03:16:58Z"
            }
        ],
        "closing_expense_details": null,
        "cost": 0,
        "created_at": "2023-06-11T12:02:28Z",
        "updated_at": "2023-06-11T12:02:59Z"
    },
    {
        "id": 8,
        "name": "Chi phí khác (đồ take away, túi rác, nước rửa kính, lau sàn,…)",
        "priority": 7,
        "items": [
            {
                "id": 13,
                "name": "Chi phí khác (đồ take away, túi rác, nước rửa kính, lau sàn, đá,...)",
                "priority": 1,
                "group_id": 8,
                "is_required": false,
                "need_approved": false,
                "created_at": "2023-06-15T14:16:48Z",
                "updated_at": "2023-09-10T18:34:13Z"
            }
        ],
        "closing_expense_details": null,
        "cost": 0,
        "created_at": "2023-06-11T12:02:41Z",
        "updated_at": "2023-09-29T18:43:17Z"
    },
    {
        "id": 9,
        "name": "Chi phí hành chính (phường xã, an ninh, thanh tra …)",
        "priority": 8,
        "items": [
            {
                "id": 9,
                "name": "Chi phí phường",
                "priority": 1,
                "group_id": 9,
                "is_required": false,
                "need_approved": true,
                "created_at": "2023-06-11T12:07:10Z",
                "updated_at": "2023-07-15T03:16:58Z"
            },
            {
                "id": 10,
                "name": "Chi phí giao thông công chính + Thanh tra Quận/ Tp",
                "priority": 2,
                "group_id": 9,
                "is_required": false,
                "need_approved": true,
                "created_at": "2023-06-11T12:07:27Z",
                "updated_at": "2023-07-15T03:16:58Z"
            },
            {
                "id": 11,
                "name": "Thưởng lễ cho nhân viên",
                "priority": 3,
                "group_id": 9,
                "is_required": false,
                "need_approved": true,
                "created_at": "2023-06-11T12:08:09Z",
                "updated_at": "2023-07-15T03:16:58Z"
            },
            {
                "id": 12,
                "name": "Chi phí quảng cáo",
                "priority": 4,
                "group_id": 9,
                "is_required": false,
                "need_approved": true,
                "created_at": "2023-06-11T12:09:43Z",
                "updated_at": "2023-07-15T03:16:58Z"
            },
            {
                "id": 15,
                "name": "Thuế thu nhập từ hoạt động sản xuất, kinh doanh cá nhân",
                "priority": 5,
                "group_id": 9,
                "is_required": false,
                "need_approved": false,
                "created_at": "2023-07-26T09:42:17Z",
                "updated_at": "2023-07-26T09:42:17Z"
            },
            {
                "id": 16,
                "name": "Thuế giá trị gia tăng hàng sản xuất, kinh doanh trong nước (gồm cả dịch vụ trong lĩnh vực dầu khí)",
                "priority": 6,
                "group_id": 9,
                "is_required": false,
                "need_approved": false,
                "created_at": "2023-07-26T09:44:03Z",
                "updated_at": "2023-07-26T09:44:03Z"
            }
        ],
        "closing_expense_details": null,
        "cost": 0,
        "created_at": "2023-06-11T12:03:21Z",
        "updated_at": "2023-06-11T12:03:21Z"
    },
    {
        "id": 1000000,
        "name": "Chi phí marketing",
        "priority": 9,
        "items": [
            {
                "id": 1000001,
                "name": "Phí quảng cáo Grab Food",
                "priority": 1,
                "group_id": 1000000,
                "is_required": true,
                "need_approved": true,
                "created_at": "2023-07-13T11:00:25Z",
                "updated_at": "2023-07-15T03:16:58Z"
            },
            {
                "id": 1000002,
                "name": "Phí quảng cáo Shopee Food",
                "priority": 1,
                "group_id": 1000000,
                "is_required": true,
                "need_approved": true,
                "created_at": "2023-07-13T11:00:26Z",
                "updated_at": "2023-07-15T03:16:58Z"
            }
        ],
        "closing_expense_details": null,
        "cost": 0,
        "created_at": "2023-07-13T10:59:23Z",
        "updated_at": "2023-11-20T15:59:25Z"
    },
    {
        "id": 2,
        "name": "Chi phí nền tảng công nghệ",
        "priority": 9,
        "items": [
            {
                "id": 2,
                "name": "Chi phí nền tảng công nghệ",
                "priority": 1,
                "group_id": 2,
                "is_required": true,
                "need_approved": true,
                "created_at": "2023-03-19T01:10:11Z",
                "updated_at": "2023-07-15T03:16:58Z"
            }
        ],
        "closing_expense_details": null,
        "cost": 0,
        "created_at": "2023-03-19T01:08:35Z",
        "updated_at": "2023-06-11T12:03:34Z"
    },
    {
        "id": 3,
        "name": "Đối soát tiêu chéo trong hệ thống",
        "priority": 12,
        "items": [
            {
                "id": 3,
                "name": "Đối soát tiêu chéo trong hệ thống",
                "priority": 1,
                "group_id": 3,
                "is_required": true,
                "need_approved": true,
                "created_at": "2023-03-19T01:10:11Z",
                "updated_at": "2023-07-15T03:16:58Z"
            }
        ],
        "closing_expense_details": null,
        "cost": 0,
        "created_at": "2023-03-19T01:08:35Z",
        "updated_at": "2023-06-11T12:04:05Z"
    }
]
const menu = ref(2)
const header = ref([
    { title: 'Tên CP', align: 'start', key: 'cus1', class: 'bg-reds' },
    { title: 'Chi phí', align: 'start', key: 'cus2' },
    { title: 'Mô tả', align: 'end', key: 'cus3' },
])
const listSlip = ref([
    {id: 'asdf',cus2: 'asdf',cus3: 'asdf',cus4: 'asdf',cus5: 'asdf',cus6: 'asdf',cus7: 'asdf',cus8: 1000000, }
])

</script>

<template>
    <!-- <div > -->
    <div class="page" style="background: transparent; font-family: Times New Roman, Times, serif;">
        <div class="header rounded-t-md" elevation="5">
            <v-row class="pa-2 text-cards">
                <v-col col="12" md="12">
                    <v-tabs
                        v-model="menu"
                        slider-color="#0c6b5e"
                        color="transparent"
                        active-class="active"
                        align-tabs="center"
                        >
                        <v-tab :value="1"><span class="text-h4">Phiếu mua hàng</span></v-tab>
                        <v-tab :value="2"><span class="text-h4">Phiếu chi phí khác</span></v-tab>
                                        
                    </v-tabs>
                </v-col>
            </v-row>
        </div>
        <div class="content">
            <v-window class="pl-0 ml-0" v-model="menu">
                <!-- Phiếu mua hàng -->
                <v-window-item
                    :value="1"
                >
                    <v-table class="">
                        <thead>
                            <tr>
                                <th class="text-subtitle-1 font-weight-semibold">STT</th>
                                <th class="text-subtitle-1 font-weight-semibold">Tên SP</th>
                                <th class="text-subtitle-1 font-weight-semibold">Đơn vị</th>
                                <th class="text-subtitle-1 font-weight-semibold">SL</th>
                                <th class="text-subtitle-1 font-weight-semibold">Giá nhập</th>
                                <th class="text-subtitle-1 font-weight-semibold">Thành tiền</th>
                                <th class="text-subtitle-1 font-weight-semibold">NCC</th>
                                <th class="text-subtitle-1 font-weight-semibold">Thao tác</th>
                            
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in listSlip" :key="item.id">
                                <td class="text-subtitle-1">{{ item.cus2 }}</td>
                                <td class="text-subtitle-1">{{ item.id }}</td>
                                <td class="text-subtitle-1">{{ item.id }}</td>
                                <td class="text-subtitle-1">{{ item.id }}</td>
                                <td class="text-subtitle-1">{{ item.id }}</td>
                                <td class="text-subtitle-1">{{ item.id }}</td>
                                <td class="text-subtitle-1">{{ item.id }}</td>
                                <td class="text-subtitle-1">{{ formatCurrency(item.cus8) }}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>

                                <td>Tổng thành tiền:</td>
                                <td>{{ formatCurrency(1000000) }}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                
                                <td>Chiết khấu(%):</td>
                                <td>{{ '17%' }}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                
                                <td class="text-h4"><b>Cần trả:</b></td>
                                <td class="text-h4" style="color: #e99152;"><b>{{ formatCurrency(1000000-(1000000*17/100)) }}</b></td>
                            </tr>
                        </tbody>
                    </v-table>

                    <v-row class="pa-2 d-flex justify-center">
                        <v-col col="12" md="6" class="pr-0">
                            <div class="d-flex">
                                <span class="text-h4"><b>Ghi chú:</b> </span>
                                <v-textarea
                                    class="mx-2"
                                    color="cyan"
                                    bg-color="grey-lighten-2"
                                ></v-textarea>
                            
                            </div>
                        </v-col>
                    </v-row>
                    <v-card-actions>
                        <v-btn class="height bg-primary mx-auto px-10" type="button"> <span class="text-h4">Tạo</span> </v-btn>
                    </v-card-actions>
                </v-window-item>

                <!-- Phiếu chi phí -->
                <v-window-item
                    :value="2"
                >
                    <v-row class="pa-0 px-2" >
                        <v-col col="12" md="6" class="ma-0 d-flex justify-center align-center">
                           
                                <span class="text-h5 mr-2"><b>Nhóm phí</b></span>
                            
                           
                                <v-select
                                label="Chọn phí"
                                :items="deviceShop"
                                item-title="name"
                                return-object
                                class=""
                                hide-details="auto"
                                ></v-select>
                            
                          
                            
                        </v-col>
                    </v-row>
                   
                    <v-row class="pa-0 px-2"> 
                        <v-col col="12" md="6">
                            <div class="text-center"><span class="text-h5">Chi phí cần chờ duyệt</span></div>
                            
                            <v-data-table
                                :headers="header"
                                :items="listSlip"
                                max-height="300"
                                item-value="name"
                                fixed-header
                                class="pt-4"
                            >
                                <template #bottom>

                                </template>
                            </v-data-table>
                        </v-col>

                        <v-col col="12" md="6">
                            <div class="text-center"><span class="text-h5">Chi phí không cần chờ duyệt</span></div>
                            <v-data-table
                                :headers="header"
                                :items="listSlip"
                                max-height="300"
                                item-value="name"
                                fixed-header
                                class="pt-4"
                            >
                                <template #bottom>

                                </template>
                            </v-data-table>
                        </v-col>
                    </v-row>
                    <v-row class="pa-2 justify-center">
                            <div class="text-center">
                                <v-checkbox
                                    :model-value="true"
                                    color="indigo"
                                    value="indigo"
                                    hide-details
                                    class="text-center text-h4"
                                >
                                <template v-slot:label>
                                    <span class="text-h3">Thanh toán sau</span>
                                </template>
                                </v-checkbox>
                            </div>
                    </v-row>
                    <v-card-actions>
                        <v-btn class="height bg-primary mx-auto px-10" type="button"> <span class="text-h4">Tạo</span> </v-btn>
                    </v-card-actions>
                    <div class="text-center text-h5 color-red"><i>(*) Vui lòng kiểm tra thông tin thanh toán trước khi tạo.</i></div>
                </v-window-item>
            </v-window> 
        </div>
    </div>
    <!-- </div> -->
</template>