import * as constants from '../../constants/system/systemModuleConstant';

export const getAllMasterMerchant = () => ({
  type: constants.GET_ALL_MASTER_MERCHANT,
});

export const getAllBank = () => ({
  type: constants.GET_ALL_BANK,
});

export const getAllMccInternational = () => ({
  type: constants.GET_ALL_MCC_NATIONAL,
});

export const getAllProvince = () => ({
  type: constants.GET_ALL_PROVINCE,
});

export const getAllDistrictByProvince = (data) => ({
  type: constants.GET_ALL_DISTRICT_BY_PROVINCE,
  data,
});

export const getAllBranchBank = () => ({
  type: constants.GET_ALL_BRANCH_BANK,
});

export const getAllMccInterior = () => ({
  type: constants.GET_ALL_MCC_INTERIOR,
});

export const getAllBranchBankByUser = () => ({
  type: constants.GET_ALL_BRANCH_BANK_BY_USER,
});

export const getAllStaffByDepartment = (data) => ({
  type: constants.GET_ALL_STAFF_BY_DEPARTMENT,
  data,
});

export const getAllUser = (data) => ({
  type: constants.GET_ALL_USER,
  data,
});
