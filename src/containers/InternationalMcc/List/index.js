import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Button, Card, CardBody, CardHeader, Col, FormGroup, Label, Row,} from 'reactstrap';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import './index.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {Link} from 'react-router-dom';
import Select from 'react-select';
import Pagination from 'react-js-pagination';
import moment from 'moment';
import CONST_VARIABLE from '../../../utils/constants';
import Constants from '../../ManagementMerchant/Constants';
import ModalCommon from '../../Modal/ModalCommon';
import {convertStatusInternational} from '../../../utils/commonFunction';
import {
  clearListInternationalMcc,
  closeModalChangeStatusInternationalMcc,
  getListInternationalMcc,
  lockOrUnlockInternationalMcc,
  openModalChangeStatusInternationalMcc,
} from '../../../store/actions/system/internationalMcc';
import {messageSuccess} from '../../../utils';

const CONST_LOCK_SUCCESS = 1;
const CONST_STATUS_CODE_SUCCESS = '00';
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      perPage: 10,
      fromRow: 0,
      pageSize: 10,
      merchantCode: '',
      merchantName: '',
      fromDate: new Date(),
      toDate: new Date(),
      errorTime: '',
    };
  }

  static getDerivedStateFromProps(props) {
    const {
      listMccInternationalManager,
      dataChangeStatus
    } = props;

    return {
      listMccInternationalManager,
      dataChangeStatus
    };
  }

  componentDidMount() {
    const {
      clearListInternationalMcc,
      getListInternationalMcc,
    } = this.props;
    clearListInternationalMcc();
    const {
      perPage,
      currentPage,
      fromDate,
      toDate,
      merchantCode,
      merchantName,
    } = this.state;
    getListInternationalMcc(
      {
        fromRow: perPage * currentPage - perPage,
        pageSize: perPage,
        fromDate: moment(fromDate).format('DD/MM/YYYY 00:00:00'),
        toDate: moment(toDate).format('DD/MM/YYYY 23:59:59'),
        data: {
          typeCode: merchantCode,
          brandName: merchantName,
        },
        online: true,
      },
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      responseLockOrUnlockMcc,
      getListInternationalMcc,
      statusMCC
    } = this.props;
    const {
      perPage,
      currentPage,
      fromDate,
      toDate,
      merchantCode,
      merchantName,
    } = this.state;
    if (statusMCC !== prevProps.statusMCC) {
      if (responseLockOrUnlockMcc.code === CONST_STATUS_CODE_SUCCESS) {
        if (statusMCC === CONST_LOCK_SUCCESS) {
          messageSuccess('Khóa MCC quốc tế thành công');
        } else {
          messageSuccess('Mở khóa MCC quốc tế thành công');
        }
      }
    }
    if (responseLockOrUnlockMcc !== prevProps.responseLockOrUnlockMcc) {
      getListInternationalMcc(
        {
          fromRow: perPage * currentPage - perPage,
          pageSize: perPage,
          fromDate: moment(fromDate).format('DD/MM/YYYY 00:00:00'),
          toDate: moment(toDate).format('DD/MM/YYYY 23:59:59'),
          data: {
            typeCode: merchantCode,
            brandName: merchantName,
          },
          online: true,
        },
      );
    }

  }

  handlePageChange = (pageNumber) => {
    const { getListInternationalMcc } = this.props;
    const {
      perPage,
      merchantCode,
      merchantName,
      fromDate,
      toDate,
    } = this.state;

    this.setState({
      currentPage: pageNumber,
    }, () => {
      getListInternationalMcc(
        {
          fromRow: this.state.currentPage * perPage - perPage,
          pageSize: perPage,
          fromDate: moment(fromDate).format('DD/MM/YYYY 00:00:00'),
          toDate: moment(toDate).format('DD/MM/YYYY 23:59:59'),
          data: {
            typeCode: merchantCode,
            brandName: merchantName,
          },
          online: true,
        },
      );
    });
  };

  handleRowPageChange = (e) => {
    const { getListInternationalMcc } = this.props;
    const {
      merchantCode,
      merchantName,
      fromDate,
      toDate,
    } = this.state;

    this.setState({
      perPage: e.value,
      currentPage: 1,
    }, () => {
      getListInternationalMcc(
        {
          fromRow: 0,
          pageSize: this.state.perPage,
          fromDate: moment(fromDate).format('DD/MM/YYYY 00:00:00'),
          toDate: moment(toDate).format('DD/MM/YYYY 23:59:59'),
          data: {
            typeCode: merchantCode,
            brandName: merchantName,
          },
          online: true,
        },
      );
    });
  };

  onHandleSearch = (e) => {
    e.preventDefault();
    const { getListInternationalMcc } = this.props;
    const {
      currentPage,
      perPage,
      merchantCode,
      merchantName,
      fromDate,
      toDate,
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

    getListInternationalMcc(
      {
        fromRow: currentPage * perPage - perPage,
        pageSize: perPage,
        fromDate: moment(fromDate).format('DD/MM/YYYY 00:00:00'),
        toDate: moment(toDate).format('DD/MM/YYYY 23:59:59'),
        data: {
          typeCode: merchantCode,
          brandName: merchantName,
        },
        online: true,
      },
    );
  };

  moveToEditPage = (id) => {
    const { history } = this.props;
    if (id) {
      window.localStorage.setItem('ID_MCC_MANAGER', window.btoa(JSON.stringify(id)));
      history.push({
        pathname: '/system/international-mcc/edit',
      });
    }
  };

  handleChangeFromDate = (startDate) => {
    if (startDate) {
      this.setState({
        fromDate: startDate,
      });
    }
  };

  handleChangeToDate = (endDate) => {
    if (endDate) {
      this.setState({
        toDate: endDate,
      });
    }
  };

  onChangeMerchantCode = (e) => {
    this.setState({
      merchantCode: e.target.value,
    });
  };

  onChangeMerchantName = (e) => {
    this.setState({
      merchantName: e.target.value,
    });
  };

  render() {
    const {
      currentPage,
      perPage,
      merchantCode,
      merchantName,
      fromDate,
      toDate,
      listMccInternationalManager,
      errorTime,
    } = this.state;

    const {
      openModalChangeStatusInternationalMcc,
      closeModalChangeStatusInternationalMcc,
      isOpenModalMcc,
      dataChangeStatus,
      lockOrUnlockInternationalMcc,
    } = this.props;
    const sortResData = listMccInternationalManager
      && listMccInternationalManager.data && listMccInternationalManager.data.length > 0
      ? listMccInternationalManager.data : null;
    const totalRow = listMccInternationalManager
    && listMccInternationalManager.totalRow ? listMccInternationalManager.totalRow : 0;
    const showingOption = `Hiển thị ${currentPage * perPage - perPage + 1}
    - ${(currentPage * perPage) > totalRow ? totalRow : (currentPage * perPage)} của ${totalRow} bản ghi`;
    const notifyModal = {
      title: 'Thông báo',
      content: 'Bạn chắc chắn thay đổi trạng thái MCC quốc tế?',
      button: 'Thay đổi',
    };

    return (
      <Form>
        <div className="animated fadeIn fee-table" style={{ background: 'white' }}>
          <Card>
            <CardHeader>
              <span className="text-bold">Quản lý MCC quốc tế - Danh sách</span>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md="6">
                  <FormGroup row>
                    <Col lg="6" className="label-left">
                      <Label htmlFor="code">Mã Mcc quốc tế:</Label>
                    </Col>
                    <Col lg="6">
                      <Input
                        className="form-control"
                        type="text"
                        onChange={this.onChangeMerchantCode}
                        value={merchantCode}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="6" className="label-left">
                      <Label htmlFor="code">Tên Mcc quốc tế:</Label>
                    </Col>
                    <Col lg="6">
                      <Input
                        className="form-control"
                        type="text"
                        onChange={this.onChangeMerchantName}
                        value={merchantName}
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
                        placeholder="Chọn"
                        selected={fromDate}
                        onChange={this.handleChangeFromDate}
                        className="form-control"
                        dateFormat="dd/MM/yyyy 00:00:00"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="6" className="label-left">
                      <Label htmlFor="code">{Constants.MerchantList.expireDate}</Label>
                    </Col>
                    <Col lg="6">
                      <DatePicker
                        placeholder="Chọn"
                        selected={toDate}
                        onChange={this.handleChangeToDate}
                        className="form-control"
                        dateFormat="dd/MM/yyyy 23:59:59"
                      />
                    </Col>
                  </FormGroup>
                </Col>
                <div className="wrap-button btn-search row" style={{ width: '100%' }}>
                  <div className="col-md-6 text-right">
                    <Button type="submit" className="icon-search btn btn-primary" onClick={this.onHandleSearch}>
                      <i className="fa fa-search mr-1" />
                      Tìm kiếm
                    </Button>
                  </div>
                  <div className="col-md-6 text-left">
                    <Link to="/system/international-mcc/add">
                      <Button className="icon-search btn btn-primary">
                        <i className="fa fa-plus mr-1" />
                        Thêm mới
                      </Button>
                    </Link>
                  </div>
                </div>
              </Row>

              <Col className="text-center">
                <div className="mb-2"><span className="text-danger">{errorTime}</span></div>
              </Col>

              <div className="fee-table_table w-100 overflow-auto">
                <table className="fee-table__table">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Mã Mcc quốc tế</th>
                      <th>Tên Mcc quốc tế</th>
                      <th>Mô tả</th>
                      <th>Ngày tạo</th>
                      <th>Trạng thái</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    { sortResData !== null
                      ? sortResData.map((item, index) => (
                        <tr key={index}>
                          <td>{(currentPage - 1) * perPage + index + 1}</td>
                          <td>{item.typeCode}</td>
                          <td>{item.fullName}</td>
                          <td>{item.description}</td>
                          <td>{item.createdDate}</td>
                          <td>{convertStatusInternational(item.status)}</td>
                          <td className="icon-fee text-center">
                            <Button onClick={() => this.moveToEditPage(item.typeCode)}>
                              <i className="icon-note" />
                            </Button>
                            {item.status === -1 ? (
                              <Button onClick={() => openModalChangeStatusInternationalMcc(
                                { typeCode: item.typeCode, status: 1 },
                              )}
                              >
                                <i className="icon-lock-open" />
                              </Button>
                            ) : (
                              <Button onClick={() => openModalChangeStatusInternationalMcc(
                                { typeCode: item.typeCode, status: -1 },
                              )}
                              >
                                <i className="icon-lock" />
                              </Button>
                            )}

                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={7} style={{ textAlign: 'center' }}>
                            Không tồn tại danh sách theo yêu cầu.
                          </td>
                        </tr>
                      )}
                  </tbody>
                </table>
                <div className="fee-table__pagination">
                  <Row>
                    <Col
                      xl={{
                        size: 6,
                      }}
                      lg={{
                        size: 6,
                      }}
                      md={{
                        size: 6,
                      }}
                      sm={{
                        size: 12,
                      }}
                      xs={{
                        size: 12,
                      }}
                    >
                      <div className="select-perpage">
                        <div className="select-perpage__info">
                          <Select
                            id="LIMIT_DROPDOWN"
                            value={{
                              value: perPage,
                              label: perPage,
                            }}
                            onChange={this.handleRowPageChange}
                            options={CONST_VARIABLE.PAGE_OPTION}
                            className="select-pagination"
                            menuPlacement="top"
                          />
                          <p>
                            {showingOption}
                          </p>
                        </div>
                      </div>
                    </Col>
                    <Col
                      xl={{
                        size: 6,
                      }}
                      lg={{
                        size: 6,
                      }}
                      md={{
                        size: 6,
                      }}
                      sm={{
                        size: 12,
                      }}
                      xs={{
                        size: 12,
                      }}
                    >
                      <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={perPage}
                        totalItemsCount={totalRow}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange}
                      />
                    </Col>
                  </Row>
                  <ModalCommon
                    notifyModal={notifyModal}
                    isOpen={isOpenModalMcc}
                    onClickToCloseModal={closeModalChangeStatusInternationalMcc}
                    data={dataChangeStatus}
                    clickToButtonInMoDal={lockOrUnlockInternationalMcc}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </Form>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  listMccInternationalManager: state.internationalMccManager.listMccInternationalManager,
  isOpenModalMcc: state.internationalMccManager.isOpenModalMcc,
  dataChangeStatus: state.internationalMccManager.dataChangeStatus,
  responseLockOrUnlockMcc: state.internationalMccManager.responseLockOrUnlockMcc,
  statusMCC: state.internationalMccManager.statusMCC
});

const mapDispatchToProps = (dispatch) => ({
  getListInternationalMcc: (data) => dispatch(getListInternationalMcc(data)),
  openModalChangeStatusInternationalMcc: (data) => dispatch(openModalChangeStatusInternationalMcc(data)),
  closeModalChangeStatusInternationalMcc: () => dispatch(closeModalChangeStatusInternationalMcc()),
  lockOrUnlockInternationalMcc: (data) => dispatch(lockOrUnlockInternationalMcc(data)),
  clearListInternationalMcc: () => dispatch(clearListInternationalMcc()),
});


Index.propTypes = {
  getListInternationalMcc: PropTypes.func,
  clearListInternationalMcc: PropTypes.func,
  history: PropTypes.object,
};

Index.defaultProps = {
  getListInternationalMcc: () => {},
  clearListInternationalMcc: () => {},
  history: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
