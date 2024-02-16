
const y = new Date().getFullYear();
const m = new Date().getMonth();
const firstDayOfMonth = new Date(y, m, 1).toLocaleDateString('en-GB').split('/').reverse().join('-');
const lastDayOfMonth = new Date(y, m + 1, 0).toLocaleDateString('en-GB').split('/').reverse().join('-');

export { firstDayOfMonth, lastDayOfMonth };