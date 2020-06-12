import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import {
  Button, Col, FormGroup, Label, Row,
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import Constants from '../Constants';
import { getExcelFile, getMerchantCodeName } from '../../../store/actions/masterMerchant/masterMerchant';
import { getMerchantBranch, getTerminalListDenied, getTerminalPlace } from '../../../store/actions/terminal/terminal';


const rankTerminal = [
  { value: '', label: 'Tất cả' },
  { value: '1', label: 'Chi nhánh' },
  { value: '2', label: 'Điểm bán' },
];
class FillMerchant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listMerchantBranch: [],
      fromDate: moment().subtract(3, 'days').toDate(),
      toDate: new Date(),
      fromRow: 0,
      pageSize: 10,
      errorTime: '',
      data: {
        terminalId: '',
        merchantId: '',
        deniedId: 0,
        deniedUser: '',
        terminalBranchId: '',
        levelTerminal: '',
        type: '1',
      },
      merchantBranchCode: '',
      optionBranch: '',
      selectedOption: '',
      optionTerminalPlace: '',
      isDisabledMerchantBranch: true,
      isDisabledTerminalId: true,
    };
  }

  componentDidMount() {
    const {
      getTerminalListDenied,
    } = this.props;
    this.getListSelectBox();
    setTimeout(() => {
      const searchParams = sessionStorage.getItem('searchParams');
      const data = JSON.parse(searchParams);
      let newData = {};
      if (searchParams && data.terminalListHistoryDenied) {
        newData = {
          data: {
            ...data.terminalListHistoryDenied.data,
            terminalId: data.terminalListHistoryDenied.data.terminalId.value || '',
            merchantId: data.terminalListHistoryDenied.data.merchantId.merchantId || '',
            terminalBranchId: data.terminalListHistoryDenied.data.terminalBranchId.value || '',
            levelTerminal: data.terminalListHistoryDenied.data.levelTerminal.value || '',
            deniedId: data.terminalListHistoryDenied.data.deniedId.value || 0,
            deniedUser: data.terminalListHistoryDenied.data.deniedUser.label ? data.terminalListHistoryDenied.data.deniedUser.label === 'Tất cả' ? '' : data.terminalListHistoryDenied.data.deniedUser.label : '',
          },
          fromRow: data.terminalListHistoryDenied.fromRow,
          pageSize: data.terminalListHistoryDenied.pageSize,
          fromDate: data.terminalListHistoryDenied.fromDate,
          toDate: data.terminalListHistoryDenied.toDate,
        };
      }

      const sendData = {
        fromDate: moment().subtract(3, 'days').format('DD/MM/YYYY HH:mm:ss'),
        toDate: moment(new Date()).format('DD/MM/YYYY HH:mm:ss'),
        fromRow: 0,
        pageSize: 10,
        data: {
          terminalId: '',
          merchantId: '',
          deniedId: 0,
          deniedUser: '',
          terminalBranchId: '',
          levelTerminal: '',
          type: '1',
        },
      };

      if (searchParams && data.terminalListHistoryDenied) {
        this.setState({
          data: data.terminalListHistoryDenied.data,
          fromDate: new Date(moment(data.terminalListHistoryDenied.fromDate, 'DD/MM/YYYY 00:00:00')),
          toDate: new Date(moment(data.terminalListHistoryDenied.toDate, 'DD/MM/YYYY 00:00:00')),
          fromRow: data.terminalListHistoryDenied.fromRow,
          pageSize: data.terminalListHistoryDenied.pageSize,
        });
        getTerminalListDenied(newData);
      } else {
        getTerminalListDenied(sendData);
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
            merchantId: listMerchantCodeName[i] && listMerchantCodeName[i].id,
            value: listMerchantCodeName[i] && listMerchantCodeName[i].merchantCode,
            label: `${listMerchantCodeName[i] && listMerchantCodeName[i].merchantCode} - ${listMerchantCodeName[i] && listMerchantCodeName[i].merchantName}`,
            merchantName: listMerchantCodeName[i] && listMerchantCodeName[i].merchantName,
            key: i,
          },
        );
      }
    }
    if (listMerchantBranch) {
      for (let i = 0; i < listMerchantBranch.length; i += 1) {
        updateListMerchantBranch.push(
          {
            branchId: listMerchantBranch[i] && listMerchantBranch[i].id,
            value: listMerchantBranch[i] && listMerchantBranch[i].id,
            merchantCode: listMerchantBranch[i] && listMerchantBranch[i].merchantCode,
            label: `${listMerchantBranch[i] && listMerchantBranch[i].terminalId} - ${listMerchantBranch[i] && listMerchantBranch[i].terminalName}`,
          },
        );
      }
    }
    if (listTerminalPlace) {
      for (let i = 0; i < listTerminalPlace.length; i += 1) {
        updatelistTerminalPlace.push(
          {
            placeId: listTerminalPlace[i] && listTerminalPlace[i].terminalId,
            value: listTerminalPlace[i] && listTerminalPlace[i].terminalId,
            // merchantCode: listTerminalPlace[i] && listMerchantBranch[i].merchantCode,
            label: `${listTerminalPlace[i] && listTerminalPlace[i].terminalId} - ${listTerminalPlace[i] && listTerminalPlace[i].terminalName}`,
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
          merchantId: '',
          terminalBranchId: '',
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
          merchantId: e,
          terminalBranchId: '',
          terminalId: '',
        },
      }, () => getMerchantBranch({ merchantCode: e.value, status: '0', terminalBranchId: '' }));
    }
  }

  selectMerchantBranch = (e) => {
    const { getTerminalPlace } = this.props;
    if (e.value === '00') {
      this.setState({
        isDisabledTerminalId: e.value === '',
        data: {
          terminalBranchId: '',
          terminalId: '',
        },
      });
    } else {
      this.setState({
        ...this.state,
        isDisabledTerminalId: e.value === '',
        data: {
          ...this.state.data,
          terminalBranchId: e,
          terminalId: '',
        },
      }, () => getTerminalPlace({ merchantCode: e.merchantCode, status: '0', terminalBranchId: e.branchId }));
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

  onChangeRank = (e) => {
    if (e.value === '00') {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          levelTerminal: '',
        },
      });
    } else {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          levelTerminal: e,
        },
      });
    }
  }

  onChangeDeniedUser = (e) => {
    if (e.value === '00') {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          deniedUser: '',
        },
      });
    } else {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          deniedUser: e,
        },
      });
    }
  }

  onChangeDeniedApproved = (e) => {
    if (e.value === '00') {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          deniedId: '',
        },
      });
    } else {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          deniedId: e,
        },
      });
    }
  }

  getListSelectBox = () => {
    const listDeniedApproved = JSON.parse(localStorage && localStorage.getItem('DENIED_APPROVE'));
    const listAllUser = JSON.parse(localStorage && localStorage.getItem('LIST_ALL_USER'));

    const updateDeniedApproved = [{ value: '', label: 'Tất cả' }];
    if (listDeniedApproved) {
      for (let i = 0; i < listDeniedApproved.length; i += 1) {
        updateDeniedApproved.push({
          value: listDeniedApproved[i] && listDeniedApproved[i].code,
          label: `${listDeniedApproved[i] && listDeniedApproved[i].description}`,
        });
      }
    }

    const updateListAllUser = [{ value: '', label: 'Tất cả' }];
    if (listAllUser) {
      for (let i = 0; i < listAllUser.length; i += 1) {
        updateListAllUser.push({
          value: listAllUser[i] && listAllUser[i].userId,
          label: `${listAllUser[i] && listAllUser[i].userName}`,
        });
      }
    }

    this.setState({
      listDeniedApproved: updateDeniedApproved,
      listAllUser: updateListAllUser,
    });
  }

  onHandleSearch = () => {
    const {
      getTerminalListDenied,
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
    newData.terminalId = newData.terminalId.value || '';
    newData.merchantId = newData.merchantId.merchantId || '';
    newData.terminalBranchId = newData.terminalBranchId.value || '';
    newData.levelTerminal = newData.levelTerminal.value || '';
    newData.deniedId = newData.deniedId.value || 0;
    newData.deniedUser = newData.deniedUser.label ? newData.deniedUser.label === 'Tất cả' ? '' : newData.deniedUser.label : '';

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

    sessionStorage.setItem('searchParams', JSON.stringify({
      terminalListHistoryDenied: storedData,
    }));
    this.props.changeSearch();
    getTerminalListDenied(dataSearch);
  };

  onInputChangeMerchant = (value) => {
    const { getMerchantCodeName } = this.props;
    if (value && value.length > 2) {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        getMerchantCodeName({
          status: '1,-1',
          paternSearch: value,
        });
      }, 500);
    }
  };

  render() {
    const {
      listMerchantCodeName, listMerchantBranch, listTerminalPlace, listDeniedApproved, listAllUser, errorTime,
      isDisabledMerchantBranch, isDisabledTerminalId,
    } = this.state;
    const { fromDate, toDate, data } = this.state;

    return (
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
                onChange={this.selectCodeName}
                options={listMerchantCodeName}
                onInputChange={this.onInputChangeMerchant}
                placeholder="Tất cả"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col lg="6" className="label-left">
              <Label htmlFor="code">
                {Constants.MnMerchant.mcBranch}
              </Label>
            </Col>
            <Col lg="6">
              <Select
                isDisabled={isDisabledMerchantBranch}
                value={data.terminalBranchId}
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
                value={data.terminalId}
                isDisabled={isDisabledTerminalId}
                onChange={this.selectTerminalPlace}
                options={listTerminalPlace}
                placeholder="Tất cả"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col lg="6" className="label-left">
              <Label htmlFor="code">{Constants.MnMerchant.rank}</Label>
            </Col>
            <Col lg="6">
              <Select
                value={data.levelTerminal}
                onChange={this.onChangeRank}
                options={rankTerminal}
                placeholder="Tất cả"
              />
            </Col>
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup row>
            <Col lg="6" className="label-left">
              <Label htmlFor="code">{Constants.MnMerchant.processUser}</Label>
            </Col>
            <Col lg="6">
              <Select
                value={data.deniedUser}
                onChange={this.onChangeDeniedUser}
                options={listAllUser}
                placeholder="Tất cả"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col lg="6" className="label-left">
              <Label htmlFor="code">{Constants.MnMerchant.reason}</Label>
            </Col>
            <Col lg="6">
              <Select
                value={data.deniedId}
                onChange={this.onChangeDeniedApproved}
                options={listDeniedApproved}
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
        <Col className="text-center">
          <div className="mb-2"><span className="text-danger">{errorTime}</span></div>
        </Col>
      </Row>
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
  getTerminalListDenied: (data) => dispatch(getTerminalListDenied(data)),
  getExcelFile: (data) => dispatch(getExcelFile(data)),
  getMerchantBranch: (data) => dispatch(getMerchantBranch(data)),
  getTerminalPlace: (data) => dispatch(getTerminalPlace(data)),
});

FillMerchant.defaultProps = {
  getMerchantCodeName: () => {},
  listMerchantCodeName: [],
  getTerminalListDenied: () => {},
  getExcelFile: () => {},
  getMerchantBranch: () => {},
  listMerchantBranch: {},
  listTerminalPlace: [],
};

FillMerchant.propTypes = {
  getMerchantCodeName: PropTypes.func,
  listMerchantCodeName: PropTypes.array,
  getTerminalListDenied: PropTypes.func,
  getExcelFile: PropTypes.func,
  getMerchantBranch: PropTypes.func,
  listMerchantBranch: PropTypes.object,
  listTerminalPlace: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FillMerchant));
