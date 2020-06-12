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
  getDetailTransactionMerchantBranch,
  getExcelFileReportMerchantBranch,
} from '../../../../store/actions/StatisticalReport/index';
import {getMerchantCodeName,} from '../../../../store/actions/masterMerchant/masterMerchant';
import {getMerchantBranch,} from '../../../../store/actions/terminal/terminal';

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
      getDetailTransactionMerchantBranch, getMerchantCodeName,
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
    getDetailTransactionMerchantBranch(sendData);
  }

  static getDerivedStateFromProps(props) {
    const {
      listMerchantCodeName,
      listMerchantBranch,
    } = props;
    const updateListMerchantCodeName = [{ value: '', label: 'Tất cả' }];
    const updateListMerchantBranch = [{ value: '', label: 'Tất cả' }];
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
    return {
      listMerchantCodeName: updateListMerchantCodeName,
      listMerchantBranch: updateListMerchantBranch,
    };
  }

  componentDidUpdate(prevProps) {
    const { exportReportFileMerchantBranch } = this.props;
    if (prevProps.exportReportFileMerchantBranch !== exportReportFileMerchantBranch) {
      window.open(exportReportFileMerchantBranch, 'blank');
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
      getDetailTransactionMerchantBranch,
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
    getDetailTransactionMerchantBranch(dataSearch);
  };

  exportFile = () => {
    const {
      getExcelFileReportMerchantBranch,
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
      const dataExport = {
        fromDate: moment(fromDate).format('DD/MM/YYYY 00:00:00'),
        toDate: moment(toDate).format('DD/MM/YYYY 23:59:59'),
        fromRow,
        pageSize: 0,
        data,
      };
      this.setState({
        errorTime: '',
      });
      getExcelFileReportMerchantBranch(dataExport);
    }
  }

  render() {
    const {
      listMerchantCodeName, listMerchantBranch, listQrChannel, errorTime,
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
  exportReportFileMerchantBranch: state.statisticalReport.exportReportFileMerchantBranch,
  listMerchantBranch: state.terminal.listMerchantBranch,
});

const mapDispatchToProps = (dispatch) => ({
  getDetailTransactionMerchantBranch: (data) => dispatch(getDetailTransactionMerchantBranch(data)),
  getMerchantCodeName: (data) => dispatch(getMerchantCodeName(data)),
  getExcelFileReportMerchantBranch: (data) => dispatch(getExcelFileReportMerchantBranch(data)),
  getMerchantBranch: (data) => dispatch(getMerchantBranch(data)),
});

FillReport.defaultProps = {
  getDetailTransactionMerchantBranch: () => {},
  getMerchantCodeName: () => {},
  listMerchantCodeName: [],
  getExcelFileReportMerchantBranch: () => {},
  exportReportFileMerchantBranch: {},
  getMerchantBranch: () => {},
  listMerchantBranch: {},
};

FillReport.propTypes = {
  getDetailTransactionMerchantBranch: PropTypes.func,
  getMerchantCodeName: PropTypes.func,
  listMerchantCodeName: PropTypes.array,
  getExcelFileReportMerchantBranch: PropTypes.func,
  exportReportFileMerchantBranch: PropTypes.object,
  getMerchantBranch: PropTypes.func,
  listMerchantBranch: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FillReport));
