import type { AxiosInstance } from 'axios';

class HttpFactory {
    protected axios: AxiosInstance;

    constructor(instance: AxiosInstance) {
        this.axios = instance;
    }
}

export { HttpFactory };
