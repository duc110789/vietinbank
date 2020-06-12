import { axiosCallApi } from '../index';
import CONFIG_API from '../configEndPoint';

export const addQrCode = (params) => axiosCallApi(`${CONFIG_API.QR_REACT_APP_BACKEND_HOST}mms/qrcode/creatQrcode`, 'post', params);
export const getQrCode = (params) => axiosCallApi(`${CONFIG_API.QR_REACT_APP_BACKEND_HOST}mms/qrcode/getQrcode`, 'post', params);
export const getQrCodeList = (params) => axiosCallApi(`${CONFIG_API.QR_REACT_APP_BACKEND_HOST}mms/qrcode/getListQrcode`, 'post', params);
export const getLockOrUnlock = (params) => axiosCallApi(`${CONFIG_API.QR_REACT_APP_BACKEND_HOST}mms/qrcode/changeStatusQrcode`, 'post', params);
export const updateQrcode = (params) => axiosCallApi(`${CONFIG_API.QR_REACT_APP_BACKEND_HOST}mms/qrcode/updateQrcode`, 'post', params);
