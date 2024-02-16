<script setup lang="ts">
import { ref, watch } from 'vue';

const password = ref('');
const valid = ref(false);
const loading = ref(false);

const passwordRules = ref([
    (v: string) => !!v || 'Password is required',
    (v: string) => (v && v.length <= 10) || 'Password must be less than 10 characters'
]);

const emit = defineEmits(["submit"]);
const submit = () => {
  emit("submit", password);
}

</script>
<template>
    <Form v-model="valid" @submit.prevent="submit" class="mt-sm-13 mt-8">
        <v-label class="text-subtitle-1 font-weight-medium pb-2 text-lightText">New password</v-label>
        <VTextField
            v-model="password"
            :rules="passwordRules"
            required
            hide-details="auto"
            type="password"
            class="pwdInput"
        ></VTextField>
        <v-btn :loading="loading" :disabled="!valid" class="mt-5" size="large" color="primary" type="submit" block flat>Change Password</v-btn>
    </Form>
</template>
