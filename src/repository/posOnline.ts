import { HttpFactory } from '@/repository/factory';

class posRepo extends HttpFactory {
    getListProd(shopId: any) {
        return this.axios.get(`/categories/shop/${shopId}`);
    }
    getVariant(shopId: any, prodId: any){
        return this.axios.get(`/product/${shopId}/${prodId}`);
    }
}

export { posRepo } ;
