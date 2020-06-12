import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Button, Card, CardBody, CardHeader, Col, FormGroup, Label, Row,} from 'reactstrap';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import './index.scss';
import 'react-datepicker/dist/react-datepicker.css';
import {Link} from 'react-router-dom';
import Select from 'react-select';
import Pagination from 'react-js-pagination';
import CONST_VARIABLE from '../../../utils/constants';
import ModalCommon from '../../Modal/ModalCommon';
import {convertStatusInternational} from '../../../utils/commonFunction';
import {
  clearListDepartment,
  closeModalChangeStatusDepartment,
  getListDepartment,
  lockOrUnlockDepartment,
  openModalChangeStatusDepartment,
} from '../../../store/actions/system/department';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      perPage: 10,
      fromRow: 0,
      pageSize: 10,
      departCode: '',
      departName: '',
    };
  }

  static getDerivedStateFromProps(props) {
    const {
      listDepartmentManager,
    } = props;

    return {
      listDepartmentManager,
    };
  }

  componentDidMount() {
    const { clearListDepartment, getListDepartment } = this.props;
    const {
      currentPage,
      perPage,
      departCode,
      departName,
    } = this.state;
    clearListDepartment();
    getListDepartment(
      {
        fromRow: currentPage * perPage - perPage,
        pageSize: perPage,
        departCode,
        departName,
      },
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      responseLockOrUnlockDepartment,
      getListDepartment,
    } = this.props;
    const {
      perPage,
      currentPage,
      departCode,
      departName,
    } = this.state;
    if (responseLockOrUnlockDepartment !== prevProps.responseLockOrUnlockDepartment) {
      getListDepartment(
        {
          fromRow: perPage * currentPage - perPage,
          pageSize: perPage,
          departCode,
          departName,
        },
      );
    }
  }

  handlePageChange = (pageNumber) => {
    const { getListDepartment } = this.props;
    const {
      perPage,
      departCode,
      departName,
    } = this.state;

    this.setState({
      currentPage: pageNumber,
    }, () => {
      getListDepartment(
        {
          fromRow: this.state.currentPage * perPage - perPage,
          pageSize: perPage,
          departCode,
          departName,
        },
      );
    });
  };

  handleRowPageChange = (e) => {
    const { getListDepartment } = this.props;
    const {
      departCode,
      departName,
    } = this.state;

    this.setState({
      perPage: e.value,
      currentPage: 1,
    }, () => {
      getListDepartment(
        {
          fromRow: 0,
          pageSize: this.state.perPage,
          departCode,
          departName,
        },
      );
    });
  };

  onHandleSearch = (e) => {
    e.preventDefault();
    const { getListDepartment } = this.props;
    const {
      currentPage,
      perPage,
      departCode,
      departName,
    } = this.state;

    getListDepartment(
      {
        fromRow: currentPage * perPage - perPage,
        pageSize: perPage,
        departCode,
        departName,
      },
    );
  };

  moveToEditPage = (id) => {
    const { history } = this.props;
    if (id) {
      window.localStorage.setItem('ID_DEPARTMENT_BRANCH', window.btoa(JSON.stringify(id)));
      history.push({
        pathname: '/system/branch/edit',
      });
    }
  };

  onChangeMerchantCode = (e) => {
    this.setState({
      departCode: e.target.value,
    });
  };

  onChangeMerchantName = (e) => {
    this.setState({
      departName: e.target.value,
    });
  };

  render() {
    const {
      currentPage,
      perPage,
      departCode,
      departName,
      listDepartmentManager,
    } = this.state;

    const {
      openModalChangeStatusDepartment,
      closeModalChangeStatusDepartment,
      isOpenModalDepartment,
      dataChangeStatus,
      lockOrUnlockDepartment,
    } = this.props;
    const sortResData = listDepartmentManager
      && listDepartmentManager.data && listDepartmentManager.data.length > 0
      ? listDepartmentManager.data : null;
    const totalRow = listDepartmentManager
    && listDepartmentManager.totalRow ? listDepartmentManager.totalRow : 0;
    const showingOption = `Hiển thị ${currentPage * perPage - perPage + 1}
    - ${(currentPage * perPage) > totalRow ? totalRow : (currentPage * perPage)} của ${totalRow} bản ghi`;
    const notifyModal = {
      title: 'Thông báo',
      content: 'Bạn chắc chắn thay đổi trạng thái chi nhánh?',
      button: 'Thay đổi',
    };

    return (
      <Form>
        <div className="animated fadeIn fee-table" style={{ background: 'white' }}>
          <Card>
            <CardHeader>
              <span className="text-bold">Quản lý chi nhánh - Danh sách</span>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <Col lg="2" className="label-left">
                      <Label htmlFor="code">Mã chi nhánh:</Label>
                    </Col>
                    <Col lg="4">
                      <Input
                        className="form-control"
                        type="text"
                        onChange={this.onChangeMerchantCode}
                        value={departCode}
                      />
                    </Col>
                    <Col lg="2" className="label-left">
                      <Label htmlFor="code">Tên chi nhánh:</Label>
                    </Col>
                    <Col lg="4">
                      <Input
                        className="form-control"
                        type="text"
                        onChange={this.onChangeMerchantName}
                        value={departName}
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
                    <Link to="/system/branch/add">
                      <Button className="icon-search btn btn-primary">
                        <i className="fa fa-plus mr-1" />
                        Thêm mới
                      </Button>
                    </Link>
                  </div>
                </div>
              </Row>
              <div className="fee-table_table w-100">
                <table className="fee-table__table">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>#ID</th>
                      <th>Mã chi nhánh</th>
                      <th>Tên chi nhánh</th>
                      <th>Trạng thái</th>
                      <th>Ngày tạo</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    { sortResData !== null
                      ? sortResData.map((item, index) => (
                        <tr key={index}>
                          <td>{(currentPage - 1) * perPage + index + 1}</td>
                          <td>{item.departId}</td>
                          <td>{item.departCode}</td>
                          <td>{item.departName}</td>
                          <td>{convertStatusInternational(item.status)}</td>
                          <td>{item.createdDate}</td>
                          <td className="icon-fee text-center">
                            <Button onClick={() => this.moveToEditPage(item.departCode)}>
                              <i className="icon-note" />
                            </Button>
                            {item.status === -1 ? (
                              <Button onClick={() => openModalChangeStatusDepartment(
                                { departCode: item.departCode, status: 1 },
                              )}
                              >
                                <i className="icon-lock-open" />
                              </Button>
                            ) : (
                              <Button onClick={() => openModalChangeStatusDepartment(
                                { departCode: item.departCode, status: -1 },
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
                    isOpen={isOpenModalDepartment}
                    onClickToCloseModal={closeModalChangeStatusDepartment}
                    data={dataChangeStatus}
                    clickToButtonInMoDal={lockOrUnlockDepartment}
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
  listDepartmentManager: state.department.listDepartmentManager,
  isOpenModalDepartment: state.department.isOpenModalDepartment,
  dataChangeStatus: state.department.dataChangeStatus,
  responseLockOrUnlockDepartment: state.department.responseLockOrUnlockDepartment,
});

const mapDispatchToProps = (dispatch) => ({
  getListDepartment: (data) => dispatch(getListDepartment(data)),
  openModalChangeStatusDepartment: (data) => dispatch(openModalChangeStatusDepartment(data)),
  closeModalChangeStatusDepartment: () => dispatch(closeModalChangeStatusDepartment()),
  lockOrUnlockDepartment: (data) => dispatch(lockOrUnlockDepartment(data)),
  clearListDepartment: () => dispatch(clearListDepartment()),
});


Index.propTypes = {
  getListDepartment: PropTypes.func,
  clearListDepartment: PropTypes.func,
  history: PropTypes.object,
};

Index.defaultProps = {
  getListDepartment: () => {},
  clearListDepartment: () => {},
  history: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
