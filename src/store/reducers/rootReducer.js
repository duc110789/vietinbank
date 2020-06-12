import { combineReducers } from 'redux';
import systemModuleReducer from './system/systemModuleReducer';
import internationalMccManagerReducer from './system/internationalMccManagerReducer';
import masterMerchantReducer from './masterMerchant/masterMerchantReducer';
import terminalReducer from './terminal/terminalReducer';
import authenLoginPageReducer from './AuthenReducer/LoginPageReducer';
import resetPasswordPageReducer from './AuthenReducer/ResetPasswordPageReducer';
import accPersonalInfoReducer from './AuthenReducer/accPersonalInfoReducer';
import ListPageReducer from './LocalUserManagementReducer/ListPageReducer';
import AddPageReducer from './LocalUserManagementReducer/AddPageReducer';
import UpdatePageReducer from './LocalUserManagementReducer/UpdatePageReducer';
import ResetPasswordPageReducer from './LocalUserManagementReducer/ResetPasswordReducer';
import StaffManagementListReducer from './StaffManagementReducer/StaffManagementListReducer';
import StaffManagementAddReducer from './StaffManagementReducer/StaffManagementAddReducer';
import StaffManagementUpdateReducer from './StaffManagementReducer/StaffManagementUpdateReducer';
import ListRolePageReducer from './RoleManagementReducer/ListRoleReducer';
import DetailRolePageReducer from './RoleManagementReducer/DetailRolesReducer';
import AddRolePageReducer from './RoleManagementReducer/AddNewRolesReducer';
import EditRolePageReducer from './RoleManagementReducer/EditRolesReducer';
import qRCodeReducer from './qRCodeReducer/qRcodeReducer';
import mIdTIdReducer from './mIdTId/mIdTId';
import StatisticalReportReducer from './StatisticalReport/index';
import interiorMccReducer from './system/interiorMccManagerReducer';
import TransactionListReducer from './ManagementTransaction/index';
import departmentReducer from './system/departmentReducer';

const rootReducer = combineReducers({
  systemModule: systemModuleReducer,
  internationalMccManager: internationalMccManagerReducer,
  interiorMcc: interiorMccReducer,
  department: departmentReducer,
  loginPage: authenLoginPageReducer,
  resetPassword: resetPasswordPageReducer,
  masterMerchant: masterMerchantReducer,
  terminal: terminalReducer,
  accPersonalInfo: accPersonalInfoReducer,
  ListPage: ListPageReducer,
  AddPage: AddPageReducer,
  UpdatePage: UpdatePageReducer,
  ResetPasswordLocalAccPage: ResetPasswordPageReducer,
  staffManagementList: StaffManagementListReducer,
  StaffManagementAdd: StaffManagementAddReducer,
  StaffManagementUpdate: StaffManagementUpdateReducer,
  ListRole: ListRolePageReducer,
  DetailRole: DetailRolePageReducer,
  AddRolePage: AddRolePageReducer,
  EditRolePage: EditRolePageReducer,
  qRCode: qRCodeReducer,
  mIdTId: mIdTIdReducer,
  statisticalReport: StatisticalReportReducer,
  Transaction: TransactionListReducer,
});

export default rootReducer;
