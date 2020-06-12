import * as constants from '../../constants/system/systemDepartmentConstant';

export const getListDepartment = (data) => ({
  type: constants.GET_ALL_DEPARTMENT,
  data,
});

export const lockOrUnlockDepartment = (data) => ({
  type: constants.LOCK_OR_UNLOCK_DEPARTMENT,
  data,
});

export const openModalChangeStatusDepartment = (data) => ({
  type: constants.CLICK_TO_OPEN_DEPARTMENT,
  data,
});

export const closeModalChangeStatusDepartment = () => ({
  type: constants.CLICK_TO_CLOSE_DEPARTMENT,
});

export const clearListDepartment = () => ({
  type: constants.CLEAR_LIST_DEPARTMENT,
});
// ========= search

export const addDepartment = (data) => ({
  type: constants.ADD_DEPARTMENT,
  data,
});

export const getDepartment = (data) => ({
  type: constants.GET_DEPARTMENT,
  data,
});

export const editDepartment = (data) => ({
  type: constants.EDIT_DEPARTMENT,
  data,
});
