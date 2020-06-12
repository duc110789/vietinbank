import * as constants from '../../constants/StaffManagementConstants/StaffManagementListConstants';

export const loadDefaultDataStaff = (data) => ({
  type: constants.LOAD_DEFAULT_DATA_STAFF,
  data,
});


export const searchByCurrentPage = (fromRow, pageSize, data) => ({
  type: constants.SEARCH_BY_PAGINATION,
  fromRow,
  pageSize,
  data,
});

export const openModalChangeStatusStaff = (data) => ({
  type: constants.CLICK_TO_OPEN_STAFF_MODAL,
  data,
});

export const closeModalChangeStatusStaff = () => ({
  type: constants.CLICK_TO_CLOSE_STAFF_MODAL,
});

export const changeStatusStaff = (data) => ({
  type: constants.CHANGE_STATUS_STAFF,
  data,
});
