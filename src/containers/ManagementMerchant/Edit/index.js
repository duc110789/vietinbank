import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Button, Card, CardBody, CardFooter, CardHeader, Col, FormGroup, Row,
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getMerchantDetail, updateMasterMerchant } from '../../../store/actions/masterMerchant/masterMerchant';
import Constants from '../Constants';
import BusinessInfo from './BusinessInfo';
import Attachments from './Attachments';
import DevelopmentBranch from './DevelopmentBranch';
import ListTerminal from './ListTerminal';
import { messageError, messageSuccess } from '../../../utils';
import ModalCommon from '../../Modal/ModalCommon';

class AddMerchant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listMasterMerchant: [],
      listMccInternational: [],
      listProvince: [],
      listBranchBankByUser: [],
      dataBusinessInfo: {},
      dataAttachments: {},
      dataDevelopmentBranch: {},
      validateForm: 0,
      isOpenModal: false,
      action: 0,
      isChangeTaxNumber: false,
    };
  }

  componentDidMount() {
    const {
      getMerchantDetail,
    } = this.props;
    if (window.atob(localStorage.getItem('ID_MERCHANT_DETAIL'))) {
      getMerchantDetail({
        merchantCode: JSON.parse(window.atob(localStorage.getItem('ID_MERCHANT_DETAIL'))),
        type: '1',
      });
    }
    this.getListSelectBox();
  }

  static getDerivedStateFromProps(props) {
    const {
      merchantDetail,
    } = props;
    return {
      merchantDetail,
    };
  }

  componentDidUpdate(prevProps) {
    const { responseServer, history, responseServerMerchantDetail } = this.props;
    if (responseServer !== prevProps.responseServer) {
      if (responseServer.code !== '00') {
        messageError(responseServer.description);
      } else {
        messageSuccess('Cập nhật thông tin Merchant thành công');
        history.goBack();
      }
    }
    if (responseServerMerchantDetail !== prevProps.responseServerMerchantDetail) {
      if (responseServerMerchantDetail.code !== '00') {
        messageError(responseServerMerchantDetail.description);
        history.push('/merchant/list');
      }
    }
  }

  getListSelectBox = () => {
    const listMasterMerchant = JSON.parse(localStorage && localStorage.getItem('LIST_MASTER_MERCHANT'));
    const listMccInternational = JSON.parse(localStorage && localStorage.getItem('LIST_MCC_INTERNATIONAL'));
    const listProvince = JSON.parse(localStorage && localStorage.getItem('LIST_PROVINCE'));
    const listBranchBankByUser = JSON.parse(localStorage && localStorage.getItem('LIST_BRANCH_BANK_BY_USER'));

    const updateListMasterMerchant = [];
    if (listMasterMerchant) {
      for (let i = 0; i < listMasterMerchant.length; i += 1) {
        updateListMasterMerchant.push({ value: listMasterMerchant[i].bankCode, label: `${listMasterMerchant[i].bankName}` });
      }
    }
    const updateListMccInternational = [];
    if (listMccInternational) {
      for (let i = 0; i < listMccInternational.length; i += 1) {
        updateListMccInternational.push({
          value: listMccInternational[i].id,
          label: `${listMccInternational[i].typeCode} - ${listMccInternational[i].brandName}`,
        });
      }
    }
    const updateListProvince = [];
    if (listProvince) {
      for (let i = 0; i < listProvince.length; i += 1) {
        updateListProvince.push({ value: listProvince[i].provinceCode, label: `${listProvince[i].provinceName}` });
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

  handleUpdate(action) {
    this.setState({
      validateForm: this.state.validateForm + 1,
    });
    const {
      dataBusinessInfo,
      dataAttachments,
      dataDevelopmentBranch,
    } = this.state;
    const {
      updateMasterMerchant,
      merchantDetail,
    } = this.props;

    const merchantDoc = {
      businessCert: {
        fileName: dataAttachments.businessLicence.nameBusinessLicence,
        fileData: dataAttachments.businessLicence.dataFileBusinessLicence,
      },
      domainCert: {
        fileName: dataAttachments.domainLicence.nameDomainLicence,
        fileData: dataAttachments.domainLicence.dataFileDomainLicence,
      },
      identifyCard: {
        fileName: dataAttachments.identityCard.nameIdentityCard,
        fileData: dataAttachments.identityCard.dataFileIdentityCard,
      },
      businessTaxCert: {
        fileName: dataAttachments.accountLicence.nameAccountLicence,
        fileData: dataAttachments.accountLicence.dataFileAccountLicence,
      },
      contract: {
        fileName: dataAttachments.contractSign.nameContractSign,
        fileData: dataAttachments.contractSign.dataFileContractSign,
      },
    };
    const dataUpdateMerchant = {
      oldMerchantCode: merchantDetail.merchantCode || '',
      merchantCode: dataBusinessInfo.taxCode || '',
      oldMerchantName: merchantDetail.merchantName || '',
      merchantName: dataBusinessInfo.merchantName || '',
      masterMerchant: dataBusinessInfo.masterMerchant.value || '',
      merchantBrand: dataBusinessInfo.abbreviationName || '',
      providerCode: dataBusinessInfo.billingCode || '',
      merchantType: dataBusinessInfo.optionMccInternational.value || '',
      merchantAddress: dataBusinessInfo.registerBusinessAddress || '',
      merchantBusinessAddress: dataBusinessInfo.businessAddress || '',
      province: dataBusinessInfo.optionProvince.value || '',
      district: dataBusinessInfo.optionDistrict.value || '',
      merchantWebsite: dataBusinessInfo.webSite || '',
      merchantStatus: action ? 3 : merchantDetail.status,
      appUser: merchantDetail.appUser || '',
      pinCode: dataBusinessInfo.zipCode || '',
      department: dataDevelopmentBranch.developmentUnit.value || 0,
      staff: dataDevelopmentBranch.staffByDepartment.value || 0,
      merchantDoc,
      hashData: 'string',
    };
    if (
      dataUpdateMerchant.oldMerchantCode && dataUpdateMerchant.merchantCode
      && dataUpdateMerchant.oldMerchantName && dataUpdateMerchant.merchantName
      && dataUpdateMerchant.masterMerchant
      && dataUpdateMerchant.merchantType && dataUpdateMerchant.merchantAddress
      && dataUpdateMerchant.province && dataUpdateMerchant.district
      && dataUpdateMerchant.department && dataUpdateMerchant.staff
      && dataUpdateMerchant.merchantBrand
    ) {
      updateMasterMerchant(dataUpdateMerchant);
    }
  }

  openPopupConfirm = (action) => {
    this.setState({
      isOpenModal: true,
      action,
    });
  };

  changeTaxNumber = (isChangeTaxNumber) => {
    this.setState({
      isChangeTaxNumber,
    });
  };

  render() {
    const {
      merchantDetail,
      history,
    } = this.props;

    let isHaveConfirm = false;

    if (merchantDetail) {
      const { status } = merchantDetail;
      isHaveConfirm = !(status === 1 || status === 3 || status === -1);
    }

    const {
      listMasterMerchant,
      listMccInternational,
      listProvince,
      listBranchBankByUser,
      validateForm,
      isOpenModal,
      action,
      isChangeTaxNumber,
    } = this.state;

    const noChangeTaxNotifyModal = {
      title: 'Thông báo',
      content: 'Bạn có chắc chắn muốn cập nhật thông tin Merchant này?',
      button: 'Đồng ý',
    };

    const changeTaxNotifyModal = {
      title: 'Thông báo',
      content: 'Khi thay đổi thông tin Mã số thuế, Merchant này sẽ bị Khóa. Bạn chỉ có thể mở Khóa Merchant này sau 7h sáng ngày mai.',
      button: 'Đồng ý',
    };

    return (
      <div className="my-requests">
        <div>
          <Card className="card-my-requests">
            <CardHeader>
              <Col xs="12">
                <FormGroup style={{ marginBottom: 0 }} row>
                  <Col lg="12" style={{ paddingLeft: 0 }}>
                    <span className="text-bold">{Constants.MnMerchant.titleEditMerchant}</span>
                  </Col>
                </FormGroup>
              </Col>
            </CardHeader>
            <CardBody>
              <Row>
                <Col className="col-md-12 col-12">
                  <BusinessInfo
                    changeTaxNumber={this.changeTaxNumber}
                    listMasterMerchant={listMasterMerchant}
                    listMccInternational={listMccInternational}
                    listProvince={listProvince}
                    passDataBusinessInfo={this.getDataBusinessInfo}
                    merchantDetail={merchantDetail}
                    validateForm={validateForm}
                  />
                  <Attachments
                    merchantDetail={merchantDetail}
                    passDataAttachment={this.getDataAttachments}
                  />
                  <DevelopmentBranch
                    listBranchBankByUser={listBranchBankByUser}
                    passDataDevelopmentBranch={this.getDataDevelopmentBranch}
                    merchantDetail={merchantDetail}
                    validateForm={validateForm}
                  />
                  <ListTerminal />
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
                      <Button
                        className="icon-search btn btn-primary btn btn-secondary mr-3"
                        onClick={() => (isHaveConfirm
                          ? this.openPopupConfirm(0)
                          : this.handleUpdate(0))}
                      >
                        {Constants.btnMerchant.save}
                      </Button>
                      {((merchantDetail && merchantDetail.status) !== 1) ? (
                        <Button
                          className="icon-search btn btn-primary btn btn-secondary"
                          onClick={() => (isHaveConfirm
                            ? this.openPopupConfirm(1)
                            : this.handleUpdate(1))}
                        >
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
        </div>
        <ModalCommon
          notifyModal={isChangeTaxNumber ? changeTaxNotifyModal : noChangeTaxNotifyModal}
          isOpen={isOpenModal}
          onClickToCloseModal={() => this.setState({
            isOpenModal: false,
          })}
          clickToButtonInMoDal={() => this.handleUpdate(action)}
        />
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  merchantDetail: state.masterMerchant.merchantDetail,
  responseServer: state.masterMerchant.responseServer,
  responseServerMerchantDetail: state.masterMerchant.responseServerMerchantDetail,
});

const mapDispatchToProps = (dispatch) => ({
  getMerchantDetail: (data) => dispatch(getMerchantDetail(data)),
  updateMasterMerchant: (data) => dispatch(updateMasterMerchant(data)),
});

AddMerchant.defaultProps = {
  merchantDetail: {},
  responseServer: {},
  history: {},
  responseServerMerchantDetail: {},
  updateMasterMerchant: () => {},
};

AddMerchant.propTypes = {
  merchantDetail: PropTypes.object,
  responseServer: PropTypes.object,
  history: PropTypes.object,
  responseServerMerchantDetail: PropTypes.object,
  updateMasterMerchant: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddMerchant));
