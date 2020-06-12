import React, {Component} from 'react';
import {withRouter,} from 'react-router-dom';
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
import {getMerchantCodeName,} from '../../../store/actions/masterMerchant/masterMerchant';
import {getMerchantBranch, getTerminalPlace,} from '../../../store/actions/terminal/terminal';
import {getQrCodeList,} from '../../../store/actions/qRCode/qRCode';

class FillMerchant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listMerchantBranch: [],
      fromDate: moment().subtract(6, 'months').toDate(),
      toDate: new Date(),
      fromRow: 0,
      pageSize: 10,
      data: {
        merchantCode: '',
        branchMidId: '',
        terminalID: '',
        status: 0,
        productID: '',
        productName: '',
        payType: '02',
      },
      merchantBranchCode: '',
      optionBranch: '',
      selectedOption: '',
      optionTerminalPlace: '',
      errorTime: '',
      isDisabledMerchantBranch: true,
      isDisabledTerminalId: true,
    };
  }

  componentDidMount() {
    const {
      getQrCodeList,
    } = this.props;
    this.getListSelectBox();
    setTimeout(() => {
      const searchParams = sessionStorage.getItem('searchParams');
      const data = JSON.parse(searchParams);
      let newData = {};
      if (searchParams) {
        newData = {
          data: {
            ...data.data,
            merchantCode: data.data.merchantCode.value || '',
            branchMidId: data.data.branchMidId.value || '',
            terminalID: data.data.terminalID.value || '',
            status: data.data.status.value || '',
          },
          fromRow: data.fromRow,
          pageSize: data.pageSize,
          fromDate: data.fromDate,
          toDate: data.toDate,
        };
      }

      const sendData = {
        fromDate: moment().subtract(6, 'months').format('DD/MM/YYYY HH:mm:ss'),
        toDate: moment(new Date()).format('DD/MM/YYYY HH:mm:ss'),
        fromRow: 0,
        pageSize: 10,
        data: {
          merchantCode: '',
          branchMidId: '',
          terminalID: '',
          status: 0,
          productID: '',
          productName: '',
          payType: '02',
        },
      };

      if (searchParams) {
        this.setState({
          data: data.data,
          fromDate: new Date(moment(data.fromDate, 'DD/MM/YYYY 00:00:00')),
          toDate: new Date(moment(data.toDate, 'DD/MM/YYYY 00:00:00')),
          fromRow: data.fromRow,
          pageSize: data.pageSize,
        });
        getQrCodeList(newData);
      } else {
        getQrCodeList(sendData);
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
            merchantCode: listMerchantCodeName[i].merchantCode,
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
            branchMidId: listMerchantBranch[i].id,
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
        isDisabledMerchantBranch: e.value === '',
        isDisabledTerminalId: true,
        data: {
          ...this.state.data,
          merchantCode: '',
          branchMidId: '',
          terminalID: '',
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
          branchMidId: '',
          terminalID: '',
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
          branchMidId: '',
          terminalID: '',
        },
      });
    } else {
      this.setState({
        ...this.state,
        isDisabledTerminalId: e.value === '',
        data: {
          ...this.state.data,
          branchMidId: e,
          terminalID: '',
        },
      }, () => getTerminalPlace({ merchantCode: e.merchantCode, status: '1', terminalBranchId: e.branchId }));
    }
  };

  selectTerminalPlace = (e) => {
    if (e.value === '00') {
      this.setState({
        ...this.state,
        isDisabledTerminalId: e.value === '',
        data: {
          ...this.state.data,
          terminalID: '',
        },
      });
    } else {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          terminalID: e,
        },
      });
    }
  };

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

  onChangeProductCode = (e) => {
    if (e.value === '00') {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          productID: '',
        },
      });
    } else {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          productID: e.target.value,
        },
      });
    }
  }

  onChangeProductName = (e) => {
    if (e.value === '00') {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          productName: '',
        },
      });
    } else {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          productName: e.target.value,
        },
      });
    }
  }

  getListSelectBox = () => {
    const listMerchantStatus = JSON.parse(localStorage && localStorage.getItem('QRCODE'));

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
      getQrCodeList,
    } = this.props;
    const {
      fromDate,
      toDate,
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

    const newData = { ...data };
    newData.merchantCode = newData.merchantCode.value || '';
    newData.branchMidId = newData.branchMidId.value || '';
    newData.terminalID = newData.terminalID.value || '';
    newData.status = newData.status.value || '';
    const dataSearch = {
      fromDate: moment(fromDate).format('DD/MM/YYYY 00:00:00'),
      toDate: moment(toDate).format('DD/MM/YYYY 23:59:59'),
      fromRow: 0,
      pageSize: 10,
      data: newData,
    };
    const storedData = {
      fromDate: moment(fromDate).format('DD/MM/YYYY 00:00:00'),
      toDate: moment(toDate).format('DD/MM/YYYY 23:59:59'),
      fromRow: 0,
      pageSize: 10,
      data,
    };

    sessionStorage.setItem('searchParams', JSON.stringify(storedData));
    this.props.changeSearch();
    getQrCodeList(dataSearch);
  };

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
      listMerchantStatus, listMerchantCodeName, listMerchantBranch, listTerminalPlace,
      isDisabledMerchantBranch, isDisabledTerminalId,
    } = this.state;
    const { fromDate, toDate, errorTime, data } = this.state;

    return (
      <Form>
        <Row>
          <Col md="6">
            <FormGroup row>
              <Col lg="6" className="label-left">
                <Label htmlFor="code">
                  {Constants.MnMerchant.merchant}
                  {' '}
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
                <Label htmlFor="code">
                  {Constants.MnMerchant.branch}
                </Label>
              </Col>
              <Col lg="6">
                <Select
                  isDisabled={isDisabledMerchantBranch}
                  value={data.branchMidId}
                  onChange={this.selectMerchantBranch}
                  options={listMerchantBranch}
                  placeholder="Tất cả"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col lg="6" className="label-left">
                <Label htmlFor="code">
                  {Constants.MnMerchant.terminalPlace}
                </Label>
              </Col>
              <Col lg="6">
                <Select
                  isDisabled={isDisabledTerminalId}
                  value={data.terminalID}
                  onChange={this.selectTerminalPlace}
                  options={listTerminalPlace}
                  placeholder="Tất cả"
                />
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
          </Col>
          <Col md="6">
            <FormGroup row>
              <Col lg="6" className="label-left">
                <Label htmlFor="code">
                  {Constants.QRCode.productCode}
                </Label>
              </Col>
              <Col lg="6">
                <Input value={data.productID} className="form-control" onChange={this.onChangeProductCode} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col lg="6" className="label-left">
                <Label htmlFor="code">
                  {Constants.QRCode.productName}
                </Label>
              </Col>
              <Col lg="6">
                <Input value={data.productName} className="form-control" onChange={this.onChangeProductName} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col lg="6" className="label-left">
                <Label htmlFor="code">{Constants.MerchantList.applyDate}</Label>
              </Col>
              <Col lg="6">
                <DatePicker
                  selected={fromDate}
                  onChange={this.handleChangeFromDate}
                  className="form-control"
                  dateFormat="dd/MM/yyyy"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col lg="6" className="label-left">
                <Label htmlFor="code">{Constants.MerchantList.expireDate}</Label>
              </Col>
              <Col lg="6">
                <DatePicker
                  selected={toDate}
                  onChange={this.handleChangeToDate}
                  className="form-control"
                  dateFormat="dd/MM/yyyy"
                />
              </Col>
            </FormGroup>
          </Col>
          <Col md="12" className="mb-3 mt-3">
            <FormGroup row>
              <Col className="text-center btn-search">
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
          <Col className="text-center">
            <div className="mb-2"><span className="text-danger">{errorTime}</span></div>
          </Col>
        </Row>
      </Form>
    );
  }
}
const mapStateToProps = (state) => ({
  listMerchantCodeName: state.masterMerchant.listMerchantCodeName,
  listMerchantBranch: state.terminal.listMerchantBranch,
  listTerminalPlace: state.terminal.listTerminalPlace,
});

const mapDispatchToProps = (dispatch) => ({
  getMerchantCodeName: (data) => dispatch(getMerchantCodeName(data)),
  getQrCodeList: (data) => dispatch(getQrCodeList(data)),
  getMerchantBranch: (data) => dispatch(getMerchantBranch(data)),
  getTerminalPlace: (data) => dispatch(getTerminalPlace(data)),
});

FillMerchant.defaultProps = {
  getMerchantCodeName: () => {},
  listMerchantCodeName: [],
  getQrCodeList: () => {},
  getMerchantBranch: () => {},
  listMerchantBranch: {},
  listTerminalPlace: [],
};

FillMerchant.propTypes = {
  getMerchantCodeName: PropTypes.func,
  listMerchantCodeName: PropTypes.array,
  getQrCodeList: PropTypes.func,
  getMerchantBranch: PropTypes.func,
  listMerchantBranch: PropTypes.object,
  listTerminalPlace: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FillMerchant));
