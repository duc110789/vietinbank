import * as constants from '../../constants/AuthenConstants/accPersonalInfoConstants';

export const getAccPersonalInfo = () => ({
  type: constants.GET_ACC_PERSONAL_INFO,
});

export const updateAccInfo = (data) => ({
  type: constants.UPDATE_ACC_INFO,
  data,
});

export const accChangePassword = (data) => ({
  type: constants.ACC_CHANGE_PASSWORD,
  data,
});
