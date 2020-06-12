import React from 'react';
import {Button, Card, CardBody, CardHeader, Col, Collapse, FormGroup, Label, Row,} from 'reactstrap';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Textarea from 'react-validation/build/textarea';
import Form from 'react-validation/build/form';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Constants from '../Constants';
import {
  getTransactionDetail,
  updateTransactionStatusPayment,
} from '../../../store/actions/ManagementTransaction/index';
import {messageError, messageSuccess} from '../../../utils';
import {checkLength6To150} from '../../../components/Input/validation';
import {numberWithDots} from '../../../utils/commonFunction';

class UpdateStatusTransactionPayment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenInfo: true,
      isOpenInfoTransaction: true,
      isOpenInfoCustom: true,
      status: 8,
      description: '',
      checkChangeStatus: false,
    };
  }

  componentDidMount() {
    const {
      getTransactionDetail,
    } = this.props;

    if (
      window.localStorage.ID_TRANSACTION
    ) {
      const data = {
        id: JSON.parse(window.atob(window.localStorage.getItem('ID_TRANSACTION'))),
        status: JSON.parse(window.atob(window.localStorage.getItem('STATUS_TRANSACTION_DETAIL'))),
        noteChaneStatus: 'string',
        localDate: JSON.parse(window.atob(window.localStorage.getItem('LOCAL_DATE_TRANSACTION_DETAIL'))),
        online: JSON.parse(window.atob(window.localStorage.getItem('ONLINE_TRANSACTION_DETAIL'))),
        changeData: true,
      };
      getTransactionDetail(data);
    }
  }

  componentDidUpdate(prevProps) {
    const { responseServerUpdateTransaction, history } = this.props;
    if (responseServerUpdateTransaction !== prevProps.responseServerUpdateTransaction) {
      if (responseServerUpdateTransaction.code !== '00') {
        messageError(responseServerUpdateTransaction.description);
      } else if (responseServerUpdateTransaction.description === 'Success') {
        messageSuccess('Cập nhật trạng thái giao dịch thanh toán thành công');
        history.push({
          pathname: '/management-transaction/detail',
        });
      }
    }
  }

  static getDerivedStateFromProps(props) {
    const {
      transactionDetail,
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

    return {
      listMasterMerchant,
      transactionDetail,
      listTypeSource,
      listTransactionStatus,
      listPayType,
      listMccInterior,
      listMccInternational,
      listBanks,
    };
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

  updateTransactionStatusPayment = () => {
    const { updateTransactionStatusPayment } = this.props;
    const {
      status,
      description,
    } = this.state;
    if (status === 8) {
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
            status,
            noteChaneStatus: description,
            localDate: JSON.parse(window.atob(window.localStorage.getItem('LOCAL_DATE_TRANSACTION_DETAIL'))),
            online: JSON.parse(window.atob(window.localStorage.getItem('ONLINE_TRANSACTION_DETAIL'))),
            changeData: true,
          };
          updateTransactionStatusPayment(data);
        }
      });
    }
  };

  goBack = () => {
    const { history } = this.props;
    history.push({
      pathname: '/management-transaction/list',
    });
  };

  render() {
    const {
      isOpenInfo,
      isOpenInfoTransaction,
      isOpenInfoCustom,
      transactionDetail,
      listMasterMerchant,
      listTypeSource,
      listPayType,
      listMccInterior,
      listMccInternational,
      listBanks,
      checkChangeStatus,
    } = this.state;

    const arrTransactionStatus = [
      { value: 0, label: 'Success' },
      { value: 1, label: 'Fail' },
    ];
    let totalAmount = 0;
    if (transactionDetail && transactionDetail.qrTransactionDetails.length) {
      for (let i = 0; i < transactionDetail.qrTransactionDetails.length; i += 1) {
        totalAmount += (
          transactionDetail.qrTransactionDetails[i].quantity
          * transactionDetail.qrTransactionDetails[i].amount
        );
      }
    }
    if (transactionDetail && transactionDetail.tipFee) {
      totalAmount += transactionDetail.tipFee;
    }

    return (
      <div className="my-requests">
        <Card className="card-my-requests">
          <CardHeader>
            <Col xs="12">
              <FormGroup style={{ marginBottom: 0 }} row>
                <Col lg="12" style={{ paddingLeft: 0 }}>
                  <span className="text-bold">
                    {Constants.Transaction.transactionDetail}
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
                                {transactionDetail && transactionDetail.masterMcCode}
                                {' - '}
                                {
                                  transactionDetail && transactionDetail.masterMcCode
                                  && this.getNameMasterMerchant(
                                    listMasterMerchant, transactionDetail.masterMcCode,
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
                                  transactionDetail && `${transactionDetail.merchantCode}-${transactionDetail.merchantName}`
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
                                {transactionDetail && transactionDetail.terminalName}
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
                                {transactionDetail && transactionDetail.mccGlobal}
                                {'-'}
                                {
                                  transactionDetail
                                  && this.getNameMccInternational(
                                    listMccInternational, transactionDetail.mccGlobal,
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
                                  transactionDetail
                                  && this.getNameMccInterior(
                                    listMccInterior, transactionDetail.mcc,
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
                  <Form className="widget-box transparent" ref={(updateTransitionStatus) => { this.form = updateTransitionStatus; }}>
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
                                  {transactionDetail && transactionDetail.mobile}
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
                                  {transactionDetail && transactionDetail.customerName}
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
                                  {transactionDetail && transactionDetail.accountNo}
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
                                    transactionDetail
                                    && this.getNameTypeSource(
                                      listTypeSource, transactionDetail.typeSource,
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
                                    transactionDetail
                                    && this.getNameBank(
                                      listBanks, transactionDetail.bankCode,
                                    )
                                  }
                                </Label>
                              </Col>
                            </FormGroup>
                            <FormGroup row className="col-md-12">
                              <Col md="6">
                                <Label>
                                  Trạng Thái
                                </Label>
                              </Col>
                              <Col md="6">
                                <Select
                                  defaultValue={{ value: 8, label: 'Check' }}
                                  options={arrTransactionStatus}
                                  onChange={this.onChangeTransactionStatus}
                                />
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
                                  Mô tả
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
                                {transactionDetail && transactionDetail.qrTrace}
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
                                {transactionDetail && transactionDetail.orderCode}
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
                                {transactionDetail && transactionDetail.billNumber}
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
                                {transactionDetail && transactionDetail.txnId}
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
                                {transactionDetail && numberWithDots(transactionDetail.debitAmount)}
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
                                {transactionDetail && numberWithDots(transactionDetail.realAmount)}
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
                                {transactionDetail && transactionDetail.localDate}
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
                                {transactionDetail && transactionDetail.paymentDate}
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
                                {transactionDetail && transactionDetail.payType}
                                {
                                  transactionDetail
                                  && this.getNamePayType(
                                    listPayType,transactionDetail && transactionDetail.serviceCode,
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
                                {transactionDetail && transactionDetail.contentTrans}
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
                                {transactionDetail && transactionDetail.txnContent}
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
                                  transactionDetail
                                  && `${transactionDetail.merchantName}-${transactionDetail.txnId}
                                  -${transactionDetail.orderCode}-${transactionDetail.accountNo}`
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
                  <Button onClick={() => this.updateTransactionStatusPayment()} className="btn btn-primary btn btn-secondary mr-3 pl-4 pr-4">
                    Cập nhật
                  </Button>
                  <Button onClick={() => this.goBack()} onKeyPress={() => this.goBack()} title="Về danh sách" className="btn bggrey bigger-150 mr-3 text-white">
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
                    {(transactionDetail && transactionDetail.qrTransactionDetails
                      && transactionDetail.qrTransactionDetails.length)
                      ? (transactionDetail.qrTransactionDetails.map((data, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{data.productId}</td>
                          <td>{data.productName}</td>
                          <td>{data.quantity}</td>
                          <td>{data.amount}</td>
                          <td>{data.quantity ? data.amount * data.quantity : 0}</td>
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
                  {(transactionDetail && transactionDetail.tipFee) || 0}
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
                      <td>{transactionDetail && transactionDetail.qrTrace}</td>
                      <td>1</td>
                      <td>00</td>
                      <td>Khởi tạo</td>
                      <td>{transactionDetail && transactionDetail.localDate}</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>{transactionDetail && transactionDetail.phase2Trace}</td>
                      <td>2.1</td>
                      <td>{transactionDetail && transactionDetail.phase2Code}</td>
                      <td>{transactionDetail && transactionDetail.phase2Desc}</td>
                      <td>{(transactionDetail && transactionDetail.phase2Code) ? transactionDetail.paymentDate : ''}</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>{transactionDetail && transactionDetail.phase22Trace}</td>
                      <td>2.2</td>
                      <td>{transactionDetail && transactionDetail.phase22Code}</td>
                      <td>{transactionDetail && transactionDetail.phase22Desc}</td>
                      <td>{(transactionDetail && transactionDetail.phase22Code) ? transactionDetail.paymentDate : ''}</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>{transactionDetail && transactionDetail.phase3Trace}</td>
                      <td>3</td>
                      <td>{transactionDetail && transactionDetail.phase3Code}</td>
                      <td>{transactionDetail && transactionDetail.phase3Desc}</td>
                      <td>{transactionDetail && transactionDetail.phase3Date}</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>{transactionDetail && transactionDetail.phase4Trace}</td>
                      <td>4.1</td>
                      <td>{transactionDetail && transactionDetail.phase4Code}</td>
                      <td>{transactionDetail && transactionDetail.phase4Desc}</td>
                      <td>{transactionDetail && transactionDetail.phase4Date}</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>{transactionDetail && transactionDetail.phase42Trace}</td>
                      <td>4.2</td>
                      <td>{transactionDetail && transactionDetail.phase42Code}</td>
                      <td>{transactionDetail && transactionDetail.phase42Desc}</td>
                      <td>{transactionDetail && transactionDetail.phase42Date}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Row>
            {(transactionDetail && transactionDetail.refundBeans
              && (transactionDetail.refundBeans.length > 0))
            && (
              <Row className="mt-5">
                <div className="col-md-12">
                  <div className="widget-box transparent">
                    <div className="text-bold widget-header">Thông tin hoàn</div>
                  </div>
                </div>
                <div className="col-12 fee-table_table w-100 overflow-auto">
                  <table className="fee-table__table">
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Mã giao dịch hoàn</th>
                        <th>Số tiền hoàn</th>
                        <th>Số tiền còn lại</th>
                        <th>Kiểu hoàn</th>
                        <th>Nội dung hoàn</th>
                        <th>Thời gian gửi yêu cầu</th>
                        <th>Thời gian hoàn</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(transactionDetail && transactionDetail.refundBeans
                      && transactionDetail.refundBeans.length)
                        ? (transactionDetail.refundBeans.map((data, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{data.id}</td>
                            <td>{data.amountRefund}</td>
                            <td>{data.amountRemain}</td>
                            <td>{data.typeRefund === 1 ? 'Hoàn toàn phần' : 'Hoàn 1 phần'}</td>
                            <td>{data.description}</td>
                            <td>{data.initTime}</td>
                            <td>{data.refundTime}</td>
                          </tr>
                        ))) : (
                          <tr>
                            <td className="text-center" colSpan={8}>Không có dữ liệu hợp lệ</td>
                          </tr>
                        )}
                    </tbody>
                  </table>
                </div>
              </Row>
            )}
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  transactionDetail: state.Transaction.transactionDetail,
  responseServerUpdateTransaction: state.Transaction.responseServerUpdateTransaction,
});

const mapDispatchToProps = (dispatch) => ({
  getTransactionDetail: (data) => dispatch(getTransactionDetail(data)),
  updateTransactionStatusPayment: (data) => dispatch(updateTransactionStatusPayment(data)),
});

UpdateStatusTransactionPayment.defaultProps = {
  getTransactionDetail: () => {},
  updateTransactionStatusPayment: () => {},
  history: {},
};

UpdateStatusTransactionPayment.propTypes = {
  getTransactionDetail: PropTypes.func,
  updateTransactionStatusPayment: PropTypes.func,
  history: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UpdateStatusTransactionPayment));
