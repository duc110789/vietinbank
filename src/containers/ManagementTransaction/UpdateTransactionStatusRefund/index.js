import React from 'react';
import {Button, Card, CardBody, CardHeader, Col, Collapse, FormGroup, Label, Row,} from 'reactstrap';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Form from 'react-validation/build/form';
import Textarea from 'react-validation/build/textarea';
import Select from 'react-select';
import Constants from '../Constants';
import {
  getTransactionDetailRefund,
  updateTransactionStatusRefund,
} from '../../../store/actions/ManagementTransaction/index';
import {checkLength6To150} from '../../../components/Input/validation';
import {messageError, messageSuccess} from "../../../utils";
import {numberWithDots, renderTransactionStatusColor} from "../../../utils/commonFunction";
class UpdateTransactionStatusRefund extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenInfo: true,
      isOpenInfoTransaction: true,
      isOpenInfoCustom: true,
      isOpenInfoRefund: true,
      checkChangeStatus: false,
      description: '',
      status: '',
    };
  }

  componentDidMount() {
    const {
      getTransactionDetailRefund,
    } = this.props;

    if (
      window.localStorage.ID_TRANSACTION
    ) {
      const data = {
        id: JSON.parse(window.atob(window.localStorage.getItem('ID_TRANSACTION'))),
        idRefund: JSON.parse(window.atob(window.localStorage.getItem('ID_TRANSACTION_REFUND'))),
        localDate: JSON.parse(window.atob(window.localStorage.getItem('LOCAL_DATE_TRANSACTION_DETAIL_REFUND'))),
        changeData: true,
      };
      getTransactionDetailRefund(data);
    }
  }

  static getDerivedStateFromProps(props) {
    const {
      transactionDetailRefund,
    } = props;

    let listMasterMerchant = [];
    if (localStorage.getItem('LIST_MASTER_MERCHANT')) {
      listMasterMerchant = JSON.parse(localStorage && localStorage.getItem('LIST_MASTER_MERCHANT'));
    }
    let listTypeSource = [];
    if (localStorage.getItem('TYPE_SOURCE')) {
      listTypeSource = JSON.parse(localStorage && localStorage.getItem('TYPE_SOURCE'));
    }

    let listTransactionStatus = [];
    if (localStorage.getItem('TRANSACTION')) {
      listTransactionStatus = JSON.parse(localStorage && localStorage.getItem('TRANSACTION'));
    }

    let listPayType = [];
    if (localStorage.getItem('QR_CHANNEL')) {
      listPayType = JSON.parse(localStorage && localStorage.getItem('QR_CHANNEL'));
    }

    let listMccInterior = [];
    if (localStorage.getItem('LIST_MCC_INTERIOR')) {
      listMccInterior = JSON.parse(localStorage && localStorage.getItem('LIST_MCC_INTERIOR'));
    }

    let listMccInternational = [];
    if (localStorage.getItem('LIST_MCC_INTERNATIONAL')) {
      listMccInternational = JSON.parse(localStorage && localStorage.getItem('LIST_MCC_INTERNATIONAL'));
    }

    let listBanks = [];
    if (localStorage.getItem('LIST_BANKS')) {
      listBanks = JSON.parse(localStorage && localStorage.getItem('LIST_BANKS'));
    }

    let listRefundStatus = [];
    const updateListRefundStatus = [];
    if (localStorage.getItem('REFUND')) {
      listRefundStatus = JSON.parse(localStorage && localStorage.getItem('REFUND'));
      if (listRefundStatus) {
        for (let i = 0; i < listRefundStatus.length; i += 1) {
          updateListRefundStatus.push({
            value: listRefundStatus[i] && listRefundStatus[i].code,
            label: `${listRefundStatus[i] && listRefundStatus[i].description}`,
          });
        }
      }
    }

    let listChannelRefund = [];
    if (localStorage.getItem('CHANNEL_REFUND')) {
      listChannelRefund = JSON.parse(localStorage && localStorage.getItem('CHANNEL_REFUND'));
    }

    let listTypeRefund = [];
    if (localStorage.getItem('REFUNDTYPE')) {
      listTypeRefund = JSON.parse(localStorage && localStorage.getItem('REFUNDTYPE'));
    }

    return {
      listMasterMerchant,
      transactionDetailRefund,
      listTypeSource,
      listTransactionStatus,
      listPayType,
      listMccInterior,
      listMccInternational,
      listBanks,
      listRefundStatus,
      listChannelRefund,
      listTypeRefund,
      updateListRefundStatus,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      transactionDetailRefund,
      responseServerUpdateTransactionRefund,
      history,
    } = this.props;
    if (transactionDetailRefund !== prevProps.transactionDetailRefund) {
      this.setState({
        status: (transactionDetailRefund && transactionDetailRefund.statusRefund),
      });
    }
    if (responseServerUpdateTransactionRefund !== prevProps.responseServerUpdateTransactionRefund) {
      if (responseServerUpdateTransactionRefund.code !== '00') {
        messageError(responseServerUpdateTransactionRefund.description);
      } else if (responseServerUpdateTransactionRefund.description === 'Success') {
        messageSuccess('Cập nhật trạng thái giao dịch hoàn tiền thành công');
        history.push({
          pathname: '/management-transaction/listRefund',
        });
      }
    }
  }

  getNameMasterMerchant = (arrMasterMerchant, merchantCode) => arrMasterMerchant
    .map((item) => {
      if (parseInt(item.bankCode, 10) === merchantCode || item.bankCode === merchantCode) {
        return item.bankName;
      }
      return '';
    });

  getNameTypeSource = (arrTypeSource, typeSourceCode) => arrTypeSource
    .map((item) => {
      if (parseInt(item.code, 10) === typeSourceCode || item.code === typeSourceCode) {
        return item.description;
      }
      return '';
    });

  getNameTransactionStatus = (arrTransactionStatus, statusCode) => arrTransactionStatus
    .map((item) => {
      if (parseInt(item.code, 10) === statusCode || item.code === statusCode) {
        return item.description;
      }
      return '';
    });

    getNamePayType = (arrPayType, payTypeCode) => arrPayType
    .map((item) => {
      if (parseInt(item.code, 10) === payTypeCode || item.code === payTypeCode.toString().replace('0', '')) {
        return item.description;
      }
      return '';
    });

  getNameMccInterior = (arrMccInterior, mccInteriorCode) => arrMccInterior
    .map((item) => {
      if (parseInt(item.typeCode, 10) === mccInteriorCode || item.typeCode === mccInteriorCode) {
        return item.description;
      }
      return '';
    });

  getNameMccInternational = (arrMccInternational, mccInternationalCode) => arrMccInternational
    .map((item) => {
      if (
        parseInt(item.typeCode, 10) === mccInternationalCode
        || item.typeCode === mccInternationalCode
      ) {
        return item.description;
      }
      return '';
    });

  getNameBank = (arrBanks, bankCode) => arrBanks
    .map((item) => {
      if (parseInt(item.bankCode, 10) === bankCode || item.bankCode === bankCode) {
        return item.brandName;
      }
      return '';
    });

  // getNameTypeRefund = (arrTypeRefund, typeRefundCode) => arrTypeRefund
  //   .map((item) => {
  //     if (parseInt(item.code, 10) === typeRefundCode || item.code === typeRefundCode) {
  //       return item.description;
  //     }
  //     return '';
  //   });

  getNameChannelRefund = (arrChannelRefund, channelRefundCode) => arrChannelRefund
    .map((item) => {
      if (parseInt(item.code, 10) === channelRefundCode || item.code === channelRefundCode) {
        return item.description;
      }
      return '';
    });

  handOpenInfo = () => {
    const { isOpenInfo } = this.state;
    this.setState({
      isOpenInfo: !isOpenInfo,
    });
  };

  handOpenInfoTransaction = () => {
    const { isOpenInfoTransaction } = this.state;
    this.setState({
      isOpenInfoTransaction: !isOpenInfoTransaction,
    });
  };

  handOpenInfoCustom = () => {
    const { isOpenInfoCustom } = this.state;
    this.setState({
      isOpenInfoCustom: !isOpenInfoCustom,
    });
  };

  handOpenInfoRefund = () => {
    const { isOpenInfoRefund } = this.state;
    this.setState({
      isOpenInfoRefund: !isOpenInfoRefund,
    });
  };

  onChangeTransactionStatus = (e) => {
    this.setState({
      status: e.value,
      checkChangeStatus: false,
    });
  };

  onChangeDescription = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  updateStatusRefund = () => {
    const {
      updateTransactionStatusRefund,
      transactionDetailRefund,
    } = this.props;
    const {
      status,
      description,
    } = this.state;

    if (status === (transactionDetailRefund && transactionDetailRefund.statusRefund)) {
      this.setState({
        checkChangeStatus: true,
      });
    } else {
      this.setState({
        checkChangeStatus: false,
      }, () => {
        this.form.validateAll();
        if (
          window.localStorage.ID_TRANSACTION
          && (this.form.getChildContext()._errors.length === 0)
        ) {
          const data = {
            id: JSON.parse(window.atob(window.localStorage.getItem('ID_TRANSACTION'))),
            idRefund: JSON.parse(window.atob(window.localStorage.getItem('ID_TRANSACTION_REFUND'))),
            localDate: JSON.parse(window.atob(window.localStorage.getItem('LOCAL_DATE_TRANSACTION_DETAIL_REFUND'))),
            status,
            note: description,
            online: true,
          };
          updateTransactionStatusRefund(data);
        }
      });
    }
  };

  render() {
    const {
      history,
    } = this.props;
    const {
      isOpenInfo,
      isOpenInfoTransaction,
      isOpenInfoCustom,
      isOpenInfoRefund,
      transactionDetailRefund,
      listMasterMerchant,
      listTypeSource,
      listPayType,
      listMccInterior,
      listMccInternational,
      listBanks,
      listRefundStatus,
      listChannelRefund,
      listTypeRefund,
      checkChangeStatus,
    } = this.state;
    let totalAmount = 0;
    if (transactionDetailRefund && transactionDetailRefund.qrTransactionDetails.length) {
      for (let i = 0; i < transactionDetailRefund.qrTransactionDetails.length; i += 1) {
        totalAmount += (
          transactionDetailRefund.qrTransactionDetails[i].quantity
          * transactionDetailRefund.qrTransactionDetails[i].amount
        );
      }
    }
    if (transactionDetailRefund && transactionDetailRefund.tipFee) {
      totalAmount += transactionDetailRefund.tipFee;
    }

    let defaultNameRefundStatus = '';
    listRefundStatus
      .map((item) => {
        if (
          parseInt(item.code, 10)
          === (transactionDetailRefund && transactionDetailRefund.statusRefund)
          || item.code === (transactionDetailRefund && transactionDetailRefund.statusRefund)
        ) {
          defaultNameRefundStatus = item.description;
        }
        return '';
      });

    let arrCheckRefundStatus = [];
    if (transactionDetailRefund && (transactionDetailRefund.statusRefund === 0)) {
      arrCheckRefundStatus = [
        { value: 2, label: 'Reversal manual' },
        { value: 16, label: 'Reversal auto' },
        { value: 4, label: 'Reversal rejected' },
      ];
    } else if (transactionDetailRefund && (transactionDetailRefund.statusRefund === 18)) {
      arrCheckRefundStatus = [
        { value: 16, label: 'Reversal auto' },
        { value: 17, label: 'Reversal failed' },
      ];
    } else if (transactionDetailRefund && (transactionDetailRefund.statusRefund === 17)) {
      arrCheckRefundStatus = [
        { value: 2, label: 'Reversal manual' },
        { value: 4, label: 'Reversal rejected' },
      ];
    }
    return (
      <div className="my-requests">
        <Card className="card-my-requests">
          <CardHeader>
            <Col xs="12">
              <FormGroup style={{ marginBottom: 0 }} row>
                <Col lg="12" style={{ paddingLeft: 0 }}>
                  <span className="text-bold">
                    {Constants.Transaction.transactionDetailRefund}
                  </span>
                </Col>
              </FormGroup>
            </Col>
          </CardHeader>
          <CardBody>
            <Row>
              <div className="col-md-6">
                <div className="widget-box transparent">
                  <div className="widget-header widget-header-flat" role="presentation" onClick={this.handOpenInfo} onKeyPress={this.handOpenInfo}>
                    <span className="text-bold">Nhóm thông tin điểm bán</span>
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
                        <div className="row">
                          <FormGroup row className="col-md-12">
                            <Col md="6">
                              <Label>
                                MMID-Tên Master Merchant
                              </Label>
                            </Col>
                            <Col md="6">
                              <Label>
                                {transactionDetailRefund && transactionDetailRefund.masterMcCode}
                                {' - '}
                                {
                                  transactionDetailRefund && transactionDetailRefund.masterMcCode
                                  && this.getNameMasterMerchant(
                                    listMasterMerchant, transactionDetailRefund.masterMcCode,
                                  )
                                }
                              </Label>
                            </Col>
                          </FormGroup>
                          <FormGroup row className="col-md-12">
                            <Col md="6">
                              <Label>
                                MID-Tên Merchant
                              </Label>
                            </Col>
                            <Col md="6">
                              <Label>
                                {
                                  transactionDetailRefund && `${transactionDetailRefund.merchantCode}-${transactionDetailRefund.merchantName}`
                                }
                              </Label>
                            </Col>
                          </FormGroup>
                          <FormGroup row className="col-md-12">
                            <Col md="6">
                              <Label>
                                Tên Terminal
                              </Label>
                            </Col>
                            <Col md="6">
                              <Label>
                                {transactionDetailRefund && transactionDetailRefund.terminalName}
                              </Label>
                            </Col>
                          </FormGroup>
                          <FormGroup row className="col-md-12">
                            <Col md="6">
                              <Label>
                                MCC quốc tế
                              </Label>
                            </Col>
                            <Col md="6">
                              <Label>
                                {/** ** */}
                                {transactionDetailRefund && transactionDetailRefund.mccGlobal}
                                {'-'}
                                {
                                  transactionDetailRefund
                                  && this.getNameMccInternational(
                                    listMccInternational, transactionDetailRefund.mccGlobal,
                                  )
                                }
                              </Label>
                            </Col>
                          </FormGroup>
                          <FormGroup row className="col-md-12">
                            <Col md="6">
                              <Label>
                                MCC nội địa
                              </Label>
                            </Col>
                            <Col md="6">
                              <Label>
                                {
                                  transactionDetailRefund
                                  && this.getNameMccInterior(
                                    listMccInterior, transactionDetailRefund.mcc,
                                  )
                                }
                              </Label>
                            </Col>
                          </FormGroup>
                        </div>
                      </CardBody>
                    </Card>
                  </Collapse>
                </div>
                <div className="widget-box transparent">
                  <div className="widget-header widget-header-flat" role="presentation" onClick={this.handOpenInfoCustom} onKeyPress={this.handOpenInfo}>
                    <span className="text-bold">Nhóm thông tin khách hàng</span>
                    <div className="widget-toolbar">
                      <span data-action="collapse">
                        {isOpenInfoCustom ? (
                          <i className="ace-icon fa fa-chevron-up" />
                        ) : (
                          <i className="ace-icon fa fa-chevron-down" />
                        )}
                      </span>
                    </div>
                  </div>
                  <Collapse isOpen={isOpenInfoCustom} className="show-information">
                    <Card>
                      <CardBody>
                        <div className="row">
                          <FormGroup row className="col-md-12">
                            <Col md="6">
                              <Label>
                                Số điện thoại
                              </Label>
                            </Col>
                            <Col md="6">
                              <Label>
                                {transactionDetailRefund && transactionDetailRefund.mobile}
                              </Label>
                            </Col>
                          </FormGroup>
                          <FormGroup row className="col-md-12">
                            <Col md="6">
                              <Label>
                                Tên khách hàng
                              </Label>
                            </Col>
                            <Col md="6">
                              <Label>
                                {transactionDetailRefund && transactionDetailRefund.customerName}
                              </Label>
                            </Col>
                          </FormGroup>
                          <FormGroup row className="col-md-12">
                            <Col md="6">
                              <Label>
                                Số thẻ/ tài khoản
                              </Label>
                            </Col>
                            <Col md="6">
                              <Label>
                                {transactionDetailRefund && transactionDetailRefund.accountNo}
                              </Label>
                            </Col>
                          </FormGroup>
                          <FormGroup row className="col-md-12">
                            <Col md="6">
                              <Label>
                                Loại thẻ/ tài khoản
                              </Label>
                            </Col>
                            <Col md="6">
                              <Label>
                                {
                                  transactionDetailRefund
                                  && this.getNameTypeSource(
                                    listTypeSource, transactionDetailRefund.typeSource,
                                  )
                                }
                              </Label>
                            </Col>
                          </FormGroup>
                          <FormGroup row className="col-md-12">
                            <Col md="6">
                              <Label>
                                Đơn vị thanh toán
                              </Label>
                            </Col>
                            <Col md="6">
                              <Label>
                                {
                                  transactionDetailRefund
                                  && this.getNameBank(
                                    listBanks, transactionDetailRefund.bankCode,
                                  )
                                }
                              </Label>
                            </Col>
                          </FormGroup>
                        </div>
                      </CardBody>
                    </Card>
                  </Collapse>
                </div>
                <div className="widget-box transparent">
                  <div className="widget-header widget-header-flat" role="presentation" onClick={this.handOpenInfoRefund} onKeyPress={this.handOpenInfoRefund}>
                    <span className="text-bold">Nhóm thông tin GD hoàn</span>
                    <div className="widget-toolbar">
                      <span data-action="collapse">
                        {isOpenInfoRefund ? (
                          <i className="ace-icon fa fa-chevron-up" />
                        ) : (
                          <i className="ace-icon fa fa-chevron-down" />
                        )}
                      </span>
                    </div>
                  </div>
                  <Form className="widget-box transparent" ref={(updateTransitionStatusRefund) => { this.form = updateTransitionStatusRefund; }}>
                    <Collapse isOpen={isOpenInfoRefund} className="show-information">
                      <Card>
                        <CardBody>
                          <div className="row">
                            <FormGroup row className="col-md-12">
                              <Col md="6">
                                <Label>
                                  Mã GD hoàn
                                </Label>
                              </Col>
                              <Col md="6">
                                <Label>
                                  {transactionDetailRefund && transactionDetailRefund.idRefund}
                                </Label>
                              </Col>
                            </FormGroup>
                            <FormGroup row className="col-md-12">
                              <Col md="6">
                                <Label>
                                  Loại hoàn tiền
                                </Label>
                              </Col>
                              <Col md="6">
                                <Label>
                                  {
                                    transactionDetailRefund
                                    && this.getNameChannelRefund(
                                      listTypeRefund, transactionDetailRefund.typeRefund,
                                    )
                                  }
                                </Label>
                              </Col>
                            </FormGroup>
                            <FormGroup row className="col-md-12">
                              <Col md="6">
                                <Label>
                                  Số tiền yêu cầu hoàn
                                </Label>
                              </Col>
                              <Col md="6">
                                <Label>
                                  {
                                    transactionDetailRefund
                                    && numberWithDots(transactionDetailRefund.initAmountRefund)
                                  }
                                </Label>
                              </Col>
                            </FormGroup>
                            <FormGroup row className="col-md-12">
                              <Col md="6">
                                <Label>
                                  Số tiền hoàn thực
                                </Label>
                              </Col>
                              <Col md="6">
                                <Label>
                                  {
                                    transactionDetailRefund
                                    && numberWithDots(transactionDetailRefund.amountRefund)
                                  }
                                </Label>
                              </Col>
                            </FormGroup>
                            <FormGroup row className="col-md-12">
                              <Col md="6">
                                <Label>
                                  User yêu cầu
                                </Label>
                              </Col>
                              <Col md="6">
                                <Label>
                                  {
                                    transactionDetailRefund
                                    && transactionDetailRefund.requestedUser
                                  }
                                </Label>
                              </Col>
                            </FormGroup>
                            <FormGroup row className="col-md-12">
                              <Col md="6">
                                <Label>
                                  Yêu cầu từ
                                </Label>
                              </Col>
                              <Col md="6">
                                <Label>
                                  {
                                    transactionDetailRefund
                                    && this.getNameChannelRefund(
                                      listChannelRefund, transactionDetailRefund.channel,
                                    )
                                  }
                                </Label>
                              </Col>
                            </FormGroup>
                            <FormGroup row className="col-md-12">
                              <Col md="6">
                                <Label>
                                  Nội dung hoàn
                                </Label>
                              </Col>
                              <Col md="6">
                                <Label>
                                  {
                                    transactionDetailRefund
                                    && transactionDetailRefund.msgRefund
                                  }
                                </Label>
                              </Col>
                            </FormGroup>
                            <FormGroup row className="col-md-12">
                              <Col md="6">
                                <Label>
                                  Trạng thái
                                </Label>
                              </Col>
                              <Col md="6">
                                {
                                  defaultNameRefundStatus && (
                                    <Select
                                      placeholder="Chọn"
                                      defaultValue={
                                        {
                                          value: (
                                            transactionDetailRefund
                                            && transactionDetailRefund.statusRefund
                                          ),
                                          label: defaultNameRefundStatus,
                                        }
                                      }
                                      options={arrCheckRefundStatus}
                                      onChange={this.onChangeTransactionStatus}
                                    />
                                  )
                                }
                                { checkChangeStatus && (
                                  <span className="text-danger">
                                    Vui lòng cập nhật trạng thái giao dịch
                                  </span>
                                )}
                              </Col>
                            </FormGroup>
                            <FormGroup row className="col-md-12">
                              <Col md="6">
                                <Label>
                                  Nội dung
                                </Label>
                              </Col>
                              <Col md="6">
                                <Textarea
                                  maxLength="150"
                                  minLength="6"
                                  label="Nội dung hoàn"
                                  type="text"
                                  className="form-control"
                                  name="messageRefund"
                                  onChange={this.onChangeDescription}
                                  validations={[
                                    checkLength6To150,
                                  ]}
                                />
                              </Col>
                            </FormGroup>
                          </div>
                        </CardBody>
                      </Card>
                    </Collapse>
                  </Form>
                </div>
              </div>
              <div className="col-md-6">
                <div className="widget-box transparent">
                  <div className="widget-header widget-header-flat" role="presentation" onClick={this.handOpenInfoTransaction} onKeyPress={this.handOpenInfo}>
                    <span className="text-bold">Nhóm thông tin giao dịch</span>
                    <div className="widget-toolbar">
                      <span data-action="collapse">
                        {isOpenInfoTransaction ? (
                          <i className="ace-icon fa fa-chevron-up" />
                        ) : (
                          <i className="ace-icon fa fa-chevron-down" />
                        )}
                      </span>
                    </div>
                  </div>
                  <Collapse isOpen={isOpenInfoTransaction} className="show-information">
                    <Card>
                      <CardBody>
                        <div className="row">
                          <FormGroup row className="col-md-12">
                            <Col md="6">
                              <Label>
                                Mã giao dịch
                              </Label>
                            </Col>
                            <Col md="6">
                              <Label>
                                {transactionDetailRefund && transactionDetailRefund.qrTrace}
                              </Label>
                            </Col>
                          </FormGroup>
                          <FormGroup row className="col-md-12">
                            <Col md="6">
                              <Label>
                                Mã thanh toán
                              </Label>
                            </Col>
                            <Col md="6">
                              <Label>
                                {transactionDetailRefund && transactionDetailRefund.orderCode}
                              </Label>
                            </Col>
                          </FormGroup>
                          <FormGroup row className="col-md-12">
                            <Col md="6">
                              <Label>
                                Mã đơn hàng
                              </Label>
                            </Col>
                            <Col md="6">
                              <Label>
                                {transactionDetailRefund && transactionDetailRefund.billNumber}
                              </Label>
                            </Col>
                          </FormGroup>
                          <FormGroup row className="col-md-12">
                            <Col md="6">
                              <Label>
                                Số hóa đơn
                              </Label>
                            </Col>
                            <Col md="6">
                              <Label>
                                {transactionDetailRefund && transactionDetailRefund.txnId}
                              </Label>
                            </Col>
                          </FormGroup>
                          <FormGroup row className="col-md-12">
                            <Col md="6">
                              <Label>
                                Số tiền trước km
                              </Label>
                            </Col>
                            <Col md="6">
                              <Label>
                                {transactionDetailRefund && numberWithDots(transactionDetailRefund.debitAmount)}
                              </Label>
                            </Col>
                          </FormGroup>
                          <FormGroup row className="col-md-12">
                            <Col md="6">
                              <Label>
                                Số tiền sau km
                              </Label>
                            </Col>
                            <Col md="6">
                              <Label>
                                {transactionDetailRefund && numberWithDots(transactionDetailRefund.realAmount)}
                              </Label>
                            </Col>
                          </FormGroup>
                          <FormGroup row className="col-md-12">
                            <Col md="6">
                              <Label>
                                Loại tiền
                              </Label>
                            </Col>
                            <Col md="6">
                              <Label>
                                VND
                              </Label>
                            </Col>
                          </FormGroup>
                          <FormGroup row className="col-md-12">
                            <Col md="6">
                              <Label>
                                Thời gian giao dịch
                              </Label>
                            </Col>
                            <Col md="6">
                              <Label>
                                {transactionDetailRefund && transactionDetailRefund.localDate}
                              </Label>
                            </Col>
                          </FormGroup>
                          <FormGroup row className="col-md-12">
                            <Col md="6">
                              <Label>
                                Thời gian TT
                              </Label>
                            </Col>
                            <Col md="6">
                              <Label>
                                {transactionDetailRefund && transactionDetailRefund.paymentDate}
                              </Label>
                            </Col>
                          </FormGroup>
                          <FormGroup row className="col-md-12">
                            <Col md="6">
                              <Label>
                                Trạng thái
                              </Label>
                            </Col>
                            <Col md="6">
                              <Label>
                                {
                                  transactionDetailRefund
                                  && renderTransactionStatusColor(transactionDetailRefund.status)
                                }
                              </Label>
                            </Col>
                          </FormGroup>
                          <FormGroup row className="col-md-12">
                            <Col md="6">
                              <Label>
                                Loại thanh toán
                              </Label>
                            </Col>
                            <Col md="6">
                              <Label>
                                {transactionDetailRefund && transactionDetailRefund.payType}
                                {
                                  transactionDetailRefund
                                  && this.getNamePayType(
                                    listPayType,transactionDetailRefund && transactionDetailRefund.serviceCode,
                                  )
                                }
                              </Label>
                            </Col>
                          </FormGroup>
                          <FormGroup row className="col-md-12">
                            <Col md="6">
                              <Label>
                                Nội dung giao dịch
                              </Label>
                            </Col>
                            <Col md="6">
                              <Label>
                                {transactionDetailRefund && transactionDetailRefund.additionalData}
                              </Label>
                            </Col>
                          </FormGroup>
                          <FormGroup row className="col-md-12">
                            <Col md="6">
                              <Label>
                                Ghi chú của khách hàng
                              </Label>
                            </Col>
                            <Col md="6">
                              <Label>
                                {transactionDetailRefund && transactionDetailRefund.txnContent}
                              </Label>
                            </Col>
                          </FormGroup>
                          <FormGroup row className="col-md-12">
                            <Col md="6">
                              <Label>
                                Nội dung giao dịch thanh toán chéo
                              </Label>
                            </Col>
                            <Col md="6">
                              <Label>
                                {
                                  transactionDetailRefund
                                  && `${transactionDetailRefund.merchantName}-${transactionDetailRefund.txnId}
                                  -${transactionDetailRefund.orderCode}-${transactionDetailRefund.accountNo}`
                                }
                              </Label>
                            </Col>
                          </FormGroup>
                          <FormGroup row className="col-md-12">
                            <Col md="6">
                              <Label>
                                Mô tả
                              </Label>
                            </Col>
                            <Col md="6">
                              <Label>
                                {
                                  transactionDetailRefund
                                  && transactionDetailRefund.noteChangeStatus
                                }
                              </Label>
                            </Col>
                          </FormGroup>
                        </div>
                      </CardBody>
                    </Card>
                  </Collapse>
                </div>
              </div>
            </Row>
            <Row>
              <Col className="text-center btn-search mt-3 mb-5">
                <div>
                  <Button onClick={() => this.updateStatusRefund()} className="btn btn-primary btn btn-secondary mr-3 pl-4 pr-4">
                    Cập nhật
                  </Button>
                  <Button onClick={history.goBack} onKeyPress={history.goBack} title="Về danh sách" className="btn bggrey bigger-150 mr-3 text-white">
                    <i className="fa fa-arrow-left mr-2" aria-hidden="true" />
                    {Constants.btnMerchant.comeBackList}
                  </Button>
                </div>
              </Col>
            </Row>
            <Row>
              <div className="col-12 fee-table_table w-100 overflow-auto">
                <table className="fee-table__table">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Mã sản phẩm</th>
                      <th>Tên sản phẩm</th>
                      <th>Số lượng</th>
                      <th>Giá tiền</th>
                      <th>Thành tiền</th>
                      <th>Ghi chú</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(transactionDetailRefund && transactionDetailRefund.qrTransactionDetails
                      && transactionDetailRefund.qrTransactionDetails.length)
                      ? (transactionDetailRefund.qrTransactionDetails.map((data, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{data.productId}</td>
                          <td>{data.productName}</td>
                          <td>{data.quantity}</td>
                          <td>{numberWithDots(data.amount)}</td>
                          <td>{data.quantity ? numberWithDots(data.amount * data.quantity) : 0}</td>
                          <td>{data.note}</td>
                        </tr>
                      ))) : (
                        <tr>
                          <td className="text-center" colSpan={7}>Không có dữ liệu hợp lệ</td>
                        </tr>
                      )}
                  </tbody>
                </table>
              </div>
              <div className="col-md-12 mt-4 mb-5">
                <h6>
                  Tip & phí:
                  {(transactionDetailRefund && transactionDetailRefund.tipFee) || 0}
                  {' '}
                  VND
                </h6>
                <h6>
                  <b>
                    TỔNG TIỀN ĐƠN HÀNG:
                    {' '}
                    {
                      numberWithDots(totalAmount)
                    }
                    {' '}
                    VND
                  </b>
                </h6>
              </div>
            </Row>
            <Row>
              <div className="col-md-12">
                <div className="widget-box transparent">
                  <div className="text-bold widget-header">Chi tiết pha giao dịch</div>
                </div>
              </div>
              <div className="col-12 fee-table_table w-100 overflow-auto">
                <table className="fee-table__table">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Số Trace</th>
                      <th>Pha giao dịch</th>
                      <th>Mã lỗi</th>
                      <th>Chi tiết</th>
                      <th>Ngày tạo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>{transactionDetailRefund && transactionDetailRefund.qrTrace}</td>
                      <td>1</td>
                      <td>00</td>
                      <td>Khởi tạo</td>
                      <td>{transactionDetailRefund && transactionDetailRefund.localDate}</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>{transactionDetailRefund && transactionDetailRefund.phase2Trace}</td>
                      <td>2.1</td>
                      <td>{transactionDetailRefund && transactionDetailRefund.phase2Code}</td>
                      <td>{transactionDetailRefund && transactionDetailRefund.phase2Desc}</td>
                      <td>{(transactionDetailRefund && transactionDetailRefund.phase2Code) ? transactionDetailRefund.paymentDate : ''}</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>{transactionDetailRefund && transactionDetailRefund.phase22Trace}</td>
                      <td>2.2</td>
                      <td>{transactionDetailRefund && transactionDetailRefund.phase22Code}</td>
                      <td>{transactionDetailRefund && transactionDetailRefund.phase22Desc}</td>
                      <td>{(transactionDetailRefund && transactionDetailRefund.phase22Code) ? transactionDetailRefund.paymentDate : ''}</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>{transactionDetailRefund && transactionDetailRefund.phase3Trace}</td>
                      <td>3</td>
                      <td>{transactionDetailRefund && transactionDetailRefund.phase3Code}</td>
                      <td>{transactionDetailRefund && transactionDetailRefund.phase3Desc}</td>
                      <td>{transactionDetailRefund && transactionDetailRefund.phase3Date}</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>{transactionDetailRefund && transactionDetailRefund.phase4Trace}</td>
                      <td>4.1</td>
                      <td>{transactionDetailRefund && transactionDetailRefund.phase4Code}</td>
                      <td>{transactionDetailRefund && transactionDetailRefund.phase4Desc}</td>
                      <td>{transactionDetailRefund && transactionDetailRefund.phase4Date}</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>{transactionDetailRefund && transactionDetailRefund.phase42Trace}</td>
                      <td>4.2</td>
                      <td>{transactionDetailRefund && transactionDetailRefund.phase42Code}</td>
                      <td>{transactionDetailRefund && transactionDetailRefund.phase42Desc}</td>
                      <td>{transactionDetailRefund && transactionDetailRefund.phase42Date}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  transactionDetailRefund: state.Transaction.transactionDetailRefund,
  responseServerUpdateTransactionRefund: state.Transaction.responseServerUpdateTransactionRefund,
});

const mapDispatchToProps = (dispatch) => ({
  getTransactionDetailRefund: (data) => dispatch(getTransactionDetailRefund(data)),
  updateTransactionStatusRefund: (data) => dispatch(updateTransactionStatusRefund(data)),
});

UpdateTransactionStatusRefund.defaultProps = {
  getTransactionDetailRefund: () => {},
  updateTransactionStatusRefund: () => {},
  history: {},
  responseServerUpdateTransactionRefund: {},
};

UpdateTransactionStatusRefund.propTypes = {
  getTransactionDetailRefund: PropTypes.func,
  updateTransactionStatusRefund: PropTypes.func,
  history: PropTypes.object,
  responseServerUpdateTransactionRefund: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UpdateTransactionStatusRefund));
