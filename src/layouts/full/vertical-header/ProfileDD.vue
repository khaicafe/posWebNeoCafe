<script lang='ts' setup>
import { ref } from 'vue';
import { MailIcon } from 'vue-tabler-icons';
import { profileDD } from '@/_mockApis/headerData';
import { useAuthStore } from '@/stores/auth';
import { values } from 'lodash';

const authStore = useAuthStore();
const fullName = authStore.user ? authStore.user.first_name + ' ' + authStore.user.last_name : '';
const username = authStore.user ? authStore.user.username : '';
const role = 'Admin';
const isSubmitting = ref(false);
const submit = () => {
    isSubmitting.value = true;
    authStore.logout();
    // isSubmitting.value = false;
};

</script>

<template>
    <!-- ---------------------------------------------- -->
    <!-- notifications DD -->
    <!-- ---------------------------------------------- -->
    <v-menu :close-on-content-click='false'>
        <template v-slot:activator='{ props }'>
            <v-btn class='custom-hover-primary' icon v-bind='props' variant='text'>
                <v-avatar size='35'>
                    <img alt='Julia' src='@/assets/images/profile/user-8.jpg' width='35' />
                </v-avatar>
            </v-btn>
        </template>
        <v-sheet elevation='10' rounded='md' width='360'>
            <div class='px-8 pt-6'>
                <h6 class='text-h5 font-weight-medium'>User Profile</h6>
                <div class='d-flex align-center mt-4 pb-6'>
                    <v-avatar size='80'>
                        <img src='@/assets/images/profile/user-8.jpg' width='80' />
                    </v-avatar>
                    <div class='ml-3'>
                        <h6 class='text-h6 mb-n1'>{{ fullName }}</h6>
                        <span class='text-subtitle-1 font-weight-regular textSecondary'>{{ role }}</span>
                        <div class='d-flex align-center mt-1'>
                            <MailIcon size='18' stroke-width='1.5' />
                            <span
                                class='text-subtitle-1 font-weight-regular textSecondary ml-2'>{{ username }}</span>
                        </div>
                    </div>
                </div>
                <v-divider></v-divider>
            </div>
            <perfect-scrollbar style='height: calc(100vh - 240px); max-height: 240px'>
                <v-list class='py-0 theme-list' lines='two'>
                    <v-list-item v-for='item in profileDD' :key='item.title' :to='item.href'
                                 class='py-4 px-8 custom-text-primary'>
                        <template v-slot:prepend>
                            <v-avatar class='mr-3' color='lightprimary' rounded='md' size='48'>
                                <v-img :alt='item.avatar' :src='item.avatar' height='24' width='24' />
                            </v-avatar>
                        </template>
                        <div>
                            <h6 class='text-subtitle-1 font-weight-semibold mb-1 custom-title'>{{ item.title }}</h6>
                        </div>
                        <p class='text-subtitle-1 font-weight-regular text-medium-emphasis'>{{ item.subtitle }}</p>
                    </v-list-item>
                </v-list>
            </perfect-scrollbar>
            <!--            <div class='px-8 py-3'>-->
            <!--                <div class='bg-lightprimary rounded-md pa-5 overflow-hidden position-relative'>-->
            <!--                    <h5 class='text-h6'>-->
            <!--                        Unlimited<br />-->
            <!--                        Access-->
            <!--                    </h5>-->
            <!--                    <v-btn class='mt-3' color='primary' variant='flat'>Upgrade</v-btn>-->
            <!--                    <img alt='bg-img' class='right-pos-img' src='@/assets/images/backgrounds/unlimited-bg.png' />-->
            <!--                </div>-->
            <!--            </div>-->
            <div class='pt-4 pb-6 px-8 text-center'>
                <v-btn :loading='isSubmitting' block color='primary' variant='outlined' @click='submit'>Logout</v-btn>
            </div>
        </v-sheet>
    </v-menu>
</template>
