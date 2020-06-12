import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Button, Card, CardBody, CardFooter, CardHeader, Col, FormGroup, Row,} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addMasterMerchant} from '../../../store/actions/masterMerchant/masterMerchant';
import Constants from '../Constants';
import BusinessInfo from './BusinessInfo';
import Attachments from './Attachments';
import DevelopmentBranch from './DevelopmentBranch';
import MerchantBranchInfo from './MerchantBranchInfo';
import TerminalInfo from './TerminalInfo';
import BeneficiaryAccount from './BeneficiaryAccount';
import ContactInfo from './ContactInfo';
import NotificationType from './NotificationType';
import {messageError, messageSuccess} from '../../../utils/base';

class AddMerchant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listMasterMerchant: [],
      listMccInternational: [],
      listProvince: [],
      listMccInterior: [],
      listBranchBank: [],
      listBranchBankByUser: [],
      dataBusinessInfo: {},
      dataAttachments: {},
      dataDevelopmentBranch: {},
      dataMerchantBranchInfo: {},
      dataTerminalInfo: {},
      dataBeneficiaryAccount: {},
      dataContactInfo: {},
      dataNotificationType: {},
      validateForm: 0,
      notifyStatus: '',
      isValidateMobile: true,
    };
  }

  componentDidMount() {
    this.getListSelectBox();
  }

  componentDidUpdate(prevProps) {
    const { notifyStatus } = this.state;
    const { responseServer, history } = this.props;
    if (responseServer !== prevProps.responseServer) {
      if (responseServer.code !== '00') {
        messageError(responseServer.description);
      } else {
        messageSuccess(`Thông tin đăng ký Merchant đã được lưu${notifyStatus}`);
        history.push('/merchant/list');
      }
    }
  }

  getListSelectBox = () => {
    const listMasterMerchant = JSON.parse(localStorage && localStorage.getItem('LIST_MASTER_MERCHANT'));
    const listMccInternational = JSON.parse(localStorage && localStorage.getItem('LIST_MCC_INTERNATIONAL'));
    const listProvince = JSON.parse(localStorage && localStorage.getItem('LIST_PROVINCE'));
    const listMccInterior = JSON.parse(localStorage && localStorage.getItem('LIST_MCC_INTERIOR'));
    const listBranchBank = JSON.parse(localStorage && localStorage.getItem('LIST_BRANCH_BANK'));
    const listBranchBankByUser = JSON.parse(localStorage && localStorage.getItem('LIST_BRANCH_BANK_BY_USER'));

    const updateListMasterMerchant = [];
    if (listMasterMerchant) {
      for (let i = 0; i < (listMasterMerchant && listMasterMerchant.length); i += 1) {
        updateListMasterMerchant.push({ value: listMasterMerchant[i] && listMasterMerchant[i].bankCode, label: `${listMasterMerchant[i] && listMasterMerchant[i].bankName}` });
      }
    }
    const updateListMccInternational = [];
    if (listMccInternational) {
      for (let i = 0; i < listMccInternational.length; i += 1) {
        updateListMccInternational.push({
          value: listMccInternational[i] && listMccInternational[i].id,
          label: `${listMccInternational[i] && listMccInternational[i].typeCode} - ${listMccInternational[i] && listMccInternational[i].brandName}`,
        });
      }
    }
    const updateListProvince = [];
    if (listProvince) {
      for (let i = 0; i < (listProvince && listProvince.length); i += 1) {
        updateListProvince.push({ value: listProvince[i] && listProvince[i].provinceCode, label: `${listProvince[i] && listProvince[i].provinceName}` });
      }
    }
    const updateListMccInterior = [];
    if (listMccInterior) {
      for (let i = 0; i < (listMccInterior && listMccInterior.length); i += 1) {
        updateListMccInterior.push({
          value: listMccInterior[i] && listMccInterior[i].id,
          label: `${listMccInterior[i] && listMccInterior[i].typeCode} - ${listMccInterior[i] && listMccInterior[i].brandName}`,
        });
      }
    }
    const updateListBranchBank = [];
    if (listBranchBank) {
      for (let i = 0; i < listBranchBank.length; i += 1) {
        updateListBranchBank.push({ value: listBranchBank[i] && listBranchBank[i].departmentId, label: `${listBranchBank[i] && listBranchBank[i].departmentName}` });
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
      listMasterMerchant: updateListMasterMerchant,
      listMccInternational: updateListMccInternational,
      listProvince: updateListProvince,
      listMccInterior: updateListMccInterior,
      listBranchBank: updateListBranchBank,
      listBranchBankByUser: updateListBranchBankByUser,
    });
  };

  getDataBusinessInfo = (data) => {
    this.setState({
      dataBusinessInfo: data,
    });
  };

  getDataAttachments = async (data) => {
    await this.setState({
      dataAttachments: data,
    });
  };

  getDataDevelopmentBranch = (data) => {
    this.setState({
      dataDevelopmentBranch: data,
    });
  };

  getDataMerchantBranchInfo = (data) => {
    this.setState({
      dataMerchantBranchInfo: data,
    });
  };

  getDataTerminalInfo = (data) => {
    this.setState({
      dataTerminalInfo: data,
    });
  };

  getDataBeneficiaryAccount = (data) => {
    this.setState({
      dataBeneficiaryAccount: data,
    });
  };

  getDataContactInfo = (data) => {
    this.setState({
      dataContactInfo: data,
    });
  };

  getNotificationType = (data) => {
    this.setState({
      dataNotificationType: data,
    });
  };

  handleSave = (action) => {
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
      dataBusinessInfo,
      dataAttachments,
      dataDevelopmentBranch,
      dataMerchantBranchInfo,
      dataTerminalInfo,
      dataBeneficiaryAccount,
      dataContactInfo,
      dataNotificationType,
      isValidateMobile,
    } = this.state;
    const { addMasterMerchant } = this.props;
    const merchant = {
      id: 0,
      merchantName: dataBusinessInfo.merchantName || '',
      merchantBrand: dataBusinessInfo.abbreviationName || '',
      masterMerchant: dataBusinessInfo.masterMerchant || '970489',
      // masterMerchant: '970489',
      providerCode: dataBusinessInfo.billingCode || '',
      merchantType: dataBusinessInfo.optionMccInternational || '',
      merchantAddress: dataBusinessInfo.registerBusinessAddress || '',
      merchantBusinessAddress: dataBusinessInfo.businessAddress || '',
      province: dataBusinessInfo.optionProvince || '',
      district: dataBusinessInfo.optionDistrict || '',
      wards: 'string',
      pinCode: dataBusinessInfo.zipCode || '',
      merchantCode: dataBusinessInfo.taxCode || '',
      merchantWebsite: dataBusinessInfo.webSite || '',
      appUser: 'string',
      createUser: 'string',
      department: parseInt(dataDevelopmentBranch.developmentUnit, 10) || 0,
      staff: parseInt(dataDevelopmentBranch.staffByDepartment, 10) || 0,
      action,
    };
    const terminalBranch = {
      terminalId: dataMerchantBranchInfo.terminalId || '',
      terminalName: dataMerchantBranchInfo.terminalName || '',
      tserviceCode: 'string',
      terminalBusinessAddress: dataMerchantBranchInfo.businessAddress,
      websiteBusiness: dataMerchantBranchInfo.websiteEcommerce,
      businessProduct: parseInt(dataMerchantBranchInfo.optionMccInternational, 10) || 0,
      mcc: dataMerchantBranchInfo.optionMccInterior,
      productDesc: 'string',
      facebook: 'string',
      accountHolder: 'string',
      accountNumber: 'string',
      bankCode: 'string',
      bankBranch: 'string',
      currency: 'VND',
      visaPan: 'string',
      masterPan: 'string',
      unionpayPan: 'string',
      registerQrcode: 0,
      registerVnpayment: 0,
      jcbPan: 'string',
      dciPan: 'string',
      feeOnUs: 0,
      feeOfUs: 0,
      registerSms: 0,
      registerOtt: 0,
      terminalAppUser: dataMerchantBranchInfo.staffName,
      terminalDocument: 'string',
      createUser: 'string',
      terminalLevel: 1,
      branchTerminalId: 0,
      department: parseInt(dataMerchantBranchInfo.developmentUnit, 10) || 0,
      staff: parseInt(dataMerchantBranchInfo.optionStaffByDepartment, 10) || 0,
    };
    const terminal = {
      terminalId: dataTerminalInfo.terminalID || '',
      terminalName: dataTerminalInfo.terminalName || '',
      tserviceCode: dataTerminalInfo.serviceCode || '',
      terminalBusinessAddress: dataTerminalInfo.businessAddress || '',
      websiteBusiness: dataTerminalInfo.websiteEcommerce || '',
      businessProduct: parseInt(dataMerchantBranchInfo.optionMccInternational, 10) || 0,
      mcc: dataTerminalInfo.optionMccInterior || '',
      productDesc: dataTerminalInfo.productBusinessDesciption || '',
      facebook: dataTerminalInfo.facebook || '',
      accountHolder: dataBeneficiaryAccount.accountOwn || '',
      accountNumber: dataBeneficiaryAccount.accountNumber || '',
      bankCode: dataBeneficiaryAccount.bankCode || '',
      bankBranch: dataBeneficiaryAccount.branchBank || '',
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
      registerSms: dataNotificationType.sms || 1,
      registerOtt: dataNotificationType.ott || 1,
      terminalAppUser: 'string',
      terminalDocument: 'string',
      createUser: 'string',
      terminalLevel: 2,
      branchTerminalId: 0,
    };
    const terminalContact = {
      fullName: dataContactInfo.fullName || '',
      phoneNumber: dataContactInfo.numberPhone || '',
      phoneNumber1: dataContactInfo.numberPhone2 || '',
      phoneNumber2: dataContactInfo.numberPhone3 || '',
      email: dataContactInfo.email || '',
      email1: dataContactInfo.email2 || '',
      email2: dataContactInfo.email3 || '',
    };
    const merchantDoc = {
      businessCert: {
        fileName: dataAttachments.businessLicence ? dataAttachments.businessLicence.nameBusinessLicence : '',
        fileData: dataAttachments.businessLicence ? dataAttachments.businessLicence.dataFileBusinessLicence : '',
      },
      domainCert: {
        fileName: dataAttachments.domainLicence ? dataAttachments.domainLicence.nameDomainLicence : '',
        fileData: dataAttachments.domainLicence ? dataAttachments.domainLicence.dataFileDomainLicence : '',
      },
      identifyCard: {
        fileName: dataAttachments.identityCard ? dataAttachments.identityCard.nameIdentityCard : '',
        fileData: dataAttachments.identityCard ? dataAttachments.identityCard.dataFileIdentityCard : '',
      },
      businessTaxCert: {
        fileName: dataAttachments.accountLicence ? dataAttachments.accountLicence.nameAccountLicence : '',
        fileData: dataAttachments.accountLicence ? dataAttachments.accountLicence.dataFileAccountLicence : '',
      },
      contract: {
        fileName: dataAttachments.contractSign ? dataAttachments.contractSign.nameContractSign : '',
        fileData: dataAttachments.contractSign ? dataAttachments.contractSign.dataFileContractSign : '',
      },
    };
    const dataMasterMerchant = {
      merchant,
      terminalBranch,
      terminal,
      terminalContact,
      merchantDoc,
      hashData: 'string',
    };
    if (
      dataAttachments && dataAttachments.businessLicence
      && dataBusinessInfo.merchantName && dataBusinessInfo.abbreviationName
      && dataBusinessInfo.optionMccInternational && dataBusinessInfo.registerBusinessAddress
      && dataBusinessInfo.optionProvince && dataBusinessInfo.optionDistrict
      && dataBusinessInfo.taxCode && dataAttachments.businessLicence.nameBusinessLicence
      && dataDevelopmentBranch.developmentUnit && dataDevelopmentBranch.staffByDepartment
      && dataMerchantBranchInfo.terminalId && dataMerchantBranchInfo.terminalName
      && dataMerchantBranchInfo.developmentUnit && dataMerchantBranchInfo.optionStaffByDepartment
      && dataTerminalInfo.terminalID && dataTerminalInfo.terminalName
      && dataTerminalInfo.optionMccInternational
      && dataTerminalInfo.optionMccInterior
      && dataBeneficiaryAccount.accountOwn && dataBeneficiaryAccount.accountNumber
      && dataBeneficiaryAccount.bankCode && dataBeneficiaryAccount.branchBank
      && dataContactInfo.fullName && dataContactInfo.numberPhone && isValidateMobile
    ) {
      addMasterMerchant(dataMasterMerchant);
    }
  };

  changeValidate = (isValidateMobile) => {
    this.setState({
      isValidateMobile,
    });
  }

  render() {
    const { history } = this.props;
    const {
      listMasterMerchant,
      listMccInternational,
      listProvince,
      listMccInterior,
      listBranchBank,
      listBranchBankByUser,
      validateForm,
    } = this.state;

    return (
      <div className="my-requests">
        <div>
          <Card className="card-my-requests">
            <CardHeader>
              <Col xs="12">
                <FormGroup style={{ marginBottom: 0 }} row>
                  <Col lg="6" style={{ paddingLeft: 0 }}>
                    <span className="text-bold">{Constants.MnMerchant.titleAddMerchant}</span>
                  </Col>
                </FormGroup>
              </Col>
            </CardHeader>
            <CardBody>
              <Row>
                <Col className="col-md-6 col-12">
                  <BusinessInfo
                    listMasterMerchant={listMasterMerchant}
                    listMccInternational={listMccInternational}
                    listProvince={listProvince}
                    passDataBusinessInfo={this.getDataBusinessInfo}
                    validateForm={validateForm}
                  />
                  <Attachments
                    passDataAttachment={this.getDataAttachments}
                    validateForm={validateForm}
                  />
                  <DevelopmentBranch
                    listBranchBankByUser={listBranchBankByUser}
                    passDataDevelopmentBranch={this.getDataDevelopmentBranch}
                    validateForm={validateForm}
                  />
                  <MerchantBranchInfo
                    changeValidateMobile={this.changeValidate}
                    listMccInterior={listMccInterior}
                    listMccInternational={listMccInternational}
                    listBranchBankByUser={listBranchBankByUser}
                    passMerchantBranchInfo={this.getDataMerchantBranchInfo}
                    validateForm={validateForm}
                  />
                </Col>
                <Col className="col-md-6 col-12">
                  <TerminalInfo
                    listMccInterior={listMccInterior}
                    listMccInternational={listMccInternational}
                    passTerminalInfo={this.getDataTerminalInfo}
                    validateForm={validateForm}
                  />
                  <BeneficiaryAccount
                    listBranchBank={listBranchBank}
                    passBeneficiaryAccount={this.getDataBeneficiaryAccount}
                    validateForm={validateForm}
                  />
                  <ContactInfo
                    passContactInfo={this.getDataContactInfo}
                    validateForm={validateForm}
                  />
                  <NotificationType
                    passNotificationType={this.getNotificationType}
                  />
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
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  responseServer: state.masterMerchant.responseServer,
});

const mapDispatchToProps = (dispatch) => ({
  addMasterMerchant: (data) => dispatch(addMasterMerchant(data)),
});

AddMerchant.defaultProps = {
  addMasterMerchant: () => {},
};

AddMerchant.propTypes = {
  addMasterMerchant: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddMerchant));
