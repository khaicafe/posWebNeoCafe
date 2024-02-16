
const MainRoutes = {
    path: '/main',
    meta: {
        requiresAuth: true
    },
    redirect: '/main',
    component: () => import('@/layouts/full/FullLayout.vue'),
    children: [
        {
            path: '/',
            // redirect: "/PosOnlines",
            component: () => import('@/layouts/full/FullLayout.vue'),
        },
        // {
        //     name: 'POS',
        //     path: '/PosOnlines',
        //     component: () => import('@/views/PosOnline/Pos.vue'),
        // },
        // {
        //     name: 'Dashboard',
        //     path: '/dashboards',
        //     component: () => import('@/views/staff/Dashboard.vue'),
        // },
        // {
        //     name: 'Tổng khách giới thiệu',
        //     path: '/reports/total-customer-referrals',
        //     component: () => import('@/views/staff/reports/GuestIntroduction.vue'),
        // },
        // {
        //     name: 'Tổng khách hủy gia hạn',
        //     path: '/reports/total-customer-canceled',
        //     // props: route => ({ query: route.query.q }),
        //     component: () => import('@/views/staff/reports/CustomerCancelsRenewal.vue'),
        // },
        // {
        //     name: 'Tiền giới thiệu tạm tính',
        //     path: '/reports/money-referral-estimated',
        //     component: () => import('@/views/staff/reports/ReferralMoneyReceived.vue'),
        // },
        // {
        //     name: 'Tiền ship tạm tính',
        //     path: '/reports/money-ship-estimated',
        //     component: () => import('@/views/staff/reports/ShippingFeeEstimated.vue'),
        // },
        // {
        //     name: 'Voucher',
        //     path: '/voucher/list-voucher',
        //     component: () => import('@/views/staff/voucher/listVoucher.vue'),
        // },
        // {
        //     name: 'Account setting',
        //     path: '/accounts/settings',
        //     component: () => import('@/views/staff/accounts/settings/Setting.vue'),
        // },
        // // manager
        // {
        //     name: 'ManagerReports',
        //     path: '/dashboards/manager-staff',
        //     component: () => import('@/views/ManagerStaff/Dashboard.vue'),
        // },
        // {
        //     name: 'Danh sách nhân viên',
        //     path: '/reports/listStaffs',
        //     component: () => import('@/views/ManagerStaff/reports/listStaffs.vue'),
        // },
    ]
};

export default MainRoutes;
