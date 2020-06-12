/* eslint-disable */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Button, Col, Row,} from 'reactstrap';
import {withRouter,} from 'react-router-dom';
import Select from 'react-select';
import Pagination from 'react-js-pagination';
import CONST_VARIABLE from '../../../utils/constants';
import {
  changeStatusStaff,
  closeModalChangeStatusStaff,
  openModalChangeStatusStaff,
  searchByCurrentPage
} from '../../../store/actions/StaffManagementAction/StaffManagementListAction';
import ModalCommon from '../../Modal/ModalCommon';
import {convertBranchCode} from '../../../utils/commonFunction';
import {messageSuccess} from '../../../utils';

const CONST_LOCK_SUCCESS = 2;
const CONST_STATUS_CODE_SUCCESS = '00';
// eslint-disable-next-line react/prefer-stateless-function
class TableStaff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      perPage: 10,
      isActive: false,
      defaultData: {
        departCode: '',
        fullName: '',
        staffCode: '',
        status: '',
      }
    };
  }

  componentDidMount() {
    const searchParams = JSON.parse(sessionStorage.getItem('searchParams'));
    if (searchParams) {
      this.setState({
        currentPage: searchParams.fromRow / searchParams.pageSize + 1,
        perPage: searchParams.pageSize,
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { isChangeStatusSuccess, searchByCurrentPage , dataSearchStaff, isSearch } = this.props;
    const { perPage, currentPage } = this.state;
    const fromRow = perPage * currentPage - perPage;

    if (isChangeStatusSuccess !== prevProps.isChangeStatusSuccess) {
      searchByCurrentPage(fromRow, perPage, dataSearchStaff);
      if (isChangeStatusSuccess.code == CONST_STATUS_CODE_SUCCESS) {
        if (isChangeStatusSuccess.status === CONST_LOCK_SUCCESS) {
          messageSuccess('Khoá Nhân viên thành công');
        } else {
          messageSuccess('Mở khóa Nhân viên thành công');
        }
      }
    }

    if (isSearch !== prevProps.isSearch) {
      this.setState({
        currentPage: 1,
        perPage: 10,
      });
    }
  }

  handlePageChange = (pageNumber) => {
   const { searchByCurrentPage, dataSearchStaff } = this.props;
   const { perPage, defaultData } = this.state;
    this.setState({
      currentPage: pageNumber,
    }, () => {
      searchByCurrentPage(this.state.currentPage * perPage - perPage, perPage, dataSearchStaff);

      let storedData = JSON.parse(sessionStorage.getItem('searchParams'));
      storedData = {
        ...storedData || defaultData,
        fromRow: perPage * this.state.currentPage - perPage,
        pageSize: perPage,
      };
      sessionStorage.setItem('searchParams', JSON.stringify(storedData));
    });
  }

  handleRowPageChange = (e) => {
    const { searchByCurrentPage, dataSearchStaff } = this.props;
    const { defaultData } = this.state;
    this.setState({
      perPage: e.value,
      currentPage: 1,
    }, () => {
      searchByCurrentPage(0, this.state.perPage, dataSearchStaff);

      let storedData = JSON.parse(sessionStorage.getItem('searchParams'));
      storedData = {
        ...storedData || defaultData,
        fromRow: e.value * this.state.currentPage - e.value,
        pageSize: e.value,
      };
      sessionStorage.setItem('searchParams', JSON.stringify(storedData));
    });
  }

  moveToEditPage = (id) => {
    const { history } = this.props;
    localStorage.setItem('STAFF_USER', id);
    history.push({
      pathname: '/system/staff/update',
      state: { idUser: id },
    });
  }

  render() {
    const { currentPage, perPage, isActive } = this.state;
    const { responseDataStaff, openModalChangeStatusStaff,  closeModalChangeStatusStaff, isOpenStaffModal, changeStatusByStaffCode, changeStatusStaff } = this.props;
    const sortResDataStaff = responseDataStaff && responseDataStaff.data && responseDataStaff.data.length > 0 ? responseDataStaff.data : null;
    const totalRow = responseDataStaff && responseDataStaff.totalRow ? responseDataStaff.totalRow : 0;
    const notifyModal = {
      title: 'Thông báo',
      content: !isActive ? 'Bạn có chắc khóa hoạt động không?' : 'Bạn có chắc mở khóa hoạt động trở lại không?',
      button: 'Đồng ý',
    };
    const showingOption = `Hiển thị ${currentPage * perPage - perPage + 1} - ${(currentPage * perPage) > totalRow ? totalRow : (currentPage * perPage)} của ${totalRow} bản ghi`;

    return (
      <div className="fee-table_table w-100">
        <div className="text-bold mb-2">
          Tổng số nhân viên:
          {' '}
          {totalRow}
        </div>
        <table className="fee-table__table overflow-auto">
          <thead>
          <tr>
            <th className="text-center">STT</th>
            <th>Mã nhân viên</th>
            <th>Họ và tên</th>
            <th>Chi nhánh</th>
            <th>Trạng thái</th>
            <th>Ngày tạo</th>
            <th>Thao tác</th>
          </tr>
          </thead>
          <tbody>
          { sortResDataStaff && sortResDataStaff.length > 0
            ? sortResDataStaff.map((item, index) => (
              <tr key={item.staffId}>
                <td>{(currentPage - 1) * perPage + index + 1}</td>
                <td>{item.staffCode}</td>
                <td>{item.fullName}</td>
                <td>{convertBranchCode(item.departCode)}</td>
                <td>{item.status === 1 ? 'Hoạt động' : 'Đóng'}</td>
                <td>{item.createdDate}</td>
                <td className="icon-fee text-center">
                  <Button title="Cập nhật nhân viên" onClick={() => this.moveToEditPage(item.staffCode)}>
                    <i className="icon-note" />
                  </Button>
                  <Button
                    title="Cập nhật trạng thái nhân viên"
                    onClick={() => {
                      this.setState({
                        isActive: item.status === -1,
                      });
                      openModalChangeStatusStaff({
                        staffCode: item.staffCode, status: item.status,
                      });
                    }}
                  >
                    <i className={item.status === -1 ? 'icon-lock-open' : 'icon-lock'} />
                  </Button>
                </td>
              </tr>
            )) : null}
          </tbody>
        </table>
        {!sortResDataStaff ? <div className="empty-row">Không tồn tại danh sách theo yêu cầu</div> : null}
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
                pageRangeDisplayed={10}
                onChange={this.handlePageChange}
              />
            </Col>
          </Row>
          <ModalCommon
            notifyModal={notifyModal}
            isOpen={isOpenStaffModal}
            onClickToCloseModal={closeModalChangeStatusStaff}
            data={changeStatusByStaffCode}
            clickToButtonInMoDal={changeStatusStaff}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  responseDataStaff: state.staffManagementList.responseDataStaff,
  dataSearchStaff: state.staffManagementList.dataSearchStaff,
  isOpenStaffModal: state.staffManagementList.isOpenStaffModal,
  changeStatusByStaffCode: state.staffManagementList.changeStatusByStaffCode,
  isChangeStatusSuccess: state.staffManagementList.isChangeStatusSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  searchByCurrentPage: (fromRow, pageSize, data) => dispatch(searchByCurrentPage(fromRow, pageSize, data)),
  openModalChangeStatusStaff: (data) => dispatch(openModalChangeStatusStaff(data)),
  closeModalChangeStatusStaff: () => dispatch(closeModalChangeStatusStaff()),
  changeStatusStaff: (data) => dispatch(changeStatusStaff(data))
});


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TableStaff));

TableStaff.propTypes = {
  history: PropTypes.object,
  responseDataStaff:PropTypes.object,
  dataSearchStaff: PropTypes.object,
  searchByCurrentPage: PropTypes.func,
  isOpenStaffModal: PropTypes.bool,
  changeStatusByStaffCode: PropTypes.object,
  isChangeStatusSuccess: PropTypes.object,
  isSearch: PropTypes.bool,
};

TableStaff.defaultProps = {
  resDataListPage: null,
  history: {},
  responseDataStaff: null,
  dataSearchStaff: null,
  searchByCurrentPage: () => {},
  isOpenStaffModal: null,
  changeStatusByStaffCode: null,
  isChangeStatusSuccess: null,
  isSearch: false,
};
