import * as constants from '../../constants/RoleManagementConstants/AddNewRolesConstants';

export const addNewRoles = (data) => ({
  type: constants.ADD_NEW_ROLES,
  data,
});
