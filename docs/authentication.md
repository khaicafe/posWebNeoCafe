# Documentation for Authentication

## Authentication with Supertokens
#### Documentation
- [Supertokens docs](https://supertokens.com/docs/guides)

## Authorization with RBAC
#### Usage in Vue Component
```vue
// Usage with setup script

<script lang='ts' setup>
import { ref, onMounted, inject } from 'vue';

const can: any = inject('$can');
const canViewDashboard = ref(false);
const canViewUsers = ref(false);

// Must be checked that permission can be accessed on `onMounted` hook
onMounted(async () => {
    canViewDashboard.value = await can('GET:manager/dashboard');
    canViewUsers.value = await can('GET:manager/users');
    
    console.log('Accessed with `GET:manager/dashboard` is ', canViewDashboard.value);
    console.log('Accessed with `GET:manager/users` is ', canViewUsers.value);
});

</script>

// Usage with template
<template>
    <div v-if='canViewDashboard'>Can view Manager Dashboard</div>
    <div v-if='canViewUsers'>Can view Users list</div>
</template>
```

#### Documentation
- [Supertokens Docs](https://supertokens.com/docs/userroles/protecting-routes#protecting-frontend-routes)

