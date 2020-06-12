/* eslint-disable no-nested-ternary */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Button} from 'reactstrap';
import {withRouter} from 'react-router-dom';
import ModalCommon from '../../Modal/ModalCommon';
import {
  changeStatusLocalAccount,
  closeLocalAccountModal,
  openLocalAccountModal,
} from '../../../store/actions/LocalUserManagementAction/ListPageAction';
import {convertBranchCode, renderUIStatusAuthen} from '../../../utils/commonFunction';
import {messageSuccess} from '../../../utils';

const CONST_LOCK_SUCCESS = 2;
const CONST_STATUS_CODE_SUCCESS = '00';
// eslint-disable-next-line react/prefer-stateless-function
class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
    };
  }

  moveToEditPage = (id) => {
    const { history } = this.props;
    localStorage.setItem('LOCAL_USER_ID', id);
    history.push({
      pathname: '/system/user/updateInfo',
      state: { idUser: id },
    });
  }

  moveToResetPasswordPage = (id) => {
    const { history } = this.props;
    localStorage.setItem('LOCAL_USER_ID', id);
    history.push({
      pathname: '/system/user/resetPassword',
      state: { idUser: id },
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { isChangeStatusLocalAccountSuccess } = this.props;
    if (isChangeStatusLocalAccountSuccess !== prevProps.isChangeStatusLocalAccountSuccess) {
      if (isChangeStatusLocalAccountSuccess.code === CONST_STATUS_CODE_SUCCESS) {
        if (isChangeStatusLocalAccountSuccess.status === CONST_LOCK_SUCCESS) {
          messageSuccess('Khóa tài khoản local thành công');
        } else {
          messageSuccess('Mở khóa tài khoản local thành công');
        }
      }
    }
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const {
      resDataListPage, openChangeStatusAccountModal, closeChangeStatusAccountModal,
      changeStatusAccount, isOpenChangeStatusAccountModal, dataChangeStatusLocalAccount,
      currentPage, perPage,
    } = this.props;

    const { isActive } = this.state;

    const notifyModal = {
      title: 'Thông báo',
      content: !isActive ? 'Bạn có muốn đóng tài khoản này không?' : 'Bạn có muốn đưa tài khoản này hoạt động trở lại không?',
      button: 'Đồng ý',
    };

    const totalRow = resDataListPage ? (resDataListPage && resDataListPage.totalRow) : 0;
    const roles = JSON.parse(localStorage.getItem('ALL_ROLES'));

    if (resDataListPage) {
      resDataListPage.data.forEach((user, index) => {
        resDataListPage.data[index].departmentCodeRoles = roles.length > 0 && roles.filter((role) => role.roleId === user.roleId)[0].name;
      });
    }

    return (
      <div className="fee-table_table w-100 overflow-auto">
        <div className="text-bold mb-2">
          Tổng số thành viên:
          {' '}
          {totalRow}
        </div>
        <table className="fee-table__table">
          <thead>
            <tr>
              <th className="text-center">STT</th>
              <th>Tên đăng nhập</th>
              <th>Họ tên</th>
              <th>Email</th>
              <th>Chi nhánh</th>
              <th>Phân quyền</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {(resDataListPage && resDataListPage.data) !== null
              ? resDataListPage && resDataListPage.data && resDataListPage.data.map((item, index) => (
                <tr key={item.username}>
                  <td>{(currentPage - 1) * perPage + index + 1}</td>
                  <td>{item.username}</td>
                  <td>{item.fullName}</td>
                  <td>{item.email}</td>
                  <td>{convertBranchCode(item.departmentCode)}</td>
                  <td>{item.departmentCodeRoles}</td>
                  <td>{renderUIStatusAuthen(item && item.status)}</td>
                  <td className="icon-fee text-center">
                    <Button title="Chỉnh sửa" onClick={() => this.moveToEditPage(item.userId)}>
                      <i className="icon-note" />
                    </Button>
                    <Button
                      title="Cập nhật trạng thái"
                      onClick={() => {
                        this.setState({
                          isActive: item.status === 2,
                        });
                        openChangeStatusAccountModal({
                          username: item.username, status: item.status,
                        });
                      }}
                    >
                      <i className={item.status === 2 ? 'icon-lock-open' : 'icon-lock'} />
                    </Button>
                    <Button title="Đặt lại mật khẩu" onClick={() => this.moveToResetPasswordPage(item.userId)}>
                      <i className="icon-refresh" />
                    </Button>

                  </td>
                </tr>
              )) : null}
          </tbody>
        </table>
        {((resDataListPage && resDataListPage.data && resDataListPage.data.length === 0) || (resDataListPage && resDataListPage.data === null)) ? <div className="empty-row">Không tồn tại danh sách theo yêu cầu</div> : null}
        <ModalCommon
          notifyModal={notifyModal}
          isOpen={isOpenChangeStatusAccountModal}
          onClickToCloseModal={closeChangeStatusAccountModal}
          data={dataChangeStatusLocalAccount}
          clickToButtonInMoDal={changeStatusAccount}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  resDataListPage: state.ListPage.resDataListPage,
  isOpenChangeStatusAccountModal: state.ListPage.isOpenChangeStatusAccountModal,
  dataChangeStatusLocalAccount: state.ListPage.dataChangeStatusLocalAccount,
  isChangeStatusLocalAccountSuccess: state.ListPage.isChangeStatusLocalAccountSuccess
});

const mapDispatchToProps = (dispatch) => ({
  openChangeStatusAccountModal: (data) => dispatch(openLocalAccountModal(data)),
  closeChangeStatusAccountModal: () => dispatch(closeLocalAccountModal()),
  changeStatusAccount: (data) => dispatch(changeStatusLocalAccount(data)),
});

Table.propTypes = {
  resDataListPage: PropTypes.object,
  history: PropTypes.object,
  openChangeStatusAccountModal: PropTypes.func,
  closeChangeStatusAccountModal: PropTypes.func,
  changeStatusAccount: PropTypes.func,
  isOpenChangeStatusAccountModal: PropTypes.bool,
  dataChangeStatusLocalAccount: PropTypes.object,
  currentPage: PropTypes.number,
  perPage: PropTypes.number,
};

Table.defaultProps = {
  resDataListPage: {},
  history: {},
  openChangeStatusAccountModal: () => {
  },
  closeChangeStatusAccountModal: () => {
  },
  changeStatusAccount: () => {
  },
  isOpenChangeStatusAccountModal: false,
  dataChangeStatusLocalAccount: null,
  currentPage: 0,
  perPage: 0,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Table));
