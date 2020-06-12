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
import {getMerchantCodeName, getMerchantList} from '../../../store/actions/masterMerchant/masterMerchant';

class FillMerchant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listMccInternational: [],
      fromDate: moment().subtract(3, 'days').toDate(),
      toDate: new Date(),
      fromRow: 0,
      pageSize: 10,
      errorTime: '',
      data: {
        merchantCode: '',
        status: 0,
        merchantType: 0,
        merchantBrand: '',
        type: '1',
      },
    };
    this.timeout = 0;
  }

  componentDidMount() {
    const {
      getMerchantList,
    } = this.props;
    this.getListSelectBox();
    setTimeout(() => {
      const searchParams = sessionStorage.getItem('searchParams');
      const data = JSON.parse(searchParams);
      let newData = {};
      if (searchParams && data.merchantListPending) {
        newData = {
          data: {
            ...data.merchantListPending.data,
            merchantCode: data.merchantListPending.data.merchantCode.value || '',
            merchantType: data.merchantListPending.data.merchantType.value || '',
          },
          fromRow: data.merchantListPending.fromRow,
          pageSize: data.merchantListPending.pageSize,
          fromDate: data.merchantListPending.fromDate,
          toDate: data.merchantListPending.toDate,
        };
      }

      const sendData = {
        fromDate: moment().subtract(3, 'days').format('DD/MM/YYYY HH:mm:ss'),
        toDate: moment(new Date()).format('DD/MM/YYYY HH:mm:ss'),
        fromRow: 0,
        pageSize: 10,
        data: {
          merchantCode: '',
          status: 0,
          merchantType: 0,
          merchantBrand: '',
          type: '1',
        },
      };

      if (searchParams && data.merchantListPending) {
        this.setState({
          data: data.merchantListPending.data,
          fromDate: new Date(moment(data.merchantListPending.fromDate, 'DD/MM/YYYY 00:00:00')),
          toDate: new Date(moment(data.merchantListPending.toDate, 'DD/MM/YYYY 00:00:00')),
          fromRow: data.merchantListPending.fromRow,
          pageSize: data.merchantListPending.pageSize,
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
      merchantListPending: storedData,
    }));
    this.props.changeSearch();
    getMerchantList(dataSearch);
  };

  onInputChangeMerchant = (value) => {
    const { getMerchantCodeName } = this.props;
    if (value && value.length > 2) {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        getMerchantCodeName({
          status: '3',
          paternSearch: value,
        });
      }, 500);
    }
  };

  render() {
    const { listMccInternational, listMerchantCodeName, errorTime } = this.state;
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
                  placeholder="Tất cả"
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
          </Col>
          <Col md="6">
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
          <Col md="12">
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
            <Col className="text-center">
              <div className="mb-2"><span className="text-danger">{errorTime}</span></div>
            </Col>
          </Col>
        </Row>
      </Form>
    );
  }
}
const mapStateToProps = (state) => ({
  listMerchantCodeName: state.masterMerchant.listMerchantCodeName,
});

const mapDispatchToProps = (dispatch) => ({
  getMerchantCodeName: (data) => dispatch(getMerchantCodeName(data)),
  getMerchantList: (data) => dispatch(getMerchantList(data)),
});

FillMerchant.defaultProps = {
  getMerchantCodeName: () => {},
  listMerchantCodeName: [],
  getMerchantList: () => {},
};

FillMerchant.propTypes = {
  getMerchantCodeName: PropTypes.func,
  listMerchantCodeName: PropTypes.array,
  getMerchantList: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FillMerchant));
