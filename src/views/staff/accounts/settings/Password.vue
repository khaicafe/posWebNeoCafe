<script lang='ts' setup>
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { ref } from 'vue';
import { useForm } from 'vee-validate';
import { schemaChangePassword as schema, vuetifyConfig } from '@/utils/validator';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const { defineComponentBinds, handleSubmit, isSubmitting } = useForm({
    validationSchema: schema
});

const router = useRouter();
const error = ref('');
const success = ref('');
const valid = ref(false);
const currentPass = defineComponentBinds('passwordCurrent', vuetifyConfig);
const newPass = defineComponentBinds('passwordNew', vuetifyConfig);
const confirmPass = defineComponentBinds('passwordConfirm', vuetifyConfig);

const onSubmit = handleSubmit(async (values) => {
    const authStore = useAuthStore();
    try {
        const data = await authStore.changePassword(values.passwordCurrent, values.passwordNew);
        success.value = data.message;
        error.value = '';
    } catch (err: any) {
        error.value = err.message;
        success.value = '';
    }
});
</script>

<template>
    <UiParentCard title='Change your password'>
        <v-form v-model='valid' class='mt-5' @submit='onSubmit'>
            <v-row class='align-center mb-3'>
                <v-col class='pb-sm-3 pb-0' cols='12' sm='3'>
                    <v-label class=' font-weight-medium'>Current password</v-label>
                </v-col>
                <v-col cols='12' sm='9'>
                    <v-text-field color='primary' placeholder='Current password' type='text'
                                  v-bind='currentPass' variant='outlined' />
                </v-col>
            </v-row>

            <v-row class='align-center mb-3'>
                <v-col class='pb-sm-3 pb-0' cols='12' sm='3'>
                    <v-label class=' font-weight-medium'>New Password</v-label>
                </v-col>
                <v-col cols='12' sm='9'>
                    <v-text-field color='primary' placeholder='New Password' type='text'
                                  v-bind='newPass' variant='outlined' />
                </v-col>
            </v-row>

            <v-row class='align-center mb-3'>
                <v-col class='pb-sm-3 pb-0' cols='12' sm='3'>
                    <v-label class=' font-weight-medium'>Confirm new password</v-label>
                </v-col>
                <v-col cols='12' sm='9'>
                    <v-text-field color='primary' placeholder='Confirm new password' type='text'
                                  v-bind='confirmPass' variant='outlined' />
                </v-col>
            </v-row>
            <v-row class='align-center mb-3'>
                <v-col class='pb-sm-3 pb-0' cols='12' sm='3'></v-col>
                <v-col class='pb-sm-3 pb-0' cols='12' sm='9'>
                    <div class='text-h6 mb-3'>Password requirements:</div>
                    <div class='text-subtitle-1 mb-3'>Ensure that these requirements are met:</div>
                    <ul class='ml-6'>
                        <li>Minimum 8 characters long - the more, the better</li>
                        <li>At least one lowercase character</li>
                        <li>At least one uppercase character</li>
                        <li>At least one number, symbol, or whitespace character</li>
                    </ul>
                </v-col>
            </v-row>
            <v-row class='align-center mb-3'>
                <div v-if='success' class='text-body-1 text-success mt-2'>
                    {{ success }}
                </div>
                <div v-if='error' class='text-body-1 text-error mt-2'>
                    {{ error }}
                </div>
                <v-btn :disabled='!valid' :loading='isSubmitting' class='ml-auto' color='primary' type='submit'
                       variant='flat'>Save changes
                </v-btn>
            </v-row>
        </v-form>
    </UiParentCard>
</template>
