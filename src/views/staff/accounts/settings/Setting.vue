<script lang='ts' setup>
import { ref, onMounted, inject } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import Sidebar from '@/views/staff/accounts/settings/Sidebar.vue';
import Password from '@/views/staff/accounts/settings/Password.vue';

const page = ref({ title: 'Tài khoản' });
const breadcrumbs = ref([
    {
        text: 'Dashboard',
        disabled: false,
        href: '/'
    },
    {
        text: 'Accounts',
        disabled: false,
        href: '#'
    },
    {
        text: 'Settings',
        disabled: true,
        href: '#'
    }
]);

</script>

<template>
    <BaseBreadcrumb :breadcrumbs='breadcrumbs' :title='page.title'></BaseBreadcrumb>
    <v-row class='mt-4'>
        <!-- <v-col cols='12' lg='3' md='3'>
            <Sidebar />
        </v-col> -->
        <v-col cols='12' lg='9' md='9'>
            <v-row>
<!--                <v-col cols='12' md='12'>-->
<!--                    <UiParentCard title='Change your password'>-->
<!--                        <BasicLayout2 />-->
<!--                    </UiParentCard>-->
<!--                </v-col>-->
                <v-col cols='12' md='12'>
                    <Password />
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
