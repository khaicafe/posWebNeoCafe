import { HttpFactory } from '@/repository/factory';

class VoucherRepo extends HttpFactory {
    getListVoucher(userid: any, params: any) {
        return this.axios.get(`/v1/voucher/user/${userid}`, { params });
    }
   
}

export { VoucherRepo } ;
