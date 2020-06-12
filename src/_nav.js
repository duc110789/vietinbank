export default {
  items: [
    {
      name: 'Quản lý Merchant',
      icon: 'fa fa-tv',
      url: '/merchant',
      children: [
        {
          name: 'Danh sách Merchant',
          url: '/merchant/list',
        },
        {
          name: 'Danh sách Merchant chờ duyệt',
          url: '/merchant/listMerchantPending',
        },
        {
          name: 'Danh sách Merchant bị từ chối',
          url: '/merchant/listMerchantDenied',
        },
        {
          name: 'Lịch sử danh sách Merchant từ chối',
          url: '/merchant/listHistoryMerchantDenied',
        },
        {
          name: 'Thêm mới Merchant',
          url: '/merchant/add',
        },
      ],
    },
    {
      name: 'Quản lý Terminal',
      icon: 'fa fa-desktop',
      url: '/terminal',
      children: [
        {
          name: 'Danh sách Terminal',
          url: '/terminal/list',
        },
        {
          name: 'Danh sách Terminal chờ duyệt',
          url: '/terminal/listTerminalPending',
        },
        {
          name: 'Danh sách Terminal từ chối',
          url: '/terminal/listTerminalDenied',
        },
        {
          name: 'Lịch sử danh sách Terminal từ chối',
          url: '/terminal/listTerminalHistoryDenied',
        },
        {
          name: 'Thêm mới Terminal',
          url: '/terminal/add',
        },
      ],
    },
    {
      name: 'Quản lý QR Code',
      icon: 'fa fa-qrcode',
      url: '/qrcode',
      children: [
        {
          name: 'Danh sách QR Code sản phẩm',
          url: '/qrcode/list',
        },
        {
          name: 'Tạo QR Code sản phẩm',
          url: '/qrcode/add',
        },
        {
          name: 'Tạo QR Code Terminal',
          url: '/qrcode/qrcode-terminal',
        },
      ],
    },
    {
      name: 'Quản lý giao dịch',
      icon: 'fa fa-history',
      url: '/management-transaction',
      children: [
        {
          name: 'Tổng hợp danh sách giao dịch',
          url: '/management-transaction/list',
        },
        {
          name: 'Tổng hợp giao dịch hoàn tiền',
          url: '/management-transaction/listRefund',
        },
      ],
    },
    {
      name: 'Danh mục hệ thống',
      icon: 'fa fa-cogs',
      url: '/system',
      children: [
        {
          name: 'Quản lý Mcc quốc tế',
          url: '/system/international-mcc',
          children: [
            {
              name: 'Danh sách MCC quốc tế',
              url: '/system/international-mcc/list',
            },
            {
              name: 'Thêm mới Mcc Quốc tế',
              url: '/system/international-mcc/add',
            },
          ],
        },
        {
          name: 'Quản lý Mcc nội địa',
          url: '/system/interior-mcc/',
          children: [
            {
              name: 'Danh sách MCC nội địa',
              url: '/system/interior-mcc/list',
            },
            {
              name: 'Thêm mới Mcc nội địa',
              url: '/system/interior-mcc/add',
            },
          ],
        },
        {
          name: 'Quản lý chi nhánh',
          url: '/system/branch',
          children: [
            {
              name: 'Danh sách chi nhánh',
              url: '/system/branch/list',
            },
            {
              name: 'Thêm mới chi nhánh',
              url: '/system/branch/add',
            },
          ],
        },
        {
          name: 'Quản lý tài khoản cá nhân',
          url: '/system/user/',
          children: [
            {
              name: 'Đổi mật khẩu',
              url: '/system/user/changePassword',
            },
            {
              name: 'Thông tin cá nhân',
              url: '/system/user/infoUser',
            },
          ],
        },
        {
          name: 'Quản lý local',
          url: '/system/user',
          children: [
            {
              name: 'Danh sách tài khoản Local',
              url: '/system/user/list',
            },
          ],
        },
        {
          name: 'Quản lý nhân viên',
          url: '/system/staff',
          children: [
            {
              name: 'Danh sách tài khoản nhân viên',
              url: '/system/staff/list',
            },
          ],
        },
        {
          name: 'Quản lý nhóm quyền',
          url: '/system/roles',
          children: [
            {
              name: 'Danh sách nhóm quyền',
              url: '/system/roles/list',
            },
            {
              name: 'Thêm mới nhóm quyền',
              url: '/system/roles/add',
            },
          ],
        },
        {
          name: 'Quản lý tài khoản người dùng web/app',
          url: '/system/accountwebapp',
          children: [
            {
              name: 'Danh sách quản lý người dùng',
              url: '/system/accountwebapp/list',
            },
            {
              name: 'Thêm mới tài khoản',
              url: '/system/accountwebapp/add',
            },
          ],
        },
      ],
    },
    {
      name: 'Báo cáo thống kê',
      icon: 'fa fa-line-chart',
      url: '/report',
      children: [
        {
          name: 'Phòng kinh doanh',
          url: '/report/business',
          children: [
            {
              name: 'Báo cáo chi tiết giao dịch thành công',
              url: '/report/business/business-report-success/list',
            },
            {
              name: 'Báo cáo chi tiết giao dịch lỗi',
              url: '/report/business/business-report-error/list',
            },
            {
              name: 'Báo cáo tổng hợp doanh số theo MCC quốc tế',
              url: '/report/business/business-report-intermcc/list',
            },
            {
              name: 'Báo cáo tổng hợp doanh số theo Master Merchant',
              url: '/report/business/business-report-mmc/list',
            },
          ],
        },
        {
          name: 'Phòng đối soát',
          url: '/report/control/',
          children: [
            {
              name: 'Báo cáo chi tiết giao dịch thành công',
              url: '/report/control/forcontrol-report-success/list',
            },
            {
              name: 'Báo cáo chi tiết giao dịch hoàn tiền',
              url: '/report/control/forcontrol-report-refund/list',
            },
            {
              name: 'Báo cáo tổng hợp theo Merchant',
              url: '/report/control/forcontrol-report-merchant/list',
            },
            {
              name: 'Báo cáo tổng hợp doanh số theo chi nhánh Merchant',
              url: '/report/control/forcontrol-report-merchantbranch/list',
            },
            {
              name: 'Báo cáo tổng hợp theo điểm bán',
              url: '/report/control/forcontrol-report-terminal/list',
            },
            {
              name: 'Báo cáo chi tiết giao dịch thành công phát sinh',
              url: '/report/control/forcontrol-report-update/list',
            },
          ],
        },
      ],
    },
  ],

};
