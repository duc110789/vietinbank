import {axiosCallApi} from '../index';
import CONFIG_API from '../configEndPoint';

export const getAllMasterMerchant = (params) => axiosCallApi(`${CONFIG_API.SYSTEM_REACT_APP_BACKEND_HOST}mms/system/getAllMasterMerchant`, 'get', params);
export const getAllBank = (params) => axiosCallApi(`${CONFIG_API.SYSTEM_REACT_APP_BACKEND_HOST}mms/system/getAllBank`, 'get', params);
export const getAllMccInternational = (params) => axiosCallApi(`${CONFIG_API.SYSTEM_REACT_APP_BACKEND_HOST}mms/system/getAllMccInternational`, 'get', params);
export const getAllProvince = (params) => axiosCallApi(`${CONFIG_API.SYSTEM_REACT_APP_BACKEND_HOST}mms/system/getAllProvince`, 'get', params);
export const getAllDistrictByProvince = (params) => axiosCallApi(`${CONFIG_API.SYSTEM_REACT_APP_BACKEND_HOST}mms/system/getAllDistrictByProvince`, 'post', params);
export const getAllBranchBank = (params) => axiosCallApi(`${CONFIG_API.SYSTEM_REACT_APP_BACKEND_HOST}mms/system/getAllBranchBank`, 'get', params);
export const getAllMccInterior = (params) => axiosCallApi(`${CONFIG_API.SYSTEM_REACT_APP_BACKEND_HOST}mms/system/getAllMccInterior`, 'get', params);
export const getAllBranchBankByUser = (params) => axiosCallApi(`${CONFIG_API.SYSTEM_REACT_APP_BACKEND_HOST}mms/system/getAllBranchBankByUser`, 'get', params);
export const getAllStaffByDepartment = (params) => axiosCallApi(`${CONFIG_API.SYSTEM_REACT_APP_BACKEND_HOST}mms/system/getAllStaffByDepartment`, 'post', params);
export const getAllStatusByType = (params) => axiosCallApi(`${CONFIG_API.SYSTEM_REACT_APP_BACKEND_HOST}mms/system/getAllStatusByType`, 'post', params);
export const getAllUser = (params) => axiosCallApi(`${CONFIG_API.SYSTEM_REACT_APP_BACKEND_HOST}mms/system/getAllUser`, 'get', params);
export const getAllMenu = (params) => axiosCallApi(`${CONFIG_API.SYSTEM_REACT_APP_BACKEND_HOST}mms/system/getAllMenu`, 'get', params);

export const getListMccManager = (params) => axiosCallApi(`${CONFIG_API.SYSTEM_REACT_APP_BACKEND_HOST}mms/mccInternation/getListMcc`, 'post', params);
export const updateStatusMcc = (params) => axiosCallApi(`${CONFIG_API.SYSTEM_REACT_APP_BACKEND_HOST}mms/mccInternation/updateStatusMcc`, 'post', params);
export const addMccManager = (params) => axiosCallApi(`${CONFIG_API.SYSTEM_REACT_APP_BACKEND_HOST}mms/mccInternation/addMcc`, 'post', params);
export const updateMccInfoManager = (params) => axiosCallApi(`${CONFIG_API.SYSTEM_REACT_APP_BACKEND_HOST}mms/mccInternation/updateMccInfo`, 'post', params);
export const getMccInfoManager = (params) => axiosCallApi(`${CONFIG_API.SYSTEM_REACT_APP_BACKEND_HOST}mms/mccInternation/getMccInfo`, 'post', params);

export const getListMccManagerInterior = (params) => axiosCallApi(`${CONFIG_API.SYSTEM_REACT_APP_BACKEND_HOST}mms/mccInterior/getListMccInterior`, 'post', params);
export const updateStatusMccInterior = (params) => axiosCallApi(`${CONFIG_API.SYSTEM_REACT_APP_BACKEND_HOST}mms/mccInterior/updateStatusMccInterior`, 'post', params);
export const addMccManagerInterior = (params) => axiosCallApi(`${CONFIG_API.SYSTEM_REACT_APP_BACKEND_HOST}mms/mccInterior/addMccInterior`, 'post', params);
export const updateMccInfoManagerInterior = (params) => axiosCallApi(`${CONFIG_API.SYSTEM_REACT_APP_BACKEND_HOST}mms/mccInterior/updateMccInteriorInfo`, 'post', params);
export const getMccInfoManagerInterior = (params) => axiosCallApi(`${CONFIG_API.SYSTEM_REACT_APP_BACKEND_HOST}mms/mccInterior/getMccInteriorInfo`, 'post', params);

export const getListDepartment = (params) => axiosCallApi(`${CONFIG_API.SYSTEM_REACT_APP_BACKEND_HOST}mms/department/getListDepartment`, 'post', params);
export const updateStatusDepartment = (params) => axiosCallApi(`${CONFIG_API.SYSTEM_REACT_APP_BACKEND_HOST}mms/department/updateStatusDepartment`, 'post', params);
export const addDepartment = (params) => axiosCallApi(`${CONFIG_API.SYSTEM_REACT_APP_BACKEND_HOST}mms/department/newDepartment`, 'post', params);
export const updateDepartmentInfo = (params) => axiosCallApi(`${CONFIG_API.SYSTEM_REACT_APP_BACKEND_HOST}mms/department/updateDepartmentInfo`, 'post', params);
export const getDepartmentInfo = (params) => axiosCallApi(`${CONFIG_API.SYSTEM_REACT_APP_BACKEND_HOST}mms/department/getDepartmentInfo`, 'post', params);
