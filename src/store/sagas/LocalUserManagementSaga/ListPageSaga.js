import {all, put, takeLatest,} from 'redux-saga/effects';

import * as constants from '../../constants/LocalUserManageMentConstants/ListPageConstants';
import {
  apiGetAllBranchBankByUser,
  apiGetAllGroupRole,
  apiGetDataListPage,
  apiUpdateStatusLocalAccount,
} from '../../../apis/userLocalApi/userLocal-management-api';

function* callApiGetAllGroupRole(actions) {
  try {
    const data = yield apiGetAllGroupRole();
    yield put({
      type: constants.GET_ALL_GROUP_ROLE_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_ALL_GROUP_ROLE_FAIL,
    });
  }
}


function* callApiGetAllBranchBankByUser(actions) {
  try {
    const data = yield apiGetAllBranchBankByUser(actions.data);
    yield put({
      type: constants.GET_ALL_BRANCH_BANK_BY_LOCAL_USER_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_ALL_BRANCH_BANK_BY_LOCAL_USER_FAIL,
    });
  }
}

function* callApiGetDataListPage(actions) {
  try {
    const data = yield apiGetDataListPage(actions.data);
    yield put({
      type: constants.GET__DATA_LIST_PAGE_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET__DATA_LIST_PAGE_FAIL,
    });
  }
}

function* callApiChangeStatusLocalAccount(actions) {
  try {
    const sendData = {
      username: actions.data.username,
      status: actions.data.status === 1 ? 2 : 1,
    };
    let data = yield apiUpdateStatusLocalAccount(sendData);
    data = {...data,status : sendData.status}

    yield put({
      type: constants.CHANGE_STATUS_LOCAL_ACCOUNT_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.CHANGE_STATUS_LOCAL_ACCOUNT_FAIL,
    });
  }
}


export default function* ListPageSaga() {
  yield all([
    takeLatest(constants.GET_ALL_GROUP_ROLE, callApiGetAllGroupRole),
    takeLatest(constants.GET_ALL_BRANCH_BANK_BY_LOCAL_USER, callApiGetAllBranchBankByUser),
    takeLatest(constants.GET__DATA_LIST_PAGE, callApiGetDataListPage),
    takeLatest(constants.CHANGE_STATUS_LOCAL_ACCOUNT, callApiChangeStatusLocalAccount),
  ]);
}
