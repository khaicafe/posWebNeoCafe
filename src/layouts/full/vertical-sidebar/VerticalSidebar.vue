<script lang='ts' setup>
import { inject, shallowRef } from 'vue';
import { useCustomizerStore } from '@/stores/customizer';
import { getValidSidebarItems } from './sidebarItem';
import { useAuthStore } from '@/stores/auth';
import NavGroup from './NavGroup/index.vue';
import NavItem from './NavItem/index.vue';
import NavCollapse from './NavCollapse/NavCollapse.vue';
import Logo from '../logo/Logo.vue';

const can: any = inject('$can');
const sidebarItems = await getValidSidebarItems(can)
const customizer = useCustomizerStore();
const sidebarMenu = shallowRef(sidebarItems);
const authStore = useAuthStore();

</script>

<template>
    <v-navigation-drawer v-model='customizer.Sidebar_drawer' :rail='customizer.mini_sidebar' app class='leftSidebar'
                         elevation='0'
                         expand-on-hover left mobile-breakpoint='960' rail-width='88' width='256'>
        <div class='pa-5 pl-4'>
            <Logo />
        </div>
        <!-- ---------------------------------------------- -->
        <!---Navigation -->
        <!-- ---------------------------------------------- -->
        <perfect-scrollbar>
            <v-list class='py-6 px-4'>
                <!---Menu Loop -->
                <template v-for='(item, i) in sidebarMenu'>
                    <!---Item Sub Header -->
                    <NavGroup v-if='item.header' :key='item.title' :item='item' />
                    <!---If Has Child -->
                    <NavCollapse v-else-if='item.children' :item='item' :level='0' class='leftPadding' />
                    <!---Single Item-->
                    <NavItem v-else :item='item' class='leftPadding' />
                    <!---End Single Item-->
                </template>
            </v-list>
        </perfect-scrollbar>
    </v-navigation-drawer>
</template>
