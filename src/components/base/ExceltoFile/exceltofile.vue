<template>
    <v-btn
        :class='isClassed'
        class='ml-auto' color='primary'
        flat
        @click='checkClick'
    >
        <v-icon>mdi-microsoft-excel</v-icon>
    </v-btn>
</template>

<script>
import { defineComponent } from 'vue';
import { useToast } from 'vue-toastification';
import writeXlsxFile from 'write-excel-file';

export default defineComponent({
    props: {
        schema: {
            type: Array,
            default: () => []
        },
        objects: {
            type: Array,
            default: () => []
        },
        fileName: {
            type: String,
            default: () => ''
        },
        sheetNames: {
            type: Array,
            default: () => []
        },
        data: {
            type: Array,
            default: () => []
        },
        columns: {
            type: Array,
            default: () => []
        },
        isClassed: {
            type: String,
            default: () => ''
        },
        files: {
            type: String,
            default: () => ''
        },
        fileName2: {
            type: String,
            default: () => ''
        },
        sheetNames2: {
            type: Array,
            default: () => []
        },
        data2: {
            type: Array,
            default: () => []
        },
        columns2: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            toast: useToast()
        };
    },
    methods: {
        async checkClick() {
            // const col = JSON.parse(JSON.stringify(this.columns))
            console.log('format excel', this.data, this.columns);
            if (this.data && this.columns.length > 0) {
                switch (this.files) {
                    case '1 file': // format excel
                        await writeXlsxFile(this.data, {
                            columns: this.columns,
                            sheets: this.sheetNames,
                            fileName: this.fileName + '.xlsx',
                            fontSize: 12
                        });
                        break;
                    case '2 file': // different format excel
                        await writeXlsxFile(this.data, {
                            columns: this.columns,
                            sheets: this.sheetNames,
                            fileName: this.fileName + '.xlsx',
                            fontSize: 12
                        });
                        await writeXlsxFile(this.data2, {
                            columns: this.columns2,
                            sheets: this.sheetNames2,
                            fileName: this.fileName2 + '.xlsx',
                            fontSize: 12
                        });
                        break;
                }
            }
            this.toast.success('Xuất file excel', {
                timeout: 2000
            });
        },
        // test export excel follow format
        async exportToExcel() {
            const columnExcel = [
                [
                    {
                        width: 20
                    },
                    {
                        width: 11
                    },
                    {
                        width: 5
                    },
                    {
                        width: 5
                    },
                    {
                        width: 9
                    },
                    {
                        width: 8
                    },
                    {
                        width: 12
                    },
                    {
                        width: 8
                    },
                    {
                        width: 13
                    }
                ]
            ];
            const dataExcel = [
                [
                    {
                        value: 'FILE MẪU CHỨNG TỪ BÁN HÀNG ĐỂ NHẬP VÀO PHẦN MỀM AMIS ACCOUNTING',
                        span: 10,
                        backgroundColor: '#e2efda',
                        fontWeight: 'bold',
                        align: 'left',
                        height: 17,
                        fontSize: 16,
                        fontFamily: 'Times New Roman'
                    },
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null
                ],
                [
                    {
                        value: 'Hướng dẫn:',
                        color: '#f0030340',
                        span: 10,
                        backgroundColor: '#e2efda',
                        align: 'left',
                        height: 17,
                        fontSize: 11,
                        fontFamily: 'Times New Roman'
                    },
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null
                ],
                [
                    {
                        value: '- Điền dữ liệu vào các cột tương ứng trên file này',
                        span: 10,
                        backgroundColor: '#e2efda',
                        align: 'left',
                        height: 17,
                        fontSize: 11,
                        fontFamily: 'Times New Roman'
                    },
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null
                ],
                [
                    {
                        value: '- Các cột có dấu (*) là những cột bắt buộc',
                        span: 10,
                        backgroundColor: '#e2efda',
                        fontStyle: 'italic',
                        align: 'left',
                        height: 13,
                        fontSize: 11,
                        fontFamily: 'Times New Roman'
                    },
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null
                ],
                [
                    {
                        value: '- Nếu muốn nhập nhiều thông tin hơn người dùng có thể tải mẫu đầy đủ/hoặc tự thêm cột trên mẫu cơ bản',
                        span: 10,
                        backgroundColor: '#e2efda',
                        fontStyle: 'italic',
                        align: 'left',
                        height: 17,
                        fontSize: 11,
                        fontFamily: 'Times New Roman'
                    },
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null
                ],
                [
                    {
                        value: '- Các dòng dữ liệu phía dưới chỉ là ví dụ minh họa',
                        span: 10,
                        backgroundColor: '#e2efda',
                        fontStyle: 'italic',
                        align: 'left',
                        height: 17,
                        fontSize: 11,
                        fontFamily: 'Times New Roman'
                    },
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null
                ],
                [
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    {
                        value: 'Chi tiết hàng tiền',
                        span: 25,
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 20,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    {
                        value: 'Hình thức bán hàng',
                        span: 7,
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 20,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null
                ],
                [
                    {
                        value: 'Hình thức bán hàng',
                        backgroundColor: '#ccecff',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: 'Phương thức thanh toán',
                        backgroundColor: '#ccecff',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: 'Kiêm phiếu xuất kho',
                        backgroundColor: '#ccecff',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: 'Lập kèm hóa đơn',
                        backgroundColor: '#ccecff',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: 'Đã lập hóa đơn',
                        backgroundColor: '#ccecff',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: 'Ngày hạch toán (*)',
                        backgroundColor: '#ccecff',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: 'Ngày chứng từ (*)',
                        backgroundColor: '#ccecff',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: 'Số chứng từ (*)',
                        backgroundColor: '#ccecff',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: 'Số phiếu xuất',
                        backgroundColor: '#ccecff',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: 'Mẫu số HĐ',
                        backgroundColor: '#ccecff',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: 'Ký hiệu HĐ',
                        backgroundColor: '#ccecff',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: 'Số hóa đơn',
                        backgroundColor: '#ccecff',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: 'Ngày hóa đơn',
                        backgroundColor: '#ccecff',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: 'Mã khách hàng',
                        backgroundColor: '#ccecff',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: 'Tên khách hàng',
                        backgroundColor: '#ccecff',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: 'Địa chỉ',
                        backgroundColor: '#ccecff',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: 'Mã số thuế',
                        backgroundColor: '#ccecff',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: 'Đơn vị giao đại lý',
                        backgroundColor: '#ccecff',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: 'Người nộp',
                        backgroundColor: '#ccecff',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: 'Nộp vào TK',
                        backgroundColor: '#ccecff',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: 'Diễn giải/Lý do nộp',
                        backgroundColor: '#ccecff',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: 'Lý do xuất',
                        backgroundColor: '#ccecff',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: 'Loại tiền',
                        backgroundColor: '#ccecff',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: 'Tỷ giá',
                        backgroundColor: '#ccecff',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },

                    {
                        value: 'Mã hàng (*)',
                        backgroundColor: '#ededed',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: 'Tên hàng',
                        backgroundColor: '#ededed',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: 'Là dòng ghi chú',
                        backgroundColor: '#ededed',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: 'Hàng khuyến mại',
                        backgroundColor: '#ededed',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: 'TK Tiền/Chi phí/Nợ (*)',
                        backgroundColor: '#ededed',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: 'TK Doanh thu/Có (*)',
                        backgroundColor: '#ededed',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: 'ĐVT',
                        backgroundColor: '#ededed',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: 'Số lượng',
                        backgroundColor: '#ededed',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: 'Đơn giá',
                        backgroundColor: '#ededed',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: 'Thành tiền',
                        backgroundColor: '#ededed',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: 'Thành tiền quy đổi',
                        backgroundColor: '#ededed',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: 'Tỷ lệ CK (%)',
                        backgroundColor: '#ededed',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: 'Tiền chiết khấu',
                        backgroundColor: '#ededed',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: 'Tiền chiết khấu quy đổi',
                        backgroundColor: '#ededed',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: 'TK chiết khấu',
                        backgroundColor: '#ededed',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: 'Giá tính thuế XK',
                        backgroundColor: '#ededed',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: '% thuế xuất khẩu',
                        backgroundColor: '#ededed',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: 'Tiền thuế xuất khẩu',
                        backgroundColor: '#ededed',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: 'TK thuế xuất khẩu',
                        backgroundColor: '#ededed',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: '% thuế GTGT',
                        backgroundColor: '#ededed',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: '% thuế suất KHAC',
                        backgroundColor: '#ededed',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: 'Tiền thuế GTGT',
                        backgroundColor: '#ededed',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: 'Tiền thuế GTGT quy đổi',
                        backgroundColor: '#ededed',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: 'TK thuế GTGT',
                        backgroundColor: '#ededed',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: 'HH không TH trên tờ khai thuế GTGT',
                        backgroundColor: '#ededed',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },

                    {
                        value: 'Mã kho',
                        backgroundColor: '#ccecff',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: 'TK giá vốn',
                        backgroundColor: '#ccecff',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: 'TK Kho',
                        backgroundColor: '#ccecff',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: 'Đơn giá vốn',
                        backgroundColor: '#ccecff',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: 'Tiền vốn',
                        backgroundColor: '#ccecff',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: 'Hàng hóa giữ hộ/bán hộ',
                        backgroundColor: '#ccecff',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    },
                    {
                        value: 'Không cập nhật giá xuất',
                        backgroundColor: '#ccecff',
                        fontWeight: 'bold',
                        align: 'center',
                        fontSize: 11,
                        height: 36,
                        alignVertical: 'center',
                        fontFamily: 'Times New Roman',
                        borderStyle: 'thin',
                        wrap: true
                    }

                ]
            ];

            // Xuất file Excel test
            await writeXlsxFile([dataExcel], {
                columns: columnExcel,
                sheets: ['sheetNamesa'],
                fileName: 'fileName' + '.xlsx',
                fontSize: 12
            });
        }
    }
});
</script>
