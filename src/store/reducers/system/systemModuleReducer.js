import * as constants from '../../constants/system/systemModuleConstant';
import {setLocalStorageSystemCommon} from './common';

const initState = {
  listMasterMerchant: null,
  listBanks: null,
  listMccInternational: null,
  listProvince: null,
  listDistrict: null,
  listBranchBank: null,
  listMccInterior: null,
  listBranchBankByUser: null,
  listStaffByDepartment: null,
  listAllUser: null,
};

function systemModuleReducer(state = initState, action) {
  switch (action.type) {
    case constants.GET_ALL_MASTER_MERCHANT:
      return { ...state };
    case constants.GET_ALL_MASTER_MERCHANT_SUCCESS:
      state.listMasterMerchant = action.data.data;
      setLocalStorageSystemCommon({
        name: 'LIST_MASTER_MERCHANT',
        data: state.listMasterMerchant,
      });
      return { ...state };
    case constants.GET_ALL_MASTER_MERCHANT_FAIL:
      return { ...state };

    case constants.GET_ALL_BANK:
      return { ...state };
    case constants.GET_ALL_BANK_SUCCESS:
      state.listBanks = action.data.data;
      setLocalStorageSystemCommon({
        name: 'LIST_BANKS',
        data: state.listBanks,
      });
      return { ...state };
    case constants.GET_ALL_BANK_FAIL:
      return { ...state };

    case constants.GET_ALL_MCC_NATIONAL:
      return { ...state };
    case constants.GET_ALL_MCC_NATIONAL_SUCCESS:
      state.listMccInternational = action.data.data;
      setLocalStorageSystemCommon({
        name: 'LIST_MCC_INTERNATIONAL',
        data: state.listMccInternational,
      });
      return { ...state };
    case constants.GET_ALL_MCC_NATIONAL_FAIL:
      return { ...state };

    case constants.GET_ALL_PROVINCE:
      return { ...state };
    case constants.GET_ALL_PROVINCE_SUCCESS:
      state.listProvince = action.data.data;
      setLocalStorageSystemCommon({
        name: 'LIST_PROVINCE',
        data: state.listProvince,
      });
      return { ...state };
    case constants.GET_ALL_PROVINCE_FAIL:
      return { ...state };

    case constants.GET_ALL_DISTRICT_BY_PROVINCE:
      return { ...state };
    case constants.GET_ALL_DISTRICT_BY_PROVINCE_SUCCESS:
      return { ...state, listDistrict: action.data.data };
    case constants.GET_ALL_DISTRICT_BY_PROVINCE_FAIL:
      return { ...state };

    case constants.GET_ALL_BRANCH_BANK:
      return { ...state };
    case constants.GET_ALL_BRANCH_BANK_SUCCESS:
      state.listBranchBank = action.data.data;
      setLocalStorageSystemCommon({
        name: 'LIST_BRANCH_BANK',
        data: state.listBranchBank,
      });
      return { ...state };
    case constants.GET_ALL_BRANCH_BANK_FAIL:
      return { ...state };

    case constants.GET_ALL_MCC_INTERIOR:
      return { ...state };
    case constants.GET_ALL_MCC_INTERIOR_SUCCESS:
      state.listMccInterior = action.data.data;
      setLocalStorageSystemCommon({
        name: 'LIST_MCC_INTERIOR',
        data: state.listMccInterior,
      });
      return { ...state };
    case constants.GET_ALL_MCC_INTERIOR_FAIL:
      return { ...state };

    case constants.GET_ALL_BRANCH_BANK_BY_USER:
      return { ...state };
    case constants.GET_ALL_BRANCH_BANK_BY_USER_SUCCESS:
      state.listBranchBankByUser = action.data.data;
      setLocalStorageSystemCommon({
        name: 'LIST_BRANCH_BANK_BY_USER',
        data: state.listBranchBankByUser,
      });
      return { ...state };
    case constants.GET_ALL_BRANCH_BANK_BY_USER_FAIL:
      return { ...state };

    case constants.GET_ALL_STAFF_BY_DEPARTMENT_SUCCESS:
      return { ...state, listStaffByDepartment: action.data.data };

    case constants.GET_ALL_USER:
      return { ...state };
    case constants.GET_ALL_USER_SUCCESS:
      state.listAllUser = action.data.data;
      setLocalStorageSystemCommon({
        name: 'LIST_ALL_USER',
        data: state.listAllUser,
      });
      return { ...state };
    case constants.GET_ALL_USER_FAIL:
      return { ...state };

    default:
      return { ...state };
  }
}

export default systemModuleReducer;
