<script lang='ts' setup>
import Logo from '@/layouts/full/logo/LogoDark.vue';
import { ref } from 'vue';
import { submitNewPassword } from 'supertokens-web-js/recipe/emailpassword';
import { schemaChangePassword, vuetifyConfig } from '@/utils/validator';
import { useForm } from 'vee-validate';

const { handleSubmit, defineComponentBinds, isSubmitting } = useForm({
    validationSchema: schemaChangePassword
});

const error = ref('');
const valid = ref(false);
const password = defineComponentBinds('password', vuetifyConfig);
const passwordConfirm = defineComponentBinds('passwordConfirm', vuetifyConfig);

const onSubmit = handleSubmit(async (values) => {
    console.log('Submitted with', values);
    console.log('Submitted with', values.password);

    try {
        let response = await submitNewPassword({
            formFields: [{
                id: 'password',
                value: values.password
            }]
        });

        if (response.status === 'FIELD_ERROR') {
            response.formFields.forEach(formField => {
                if (formField.id === 'password') {
                    // New password did not meet password criteria on the backend.
                    // window.alert(formField.error);
                    error.value = formField.error;
                }
            });
        } else if (response.status === 'RESET_PASSWORD_INVALID_TOKEN_ERROR') {
            // the password reset token in the URL is invalid, expired, or already consumed
            error.value = 'Password reset failed. Please try again';
        } else {
            window.alert('Password reset successful!');
            window.location.assign('/auth/login');
        }
    } catch (err: any) {
        if (err.isSuperTokensGeneralError === true) {
            // this may be a custom error message sent from the API by you.
            error.value = err.message;
        } else {
            error.value = 'Oops! Something went wrong.';
        }
    }
});
</script>

<template>
    <div class='pa-3'>
        <v-row class='h-100vh mh-100 auth'>
            <v-col class='d-lg-flex align-center justify-center authentication position-relative' cols='12' lg='8'
                   xl='8'
                   xxl='9'>
                <div class='auth-header pt-sm-6 pt-2 px-sm-6 px-3 pb-sm-6 pb-0'>
                    <div class='position-relative'>
                        <Logo />
                    </div>
                </div>
                <div class=''>
                    <img alt='login-background' class='position-relative d-none d-lg-flex' height='450'
                         src='@/assets/images/backgrounds/neocafe-logo.png' />
                </div>
            </v-col>
            <v-col class='d-flex align-center justify-center bg-surface' cols='12' lg='4' xl='4' xxl='3'>
                <div class='pa-sm-7 pa-4'>
                    <h2 class='text--darken-2 text-h4 font-weight-semibold'>Reset your password?</h2>
                    <p class='text-subtitle-1 text-medium-emphasis py-4 text-10'>
                        Please enter a new password to update credentials to access the system
                    </p>
                    <v-form v-model='valid' class='mt-sm-13 mt-8' @submit='onSubmit'>
                        <v-label class='text-subtitle-1 font-weight-medium pb-2 text-lightText'>New password</v-label>
                        <VTextField
                            class='mb-8'
                            hide-details='auto'
                            required
                            type='password'
                            v-bind='password'
                            :autofocus='true'
                        ></VTextField>
                        <v-label class='text-subtitle-1 font-weight-medium pb-2 text-lightText'>Confirm Password</v-label>
                        <VTextField
                            class='mb-8'
                            hide-details='auto'
                            required
                            type='password'
                            v-bind='passwordConfirm'
                        ></VTextField>
                        <div v-if='error' class='text-body-1 text-error mt-2'>
                            {{ error }}
                        </div>
                        <v-btn :disabled='!valid' :loading='isSubmitting' block class='mt-5' color='primary'
                               flat size='large' type='submit'>Change Password
                        </v-btn>
                    </v-form>
                    <v-btn block class='mt-5 text-primary' color='lightprimary' flat size='large' to='/auth/login'>Back
                        to Login
                    </v-btn>
                </div>
            </v-col>
        </v-row>
    </div>
</template>
