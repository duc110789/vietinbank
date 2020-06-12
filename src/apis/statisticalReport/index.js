import {axiosCallApi} from '../index';
import CONFIG_API from '../configEndPoint';

export const getListTranFailed = (params) => axiosCallApi(`${CONFIG_API.STATISTICAL_REPORT_APP_BACKEND_HOST}mms/kdreport/kdtranfailed`, 'post', params);
export const getListTranInterMcc = (params) => axiosCallApi(`${CONFIG_API.STATISTICAL_REPORT_APP_BACKEND_HOST}mms/kdreport/kdsummerchanttype`, 'post', params);
export const getListTranMmc = (params) => axiosCallApi(`${CONFIG_API.STATISTICAL_REPORT_APP_BACKEND_HOST}mms/kdreport/dssummaster`, 'post', params);
export const getDetailTranBusiness = (params) => axiosCallApi(`${CONFIG_API.STATISTICAL_REPORT_APP_BACKEND_HOST}mms/kdreport/kdtransuccess`, 'post', params);
export const getListTranMerchant = (params) => axiosCallApi(`${CONFIG_API.STATISTICAL_REPORT_APP_BACKEND_HOST}mms/dsreport/dssummerchant`, 'post', params);
export const getListTranMerchantBranch = (params) => axiosCallApi(`${CONFIG_API.STATISTICAL_REPORT_APP_BACKEND_HOST}mms/dsreport/dssumbranch`, 'post', params);
export const getListTranTerminal = (params) => axiosCallApi(`${CONFIG_API.STATISTICAL_REPORT_APP_BACKEND_HOST}mms/dsreport/dssumterminal`, 'post', params);
export const getListTranRefund = (params) => axiosCallApi(`${CONFIG_API.STATISTICAL_REPORT_APP_BACKEND_HOST}mms/dsreport/dstranrefund`, 'post', params);
export const getDetailTransactionUpdate = (params) => axiosCallApi(`${CONFIG_API.STATISTICAL_REPORT_APP_BACKEND_HOST}mms/dsreport/dstranupdate`, 'post', params);
export const getDetailTransactionMake = (params) => axiosCallApi(`${CONFIG_API.STATISTICAL_REPORT_APP_BACKEND_HOST}mms/dsreport/dstransuccess`, 'post', params);
