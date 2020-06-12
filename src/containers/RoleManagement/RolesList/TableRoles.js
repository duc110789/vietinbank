/* eslint-disable */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Button,} from 'reactstrap';
import {withRouter,} from 'react-router-dom';
import ModalCommon from '../../Modal/ModalCommon';
// eslint-disable-next-line react/prefer-stateless-function
import {
  changeStatusRole,
  closeModalChangeRole,
  openModalChangeRole
} from '../../../store/actions/RoleManagementAction/ListRoleAction'
import {messageSuccess} from '../../../utils';

const CONST_LOCK_SUCCESS = 2;
const CONST_STATUS_CODE_SUCCESS = '00';
class TableStaff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
    };
  }

  moveToDetailPage = (id) => {
    const { history } = this.props;
    localStorage.setItem('GROUP_ID_ROLES', id);
    history.push({
      pathname: '/system/roles/detail',
    });
  }

  moveToEditPage = (id) => {
    const { history } = this.props;
    localStorage.setItem('GROUP_ID_ROLES', id);
    history.push({
      pathname: '/system/roles/edit',
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { isChangeStatusRolesSuccess, history } = this.props;
    if (isChangeStatusRolesSuccess !== prevProps.isChangeStatusRolesSuccess) {
      if (isChangeStatusRolesSuccess.code == CONST_STATUS_CODE_SUCCESS) {
        if(isChangeStatusRolesSuccess.status === CONST_LOCK_SUCCESS){
          messageSuccess('Khóa nhóm quyền local thành công');
        }else{
          messageSuccess('Mở khóa nhóm quyền local thành công');
        }
      }
    }
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { resDataRoleGroup, isOpenModalRole, openModalChangeRole, closeModalChangeRole, changeStatusRole, dataChangeStatusRole, currentPage, perPage, } = this.props;

    const { isActive } = this.state;

    const notifyModal = {
      title: 'Thông báo',
      content: !isActive ? 'Bạn chắc chắn tạm khóa hoạt động nhóm quyền?'
        : 'Bạn chắc chắn mở khóa hoạt động nhóm quyền?',
      button: 'Đồng ý',
    };

    return (
      <div className="fee-table_table w-100 overflow-auto">
        <table className="fee-table__table">
          <thead>
          <tr>
            <th className="text-center">STT</th>
            <th>Tên mức quyền</th>
            <th>Mô tả</th>
            <th>Thời gian</th>
            <th>Thao tác</th>
          </tr>
          </thead>
          <tbody>
          { (resDataRoleGroup && resDataRoleGroup.data) !== null
            ? resDataRoleGroup && resDataRoleGroup.data.map((item, index) => (
              <tr key={item.groupId}>
                <td>{(currentPage - 1) * perPage + index + 1}</td>
                <td>{item.groupName}</td>
                <td>{item.description}</td>
                <td>{item.createDate}</td>
                <td className="icon-fee text-center">
                  <Button onClick={() => this.moveToDetailPage(item.groupId)} title="Xem chi tiết quyền">
                    <i className="icon-info" />
                  </Button>
                  <Button onClick={() => this.moveToEditPage(item.groupId)} title="Cập nhật thông tin quyền">
                    <i className="icon-note" />
                  </Button>
                  <Button
                    title="Cập nhật trạng thái"
                    onClick={() => {
                      this.setState({
                        isActive: item.status === 2,
                      });
                      openModalChangeRole({
                        groupId: item.groupId, status: item.status,
                      });
                    }}
                  >
                    <i className={item.status === 2 ? 'icon-lock-open' : 'icon-lock'} />
                  </Button>
                </td>
              </tr>
            )) : null}
          </tbody>
        </table>
        {((resDataRoleGroup && resDataRoleGroup.data && resDataRoleGroup.data.length === 0)
          || (resDataRoleGroup && resDataRoleGroup.data === null))
          ? <div className="empty-row">Không tồn tại danh sách theo yêu cầu</div>
          : null}
        <ModalCommon
          notifyModal={notifyModal}
          isOpen={isOpenModalRole}
          onClickToCloseModal={closeModalChangeRole}
          data={dataChangeStatusRole}
          clickToButtonInMoDal={changeStatusRole}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  resDataRoleGroup: state.ListRole.resDataRoleGroup,
  isOpenModalRole: state.ListRole.isOpenModalRole,
  dataChangeStatusRole: state.ListRole.dataChangeStatusRole,
  isChangeStatusRolesSuccess: state.ListRole.isChangeStatusRolesSuccess
});

const mapDispatchToProps = (dispatch) => ({
  openModalChangeRole: (data) => dispatch(openModalChangeRole(data)),
  closeModalChangeRole: () => dispatch(closeModalChangeRole()),
  changeStatusRole: (data) => dispatch(changeStatusRole(data)),

});

TableStaff.propTypes = {
  resDataRoleGroup: PropTypes.object,
  isOpenModalRole: PropTypes.bool,
  openModalChangeRole: PropTypes.func,
  closeModalChangeRole: PropTypes.func,
  changeStatusRole: PropTypes.func,
  dataChangeStatusRole: PropTypes.object,
  currentPage: PropTypes.number,
  perPage: PropTypes.number,
};

TableStaff.defaultProps = {
  resDataRoleGroup: null,
  isOpenModalRole: false,
  openModalChangeRole: () => {},
  closeModalChangeRole: () => {},
  changeStatusRole: () => {},
  dataChangeStatusRole: null,
  currentPage: 0,
  perPage: 0,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TableStaff));
