import { defineStore } from 'pinia';
import { router } from '@/router';
import Session from 'supertokens-web-js/recipe/session';
import { signIn } from 'supertokens-web-js/recipe/emailpassword';


export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        // @ts-ignore
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null
    }),
    actions: {
        async authenticated() {
            try {
                // if (await Session.doesSessionExist()) {
                //     let accessTokenPayload = await Session.getAccessTokenPayloadSecurely();
                //     let customClaimValue = accessTokenPayload.customClaim;
                //     console.log('accessTokenPayload', accessTokenPayload);
                //     console.log('customClaimValue', customClaimValue);
                //     return true;
                // }
                return true;
            } catch (error) {
                console.log(error)
                return false;
            }
        },
        async login(username: string, password: string) {
            console.log('user name', username, password)
            try {
                let response = await signIn({
                    formFields: [{
                        id: 'email',
                        value: username
                    }, {
                        id: 'password',
                        value: password
                    }]
                });

                if (response.status === 'FIELD_ERROR') {
                    response.formFields.forEach(formField => {
                        if (formField.id === 'email') {
                            // Email validation failed (for example incorrect email syntax).
                            throw new Error(formField.error);
                        }
                    });
                } else if (response.status === 'WRONG_CREDENTIALS_ERROR') {
                    throw new Error('Email password combination is incorrect.');
                } else {
                    try {
                        // sign in successful. The session tokens are automatically handled by
                        // the frontend SDK.
                        // @ts-ignore
                        const { data } = await this.$api.auth.userInfo();
                        // update pinia state
                        this.user = data.user;
                        console.log('user', this.user, data);
                        // store user details and jwt in local storage to keep user logged in between page refreshes
                        localStorage.setItem('user', JSON.stringify(this.user));
                        // redirect to previous url or default to home page
                        await router.push(this.returnUrl || '/PosOnlines');
                    } catch (error) {
                        console.log(error)
                    }
                }
            } catch (err: any) {
                // test
                await router.push(this.returnUrl || '/PosOnlines');
                throw new Error(err.message);
                
            }
        },
        async changePassword(passwordCurrent: string, password: string): Promise<any> {
            try {
                // @ts-ignore
                const { data } = await this.$api.auth.changePassword(passwordCurrent, password);
                return new Promise((resolve) => {
                    resolve(data);
                });
            } catch (e: any) {
                throw new Error(e.response.data ? e.response.data.error : e.message);
            }
        },
        async logout() {
            console.log('logout');
            try {
                await Session.signOut();
                await router.push('/auth/login');
                this.user = null;
                localStorage.removeItem('user');
            } catch (e) {
                console.log('logout error', e);
            }
        }
    }
});
