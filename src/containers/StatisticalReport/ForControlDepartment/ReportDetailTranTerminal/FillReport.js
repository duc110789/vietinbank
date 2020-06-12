import React, {Component} from 'react';
import {withRouter,} from 'react-router-dom';
import Select from 'react-select';
import {Button, Col, FormGroup, Label, Row,} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import Constants from '../../Constants';
import {
  getDetailTransactionTerminal,
  getExcelFileReportTermianl,
} from '../../../../store/actions/StatisticalReport/index';
import {getMerchantCodeName,} from '../../../../store/actions/masterMerchant/masterMerchant';
import {getMerchantBranch, getTerminalPlace,} from '../../../../store/actions/terminal/terminal';

const listMasterMerchant = [
  { value: '970489', label: 'VIETINBANK' },
];
class FillReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromDate: moment().subtract(3, 'days').toDate(),
      toDate: new Date(),
      fromRow: 0,
      pageSize: 10,
      data: {
      },
      errorTime: '',
    };
  }

  componentDidMount() {
    const {
      getDetailTransactionTerminal, getMerchantCodeName,
    } = this.props;
    const sendData = {
      fromDate: moment().subtract(3, 'days').format('DD/MM/YYYY 00:00:00'),
      toDate: moment(new Date()).format('DD/MM/YYYY 23:59:59'),
      fromRow: 0,
      pageSize: 10,
      data: {
      },
    };
    getMerchantCodeName({
      status: '0',
    });
    this.getListSelectBox();
    getDetailTransactionTerminal(sendData);
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
    const { exportReportFileTerminal } = this.props;
    if (prevProps.exportReportFileTerminal !== exportReportFileTerminal) {
      window.open(exportReportFileTerminal, 'blank');
    }
  }

  handleChangeFromDate = (startDate) => {
    this.setState({
      ...this.state,
      fromDate: startDate,
    });
    if (startDate) {
      this.setState({
        ...this.state,
        fromDate: startDate,
      });
    }
  }

  handleChangeToDate = (endDate) => {
    this.setState({
      ...this.state,
      toDate: endDate,
    });
    if (endDate) {
      this.setState({
        ...this.state,
        toDate: endDate,
      });
    }
  }

  selectCodeName = (e) => {
    const { getMerchantBranch } = this.props;
    if (e.value === '00') {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          merchantCode: '',
        },
      });
    } else {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          merchantCode: e.value,
        },
      }, () => getMerchantBranch({ merchantCode: e.value, status: '1', terminalBranchId: '' }));
    }
  }

  selectMerchantBranch = (e) => {
    const { getTerminalPlace } = this.props;
    if (e.value === '00') {
      this.setState({
        data: {
          terminalIdBrand: '',
        },
      });
    } else {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          terminalIdBrand: `${e.branchId}`,
        },
      }, () => getTerminalPlace({ merchantCode: e.value, status: '1', terminalBranchId: e.branchId }));
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
          terminalId: e.placeId,
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
          payType: '',
        },
      });
    } else {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          payType: (e.value !== '') ? `${0 + e.value}` : '',
        },
      });
    }
  }

  getListSelectBox = () => {
    const listQrChannel = JSON.parse(localStorage && localStorage.getItem('QR_CHANNEL'));

    const updateListQrChannel = [{ value: '', label: 'Tất cả' }];
    if (listQrChannel) {
      for (let i = 0; i < listQrChannel.length; i += 1) {
        updateListQrChannel.push({
          value: listQrChannel[i].code,
          label: `${listQrChannel[i].description}`,
        });
      }
    }

    this.setState({
      listQrChannel: updateListQrChannel,
    });
  }

  onHandleSearch = () => {
    const {
      getDetailTransactionTerminal,
    } = this.props;
    const {
      fromDate,
      fromRow,
      toDate,
      pageSize,
      data,
    } = this.state;
    if (fromDate.getTime() > toDate.getTime()) {
      this.setState({
        errorTime: 'Khoảng thời gian tìm kiếm không hợp lệ',
      });
    } else {
      this.setState({
        errorTime: '',
      });
    }
    const dataSearch = {
      fromDate: moment(fromDate).format('DD/MM/YYYY 00:00:00'),
      toDate: moment(toDate).format('DD/MM/YYYY 23:59:59'),
      fromRow,
      pageSize,
      data,
    };
    getDetailTransactionTerminal(dataSearch);
  };

  exportFile = () => {
    const {
      getExcelFileReportTermianl,
    } = this.props;
    const {
      fromDate,
      toDate,
      fromRow,
      data,
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
      data,
    };
    getExcelFileReportTermianl(dataExport);
  }

  render() {
    const {
      listMerchantCodeName, listMerchantBranch, listTerminalPlace, listQrChannel, errorTime,
    } = this.state;
    const { fromDate, toDate } = this.state;

    return (
      <Row>
        <Col md="6">
          <FormGroup row>
            <Col lg="6" className="label-left">
              <Label>
                {Constants.MnMerchant.masterMerchant}
              </Label>
            </Col>
            <Col lg="6">
              <Select
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
                onChange={this.selectCodeName}
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
                onChange={this.selectTerminalPlace}
                options={listTerminalPlace}
                placeholder="Tất cả"
              />
            </Col>
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup row>
            <Col lg="6" className="label-left">
              <Label>
                {Constants.StatisticalReport.paymentType}
              </Label>
            </Col>
            <Col lg="6">
              <Select
                onChange={this.selectPaymentType}
                options={listQrChannel}
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
                dateFormat="dd/MM/yyyy    00:00:00"
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
              />
            </Col>
          </FormGroup>
        </Col>
        <Col md="6" className="mb-3 mt-3">
          <FormGroup row>
            <Col className="text-right btn-search">
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
        <Col className="text-center">
          <div className="mb-2"><span className="text-danger">{errorTime}</span></div>
        </Col>
      </Row>
    );
  }
}
const mapStateToProps = (state) => ({
  listMerchantCodeName: state.masterMerchant.listMerchantCodeName,
  exportReportFileTerminal: state.statisticalReport.exportReportFileTerminal,
  listMerchantBranch: state.terminal.listMerchantBranch,
  listTerminalPlace: state.terminal.listTerminalPlace,
});

const mapDispatchToProps = (dispatch) => ({
  getDetailTransactionTerminal: (data) => dispatch(getDetailTransactionTerminal(data)),
  getMerchantCodeName: (data) => dispatch(getMerchantCodeName(data)),
  getExcelFileReportTermianl: (data) => dispatch(getExcelFileReportTermianl(data)),
  getMerchantBranch: (data) => dispatch(getMerchantBranch(data)),
  getTerminalPlace: (data) => dispatch(getTerminalPlace(data)),
});

FillReport.defaultProps = {
  getDetailTransactionTerminal: () => {},
  getMerchantCodeName: () => {},
  listMerchantCodeName: [],
  getExcelFileReportTermianl: () => {},
  exportReportFileTerminal: {},
  getMerchantBranch: () => {},
  listMerchantBranch: {},
  listTerminalPlace: [],
  getTerminalPlace: () => {},
};

FillReport.propTypes = {
  getDetailTransactionTerminal: PropTypes.func,
  getMerchantCodeName: PropTypes.func,
  listMerchantCodeName: PropTypes.array,
  getExcelFileReportTermianl: PropTypes.func,
  exportReportFileTerminal: PropTypes.object,
  getMerchantBranch: PropTypes.func,
  listMerchantBranch: PropTypes.object,
  listTerminalPlace: PropTypes.array,
  getTerminalPlace: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FillReport));
