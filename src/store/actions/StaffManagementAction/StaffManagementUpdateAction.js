import * as constants from '../../constants/StaffManagementConstants/StaffManagementUpdateConstants';

export const getInfoStaff = (data) => ({
  type: constants.GET_INFO_STAFF,
  data,
});

export const updateInfoStaff = (data) => ({
  type: constants.UPDATE_INFO_STAFF,
  data,
});

