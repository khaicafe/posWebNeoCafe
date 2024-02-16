
// define a function to format a number to currency in VND
const formatCurrency = (number: any) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number? number:0)
}
const formatCurrencyPoint = (number: any) => {
    return (new Intl.NumberFormat('vi-VN').format(number)) + ' Point'
}
export { formatCurrency,  formatCurrencyPoint};