import { all, fork } from 'redux-saga/effects';
import systemModule from './system/systemModuleSaga';
import internationalMcc from './system/internationalMccSaga';
import interiorMcc from './system/interiorMccSaga';
import department from './system/departmentSaga';
import LoginPageSaga from './AuthenSaga/LoginPageSaga';
import ResetPasswordPageSaga from './AuthenSaga/ResetPasswordPageSaga';
import masterMerchantSaga from './masterMerchant/masterMerchantSaga';
import terminalSaga from './terminal/terminalSaga';
import accPersonInfoPage from './AuthenSaga/accPersonalInfoSaga';
import ListPageSaga from './LocalUserManagementSaga/ListPageSaga';
import AddPageSaga from './LocalUserManagementSaga/AddPageSaga';
import UpdatePageSaga from './LocalUserManagementSaga/UpdatePageSaga';
import ResetPassLocalAccPageSaga from './LocalUserManagementSaga/ResetPasswordSaga';
import staffListPageSaga from './StaffManagementSaga/StaffManagementListSaga';
import staffAddPageSaga from './StaffManagementSaga/StaffManagementAddSaga';
import staffUpdatePageSaga from './StaffManagementSaga/StaffManagementUpdateSaga';
import ListRoleSaga from './RoleManagementSaga/ListRoleSaga';
import DetailRoleSaga from './RoleManagementSaga/DetailRoleSaga';
import AddNewRoleSaga from './RoleManagementSaga/AddNewRolesSaga';
import EditRoleSaga from './RoleManagementSaga/EditRolesSaga';
import qRCodeSaga from './qRCode/qRCodeSaga';
import mIdTId from './mIdTid/mIdTid';
import statisticalReportSage from './StatisticalReport/index';
import ManagementTransaction from './ManagementTransaction/index';

export default function* rootSaga() {
  yield all([
    fork(systemModule),
    fork(internationalMcc),
    fork(interiorMcc),
    fork(department),
    fork(LoginPageSaga),
    fork(ResetPasswordPageSaga),
    fork(masterMerchantSaga),
    fork(accPersonInfoPage),
    fork(ListPageSaga),
    fork(AddPageSaga),
    fork(UpdatePageSaga),
    fork(ResetPassLocalAccPageSaga),
    fork(staffListPageSaga),
    fork(staffAddPageSaga),
    fork(staffUpdatePageSaga),
    fork(ListRoleSaga),
    fork(DetailRoleSaga),
    fork(AddNewRoleSaga),
    fork(EditRoleSaga),
    fork(terminalSaga),
    fork(qRCodeSaga),
    fork(mIdTId),
    fork(statisticalReportSage),
    fork(ManagementTransaction),
  ]);
}
