
<script setup lang="ts">
import { router } from '@/router'
const props = defineProps({
    label: Object as any,
    title: String as any,
    money: {
        type: String,
        default: '0'
    },
    headers: {
      type: Array,
      default: () => []
    },
    package: {
        type: Object,
        default: () => {}
    }
});
async function router_page () {
    console.log('label', props.label)
    try {
        if (props.label.id === 1){
            // await router.push({ path: '/reports/total-customer-referrals' , params: { id: 'variable' } })
            await router.push({ name: 'Tổng khách giới thiệu' , params: { id: encodeURIComponent(JSON.stringify(props.package)) } })
        }else if (props.label.id === 2) {
            console.log('package', props.package)
            await router.push({ name: `Tổng khách hủy gia hạn`, params: { id: encodeURIComponent(JSON.stringify(props.package)) } })
        }else if (props.label.id === 5) {
            await router.push({ name: 'Danh sách nhân viên', params: { id: encodeURIComponent(JSON.stringify(props.package)) } })
        // }else if (props.label.id === 4) {
        //     await router.push({ name: '/reports/money-ship-estimated', params: { id: encodeURIComponent(JSON.stringify(props.package)) } })
        }
    } catch (error) {
        console.log(error)
    }
   
}
</script>
<template>
    <v-card elevation="10" class="bg-primary" @click="router_page">
        <v-card-text>
            <div class="d-flex align-start" style="height: 50px;">
                <h2 class="text-h4">{{ title }}</h2>
            </div>
            <div class="mt-4">
                <h2 class="text-h4 font-weight-regular">{{ money }}</h2>
            </div>
        </v-card-text>
    </v-card>
</template>
