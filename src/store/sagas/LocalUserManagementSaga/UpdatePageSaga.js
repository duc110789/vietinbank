import {all, call, put, takeLatest,} from 'redux-saga/effects';

import * as constants from '../../constants/LocalUserManageMentConstants/UpdatePageConstants';
import {apiGetDataUserById, apiUpdateNewAccount} from '../../../apis/userLocalApi/userLocal-management-api';

const apiGetDataUserByApi = async (params) => {
  const data = await apiGetDataUserById(params);
  return data;
};

function* callApiGetDataUserByApi(actions) {
  try {
    const data = yield call(apiGetDataUserByApi, actions.data);
    yield put({
      type: constants.GET_LOCAL_USER_DATA_BY_ID_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_LOCAL_USER_DATA_BY_ID_FAIL,
    });
  }
}


function* callApiUpdateNewAccount(actions) {
  try {
    const data = yield apiUpdateNewAccount(actions.data);
    yield put({
      type: constants.UPDATE_ACCOUNT_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.UPDATE_ACCOUNT_FAIL,
    });
  }
}


export default function* UpdatePageSaga() {
  yield all([
    takeLatest(constants.GET_LOCAL_USER_DATA_BY_ID, callApiGetDataUserByApi),
    takeLatest(constants.UPDATE_ACCOUNT, callApiUpdateNewAccount),
  ]);
}
