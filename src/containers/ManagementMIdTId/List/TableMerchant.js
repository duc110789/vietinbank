/* eslint-disable no-nested-ternary */
import React, {Component} from 'react';
import {Button, Col, Label, Row} from 'reactstrap';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter,} from 'react-router-dom';
import Constants from '../Constants';
import ModalCommon from './ModalCommon';
import {
  getMidTidList,
  getUserInfo,
  onClickCloseLockModal,
  onClickCloseResetPasswordModal,
  onClickCloseUnLockModal,
  onClickOpenLockModal,
  onCLickOpenResetPasswordModal,
  onCLickOpenUnLockModal,
  resetPassUserMidTid,
} from '../../../store/actions/mIdTid/mIdTid';

import {
  convertAccountTypeMidTid,
  convertRegisterChannel,
  getListMerchantStatusUser,
} from '../../../utils/commonFunction';
import {messageError, messageSuccess} from '../../../utils';

class TableMerchant extends Component {
  componentDidUpdate(prevProps, prevState) {
    const { isLockSuccess, dataSearchMidTid, getMidTidList, responseResetPass } = this.props;
    if (isLockSuccess !== prevProps.isLockSuccess) {
      getMidTidList(dataSearchMidTid);
    }

    if (responseResetPass !== prevProps.responseResetPass) {
      if (responseResetPass.code === '00') {
        messageSuccess('Reset mật khẩu thành công');
      } else {
        messageError(responseResetPass.description);
      }
    }
  }

  goDetail = (id) => {
    const { history } = this.props;
    localStorage.setItem('ID_USER_MIDTID', window.btoa(JSON.stringify(id)));
    history.push({
      pathname: '/system/accountwebapp/detail/',
    });
  };

  goEdit = (id) => {
    const { history } = this.props;
    localStorage.setItem('ID_USER_MIDTID', window.btoa(JSON.stringify(id)));
    history.push({
      pathname: '/system/accountwebapp/edit/',
    });
  };

  showBranch = (detailMidTid) => {
    const listBranch = [];
    if (detailMidTid.length) {
      for (let i = 0; i < detailMidTid.length; i += 1) {
        listBranch.push(
          <div key={i}>
            <Label>
              {detailMidTid[i].branchName}
            </Label>
          </div>,
        );
      }
    }
    return listBranch;
  };

  render() {
    const {
      tData, openLockModal, openUnLockModal, openResetPasswordModal,
      isOpenLockModal, isOpenUnLockModal, userId,
      closeLockModal, closeUnLockModal, currentPage, perPage,
      isOpenResetPasswordModal, closeResetPasswordModal,
      resetPassUserMidTid, getUserInfo, detailMidTid,
    } = this.props;

    const notifyModal = {
      title: 'Thông báo',
      content: 'Bạn chắc chắn đóng hoạt động ?',
      button: 'Khóa',
    };

    const notifyUnLockModal = {
      title: 'Thông báo',
      content: 'Bạn chắc chắn mở hoạt động ?',
      button: 'Mở khóa',
    };

    const notifyResetPasswordModal = {
      title: 'Đặt lại mật khẩu',
      content: <>
        <Row>
          <Col lg={6}>{Constants.MnMerchant.username}</Col>
          <Col lg={6}>{detailMidTid && detailMidTid.data && detailMidTid.data.userName}</Col>
        </Row>

        <Row>
          <Col lg={6}>{Constants.MnMerchant.merchant}</Col>
          <Col lg={6}>{detailMidTid && detailMidTid.data && detailMidTid.data.merchantName}</Col>
        </Row>

        <Row>
          <Col lg={6}>{Constants.MnMerchant.mcBranch}</Col>
          <Col lg={6}>{ detailMidTid && detailMidTid.data && detailMidTid.data.listBranchUser.length
            ? this.showBranch(detailMidTid.data.listBranchUser) : '' }</Col>
        </Row>

        <Row>
          <Col lg={6}>{Constants.MidTid.accountType}</Col>
          <Col lg={6}>{detailMidTid && detailMidTid.data && convertAccountTypeMidTid(detailMidTid.data.typeAccount)}</Col>
        </Row>

        <Row>
          <Col lg={6}>{Constants.MnMerchant.email}</Col>
          <Col lg={6}>{detailMidTid && detailMidTid.data && detailMidTid.data.email}</Col>
        </Row>
      </>,
      button: 'Reset',
    };

    return (
      <div className="fee-table_table w-100 overflow-auto">
        <table className="fee-table__table">
          <thead>
            <tr>
              <th className="text-center">STT</th>
              <th>{Constants.MnMerchant.userName}</th>
              <th>{Constants.MnMerchant.email}</th>
              <th>{Constants.MnMerchant.merchantName}</th>
              <th>{Constants.MidTid.terminalWeb}</th>
              <th>{Constants.MidTid.terminalApp}</th>
              <th>{Constants.AccountWebApp.registerChannel}</th>
              <th>{Constants.AccountWebApp.accountType}</th>
              <th>{Constants.AccountWebApp.isAdmin}</th>
              <th>{Constants.MnMerchant.iniDate}</th>
              <th>{Constants.MerchantDetail.status}</th>
              <th>{Constants.MerchantDetail.action}</th>
            </tr>
          </thead>
          <tbody>
            {(tData !== null && tData
              && Array.isArray(tData))
              // eslint-disable-next-line react/prop-types
              ? (tData.length !== 0 ? tData.map((data, index) => (
                <tr key={index}>
                  <td className="text-center">{(currentPage - 1) * perPage + index + 1}</td>
                  <td>{data && data.userName}</td>
                  <td>{data && data.email}</td>
                  <td>{data && data.merchantName}</td>
                  <td>{data && data.terminalNameWeb}</td>
                  <td>{data && data.terminalNameApp}</td>
                  <td>{convertRegisterChannel(data && data.channelRegister)}</td>
                  <td>{convertAccountTypeMidTid(data && data.typeAccount)}</td>
                  <td>
                    {((data && data.channelLogin === 1) && (data && data.parentId === 0))
                      ? <input type="checkbox" checked /> : ''}
                  </td>
                  <td>{data && data.createdDate}</td>
                  <td>
                    { getListMerchantStatusUser(data && data.status) || '' }
                  </td>
                  <td className="icon-fee text-left">
                    <Button
                      title="Xem chi tiết"
                      onClick={() => this.goDetail(data && data.id)}
                    >
                      <i className="icon-info" />
                    </Button>
                    <Button
                      title="Chỉnh sửa"
                      onClick={() => this.goEdit(data && data.id)}
                    >
                      <i className="icon-note" />
                    </Button>
                    {
                      // eslint-disable-next-line no-nested-ternary
                      (data && data.status === 1 ? (
                        <Button
                          title="Khóa"
                          onClick={() => openLockModal(data && data.id)}
                        >
                          <i className="icon-lock" />
                        </Button>
                      ) : (
                        data && data.status === 0 ? (
                          <Button
                            title="Mở khóa"
                            onClick={() => openUnLockModal(data && data.id)}
                          >
                            <i className="icon-lock-open" />
                          </Button>
                        ) : null
                      ))
                    }
                    {
                      ((data && data.status === 1) || (data && data.status === 0)) && (
                        <Button
                          title="Reset mật khẩu"
                          onClick={() => {getUserInfo(data.id); openResetPasswordModal(data)}}
                        >
                          <i className="fa fa-key fa-lg mt-2" />
                        </Button>
                      )
                    }
                  </td>
                </tr>
              )) : null) : null}
          </tbody>
        </table>
        {((tData && tData.length === 0) || (tData === null)) ? <div className="empty-row">Không tồn tại danh sách theo yêu cầu</div> : null}
        { isOpenLockModal ? (
          <ModalCommon
            notifyModal={notifyModal}
            isOpen={isOpenLockModal}
            userId={userId}
            onClickToCloseModal={closeLockModal}
          />
        ) : ('')}
        { isOpenUnLockModal ? (
          <ModalCommon
            notifyModal={notifyUnLockModal}
            isOpen={isOpenUnLockModal}
            userId={userId}
            onClickToCloseModal={closeUnLockModal}
          />
        ) : ('')}
        <ModalCommon
          notifyModal={notifyResetPasswordModal}
          isOpen={isOpenResetPasswordModal}
          otherAction={() => resetPassUserMidTid({
            userName: detailMidTid.data.userName,
            newPassword: null,
            changePass: 0,
            typeReset: detailMidTid.data.typeAccount,
          })}
          onClickToCloseModal={closeResetPasswordModal}
          isOtherAction
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  dataSearchMidTid: state.mIdTId.dataSearchMidTid,
  isOpenLockModal: state.mIdTId.isOpenLockModal,
  isOpenUnLockModal: state.mIdTId.isOpenUnLockModal,
  userId: state.mIdTId.userId,
  isLockSuccess: state.mIdTId.isLockSuccess,
  isOpenResetPasswordModal: state.mIdTId.isOpenResetPasswordModal,
  responseResetPass: state.mIdTId.responseResetPass,
  detailMidTid: state.mIdTId.detailMidTid,
});

const mapDispatchToProps = (dispatch) => ({
  openLockModal: (data) => dispatch(onClickOpenLockModal(data)),
  openUnLockModal: (data) => dispatch(onCLickOpenUnLockModal(data)),
  openResetPasswordModal: (data) => dispatch(onCLickOpenResetPasswordModal(data)),
  closeLockModal: (data) => dispatch(onClickCloseLockModal(data)),
  closeUnLockModal: (data) => dispatch(onClickCloseUnLockModal(data)),
  closeResetPasswordModal: (data) => dispatch(onClickCloseResetPasswordModal(data)),
  getMidTidList: (data) => dispatch(getMidTidList(data)),
  resetPassUserMidTid: (data) => dispatch(resetPassUserMidTid(data)),
  getUserInfo: (data) => dispatch(getUserInfo(data)),
});

TableMerchant.propTypes = {
  tData: PropTypes.array,
  dataSearchMidTid: PropTypes.object,
  userId: PropTypes.object,
  isOpenLockModal: PropTypes.bool,
  isOpenUnLockModal: PropTypes.bool,
  isOpenResetPasswordModal: PropTypes.bool,
  openLockModal: PropTypes.func,
  openUnLockModal: PropTypes.func,
  openResetPasswordModal: PropTypes.func,
  closeLockModal: PropTypes.func,
  closeUnLockModal: PropTypes.func,
  closeResetPasswordModal: PropTypes.func,
  history: PropTypes.object,
  getMidTidList: PropTypes.func,
  isLockSuccess: PropTypes.object,
  currentPage: PropTypes.number,
  perPage: PropTypes.number,
  resetPassUserMidTid: PropTypes.func,
};

TableMerchant.defaultProps = {
  tData: [],
  dataSearchMidTid: null,
  userId: {},
  isOpenLockModal: false,
  isOpenUnLockModal: false,
  isOpenResetPasswordModal: false,
  openLockModal: () => {},
  openUnLockModal: () => {},
  openResetPasswordModal: () => {},
  closeLockModal: () => {},
  closeUnLockModal: () => {},
  closeResetPasswordModal: () => {},
  getMidTidList: () => {},
  history: '',
  isLockSuccess: null,
  currentPage: 0,
  perPage: 0,
  resetPassUserMidTid: () => {},
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TableMerchant));
