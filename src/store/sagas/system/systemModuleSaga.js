import {all, call, put, takeLatest,} from 'redux-saga/effects';

import * as constants from '../../constants/system/systemModuleConstant';
import {
  getAllBank,
  getAllBranchBank,
  getAllBranchBankByUser,
  getAllDistrictByProvince,
  getAllMasterMerchant,
  getAllMccInterior,
  getAllMccInternational,
  getAllProvince,
  getAllStaffByDepartment,
  getAllUser,
} from '../../../apis/system/systemManager';

const apiGetAllMasterMerchant = async () => {
  const data = await getAllMasterMerchant();
  return data;
};

const apiGetAllBank = async () => {
  const data = await getAllBank();
  return data;
};

const apiGetAllMccNational = async () => {
  const data = await getAllMccInternational();
  return data;
};

const apiGetAllBranchBank = async () => {
  const data = await getAllBranchBank();
  return data;
};

const apiGetAllBranchBankByUser = async () => {
  const data = await getAllBranchBankByUser();
  return data;
};

const apiGetAllDistrictByProvince = async (params) => {
  const data = await getAllDistrictByProvince(params);
  return data;
};

const apiGetAllProvince = async () => {
  const data = await getAllProvince();
  return data;
};

const apiGetAllMccInterior = async () => {
  const data = await getAllMccInterior();
  return data;
};

const apiGetAllStaffByDepartment = async (params) => {
  const data = await getAllStaffByDepartment(params);
  return data;
};

const apiGetAllUser = async () => {
  const data = await getAllUser();
  return data;
};

function* loadApiGetAllMasterMerchant() {
  try {
    const data = yield call(apiGetAllMasterMerchant);
    yield put({
      type: constants.GET_ALL_MASTER_MERCHANT_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_ALL_MASTER_MERCHANT_FAIL,
    });
  }
}

function* loadApiGetAllBank() {
  try {
    const data = yield call(apiGetAllBank);
    yield put({
      type: constants.GET_ALL_BANK_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_ALL_BANK_FAIL,
    });
  }
}

function* loadApiGetAllMccNational() {
  try {
    const data = yield call(apiGetAllMccNational);
    yield put({
      type: constants.GET_ALL_MCC_NATIONAL_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_ALL_MCC_NATIONAL_FAIL,
    });
  }
}

function* loadApiGetAllProvince() {
  try {
    const data = yield call(apiGetAllProvince);
    yield put({
      type: constants.GET_ALL_PROVINCE_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_ALL_PROVINCE_FAIL,
    });
  }
}

function* loadApiGetAllDistrictByProvince(actions) {
  try {
    const data = yield call(apiGetAllDistrictByProvince, actions.data);
    yield put({
      type: constants.GET_ALL_DISTRICT_BY_PROVINCE_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_ALL_DISTRICT_BY_PROVINCE_FAIL,
    });
  }
}

function* loadApiGetAllBranchBank() {
  try {
    const data = yield call(apiGetAllBranchBank);
    yield put({
      type: constants.GET_ALL_BRANCH_BANK_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_ALL_BRANCH_BANK_FAIL,
    });
  }
}

function* loadApiGetAllMccInterior() {
  try {
    const data = yield call(apiGetAllMccInterior);
    yield put({
      type: constants.GET_ALL_MCC_INTERIOR_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_ALL_MCC_INTERIOR_FAIL,
    });
  }
}

function* loadApiGetAllBranchBankByUser() {
  try {
    const data = yield call(apiGetAllBranchBankByUser);
    yield put({
      type: constants.GET_ALL_BRANCH_BANK_BY_USER_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_ALL_BRANCH_BANK_BY_USER_FAIL,
    });
  }
}

function* loadApiGetAllStaffByDepartment(actions) {
  try {
    const data = yield call(apiGetAllStaffByDepartment, actions.data);
    yield put({
      type: constants.GET_ALL_STAFF_BY_DEPARTMENT_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_ALL_STAFF_BY_DEPARTMENT_FAIL,
    });
  }
}

function* loadApiGetAllUser(actions) {
  try {
    const data = yield call(apiGetAllUser, actions.data);
    yield put({
      type: constants.GET_ALL_USER_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_ALL_USER_FAIL,
    });
  }
}

export default function* commonSourceSage() {
  yield all([
    takeLatest(constants.GET_ALL_MASTER_MERCHANT, loadApiGetAllMasterMerchant),
    takeLatest(constants.GET_ALL_MCC_NATIONAL, loadApiGetAllMccNational),
    takeLatest(constants.GET_ALL_PROVINCE, loadApiGetAllProvince),
    takeLatest(constants.GET_ALL_DISTRICT_BY_PROVINCE, loadApiGetAllDistrictByProvince),
    takeLatest(constants.GET_ALL_BRANCH_BANK, loadApiGetAllBranchBank),
    takeLatest(constants.GET_ALL_MCC_INTERIOR, loadApiGetAllMccInterior),
    takeLatest(constants.GET_ALL_BRANCH_BANK_BY_USER, loadApiGetAllBranchBankByUser),
    takeLatest(constants.GET_ALL_STAFF_BY_DEPARTMENT, loadApiGetAllStaffByDepartment),
    takeLatest(constants.GET_ALL_USER, loadApiGetAllUser),
    takeLatest(constants.GET_ALL_BANK, loadApiGetAllBank),
  ]);
}
