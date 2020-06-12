import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Button, Card, CardBody, CardFooter, CardHeader, Col, Collapse, FormGroup, Label, Row,} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Select from 'react-select';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Textarea from 'react-validation/build/textarea';
import {
  clearMerchantCodeName,
  clearMerchantDetail,
  getMerchantCodeName,
  getMerchantDetail,
} from '../../../store/actions/masterMerchant/masterMerchant';
import {addTerminal, getCacheTerminal, setLevelTerminal} from '../../../store/actions/terminal/terminal';

import Constants from '../Constants';
import {messageError, messageSuccess} from '../../../utils';
import {
  checkContainSpace,
  checkContainSpecialCharacters,
  checkEmailFormat,
  checkLength100,
  checkLength13,
  checkLength150,
  checkLength20,
  checkLength200,
  checkLength30,
  checkLength50,
  checkLength28,
  checkPhoneNumber,
  checkRequiredInput,
  checkRequiredInputSpecial,
  checkRequiredSelect,
  isValidVietnamese,
  notAllowInputNumber,
} from '../../../components/Input/validation';
import {getStatusUI, scroll} from '../../../utils/commonFunction';
import {getAllStaffByDepartment} from '../../../store/actions/system/systemModuleAction';

class AddTerminal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listMccInternational: [],
      listMccInterior: [],
      listBranchBank: [],
      listBranchBankByUser: [],
      validateForm: 0,
      notifyStatus: '',
      // BusinessInfo
      isOpenInfo: true,
      isOpenAccount: true,
      merchantCode: '',
      isOpenInfoDevelopmentBranch: true,

      // terminalInfor
      isOpenInfoTerminal: true,
      cacheTerminalSelect: {},
      terminalID: '',
      terminalName: '',
      serviceCode: '',
      errorServiceCode: '',
      websiteEcommerce: '',
      businessAddress: '',
      optionMccInternational: '',
      productBusinessDesciption: '',
      optionMccInterior: '',
      facebook: '',
      isBranchTerminal: 1,
      developmentUnit: '',
      staffByDepartment: '',
      checkLevelTerminalEmpty: false,
      isRequiredDes: true,

      // Beneficiary
      isOpenInfoBeneficiary: true,
      isOpenInfoBeneficiaryAccount: true,
      accountNumber: '',
      accountOwn: '',
      bankCode: '970489',
      branchBank: '',
      currency: 'VNĐ',
      accountTerminal: '',

      // Notifi
      isOpenInfoNotification: true,
      sms: 1,
      ott: 1,

      //
      isOpenInfoContact: true,
      fullName: '',
      numberPhone: '',
      numberPhone2: '',
      numberPhone3: '',
      numberClickAddPhone: 0,
      showNumberPhone2: false,
      showNumberPhone3: false,
      email: '',
      email2: '',
      email3: '',
      numberClickAddEmail: 0,
      showEmail2: false,
      showEmail3: false,
      isNumberPhoneSame: '',
      isEmailSame: '',
      isValidEmail: true,
      isValidPhone: true,
    };
  }

  static getDerivedStateFromProps(props) {
    const {
      listMerchantCodeName,
      listStaffByDepartment,
      cacheTerminal,
    } = props;
    const updateListMerchantCodeName = [];
    if (listMerchantCodeName) {
      for (let i = 0; i < listMerchantCodeName.length; i += 1) {
        updateListMerchantCodeName.push(
          {
            value: listMerchantCodeName[i].merchantCode,
            label: `${listMerchantCodeName[i].merchantCode} - ${listMerchantCodeName[i].merchantName}`,
          },
        );
      }
    }

    const updateListStaffByDepartment = [];

    if (listStaffByDepartment) {
      for (let i = 0; i < listStaffByDepartment.length; i += 1) {
        updateListStaffByDepartment.push(
          {
            value: listStaffByDepartment[i].id,
            label: `${listStaffByDepartment[i].staffCode}-${listStaffByDepartment[i].fullName}`,
          },
        );
      }
    }

    const updateCacheTerminal = [];
    if (cacheTerminal) {
      for (let i = 0; i < cacheTerminal.length; i += 1) {
        updateCacheTerminal.push({
          value: cacheTerminal[i].id,
          label: `${cacheTerminal[i].terminalId} - ${cacheTerminal[i].terminalName}`,
        });
      }
    }

    return {
      listMerchantCodeName: updateListMerchantCodeName,
      updateListStaffByDepartment,
      cacheTerminal: updateCacheTerminal,
    };
  }


  componentDidMount() {
    const {
      getMerchantDetail,
      getCacheTerminal,
      clearMerchantDetail,
      history,
    } = this.props;

    if (history.location.state) {
      if (localStorage.getItem('ID_MERCHANT_DETAIL') && history.location.state.haveMerchantId) {
        getMerchantDetail({
          merchantCode: JSON.parse(window.atob(localStorage.getItem('ID_MERCHANT_DETAIL'))),
          type: '0',
        });
        getCacheTerminal({
          merchantCode: JSON.parse(window.atob(localStorage.getItem('ID_MERCHANT_DETAIL'))),
          status: '1',
          terminalBranchId: '',
        });
      }
    } else {
      clearMerchantDetail();
    }
    this.getListSelectBox();
  }

  componentDidUpdate(prevProps) {
    const { notifyStatus } = this.state;
    const {
      responseServer,
      history,
      merchantDetail,
    } = this.props;
    if (responseServer !== prevProps.responseServer) {
      if (responseServer.code !== '00') {
        messageError(responseServer.description);
      } else {
        messageSuccess(`Thông tin đăng ký Terminal đã được lưu${notifyStatus}`);
        history.push('/terminal/list');
      }
    }

    if (merchantDetail !== prevProps.merchantDetail) {
      if (merchantDetail && merchantDetail.numOfTer) {
        switch (merchantDetail.numOfTer.length) {
          case 1:
            this.setState({
              terminalID: `000${merchantDetail.numOfTer}`,
            });
            break;

          case 2:
            this.setState({
              terminalID: `00${merchantDetail.numOfTer}`,
            });
            break;

          case 3:
            this.setState({
              terminalID: `0${merchantDetail.numOfTer}`,
            });
            break;
          default: break;
        }
      }
    }
  }

  componentWillUnmount() {
    const { clearMerchantCodeName } = this.props;
    clearMerchantCodeName();
  }

  getListSelectBox = () => {
    const listMccInternational = JSON.parse(localStorage && localStorage.getItem('LIST_MCC_INTERNATIONAL'));
    const listMccInterior = JSON.parse(localStorage && localStorage.getItem('LIST_MCC_INTERIOR'));
    const listBranchBank = JSON.parse(localStorage && localStorage.getItem('LIST_BRANCH_BANK'));
    const listBranchBankByUser = JSON.parse(localStorage && localStorage.getItem('LIST_BRANCH_BANK_BY_USER'));

    const updateListMccInternational = [];
    if (listMccInternational) {
      for (let i = 0; i < listMccInternational.length; i += 1) {
        updateListMccInternational.push({
          value: listMccInternational[i].id,
          label: `${listMccInternational[i].typeCode} - ${listMccInternational[i].brandName}`,
        });
      }
    }

    const updateListMccInterior = [];
    if (listMccInterior) {
      for (let i = 0; i < listMccInterior.length; i += 1) {
        updateListMccInterior.push({
          value: listMccInterior[i].id,
          label: `${listMccInterior[i].typeCode} - ${listMccInterior[i].brandName}`,
        });
      }
    }
    const updateListBranchBank = [];
    if (listBranchBank) {
      for (let i = 0; i < listBranchBank.length; i += 1) {
        updateListBranchBank.push({ value: listBranchBank[i].departmentId, label: `${listBranchBank[i].departmentName}` });
      }
    }
    const updateListBranchBankByUser = [];
    if (listBranchBankByUser) {
      for (let i = 0; i < listBranchBankByUser.length; i += 1) {
        updateListBranchBankByUser.push({
          value: listBranchBankByUser[i] && listBranchBankByUser[i].departmentId,
          label: `${listBranchBankByUser[i] && listBranchBankByUser[i].departmentName}`,
          departmentCode: listBranchBankByUser[i] && listBranchBankByUser[i].departmentCode,
        });
      }
    }

    this.setState({
      listMccInternational: updateListMccInternational,
      listMccInterior: updateListMccInterior,
      listBranchBank: updateListBranchBank,
      listBranchBankByUser: updateListBranchBankByUser,
    });
  };

  handleSave(action) {
    this.setState({
      validateForm: this.state.validateForm + 1,
    });
    if (action === '0') {
      this.setState({
        notifyStatus: ' với trạng thái Khởi Tạo',
      });
    } else {
      this.setState({
        notifyStatus: ' với trạng thái Chờ Duyệt',
      });
    }
    const {
      addTerminal,
      merchantDetail,
      levelTerminal,
    } = this.props;
    const {
      merchantCode,
      terminalID,
      terminalName,
      serviceCode,
      websiteEcommerce,
      businessAddress,
      optionMccInternational,
      productBusinessDesciption,
      optionMccInterior,
      facebook,
      isBranchTerminal,
      developmentUnit,
      staffByDepartment,
      cacheTerminalSelect,
      accountOwn,
      accountNumber,
      branchBank,
      bankCode,
      accountTerminal,
      sms,
      ott,
      fullName,
      numberPhone,
      numberPhone2,
      numberPhone3,
      email,
      email2,
      email3,
      checkLevelTerminalEmpty,
      cacheTerminal,
      isValidEmail,
      isValidPhone,
    } = this.state;

    const terminal = {
      terminalId: terminalID || '',
      terminalName: terminalName || '',
      tserviceCode: serviceCode || '',
      terminalBusinessAddress: businessAddress || '',
      websiteBusiness: websiteEcommerce || '',
      businessProduct: parseInt(optionMccInternational.value, 10) || 0,
      mcc: optionMccInterior.value || '',
      productDesc: productBusinessDesciption || '',
      facebook: facebook || '',
      accountHolder: accountOwn || '',
      accountNumber: accountNumber || '',
      bankCode: bankCode || '970489',
      bankBranch: branchBank || '',
      currency: 'VND',
      visaPan: '',
      masterPan: '',
      unionpayPan: '',
      registerQrcode: 0,
      registerVnpayment: 0,
      jcbPan: '',
      dciPan: '',
      feeOnUs: 0,
      feeOfUs: 0,
      registerSms: sms || 1,
      registerOtt: ott || 1,
      terminalAppUser: accountTerminal || '',
      terminalDocument: 'string',
      createUser: 'string',
      terminalLevel: isBranchTerminal || 0,
      branchTerminalId: cacheTerminalSelect
        ? cacheTerminalSelect.value
          ? parseInt(cacheTerminalSelect.value, 10) : 0 : 0,
      department: developmentUnit || 0,
      staff: (staffByDepartment && staffByDepartment.value) || 0,
    };
    const terminalContact = {
      fullName: fullName || '',
      phoneNumber: numberPhone || '',
      phoneNumber1: numberPhone2 || '',
      phoneNumber2: numberPhone3 || '',
      email: email || '',
      email1: email2 || '',
      email2: email3 || '',
    };
    const dataTerminal = {
      merchantCode: merchantCode.value
        ? merchantCode.value : merchantDetail.merchantCode || 0,
      terminal,
      terminalContact,
      action,
      hashData: 'string',
    };
    this.form.validateAll();

    let checkServiceCode;
    if (merchantDetail && merchantDetail.providerCode) {
      checkServiceCode = !!(terminal && terminal.tserviceCode);
    } else checkServiceCode = !(terminal && terminal.tserviceCode);

    const errors = this.form.getChildContext()._errors;
    const elements = this.form.state.byId;

    if (checkRequiredSelect(merchantCode) !== false) {
      scroll('add-merchant-code');
    } else if (checkRequiredInputSpecial(checkLevelTerminalEmpty) !== false) {
      scroll('add-level', true);
    } else if (checkRequiredInputSpecial(cacheTerminal) !== false) {
      scroll('add-merchant-branch', true);
    } else if (checkRequiredSelect(optionMccInternational) !== false) {
      scroll('add-mcc-international');
    } else if (checkRequiredSelect(optionMccInterior) !== false) {
      scroll('add-mcc-inland');
    } else if (checkRequiredSelect(developmentUnit) !== false && levelTerminal === 1) {
      scroll('add-development-unit');
    } else if (checkRequiredSelect(staffByDepartment.value) !== false && levelTerminal === 1) {
      scroll('add-staff');
    } else if (checkRequiredInputSpecial(accountNumber) !== false && levelTerminal === 2) {
      scroll('add-account-number', true);
    } else if (checkRequiredInputSpecial(accountOwn) !== false && levelTerminal === 2) {
      scroll('add-account-own', true);
    } else if (checkRequiredSelect(branchBank) !== false && levelTerminal === 2) {
      scroll('add-branch');
    } else if (checkRequiredInputSpecial(accountTerminal) !== false && levelTerminal === 1) {
      scroll('add-phone', true);
    } else if (checkRequiredInputSpecial(fullName) !== false && levelTerminal === 2) {
      scroll('add-fullName', true);
    } else if (checkRequiredInputSpecial(numberPhone) !== false && levelTerminal === 2) {
      scroll('add-number-phone', true);
    } else if (checkRequiredInputSpecial(email) !== false && levelTerminal === 2) {
      scroll('add-email', true);
    } else if (errors.length > 0) {
      const elementFiltered = elements[errors[0]];
      scroll(`${elementFiltered.id}`, true);
    }
    if (levelTerminal === 1) {
      if (
        (this.form.getChildContext()._errors.length === 0)
        && dataTerminal.merchantCode && terminal.terminalLevel
        && terminal.terminalId && terminal.terminalName
        && terminal.businessProduct
        && terminal.mcc && terminal.department
        && terminal.staff && terminal.terminalAppUser
        && checkServiceCode
        && isValidEmail
        && isValidPhone
      ) {
        addTerminal(dataTerminal);
      }
    } else if (
      (this.form.getChildContext()._errors.length === 0)
      && dataTerminal.merchantCode && terminal.terminalLevel
      && terminal.terminalId && terminal.terminalName && terminal.branchTerminalId
      && terminal.businessProduct
      && terminal.mcc && terminal.accountHolder
      && terminal.accountNumber && terminal.bankBranch && terminalContact.fullName
      && terminalContact.phoneNumber && terminalContact.email
      && checkServiceCode
      && isValidEmail
      && isValidPhone
    ) {
      addTerminal(dataTerminal);
    }
  }

  getListMerchantStatus = (itemCode) => {
    const listMerchantStatus = JSON.parse(localStorage && localStorage.getItem('MERCHANT'));
    return getStatusUI(listMerchantStatus, itemCode);
  };

  handOpenInfo = () => {
    const { isOpenInfo } = this.state;
    this.setState({
      isOpenInfo: !isOpenInfo,
    });
  };

  handOpenAccount = () => {
    const { isOpenAccount } = this.state;
    this.setState({
      isOpenAccount: !isOpenAccount,
    });
  };

  handOpenInfoDevelopmentBranch = () => {
    const { isOpenInfoDevelopmentBranch } = this.state;
    this.setState({
      isOpenInfoDevelopmentBranch: !isOpenInfoDevelopmentBranch,
    });
  };

  handleChangeMerchant = (merchantCodeOption) => {
    const {
      getMerchantDetail,
      getCacheTerminal,
    } = this.props;
    this.setState({
      merchantCode: merchantCodeOption,
      serviceCode: '',
    }, () => {
      getMerchantDetail({
        merchantCode: merchantCodeOption.value,
        type: '0',
      });
      getCacheTerminal({
        merchantCode: merchantCodeOption.value,
        status: '1',
        terminalBranchId: '',
      });
    });
  };

  // terminal Info

  handleChangeCacheTerminal = (cacheTerminalOption) => {
    if (cacheTerminalOption) {
      this.setState({
        cacheTerminalSelect: cacheTerminalOption,
      });
    }
  };

  handleChangeTerminalID = (event) => {
    this.setState({
      terminalID: event.target.value,
    });
  };

  handleChangeTerminalName = (event) => {
    this.setState({
      terminalName: event.target.value,
    });
  };

  handleChangeServiceCode = (event) => {
    const { merchantDetail } = this.props;
    if (merchantDetail && merchantDetail.merchantCode) {
      if (merchantDetail.providerCode) {
        this.setState({
          serviceCode: event.target.value,
          errorServiceCode: '',
        });
      } else if (event && event.target.value) {
        this.setState({
          serviceCode: event.target.value,
          errorServiceCode: 'Bạn cần nhập mã nhà cung cấp tại thông tin Merchant trước khi nhập mã dịch vụ tại Terminal',
        });
      } else {
        this.setState({
          serviceCode: event.target.value,
          errorServiceCode: '',
        });
      }
    }
  };

  handleChangeWebsiteEcommerce = (event) => {
    this.setState({
      websiteEcommerce: event.target.value,
    });
  };

  handleChangeBusinessAddress = (event) => {
    this.setState({
      businessAddress: event.target.value,
    });
  };

  handleChangeMccInternational = (mccInternationalSelected) => {
    if (mccInternationalSelected) {
      this.setState({
        optionMccInternational: mccInternationalSelected,
        isRequiredDes: mccInternationalSelected.value === -1,
      });
    }
  };

  handleChangeProductBusinessDesciption = (event) => {
    this.setState({
      productBusinessDesciption: event.target.value,
    });
  };

  handleChangeMccInterior = (mccInteriorSelected) => {
    if (mccInteriorSelected) {
      this.setState({
        optionMccInterior: mccInteriorSelected,
      });
    }
  };

  handleChangeBranch = (event) => {
    const { setLevelTerminal } = this.props;
    this.setState({
      isBranchTerminal: 1,
      checkLevelTerminalEmpty: true,
    }, () => {
      setLevelTerminal(this.state.isBranchTerminal);
    });
  };

  handleChangeTerminal = (event) => {
    const { setLevelTerminal } = this.props;
    this.setState({
      isBranchTerminal: 2,
      checkLevelTerminalEmpty: true,
    }, () => {
      setLevelTerminal(this.state.isBranchTerminal);
    });
  };

  handleChangeFacebook = (event) => {
    this.setState({
      facebook: event.target.value,
    });
  };

  handleDevelopmentUnit = (unitSelected) => {
    const { getAllStaffByDepartment } = this.props;
    if (unitSelected) {
      this.setState({
        developmentUnit: unitSelected.value,
        staffByDepartment: {}
      }, () => {
        getAllStaffByDepartment({ departmentCode: unitSelected.departmentCode });
      });
    }else{
      this.setState({
        developmentUnit: {},
        staffByDepartment: {}
      })
    }
  };

  handleStaffByDepartment = (staffByDepartmentSelected) => {
    if (staffByDepartmentSelected) {
      this.setState({
        staffByDepartment: staffByDepartmentSelected,
      });
    }else{
      this.setState({
        staffByDepartment: {}
      })
    }
  };

  handOpenInfoTerminal = () => {
    const { isOpenInfoTerminal } = this.state;
    this.setState({
      isOpenInfoTerminal: !isOpenInfoTerminal,
    });
  };

  handOpenInfoBeneficiary = () => {
    const { isOpenInfoBeneficiary } = this.state;
    this.setState({
      isOpenInfoBeneficiary: !isOpenInfoBeneficiary,
    });
  };

  handOpenInfoBeneficiaryAccount = () => {
    const { isOpenInfoBeneficiaryAccount } = this.state;
    this.setState({
      isOpenInfoBeneficiaryAccount: !isOpenInfoBeneficiaryAccount,
    });
  };

  handleChangeAccountNumber = (event) => {
    this.setState({
      accountNumber: event.target.value,
    });
  };

  handleChangeAccountOwn = (event) => {
    this.setState({
      accountOwn: event.target.value,
    });
  };

  handleChangeBranchBank = (branchBankSelected) => {
    if (branchBankSelected) {
      this.setState({
        branchBank: branchBankSelected.value,
      });
    }
  };

  handleChangeAccountTerminal = (event) => {
    this.setState({
      accountTerminal: event.target.value,
    });
  };

  handOpenInfoNotification = () => {
    const { isOpenInfoNotification } = this.state;
    this.setState({
      isOpenInfoNotification: !isOpenInfoNotification,
    });
  };

  handleClickSms = (event) => {
    if (event.target.checked) {
      this.setState({
        sms: 1,
      });
    } else {
      this.setState({
        sms: 2,
      });
    }
  };

  handleClickOtt = (event) => {
    if (event.target.checked) {
      this.setState({
        ott: 1,
      });
    } else {
      this.setState({
        ott: 2,
      });
    }
  };

  handleChangeFullName = (event) => {
    this.setState({
      fullName: event.target.value,
    });
  };

  handleChangeNumberPhone = (event) => {
    const { numberPhone2, numberPhone3 } = this.state;
    this.setState({
      numberPhone: event.target.value,
    });
    if (numberPhone2 && numberPhone3 && (event.target.value === numberPhone3 || event.target.value === numberPhone2)) {
      this.setState({
        isNumberPhoneSame: 'Số điện thoại trùng nhau',
        isValidPhone: false,
      });
    } else if ( numberPhone2 !== numberPhone3 && event.target.value !== numberPhone3 && event.target.value !== numberPhone2) {
      this.setState({
        isNumberPhoneSame: '',
        isValidPhone: true,
      });
    } else if (numberPhone2 && (event.target.value === numberPhone3 || event.target.value === numberPhone2)) {
      this.setState({
        isNumberPhoneSame: 'Số điện thoại trùng nhau',
        isValidPhone: false,
      });
    } else if (!event.target.value && !numberPhone2 && !numberPhone3) {
      this.setState({
        isValidPhone: true,
        isNumberPhoneSame: '',
      })
    } 
  };

  handleChangeNumberPhone2 = (event) => {
    const { numberPhone, numberPhone3 } = this.state;
    this.setState({
      numberPhone2: event.target.value,
    });
    if (numberPhone && (event.target.value === numberPhone || (numberPhone3 && event.target.value === numberPhone3))) {
      this.setState({
        isNumberPhoneSame: 'Số điện thoại trùng nhau',
        isValidPhone: false,
      });
    } else if (numberPhone3 !== numberPhone && numberPhone !== event.target.value && event.target.value !== numberPhone3) {
      this.setState({
        isNumberPhoneSame: '',
        isValidPhone: true,
      });
    }
  };

  handleChangeNumberPhone3 = (event) => {
    const { numberPhone2, numberPhone } = this.state;
    this.setState({
      numberPhone3: event.target.value,
    });
  
    if (numberPhone2 && numberPhone && (event.target.value === numberPhone2 || event.target.value === numberPhone)) {
      this.setState({
        isNumberPhoneSame: 'Số điện thoại trùng nhau',
        isValidPhone: false,
      });
    } else if (numberPhone2 !== numberPhone && event.target.value !== numberPhone2 && event.target.value !== numberPhone) {
      this.setState({
        isNumberPhoneSame: '',
        isValidPhone: true,
      });
    }
  };

  handleChangeEmail = (event) => {
    const { email2, email3 } = this.state;
    this.setState({
      email: event.target.value,
    });
    if (email2 && email3 && (event.target.value === email3 || event.target.value === email2)) {
      this.setState({
        isEmailSame: 'Email trùng nhau',
        isValidEmail: false,
      });
    } else if (email2 !== email3 && event.target.value !== email3 && event.target.value !== email2) {
      this.setState({
        isEmailSame: '',
        isValidEmail: true,
      });
    } else if (email2 && (event.target.value === email3 || event.target.value === email2)) {
      this.setState({
        isEmailSame: 'Email trùng nhau',
        isValidEmail: false,
      });
    } else if (!event.target.value && !email2 && !email3) {
      this.setState({
        isValidEmail: true,
        isEmailSame: '',
      });
    }
  };

  handleChangeEmail2 = (event) => {
    const { email, email3 } = this.state;
    this.setState({
      email2: event.target.value,
    });
    if (email && (event.target.value === email || (email3 && event.target.value === email3))) {
      this.setState({
        isEmailSame: 'Email trùng nhau',
        isValidEmail: false,
      });
    } else if (email3 !== email && email !== event.target.value && event.target.value !== email3) {
      this.setState({
        isEmailSame: '',
        isValidEmail: true,
      });
    }
  };

  handleChangeEmail3 = (event) => {
    const { email, email2 } = this.state;
    this.setState({
      email3: event.target.value,
    });
    if (email2 && email && (event.target.value === email2 || event.target.value === email)) {
      this.setState({
        isEmailSame: 'Email trùng nhau',
        isValidEmail: false,
      });
    } else if (email2 !== email && event.target.value !== email2 && event.target.value !== email) {
      this.setState({
        isEmailSame: '',
        isValidEmail: true,
      });
    }
  };

  addNewRowPhone = () => {
    const {
      numberClickAddPhone,
      numberPhone,
      numberPhone2,
    } = this.state;
    if (numberClickAddPhone === 0) {
      if (numberPhone) {
        this.setState({
          numberClickAddPhone: 1,
          showNumberPhone2: true,
        });
      }
    } else if (numberPhone2) {
      this.setState({
        showNumberPhone3: true,
      });
    }
  };

  deleteNewRowPhone2 = () => {
    const { numberPhone, numberPhone3 } = this.state;
    const {
      showNumberPhone3,
    } = this.state;
    if (!showNumberPhone3) {
      this.setState({
        numberClickAddPhone: 0,
        showNumberPhone2: false,
        numberPhone2: '',
      });
    }
    if (numberPhone3 !== numberPhone || !numberPhone3) {
      this.setState({
        isValidPhone: true,
        isNumberPhoneSame: '',
      });
    }
  };

  deleteNewRowPhone3 = () => {
    const { numberPhone2, numberPhone } = this.state;
    this.setState({
      numberClickAddPhone: 1,
      showNumberPhone3: false,
      numberPhone3: '',
    });
    if (numberPhone2 !== numberPhone || !numberPhone2) {
      this.setState({
        isValidPhone: true,
        isNumberPhoneSame: '',
      });
    }
  };

  addNewRowEmail = () => {
    const {
      numberClickAddEmail,
      email,
      email2,
    } = this.state;
    if (numberClickAddEmail === 0) {
      if (email) {
        this.setState({
          numberClickAddEmail: 1,
          showEmail2: true,
        });
      }
    } else if (email2) {
      this.setState({
        showEmail3: true,
      });
    }
  };

  deleteNewRowEmail2 = () => {
    const { email, email3 } = this.state;
    const {
      showEmail3,
    } = this.state;
    if (!showEmail3) {
      this.setState({
        numberClickAddEmail: 0,
        showEmail2: false,
        email2: '',
      });
    }
    if (email3 !== email || !email3) {
      this.setState({
        isValidEmail: true,
        isEmailSame: '',
      });
    }
  };

  deleteNewRowEmail3 = () => {
    const { email, email2 } = this.state;
    this.setState({
      numberClickAddEmail: 1,
      showEmail3: false,
      email3: '',
    });
    if (email2 !== email || !email2) {
      this.setState({
        isValidEmail: true,
        isEmailSame: '',
      });
    }
  };

  handOpenInfoContact = () => {
    const { isOpenInfoContact } = this.state;
    this.setState({
      isOpenInfoContact: !isOpenInfoContact,
    });
  };

  onInputChangeMerchant = (value) => {
    const { getMerchantCodeName } = this.props;
    if (value && value.length > 2) {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        getMerchantCodeName({
          status: '1',
          paternSearch: value,
        });
      }, 500);
    }
  };

  render() {
    const {
      history,
      merchantDetail,
      levelTerminal,
    } = this.props;

    const {
      listMccInternational,
      listMccInterior,
      listBranchBank,
      listBranchBankByUser,
      validateForm,
      isOpenInfo,
      isOpenAccount,
      listMerchantCodeName,
      merchantCode,
      isOpenInfoDevelopmentBranch,
      isOpenInfoTerminal,
      isBranchTerminal,
      updateListStaffByDepartment,
      cacheTerminal,
      checkLevelTerminalEmpty,
      serviceCode,
      errorServiceCode,
      optionMccInternational,
      optionMccInterior,
      developmentUnit,
      staffByDepartment,
      isOpenInfoBeneficiary,
      isOpenInfoBeneficiaryAccount,
      branchBank,
      accountOwn,
      accountNumber,
      accountTerminal,
      isOpenInfoNotification,
      sms,
      ott,
      isOpenInfoContact,
      showNumberPhone2,
      showNumberPhone3,
      showEmail2,
      showEmail3,
      fullName,
      numberPhone,
      email,
      isRequiredDes,
      terminalID,
      isNumberPhoneSame,
      isEmailSame,
    } = this.state;

    return (
      <div className="my-requests" style={{position: 'relative'}}>
        <Form ref={(addTerminalForm) => { this.form = addTerminalForm; }}>
          <Card className="card-my-requests">
            <CardHeader>
              <Col xs="12">
                <FormGroup style={{ marginBottom: 0 }} row>
                  <Col lg="6" style={{ paddingLeft: 0 }}>
                    <span className="text-bold">{Constants.MnMerchant.titleAddTerminal}</span>
                  </Col>
                </FormGroup>
              </Col>
            </CardHeader>
            <CardBody>
              <Row>
                <Col className="col-md-6 col-12">
                  <Row>
                    <div className="col-md-12">
                      <div className="widget-box transparent">
                        <div className="widget-header widget-header-flat" role="presentation" onClick={this.handOpenInfo} onKeyPress={this.handOpenInfo}>
                          <span className="text-bold">Thông tin merchant</span>
                          <div className="widget-toolbar">
                            <span data-action="collapse">
                              {isOpenInfo ? (
                                <i className="ace-icon fa fa-chevron-up" />
                              ) : (
                                <i className="ace-icon fa fa-chevron-down" />
                              )}
                            </span>
                          </div>
                        </div>
                        <Collapse isOpen={isOpenInfo} className="show-information">
                          <Card>
                            <CardBody>
                              <FormGroup row>
                                <Col lg="5">
                                  <Label htmlFor="code">
                                    {Constants.MnMerchant.merchantName}
                                    {' '}
                                    <span className="text-danger">*</span>
                                  </Label>
                                </Col>
                                <Col lg="7">
                                  <Select
                                    id="add-merchant-code"
                                    label={Constants.MnMerchant.merchantName}
                                    value={merchantCode.value
                                      ? merchantCode : ((merchantDetail.merchantCode) ? {
                                        value: merchantDetail.merchantCode,
                                        label: `${merchantDetail.merchantCode}-${merchantDetail.merchantName}`,
                                      } : {
                                        value: 0,
                                        label: 'Chọn',
                                      })}
                                    options={listMerchantCodeName}
                                    onChange={this.handleChangeMerchant}
                                    onInputChange={this.onInputChangeMerchant}
                                  />
                                  {(merchantDetail && validateForm && !merchantDetail.merchantCode)
                                    ? checkRequiredSelect(merchantCode, Constants.MnMerchant.merchantName) : ''}
                                </Col>
                              </FormGroup>
                              <FormGroup row>
                                <Col lg="5">
                                  <Label>
                                    {Constants.MnMerchant.shortName}
                                    {' '}
                                    <span className="text-danger">*</span>
                                  </Label>
                                </Col>
                                <Col lg="7">
                                  <Label>
                                    { (merchantDetail) ? merchantDetail.merchantBrand : ''}
                                  </Label>
                                </Col>
                              </FormGroup>
                              <FormGroup row>
                                <Col lg="5">
                                  <Label>
                                    {Constants.MnMerchant.masterMerchant}
                                  </Label>
                                </Col>
                                <Col lg="7">
                                  <Label>
                                    { (merchantDetail) ? merchantDetail.masterMerchant : ''}
                                  </Label>
                                </Col>
                              </FormGroup>
                              <FormGroup row>
                                <Col lg="5">
                                  <Label>
                                    {Constants.MnMerchant.supplierCode}
                                  </Label>
                                </Col>
                                <Col lg="7">
                                  <Label>
                                    { (merchantDetail) ? merchantDetail.providerCode : ''}
                                  </Label>
                                </Col>
                              </FormGroup>
                              <FormGroup row>
                                <Col lg="5">
                                  <Label>
                                    {Constants.MnMerchant.nationalMCC}
                                    {' '}
                                    <span className="text-danger">*</span>
                                  </Label>
                                </Col>
                                <Col lg="7">
                                  <Label>
                                    { (merchantDetail)
                                      ? merchantDetail.merchantTypeCode ? `${merchantDetail.merchantTypeCode} - ${merchantDetail.merchantTypeName}`
                                        : '' : ''}
                                  </Label>
                                </Col>
                              </FormGroup>
                              <FormGroup row>
                                <Col lg="5">
                                  <Label>
                                    {Constants.MnMerchant.registeredBusinessAddress}
                                    {' '}
                                    <span className="text-danger">*</span>
                                  </Label>
                                </Col>
                                <Col lg="7">
                                  <Label>
                                    { (merchantDetail) ? merchantDetail.merchantBusinessAddress : ''}
                                  </Label>
                                </Col>
                              </FormGroup>
                              <FormGroup row>
                                <Col lg="5">
                                  <Label>
                                    {Constants.MnMerchant.businessAddress}
                                  </Label>
                                </Col>
                                <Col lg="7">
                                  <Label>
                                    { (merchantDetail) ? merchantDetail.address : ''}
                                  </Label>
                                </Col>
                              </FormGroup>
                              <FormGroup row>
                                <Col lg="5">
                                  <Label>
                                    {Constants.MnMerchant.city}
                                    {' '}
                                    <span className="text-danger">*</span>
                                  </Label>
                                </Col>
                                <Col lg="7">
                                  <Label>
                                    { (merchantDetail) ? merchantDetail.provinceName : ''}
                                  </Label>
                                </Col>
                              </FormGroup>
                              <FormGroup row>
                                <Col lg="5">
                                  <Label>
                                    {Constants.MnMerchant.district}
                                    {' '}
                                    <span className="text-danger">*</span>
                                  </Label>
                                </Col>
                                <Col lg="7">
                                  <Label>
                                    { (merchantDetail) ? merchantDetail.districtName : ''}
                                  </Label>
                                </Col>
                              </FormGroup>
                              <FormGroup row>
                                <Col lg="5">
                                  <Label>
                                    {Constants.MnMerchant.zipCode}
                                  </Label>
                                </Col>
                                <Col lg="7">
                                  <Label>
                                    { (merchantDetail) ? merchantDetail.pinCode : ''}
                                  </Label>
                                </Col>
                              </FormGroup>
                              <FormGroup row>
                                <Col lg="5">
                                  <Label>
                                    {Constants.MnMerchant.taxCode}
                                    {' '}
                                    <span className="text-danger">*</span>
                                  </Label>
                                </Col>
                                <Col lg="7">
                                  <Label>
                                    { (merchantDetail) ? merchantDetail.merchantCode : ''}
                                  </Label>
                                </Col>
                              </FormGroup>
                              <FormGroup row>
                                <Col lg="5">
                                  <Label>
                                    {Constants.MnMerchant.website}
                                  </Label>
                                </Col>
                                <Col lg="7">
                                  <Label>
                                    { (merchantDetail) ? merchantDetail.website : '' }
                                  </Label>
                                </Col>
                              </FormGroup>
                              <FormGroup row>
                                <Col lg="5">
                                  <Label>
                                    {Constants.MerchantDetail.status}
                                  </Label>
                                </Col>
                                <Col lg="7">
                                  <Label>
                                    { (merchantDetail) ? this.getListMerchantStatus(merchantDetail.status) : '' || '' }
                                  </Label>
                                </Col>
                              </FormGroup>
                            </CardBody>
                          </Card>
                        </Collapse>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="widget-box transparent">
                        <div className="widget-header widget-header-flat" role="presentation" onClick={this.handOpenAccount} onKeyPress={this.handOpenAccount}>
                          <span className="text-bold">{Constants.MerchantDetail.accountMerchantWebAndApp}</span>
                          <div className="widget-toolbar">
                            <span data-action="collapse">
                              {isOpenAccount ? (
                                <i className="ace-icon fa fa-chevron-up" />
                              ) : (
                                <i className="ace-icon fa fa-chevron-down" />
                              )}
                            </span>
                          </div>
                        </div>
                        <Collapse isOpen={isOpenAccount} className="show-information">
                          <Card>
                            <CardBody>
                              <FormGroup row>
                                <Col lg="6">
                                  <Label>
                                    {Constants.MerchantDetail.accountMerchant}
                                  </Label>
                                </Col>
                                <Col lg="6">
                                  <Label>
                                    { (merchantDetail) ? merchantDetail.merchantSiteUser : ''}
                                  </Label>
                                </Col>
                              </FormGroup>
                            </CardBody>
                          </Card>
                        </Collapse>
                      </div>
                    </div>
                  </Row>
                  <Row>
                    <div className="col-md-12">
                      <div className="widget-box transparent">
                        <div className="widget-header widget-header-flat" role="presentation" onClick={this.handOpenInfoDevelopmentBranch} onKeyPress={this.handOpenInfoDevelopmentBranch}>
                          <span className="text-bold">{Constants.MnMerchant.agentDevelopmentBranch}</span>
                          <div className="widget-toolbar">
                            <span data-action="collapse">
                              {isOpenInfoDevelopmentBranch ? (
                                <i className="ace-icon fa fa-chevron-up" />
                              ) : (
                                <i className="ace-icon fa fa-chevron-down" />
                              )}
                            </span>
                          </div>
                        </div>
                        <Collapse isOpen={isOpenInfoDevelopmentBranch} className="show-information">
                          <Card>
                            <CardBody>
                              <FormGroup row>
                                <Col md="5">
                                  <Label>
                                    {Constants.MerchantDetail.developmentUnit}
                                  </Label>
                                </Col>
                                <Col md="7">
                                  <Label>
                                    { merchantDetail ? merchantDetail.departmentName : ''}
                                  </Label>
                                </Col>
                              </FormGroup>
                              <FormGroup row>
                                <Col md="5">
                                  <Label>
                                    {Constants.MerchantDetail.staff}
                                  </Label>
                                </Col>
                                <Col md="7">
                                  <Label>
                                    { merchantDetail ? merchantDetail.id ? `${merchantDetail.staffCode} - ${merchantDetail.staffName}` : '' : ''}
                                  </Label>
                                </Col>
                              </FormGroup>
                            </CardBody>
                          </Card>
                        </Collapse>
                      </div>
                    </div>
                  </Row>
                </Col>
                <Col className="col-md-6 col-12">
                  <Row>
                    <div className="col-md-12">
                      <div className="widget-box transparent">
                        <div className="widget-header widget-header-flat" role="presentation" onClick={this.handOpenInfoTerminal} onKeyPress={this.handOpenInfoTerminal}>
                          <span className="text-bold">{Constants.MnMerchant.terminalTitle}</span>
                          <div className="widget-toolbar">
                            <span data-action="collapse">
                              {isOpenInfoTerminal ? (
                                <i className="ace-icon fa fa-chevron-up" />
                              ) : (
                                <i className="ace-icon fa fa-chevron-down" />
                              )}
                            </span>
                          </div>
                        </div>
                        <Collapse isOpen={isOpenInfoTerminal} className="show-information">
                          <Card>
                            <CardBody>
                              <FormGroup row>
                                <Col lg="5">
                                  <Label style={{ color: 'red' }}>
                                    {Constants.MnTerminal.level}
                                    {' '}
                                    <span className="text-danger">*</span>
                                  </Label>
                                </Col>
                                <Col lg="7">
                                  <FormGroup row className="mb-0" id="add-level">
                                    <FormGroup className="col-md-6 text-danger">
                                      <Input
                                        type="radio"
                                        lable={Constants.MnTerminal.branch}
                                        name="terminal"
                                        onClick={this.handleChangeBranch}
                                      />
                                      <span className="ml-1">{Constants.MnTerminal.branch}</span>
                                    </FormGroup>
                                    <FormGroup className="col-md-6 text-danger">
                                      <Input
                                        type="radio"
                                        lable={Constants.MnTerminal.pointSale}
                                        name="terminal"
                                        onClick={this.handleChangeTerminal}
                                      />
                                      <span className="ml-1">{Constants.MnTerminal.pointSale}</span>
                                    </FormGroup>
                                    <div style={{ paddingLeft: '15px' }}>
                                      {(validateForm && !checkLevelTerminalEmpty)
                                        ? checkRequiredSelect(checkLevelTerminalEmpty, Constants.MnTerminal.level) : ''}
                                    </div>
                                  </FormGroup>
                                </Col>
                              </FormGroup>
                              {isBranchTerminal === 2 && (
                                <FormGroup row>
                                  <Col lg="5">
                                    <Label style={{ color: 'red' }}>
                                      {Constants.MnTerminal.titleInfoTerminal}
                                      {' '}
                                      <span className="text-danger">*</span>
                                    </Label>
                                  </Col>
                                  <Col lg="7">
                                    <Select
                                      id="add-merchant-branch"
                                      placeholder="Chọn"
                                      options={cacheTerminal}
                                      onChange={this.handleChangeCacheTerminal}
                                    />
                                    {(validateForm && isBranchTerminal === 2) ? checkRequiredInputSpecial(cacheTerminal, Constants.MnTerminal.titleInfoTerminal) : ''}
                                  </Col>
                                </FormGroup>
                              )}
                              <FormGroup row>
                                <Col lg="5">
                                  <Label>
                                    {Constants.MnMerchant.terminalID}
                                    {' '}
                                    <span className="text-danger">*</span>
                                  </Label>
                                </Col>
                                <Col lg="7">
                                  <Input
                                    id="add-terminal-id"
                                    value={terminalID}
                                    label={Constants.MnMerchant.terminalID}
                                    type="text"
                                    className="form-control"
                                    name="code"
                                    onChange={this.handleChangeTerminalID}
                                    maxLength={8}
                                    validations={[
                                      checkRequiredInput,
                                      checkLength28,
                                      checkContainSpecialCharacters,
                                      checkContainSpace,
                                      isValidVietnamese,
                                    ]}
                                  />
                                </Col>
                              </FormGroup>
                              <FormGroup row>
                                <Col lg="5">
                                  <Label>
                                    {Constants.MnMerchant.terminalName}
                                    {' '}
                                    <span className="text-danger">*</span>
                                  </Label>
                                </Col>
                                <Col lg="7">
                                  <Input
                                    id="add-terminal-name"
                                    value=""
                                    label={Constants.MnMerchant.terminalName}
                                    type="text"
                                    className="form-control"
                                    name="code"
                                    maxLength={20}
                                    onChange={this.handleChangeTerminalName}
                                    validations={[
                                      checkRequiredInput,
                                      checkContainSpecialCharacters,
                                      isValidVietnamese,
                                      checkLength20,
                                    ]}
                                  />
                                </Col>
                              </FormGroup>
                              {(merchantDetail && merchantDetail.providerCode) ? (
                                <>
                                  <FormGroup row>
                                    <Col lg="5">
                                      <Label>
                                        {Constants.MnMerchant.serviceCode}
                                        {' '}
                                        <span className="text-danger">*</span>
                                      </Label>
                                    </Col>
                                    <Col lg="7">
                                      <Input
                                        value={serviceCode}
                                        label={Constants.MnMerchant.serviceCode}
                                        type="text"
                                        className="form-control"
                                        name="code"
                                        onChange={this.handleChangeServiceCode}
                                        maxLength={20}
                                        validations={[
                                          checkLength20,
                                        ]}
                                      />
                                      {validateForm ? checkRequiredInputSpecial(serviceCode, Constants.MnMerchant.serviceCode) : ''}
                                    </Col>
                                  </FormGroup>
                                </>
                              ) : (
                                <>
                                  <FormGroup row>
                                    <Col lg="5">
                                      <Label>
                                        {Constants.MnMerchant.serviceCode}
                                      </Label>
                                    </Col>
                                    <Col lg="7">
                                      <Input
                                        value={serviceCode}
                                        label={Constants.MnMerchant.serviceCode}
                                        type="text"
                                        className="form-control"
                                        name="code"
                                        onChange={this.handleChangeServiceCode}
                                        maxLength={20}
                                        validations={[
                                          checkLength20,
                                        ]}
                                      />
                                      <div><span className="text-danger">{errorServiceCode}</span></div>
                                    </Col>
                                  </FormGroup>
                                </>
                              )}
                              <FormGroup row>
                                <Col lg="5">
                                  <Label>
                                    {Constants.MnMerchant.websiteEcommerce}
                                  </Label>
                                </Col>
                                <Col lg="7">
                                  <Input
                                    value=""
                                    label={Constants.MnMerchant.websiteEcommerce}
                                    type="text"
                                    className="form-control"
                                    name="code"
                                    onChange={this.handleChangeWebsiteEcommerce}
                                    validations={[
                                      checkLength100,
                                      checkContainSpace,
                                    ]}
                                  />
                                </Col>
                              </FormGroup>
                              <FormGroup row>
                                <Col lg="5">
                                  <Label>
                                    {Constants.MnMerchant.businessAddress}
                                  </Label>
                                </Col>
                                <Col lg="7">
                                  <Input
                                    value=""
                                    label={Constants.MnMerchant.businessAddress}
                                    type="text"
                                    className="form-control"
                                    name="code"
                                    onChange={this.handleChangeBusinessAddress}
                                    validations={[
                                      checkLength150,
                                    ]}
                                  />
                                </Col>
                              </FormGroup>
                              <FormGroup row>
                                <Col lg="5">
                                  <Label>
                                    {Constants.MnMerchant.nationalMCC}
                                    {' '}
                                    <span className="text-danger">*</span>
                                  </Label>
                                </Col>
                                <Col lg="7">
                                  <Select
                                    id="add-mcc-international"
                                    placeholder="Chọn"
                                    options={listMccInternational}
                                    onChange={this.handleChangeMccInternational}
                                  />
                                  {validateForm ? checkRequiredSelect(optionMccInternational, Constants.MnMerchant.nationalMCC) : ''}
                                </Col>
                              </FormGroup>
                              <FormGroup row>
                                <Col lg="5">
                                  <Label>
                                    {Constants.MnMerchant.productBusinessDesciption}
                                    {' '}
                                    {isRequiredDes && (
                                      <span className="text-danger">*</span>
                                    )}
                                  </Label>
                                </Col>
                                <Col lg="7">
                                  {isRequiredDes ? (
                                    <FormGroup style={{ width: '100%', display: 'inline-block' }}>
                                      <Textarea
                                        id="add-des-business"
                                        label={Constants.MnMerchant.productBusinessDesciption}
                                        name="productBusinessDesciptionRequired"
                                        className="form-control"
                                        maxLength={200}
                                        style={{ height: '90px' }}
                                        onChange={this.handleChangeProductBusinessDesciption}
                                        validations={[
                                          checkRequiredInput,
                                          checkLength200,
                                        ]}
                                      />
                                    </FormGroup>
                                  ) : (
                                    <Textarea
                                      label={Constants.MnMerchant.productBusinessDesciption}
                                      name="productBusinessDesciption"
                                      className="form-control"
                                      style={{ height: '90px' }}
                                      maxLength={200}
                                      onChange={this.handleChangeProductBusinessDesciption}
                                      validations={[checkLength200]}
                                    />
                                  )}
                                </Col>
                              </FormGroup>
                              <FormGroup row>
                                <Col lg="5">
                                  <Label>
                                    {Constants.MnMerchant.inlandMCC}
                                    {' '}
                                    <span className="text-danger">*</span>
                                  </Label>
                                </Col>
                                <Col lg="7">
                                  <Select
                                    id="add-mcc-inland"
                                    placeholder="Chọn"
                                    options={listMccInterior}
                                    onChange={this.handleChangeMccInterior}
                                  />
                                  {validateForm ? checkRequiredSelect(optionMccInterior, Constants.MnMerchant.inlandMCC) : ''}
                                </Col>
                              </FormGroup>
                              <FormGroup row>
                                <Col lg="5">
                                  <Label>
                                    {Constants.MnMerchant.facebook}
                                  </Label>
                                </Col>
                                <Col lg="7">
                                  <Input
                                    value=""
                                    label={Constants.MnMerchant.facebook}
                                    type="text"
                                    className="form-control"
                                    name="code"
                                    onChange={this.handleChangeFacebook}
                                    maxLength={100}
                                    validations={[
                                      checkLength100,
                                      checkContainSpace,
                                    ]}
                                  />
                                </Col>
                              </FormGroup>
                              { (isBranchTerminal === 1) ? (
                                <>
                                  <FormGroup row>
                                    <Col lg="5">
                                      <Label className="text-danger">
                                        {Constants.MnMerchant.developmentUnit}
                                        {' '}
                                        <span className="text-danger">*</span>
                                      </Label>
                                    </Col>
                                    <Col lg="7">
                                      <Select
                                        id="add-development-unit"
                                        placeholder="Chọn"
                                        options={listBranchBankByUser}
                                        onChange={this.handleDevelopmentUnit}
                                        isClearable
                                      />
                                      {validateForm ? checkRequiredSelect(developmentUnit, Constants.MnMerchant.developmentUnit) : ''}
                                    </Col>
                                  </FormGroup>
                                  <FormGroup row>
                                    <Col lg="5">
                                      <Label className="text-danger">
                                        {Constants.MnMerchant.staff}
                                        {' '}
                                        <span className="text-danger">*</span>
                                      </Label>
                                    </Col>
                                    <Col lg="7">
                                      <Select
                                        id="add-staff"
                                        placeholder="Chọn"
                                        options={updateListStaffByDepartment}
                                        onChange={this.handleStaffByDepartment}
                                        isClearable
                                        value={staffByDepartment}
                                      />
                                      {validateForm ? checkRequiredSelect(staffByDepartment.value, Constants.MnMerchant.staff) : ''}
                                    </Col>
                                  </FormGroup>
                                </>
                              ) : (
                                <>
                                  <FormGroup row>
                                    <Col lg="5">
                                      <Label className="text-danger">
                                        {Constants.MnMerchant.developmentUnit}
                                      </Label>
                                    </Col>
                                    <Col lg="7">
                                      <Select
                                        placeholder="Chọn"
                                        options={listBranchBankByUser}
                                        onChange={this.handleDevelopmentUnit}
                                      />
                                    </Col>
                                  </FormGroup>
                                  <FormGroup row>
                                    <Col lg="5">
                                      <Label className="text-danger">
                                        {Constants.MnMerchant.staff}
                                      </Label>
                                    </Col>
                                    <Col lg="7">
                                      <Select
                                        placeholder="Chọn"
                                        options={updateListStaffByDepartment}
                                        onChange={this.handleStaffByDepartment}
                                      />
                                    </Col>
                                  </FormGroup>
                                </>
                              )}
                            </CardBody>
                          </Card>
                        </Collapse>
                      </div>
                    </div>
                  </Row>
                  { levelTerminal === 2 ? (
                    <div>
                      <Row>
                        <div className="col-md-12">
                          <div className="widget-box transparent">
                            <div className="widget-header widget-header-flat" role="presentation" onClick={this.handOpenInfoBeneficiary} onKeyPress={this.handOpenInfoBeneficiary}>
                              <span className="text-bold">{Constants.MnMerchant.beneficiaryAccount}</span>
                              <div className="widget-toolbar">
                                <span data-action="collapse">
                                  {isOpenInfoBeneficiary ? (
                                    <i className="ace-icon fa fa-chevron-up" />
                                  ) : (
                                    <i className="ace-icon fa fa-chevron-down" />
                                  )}
                                </span>
                              </div>
                            </div>
                            <Collapse isOpen={isOpenInfoBeneficiary} className="show-information">
                              <Card>
                                <CardBody>
                                  <FormGroup row>
                                    <Col lg="5">
                                      <Label>
                                        {Constants.MnMerchant.accountNumber}
                                        {' '}
                                        <span className="text-danger">*</span>
                                      </Label>
                                    </Col>
                                    <Col lg="7">
                                      <Input
                                        id="add-account-number"
                                        value=""
                                        label={Constants.MnMerchant.accountNumber}
                                        type="text"
                                        className="form-control"
                                        name="code"
                                        onChange={this.handleChangeAccountNumber}
                                        maxLength={30}
                                        validations={[
                                          checkLength30,
                                          checkRequiredInput,
                                          checkContainSpecialCharacters,
                                          checkContainSpace,
                                          isValidVietnamese,
                                        ]}
                                      />
                                      {validateForm ? checkRequiredInputSpecial(accountNumber, Constants.MnMerchant.accountNumber) : ''}
                                    </Col>
                                  </FormGroup>
                                  <FormGroup row>
                                    <Col lg="5">
                                      <Label>
                                        {Constants.MnMerchant.accountOwn}
                                        {' '}
                                        <span className="text-danger">*</span>
                                      </Label>
                                    </Col>
                                    <Col lg="7">
                                      <Input
                                        id="add-account-own"
                                        value=""
                                        label={Constants.MnMerchant.accountOwn}
                                        type="text"
                                        className="form-control"
                                        name="code"
                                        onChange={this.handleChangeAccountOwn}
                                        validations={[
                                          checkLength150,
                                          checkContainSpecialCharacters,
                                          notAllowInputNumber,
                                        ]}
                                      />
                                      {validateForm ? checkRequiredInputSpecial(accountOwn, Constants.MnMerchant.accountOwn) : ''}
                                    </Col>
                                  </FormGroup>
                                  <FormGroup row>
                                    <Col lg="5">
                                      <Label>
                                        {Constants.MnMerchant.bank}
                                        {' '}
                                        <span className="text-danger">*</span>
                                      </Label>
                                    </Col>
                                    <Col lg="7">
                                      <Select
                                        id="add_bank"
                                        placeholder="Chọn"
                                        options={[{ value: '970489', label: 'Viettinbank' }]}
                                        value={[{ value: '970489', label: 'Viettinbank' }]}
                                      />
                                    </Col>
                                  </FormGroup>
                                  <FormGroup row>
                                    <Col lg="5">
                                      <Label>
                                        {Constants.MnMerchant.branch}
                                        {' '}
                                        <span className="text-danger">*</span>
                                      </Label>
                                    </Col>
                                    <Col lg="7">
                                      <Select
                                        id="add-branch"
                                        placeholder="Chọn"
                                        options={listBranchBank}
                                        onChange={this.handleChangeBranchBank}
                                      />
                                      {validateForm ? checkRequiredSelect(branchBank, Constants.MnMerchant.branch) : ''}
                                    </Col>
                                  </FormGroup>
                                  <FormGroup row>
                                    <Col lg="5">
                                      <Label>
                                        {Constants.MnMerchant.currency}
                                      </Label>
                                    </Col>
                                    <Col lg="7">
                                      <Select
                                        placeholder="Chọn"
                                        options={[{ value: '0', label: 'VNĐ' }]}
                                        value={[{ value: '0', label: 'VNĐ' }]}
                                      />
                                    </Col>
                                  </FormGroup>
                                </CardBody>
                              </Card>
                            </Collapse>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="widget-box transparent">
                            <div className="widget-header widget-header-flat" role="presentation" onClick={this.handOpenInfoBeneficiaryAccount} onKeyPress={this.handOpenInfoBeneficiaryAccount}>
                              <span className="text-bold">{Constants.MerchantDetail.accountTerminalWebAndApp}</span>
                              <div className="widget-toolbar">
                                <span data-action="collapse">
                                  {isOpenInfoBeneficiaryAccount ? (
                                    <i className="ace-icon fa fa-chevron-up" />
                                  ) : (
                                    <i className="ace-icon fa fa-chevron-down" />
                                  )}
                                </span>
                              </div>
                            </div>
                            <Collapse isOpen={isOpenInfoBeneficiaryAccount} className="show-information">
                              <Card>
                                <CardBody>
                                  <FormGroup row>
                                    <Col lg="5">
                                      <Label>
                                        {Constants.MerchantDetail.accountMerchant}
                                        {' '}
                                      </Label>
                                    </Col>
                                    <Col lg="7">
                                      <Input
                                        value=""
                                        type="text"
                                        placeholder="Nhập số điện thoại"
                                        label={Constants.MerchantDetail.accountMerchant}
                                        className="form-control"
                                        name="code"
                                        onChange={this.handleChangeAccountTerminal}
                                        validations={[
                                          checkPhoneNumber,
                                          checkLength13,
                                        ]}
                                      />
                                    </Col>
                                  </FormGroup>
                                </CardBody>
                              </Card>
                            </Collapse>
                          </div>
                        </div>
                      </Row>
                    </div>
                  ) : (
                    <div>
                      <Row>
                        <div className="col-md-12">
                          <div className="widget-box transparent">
                            <div className="widget-header widget-header-flat" role="presentation" onClick={this.handOpenInfoBeneficiary} onKeyPress={this.handOpenInfoBeneficiary}>
                              <span className="text-bold">{Constants.MnMerchant.beneficiaryAccount}</span>
                              <div className="widget-toolbar">
                                <span data-action="collapse">
                                  {isOpenInfoBeneficiary ? (
                                    <i className="ace-icon fa fa-chevron-up" />
                                  ) : (
                                    <i className="ace-icon fa fa-chevron-down" />
                                  )}
                                </span>
                              </div>
                            </div>
                            <Collapse isOpen={isOpenInfoBeneficiary} className="show-information">
                              <Card>
                                <CardBody>
                                  <FormGroup row>
                                    <Col lg="5">
                                      <Label>
                                        {Constants.MnMerchant.accountNumber}
                                        {' '}
                                      </Label>
                                    </Col>
                                    <Col lg="7">
                                      <Input
                                        value=""
                                        label={Constants.MnMerchant.accountNumber}
                                        type="text"
                                        className="form-control"
                                        name="code"
                                        onChange={this.handleChangeAccountNumber}
                                        maxLength={30}
                                        validations={[
                                          checkLength30,
                                          checkContainSpecialCharacters,
                                          checkContainSpace,
                                          isValidVietnamese,
                                        ]}
                                      />
                                    </Col>
                                  </FormGroup>
                                  <FormGroup row>
                                    <Col lg="5">
                                      <Label>
                                        {Constants.MnMerchant.accountOwn}
                                        {' '}
                                      </Label>
                                    </Col>
                                    <Col lg="7">
                                      <Input
                                        value=""
                                        label={Constants.MnMerchant.accountOwn}
                                        type="text"
                                        className="form-control"
                                        name="code"
                                        onChange={this.handleChangeAccountOwn}
                                        validations={[
                                          checkLength150,
                                          checkContainSpecialCharacters,
                                          notAllowInputNumber,
                                        ]}
                                      />
                                    </Col>
                                  </FormGroup>
                                  <FormGroup row>
                                    <Col lg="5">
                                      <Label>
                                        {Constants.MnMerchant.bank}
                                        {' '}
                                      </Label>
                                    </Col>
                                    <Col lg="7">
                                      <Select
                                        options={[{ value: '970489', label: 'Viettinbank' }]}
                                        value={[{ value: '970489', label: 'Viettinbank' }]}
                                      />
                                    </Col>
                                  </FormGroup>
                                  <FormGroup row>
                                    <Col lg="5">
                                      <Label>
                                        {Constants.MnMerchant.branch}
                                        {' '}
                                      </Label>
                                    </Col>
                                    <Col lg="7">
                                      <Select
                                        placeholder="Chọn"
                                        options={listBranchBank}
                                        onChange={this.handleChangeBranchBank}
                                      />
                                    </Col>
                                  </FormGroup>
                                  <FormGroup row>
                                    <Col lg="5">
                                      <Label>
                                        {Constants.MnMerchant.currency}
                                      </Label>
                                    </Col>
                                    <Col lg="7">
                                      <Select
                                        options={[{ value: '0', label: 'VNĐ' }]}
                                        value={[{ value: '0', label: 'VNĐ' }]}
                                      />
                                    </Col>
                                  </FormGroup>
                                </CardBody>
                              </Card>
                            </Collapse>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="widget-box transparent">
                            <div className="widget-header widget-header-flat" role="presentation" onClick={this.handOpenInfoBeneficiaryAccount} onKeyPress={this.handOpenInfoBeneficiaryAccount}>
                              <span className="text-bold">{Constants.MerchantDetail.accountTerminalWebAndApp}</span>
                              <div className="widget-toolbar">
                                <span data-action="collapse">
                                  {isOpenInfoBeneficiaryAccount ? (
                                    <i className="ace-icon fa fa-chevron-up" />
                                  ) : (
                                    <i className="ace-icon fa fa-chevron-down" />
                                  )}
                                </span>
                              </div>
                            </div>
                            <Collapse isOpen={isOpenInfoBeneficiaryAccount} className="show-information">
                              <Card>
                                <CardBody>
                                  <FormGroup row>
                                    <Col lg="5">
                                      <Label>
                                        {Constants.MerchantDetail.accountMerchant}
                                        {' '}
                                        <span className="text-danger">*</span>
                                      </Label>
                                    </Col>
                                    <Col lg="7">
                                      <Input
                                        id="add-phone"
                                        value=""
                                        type="text"
                                        placeholder="Nhập số điện thoại"
                                        label={Constants.MerchantDetail.accountMerchant}
                                        className="form-control"
                                        name="code"
                                        onChange={this.handleChangeAccountTerminal}
                                        validations={[
                                          checkPhoneNumber,
                                          checkLength13,
                                        ]}
                                      />
                                      {validateForm ? checkRequiredInputSpecial(accountTerminal, Constants.MerchantDetail.accountMerchant) : ''}
                                    </Col>
                                  </FormGroup>
                                </CardBody>
                              </Card>
                            </Collapse>
                          </div>
                        </div>
                      </Row>
                    </div>
                  )}
                  <Row>
                    <div className="col-md-12">
                      <div className="widget-box transparent">
                        <div className="widget-header widget-header-flat" role="presentation" onClick={this.handOpenInfoNotification} onKeyPress={this.handOpenInfoNotification}>
                          <span className="text-bold">{Constants.MnMerchant.notification}</span>
                          <div className="widget-toolbar">
                            <span data-action="collapse">
                              {isOpenInfoNotification ? (
                                <i className="ace-icon fa fa-chevron-up" />
                              ) : (
                                <i className="ace-icon fa fa-chevron-down" />
                              )}
                            </span>
                          </div>
                        </div>
                        <Collapse isOpen={isOpenInfoNotification} className="show-information">
                          <Card>
                            <CardBody>
                              <FormGroup>
                                <Col lg="6">
                                  <Label>
                                    <input
                                      type="checkbox"
                                      onClick={this.handleClickSms}
                                      defaultChecked={sms}
                                    />
                                    {' '}
                                    {Constants.MnMerchant.sms}
                                  </Label>
                                </Col>
                                <Col lg="6">
                                  <Label>
                                    <input
                                      type="checkbox"
                                      onClick={this.handleClickOtt}
                                      defaultChecked={ott}
                                    />
                                    {' '}
                                    {Constants.MnMerchant.ott}
                                  </Label>
                                </Col>
                              </FormGroup>
                            </CardBody>
                          </Card>
                        </Collapse>
                      </div>
                    </div>
                  </Row>
                  { levelTerminal === 2 ? (
                    <Row>
                      <div className="col-md-12">
                        <div className="widget-box transparent">
                          <div className="widget-header widget-header-flat" role="presentation" onClick={this.handOpenInfoContact} onKeyPress={this.handOpenInfoContact}>
                            <span className="text-bold">{Constants.MnMerchant.contactInfo}</span>
                            <div className="widget-toolbar">
                              <span data-action="collapse">
                                {isOpenInfoContact ? (
                                  <i className="ace-icon fa fa-chevron-up" />
                                ) : (
                                  <i className="ace-icon fa fa-chevron-down" />
                                )}
                              </span>
                            </div>
                          </div>
                          <Collapse isOpen={isOpenInfoContact} className="show-information">
                            <Card>
                              <CardBody>
                                <FormGroup row>
                                  <Col lg="5">
                                    <Label>
                                      {Constants.MnMerchant.fullName}
                                      {' '}
                                      <span className="text-danger">*</span>
                                    </Label>
                                  </Col>
                                  <Col lg="7">
                                    <Input
                                      id="add-fullName"
                                      label={Constants.MnMerchant.fullName}
                                      type="text"
                                      className="form-control"
                                      name="code"
                                      onChange={this.handleChangeFullName}
                                      validations={[
                                        checkLength50,
                                        checkContainSpecialCharacters,
                                        notAllowInputNumber,
                                      ]}
                                    />
                                    {validateForm ? checkRequiredInputSpecial(fullName, Constants.MnMerchant.fullName) : ''}
                                  </Col>
                                </FormGroup>
                                <FormGroup row>
                                  <Col lg="5">
                                    <Label>
                                      {Constants.MnMerchant.phoneNumber}
                                      {' '}
                                      <span className="text-danger">*</span>
                                    </Label>
                                  </Col>
                                  <Col lg="7">
                                    <Row className="mb-2">
                                      <Col lg="10">
                                        <Input
                                          id="add-number-phone"
                                          type="text"
                                          label={Constants.MnMerchant.phoneNumber}
                                          className="form-control"
                                          name="code"
                                          onChange={this.handleChangeNumberPhone}
                                          validations={[
                                            checkPhoneNumber,
                                          ]}
                                        />
                                        {validateForm ? checkRequiredInputSpecial(numberPhone, Constants.MnMerchant.phoneNumber) : ''}
                                      </Col>
                                      <Col lg="2">
                                        <Button
                                          onClick={() => this.addNewRowPhone()}
                                          type="button"
                                          className="btn btn-primary text-center"
                                        >
                                          <i className="fa fa-plus-circle" aria-hidden="true" />
                                        </Button>
                                      </Col>
                                    </Row>
                                  </Col>
                                </FormGroup>
                                { showNumberPhone2 ? (
                                  <FormGroup row>
                                    <Col lg="5" />
                                    <Col lg="7">
                                      <Row className="mb-2">
                                        <Col lg="10">
                                          <Input
                                            type="text"
                                            className="form-control"
                                            name="code"
                                            onChange={this.handleChangeNumberPhone2}
                                            validations={[
                                              checkPhoneNumber,
                                            ]}
                                          />
                                        </Col>
                                        <Col lg="2">
                                          <Button
                                            onClick={() => this.deleteNewRowPhone2()}
                                            type="button"
                                            className="btn btn-danger text-center"
                                          >
                                            <i className="fa fa-minus" aria-hidden="true" />
                                          </Button>
                                        </Col>
                                      </Row>
                                    </Col>
                                  </FormGroup>
                                ) : null }
                                { showNumberPhone3 ? (
                                  <FormGroup row>
                                    <Col lg="5" />
                                    <Col lg="7">
                                      <Row className="mb-2">
                                        <Col lg="10">
                                          <Input
                                            type="text"
                                            className="form-control"
                                            name="code"
                                            onChange={this.handleChangeNumberPhone3}
                                            validations={[
                                              checkPhoneNumber,
                                            ]}
                                          />
                                        </Col>
                                        <Col lg="2">
                                          <Button
                                            onClick={() => this.deleteNewRowPhone3()}
                                            type="button"
                                            className="btn btn-danger text-center"
                                          >
                                            <i className="fa fa-minus" aria-hidden="true" />
                                          </Button>
                                        </Col>
                                      </Row>
                                    </Col>
                                  </FormGroup>
                                ) : null }
                                <FormGroup row>
                                  <Col lg="5">
                                    <Label>
                                      {Constants.MnMerchant.email}
                                      {' '}
                                      <span className="text-danger">*</span>
                                    </Label>
                                  </Col>
                                  <Col lg="7">
                                    <Row className="mb-2">
                                      <Col lg="10">
                                        <Input
                                          id="add-email"
                                          type="text"
                                          label={Constants.MnMerchant.email}
                                          className="form-control"
                                          name="code"
                                          onChange={this.handleChangeEmail}
                                          validations={[
                                            checkEmailFormat,
                                            checkContainSpace,
                                          ]}
                                        />
                                        {validateForm ? checkRequiredInputSpecial(email, Constants.MnMerchant.email) : ''}
                                      </Col>
                                      <Col lg="2">
                                        <Button
                                          onClick={() => this.addNewRowEmail()}
                                          type="button"
                                          className="btn btn-primary text-center"
                                        >
                                          <i className="fa fa-plus-circle" aria-hidden="true" />
                                        </Button>
                                      </Col>
                                    </Row>
                                  </Col>
                                </FormGroup>
                                { showEmail2 ? (
                                  <FormGroup row>
                                    <Col lg="5" />
                                    <Col lg="7">
                                      <Row className="mb-2">
                                        <Col lg="10">
                                          <Input
                                            type="text"
                                            className="form-control"
                                            name="code"
                                            label="Email"
                                            onChange={this.handleChangeEmail2}
                                            validations={[
                                              checkEmailFormat,
                                              checkContainSpace,
                                            ]}
                                          />
                                        </Col>
                                        <Col lg="2">
                                          <Button
                                            onClick={() => this.deleteNewRowEmail2()}
                                            type="button"
                                            className="btn btn-danger text-center"
                                          >
                                            <i className="fa fa-minus" aria-hidden="true" />
                                          </Button>
                                        </Col>
                                      </Row>
                                    </Col>
                                  </FormGroup>
                                ) : null }
                                { showEmail3 ? (
                                  <FormGroup row>
                                    <Col lg="5" />
                                    <Col lg="7">
                                      <Row className="mb-2">
                                        <Col lg="10">
                                          <Input
                                            type="text"
                                            className="form-control"
                                            name="code"
                                            label="Email"
                                            onChange={this.handleChangeEmail3}
                                            validations={[
                                              checkEmailFormat,
                                              checkContainSpace,
                                            ]}
                                          />
                                        </Col>
                                        <Col lg="2">
                                          <Button
                                            onClick={() => this.deleteNewRowEmail3()}
                                            type="button"
                                            className="btn btn-danger text-center"
                                          >
                                            <i className="fa fa-minus" aria-hidden="true" />
                                          </Button>
                                        </Col>
                                      </Row>
                                    </Col>
                                  </FormGroup>
                                ) : null }
                              </CardBody>
                            </Card>
                          </Collapse>
                        </div>
                      </div>
                    </Row>
                  ) : (
                    <Row>
                      <div className="col-md-12">
                        <div className="widget-box transparent">
                          <div className="widget-header widget-header-flat" role="presentation" onClick={this.handOpenInfoContact} onKeyPress={this.handOpenInfoContact}>
                            <span className="text-bold">{Constants.MnMerchant.contactInfo}</span>
                            <div className="widget-toolbar">
                              <span data-action="collapse">
                                {isOpenInfoContact ? (
                                  <i className="ace-icon fa fa-chevron-up" />
                                ) : (
                                  <i className="ace-icon fa fa-chevron-down" />
                                )}
                              </span>
                            </div>
                          </div>
                          <Collapse isOpen={isOpenInfoContact} className="show-information">
                            <Card>
                              <CardBody>
                                <FormGroup row>
                                  <Col lg="5">
                                    <Label>
                                      {Constants.MnMerchant.fullName}
                                      {' '}
                                    </Label>
                                  </Col>
                                  <Col lg="7">
                                    <Input
                                      label={Constants.MnMerchant.fullName}
                                      type="text"
                                      className="form-control"
                                      name="code"
                                      onChange={this.handleChangeFullName}
                                      validations={[
                                        checkLength50,
                                        checkContainSpecialCharacters,
                                        notAllowInputNumber,
                                      ]}
                                    />
                                  </Col>
                                </FormGroup>
                                <FormGroup row>
                                  <Col lg="5">
                                    <Label>
                                      {Constants.MnMerchant.phoneNumber}
                                      {' '}
                                    </Label>
                                  </Col>
                                  <Col lg="7">
                                    <Row className="mb-2">
                                      <Col lg="9">
                                        <Input
                                          type="text"
                                          label={Constants.MnMerchant.phoneNumber}
                                          className="form-control"
                                          name="code"
                                          onChange={this.handleChangeNumberPhone}
                                          validations={[
                                            checkPhoneNumber,
                                          ]}
                                        />
                                      </Col>
                                      <Col lg="3">
                                        <Button
                                          onClick={() => this.addNewRowPhone()}
                                          type="button"
                                          className="btn btn-primary text-center"
                                        >
                                          <i className="fa fa-plus-circle" aria-hidden="true" />
                                        </Button>
                                      </Col>
                                    </Row>
                                  </Col>
                                </FormGroup>
                                { showNumberPhone2 ? (
                                  <FormGroup row>
                                    <Col lg="5" />
                                    <Col lg="7">
                                      <Row className="mb-2">
                                        <Col lg="9">
                                          <Input
                                            type="text"
                                            className="form-control"
                                            name="code"
                                            onChange={this.handleChangeNumberPhone2}
                                            validations={[
                                              checkPhoneNumber,
                                            ]}
                                          />
                                        </Col>
                                        <Col lg="3">
                                          <Button
                                            onClick={() => this.deleteNewRowPhone2()}
                                            type="button"
                                            className="btn btn-danger text-center"
                                          >
                                            <i className="fa fa-minus" aria-hidden="true" />
                                          </Button>
                                        </Col>
                                      </Row>
                                    </Col>
                                  </FormGroup>
                                ) : null }
                                { showNumberPhone3 ? (
                                  <FormGroup row>
                                    <Col lg="5" />
                                    <Col lg="7">
                                      <Row className="mb-2">
                                        <Col lg="9">
                                          <Input
                                            type="text"
                                            className="form-control"
                                            name="code"
                                            onChange={this.handleChangeNumberPhone3}
                                            validations={[
                                              checkPhoneNumber,
                                            ]}
                                          />
                                        </Col>
                                        <Col lg="3">
                                          <Button
                                            onClick={() => this.deleteNewRowPhone3()}
                                            type="button"
                                            className="btn btn-danger text-center"
                                          >
                                            <i className="fa fa-minus" aria-hidden="true" />
                                          </Button>
                                        </Col>
                                      </Row>
                                    </Col>
                                    </FormGroup>
                                  ) : null}
                                  <FormGroup row>
                                    <Col lg="5"></Col>
                                    <Col lg="7">
                                      {isNumberPhoneSame !== '' ? (
                                        <small className="form-text text-danger">
                                          {isNumberPhoneSame}
                                        </small>
                                      ) : (
                                          <div style={{ height: '0px' }} />
                                        )}
                                    </Col>
                                  </FormGroup>
                                  <FormGroup row>
                                  <Col lg="5">
                                    <Label>
                                      {Constants.MnMerchant.email}
                                      {' '}
                                    </Label>
                                  </Col>
                                  <Col lg="7">
                                    <Row className="mb-2">
                                      <Col lg="9">
                                        <Input
                                          type="text"
                                          label={Constants.MnMerchant.email}
                                          className="form-control"
                                          name="code"
                                          onChange={this.handleChangeEmail}
                                          validations={[
                                            checkEmailFormat,
                                            checkContainSpace,
                                          ]}
                                        />
                                      </Col>
                                      <Col lg="3">
                                        <Button
                                          onClick={() => this.addNewRowEmail()}
                                          type="button"
                                          className="btn btn-primary text-center"
                                        >
                                          <i className="fa fa-plus-circle" aria-hidden="true" />
                                        </Button>
                                      </Col>
                                    </Row>
                                  </Col>
                                </FormGroup>
                                { showEmail2 ? (
                                  <FormGroup row>
                                    <Col lg="5" />
                                    <Col lg="7">
                                      <Row className="mb-2">
                                        <Col lg="9">
                                          <Input
                                            type="text"
                                            className="form-control"
                                            name="code"
                                            label="Email"
                                            onChange={this.handleChangeEmail2}
                                            validations={[
                                              checkEmailFormat,
                                              checkContainSpace,
                                            ]}
                                          />
                                        </Col>
                                        <Col lg="3">
                                          <Button
                                            onClick={() => this.deleteNewRowEmail2()}
                                            type="button"
                                            className="btn btn-danger text-center"
                                          >
                                            <i className="fa fa-minus" aria-hidden="true" />
                                          </Button>
                                        </Col>
                                      </Row>
                                    </Col>
                                  </FormGroup>
                                ) : null }
                                { showEmail3 ? (
                                  <FormGroup row>
                                    <Col lg="5" />
                                    <Col lg="7">
                                      <Row className="mb-2">
                                        <Col lg="9">
                                          <Input
                                            type="text"
                                            className="form-control"
                                            name="code"
                                            label="Email"
                                            onChange={this.handleChangeEmail3}
                                            validations={[
                                              checkEmailFormat,
                                              checkContainSpace,
                                            ]}
                                          />
                                        </Col>
                                        <Col lg="3">
                                          <Button
                                            onClick={() => this.deleteNewRowEmail3()}
                                            type="button"
                                            className="btn btn-danger text-center"
                                          >
                                            <i className="fa fa-minus" aria-hidden="true" />
                                          </Button>
                                        </Col>
                                      </Row>
                                    </Col>
                                  </FormGroup>
                                ) : null }
                                  <FormGroup row>
                                    <Col lg="5"></Col>
                                    <Col lg="7">
                                      {isEmailSame !== '' ? (
                                        <small className="form-text text-danger">
                                          {isEmailSame}
                                        </small>
                                      ) : (
                                          <div style={{ height: '0px' }} />
                                        )}
                                    </Col>
                                  </FormGroup>
                              </CardBody>
                            </Card>
                          </Collapse>
                        </div>
                      </div>
                    </Row>
                  )}
                </Col>
              </Row>
            </CardBody>
            <CardFooter>
              <Col md="12">
                <Row>
                  <Col className="text-center btn-search">
                    <div>
                      <Button onClick={history.goBack} onKeyPress={history.goBack} title="Về danh sách" className="btn bggrey bigger-150 mr-3 text-white">
                        <i className="fa fa-arrow-left mr-2" aria-hidden="true" />
                        {Constants.btnMerchant.comeBackList}
                      </Button>
                      <Button className="icon-search btn btn-primary btn btn-secondary mr-3" onClick={() => this.handleSave('0')}>
                        {Constants.btnMerchant.save}
                      </Button>
                      <Button className="icon-search btn btn-primary btn btn-secondary" onClick={() => this.handleSave('1')}>
                        {Constants.btnMerchant.submitApprove}
                        <i className="fa fa-arrow-right ml-2" aria-hidden="true" />
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Col>
            </CardFooter>
          </Card>
        </Form>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  responseServer: state.terminal.responseServer,
  merchantDetail: state.masterMerchant.merchantDetail,
  levelTerminal: state.terminal.levelTerminal,
  listMerchantCodeName: state.masterMerchant.listMerchantCodeName,
  listStaffByDepartment: state.systemModule.listStaffByDepartment,
  cacheTerminal: state.terminal.cacheTerminal,
});

const mapDispatchToProps = (dispatch) => ({
  getMerchantDetail: (data) => dispatch(getMerchantDetail(data)),
  addTerminal: (data) => dispatch(addTerminal(data)),
  getCacheTerminal: (data) => dispatch(getCacheTerminal(data)),
  clearMerchantDetail: () => dispatch(clearMerchantDetail()),
  getMerchantCodeName: (data) => dispatch(getMerchantCodeName(data)),
  getAllStaffByDepartment: (data) => dispatch(getAllStaffByDepartment(data)),
  setLevelTerminal: (data) => dispatch(setLevelTerminal(data)),
  clearMerchantCodeName: () => dispatch(clearMerchantCodeName()),
});

AddTerminal.defaultProps = {
  addTerminal: () => {},
  getCacheTerminal: () => {},
  getMerchantDetail: () => {},
  clearMerchantDetail: () => {},
  merchantDetail: {},
  responseServer: {},
  history: {},
  listMerchantCodeName: [],
  getMerchantCodeName: () => {},
  getAllStaffByDepartment: () => {},
  setLevelTerminal: () => {},
  listMccInterior: [],
  listMccInternational: [],
  listBranchBankByUser: [],
  cacheTerminal: [],
};

AddTerminal.propTypes = {
  addTerminal: PropTypes.func,
  getCacheTerminal: PropTypes.func,
  getMerchantDetail: PropTypes.func,
  clearMerchantDetail: PropTypes.func,
  responseServer: PropTypes.object,
  history: PropTypes.object,
  merchantDetail: PropTypes.object,
  listMerchantCodeName: PropTypes.array,
  getAllStaffByDepartment: PropTypes.func,
  setLevelTerminal: PropTypes.func,
  listMccInterior: PropTypes.array,
  listMccInternational: PropTypes.array,
  listBranchBankByUser: PropTypes.array,
  cacheTerminal: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddTerminal));
