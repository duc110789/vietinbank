import React from 'react';

/* Start Project Component */
const AddMerchant = React.lazy(() => import('./containers/ManagementMerchant/Add'));
const EditMerchant = React.lazy(() => import('./containers/ManagementMerchant/Edit'));
const MerchantList = React.lazy(() => import('./containers/ManagementMerchant/List'));
const MerchantListPending = React.lazy(() => import('./containers/ManagementMerchant/MerchantListPending'));
const MerchantListDenied = React.lazy(() => import('./containers/ManagementMerchant/MerchantListDenied'));
const HistoryMerchantListDenied = React.lazy(() => import('./containers/ManagementMerchant/HistoryMerchantListDenied'));
const MerchantDetailDenied = React.lazy(() => import('./containers/ManagementMerchant/MerchantDetailDenied'));
const DetailMerchant = React.lazy(() => import('./containers/ManagementMerchant/Detail'));
const Approved = React.lazy(() => import('./containers/ManagementMerchant/Approved'));
const ResetPassword = React.lazy(() => import('./containers/Login/ResetPassword'));
const changePassword = React.lazy(() => import('./containers/Login/changePassword'));
const forgetPassword = React.lazy(() => import('./containers/Login/forgetPassword'));
const personalInfo = React.lazy(() => import('./containers/Login/PersonalInfo'));
const listPageLocalUser = React.lazy(() => import('./containers/LocalUserManagement/ListLocalUser/ListPage'));
const addPageLocalUser = React.lazy(() => import('./containers/LocalUserManagement/AddNewUser/AddUserPage'));
const UpdatePageLocalUser = React.lazy(() => import('./containers/LocalUserManagement/UpdateInfoUser/UpdateUserPage'));
const RemovePageLocalUser = React.lazy(() => import('./containers/LocalUserManagement/removeUser/RemoveUserPage'));
const ResetPageLocalUser = React.lazy(() => import('./containers/LocalUserManagement/ResetPassword/ResetPasswordPage'));
const ListStaffPage = React.lazy(() => import('./containers/StaffManagement/ListOfStaff/ListStaffPage'));
const AddStaffPage = React.lazy(() => import('./containers/StaffManagement/AddNewStaffPage/AddNewStaffPage'));
const UpdateStaffPage = React.lazy(() => import('./containers/StaffManagement/UpdateStaffPage/UpdateStaffPage'));
const ListRolesPage = React.lazy(() => import('./containers/RoleManagement/RolesList/RolesListPage'));
const DetailRolesPage = React.lazy(() => import('./containers/RoleManagement/RolesDetail/RolesDetailPage'));
const AddRolesPage = React.lazy(() => import('./containers/RoleManagement/RolesAdd/RolesAddPage'));
const EditRolePage = React.lazy(() => import('./containers/RoleManagement/RolesEdit/RolesEditPage'));
const AddTerminal = React.lazy(() => import('./containers/ManagementTerminal/Add'));
const EditTerminal = React.lazy(() => import('./containers/ManagementTerminal/Edit'));
const ListTerminal = React.lazy(() => import('./containers/ManagementTerminal/List'));
const TerminalListPending = React.lazy(() => import('./containers/ManagementTerminal/TerminalListPending'));
const TerminalListDenied = React.lazy(() => import('./containers/ManagementTerminal/TerminalListDenied'));
const HistoryTerminalListDenied = React.lazy(() => import('./containers/ManagementTerminal/HistoryTerminalListDenied'));
const TerminalDetailDenied = React.lazy(() => import('./containers/ManagementTerminal/TerminalDetailDenied'));
const DetailTerminal = React.lazy(() => import('./containers/ManagementTerminal/Detail'));
const ApprovedTerminal = React.lazy(() => import('./containers/ManagementTerminal/Approved'));
const AddQRCode = React.lazy(() => import('./containers/ManagementQRCode/Add'));
const EditQRCode = React.lazy(() => import('./containers/ManagementQRCode/Edit'));
const DetailQRCode = React.lazy(() => import('./containers/ManagementQRCode/Detail'));
const CreateResult = React.lazy(() => import('./containers/ManagementQRCode/Add/CreateResult'));
const AddQRCodeTerminal = React.lazy(() => import('./containers/ManagementQRCode/AddQRCodeTerminal'));
const TerminalCreateResult = React.lazy(() => import('./containers/ManagementQRCode/AddQRCodeTerminal/TerminalCreateResult'));
const QRCodeList = React.lazy(() => import('./containers/ManagementQRCode/List'));
const AddAccountWebApp = React.lazy(() => import('./containers/ManagementMIdTId/Add'));
const EditAccountWebApp = React.lazy(() => import('./containers/ManagementMIdTId/Edit'));
const DetailAccountWebApp = React.lazy(() => import('./containers/ManagementMIdTId/Detail'));
const UserManagerList = React.lazy(() => import('./containers/ManagementMIdTId/List'));
const ListMccInternational = React.lazy(() => import('./containers/InternationalMcc/List/'));
const AddMccInternational = React.lazy(() => import('./containers/InternationalMcc/Add/'));
const UpdateMccInternational = React.lazy(() => import('./containers/InternationalMcc/Edit/'));
const ReportDetailTranSuccess = React.lazy(() => import('./containers/StatisticalReport/BusinessDepartment/ReportDetailTranSuccess'));
const ReportDetailForControlSuccess = React.lazy(() => import('./containers/StatisticalReport/ForControlDepartment/ReportDetailTranSuccess'));
const ReportDetailForControlRefund = React.lazy(() => import('./containers/StatisticalReport/ForControlDepartment/ReportDetailTranRefund'));
const ReportDetailForControlMerchant = React.lazy(() => import('./containers/StatisticalReport/ForControlDepartment/ReportDetailTranMerchant'));
const ReportDetailForControlMerchantBranch = React.lazy(() => import('./containers/StatisticalReport/ForControlDepartment/ReportDetailTranMerchantBranch'));
const ReportDetailForControlTerminal = React.lazy(() => import('./containers/StatisticalReport/ForControlDepartment/ReportDetailTranTerminal'));
const ReportDetailForControlUpdate = React.lazy(() => import('./containers/StatisticalReport/ForControlDepartment/ReportDetailTranUpdate'));
const ReportDetailTranFail = React.lazy(() => import('./containers/StatisticalReport/BusinessDepartment/ReportDetailTranFail'));
const ReportDetailTranInterMcc = React.lazy(() => import('./containers/StatisticalReport/BusinessDepartment/ReportDetailTranInterMcc'));
const ReportDetailTranMmc = React.lazy(() => import('./containers/StatisticalReport/BusinessDepartment/ReportDetailTranMmc'));
const ListMccInterior = React.lazy(() => import('./containers/InteriorMcc/List/'));
const AddMccInterior = React.lazy(() => import('./containers/InteriorMcc/Add/'));
const UpdateMccInterior = React.lazy(() => import('./containers/InteriorMcc/Edit/'));
const ManagementList = React.lazy(() => import('./containers/ManagementTransaction/List'));
const ManagementListRefund = React.lazy(() => import('./containers/ManagementTransaction/SumRefundTransaction'));
const TransactionDetail = React.lazy(() => import('./containers/ManagementTransaction/Detail'));
const TransactionDetailRefund = React.lazy(() => import('./containers/ManagementTransaction/DetailRefund'));
const TransactionAddRefund = React.lazy(() => import('./containers/ManagementTransaction/AddTransactionRefund'));
const TransactionUpdateStatusPayment = React.lazy(() => import('./containers/ManagementTransaction/UpdateStatusTransactionPayment'));
const TransactionUpdateStatusRefund = React.lazy(() => import('./containers/ManagementTransaction/UpdateTransactionStatusRefund'));
const ListDepartment = React.lazy(() => import('./containers/BranchSystem/List/'));
const AddDepartment = React.lazy(() => import('./containers/BranchSystem/Add/'));
const UpdateDepartment = React.lazy(() => import('./containers/BranchSystem/Edit/'));
/* End Project Component */

const routes = [
  { path: '/', exact: true, name: 'Home' },
  /* Start Project Path */
  {
    path: '/merchant/add', exact: true, name: 'Thêm mới Merchant', component: AddMerchant,
  },
  {
    path: '/merchant/edit', exact: true, name: 'Chỉnh sửa Merchant', component: EditMerchant,
  },
  {
    path: '/merchant/list', exact: true, name: 'Danh sách Merchant', component: MerchantList,
  },
  {
    path: '/merchant/detail', exact: true, name: 'Thông tin Merchant', component: DetailMerchant,
  },
  {
    path: '/merchant/approved', exact: true, name: 'Duyệt Merchant', component: Approved,
  },
  {
    path: '/merchant/listMerchantPending', exact: true, name: 'Danh sách Merchant chờ duyệt', component: MerchantListPending,
  },
  {
    path: '/merchant/listMerchantDenied', exact: true, name: 'Danh sách Merchant bị từ chối', component: MerchantListDenied,
  },
  {
    path: '/merchant/listHistoryMerchantDenied', exact: true, name: 'Lịch sử danh sách Merchant từ chối', component: HistoryMerchantListDenied,
  },
  {
    path: '/historyMerchantDenied/detail', exact: true, name: 'Thông tin chi tiết Merchant bị từ chối', component: MerchantDetailDenied,
  },
  {
    path: '/resetPassword', exact: true, name: 'Đặt lại mật khẩu', component: ResetPassword,
  },
  {
    path: '/system/user/changePassword', exact: true, name: 'Đổi mật khẩu', component: changePassword,
  },
  {
    path: '/forgetPassword', exact: true, name: 'Lấy lại mật khẩu', component: forgetPassword,
  },
  {
    path: '/system/user/infoUser', exact: true, name: 'Thông tin chi tiết', component: personalInfo,
  },
  {
    path: '/system/user/list', exact: true, name: 'Danh sách tài khoản local', component: listPageLocalUser,
  },
  {
    path: '/system/user/addUser', exact: true, name: 'Thêm mới tài khoản', component: addPageLocalUser,
  },
  {
    path: '/system/user/updateInfo', exact: true, name: 'Cập nhật thông tin tài khoản', component: UpdatePageLocalUser,
  },
  {
    path: '/system/user/remove', exact: true, name: 'Xóa tài khoản', component: RemovePageLocalUser,
  },
  {
    path: '/system/user/resetPassword', exact: true, name: 'Đặt lại mật khẩu', component: ResetPageLocalUser,
  },
  {
    path: '/system/staff/list', exact: true, name: 'Danh sách nhân viên', component: ListStaffPage,
  },
  {
    path: '/system/staff/add', exact: true, name: 'Thêm mới nhân viên', component: AddStaffPage,
  },
  {
    path: '/system/staff/update', exact: true, name: 'Cập nhật thông tin nhân viên', component: UpdateStaffPage,
  },
  {
    path: '/system/roles/list', exact: true, name: 'Danh sách nhóm quyền', component: ListRolesPage,
  },
  {
    path: '/system/roles/detail', exact: true, name: 'Chi tiết nhóm quyền', component: DetailRolesPage,
  },
  {
    path: '/system/roles/add', exact: true, name: 'Thêm mới nhóm quyền', component: AddRolesPage,
  },
  {
    path: '/system/roles/edit', exact: true, name: 'Chỉnh sửa nhóm quyền', component: EditRolePage,
  },
  {
    path: '/terminal/add', exact: true, name: 'Thêm mới Terminal', component: AddTerminal,
  },
  {
    path: '/terminal/edit', exact: true, name: 'Chỉnh sửa Terminal', component: EditTerminal,
  },
  {
    path: '/terminal/list', exact: true, name: 'Danh sách Terminal', component: ListTerminal,
  },
  {
    path: '/terminal/listTerminalPending', exact: true, name: 'Danh sách Terminal chời duyệt', component: TerminalListPending,
  },
  {
    path: '/terminal/listTerminalDenied', exact: true, name: 'Danh sách Terminal từ chối', component: TerminalListDenied,
  },
  {
    path: '/terminal/listTerminalHistoryDenied', exact: true, name: 'Lịch sử danh sách Terminal từ chối', component: HistoryTerminalListDenied,
  },
  {
    path: '/terminalDetailDenied/detail', exact: true, name: 'Chi tiết danh sách Terminal từ chối', component: TerminalDetailDenied,
  },
  {
    path: '/terminal/add', exact: true, name: 'Thêm mới Terminal', component: AddTerminal,
  },
  {
    path: '/terminal/edit', exact: true, name: 'Chỉnh sửa Terminal', component: EditTerminal,
  },
  {
    path: '/terminal/detail', exact: true, name: 'Thông tin Terminal', component: DetailTerminal,
  },
  {
    path: '/terminal/approved', exact: true, name: 'Duyệt Terminal', component: ApprovedTerminal,
  },
  {
    path: '/qrcode/add', exact: true, name: 'Thêm mới QR Code sản phẩm', component: AddQRCode,
  },
  {
    path: '/qrcode/edit', exact: true, name: 'Chỉnh sửa QR Code sản phẩm', component: EditQRCode,
  },
  {
    path: '/qrcode/createResult', exact: true, name: 'Kết quả được tạo', component: CreateResult,
  },
  {
    path: '/qrcode/qrcode-terminal', exact: true, name: 'Thêm mới QR Code Terminal', component: AddQRCodeTerminal,
  },
  {
    path: '/qrcode/qrcode-terminal/create-result', exact: true, name: 'Kết quả được tạo', component: TerminalCreateResult,
  },
  {
    path: '/qrcode/detail', exact: true, name: 'Chi tiết QrCode', component: DetailQRCode,
  },
  {
    path: '/qrcode/list', exact: true, name: 'Danh sách QRCode sản phẩm', component: QRCodeList,
  },
  {
    path: '/system/accountwebapp/add', exact: true, name: 'Thêm tài khoản người dùng web/app', component: AddAccountWebApp,
  },
  {
    path: '/system/accountwebapp/edit', exact: true, name: 'Chỉnh sửa tài khoản người dùng web/app', component: EditAccountWebApp,
  },
  {
    path: '/system/accountwebapp/detail', exact: true, name: 'Xem chi tiết tài khoản', component: DetailAccountWebApp,
  },
  {
    path: '/system/accountwebapp/list', exact: true, name: 'Danh sách quản lý người dùng', component: UserManagerList,
  },
  {
    path: '/system/international-mcc/list', exact: true, name: 'Danh sách Mcc Quốc tế', component: ListMccInternational,
  },
  {
    path: '/system/international-mcc/add', exact: true, name: 'Thêm mới Mcc Quốc tế', component: AddMccInternational,
  },
  {
    path: '/system/international-mcc/edit', exact: true, name: 'Cập nhật thông tin Mcc Quốc tế', component: UpdateMccInternational,
  },
  {
    path: '/report/business/business-report-success/list', exact: true, name: 'Báo cáo chi tiết giao dịch thành công', component: ReportDetailTranSuccess,
  },
  {
    path: '/report/business/business-report-error/list', exact: true, name: 'Báo cáo chi tiết giao dịch lỗi', component: ReportDetailTranFail,
  },
  {
    path: '/report/business/business-report-intermcc/list', exact: true, name: 'Báo cáo tổng hợp doanh số theo MCC quốc tế', component: ReportDetailTranInterMcc,
  },
  {
    path: '/report/business/business-report-mmc/list', exact: true, name: 'Báo cáo tổng hợp doanh số theo đơn vị hợp tác', component: ReportDetailTranMmc,
  },
  {
    path: '/report/control/forcontrol-report-success/list', exact: true, name: 'Báo cáo chi tiết giao dịch thành công', component: ReportDetailForControlSuccess,
  },
  {
    path: '/report/control/forcontrol-report-refund/list', exact: true, name: 'Báo cáo chi tiết giao dịch hoàn tiền', component: ReportDetailForControlRefund,
  },
  {
    path: '/report/control/forcontrol-report-merchant/list', exact: true, name: 'Báo cáo tổng hợp theo Merchant', component: ReportDetailForControlMerchant,
  },
  {
    path: '/report/control/forcontrol-report-merchantbranch/list', exact: true, name: 'Báo cáo tổng hợp doanh số theo chi nhánh Merchant', component: ReportDetailForControlMerchantBranch,
  },
  {
    path: '/report/control/forcontrol-report-terminal/list', exact: true, name: 'Báo cáo tổng hợp theo điểm bán', component: ReportDetailForControlTerminal,
  },
  {
    path: '/report/control/forcontrol-report-update/list', exact: true, name: 'Báo cáo chi tiết giao dịch thành công phát sinh', component: ReportDetailForControlUpdate,
  },
  {
    path: '/system/interior-mcc/list', exact: true, name: 'Danh sách Mcc nội địa', component: ListMccInterior,
  },
  {
    path: '/system/interior-mcc/add', exact: true, name: 'Thêm mới Mcc nội địa', component: AddMccInterior,
  },
  {
    path: '/system/interior-mcc/edit', exact: true, name: 'Cập nhật thông tin Mcc nội địa', component: UpdateMccInterior,
  },
  {
    path: '/management-transaction/list', exact: true, name: 'Tổng hợp danh sách giao dịch', component: ManagementList,
  },
  {
    path: '/management-transaction/detail', exact: true, name: 'Chi tiết giao dịch', component: TransactionDetail,
  },
  {
    path: '/management-transaction/listRefund', exact: true, name: 'Tổng hợp giao dịch hoàn tiền', component: ManagementListRefund,
  },
  {
    path: '/management-transaction/refund-detail', exact: true, name: 'Chi tiết giao dịch hoàn', component: TransactionDetailRefund,
  },
  {
    path: '/management-transaction/refund-create', exact: true, name: 'Tạo giao dịch hoàn', component: TransactionAddRefund,
  },
  {
    path: '/management-transaction/update-status-transaction-payment', exact: true, name: 'Cập nhật trạng thái giao dịch thanh toán', component: TransactionUpdateStatusPayment,
  },
  {
    path: '/management-transaction/update-status-transaction-refund', exact: true, name: 'Cập nhật trạng thái giao dịch hoàn tiền', component: TransactionUpdateStatusRefund,
  },
  {
    path: '/system/branch/list', exact: true, name: 'Danh sách chi nhánh', component: ListDepartment,
  },
  {
    path: '/system/branch/add', exact: true, name: 'Thêm mới chi nhánh', component: AddDepartment,
  },
  {
    path: '/system/branch/edit', exact: true, name: 'Cập nhật thông tin chi nhánh', component: UpdateDepartment,
  },
  /* End Project Path */
];
export default routes;
