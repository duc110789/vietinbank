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
  getExcelFile,
  getMerchantCodeName,
  getMerchantList,
} from '../../../store/actions/masterMerchant/masterMerchant';

class FillMerchant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listMccInternational: [],
      fromDate: moment().subtract(1, 'months').toDate(),
      toDate: new Date(),
      fromRow: 0,
      pageSize: 10,
      errorTime: '',
      data: {
        merchantCode: '',
        status: 0,
        merchantType: 0,
        merchantBrand: '',
        type: '0',
      },
    };
    this.timeout = 0;
  }

  componentDidMount() {
    const { getMerchantList } = this.props;
    this.getListSelectBox();
    setTimeout(() => {
      const searchParams = sessionStorage.getItem('searchParams');
      const data = JSON.parse(searchParams);
      let newData = {};
      if (searchParams && data.merchantList) {
        newData = {
          data: {
            ...data.merchantList.data,
            merchantCode: data.merchantList.data.merchantCode.value || '',
            status: data.merchantList.data.status.value || '',
            merchantType: data.merchantList.data.merchantType.value || '',
          },
          fromRow: data.merchantList.fromRow,
          pageSize: data.merchantList.pageSize,
          fromDate: data.merchantList.fromDate,
          toDate: data.merchantList.toDate,
        };
      }

      const sendData = {
        fromDate: moment().subtract(1, 'months').format('DD/MM/YYYY HH:mm:ss'),
        toDate: moment(new Date()).format('DD/MM/YYYY HH:mm:ss'),
        fromRow: 0,
        pageSize: 10,
        data: {
          merchantCode: '',
          status: 0,
          merchantType: 0,
          merchantBrand: '',
          type: '0',
        },
      };

      if (searchParams && data.merchantList) {
        this.setState({
          data: data.merchantList.data,
          fromDate: new Date(moment(data.merchantList.fromDate, 'DD/MM/YYYY 00:00:00')),
          toDate: new Date(moment(data.merchantList.toDate, 'DD/MM/YYYY 00:00:00')),
          fromRow: data.merchantList.fromRow,
          pageSize: data.merchantList.pageSize,
        });
        getMerchantList(newData);
      } else {
        getMerchantList(sendData);
      }
    }, 0);
  }

  static getDerivedStateFromProps(props) {
    const {
      listMerchantCodeName,
    } = props;
    const updateListMerchantCodeName = [{ value: '', label: 'Tất cả' }];
    if (listMerchantCodeName) {
      for (let i = 0; i < listMerchantCodeName.length; i += 1) {
        updateListMerchantCodeName.push(
          {
            value: listMerchantCodeName[i].merchantCode,
            label: `${listMerchantCodeName[i].merchantCode} - ${listMerchantCodeName[i].merchantName}`,
            merchantName: listMerchantCodeName[i].merchantName,
            key: i,
          },
        );
      }
    }
    return {
      listMerchantCodeName: updateListMerchantCodeName,
    };
  }

  componentDidUpdate(prevProps) {
    const { exportMerchantFile } = this.props;

    if (prevProps.exportMerchantFile !== exportMerchantFile) {
      window.open(exportMerchantFile, 'blank');
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
          merchantCode: e,
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

  onChangeMCC = (e) => {
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
          merchantType: e,
        },
      });
    }
  }

  onChangemerchantBrand = (e) => {
    if (e.value === '00') {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          merchantBrand: '',
        },
      });
    } else {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          merchantBrand: e.target.value,
        },
      });
    }
  }

  getListSelectBox = () => {
    const listMccInternational = JSON.parse(localStorage && localStorage.getItem('LIST_MCC_INTERNATIONAL'));
    const listMerchantStatus = JSON.parse(localStorage && localStorage.getItem('MERCHANT'));

    const updateListMccInternational = [{ value: '', label: 'Tất cả' }];
    if (listMccInternational) {
      for (let i = 0; i < listMccInternational.length; i += 1) {
        updateListMccInternational.push({
          value: listMccInternational[i].id,
          label: `${listMccInternational[i].typeCode} - ${listMccInternational[i].brandName}`,
        });
      }
    }

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
      listMccInternational: updateListMccInternational,
      listMerchantStatus: updateListMerchantStatus,
    });
  }

  onHandleSearch = (e) => {
    e.preventDefault();
    const {
      getMerchantList,
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
    newData.merchantType = newData.merchantType.value || '';
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

    sessionStorage.setItem('searchParams', JSON.stringify({
      merchantList: storedData,
    }));
    this.props.changeSearch();
    getMerchantList(dataSearch);
  };

  exportFile = () => {
    const {
      getExcelFile,
    } = this.props;
    const {
      fromDate,
      fromRow,
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
    const dataExport = {
      fromDate: moment().subtract(1, 'months').format('DD/MM/YYYY HH:mm:ss'),
      toDate: moment(new Date()).format('DD/MM/YYYY HH:mm:ss'),
      fromRow,
      pageSize: 0,
      data: {
        ...data,
        merchantCode: data.merchantCode.value || '',
        merchantType: data.merchantType.value || '',
        status: data.status.value || '',
      },
    };
    getExcelFile(dataExport);
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
      listMccInternational, listMerchantStatus, listMerchantCodeName, errorTime,
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
                  value={data.merchantCode}
                  onInputChange={this.onInputChangeMerchant}
                  onChange={this.selectCodeName}
                  options={listMerchantCodeName}
                  placeholder="Chọn"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col lg="6" className="label-left">
                <Label htmlFor="code">
                  {Constants.MnMerchant.merchantName}
                  {' '}
                  {Constants.MnMerchant.short}
                </Label>
              </Col>
              <Col lg="6">
                <Input value={data.merchantBrand} className="form-control" onChange={this.onChangemerchantBrand} />
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
                <Label htmlFor="code">{Constants.MnMerchant.nationalMCC}</Label>
              </Col>
              <Col lg="6">
                <Select
                  value={data.merchantType}
                  onChange={this.onChangeMCC}
                  options={listMccInternational}
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
          <Col md="6">
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
          <Col md="6">
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
      </Form>
    );
  }
}
const mapStateToProps = (state) => ({
  listMerchantCodeName: state.masterMerchant.listMerchantCodeName,
  exportMerchantFile: state.masterMerchant.exportMerchantFile,
});

const mapDispatchToProps = (dispatch) => ({
  getMerchantCodeName: (data) => dispatch(getMerchantCodeName(data)),
  getMerchantList: (data) => dispatch(getMerchantList(data)),
  getExcelFile: (data) => dispatch(getExcelFile(data)),
});

FillMerchant.defaultProps = {
  getMerchantCodeName: () => {},
  listMerchantCodeName: [],
  getMerchantList: () => {},
  getExcelFile: () => {},
  exportMerchantFile: () => {},
};

FillMerchant.propTypes = {
  getMerchantCodeName: PropTypes.func,
  listMerchantCodeName: PropTypes.array,
  getMerchantList: PropTypes.func,
  getExcelFile: PropTypes.func,
  exportMerchantFile: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FillMerchant));
