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
  clearListInteriorMcc,
  closeModalChangeStatusInteriorMcc,
  getListInteriorMcc,
  lockOrUnlockInteriorMcc,
  openModalChangeStatusInteriorMcc,
} from '../../../store/actions/system/interiorMcc';
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
    };
  }

  static getDerivedStateFromProps(props) {
    const {
      listMccInteriorManager,
    } = props;

    return {
      listMccInteriorManager,
    };
  }

  componentDidMount() {
    const { clearListInteriorMcc, getListInteriorMcc } = this.props;
    const {
      currentPage,
      perPage,
      merchantCode,
      merchantName,
    } = this.state;
    clearListInteriorMcc();
    getListInteriorMcc(
      {
        fromRow: currentPage * perPage - perPage,
        pageSize: perPage,
        typeCode: merchantCode,
        brandName: merchantName,
      },
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      responseLockOrUnlockMcc,
      getListInteriorMcc,
      statusIMCC
    } = this.props;
    const {
      perPage,
      currentPage,
      merchantCode,
      merchantName,
    } = this.state;
    if (responseLockOrUnlockMcc !== prevProps.responseLockOrUnlockMcc) {
      getListInteriorMcc(
        {
          fromRow: perPage * currentPage - perPage,
          pageSize: perPage,
          typeCode: merchantCode,
          brandName: merchantName,
        },
      );
    }
    if (statusIMCC !== prevProps.statusIMCC) {
      if (responseLockOrUnlockMcc.code === CONST_STATUS_CODE_SUCCESS) {
        if (statusIMCC === CONST_LOCK_SUCCESS) {
          messageSuccess('Khóa MCC nội địa thành công');
        } else {
          messageSuccess('Mở khóa MCC nội địa thành công');
        }
      }
    }
  }

  handlePageChange = (pageNumber) => {
    const { getListInteriorMcc } = this.props;
    const {
      perPage,
      merchantCode,
      merchantName,
    } = this.state;

    this.setState({
      currentPage: pageNumber,
    }, () => {
      getListInteriorMcc(
        {
          fromRow: this.state.currentPage * perPage - perPage,
          pageSize: perPage,
          typeCode: merchantCode,
          brandName: merchantName,
        },
      );
    });
  };

  handleRowPageChange = (e) => {
    const { getListInteriorMcc } = this.props;
    const {
      merchantCode,
      merchantName,
    } = this.state;

    this.setState({
      perPage: e.value,
      currentPage: 1,
    }, () => {
      getListInteriorMcc(
        {
          fromRow: 0,
          pageSize: this.state.perPage,
          typeCode: merchantCode,
          brandName: merchantName,
        },
      );
    });
  };

  onHandleSearch = (e) => {
    e.preventDefault();
    const { getListInteriorMcc } = this.props;
    const {
      currentPage,
      perPage,
      merchantCode,
      merchantName,
    } = this.state;

    getListInteriorMcc(
      {
        fromRow: currentPage * perPage - perPage,
        pageSize: perPage,
        typeCode: merchantCode,
        brandName: merchantName,
      },
    );
  };

  moveToEditPage = (id) => {
    const { history } = this.props;
    if (id) {
      window.localStorage.setItem('ID_MCC_INTERIOR_MANAGER', window.btoa(JSON.stringify(id)));
      history.push({
        pathname: '/system/interior-mcc/edit',
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
      listMccInteriorManager,
    } = this.state;

    const {
      openModalChangeStatusInteriorMcc,
      closeModalChangeStatusInteriorMcc,
      isOpenModalMcc,
      dataChangeStatus,
      lockOrUnlockInteriorMcc,
    } = this.props;
    const sortResData = listMccInteriorManager
      && listMccInteriorManager.data && listMccInteriorManager.data.length > 0
      ? listMccInteriorManager.data : null;
    const totalRow = listMccInteriorManager
    && listMccInteriorManager.totalRow ? listMccInteriorManager.totalRow : 0;
    const showingOption = `Hiển thị ${currentPage * perPage - perPage + 1}
    - ${(currentPage * perPage) > totalRow ? totalRow : (currentPage * perPage)} của ${totalRow} bản ghi`;
    const notifyModal = {
      title: 'Thông báo',
      content: 'Bạn chắc chắn thay đổi trạng thái MCC nội địa?',
      button: 'Thay đổi',
    };

    return (
      <Form>
        <div className="animated fadeIn fee-table" style={{ background: 'white' }}>
          <Card>
            <CardHeader>
              <span className="text-bold">Quản lý MCC nội địa - Danh sách</span>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <Col lg="2" className="label-left">
                      <Label htmlFor="code">Mã Mcc nội địa:</Label>
                    </Col>
                    <Col lg="4">
                      <Input
                        className="form-control"
                        type="text"
                        onChange={this.onChangeMerchantCode}
                        value={merchantCode}
                      />
                    </Col>
                    <Col lg="2" className="label-left">
                      <Label htmlFor="code">Tên Mcc nội địa:</Label>
                    </Col>
                    <Col lg="4">
                      <Input
                        className="form-control"
                        type="text"
                        onChange={this.onChangeMerchantName}
                        value={merchantName}
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
                    <Link to="/system/interior-mcc/add">
                      <Button className="icon-search btn btn-primary">
                        <i className="fa fa-plus mr-1" />
                        Thêm mới
                      </Button>
                    </Link>
                  </div>
                </div>
              </Row>
              <div className="fee-table_table w-100 overflow-auto">
                <table className="fee-table__table">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Mã Mcc nội địa</th>
                      <th>Tên Mcc nội địa</th>
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
                              <Button onClick={() => openModalChangeStatusInteriorMcc(
                                { typeCode: item.typeCode, status: 1 },
                              )}
                              >
                                <i className="icon-lock-open" />
                              </Button>
                            ) : (
                              <Button onClick={() => openModalChangeStatusInteriorMcc(
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
                    onClickToCloseModal={closeModalChangeStatusInteriorMcc}
                    data={dataChangeStatus}
                    clickToButtonInMoDal={lockOrUnlockInteriorMcc}
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
  listMccInteriorManager: state.interiorMcc.listMccInteriorManager,
  isOpenModalMcc: state.interiorMcc.isOpenModalMcc,
  dataChangeStatus: state.interiorMcc.dataChangeStatus,
  responseLockOrUnlockMcc: state.interiorMcc.responseLockOrUnlockMcc,
  statusIMCC: state.interiorMcc.statusIMCC
});

const mapDispatchToProps = (dispatch) => ({
  getListInteriorMcc: (data) => dispatch(getListInteriorMcc(data)),
  openModalChangeStatusInteriorMcc: (data) => dispatch(openModalChangeStatusInteriorMcc(data)),
  closeModalChangeStatusInteriorMcc: () => dispatch(closeModalChangeStatusInteriorMcc()),
  lockOrUnlockInteriorMcc: (data) => dispatch(lockOrUnlockInteriorMcc(data)),
  clearListInteriorMcc: () => dispatch(clearListInteriorMcc()),
});


Index.propTypes = {
  getListInteriorMcc: PropTypes.func,
  clearListInteriorMcc: PropTypes.func,
  history: PropTypes.object,
};

Index.defaultProps = {
  getListInteriorMcc: () => {},
  clearListInteriorMcc: () => {},
  history: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
