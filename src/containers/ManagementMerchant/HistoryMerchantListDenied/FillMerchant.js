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
import {getMerchantCodeName, getMerchantListDenied} from '../../../store/actions/masterMerchant/masterMerchant';

class FillMerchant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listMccInternational: [],
      listAllUser: [],
      fromDate: moment().subtract(3, 'days').toDate(),
      toDate: new Date(),
      fromRow: 0,
      pageSize: 10,
      errorTime: '',
      data: {
        merchantCode: '',
        merchantType: 0,
        processUser: '',
        idDenied: 0,
        merchantBrand: '',
        type: '1',
      },
    };
  }

  componentDidMount() {
    const {
      getMerchantListDenied,
    } = this.props;
    this.getListSelectBox();
    setTimeout(() => {
      const searchParams = sessionStorage.getItem('searchParams');
      const data = JSON.parse(searchParams);
      let newData = {};
      if (searchParams && data.merchantListHistoryDenied) {
        newData = {
          data: {
            ...data.merchantListHistoryDenied.data,
            merchantCode: data.merchantListHistoryDenied.data.merchantCode.value || '',
            merchantType: data.merchantListHistoryDenied.data.merchantType.value || '',
            processUser: data.merchantListHistoryDenied.data.processUser.value || '',
            idDenied: data.merchantListHistoryDenied.data.idDenied.value || '',
          },
          fromRow: data.merchantListHistoryDenied.fromRow,
          pageSize: data.merchantListHistoryDenied.pageSize,
          fromDate: data.merchantListHistoryDenied.fromDate,
          toDate: data.merchantListHistoryDenied.toDate,
        };
      }

      const sendData = {
        fromDate: moment().subtract(3, 'days').format('DD/MM/YYYY HH:mm:ss'),
        toDate: moment(new Date()).format('DD/MM/YYYY HH:mm:ss'),
        fromRow: 0,
        pageSize: 10,
        data: {
          merchantCode: '',
          merchantType: 0,
          processUser: '',
          idDenied: 0,
          merchantBrand: '',
          type: '1',
        },
      };

      if (searchParams && data.merchantListHistoryDenied) {
        this.setState({
          data: data.merchantListHistoryDenied.data,
          fromDate: new Date(moment(data.merchantListHistoryDenied.fromDate, 'DD/MM/YYYY 00:00:00')),
          toDate: new Date(moment(data.merchantListHistoryDenied.toDate, 'DD/MM/YYYY 00:00:00')),
          fromRow: data.merchantListHistoryDenied.fromRow,
          pageSize: data.merchantListHistoryDenied.pageSize,
        });
        getMerchantListDenied(newData);
      } else {
        getMerchantListDenied(sendData);
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

  onChangeDeniedUser = (e) => {
    if (e.value === '00') {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          processUser: '',
        },
      });
    } else {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          processUser: e,
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
          idDenied: '',
        },
      });
    } else {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          idDenied: e,
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
    const listDeniedApproved = JSON.parse(localStorage && localStorage.getItem('DENIED_APPROVE'));
    const listAllUser = JSON.parse(localStorage && localStorage.getItem('LIST_ALL_USER'));

    const updateListMccInternational = [{ value: '', label: 'Tất cả' }];
    if (listMccInternational) {
      for (let i = 0; i < listMccInternational.length; i += 1) {
        updateListMccInternational.push({
          value: listMccInternational[i].id,
          label: `${listMccInternational[i].typeCode} - ${listMccInternational[i].brandName}`,
        });
      }
    }

    const updateDeniedApproved = [{ value: '', label: 'Tất cả' }];
    if (listDeniedApproved) {
      for (let i = 0; i < listDeniedApproved.length; i += 1) {
        updateDeniedApproved.push({
          value: listDeniedApproved[i].code,
          label: `${listDeniedApproved[i].description}`,
        });
      }
    }

    const updateListAllUser = [{ value: '', label: 'Tất cả' }];
    if (listAllUser) {
      for (let i = 0; i < listAllUser.length; i += 1) {
        updateListAllUser.push({
          value: listAllUser[i].userName,
          label: `${listAllUser[i].userName}`,
        });
      }
    }

    this.setState({
      listMccInternational: updateListMccInternational,
      listDeniedApproved: updateDeniedApproved,
      listAllUser: updateListAllUser,
    });
  }

  onHandleSearch = (e) => {
    e.preventDefault();
    const {
      getMerchantListDenied,
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
    newData.processUser = newData.processUser.value || '';
    newData.idDenied = newData.idDenied.value || '';

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
      merchantListHistoryDenied: storedData,
    }));
    this.props.changeSearch();
    getMerchantListDenied(dataSearch);
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
      listMccInternational, listMerchantCodeName, listAllUser, listDeniedApproved, errorTime,
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
            <FormGroup row>
              <Col lg="6" className="label-left">
                <Label htmlFor="code">{Constants.MnMerchant.deniedUser}</Label>
              </Col>
              <Col lg="6">
                <Select
                  value={data.processUser}
                  onChange={this.onChangeDeniedUser}
                  options={listAllUser}
                  placeholder="Tất cả"
                />
              </Col>
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup row>
              <Col lg="6" className="label-left">
                <Label htmlFor="code">{Constants.MnMerchant.reason}</Label>
              </Col>
              <Col lg="6">
                <Select
                  value={data.idDenied}
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
});

const mapDispatchToProps = (dispatch) => ({
  getMerchantCodeName: (data) => dispatch(getMerchantCodeName(data)),
  getMerchantListDenied: (data) => dispatch(getMerchantListDenied(data)),
});

FillMerchant.defaultProps = {
  getMerchantCodeName: () => {},
  listMerchantCodeName: [],
  getMerchantListDenied: () => {},
  getExcelFileDenied: () => {},
};

FillMerchant.propTypes = {
  getMerchantCodeName: PropTypes.func,
  listMerchantCodeName: PropTypes.array,
  getMerchantListDenied: PropTypes.func,
  getExcelFileDenied: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FillMerchant));
