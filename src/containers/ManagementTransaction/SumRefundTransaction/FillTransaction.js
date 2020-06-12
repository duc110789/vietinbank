import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Select from 'react-select';
import {Button, Col, FormGroup, Label, Row,} from 'reactstrap';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import Constants from '../Constants';
import {
  getExcelFileReportTranRefund,
  getTransactionListRefund,
} from '../../../store/actions/ManagementTransaction/index';
import {getMerchantCodeName} from '../../../store/actions/masterMerchant/masterMerchant';
import {getMerchantBranch, getTerminalPlace} from '../../../store/actions/terminal/terminal';
import {formatPhoneNumber} from '../../../utils/validation';
class FillTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromDate: moment().subtract(3, 'days').toDate(),
      toDate: new Date(),
      fromRow: 0,
      pageSize: 10,
      data: {
        status: -1,
      },
      errorTime: '',
      listMerchantStatus: [],
      online: true,
      checked: true,
      messageTime: '',
      isDisabledMerchantBranch: true,
      isDisabledTerminalId: true,
      errorPhone: '',
    };
    this.timeout = 0;
  }

  componentDidMount() {
    const {
      getTransactionListRefund,
    } = this.props;
    this.getListSelectBox();
    setTimeout(() => {
      const searchParams = sessionStorage.getItem('searchParams');
      const data = JSON.parse(searchParams);
      let newData = {};
      if (searchParams && data.listTransactionRefund) {
        newData = {
          data: {
            ...data.listTransactionRefund.data,
            typeRefund: data.listTransactionRefund.data.typeRefund ? (data.listTransactionRefund.data.typeRefund.value || '') : '',
            merchantCode: data.listTransactionRefund.data.merchantCode ? (data.listTransactionRefund.data.merchantCode.value || '') : '',
            serviceCode: data.listTransactionRefund.data.serviceCode ? data.listTransactionRefund.data.serviceCode.value !== '' ? `0${data.listTransactionRefund.data.serviceCode.value}` : '' : '',
            status: data.listTransactionRefund.data.status ? (data.listTransactionRefund.data.status.value || '') : '',
            terminalId: data.listTransactionRefund.data.terminalId ? (data.listTransactionRefund.data.terminalId.value || '') : '',
            terminalIdBrand: data.listTransactionRefund.data.terminalIdBrand ? (data.listTransactionRefund.data.terminalIdBrand.value || '') : '',
          },
          online: true,
          fromRow: data.listTransactionRefund.fromRow,
          pageSize: data.listTransactionRefund.pageSize,
          fromDate: data.listTransactionRefund.fromDate,
          toDate: data.listTransactionRefund.toDate,
        };
      }

      const sendData = {
        fromDate: moment().subtract(3, 'days').format('DD/MM/YYYY 00:00:00'),
        toDate: moment(new Date()).format('DD/MM/YYYY 23:59:59'),
        fromRow: 0,
        pageSize: 10,
        data: {
          status: -1,
        },
        online: true,
      };

      if (searchParams && data.listTransactionRefund) {
        this.setState({
          data: data.listTransactionRefund.data,
          fromDate: new Date(moment(data.listTransactionRefund.fromDate, 'DD/MM/YYYY 00:00:00')),
          toDate: new Date(moment(data.listTransactionRefund.toDate, 'DD/MM/YYYY 00:00:00')),
          fromRow: data.listTransactionRefund.fromRow,
          pageSize: data.listTransactionRefund.pageSize,
        });
        getTransactionListRefund(newData);
      } else {
        getTransactionListRefund(sendData);
      }
    }, 0);
  }

  static getDerivedStateFromProps(props) {
    const {
      listMerchantCodeName,
      listMerchantBranch,
      listTerminalPlace,

    } = props;
    const updateListMerchantCodeName = [{ value: '', label: 'Tất cả' }];
    const updateListMerchantBranch = [{ value: '', label: 'Tất cả' }];
    const updatelistTerminalPlace = [{ value: '', label: 'Tất cả' }];
    if (listMerchantCodeName) {
      for (let i = 0; i < listMerchantCodeName.length; i += 1) {
        updateListMerchantCodeName.push(
          {
            merchantId: listMerchantCodeName[i].id,
            value: listMerchantCodeName[i].merchantCode,
            label: `${listMerchantCodeName[i].merchantCode} - ${listMerchantCodeName[i].merchantName}`,
            merchantName: listMerchantCodeName[i].merchantName,
            key: i,
          },
        );
      }
    }
    if (listMerchantBranch) {
      for (let i = 0; i < listMerchantBranch.length; i += 1) {
        updateListMerchantBranch.push(
          {
            branchId: listMerchantBranch[i].id,
            value: listMerchantBranch[i].id,
            merchantCode: listMerchantBranch[i].merchantCode,
            label: `${listMerchantBranch[i].merchantCode} - ${listMerchantBranch[i].terminalName}`,
          },
        );
      }
    }
    if (listTerminalPlace) {
      for (let i = 0; i < listTerminalPlace.length; i += 1) {
        updatelistTerminalPlace.push(
          {
            placeId: listTerminalPlace[i].id,
            value: listTerminalPlace[i].id,
            merchantCode: listTerminalPlace[i].merchantCode,
            label: `${listTerminalPlace[i].merchantCode} - ${listTerminalPlace[i].terminalName}`,
          },
        );
      }
    }
    return {
      listMerchantCodeName: updateListMerchantCodeName,
      listMerchantBranch: updateListMerchantBranch,
      listTerminalPlace: updatelistTerminalPlace,
    };
  }

  componentDidUpdate(prevProps) {
    const { exportReportFileTranRefund } = this.props;
    if (prevProps.exportReportFileTranRefund !== exportReportFileTranRefund) {
      window.open(exportReportFileTranRefund, 'blank');
    }
  }

  handleChangeFromDate = (startDate) => {
    this.setState({
      ...this.state,
      fromDate: startDate,
    }, () => {
      const { fromDate, toDate } = this.state;
      if (moment(fromDate).add(1, 'months').toDate() < moment(toDate).toDate()) {
        this.setState({
          // ...this.state,
          messageTime: 'Khoảng thời gian tìm kiếm chỉ trong vòng 1 tháng',
        });
      } else {
        this.setState({
          ...this.state,
          fromDate: startDate,
          messageTime: '',
        });
      }
    });
  }

  handleChangeToDate = (endDate) => {
    this.setState({
      ...this.state,
      toDate: endDate,
    }, () => {
      const { fromDate, toDate } = this.state;
      if (moment(toDate).subtract(1, 'months').toDate() > moment(fromDate).toDate()) {
        this.setState({
          messageTime: 'Khoảng thời gian tìm kiếm chỉ trong vòng 1 tháng',
        });
      } else {
        this.setState({
          ...this.state,
          toDate: endDate,
          messageTime: '',
        });
      }
    });
  }

  selectMasterMerchant = (e) => {
    if (e.value === '00') {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          masterMcCode: '',
        },
      });
    } else {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          masterMcCode: e,
        },
      });
    }
  }

  selectCodeName = (e) => {
    const { getMerchantBranch } = this.props;
    if (e.value === '00') {
      this.setState({
        ...this.state,
        isDisabledMerchantBranch: e.value === '',
        isDisabledTerminalId: true,
        data: {
          ...this.state.data,
          merchantCode: '',
          terminalIdBrand: '',
          terminalId: '',
        },
      });
    } else {
      this.setState({
        ...this.state,
        isDisabledMerchantBranch: e.value === '',
        isDisabledTerminalId: true,
        data: {
          ...this.state.data,
          merchantCode: e,
          terminalIdBrand: '',
          terminalId: '',
        },
      }, () => getMerchantBranch({ merchantCode: e.value, status: '1', terminalBranchId: '' }));
    }
  }

  selectMerchantBranch = (e) => {
    const { getTerminalPlace } = this.props;
    if (e.value === '00') {
      this.setState({
        isDisabledTerminalId: e.value === '',
        data: {
          terminalIdBrand: '',
          terminalId: '',
        },
      });
    } else {
      this.setState({
        ...this.state,
        isDisabledTerminalId: e.value === '',
        data: {
          ...this.state.data,
          terminalIdBrand: e,
          terminalId: '',
        },
      }, () => getTerminalPlace({ merchantCode: e.merchantCode, status: '1', terminalBranchId: e.branchId }));
    }
  };

  selectTerminalPlace = (e) => {
    if (e.value === '00') {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          terminalId: '',
        },
      });
    } else {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          terminalId: e,
        },
      });
    }
  };

  selectPaymentType = (e) => {
    if (e.value === '00') {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          serviceCode: '',
        },
      });
    } else {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          serviceCode: e,
        },
      });
    }
  }

  selectRefundType = (e) => {
    if (e.value === '00') {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          typeRefund: '',
        },
      });
    } else {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          typeRefund: e,
        },
      });
    }
  }

  selectStatus = (e) => {
    if (e.value === '00') {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          status: '',
        },
      });
    } else {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          status: e,
        },
      });
    }
  }

  onChangePhoneNumber = (e) => {
    if (e.value === '00') {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          mobile: '',
        },
      });
    } else {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          mobile: e.target.value,
        },
      });
    }
  }

  onChangeTransactionCode = (e) => {
    if (e.value === '00') {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          qrTrace: '',
        },
      });
    } else {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          qrTrace: e.target.value,
        },
      });
    }
  }

  onChangeBillNumber = (e) => {
    if (e.value === '00') {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          billNumber: '',
        },
      });
    } else {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          billNumber: e.target.value,
        },
      });
    }
  }

  onChangeOrderCode = (e) => {
    if (e.value === '00') {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          payCode: '',
        },
      });
    } else {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          payCode: e.target.value,
        },
      });
    }
  }

  onChangePaymentCode = (e) => {
    if (e.value === '00') {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          orderCode: '',
        },
      });
    } else {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          orderCode: e.target.value,
        },
      });
    }
  }

  getListSelectBox = () => {
    const listMerchantStatus = JSON.parse(localStorage && localStorage.getItem('REFUND'));
    const listRefundType = JSON.parse(localStorage && localStorage.getItem('REFUNDTYPE'));

    const updateListMerchantStatus = [{ value: '', label: 'Tất cả' }];
    if (listMerchantStatus) {
      for (let i = 0; i < listMerchantStatus.length; i += 1) {
        updateListMerchantStatus.push({
          value: listMerchantStatus[i].code,
          label: `${listMerchantStatus[i].description}`,
        });
      }
    }

    const updateListRefundType = [{ value: '', label: 'Tất cả' }];
    if (listRefundType) {
      for (let i = 0; i < listRefundType.length; i += 1) {
        updateListRefundType.push({
          value: listRefundType[i].code,
          label: `${listRefundType[i].description}`,
        });
      }
    }

    this.setState({
      listMerchantStatus: updateListMerchantStatus,
      listRefundType: updateListRefundType,
    });
  }

  onHandleSearch = (e) => {
    e.preventDefault();
    const {
      getTransactionListRefund,
    } = this.props;
    const { checked } = this.state;
    const {
      fromDate,
      fromRow,
      toDate,
      pageSize,
      data,
    } = this.state;
    const isInvalidNumberPhone = data.mobile ? data.mobile !== '' ? !formatPhoneNumber(data.mobile) : false : false;
    if (fromDate.getTime() > toDate.getTime()) {
      this.setState({
        errorTime: 'Khoảng thời gian tìm kiếm không hợp lệ',
      });
    } else if (moment(fromDate).add(1, 'months').toDate() < moment(toDate).toDate() || moment(toDate).subtract(1, 'months').toDate() > moment(fromDate).toDate()) {
      this.setState({
        messageTime: 'Khoảng thời gian chỉ trong 1 tháng',
      });
    }
    
    this.setState({
      errorPhone: isInvalidNumberPhone ? 'Số điện thoại không đúng định dạng' : '',
    });

    const newData = { ...data };
    if (newData.typeRefund) { newData.typeRefund = newData.typeRefund.value || ''; }
    if (newData.merchantCode) { newData.merchantCode = newData.merchantCode.value || ''; }
    if (newData.serviceCode) {
      newData.serviceCode = newData.serviceCode.value !== '' ? `0${newData.serviceCode.value}` : '' || '';
    }
    if (newData.status) { newData.status = newData.status.value || ''; }
    if (newData.terminalId) { newData.terminalId = newData.terminalId.value || ''; }
    if (newData.terminalIdBrand) { newData.terminalIdBrand = newData.terminalIdBrand.value || ''; }

    const dataSearch = {
      fromDate: moment(fromDate).format('DD/MM/YYYY 00:00:00'),
      toDate: moment(toDate).format('DD/MM/YYYY 23:59:59'),
      fromRow,
      pageSize,
      data: newData,
      online: checked,
    };
    const storedData = {
      fromDate: moment(fromDate).format('DD/MM/YYYY 00:00:00'),
      toDate: moment(toDate).format('DD/MM/YYYY 23:59:59'),
      fromRow: 0,
      pageSize: 10,
      data,
    };

    sessionStorage.setItem('searchParams', JSON.stringify({
      listTransactionRefund: storedData,
    }));
    this.props.changeSearch();
    getTransactionListRefund(dataSearch);
  };

  exportFile = () => {
    const {
      getExcelFileReportTranRefund,
    } = this.props;
    const {
      fromDate,
      toDate,
      fromRow,
      data,
      online,
    } = this.state;
    if (fromDate.getTime() > toDate.getTime()) {
      this.setState({
        errorTime: 'Khoảng thời gian xuất excel không hợp lệ',
      });
    } else {
      this.setState({
        errorTime: '',
      });
    }
    const dataExport = {
      fromDate: moment(fromDate).format('DD/MM/YYYY 00:00:00'),
      toDate: moment(toDate).format('DD/MM/YYYY 23:59:59'),
      fromRow,
      pageSize: 0,
      data: {
        ...data,
        typeRefund: data.typeRefund ? data.typeRefund.value : '',
        merchantCode: data.merchantCode ? (data.merchantCode.value || '') : '',
        serviceCode: data.serviceCode ? data.serviceCode.value !== '' ? `0${data.serviceCode.value}` : '' : '',
        status: data.status === -1 ? data.status : (data.status.value || -1),
        terminalId: data.terminalId ? (data.terminalId.value || '') : '',
        terminalIdBrand: data.terminalIdBrand ? (data.terminalIdBrand.value || '') : '',
      },
      online,
    };
    getExcelFileReportTranRefund(dataExport);
  }

  onInputChangeMerchant = (value) => {
    const { getMerchantCodeName } = this.props;
    if (value && value.length > 2) {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        getMerchantCodeName({
          status: '0',
          paternSearch: value,
        });
      }, 500);
    }
  };


  render() {
    const {
      listMerchantCodeName, listMerchantBranch, listTerminalPlace,
      errorTime, fromDate, toDate, listMerchantStatus, listRefundType, messageTime, data,
      isDisabledMerchantBranch, isDisabledTerminalId, errorPhone
    } = this.state;
    const { listQrChannel } = this.props;

    return (
      <Form>
        <Row>
          <Col md="4">
            <FormGroup row>
              <Col lg="6" className="label-left">
                <Label>{Constants.Transaction.transactionCode}</Label>
              </Col>
              <Col lg="6">
                <Input value={data.qrTrace} className="form-control" onChange={this.onChangeTransactionCode} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col lg="6" className="label-left">
                <Label>{Constants.StatisticalReport.billNumber}</Label>
              </Col>
              <Col lg="6">
                <Input value={data.billNumber} className="form-control" onChange={this.onChangeBillNumber} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col lg="6" className="label-left">
                <Label>{Constants.Transaction.orderCode}</Label>
              </Col>
              <Col lg="6">
                <Input value={data.payCode} className="form-control" onChange={this.onChangeOrderCode} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col lg="6" className="label-left">
                <Label>{Constants.Transaction.paymentCode}</Label>
              </Col>
              <Col lg="6">
                <Input value={data.orderCode} className="form-control" onChange={this.onChangePaymentCode} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col lg="6" className="label-left">
                <Label>
                  {Constants.StatisticalReport.paymentType}
                </Label>
              </Col>
              <Col lg="6">
                <Select
                  value={data.serviceCode}
                  onChange={this.selectPaymentType}
                  options={listQrChannel}
                  placeholder="Tất cả"
                />
              </Col>
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup row>
              <Col lg="6" className="label-left">
                <Label>
                  {Constants.Transaction.refundType}
                </Label>
              </Col>
              <Col lg="6">
                <Select
                  value={data.typeRefund}
                  onChange={this.selectRefundType}
                  options={listRefundType}
                  placeholder="Tất cả"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col lg="6" className="label-left">
                <Label>
                  {Constants.MnMerchant.merchantName}
                </Label>
              </Col>
              <Col lg="6">
                <Select
                  value={data.merchantCode}
                  onChange={this.selectCodeName}
                  onInputChange={this.onInputChangeMerchant}
                  options={listMerchantCodeName}
                  placeholder="Tất cả"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col lg="6" className="label-left">
                <Label>
                  {Constants.MnMerchant.mcBranch}
                </Label>
              </Col>
              <Col lg="6">
                <Select
                  isDisabled={isDisabledMerchantBranch}
                  value={data.terminalIdBrand}
                  onChange={this.selectMerchantBranch}
                  options={listMerchantBranch}
                  placeholder="Tất cả"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col lg="6" className="label-left">
                <Label>
                  {Constants.MnMerchant.terminalPlace}
                </Label>
              </Col>
              <Col lg="6">
                <Select
                  isDisabled={isDisabledTerminalId}
                  value={data.terminalId}
                  onChange={this.selectTerminalPlace}
                  options={listTerminalPlace}
                  placeholder="Tất cả"
                />
              </Col>
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup row>
              <Col lg="6" className="label-left">
                <Label>{Constants.MnMerchant.phoneNumber}</Label>
              </Col>
              <Col lg="6">
                <Input value={data.mobile} className="form-control" onChange={this.onChangePhoneNumber} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col lg="6" className="label-left">
                <Label htmlFor="code">{Constants.MerchantDetail.status}</Label>
              </Col>
              <Col lg="6">
                <Select
                  value={data.status}
                  onChange={this.selectStatus}
                  options={listMerchantStatus}
                  placeholder="Tất cả"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col lg="6" className="label-left">
                <Label>{Constants.MerchantList.applyDate}</Label>
              </Col>
              <Col lg="6">
                <DatePicker
                  selected={fromDate}
                  onChange={this.handleChangeFromDate}
                  className="form-control"
                  dateFormat="dd/MM/yyyy  00:00:00"
                  maxDate={moment(new Date()).subtract(0, 'days').toDate()}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col lg="6" className="label-left">
                <Label>{Constants.MerchantList.expireDate}</Label>
              </Col>
              <Col lg="6">
                <DatePicker
                  selected={toDate}
                  onChange={this.handleChangeToDate}
                  className="form-control"
                  dateFormat="dd/MM/yyyy  23:59:59"
                  maxDate={moment(new Date()).subtract(0, 'days').toDate()}
                />
              </Col>
            </FormGroup>
          </Col>
          <Col md="6" className="mb-3 mt-3">
            <FormGroup row>
              <Col className="text-right btn-search">
                <Button
                  type="submit"
                  className="icon-search btn btn-primary"
                  onClick={this.onHandleSearch}
                >
                  <i className="icon-magnifier" />
                  {' '}
                  Tìm kiếm
                </Button>
              </Col>
            </FormGroup>
          </Col>
          <Col md="6" className="mb-3 mt-3">
            <FormGroup row>
              <Col className="text-left btn-search">
                <Button className="button-excel" onClick={this.exportFile}>
                  <i className="fa fa-file-excel-o mr-1" />
                  Xuất excel
                </Button>
              </Col>
            </FormGroup>
          </Col>
        </Row>
        <div className="text-center">
          <div className="mb-2 text-center"><span className="text-danger">{errorTime}</span></div>
        </div>
        <div className="text-center">
          <div className="text-center mb-2"><span className="text-danger">{messageTime}</span></div>
        </div>
        <div className="text-center">
          <div className="text-center mb-2"><span className="text-danger">{errorPhone}</span></div>
        </div>
      </Form>
    );
  }
}
const mapStateToProps = (state) => ({
  listMerchantCodeName: state.masterMerchant.listMerchantCodeName,
  exportReportFileTranRefund: state.Transaction.exportReportFileTranRefund,
  listMerchantBranch: state.terminal.listMerchantBranch,
  listTerminalPlace: state.terminal.listTerminalPlace,
});

const mapDispatchToProps = (dispatch) => ({
  getTransactionListRefund: (data) => dispatch(getTransactionListRefund(data)),
  getMerchantCodeName: (data) => dispatch(getMerchantCodeName(data)),
  getExcelFileReportTranRefund: (data) => dispatch(getExcelFileReportTranRefund(data)),
  getMerchantBranch: (data) => dispatch(getMerchantBranch(data)),
  getTerminalPlace: (data) => dispatch(getTerminalPlace(data)),
});

FillTransaction.defaultProps = {
  getTransactionListRefund: () => {},
  getMerchantCodeName: () => {},
  listMerchantCodeName: [],
  getExcelFileReportTranRefund: () => {},
  exportReportFileTranRefund: {},
  getMerchantBranch: () => {},
  listMerchantBranch: {},
  listTerminalPlace: [],
  getTerminalPlace: () => {},
};

FillTransaction.propTypes = {
  getTransactionListRefund: PropTypes.func,
  getMerchantCodeName: PropTypes.func,
  listMerchantCodeName: PropTypes.array,
  getExcelFileReportTranRefund: PropTypes.func,
  exportReportFileTranRefund: PropTypes.object,
  getMerchantBranch: PropTypes.func,
  listMerchantBranch: PropTypes.object,
  listTerminalPlace: PropTypes.array,
  getTerminalPlace: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FillTransaction));
