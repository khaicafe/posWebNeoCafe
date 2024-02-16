import { HttpFactory } from '@/repository/factory';

class AuthRepo extends HttpFactory {
    testPermission() {
        return this.axios.get('/category/test');
    }
    userInfo() {
        return this.axios.get('/users/info');
    }
    changePassword(oldPass: string, newPass: string) {
        const data = {
            current_password: oldPass,
            new_password: newPass
        }
        return this.axios.post('/users/change-password', data);
    }
}

export { AuthRepo } ;
