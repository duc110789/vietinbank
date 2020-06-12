import { axiosCallApi } from './index';
import CONFIG_API from './configEndPoint';

// eslint-disable-next-line import/prefer-default-export
export const apiLogin = (params) => axiosCallApi(`${CONFIG_API.AUTHEN_NEW_MMS_BACKEND_HOST}mms/auth/login`, 'post', params);

export const apiLogout = (params) => axiosCallApi(`${CONFIG_API.AUTHEN_NEW_MMS_BACKEND_HOST}mms/auth/logout`, 'get', params);

export const apiResetPassword = (params) => axiosCallApi(`${CONFIG_API.AUTHEN_NEW_MMS_BACKEND_HOST}mms/auth/resetPassword`, 'post', params);

export const apiGetAccPersonalInfo = (params) => axiosCallApi(`${CONFIG_API.AUTHEN_NEW_MMS_BACKEND_HOST}mms/profile/getAccPersonalInfo`, 'get', params);

export const apiUpdateAccInfo = (params) => axiosCallApi(`${CONFIG_API.AUTHEN_NEW_MMS_BACKEND_HOST}mms/profile/updateAccInfo`, 'post', params);

export const apiAccChangePass = (params) => axiosCallApi(`${CONFIG_API.AUTHEN_NEW_MMS_BACKEND_HOST}mms/auth/changePassword`, 'post', params);
