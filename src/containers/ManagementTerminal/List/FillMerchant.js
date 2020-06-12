import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Select from 'react-select';
import {Button, Col, FormGroup, Label, Row,} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import Constants from '../Constants';
import {getMerchantCodeName} from '../../../store/actions/masterMerchant/masterMerchant';
import {
  getExcelFileTerminal,
  getMerchantBranch,
  getTerminalList,
  getTerminalPlace,
} from '../../../store/actions/terminal/terminal';


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
        type: '0',
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
      getTerminalList,
    } = this.props;
    this.getListSelectBox();

    setTimeout(() => {
      const searchParams = sessionStorage.getItem('searchParams');
      const data = JSON.parse(searchParams);
      let newData = {};
      if (searchParams && data.terminalList) {
        newData = {
          data: {
            ...data.terminalList.data,
            terminalId: data.terminalList.data.terminalId.value || '',
            status: data.terminalList.data.status.value || '',
            merchantId: data.terminalList.data.merchantId.merchantId || '',
            terminalBranchId: data.terminalList.data.terminalBranchId.value || '',
            levelTerminal: data.terminalList.data.levelTerminal.value || '',
          },
          fromRow: data.terminalList.fromRow,
          pageSize: data.terminalList.pageSize,
          fromDate: data.terminalList.fromDate,
          toDate: data.terminalList.toDate,
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
          status: '',
          type: '0',
        },
      };

      if (searchParams && data.terminalList) {
        this.setState({
          data: data.terminalList.data,
          fromDate: new Date(moment(data.terminalList.fromDate, 'DD/MM/YYYY 00:00:00')),
          toDate: new Date(moment(data.terminalList.toDate, 'DD/MM/YYYY 00:00:00')),
          fromRow: data.terminalList.fromRow,
          pageSize: data.terminalList.pageSize,
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

  componentDidUpdate(prevProps) {
    const { exportTerminalFile } = this.props;
    if (prevProps.exportTerminalFile !== exportTerminalFile) {
      window.open(exportTerminalFile, 'blank');
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
          terminalId: '',
          terminalBranchId: e,
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

  getListSelectBox = () => {
    const listTerminalStatus = JSON.parse(localStorage && localStorage.getItem('TERMINAL'));

    const updateListTerminalStatus = [{ value: '', label: 'Tất cả' }];
    if (listTerminalStatus) {
      for (let i = 0; i < listTerminalStatus.length; i += 1) {
        updateListTerminalStatus.push({
          value: listTerminalStatus[i].code,
          label: `${listTerminalStatus[i].description}`,
        });
      }
    }

    this.setState({
      listTerminalStatus: updateListTerminalStatus,
    });
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
    newData.status = newData.status.value || '';
    newData.terminalBranchId = newData.terminalBranchId.branchId || '';
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
      terminalList: storedData,
    }));
    this.props.changeSearch();
    getTerminalList(dataSearch);
  };

  exportFile = () => {
    const {
      getExcelFileTerminal,
    } = this.props;
    const {
      fromDate,
      toDate,
      fromRow,
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
    const dataExport = {
      fromDate: moment(fromDate).format('DD/MM/YYYY HH:mm:ss'),
      toDate: moment(toDate).format('DD/MM/YYYY HH:mm:ss'),
      fromRow,
      pageSize: 0,
      data: {
        ...data,
        status: data.status.value || '',
        terminalId: data.terminalId.value || '',
        merchantId: data.merchantId.merchantId || '',
        terminalBranchId: data.terminalBranchId.value || '',
        levelTerminal: data.levelTerminal.value || '',
      },
    };
    getExcelFileTerminal(dataExport);
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
      listTerminalStatus, listMerchantCodeName, listMerchantBranch, listTerminalPlace, errorTime,
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
                onInputChange={this.onInputChangeMerchant}
                options={listMerchantCodeName}
                placeholder="Chọn"
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
                value={data.terminalBranchId}
                isDisabled={isDisabledMerchantBranch}
                onChange={this.selectMerchantBranch}
                options={listMerchantBranch}
                placeholder="Chọn"
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
                placeholder="Chọn"
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
                options={listTerminalStatus}
                placeholder="Chọn"
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
                placeholder="Chọn"
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
  exportTerminalFile: state.terminal.exportTerminalFile,
  listMerchantBranch: state.terminal.listMerchantBranch,
  listTerminalPlace: state.terminal.listTerminalPlace,
});

const mapDispatchToProps = (dispatch) => ({
  getMerchantCodeName: (data) => dispatch(getMerchantCodeName(data)),
  getTerminalList: (data) => dispatch(getTerminalList(data)),
  getExcelFileTerminal: (data) => dispatch(getExcelFileTerminal(data)),
  getMerchantBranch: (data) => dispatch(getMerchantBranch(data)),
  getTerminalPlace: (data) => dispatch(getTerminalPlace(data)),
});

FillMerchant.defaultProps = {
  getMerchantCodeName: () => {},
  listMerchantCodeName: [],
  getTerminalList: () => {},
  getExcelFileTerminal: () => {},
  exportTerminalFile: {},
  getMerchantBranch: () => {},
  listMerchantBranch: {},
  listTerminalPlace: [],
};

FillMerchant.propTypes = {
  getMerchantCodeName: PropTypes.func,
  listMerchantCodeName: PropTypes.array,
  getTerminalList: PropTypes.func,
  getExcelFileTerminal: PropTypes.func,
  exportTerminalFile: PropTypes.object,
  getMerchantBranch: PropTypes.func,
  listMerchantBranch: PropTypes.object,
  listTerminalPlace: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FillMerchant));
