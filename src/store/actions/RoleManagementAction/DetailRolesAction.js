import * as constants from '../../constants/RoleManagementConstants/DetailRolesConstants';

export const getAllFunction = () => ({
  type: constants.GET_ALL_FUNCTION,
});


export const getGroupDetailRoles = (data) => ({
  type: constants.GET_GROUP_DETAIL_ROLES,
  data
});

