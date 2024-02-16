import { createRouter, createWebHistory } from 'vue-router';
import TemplateRoutes from './TemplateRoutes';
import AuthRoutes from './AuthRoutes';
import MainRoutes from './MainRoutes';
import { useAuthStore } from '@/stores/auth';

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/:pathMatch(.*)*',
            component: () => import('@/views/authentication/Error.vue')
        },
        AuthRoutes,
        TemplateRoutes,
        MainRoutes
    ]
});

router.beforeEach(async (to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page

    console.log('router.beforeEach');

    const publicPages = ['/auth/login'];
    const authRequired = !publicPages.includes(to.path);
    const auth: any = useAuthStore();
    const isAuth = await auth.authenticated();

    console.log('router.beforeEach.to', to);
    console.log('router.beforeEach.from', from);
    console.log('router.beforeEach.authRequired', authRequired);
    console.log('router.beforeEach.auth.isAuth', isAuth);
    next();
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (authRequired && !isAuth) {
            auth.returnUrl = to.fullPath;
            // return next('/auth/login');
        } else {
            console.log('user 1')
            // next();
        }
    } else {
        console.log('user 2 ')
        // next();
    }
});
