// @ts-ignore
import { AuthRepo } from '@/repository/auth';
import { ReportRepo } from '@/repository/report';
import { VoucherRepo } from '@/repository/voucher';
import { ManagerReport } from '@/repository/ManagerReport';
import { posRepo } from '@/repository/posOnline';
import axios from 'axios';
import type { App } from 'vue';

interface ApiFactory {
    auth: AuthRepo,
    // report: ReportRepo,
    // inventories: InventoriesRepo
}

interface AxiosOptions {
    baseUrlBff?: string
    baseUrlOther?: string
}

export default {
    install: (app: App, options: AxiosOptions) => {
        const axiosBff = axios.create({
            baseURL: options.baseUrlBff,
            headers: {
                Accept: 'application/json'
            }
        })

        const axiosOther = axios.create({
            baseURL: options.baseUrlOther,
            headers: {
                Accept: 'application/json'
            }
        })
        // add api where khaitm
        const api = {
            auth: new AuthRepo(axiosBff),
            report: new ReportRepo(axiosOther),
            ManagerReport: new ManagerReport(axiosOther),
            voucher: new VoucherRepo(axiosOther),
            posOnline: new posRepo(axiosBff)
        }

        app.provide('$api', api);
        app.config.globalProperties.$api = api
    }
}
