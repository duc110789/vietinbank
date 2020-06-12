/* eslint-disable default-case */
import React from 'react';
import {Badge} from 'reactstrap';

export const getDescription = (arrFeeType, itemCode) => {
  let nameType = 'Không có dữ liệu hợp lệ.';
  if (arrFeeType && arrFeeType.length > 0) {
    arrFeeType.map((item) => {
      if (parseInt(item.code, 10) === parseInt(itemCode, 10) || item.code === itemCode) {
        nameType = item.description;
      }
      return nameType;
    });
  }
  return nameType;
};

export const getLabel = (arrLabel, itemCode) => {
  let nameType = itemCode;
  if (arrLabel && arrLabel.length > 0) {
    arrLabel.map((item) => {
      if (parseInt(item.value, 10) === parseInt(itemCode, 10) || item.value === itemCode) {
        nameType = item.label;
      }
      return nameType;
    });
  }
  return nameType;
};

export const getNameDepartment = (arrFeeDepartment, itemCode) => {
  let departmentName = 'Không có dữ liệu hợp lệ.';
  if (arrFeeDepartment && arrFeeDepartment.length > 0) {
    arrFeeDepartment.map((item) => {
      if (
        parseInt(item.departmentCode, 10) === parseInt(itemCode, 10)
        || itemCode === item.departmentCode) {
        departmentName = item.departmentName;
      }
      return departmentName;
    });
  }
  return departmentName;
};

export const getBranchBank = (arrBranchBank, itemCode) => {
  let departmentName = '';
  if (arrBranchBank && arrBranchBank.length > 0) {
    arrBranchBank.map((item) => {
      if (
        parseInt(item.departmentId, 10) === parseInt(itemCode, 10)
        || itemCode === item.departmentId) {
        departmentName = item.departmentName;
      }
      return departmentName;
    });
  }
  return departmentName;
};

export const listStaffDepartment = (arrStaff) => {
  const updateListStaffByDepartment = [];
  if (arrStaff) {
    for (let i = 0; i < arrStaff.length; i += 1) {
      updateListStaffByDepartment.push(
        {
          value: arrStaff[i].id,
          label: `${arrStaff[i].staffCode}-${arrStaff[i].fullName}`,
        },
      );
    }
  }
  return updateListStaffByDepartment;
};

export const listDistrictByProvince = (arrDistrict) => {
  const updateList = [];
  if (arrDistrict) {
    for (let i = 0; i < arrDistrict.length; i += 1) {
      updateList.push(
        {
          value: arrDistrict[i].districtCode,
          label: arrDistrict[i].districtName,
        },
      );
    }
  }
  return updateList;
};

const renderUIStatusQRCode = (code, name) => {
  switch (code) {
    case 1:
      return (<Badge color="success">{name}</Badge>);
    case 2:
      return (<Badge color="danger">{name}</Badge>);
    case -1:
      return (<Badge color="warning">{name}</Badge>);
  }
  return '';
};

const renderUIStatus = (code, name) => {
  switch (code) {
    case 1:
      return (<Badge color="success">{name}</Badge>);
    case 2:
      return (<Badge color="info">{name}</Badge>);
    case 3:
      return (<Badge color="primary">{name}</Badge>);
    case 4:
      return (<Badge color="dark">{name}</Badge>);
    case -1:
      return (<Badge color="danger">{name}</Badge>);
    case 5:
      return (<Badge color="warning">{name}</Badge>);
    case 6:
      return (<Badge color="pink">{name}</Badge>);
  }
  return '';
};

export const renderTransactionStatusColor = (code) => {
  switch (code) {
    case 0:
      return (<Badge color="success">Success</Badge>);
    case 1:
      return (<Badge color="danger">Fail</Badge>);
    case 8:
      return (<Badge color="primary">Check</Badge>);
    case 13:
      return (<Badge color="warning">Reveral P3</Badge>);
    case 14:
      return (<Badge color="info">Check by user</Badge>);
    case 15:
      return (<Badge color="dark">Dispute</Badge>);
  }
  return 'Dữ liệu không hợp lệ';
};

export const renderRefundStatusColor = (code) => {
  switch (code) {
    case 0:
      return (<Badge color="primary">Pending reversal</Badge>);
    case 2:
      return (<Badge color="dark">Reversal manual</Badge>);
    case 4:
      return (<Badge color="danger">Reversal rejected</Badge>);
    case 13:
      return (<Badge color="warning">Reveral P3</Badge>);
    case 16:
      return (<Badge color="info">Reversal auto</Badge>);
    case 17:
      return (<Badge color="success">Reversal failed</Badge>);
    case 18:
      return (<Badge color="text-secondary">Reversal timeout</Badge>);
  }
  return 'Dữ liệu không hợp lệ';
};


export const renderUIStatusUser = (code, name) => {
  switch (code) {
    case 1:
      return (<Badge color="success">{name}</Badge>);
    case 0:
      return (<Badge color="danger">{name}</Badge>);
    case 2:
      return (<Badge color="warning">{name}</Badge>);
  }
  return '';
};

export const convertRefundType = (refundType) => {
  switch (refundType) {
    case 1:
      return 'Hoàn toàn phần';
    case 2:
      return 'Hoàn một phần';
  }
  return '';
};

export const convertAccountTypeMidTid = (accountType) => {
  switch (accountType) {
    case 1:
      return 'Merchant';
    case 2:
      return 'Điểm bán';
    case 3:
      return 'Chi nhánh Merchant';
  }
  return '';
};

export const convertRankTerminal = (rankTerminal) => {
  switch (rankTerminal) {
    case 1:
      return 'Chi nhánh';
    case 2:
      return 'Điểm bán';
    case 0:
      return '';
  }
  return '';
};

export const convertServiceCode = (serviceCode) => {
  switch (serviceCode) {
    case 2:
      return 'QR-Cổng';
    case 4:
      return 'QR-Billing';
    case 5:
      return 'QR-Sản phẩm';
    case 6:
      return 'QR-Offline';
    default:
      return 'Không có giá trị hợp lệ';
  }
};

export const convertRegisterChannel = (registerChannel) => {
  switch (registerChannel) {
    case 1:
      return 'MMS';
    case 2:
      return 'MC Site';
    case 3:
      return 'MC App';
  }
  return '';
};

export const convertStatusInternational = (statusInternationalMcc) => {
  switch (statusInternationalMcc) {
    case 1:
      return 'Hoạt động';
    case -1:
      return 'Đóng';
    default:
      return 'Không có giá trị hợp lệ';
  }
};

export const convertBankCode = (bankCode) => {
  const banks = JSON.parse(localStorage.getItem('LIST_BANKS'));
  return banks && banks.length > 0 && banks.filter((item) => item.bankCode === bankCode)[0].brandName;
};

export const convertBranchCode = (branch) => {
  const branchs = JSON.parse(localStorage.getItem('LIST_BRANCH_BANK'));
  return branchs && branchs.length > 0 && branchs.filter((item) => item.departmentCode === branch)[0].departmentName;
};


export const getStatusUI = (array, itemCode) => {
  let nameType = 'Không có dữ liệu hợp lệ.';
  if (array && array.length > 0) {
    array.map((item) => {
      if (parseInt(item.code, 10) === itemCode || item.code === itemCode) {
        nameType = item.description;
      }
      return item;
    });
    return renderUIStatus(itemCode, nameType);
  }
  return nameType;
};

export const getStatusUiQRCode = (array, itemCode) => {
  let nameType = 'Không có dữ liệu hợp lệ.';
  if (array && array.length > 0) {
    array.map((item) => {
      if (parseInt(item.code, 10) === itemCode || item.code === itemCode) {
        nameType = item.description;
      }
      return item;
    });
    return renderUIStatusQRCode(itemCode, nameType);
  }
  return nameType;
};

export const getStatusUIUser = (array, itemCode) => {
  let nameType = 'Không có dữ liệu hợp lệ.';
  if (array && array.length > 0) {
    array.map((item) => {
      if (parseInt(item.code, 10) === itemCode || item.code === itemCode) {
        nameType = item.description;
      }
      return item;
    });
    return renderUIStatusUser(itemCode, nameType);
  }
  return nameType;
};

export const getListMerchantStatus = (itemCode) => {
  const listMerchantStatus = JSON.parse(localStorage && localStorage.getItem('MERCHANT'));
  return getStatusUI(listMerchantStatus, itemCode);
};

export const getListQRCodeStatus = (itemCode) => {
  const listQRCodeStatus = JSON.parse(localStorage && localStorage.getItem('QRCODE'));
  return getStatusUiQRCode(listQRCodeStatus, itemCode);
};

export const getListTerminalStatus = (itemCode) => {
  const listTerminalStatus = JSON.parse(localStorage && localStorage.getItem('TERMINAL'));
  return getStatusUI(listTerminalStatus, itemCode);
};

export const getStatusUserMidTid = (itemCode) => {
  const listStatusUserMidTid = JSON.parse(localStorage && localStorage.getItem('MERCHANT_USER'));
  return getStatusUI(listStatusUserMidTid, itemCode);
};

export const getListMerchantStatusUser = (itemCode) => {
  const listMerchantStatusUser = JSON.parse(localStorage && localStorage.getItem('MERCHANT_USER'));
  return getStatusUIUser(listMerchantStatusUser, itemCode);
};

export const convertDepartmentCode = (value, departmentCode) => {
  const defaultDepartment = departmentCode && departmentCode.filter((item) => item.departmentCode === value);
  return {
    value: defaultDepartment[0] && defaultDepartment[0].departmentCode,
    label: defaultDepartment[0] && defaultDepartment[0].departmentName,
  };
};

export const convertRoles = (value, arrayRoles) => {
  const defaultRole = arrayRoles && arrayRoles.filter((item) => item.roleId === value);
  return {
    value: defaultRole[0] && defaultRole[0].roleId,
    label: defaultRole[0] && defaultRole[0].name,
  };
};

export const convertDepartmentCodeRoles = (value, departmentCode) => {
  const defaultDepartmentCodeRoles = [];
  for (let i = 0; i < value.length; i += 1) {
    for (let j = 0; j < departmentCode.length; j += 1) {
      if (value[i] === departmentCode[j].departmentCode) {
        defaultDepartmentCodeRoles.push({
          value: departmentCode[j].departmentCode,
          label: departmentCode[j].departmentName,
        });
      }
    }
  }
  return defaultDepartmentCodeRoles;
};

export const renderUIStatusAuthen = (status) => {
  switch (status) {
    case 1:
      return (<Badge color="success">Hoạt động</Badge>);
    case 2:
      return (<Badge color="danger">Đóng</Badge>);
  }
  return 'Không có giá trị hợp lệ';
};

export const scroll = (elementId, isFocus = false) => {
  const element = document.getElementById(elementId);
  if (element) {
    window.scrollTo({
      top: element.getBoundingClientRect().top + window.pageYOffset - 200,
    });

    if (isFocus) {
      element.focus();
    }
  }
};

// eslint-disable-next-line max-len
export const removeDuplicates = (data) => data.filter((value, index) => data.indexOf(value) === index);

export const numberWithDots = (dot) => dot && dot.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
