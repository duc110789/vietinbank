import {axiosCallApi} from '../index';
import CONFIG_API from '../configEndPoint';

// eslint-disable-next-line import/prefer-default-export
export const getTransactionList = (params) => axiosCallApi(`${CONFIG_API.TRANSACTION_APP_BACKEND_HOST}mms/trans/getTrans`, 'post', params);
export const getTransactionDetail = (params) => axiosCallApi(`${CONFIG_API.TRANSACTION_APP_BACKEND_HOST}mms/trans/transDetail`, 'post', params);
export const getTransactionDetailRefund = (params) => axiosCallApi(`${CONFIG_API.TRANSACTION_APP_BACKEND_HOST}mms/refund/refundDetail`, 'post', params);
export const getTransactionListRefund = (params) => axiosCallApi(`${CONFIG_API.TRANSACTION_APP_BACKEND_HOST}mms/refund/getTransRefund`, 'post', params);
export const createTransactionRefund = (params) => axiosCallApi(`${CONFIG_API.TRANSACTION_APP_BACKEND_HOST}mms/refund/initRefund`, 'post', params);
export const updateTransactionStatusPayment = (params) => axiosCallApi(`${CONFIG_API.TRANSACTION_APP_BACKEND_HOST}mms/trans/updateTrans`, 'post', params);
export const updateTransactionStatusRefund = (params) => axiosCallApi(`${CONFIG_API.TRANSACTION_APP_BACKEND_HOST}mms/refund/updateStatusRefund`, 'post', params);
