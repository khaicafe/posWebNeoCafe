<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Darklogo from '@/assets/images/logos/logo-white.svg';
</script>
<template>
    <div class="logo">
        <RouterLink to="/">
            <img :src="Darklogo" alt="home" width="60" height="60"/>
        </RouterLink>
    </div>
</template>
