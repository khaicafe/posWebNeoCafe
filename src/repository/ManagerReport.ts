import { HttpFactory } from '@/repository/factory';

class ManagerReport extends HttpFactory {
    getTotal(params: any) {
        return this.axios.get(`/v1/reports/branchs/ref-subscription`, { params });
    }
   
}

export { ManagerReport } ;
