<script setup lang="ts">
import { useRouter } from "vue-router";
import Logo from '@/layouts/full/logo/LogoDark.vue';
/* Login form */
import LoginForm from '@/components/auth/LoginUserPassForm.vue';


</script>
<style>
.v-application {
    background: #1c3833;
}
</style>
<template>
    <div class="pa-3" style="color: white;">
        <v-row class="h-100vh mh-100 auth">
            <!-- <v-col cols="12" lg="7" xl="8"
                class="d-lg-flex align-center justify-center authentication position-relative">
                <div class="auth-header pt-lg-6 pt-2 px-sm-6 px-3 pb-lg-6 pb-0">
                    <div class="position-relative">
                        <Logo />
                    </div>
                </div>
                <div class="">
                    <img src="@/assets/images/backgrounds/login-bg.svg" height="450" class="position-relative d-none d-lg-flex"
                        alt="login-background" />
                </div>
            </v-col> -->
            <v-col cols="12" class="d-flex align-center justify-center">
                <div style="width: 450px;">
                    <div class="d-flex align-center justify-center mb-6">
                        <img src="@/assets/images/logos/favicon.svg" height="100"
                            alt="login-background" />
                    </div>
                    <div class="d-flex align-center justify-center mb-6">
                        <h2 class="text-h3 font-weight-semibold mb-2">POS NeoCafe</h2>
                    </div>
                    <!-- <div class="text-subtitle-1 mb-6">Your Admin Dashboard</div> -->
                    <LoginForm />
<!--                    <h6 class="text-h6  text-medium-emphasis  d-flex align-center mt-6 font-weight-medium">-->
<!--                        New to Flexy?-->
<!--                        <v-btn class="pl-0 text-primary text-body-1 opacity-1 pl-2 font-weight-medium" height="auto"-->
<!--                            to="/auth/register" variant="plain">Create an account</v-btn>-->
<!--                    </h6>-->
                </div>
            </v-col>
        </v-row>
    </div>
</template>
