import * as constants from '../../constants/RoleManagementConstants/ListRoleConstants';

export const getListRole = (data) => ({
  type: constants.GET_LIST_ROLE,
  data,
});


export const openModalChangeRole = (data) => ({
  type: constants.CLICK_TO_OPEN_CHANGE_STATUS_MODAL_ROLE,
  data,
});

export const closeModalChangeRole = () => ({
  type: constants.CLICK_TO_CLOSE_CHANGE_STATUS_MODAL_ROLE,
});

export const changeStatusRole = (data) => ({
  type: constants.CHANGE_STATUS_ROLE,
  data,
});
