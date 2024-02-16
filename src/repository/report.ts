import { HttpFactory } from '@/repository/factory';

class ReportRepo extends HttpFactory {
    getlistPackage(params: any) {
        return this.axios.get(`/v1/subscriptions/packages/all`, { params });
    }

    getTotal(params: any) {
        return this.axios.get(`/v1/reports/staffs/ref-subscription`, { params });
    }

    expiredReferralDetails(params: any) {
        return this.axios.get(`/v1/reports/staffs/expired-referral-details`, { params });
    }

    referralDetails(params: any) {
        return this.axios.get(`/v1/reports/staffs/referral-details`, { params });
    }

    profitReferralDetails(params: any) {
        return this.axios.get(`/v1/reports/staffs/profit-referral-details`, { params });
    }

    profitShippingDetails(params: any) {
        return this.axios.get(`/v1/reports/staffs/profit-shipping-details`, { params });
    }

    // confirmDocument(params: any) {
    //     return this.axios.put(`/v1/documents/confirmed/${params.id}?approved=${params.approved}&approvedBy=${params.approvedBy}`)
    // }


}

export { ReportRepo } ;
