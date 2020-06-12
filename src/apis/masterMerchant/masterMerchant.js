import { axiosCallApi } from '../index';
import CONFIG_API from '../configEndPoint';

export const addMasterMerchant = (params) => axiosCallApi(`${CONFIG_API.MERCHANT_REACT_APP_BACKEND_HOST}mms/merchant/mms_merchantcreate`, 'post', params);
export const getMerchantDetail = (params) => axiosCallApi(`${CONFIG_API.MERCHANT_REACT_APP_BACKEND_HOST}mms/merchant/getMerchantDetail`, 'post', params);
export const getMerchantCodeName = (params) => axiosCallApi(`${CONFIG_API.MERCHANT_REACT_APP_BACKEND_HOST}mms/merchant/getCacheMerchant`, 'post', params);
export const getTerminalListByMid = (params) => axiosCallApi(`${CONFIG_API.TERMINAL_REACT_APP_BACKEND_HOST}mms/terminal/getTerminalListByMid`, 'post', params);
export const getMerchantList = (params) => axiosCallApi(`${CONFIG_API.MERCHANT_REACT_APP_BACKEND_HOST}mms/merchant/getMerchantList`, 'post', params);
export const getMerchantListDenied = (params) => axiosCallApi(`${CONFIG_API.MERCHANT_REACT_APP_BACKEND_HOST}mms/merchant/getMerchantListDenied`, 'post', params);
export const getMerchantDetailDenied = (params) => axiosCallApi(`${CONFIG_API.MERCHANT_REACT_APP_BACKEND_HOST}mms/merchant/getMerchantDeniedInfo`, 'post', params);
export const getmerchantinfo = (params) => axiosCallApi(`${CONFIG_API.MERCHANT_REACT_APP_BACKEND_HOST}mms/merchant/getmerchantinfo`, 'post', params);
export const acceptMerchant = (params) => axiosCallApi(`${CONFIG_API.MERCHANT_REACT_APP_BACKEND_HOST}mms/merchant/acceptMerchant`, 'post', params);
export const deniedMerchant = (params) => axiosCallApi(`${CONFIG_API.MERCHANT_REACT_APP_BACKEND_HOST}mms/merchant/deniedMerchant`, 'post', params);
export const merchantupdate = (params) => axiosCallApi(`${CONFIG_API.MERCHANT_REACT_APP_BACKEND_HOST}mms/merchant/mms_merchantupdate`, 'post', params);
export const callApiLockOrUnlock = (params) => axiosCallApi(`${CONFIG_API.MERCHANT_REACT_APP_BACKEND_HOST}mms/merchant/changeStatus`, 'post', params);
