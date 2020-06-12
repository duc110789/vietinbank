import {axiosCallApi} from '../index';
import CONFIG_API from '../configEndPoint';

// eslint-disable-next-line import/prefer-default-export
export const apiGetAllGroupRole = (params) => axiosCallApi(`${CONFIG_API.SYSTEM_REACT_APP_BACKEND_HOST}mms/system/getAllGroupRole`, 'get', params);

export const apiGetAllBranchBankByUser = (params) => axiosCallApi(`${CONFIG_API.SYSTEM_REACT_APP_BACKEND_HOST}mms/system/getAllBranchBank`, 'get', params);

export const apiGetDataListPage = (params) => axiosCallApi(`${CONFIG_API.AUTHEN_NEW_MMS_BACKEND_HOST}mms/account/listAccount`, 'post', params);

export const apiAddNewUser = (params) => axiosCallApi(`${CONFIG_API.AUTHEN_NEW_MMS_BACKEND_HOST}mms/account/insertAccount`, 'post', params);

export const apiGetDataUserById = (params) => axiosCallApi(`${CONFIG_API.AUTHEN_NEW_MMS_BACKEND_HOST}mms/account/userLocalDetail`, 'post', params);

export const apiUpdateNewAccount = (params) => axiosCallApi(`${CONFIG_API.AUTHEN_NEW_MMS_BACKEND_HOST}mms/account/updateAccount`, 'post', params);

export const apiResetPasswordLocalAcc = (params) => axiosCallApi(`${CONFIG_API.AUTHEN_NEW_MMS_BACKEND_HOST}mms/account/changePasswordLocal`, 'post', params);

export const apigetListStaff = (params) => axiosCallApi(`${CONFIG_API.AUTHEN_NEW_MMS_BACKEND_HOST}mms/staff/getListStaff`, 'post', params);

export const apiUpdateStatusStaff = (params) => axiosCallApi(`${CONFIG_API.AUTHEN_NEW_MMS_BACKEND_HOST}mms/staff/updateStatusStaff`, 'post', params);

export const apiAddNewStaff = (params) => axiosCallApi(`${CONFIG_API.AUTHEN_NEW_MMS_BACKEND_HOST}mms/staff/newStaff`, 'post', params);

export const apiGetInfoStaff = (params) => axiosCallApi(`${CONFIG_API.AUTHEN_NEW_MMS_BACKEND_HOST}mms/staff/getStaffInfo`, 'post', params);


export const apiUpdateInfoStaff = (params) => axiosCallApi(`${CONFIG_API.AUTHEN_NEW_MMS_BACKEND_HOST}mms/staff/updateStaffInfo`, 'post', params);

export const apiListGroup = (params) => axiosCallApi(`${CONFIG_API.AUTHEN_NEW_MMS_BACKEND_HOST}mms/group/listGroup`, 'post', params);

export const apiGetAllListFunction = (params) => axiosCallApi(`${CONFIG_API.SYSTEM_REACT_APP_BACKEND_HOST}mms/system/getAllFunction`, 'get', params);

export const apigetGroupDetailRoles = (params) => axiosCallApi(`${CONFIG_API.AUTHEN_NEW_MMS_BACKEND_HOST}mms/group/groupDetail`, 'post', params);

export const apiAddNewRoles = (params) => axiosCallApi(`${CONFIG_API.AUTHEN_NEW_MMS_BACKEND_HOST}mms/group/insertGroup`, 'post', params);

export const apiEditRoles = (params) => axiosCallApi(`${CONFIG_API.AUTHEN_NEW_MMS_BACKEND_HOST}mms/group/updateGroup`, 'post', params);

export const apiLockAndUnlockRoles = (params) => axiosCallApi(`${CONFIG_API.AUTHEN_NEW_MMS_BACKEND_HOST}mms/group/lockAndUnlockRoles`, 'post', params);

export const apiUpdateStatusLocalAccount = (params) => axiosCallApi(`${CONFIG_API.AUTHEN_NEW_MMS_BACKEND_HOST}mms/account/updateStatusAccount`, 'post', params);
