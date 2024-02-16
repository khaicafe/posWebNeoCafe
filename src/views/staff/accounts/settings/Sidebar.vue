<script lang='ts' setup>
import { ref } from 'vue';
import {
    UserIcon,
    CircleDotIcon,
    DragDropIcon,
    FolderIcon,
    ChevronUpIcon,
    ChevronDownIcon,
    PasswordIcon, KeyIcon, SettingsIcon, GitBranchIcon
} from 'vue-tabler-icons';

const props = defineProps(['icon']);
const component = props.icon;
// List 1,3 Data
const list1 = ref([
    {
        name: 'Basic information',
        icon: UserIcon,
        id: 1,
        link: ''
    },
    {
        name: 'Password',
        icon: KeyIcon,
        id: 2,
        link: ''
    },
    {
        name: 'Preferences',
        icon: SettingsIcon,
        id: 3,
        link: ''
    },
    {
        name: 'Branch',
        icon: GitBranchIcon,
        id: 4,
        link: ''
    }
]);

</script>
<template>

    <v-card class='bg-surface py-2' variant='outlined'>
        <v-list>
            <v-list-item v-for='(list, i) in list1' :key='i' :value='list' active-color='primary' class='mb-2'
            >
                <template v-slot:prepend>
                    <component :is='list.icon' class='mr-2' size='20' stroke-width='1.5' />
                </template>
                <v-list-item-title v-text='list.name'></v-list-item-title>
            </v-list-item>
        </v-list>
    </v-card>

</template>
