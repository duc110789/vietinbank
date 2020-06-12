import * as constants from '../../constants/StaffManagementConstants/StaffManagementAddConstants';

export const addNewStaff = (data) => ({
  type: constants.ADD_NEW_STAFF,
  data,
});
