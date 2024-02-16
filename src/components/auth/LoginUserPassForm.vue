<script lang='ts' setup>
import google from '@/assets/images/svgs/google-icon.svg';
import facebook from '@/assets/images/svgs/facebook-icon.svg';

import { ref } from 'vue';
import { useForm } from 'vee-validate';
import { schemaLogin as schema, vuetifyConfig } from '@/utils/validator';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const { defineComponentBinds, handleSubmit, isSubmitting } = useForm({
    validationSchema: schema
});

const router = useRouter();
const error = ref('');
const valid = ref(false);
const rememberMe = ref(false);
const username = defineComponentBinds('username', vuetifyConfig);
const password = defineComponentBinds('password', vuetifyConfig);


const onSubmit = handleSubmit(async (values) => {
    console.log('Submitted with', values);
    const authStore = useAuthStore();
    try {
        await authStore.login(values.username, values.password);
    } catch (err: any) {
        error.value = err.message;
    }
});

</script>
<style>
.text-white input{
  color: white !important;
}
</style>
<template>
    <!-- <v-row class='d-flex mb-3'>
        <v-col class='pr-2' cols='6' sm='6'>
            <v-btn block class='border text-subtitle-1' size='large' variant='outlined'>
                <img :src='google' alt='google' class='mr-2' height='16' />
                <span class='d-sm-flex d-none mr-1'>Sign in with</span>Google
            </v-btn>
        </v-col>
        <v-col class='pl-2' cols='6' sm='6'>
            <v-btn block class='border text-subtitle-1' size='large' variant='outlined'>
                <img :src='facebook' alt='facebook' class='mr-1' height='25' width='25' />
                <span class='d-sm-flex d-none mr-1'>Sign in with</span>FB
            </v-btn>
        </v-col>
    </v-row> -->
    <!-- <div class='d-flex align-center text-center mb-6'>
        <div class='text-h6 w-100 px-5 font-weight-regular auth-divider position-relative'>
            <span class='bg-surface px-5 py-3 position-relative'>or sign in with</span>
        </div>
    </div> -->
    <v-form v-model='valid' class='mt-5' @submit='onSubmit'>
        <v-label class='text-subtitle-1 font-weight-medium pb-2 text-lightText'>Username</v-label>
        <VTextField
            :autofocus='true'
            class='mb-8 text-white'
            hide-details='auto'
            required
            v-bind='username'
        ></VTextField>
        <v-label class='text-subtitle-1 font-weight-medium pb-2 text-lightText'>Password</v-label>
        <VTextField
            class='pwdInput text-white'
            hide-details='auto'
            required
            type='password'
            v-bind='password'
        ></VTextField>
        <!-- <div class='d-flex flex-wrap align-center my-3 ml-n2'>
            <v-checkbox v-model='rememberMe' color='primary' hide-details required>
                <template v-slot:label class=''>Remember this Device</template>
            </v-checkbox>
            <div class='ml-sm-auto'>
                <RouterLink class='text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium' to=''
                >Forgot Password ?
                </RouterLink
                >
            </div>
        </div> -->
        <div v-if='error' class='text-body-1 text-error mt-2'>
            {{ error }}
        </div>
        <v-btn :disabled='!valid' :loading='isSubmitting' block class='mt-5' color='primary'
               flat size='large' type='submit'>Sign In
        </v-btn>
    </v-form>
</template>
