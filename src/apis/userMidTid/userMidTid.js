import { axiosCallApi } from '../index';
import CONFIG_API from '../configEndPoint';

export const addUserMid = (params) => axiosCallApi(`${CONFIG_API.MID_TID_APP_BACKEND_HOST}mms/userMidTid/addUserTid`, 'post', params);
export const editUserMid = (params) => axiosCallApi(`${CONFIG_API.MID_TID_APP_BACKEND_HOST}mms/userMidTid/updateUserTid`, 'post', params);
export const getUserInfo = (params) => axiosCallApi(`${CONFIG_API.MID_TID_APP_BACKEND_HOST}mms/userMidTid/getUserInfo`, 'post', params);
export const getListUser = (params) => axiosCallApi(`${CONFIG_API.MID_TID_APP_BACKEND_HOST}mms/userMidTid/getListUser`, 'post', params);
export const getLockOrUnlock = (params) => axiosCallApi(`${CONFIG_API.MID_TID_APP_BACKEND_HOST}mms/userMidTid/updateStatusUserTid`, 'post', params);
export const resetPass = (params) => axiosCallApi(`${CONFIG_API.MID_TID_APP_BACKEND_HOST}mms/userMidTid/resetPass`, 'post', params);
