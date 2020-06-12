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
  getDetailTransactionInterMcc,
  getExcelFileReportInterMcc,
} from '../../../../store/actions/StatisticalReport/index';
import {getAllMccInternational,} from '../../../../store/actions/system/systemModuleAction';

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
      getDetailTransactionInterMcc, getAllMccInternational,
    } = this.props;
    const sendData = {
      fromDate: moment().subtract(3, 'days').format('DD/MM/YYYY 00:00:00'),
      toDate: moment(new Date()).format('DD/MM/YYYY 23:59:59'),
      fromRow: 0,
      pageSize: 10,
      data: {
      },
    };
    getAllMccInternational();
    this.getListSelectBox();
    getDetailTransactionInterMcc(sendData);
  }

  static getDerivedStateFromProps(props) {
    const {
      listMccInternational,
    } = props;
    const updateListMccInternational = [{ value: '', label: 'Tất cả' }];
    if (listMccInternational) {
      for (let i = 0; i < listMccInternational.length; i += 1) {
        updateListMccInternational.push({
          value: listMccInternational[i] && listMccInternational[i].typeCode,
          label: `${listMccInternational[i] && listMccInternational[i].typeCode} - ${listMccInternational[i] && listMccInternational[i].brandName}`,
        });
      }
    }
    return {
      listMccInternational: updateListMccInternational,
    };
  }

  componentDidUpdate(prevProps) {
    const { exportReportFileInterMcc } = this.props;
    if (prevProps.exportReportFileInterMcc !== exportReportFileInterMcc) {
      window.open(exportReportFileInterMcc, 'blank');
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

  selectInterMcc = (e) => {
    if (e.value === '00') {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          merchantType: '',
        },
      });
    } else {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          merchantType: e.value,
        },
      });
    }
  }

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

  onHandleSearch = () => {
    const {
      getDetailTransactionInterMcc,
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
    getDetailTransactionInterMcc(dataSearch);
  };

  exportFile = () => {
    const {
      getExcelFileReportInterMcc,
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
    getExcelFileReportInterMcc(dataExport);
  }

  render() {
    const {
      listQrChannel, errorTime, listMccInternational,
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
                // onChange={this.selectMasterMerchant}
                options={listMasterMerchant}
                placeholder="Vietinbank"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col lg="6" className="label-left">
              <Label>
                {Constants.StatisticalReport.internationalMcc}
              </Label>
            </Col>
            <Col lg="6">
              <Select
                onChange={this.selectInterMcc}
                options={listMccInternational}
                placeholder="Tất cả"
              />
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
                onChange={this.selectPaymentType}
                options={listQrChannel}
                placeholder="Tất cả"
              />
            </Col>
          </FormGroup>
        </Col>
        <Col md="6">
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
  exportReportFileInterMcc: state.statisticalReport.exportReportFileInterMcc,
  listMccInternational: state.systemModule.listMccInternational,
});

const mapDispatchToProps = (dispatch) => ({
  getDetailTransactionInterMcc: (data) => dispatch(getDetailTransactionInterMcc(data)),
  getExcelFileReportInterMcc: (data) => dispatch(getExcelFileReportInterMcc(data)),
  getAllMccInternational: () => dispatch(getAllMccInternational()),
});

FillReport.defaultProps = {
  getDetailTransactionInterMcc: () => {},
  getExcelFileReportInterMcc: () => {},
  exportReportFileInterMcc: {},
  listMccInternational: [],
  getAllMccInternational: () => {},
};

FillReport.propTypes = {
  getDetailTransactionInterMcc: PropTypes.func,
  getExcelFileReportInterMcc: PropTypes.func,
  exportReportFileInterMcc: PropTypes.object,
  listMccInternational: PropTypes.array,
  getAllMccInternational: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FillReport));
