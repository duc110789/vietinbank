import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import Switch from 'react-switch';
import {
  Button, Col, FormGroup, Label, Row,
} from 'reactstrap';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import Constants from '../Constants';
import { getExcelFileReportTran, getTransactionList } from '../../../store/actions/ManagementTransaction/index';
import { getMerchantCodeName } from '../../../store/actions/masterMerchant/masterMerchant';
import { getMerchantBranch, getTerminalPlace } from '../../../store/actions/terminal/terminal';
import {formatPhoneNumber} from '../../../utils/validation';

const listMasterMerchant = [
  { value: '', label: 'Tất cả' },
  { value: '970489', label: 'VIETINBANK' },
  { value: 'OTHER', label: 'VNPAY' },
];

const listbankCode = [
  { value: '', label: 'Tất cả' },
  { value: '970489', label: 'VIETINBANK' },
  { value: 'OTHER', label: 'VNPAY' },
];

class FillTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromDate: new Date(),
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
      errorPhone: '',
      isDisabledMerchantName: true,
      isDisabledMerchantBranch: true,
      isDisabledTerminalId: true,
    };
    this.timeout = 0;
  }

  componentDidMount() {
    const {
      getTransactionList,
    } = this.props;
    this.getListSelectBox();
    setTimeout(() => {
      const searchParams = sessionStorage.getItem('searchParams');
      const data = JSON.parse(searchParams);
      let newData = {};
      if (searchParams && data.listTransaction) {
        newData = {
          data: {
            ...data.listTransaction.data,
            bankCode: data.listTransaction.data.bankCode ? data.listTransaction.data.bankCode.value : '',
            masterMcCode: data.listTransaction.data.masterMcCode ? (data.listTransaction.data.masterMcCode.value || '') : '',
            merchantCode: data.listTransaction.data.merchantCode ? (data.listTransaction.data.merchantCode.value || '') : '',
            serviceCode: data.listTransaction.data.serviceCode ? data.listTransaction.data.serviceCode.value !== '' ? `0${data.listTransaction.data.serviceCode.value}` : '' : '',
            status: data.listTransaction.data.status ? (data.listTransaction.data.status.value || -1) : -1,
            terminalId: data.listTransaction.data.terminalId ? (data.listTransaction.data.terminalId.value || '') : '',
            terminalIdBrand: data.listTransaction.data.terminalIdBrand ? (data.listTransaction.data.terminalIdBrand.value || '') : '',
          },
          online: data.listTransaction.online,
          fromRow: data.listTransaction.fromRow,
          pageSize: data.listTransaction.pageSize,
          fromDate: data.listTransaction.fromDate,
          toDate: data.listTransaction.toDate,
        };
      }

      const sendData = {
        fromDate: moment().subtract(0, 'days').format('DD/MM/YYYY 00:00:00'),
        toDate: moment(new Date()).format('DD/MM/YYYY 23:59:59'),
        fromRow: 0,
        pageSize: 10,
        data: {
          status: -1,
        },
        online: true,
      };

      if (searchParams && data.listTransaction) {
        this.setState({
          data: data.listTransaction.data,
          fromDate: new Date(moment(data.listTransaction.fromDate, 'DD/MM/YYYY 00:00:00')),
          toDate: new Date(moment(data.listTransaction.toDate, 'DD/MM/YYYY 00:00:00')),
          fromRow: data.listTransaction.fromRow,
          pageSize: data.listTransaction.pageSize,
          checked: data.listTransaction.online,
        });
        getTransactionList(newData);
      } else {
        getTransactionList(sendData);
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
    const { exportReportFileTran } = this.props;
    if (prevProps.exportReportFileTran !== exportReportFileTran) {
      window.open(exportReportFileTran, 'blank');
    }
  }

  handleChangeFromDate = (startDate) => {
    const { checked } = this.state;
    this.setState({
      ...this.state,
      fromDate: startDate,
    }, () => {
      const { fromDate, toDate } = this.state;
      if (moment(fromDate).startOf('day').add(1, 'days').toDate() < moment(toDate).endOf('day').toDate()) {
        if (checked) {
          this.setState({
            messageTime: 'Khoảng thời gian tìm kiếm chỉ trong vòng 1 ngày',
          });
        }
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
    const { checked } = this.state;
    this.setState({
      ...this.state,
      toDate: endDate,
    }, () => {
      const { fromDate, toDate } = this.state;
      if (moment(toDate).endOf('day').subtract(1, 'days').toDate() > moment(fromDate).startOf('day').toDate()) {
        if (!checked) {
          this.setState({
            messageTime: 'Khoảng thời gian tìm kiếm chỉ trong vòng 1 ngày',
          });
        }
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
        isDisabledMerchantName: e.value !== '970489',
        isDisabledMerchantBranch: true,
        isDisabledTerminalId: true,
        data: {
          ...this.state.data,
          masterMcCode: '',
          merchantCode: '',
          terminalIdBrand: '',
          terminalId: '',
        },
      });
    } else {
      this.setState({
        ...this.state,
        isDisabledMerchantName: e.value !== '970489',
        isDisabledMerchantBranch: true,
        isDisabledTerminalId: true,
        data: {
          ...this.state.data,
          masterMcCode: e,
          merchantCode: '',
          terminalIdBrand: '',
          terminalId: '',
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

  selectBankCode = (e) => {
    if (e.value === '00') {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          bankCode: '',
        },
      });
    } else {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          bankCode: e,
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

  onChangecardAccountNumber = (e) => {
    if (e.value === '00') {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          accountNo: '',
        },
      });
    } else {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          accountNo: e.target.value,
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

  getListSelectBox = () => {
    const listMerchantStatus = JSON.parse(localStorage && localStorage.getItem('TRANSACTION'));

    const updateListMerchantStatus = [{ value: '', label: 'Tất cả' }];
    if (listMerchantStatus) {
      for (let i = 0; i < listMerchantStatus.length; i += 1) {
        updateListMerchantStatus.push({
          value: listMerchantStatus[i].code,
          label: `${listMerchantStatus[i].description}`,
        });
      }
    }

    this.setState({
      listMerchantStatus: updateListMerchantStatus,
    });
  }

  onHandleSearch = (e) => {
    e.preventDefault();
    const {
      getTransactionList,
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
    } else {
      this.setState({
        errorTime: '',
      });
    }

    let isInvalidDate;

    if (moment(fromDate).startOf('day').add(1, 'days').toDate() < moment(toDate).endOf('day').toDate()
      || moment(toDate).endOf('day').subtract(1, 'days').toDate() > moment(fromDate).startOf('day').toDate()) {
      if (checked) {
        this.setState({
          messageTime: 'Khoảng thời gian tìm kiếm chỉ trong vòng 1 ngày',
        });
        isInvalidDate = true;
      }
    } else {
      this.setState({
        messageTime: '',
      });
      isInvalidDate = false;
    }
   
    this.setState({
      errorPhone: isInvalidNumberPhone ? 'Số điện thoại không đúng định dạng' : '',
    });

    const newData = { ...data };
    if (newData.bankCode) { newData.bankCode = newData.bankCode.value || ''; }
    if (newData.masterMcCode) { newData.masterMcCode = newData.masterMcCode.value || ''; }
    if (newData.merchantCode) { newData.merchantCode = newData.merchantCode.value || ''; }
    if (newData.serviceCode) {
      newData.serviceCode = newData.serviceCode.value !== '' ? `0${newData.serviceCode.value}` : '' || '';
    }
    if (newData.status) { newData.status = newData.status.value || -1; }
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
      online: checked,
    };

    if (!isInvalidDate) {
      sessionStorage.setItem('searchParams', JSON.stringify({
        listTransaction: storedData,
      }));
    }
    this.props.changeSearch();
    getTransactionList(dataSearch);
  };

  exportFile = () => {
    const {
      getExcelFileReportTran,
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
      const dataExport = {
        fromDate: moment(fromDate).format('DD/MM/YYYY 00:00:00'),
        toDate: moment(toDate).format('DD/MM/YYYY 23:59:59'),
        fromRow,
        pageSize: 0,
        data: {
          ...data,
          bankCode: data.bankCode ? data.bankCode.value : '',
          masterMcCode: data.masterMcCode ? (data.masterMcCode.value || '') : '',
          merchantCode: data.merchantCode ? (data.merchantCode.value || '') : '',
          serviceCode: data.serviceCode ? data.serviceCode.value !== '' ? `0${data.serviceCode.value}` : '' : '',
          status: data.status === -1 ? data.status : (data.status.value || -1),
          terminalId: data.terminalId ? (data.terminalId.value || '') : '',
          terminalIdBrand: data.terminalIdBrand ? (data.terminalIdBrand.value || '') : '',
        },
        online,
      };
      getExcelFileReportTran(dataExport);
      this.setState({
        errorTime: '',
      });
    }
  }

  handleChangeOnOff = (checked) => {
    this.setState({
      checked,
      online: true,
    });
    if (checked === false) {
      this.setState({
        ...this.state,
        fromDate: moment(new Date()).subtract(1, 'days').toDate(),
        toDate: moment(new Date()).subtract(1, 'days').toDate(),
        checked,
        messageTime: '',
      });
    } else {
      this.setState({
        ...this.state,
        fromDate: new Date(),
        toDate: new Date(),
        checked,
      });
    }
  }

  render() {
    const {
      listMerchantCodeName, listMerchantBranch, listTerminalPlace,
      errorTime, fromDate, toDate, listMerchantStatus, checked, messageTime,
      data, errorPhone, isDisabledMerchantName, isDisabledMerchantBranch,
      isDisabledTerminalId,
    } = this.state;
    const { listQrChannel } = this.props;

    return (
      <Form>
        <Row>
          <Col md="4">
            <FormGroup row>
              <Col lg="6" className="label-left">
                <Label>
                  {Constants.MnMerchant.masterMerchant}
                </Label>
              </Col>
              <Col lg="6">
                <Select
                  value={data.masterMcCode}
                  onChange={this.selectMasterMerchant}
                  options={listMasterMerchant}
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
                  isDisabled={isDisabledMerchantName}
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
            <FormGroup row>
              <Col lg="6" className="label-left">
                <Label>
                  {Constants.StatisticalReport.paymentUnit}
                </Label>
              </Col>
              <Col lg="6">
                <Select
                  value={data.bankCode}
                  onChange={this.selectBankCode}
                  options={listbankCode}
                  placeholder="Tất cả"
                />
              </Col>
            </FormGroup>
          </Col>
          <Col md="4">
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
                <Label>{Constants.Transaction.cardAccountNumber}</Label>
              </Col>
              <Col lg="6">
                <Input value={data.accountNo} className="form-control" onChange={this.onChangecardAccountNumber} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col lg="6" className="label-left">
                <Label>{Constants.Transaction.transactionCode}</Label>
              </Col>
              <Col lg="6">
                <Input value={data.qrTrace} className="form-control" onChange={this.onChangeTransactionCode} />
              </Col>
            </FormGroup>
          </Col>
          <Col md="4">
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
            {checked === true ? (
              <div>
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
              </div>
            ) : (
              <div>
                <FormGroup row>
                  <Col lg="6" className="label-left">
                    <Label>{Constants.MerchantList.applyDate}</Label>
                  </Col>
                  <Col lg="6">
                    <DatePicker
                      selected={fromDate}
                      onChange={this.handleChangeFromDate}
                      className="form-control"
                      dateFormat="dd/MM/yyyy    00:00:00"
                      maxDate={moment(new Date()).subtract(1, 'days').toDate()}
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
                      dateFormat="dd/MM/yyyy    23:59:59"
                      maxDate={moment(new Date()).subtract(1, 'days').toDate()}
                    />
                  </Col>
                </FormGroup>
              </div>
            )}
            <FormGroup row>
              <Col lg="6" className="label-left">
                <Label>{Constants.QRCode.data}</Label>
              </Col>
              <Col lg="6" className="text-right">
                <Switch
                  checked={checked}
                  onChange={this.handleChangeOnOff}
                  width={90}
                  onColor="#1ba94c"
                  checkedIcon={(<div className="switch-on">ONLINE</div>)}
                  uncheckedIcon={(<div className="switch-off">OFFLINE</div>)}
                />
              </Col>
            </FormGroup>
          </Col>
          {checked && (
            <Col md="12" className="text-center text-danger">
              Chỉ hỗ trợ tìm kiếm giao dịch online trong khoảng thời gian 1 ngày kể từ ngày hiện tại
            </Col>
          )}
          {checked === true ? (
            <>
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
            </>
          ) : (
            <>
              <Col md="12" className="mb-3 mt-3">
                <FormGroup row>
                  <Col className="text-center btn-search">
                    <Button
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
            </>
          )}
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
  exportReportFileTran: state.Transaction.exportReportFileTran,
  listMerchantBranch: state.terminal.listMerchantBranch,
  listTerminalPlace: state.terminal.listTerminalPlace,
});

const mapDispatchToProps = (dispatch) => ({
  getTransactionList: (data) => dispatch(getTransactionList(data)),
  getMerchantCodeName: (data) => dispatch(getMerchantCodeName(data)),
  getExcelFileReportTran: (data) => dispatch(getExcelFileReportTran(data)),
  getMerchantBranch: (data) => dispatch(getMerchantBranch(data)),
  getTerminalPlace: (data) => dispatch(getTerminalPlace(data)),
});

FillTransaction.defaultProps = {
  getTransactionList: () => {},
  getMerchantCodeName: () => {},
  listMerchantCodeName: [],
  getExcelFileReportTran: () => {},
  exportReportFileTran: {},
  getMerchantBranch: () => {},
  listMerchantBranch: {},
  listTerminalPlace: [],
  getTerminalPlace: () => {},
  listQrChannel: [],
};

FillTransaction.propTypes = {
  getTransactionList: PropTypes.func,
  getMerchantCodeName: PropTypes.func,
  listMerchantCodeName: PropTypes.array,
  getExcelFileReportTran: PropTypes.func,
  exportReportFileTran: PropTypes.object,
  getMerchantBranch: PropTypes.func,
  listMerchantBranch: PropTypes.object,
  listTerminalPlace: PropTypes.array,
  getTerminalPlace: PropTypes.func,
  listQrChannel: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FillTransaction));
