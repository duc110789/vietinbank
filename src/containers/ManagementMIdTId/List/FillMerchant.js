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
import {getMerchantCodeName} from '../../../store/actions/masterMerchant/masterMerchant';
import {getMerchantBranch, getTerminalCodeName} from '../../../store/actions/terminal/terminal';
import {getMidTidList} from '../../../store/actions/mIdTid/mIdTid';
import {checkContainSpace, checkEmailFormat} from '../../../components/Input/validation';

const accountType = [
  { value: '', label: 'Tất cả' },
  { value: '1', label: 'Merchant' },
  { value: '2', label: 'Điểm bán' },
  { value: '3', label: 'Chi nhánh Merchant' },
];

const registerChannel = [
  { value: '', label: 'Tất cả' },
  { value: '1', label: 'MMS' },
  { value: '2', label: 'MC Site' },
  { value: '3', label: 'MC App' },
];
class FillMerchant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listMerchantBranch: [],
      listTerminalCodeName: [],
      fromDate: moment().subtract(3, 'days').toDate(),
      toDate: new Date(),
      fromRow: 0,
      pageSize: 10,
      data: {
        merchantId: '',
        merchantBranchId: '',
        terminalId: '',
        phone: '',
        email: '',
        typeAccount: '',
        channelRegister: 0,
        status: '-1',
      },
      errorTime: '',
      isDisabledMerchantBranch: true,
      isDisabledTerminalId: true,
    };
  }

  componentDidMount() {
    const { getMidTidList } = this.props;
    const sendData = {
      fromDate: moment().subtract(3, 'days').format('DD/MM/YYYY HH:mm:ss'),
      toDate: moment(new Date()).format('DD/MM/YYYY HH:mm:ss'),
      fromRow: 0,
      pageSize: 10,
      data: {
        merchantId: '',
        merchantBranchId: '',
        terminalId: '',
        phone: '',
        email: '',
        typeAccount: '',
        channelRegister: 0,
        status: '-1',
      },
    };
    this.getListSelectBox();
    getMidTidList(sendData);
  }

  static getDerivedStateFromProps(props) {
    const {
      listMerchantCodeName,
      listMerchantBranch,
      listTerminalCodeName,
    } = props;
    const updateListMerchantCodeName = [{ value: '', label: 'Tất cả' }];
    const updateListMerchantBranch = [{ value: '', label: 'Tất cả' }];
    const updateListTerminalCodeName = [{ value: '', label: 'Tất cả' }];
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
    if (listTerminalCodeName) {
      for (let i = 0; i < listTerminalCodeName.length; i += 1) {
        updateListTerminalCodeName.push(
          {
            value: listTerminalCodeName[i].terminalId,
            label: `${listTerminalCodeName[i].terminalId} - ${listTerminalCodeName[i].terminalName}`,
          },
        );
      }
    }
    return {
      listMerchantCodeName: updateListMerchantCodeName,
      listMerchantBranch: updateListMerchantBranch,
      listTerminalCodeName: updateListTerminalCodeName,
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

  selectMerchantCodeName = (e) => {
    const { getMerchantBranch } = this.props;
    if (e.value === '00') {
      this.setState({
        ...this.state,
        isDisabledMerchantBranch: e.value === '',
        isDisabledTerminalId: true,
        data: {
          ...this.state.data,
          merchantId: '',
          merchantBranchId: '',
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
          merchantBranchId: '',
          terminalId: '',
          merchantId: e,
        },
      }, () => getMerchantBranch({
        merchantCode: e.value, status: '0', terminalBranchId: '',
      }));
    }
  }

  selectMerchantBranch = (e) => {
    const { getTerminalCodeName } = this.props;
    if (e.value === '00') {
      this.setState({
        isDisabledTerminalId: e.value === '',
        data: {
          merchantBranchId: '',
          terminalId: '',
        },
      });
    } else {
      this.setState({
        ...this.state,
        isDisabledTerminalId: e.value === '',
        data: {
          ...this.state.data,
          terminalId: '',
          merchantBranchId: e,
        },
      }, () => getTerminalCodeName({
        merchantCode: e.merchantCode, status: '0', terminalBranchId: e.branchId,
      }));
    }
  };

  selectTerminalCodeName = (e) => {
    if (e.value === '00') {
      this.setState({
        data: {
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

  selectaccountType = (e) => {
    if (e.value === '00') {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          typeAccount: '',
        },
      });
    } else {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          typeAccount: e.value,
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
          status: e.value,
        },
      });
    }
  }

  selectregisterChannel = (e) => {
    if (e.value === '00') {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          channelRegister: '',
        },
      });
    } else {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          channelRegister: e.value,
        },
      });
    }
  };

  handleChangephoneNumber = (e) => {
    if (e.value === '00') {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          phone: '',
        },
      });
    } else {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          phone: e.target.value,
        },
      });
    }
  }

  handleChangeEmail = (e) => {
    if (e.value === '00') {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          email: '',
        },
      });
    } else {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          email: e.target.value,
        },
      });
    }
  }

  getListSelectBox = () => {
    const listMerchantStatusUser = JSON.parse(localStorage && localStorage.getItem('MERCHANT_USER'));

    const updateListMerchantStatusUser = [{ value: '-1', label: 'Tất cả' }];
    if (listMerchantStatusUser) {
      for (let i = 0; i < listMerchantStatusUser.length; i += 1) {
        updateListMerchantStatusUser.push({
          value: listMerchantStatusUser[i].code,
          label: `${listMerchantStatusUser[i].description}`,
        });
      }
    }

    this.setState({
      listMerchantStatusUser: updateListMerchantStatusUser,
    });
  }

  onHandleSearch = (e) => {
    e.preventDefault();
    const {
      getMidTidList,
    } = this.props;
    const {
      fromDate,
      fromRow,
      toDate,
      pageSize,
      data,
    } = this.state;

    const newData = { ...data };
    newData.terminalId = newData.terminalId.value || '';
    newData.merchantId = newData.merchantId.merchantId || '';
    newData.merchantBranchId = newData.merchantBranchId.value || '';

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
      fromDate: moment(fromDate).format('DD/MM/YYYY HH:mm:ss'),
      toDate: moment(toDate).format('DD/MM/YYYY HH:mm:ss'),
      fromRow,
      pageSize,
      data: newData,
    };
    getMidTidList(dataSearch);
  };

  onHandleAdd = () => {
    const { history } = this.props;
    history.push({
      pathname: '/system/accountwebapp/add',
    });
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
      listMerchantStatusUser,
      listMerchantCodeName,
      listTerminalCodeName,
      listMerchantBranch,
      errorTime,
      isDisabledMerchantBranch,
      isDisabledTerminalId,
    } = this.state;
    const { fromDate, toDate, data } = this.state;

    return (
      <Form>
        <Row>
          <Col md="6">
            <FormGroup row>
              <Col lg="6" className="label-left">
                <Label htmlFor="code">
                  {Constants.MerchantDetail.mcId}
                  {' '}
                  -
                  {' '}
                  {Constants.MnMerchant.merchantName}
                </Label>
              </Col>
              <Col lg="6">
                <Select
                  value={data.merchantId}
                  onChange={this.selectMerchantCodeName}
                  onInputChange={this.onInputChangeMerchant}
                  options={listMerchantCodeName}
                  placeholder="Tất cả"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col lg="6" className="label-left">
                <Label htmlFor="code">
                  {Constants.MnMerchant.mcBranchCode}
                  {' '}
                  -
                  {' '}
                  {Constants.MnMerchant.mcBranch}
                </Label>
              </Col>
              <Col lg="6">
                <Select
                  isDisabled={isDisabledMerchantBranch}
                  value={data.merchantBranchId}
                  onChange={this.selectMerchantBranch}
                  options={listMerchantBranch}
                  placeholder="Tất cả"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col lg="6" className="label-left">
                <Label htmlFor="code">
                  {Constants.MnMerchant.terminalCode}
                  {' '}
                  -
                  {' '}
                  {Constants.MnMerchant.terminalNameVn}
                </Label>
              </Col>
              <Col lg="6">
                <Select
                  isDisabled={isDisabledTerminalId}
                  value={data.terminalId}
                  onChange={this.selectTerminalCodeName}
                  options={listTerminalCodeName}
                  placeholder="Tất cả"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col lg="6">
                <Label>
                  {Constants.MnMerchant.userName}
                  {' '}
                </Label>
              </Col>
              <Col lg="6">
                <Input
                  label={Constants.MnMerchant.userName}
                  type="text"
                  isDisabled={isDisabledTerminalId}
                  className="form-control"
                  onChange={this.handleChangephoneNumber}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col lg="6">
                <Label>
                  {Constants.MnMerchant.email}
                  {' '}
                </Label>
              </Col>
              <Col lg="6">
                <Input
                  label={Constants.MnMerchant.email}
                  type="text"
                  className="form-control"
                  onChange={this.handleChangeEmail}
                  validations={[
                    checkEmailFormat,
                    checkContainSpace,
                  ]}
                />
              </Col>
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup row>
              <Col lg="6" className="label-left">
                <Label htmlFor="code">
                  {Constants.AccountWebApp.accountType}
                </Label>
              </Col>
              <Col lg="6">
                <Select
                  onChange={this.selectaccountType}
                  options={accountType}
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
                  onChange={this.selectStatus}
                  options={listMerchantStatusUser}
                  placeholder="Tất cả"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col lg="6" className="label-left">
                <Label htmlFor="code">
                  {Constants.AccountWebApp.registerChannel}
                </Label>
              </Col>
              <Col lg="6">
                <Select
                  onChange={this.selectregisterChannel}
                  options={registerChannel}
                  placeholder="Tất cả"
                />
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
                <Button className="btn btn-primary" onClick={this.onHandleAdd}>
                  <i className="fa fa-plus mr-1" />
                  Thêm mới
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
  listTerminalCodeName: state.terminal.listTerminalCodeName,
});

const mapDispatchToProps = (dispatch) => ({
  getMerchantCodeName: (data) => dispatch(getMerchantCodeName(data)),
  getMidTidList: (data) => dispatch(getMidTidList(data)),
  getTerminalCodeName: (data) => dispatch(getTerminalCodeName(data)),
  getMerchantBranch: (data) => dispatch(getMerchantBranch(data)),
});

FillMerchant.defaultProps = {
  getMerchantCodeName: () => {},
  listMerchantBranch: {},
  listMerchantCodeName: [],
  getMidTidList: () => {},
  getTerminalCodeName: () => {},
  listTerminalCodeName: {},
  history: {},
};

FillMerchant.propTypes = {
  getMerchantCodeName: PropTypes.func,
  listMerchantBranch: PropTypes.object,
  listMerchantCodeName: PropTypes.array,
  getMidTidList: PropTypes.func,
  getTerminalCodeName: PropTypes.func,
  listTerminalCodeName: PropTypes.object,
  history: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FillMerchant));
