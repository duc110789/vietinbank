import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Button, Card, CardBody, CardFooter, CardHeader, Col, Collapse, FormGroup, Label, Row,} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Select from 'react-select';
import Textarea from 'react-validation/build/textarea';
import {getMerchantDetail} from '../../../store/actions/masterMerchant/masterMerchant';
import {editTerminal, getCacheTerminal, getTerminalDetail} from '../../../store/actions/terminal/terminal';

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
  checkLength8,
  checkPhoneNumber,
  checkRequiredInput,
  checkRequiredInputSpecial,
  checkRequiredSelect,
  isValidVietnamese,
  notAllowInputNumber,
} from '../../../components/Input/validation';
import {getAllStaffByDepartment} from '../../../store/actions/system/systemModuleAction';
import {getStatusUI} from '../../../utils/commonFunction';

class EditTerminal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listMccInternational: [],
      listMccInterior: [],
      listBranchBank: [],
      listBranchBankByUser: [],
      terminalDetail: {},
      validateForm: 0,
      notifyStatus: '',
      isOpenInfo: true,
      cacheTerminalSelect: '',
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
      developmentUnit: '',
      staffByDepartment: '',
      // Beneficiary
      isOpenInfoBeneficiary: true,
      isOpenInfoBeneficiaryAccount: true,
      accountNumber: '',
      accountOwn: '',
      bankCode: '970489',
      branchBank: '',
      currency: 'VNĐ',
      accountTerminal: '',
      disablePhoneAppUser: false,
      isOpenInfoNotification: true,
      sms: null,
      ott: null,

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
      isOpenInfoBusiness: true,
      isOpenAccountMerchant: true,
      isNumberPhoneSame: '',
      isEmailSame: '',
      isValidEmail: true,
      isValidPhone: true,
    };
  }

  componentDidMount() {
    const {
      getMerchantDetail,
      getTerminalDetail,
      getCacheTerminal,
    } = this.props;
    if (
      localStorage.getItem('MERCHANT_CODE')
      && localStorage.getItem('ID_TERMINAL')
      && localStorage.getItem('ID_MERCHANT_TERMINAL')
    ) {
      getMerchantDetail({
        merchantCode: JSON.parse(window.atob(localStorage.getItem('MERCHANT_CODE'))),
        type: '1',
      });
      getCacheTerminal({
        merchantCode: JSON.parse(window.atob(localStorage.getItem('MERCHANT_CODE'))),
        status: '1',
        terminalBranchId: '',
      });
      getTerminalDetail({
        merchantId: JSON.parse(window.atob(localStorage.getItem('ID_MERCHANT_TERMINAL'))),
        terminalId: JSON.parse(window.atob(localStorage.getItem('ID_TERMINAL'))),
        type: '1',
      });
    }
    this.getListSelectBox();
  }

  static getDerivedStateFromProps(props, prevProps, state) {
    const {
      terminalDetail,
      listStaffByDepartment,
      cacheTerminal,
    } = props;

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
    let cacheTerminalDetail = [];
    if (
      (terminalDetail && terminalDetail.terminalBean !== undefined)
      && (
        terminalDetail && terminalDetail.terminalBean
        && terminalDetail.terminalBean.branchTerminalId !== null
      )
    ) {
      cacheTerminalDetail = cacheTerminal.filter(
        (item) => item.id === terminalDetail.terminalBean.branchTerminalId,
      );
    }

    let levelTerminal = null;
    if (
      terminalDetail
      && terminalDetail.terminalBean
      && terminalDetail.terminalBean.levelTerminal
    ) {
      levelTerminal = terminalDetail
        && terminalDetail.terminalBean && terminalDetail.terminalBean.levelTerminal;
    }

    return {
      updateListStaffByDepartment,
      cacheTerminal: updateCacheTerminal,
      terminalDetail,
      cacheTerminalDetail,
      levelTerminal,
    };
  }

  componentDidUpdate(prevProps) {
    const {
      notifyStatus,
    } = this.state;
    const {
      terminalDetail,
      responseServerEditTerminal,
      responseServerMerchantDetail,
      history,
    } = this.props;
    if (responseServerEditTerminal !== prevProps.responseServerEditTerminal) {
      if (responseServerEditTerminal.code !== '00') {
        messageError(responseServerEditTerminal.description);
      } else {
        messageSuccess(`Cập nhật thành công thông tin Terminal${notifyStatus}`);
        history.goBack();
      }
    }
    if (responseServerMerchantDetail !== prevProps.responseServerMerchantDetail) {
      if (responseServerMerchantDetail.code !== '00') {
        messageError(responseServerMerchantDetail.description);
        history.goBack();
      }
    }

    if (
      terminalDetail !== prevProps.terminalDetail
      && terminalDetail && terminalDetail.terminalBean
    ) {
      this.setState({
        terminalID: terminalDetail.terminalBean.terminalId,
        terminalName: terminalDetail.terminalBean.terminalName,
        serviceCode: terminalDetail.terminalBean.serviceCode,
        websiteEcommerce: terminalDetail.terminalBean.website,
        businessAddress: terminalDetail.terminalBean.businessAddress,
        optionMccInternational: {
          value: terminalDetail.terminalBean.mccQT.merchantTypeId,
          label: `${terminalDetail.terminalBean.mccQT.merchantTypeCode}-${terminalDetail.terminalBean.mccQT.merchantTypeName}`,
        },
        productBusinessDesciption: terminalDetail.terminalBean.productDescription,
        optionMccInterior: {
          value: terminalDetail.terminalBean.mccND.mccId,
          label: `${terminalDetail.terminalBean.mccND.mccCode}-${terminalDetail.terminalBean.mccND.mccName}`,
        },
        facebook: terminalDetail.terminalBean.facebook,
        developmentUnit: {
          value: terminalDetail.terminalBean.departmentBean.departmentId,
          label: terminalDetail.terminalBean && terminalDetail.terminalBean.departmentBean
            && terminalDetail.terminalBean.departmentBean.departmentName && `${terminalDetail.terminalBean.departmentBean.departmentName}`,
        },
        staffByDepartment: {
          value: terminalDetail.terminalBean.staffBean.staffId,
          label: terminalDetail.terminalBean && terminalDetail.terminalBean.staffBean
          && terminalDetail.terminalBean.staffBean.staffName
            ? `${terminalDetail.terminalBean.staffBean.staffCode}-${terminalDetail.terminalBean.staffBean.staffName}` : '',
        },
        accountNumber: terminalDetail.terminalBean.accEnjoymentBean.accountNumber || '',
        accountOwn: terminalDetail.terminalBean.accEnjoymentBean.accountHolder || '',
        bankCode: '970489',
        branchBank: {
          // value: terminalDetail.terminalBean.accEnjoymentBean.branch,
          value: terminalDetail.terminalBean.accEnjoymentBean.accEnjoymentId,
          label: terminalDetail.terminalBean && terminalDetail.terminalBean.accEnjoymentBean
          && terminalDetail.terminalBean.accEnjoymentBean.branchName
            ? `${terminalDetail.terminalBean.accEnjoymentBean.branchName}` : '',
        } || '',
        currency: 'VNĐ',
        accountTerminal: terminalDetail.terminalBean.terminalAppUser || '',
        disablePhoneAppUser: terminalDetail.terminalBean.status || false,
        sms: terminalDetail.terminalBean.registerSms,
        ott: terminalDetail.terminalBean.registerOtt,
        fullName: terminalDetail.terminalContact.fullName || '',
        numberPhone: terminalDetail.terminalContact.phoneNumber || '',
        numberPhone2: terminalDetail.terminalContact.phoneNumber1 || '',
        numberPhone3: terminalDetail.terminalContact.phoneNumber2 || '',
        numberClickAddPhone: 0,
        showNumberPhone2: false,
        showNumberPhone3: false,
        email: terminalDetail.terminalContact.email || '',
        email2: terminalDetail.terminalContact.email1 || '',
        email3: terminalDetail.terminalContact.email2 || '',
        numberClickAddEmail: 0,
        showEmail2: false,
        showEmail3: false,
      });
    }
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
      for (let i = 0; i < listBranchBank.length; i += 1) {
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
        branchBank: branchBankSelected,
      });
    }
  };

  handleChangeAccountTerminal = (event) => {
    this.setState({
      accountTerminal: event.target.value,
    });
  };

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

  handleChangeFacebook = (event) => {
    this.setState({
      facebook: event.target.value,
    });
  };

  handleDevelopmentUnit = (unitSelected) => {
    const { getAllStaffByDepartment } = this.props;
    if (unitSelected) {
      this.setState({
        developmentUnit: unitSelected,
        staffByDepartment: '',
      }, () => {
        getAllStaffByDepartment({ departmentCode: unitSelected.departmentCode });
      });
    } else {
      this.setState({
        developmentUnit: '',
        staffByDepartment: '',
      });
    }
  };

  handleStaffByDepartment = (staffByDepartmentSelected) => {
    if (staffByDepartmentSelected) {
      this.setState({
        staffByDepartment: staffByDepartmentSelected,
      });
    } else {
      this.setState({
        staffByDepartment: '',
      });
    }
  };

  getListTerminaltatus = (itemCode) => {
    const listTerminalStatus = JSON.parse(localStorage && localStorage.getItem('TERMINAL'));
    const status = getStatusUI(listTerminalStatus, itemCode);
    return status;
  };

  handOpenInfo = () => {
    const { isOpenInfo } = this.state;
    this.setState({
      isOpenInfo: !isOpenInfo,
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
      });
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

  getListMerchantStatus = (itemCode) => {
    const listMerchantStatus = JSON.parse(localStorage && localStorage.getItem('MERCHANT'));
    const status = getStatusUI(listMerchantStatus, itemCode);
    return status;
  };

  handOpenInfoBusiness = () => {
    const { isOpenInfoBusiness } = this.state;
    this.setState({
      isOpenInfoBusiness: !isOpenInfoBusiness,
    });
  };

  handOpenAccountMerchant = () => {
    const { isOpenAccountMerchant } = this.state;
    this.setState({
      isOpenAccountMerchant: !isOpenAccountMerchant,
    });
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

  handleSave(status) {
    this.form.validateAll();
    this.setState({
      validateForm: this.state.validateForm + 1,
    });
    if (status === 3) {
      this.setState({
        notifyStatus: ' với trạng thái Chờ Duyệt',
      });
    }
    const {
      merchantDetail,
      editTerminal,
      terminalDetail,
    } = this.props;
    setTimeout(() => {
      const {
        cacheTerminalSelect,
        terminalID,
        terminalName,
        serviceCode,
        websiteEcommerce,
        businessAddress,
        optionMccInternational,
        productBusinessDesciption,
        optionMccInterior,
        facebook,
        developmentUnit,
        staffByDepartment,
        accountNumber,
        accountOwn,
        bankCode,
        branchBank,
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
        isValidEmail,
        isValidPhone,
      } = this.state;

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
        id: (terminalDetail.terminalBean && terminalDetail.terminalBean.id) || 0,
        merchantCode: (merchantDetail && merchantDetail.merchantCode) || 0,
        terminalId: terminalID || '',
        terminalName: terminalName || '',
        terminalBusinessAddress: businessAddress || '',
        websiteBusiness: websiteEcommerce || '',
        businessProduct: parseInt(optionMccInternational.value, 10) || '',
        productDesc: productBusinessDesciption || '',
        serviceCode: serviceCode || '',
        mcc: optionMccInterior.value || '',
        facebook: facebook || '',
        accountHolder: accountOwn || '',
        accountNumber: accountNumber || '',
        bankCode: bankCode || '970489',
        bankBranch: (branchBank && branchBank.value.toString()) || '',
        currency: 'VND',
        visaPan: '',
        masterPan: '',
        jcbPan: '',
        feeOnUs: 0,
        feeOfUs: 0,
        registerSms: sms
          || (terminalDetail.terminalBean && terminalDetail.terminalBean.registerSms),
        registerOtt: ott
          || (terminalDetail.terminalBean && terminalDetail.terminalBean.registerOtt),
        terminalStatus: status === 3 ? 3 : status,
        terminalAppUser: accountTerminal || '',
        terminalContact,
        department: developmentUnit.value || 0,
        staff: staffByDepartment.value || 0,
        levelTerminal: terminalDetail.terminalBean.levelTerminal || 0,
        // eslint-disable-next-line no-nested-ternary
        branchTerminalId: cacheTerminalSelect ? cacheTerminalSelect.value
          ? parseInt(cacheTerminalSelect.value, 10)
          : 0 : (
          terminalDetail && terminalDetail.terminalBean
            && terminalDetail.terminalBean.branchTerminalId
        ),
        hashData: 'string',
      };

      let checkServiceCode;
      if (merchantDetail && merchantDetail.providerCode) {
        checkServiceCode = !!(dataTerminal && dataTerminal.serviceCode);
      } else checkServiceCode = !(dataTerminal && dataTerminal.serviceCode);

      if (terminalDetail.terminalBean && terminalDetail.terminalBean.levelTerminal === '1') {
        if (
          (this.form.getChildContext()._errors.length === 0)
          && dataTerminal.merchantCode
          && dataTerminal.terminalId && dataTerminal.terminalName
          && dataTerminal.businessProduct
          && dataTerminal.mcc && dataTerminal.department
          && dataTerminal.staff && dataTerminal.terminalAppUser
          && checkServiceCode
          && isValidEmail
          && isValidPhone
        ) {
          editTerminal(dataTerminal);
        }
      } else if (
        (this.form.getChildContext()._errors.length === 0)
        && dataTerminal.merchantCode && dataTerminal.branchTerminalId
        && dataTerminal.terminalId && dataTerminal.terminalName
        && dataTerminal.businessProduct
        && dataTerminal.mcc && dataTerminal.accountHolder
        && dataTerminal.accountNumber && dataTerminal.bankBranch && terminalContact.fullName
        && terminalContact.phoneNumber && terminalContact.email
        && checkServiceCode
        && isValidEmail
        && isValidPhone
      ) {
        editTerminal(dataTerminal);
      }
    }, 100);
  }

  render() {
    const {
      history,
      merchantDetail,
    } = this.props;
    const {
      listMccInternational,
      listMccInterior,
      listBranchBank,
      listBranchBankByUser,
      validateForm,
      terminalDetail,
      isOpenInfo,
      cacheTerminalSelect,
      updateListStaffByDepartment,
      cacheTerminal,
      terminalID,
      terminalName,
      serviceCode,
      errorServiceCode,
      websiteEcommerce,
      businessAddress,
      optionMccInternational,
      productBusinessDesciption,
      optionMccInterior,
      facebook,
      developmentUnit,
      staffByDepartment,
      cacheTerminalDetail,
      isOpenInfoBeneficiary,
      isOpenInfoBeneficiaryAccount,
      branchBank,
      accountOwn,
      accountNumber,
      accountTerminal,
      disablePhoneAppUser,
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
      numberPhone2,
      numberPhone3,
      email,
      email2,
      email3,
      isOpenAccountMerchant,
      isOpenInfoBusiness,
      levelTerminal,
      isNumberPhoneSame,
      isEmailSame,
    } = this.state;

    return (
      <div className="my-requests">
        <Form ref={(editTerminalForm) => { this.form = editTerminalForm; }}>
          <Card className="card-my-requests">
            <CardHeader>
              <Col xs="12">
                <FormGroup style={{ marginBottom: 0 }} row>
                  <Col lg="6" style={{ paddingLeft: 0 }}>
                    <span className="text-bold">{Constants.MnMerchant.titleEditTerminal}</span>
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
                          <span className="text-bold">{Constants.MnMerchant.terminalTitle}</span>
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
                                  <Label style={{ color: 'red' }}>
                                    {Constants.MnTerminal.level}
                                    {' '}
                                    <span className="text-danger">*</span>
                                  </Label>
                                </Col>
                                <Col lg="7">
                                  <FormGroup row className="mb-0">
                                    <FormGroup className="col-md-6 text-danger">
                                      <Input
                                        type="radio"
                                        name="terminal"
                                        onClick={this.handleChangeBranch}
                                        disabled
                                        checked={
                                          terminalDetail && terminalDetail.terminalBean
                                          && terminalDetail.terminalBean.levelTerminal === '1'
                                        }
                                      />
                                      <span className="ml-1">{Constants.MnTerminal.branch}</span>
                                    </FormGroup>
                                    <FormGroup className="col-md-6 text-danger">
                                      <Input
                                        type="radio"
                                        name="terminal"
                                        onClick={this.handleChangeTerminal}
                                        disabled
                                        checked={
                                          (terminalDetail && terminalDetail.terminalBean
                                          && terminalDetail.terminalBean.levelTerminal === '2')
                                        }
                                      />
                                      <span className="ml-1">{Constants.MnTerminal.pointSale}</span>
                                    </FormGroup>
                                  </FormGroup>
                                </Col>
                              </FormGroup>
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
                                    value={
                                      cacheTerminalSelect.value
                                        ? cacheTerminalSelect : (cacheTerminalDetail.length ? {
                                          value: cacheTerminalDetail[0].id,
                                          label: `${cacheTerminalDetail[0].terminalId}-${cacheTerminalDetail[0].terminalName}`,
                                        } : {})
                                    }
                                    options={cacheTerminal}
                                    onChange={this.handleChangeCacheTerminal}
                                    isDisabled={
                                      (terminalDetail && terminalDetail.terminalBean
                                      && terminalDetail.terminalBean.status === 1)
                                      || (terminalDetail && terminalDetail.terminalBean
                                      && terminalDetail.terminalBean.levelTerminal === '1')
                                    }
                                  />
                                </Col>
                              </FormGroup>
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
                                    value={terminalID}
                                    label={Constants.MnMerchant.terminalID}
                                    type="text"
                                    className="form-control"
                                    name="code"
                                    onChange={this.handleChangeTerminalID}
                                    maxLength={8}
                                    validations={[
                                      checkRequiredInput,
                                      checkLength8,
                                      checkContainSpecialCharacters,
                                      checkContainSpace,
                                      isValidVietnamese,
                                    ]}
                                    disabled={
                                      (terminalDetail && terminalDetail.terminalBean
                                        && (terminalDetail.terminalBean.status === -1))
                                      || (terminalDetail && (terminalDetail.terminalBean
                                        && (terminalDetail.terminalBean.status === 1)))
                                      || (terminalDetail && terminalDetail.terminalBean
                                        && (terminalDetail.terminalBean.status === 3))
                                    }
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
                                    value={terminalName}
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
                                    disabled={
                                      (terminalDetail && terminalDetail.terminalBean
                                        && (terminalDetail.terminalBean.status === -1))
                                      || (terminalDetail && (terminalDetail.terminalBean
                                        && (terminalDetail.terminalBean.status === 1)))
                                      || (terminalDetail && terminalDetail.terminalBean
                                        && (terminalDetail.terminalBean.status === 3))
                                    }
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
                                    value={websiteEcommerce}
                                    label={Constants.MnMerchant.websiteEcommerce}
                                    type="text"
                                    className="form-control"
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
                                    value={businessAddress}
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
                                    value={optionMccInternational}
                                    options={listMccInternational}
                                    onChange={this.handleChangeMccInternational}
                                    validations={[
                                      checkRequiredSelect,
                                    ]}
                                  />
                                </Col>
                              </FormGroup>
                              <FormGroup row>
                                <Col lg="5">
                                  <Label>
                                    {Constants.MnMerchant.productBusinessDesciption}
                                    {' '}
                                    {optionMccInternational.value === -1 && (
                                      <span className="text-danger">*</span>
                                    )}
                                  </Label>
                                </Col>
                                <Col lg="7">
                                  {optionMccInternational.value === -1 ? (
                                    <FormGroup style={{ width: '100%', display: 'inline-block' }}>
                                      <Textarea
                                        label={Constants.MnMerchant.productBusinessDesciption}
                                        name="productBusinessDesciptionRequired"
                                        className="form-control"
                                        style={{ height: '90px' }}
                                        maxLength={200}
                                        onChange={this.handleChangeProductBusinessDesciption}
                                        validations={[
                                          checkRequiredInput,
                                          checkLength200,
                                        ]}
                                        value={productBusinessDesciption}
                                      />
                                    </FormGroup>
                                  ) : (
                                    <Textarea
                                      maxLength={200}
                                      label={Constants.MnMerchant.productBusinessDesciption}
                                      name="productBusinessDesciption"
                                      className="form-control"
                                      style={{ height: '90px' }}
                                      onChange={this.handleChangeProductBusinessDesciption}
                                      validations={[checkLength200]}
                                      value={productBusinessDesciption}
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
                                    value={optionMccInterior}
                                    options={listMccInterior}
                                    onChange={this.handleChangeMccInterior}
                                    validations={[
                                      checkRequiredSelect,
                                    ]}
                                  />
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
                                    value={facebook}
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
                              <FormGroup row>
                                <Col lg="5">
                                  <Label className="text-danger">
                                    {Constants.MnMerchant.status}
                                    {' '}
                                    <span className="text-danger">*</span>
                                  </Label>
                                </Col>
                                <Col lg="7">
                                  <Label>
                                    {(terminalDetail && terminalDetail.terminalBean)
                                      ? this.getListTerminaltatus(
                                        terminalDetail && terminalDetail.terminalBean
                                        && terminalDetail.terminalBean.status,
                                      ) : ''}
                                  </Label>
                                </Col>
                              </FormGroup>
                              { terminalDetail && terminalDetail.terminalBean && terminalDetail.terminalBean.levelTerminal === '2' ? (
                                <>
                                  <FormGroup row>
                                    <Col lg="5">
                                      <Label>
                                        {Constants.MnMerchant.developmentUnit}
                                      </Label>
                                    </Col>
                                    <Col lg="7">
                                      <Select
                                        isClearable
                                        value={developmentUnit}
                                        options={listBranchBankByUser}
                                        onChange={this.handleDevelopmentUnit}
                                        isDisabled={
                                          terminalDetail.terminalBean
                                          && terminalDetail.terminalBean.status !== 2
                                        }
                                      />
                                    </Col>
                                  </FormGroup>
                                  <FormGroup row>
                                    <Col lg="5">
                                      <Label>
                                        {Constants.MnMerchant.staff}
                                      </Label>
                                    </Col>
                                    <Col lg="7">
                                      <Select
                                        isClearable
                                        placeholder="Chọn"
                                        value={staffByDepartment}
                                        options={updateListStaffByDepartment}
                                        onChange={this.handleStaffByDepartment}
                                        isDisabled={
                                          terminalDetail.terminalBean
                                          && terminalDetail.terminalBean.status !== 2
                                        }
                                      />
                                    </Col>
                                  </FormGroup>
                                </>
                              ) : (
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
                                        isClearable
                                        value={developmentUnit}
                                        options={listBranchBankByUser}
                                        onChange={this.handleDevelopmentUnit}
                                        validations={[
                                          checkRequiredSelect,
                                        ]}
                                        isDisabled={
                                          terminalDetail && terminalDetail.terminalBean
                                          && terminalDetail.terminalBean.status !== 2
                                        }
                                      />
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
                                        isClearable
                                        placeholder="Chọn"
                                        value={staffByDepartment}
                                        options={updateListStaffByDepartment}
                                        onChange={this.handleStaffByDepartment}
                                        validations={[
                                          checkRequiredSelect,
                                        ]}
                                        isDisabled={
                                          terminalDetail && terminalDetail.terminalBean
                                          && terminalDetail.terminalBean.status !== 2
                                        }
                                      />
                                      {validateForm ? checkRequiredSelect(staffByDepartment.value, Constants.MnMerchant.staff) : ''}
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
                  { levelTerminal === '2' ? (
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
                                        value={accountNumber}
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
                                        value={accountOwn}
                                        label={Constants.MnMerchant.accountOwn}
                                        type="text"
                                        className="form-control"
                                        name="code"
                                        onChange={this.handleChangeAccountOwn}
                                        validations={[
                                          checkRequiredInput,
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
                                        value={branchBank}
                                        options={listBranchBank}
                                        onChange={this.handleChangeBranchBank}
                                      />
                                      {validateForm ? checkRequiredSelect(branchBank.value, Constants.MnMerchant.branch) : ''}
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
                                      </Label>
                                    </Col>
                                    <Col lg="7">
                                      <Input
                                        value={accountTerminal}
                                        type="text"
                                        className="form-control"
                                        name="code"
                                        placeholder="Nhập số điện thoại"
                                        onChange={this.handleChangeAccountTerminal}
                                        validations={[
                                          checkPhoneNumber,
                                          checkLength13,
                                        ]}
                                        disabled={
                                          disablePhoneAppUser === -1
                                          || disablePhoneAppUser === 1
                                          || disablePhoneAppUser === 3
                                        }
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
                                        value={accountNumber}
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
                                        value={accountOwn}
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
                                        value={branchBank}
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
                                        value={accountTerminal}
                                        type="text"
                                        className="form-control"
                                        name="code"
                                        placeholder="Nhập số điện thoại"
                                        label={Constants.MerchantDetail.accountMerchant}
                                        onChange={this.handleChangeAccountTerminal}
                                        validations={[
                                          // checkRequiredInput,
                                          checkPhoneNumber,
                                          checkLength13,
                                        ]}
                                        disabled={
                                          disablePhoneAppUser === -1
                                        || disablePhoneAppUser === 1
                                        || disablePhoneAppUser === 3
                                        }
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
                                      onChange={this.handleClickSms}
                                      checked={sms === 1}
                                      name="sms"
                                    />
                                    {' '}
                                    {Constants.MnMerchant.sms}
                                  </Label>
                                </Col>
                                <Col lg="6">
                                  <Label>
                                    <input
                                      type="checkbox"
                                      onChange={this.handleClickOtt}
                                      checked={ott === 1}
                                      name="ott"
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
                  { levelTerminal === '2' ? (
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
                                      value={fullName}
                                      label={Constants.MnMerchant.fullName}
                                      type="text"
                                      className="form-control"
                                      name="code"
                                      onChange={this.handleChangeFullName}
                                      validations={[
                                        checkRequiredInput,
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
                                      <Col lg="9">
                                        <Input
                                          label={Constants.MnMerchant.phoneNumber}
                                          value={numberPhone}
                                          type="text"
                                          className="form-control"
                                          name="code"
                                          onChange={this.handleChangeNumberPhone}
                                          validations={[
                                            checkRequiredInput,
                                            checkPhoneNumber,
                                          ]}
                                        />
                                        {validateForm ? checkRequiredInputSpecial(numberPhone, Constants.MnMerchant.phoneNumber) : ''}
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
                                { (showNumberPhone2 || numberPhone2) ? (
                                  <FormGroup row>
                                    <Col lg="5" />
                                    <Col lg="7">
                                      <Row className="mb-2">
                                        <Col lg="9">
                                          <Input
                                            value={numberPhone2}
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
                                ) : null}
                                { (showNumberPhone3 || numberPhone3) ? (
                                  <FormGroup row>
                                    <Col lg="5" />
                                    <Col lg="7">
                                      <Row className="mb-2">
                                        <Col lg="9">
                                          <Input
                                            value={numberPhone3}
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
                                  <Col lg="5">
                                    <Label>
                                      {Constants.MnMerchant.email}
                                      {' '}
                                      <span className="text-danger">*</span>
                                    </Label>
                                  </Col>
                                  <Col lg="7">
                                    <Row className="mb-2">
                                      <Col lg="9">
                                        <Input
                                          value={email}
                                          type="text"
                                          label={Constants.MnMerchant.email}
                                          className="form-control"
                                          name="code"
                                          onChange={this.handleChangeEmail}
                                          validations={[
                                            checkRequiredInput,
                                            checkEmailFormat,
                                            checkContainSpace,
                                          ]}
                                        />
                                        {validateForm ? checkRequiredInputSpecial(email, Constants.MnMerchant.email) : ''}
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
                                { (showEmail2 || email2) ? (
                                  <FormGroup row>
                                    <Col lg="5" />
                                    <Col lg="7">
                                      <Row className="mb-2">
                                        <Col lg="9">
                                          <Input
                                            value={email2}
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
                                { (showEmail3 || email3) ? (
                                  <FormGroup row>
                                    <Col lg="5" />
                                    <Col lg="7">
                                      <Row className="mb-2">
                                        <Col lg="9">
                                          <Input
                                            value={email3}
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
                                      value={fullName}
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
                                          label={Constants.MnMerchant.phoneNumber}
                                          value={numberPhone}
                                          type="text"
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
                                { ((showNumberPhone2 || numberPhone2) ? (
                                  <FormGroup row>
                                    <Col lg="5" />
                                    <Col lg="7">
                                      <Row className="mb-2">
                                        <Col lg="9">
                                          <Input
                                            value={numberPhone2}
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
                                ) : null)}
                                { (showNumberPhone3 || numberPhone3 ? (
                                  <FormGroup row>
                                    <Col lg="5" />
                                    <Col lg="7">
                                      <Row className="mb-2">
                                        <Col lg="9">
                                          <Input
                                            value={numberPhone3}
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
                                ) : null)}
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
                                          value={email}
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
                                { (showEmail2 || email2) ? (
                                  <FormGroup row>
                                    <Col lg="5" />
                                    <Col lg="7">
                                      <Row className="mb-2">
                                        <Col lg="9">
                                          <Input
                                            value={email2}
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
                                { (showEmail3 || email3) ? (
                                  <FormGroup row>
                                    <Col lg="5" />
                                    <Col lg="7">
                                      <Row className="mb-2">
                                        <Col lg="9">
                                          <Input
                                            value={email3}
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
                              </CardBody>
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
                            </Card>
                          </Collapse>
                        </div>
                      </div>
                    </Row>
                  )}
                </Col>
                <Col className="col-md-6 col-12">
                  <Row>
                    <div className="col-md-12">
                      <div className="widget-box transparent">
                        <div className="widget-header widget-header-flat" role="presentation" onClick={this.handOpenInfoBusiness} onKeyPress={this.handOpenInfoBusiness}>
                          <span className="text-bold">Thông tin Merchant</span>
                          <div className="widget-toolbar">
                            <span data-action="collapse">
                              {isOpenInfoBusiness ? (
                                <i className="ace-icon fa fa-chevron-up" />
                              ) : (
                                <i className="ace-icon fa fa-chevron-down" />
                              )}
                            </span>
                          </div>
                        </div>
                        <Collapse isOpen={isOpenInfoBusiness} className="show-information">
                          <Card>
                            <CardBody>
                              <FormGroup row>
                                <Col lg="5">
                                  <Label htmlFor="code">
                                    {Constants.MnMerchant.merchantId}
                                  </Label>
                                </Col>
                                <Col lg="7">
                                  <Label>
                                    { terminalDetail && terminalDetail.merchantBean
                                    && terminalDetail.merchantBean.merchantCode }
                                  </Label>
                                </Col>
                              </FormGroup>
                              <FormGroup row>
                                <Col lg="5">
                                  <Label htmlFor="code">
                                    {Constants.MnMerchant.merchantName}
                                  </Label>
                                </Col>
                                <Col lg="7">
                                  <Label>
                                    { terminalDetail && terminalDetail.merchantBean
                                    && terminalDetail.merchantBean.merchantName }
                                  </Label>
                                </Col>
                              </FormGroup>
                              <FormGroup row>
                                <Col lg="5">
                                  <Label>
                                    {Constants.MnMerchant.shortName}
                                  </Label>
                                </Col>
                                <Col lg="7">
                                  <Label>
                                    { terminalDetail && terminalDetail.merchantBean
                                    && terminalDetail.merchantBean.merchantBrand }
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
                                    { terminalDetail && terminalDetail.merchantBean
                                    && terminalDetail.merchantBean.masterMerchantCode }
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
                                    { terminalDetail && terminalDetail.merchantBean
                                    && terminalDetail.merchantBean.providerCode }
                                  </Label>
                                </Col>
                              </FormGroup>
                              <FormGroup row>
                                <Col lg="5">
                                  <Label>
                                    {Constants.MnMerchant.nationalMCC}
                                  </Label>
                                </Col>
                                <Col lg="7">
                                  <Label>
                                    { terminalDetail && terminalDetail.merchantBean
                                    && `${terminalDetail.merchantBean.merchantTypeBean.merchantTypeCode}
                        - ${terminalDetail.merchantBean.merchantTypeBean.merchantTypeName}` }
                                  </Label>
                                </Col>
                              </FormGroup>
                              <FormGroup row>
                                <Col lg="5">
                                  <Label>
                                    {Constants.MnMerchant.registeredBusinessAddress}
                                  </Label>
                                </Col>
                                <Col lg="7">
                                  <Label>
                                    { terminalDetail && terminalDetail.merchantBean
                                    && terminalDetail.merchantBean.address }
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
                                    { terminalDetail && terminalDetail.merchantBean
                                    && terminalDetail.merchantBean.businessAddress }
                                  </Label>
                                </Col>
                              </FormGroup>
                              <FormGroup row>
                                <Col lg="5">
                                  <Label>
                                    {Constants.MnMerchant.city}
                                  </Label>
                                </Col>
                                <Col lg="7">
                                  <Label>
                                    { terminalDetail && terminalDetail.merchantBean
                                    && terminalDetail.merchantBean.provinceName }
                                  </Label>
                                </Col>
                              </FormGroup>
                              <FormGroup row>
                                <Col lg="5">
                                  <Label>
                                    {Constants.MnMerchant.district}
                                  </Label>
                                </Col>
                                <Col lg="7">
                                  <Label>
                                    { terminalDetail && terminalDetail.merchantBean
                                    && terminalDetail.merchantBean.districtName }
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
                                    { terminalDetail && terminalDetail.merchantBean
                                    && terminalDetail.merchantBean.pinCode }
                                  </Label>
                                </Col>
                              </FormGroup>
                              <FormGroup row>
                                <Col lg="5">
                                  <Label>
                                    {Constants.MnMerchant.taxCode}
                                  </Label>
                                </Col>
                                <Col lg="7">
                                  <Label>
                                    { terminalDetail && terminalDetail.merchantBean
                                    && terminalDetail.merchantBean.merchantCode }
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
                                    { terminalDetail && terminalDetail.merchantBean
                                    && terminalDetail.merchantBean.website }
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
                                    { terminalDetail && terminalDetail.merchantBean
                                    && this.getListMerchantStatus(terminalDetail.merchantBean.status) }
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
                        <div className="widget-header widget-header-flat" role="presentation" onClick={this.handOpenAccountMerchant} onKeyPress={this.handOpenAccountMerchant}>
                          <span className="text-bold">{Constants.MerchantDetail.accountMerchantWebAndApp}</span>
                          <div className="widget-toolbar">
                            <span data-action="collapse">
                              {isOpenAccountMerchant ? (
                                <i className="ace-icon fa fa-chevron-up" />
                              ) : (
                                <i className="ace-icon fa fa-chevron-down" />
                              )}
                            </span>
                          </div>
                        </div>
                        <Collapse isOpen={isOpenAccountMerchant} className="show-information">
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
                                    { terminalDetail && terminalDetail.merchantBean
                                    && terminalDetail.merchantBean.merchantSiteUser }
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
                      <Button className="icon-search btn btn-primary btn btn-secondary mr-3" onClick={() => this.handleSave(terminalDetail && terminalDetail.terminalBean && terminalDetail.terminalBean.status)}>
                        {Constants.btnMerchant.update}
                      </Button>
                      {(
                        terminalDetail
                        && terminalDetail.terminalBean
                        && terminalDetail.terminalBean.status !== 1
                      ) ? (
                        <Button className="icon-search btn btn-primary btn btn-secondary" onClick={() => this.handleSave(3)}>
                          {Constants.btnMerchant.submitApprove}
                          <i className="fa fa-arrow-right ml-2" aria-hidden="true" />
                        </Button>
                        ) : ('')}
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
  responseServerEditTerminal: state.terminal.responseServerEditTerminal,
  merchantDetail: state.masterMerchant.merchantDetail,
  responseServerMerchantDetail: state.masterMerchant.responseServerMerchantDetail,
  terminalDetail: state.terminal.terminalDetail,
  listStaffByDepartment: state.systemModule.listStaffByDepartment,
  cacheTerminal: state.terminal.cacheTerminal,
});

const mapDispatchToProps = (dispatch) => ({
  getMerchantDetail: (data) => dispatch(getMerchantDetail(data)),
  getTerminalDetail: (data) => dispatch(getTerminalDetail(data)),
  editTerminal: (data) => dispatch(editTerminal(data)),
  getCacheTerminal: (data) => dispatch(getCacheTerminal(data)),
  getAllStaffByDepartment: (data) => dispatch(getAllStaffByDepartment(data)),
});

EditTerminal.defaultProps = {
  editTerminal: () => {},
  getCacheTerminal: () => {},
  getMerchantDetail: () => {},
  getTerminalDetail: () => {},
  merchantDetail: {},
  responseServerMerchantDetail: {},
  terminalDetail: {},
  responseServerEditTerminal: {},
  history: {},
  getAllStaffByDepartment: () => {},
  listMccInterior: [],
  listMccInternational: [],
  listBranchBankByUser: [],
  cacheTerminal: [],
};

EditTerminal.propTypes = {
  editTerminal: PropTypes.func,
  getCacheTerminal: PropTypes.func,
  getMerchantDetail: PropTypes.func,
  getTerminalDetail: PropTypes.func,
  responseServerEditTerminal: PropTypes.object,
  terminalDetail: PropTypes.object,
  history: PropTypes.object,
  merchantDetail: PropTypes.object,
  responseServerMerchantDetail: PropTypes.object,
  getAllStaffByDepartment: PropTypes.func,
  cacheTerminal: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditTerminal));
