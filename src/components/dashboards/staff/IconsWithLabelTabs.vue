<script setup lang="ts">
import { ref } from "vue";
import { HeartIcon, PhoneIcon, UserIcon, UsersGroupIcon, UserCancelIcon, BusinessplanIcon, HomeDollarIcon } from "vue-tabler-icons";
const tab = ref(null);
</script>

<template>
    <v-card elevation="0">
        <v-tabs v-model="tab" bg-color="primary" centered stacked>
            <v-tab value="1">
                <UsersGroupIcon stroke-width="1.5" width="20" />
                 Khách giới thiệu
            </v-tab>
            <v-tab value="2">
                <UserCancelIcon stroke-width="1.5" width="20" />
                 Khách hủy gia hạn
            </v-tab>
            <v-tab value="3">
                <BusinessplanIcon stroke-width="1.5" width="20" />
                Tiền giới thiệu nhận tạm
            </v-tab>
            <v-tab value="4">
                <HomeDollarIcon stroke-width="1.5" width="20" />
                Tiền ship tạm tính
            </v-tab>
        </v-tabs>
        <v-card-text class="bg-grey100 rounded-md mt-4">
            <v-window v-model="tab">
                <slot />
                
            </v-window>
        </v-card-text>
    </v-card>
</template>
