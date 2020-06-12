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
import { getMerchantCodeName } from '../../../store/actions/masterMerchant/masterMerchant';
import { getMerchantBranch, getTerminalList, getTerminalPlace } from '../../../store/actions/terminal/terminal';


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
      fromDate: moment().subtract(1, 'months').toDate(),
      toDate: new Date(),
      fromRow: 0,
      pageSize: 10,
      errorTime: '',
      data: {
        terminalId: '',
        merchantId: '',
        terminalBranchId: '',
        levelTerminal: '',
        status: '',
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
    const { getTerminalList } = this.props;
    setTimeout(() => {
      const searchParams = sessionStorage.getItem('searchParams');
      const data = JSON.parse(searchParams);
      let newData = {};
      if (searchParams && data.terminalListPending) {
        newData = {
          data: {
            ...data.terminalListPending.data,
            terminalId: data.terminalListPending.data.terminalId.value || '',
            merchantId: data.terminalListPending.data.merchantId.merchantId || '',
            terminalBranchId: data.terminalListPending.data.terminalBranchId.value || '',
            levelTerminal: data.terminalListPending.data.levelTerminal.value || '',
          },
          fromRow: data.terminalListPending.fromRow,
          pageSize: data.terminalListPending.pageSize,
          fromDate: data.terminalListPending.fromDate,
          toDate: data.terminalListPending.toDate,
        };
      }

      const sendData = {
        fromDate: moment().subtract(1, 'months').format('DD/MM/YYYY HH:mm:ss'),
        toDate: moment(new Date()).format('DD/MM/YYYY HH:mm:ss'),
        fromRow: 0,
        pageSize: 10,
        data: {
          terminalId: '',
          merchantId: '',
          terminalBranchId: '',
          levelTerminal: '',
          status: 0,
          type: '1',
        },
      };

      if (searchParams && data.terminalListPending) {
        this.setState({
          data: data.terminalListPending.data,
          fromDate: new Date(moment(data.terminalListPending.fromDate, 'DD/MM/YYYY 00:00:00')),
          toDate: new Date(moment(data.terminalListPending.toDate, 'DD/MM/YYYY 00:00:00')),
          fromRow: data.terminalListPending.fromRow,
          pageSize: data.terminalListPending.pageSize,
        });
        getTerminalList(newData);
      } else {
        getTerminalList(sendData);
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
            label: `${listMerchantBranch[i].terminalId} - ${listMerchantBranch[i].terminalName}`,
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

  onHandleSearch = () => {
    const {
      getTerminalList,
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
    newData.terminalBranchId = newData.status.value || '';
    newData.levelTerminal = newData.levelTerminal.value || '';

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
      terminalListPending: storedData,
    }));
    this.props.changeSearch();
    getTerminalList(dataSearch);
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
      listMerchantCodeName, listMerchantBranch, listTerminalPlace, errorTime,
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
        </Col>
        <Col md="6">
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
        <Col md="12" className="mb-3">
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
  getTerminalList: (data) => dispatch(getTerminalList(data)),
  getMerchantBranch: (data) => dispatch(getMerchantBranch(data)),
  getTerminalPlace: (data) => dispatch(getTerminalPlace(data)),
});

FillMerchant.defaultProps = {
  getMerchantCodeName: () => {},
  listMerchantCodeName: [],
  getTerminalList: () => {},
  getMerchantBranch: () => {},
  listMerchantBranch: {},
  listTerminalPlace: [],
};

FillMerchant.propTypes = {
  getMerchantCodeName: PropTypes.func,
  listMerchantCodeName: PropTypes.array,
  getTerminalList: PropTypes.func,
  getMerchantBranch: PropTypes.func,
  listMerchantBranch: PropTypes.object,
  listTerminalPlace: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FillMerchant));
