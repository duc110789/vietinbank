/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  withRouter,
} from 'react-router-dom';
import Constants from '../Constants';
import {
  getListTerminalStatus,
} from '../../../utils/commonFunction';
import {
  onClickOpenLockModal, onCLickOpenUnLockModal, onClickCloseLockModal,
  onClickCloseUnLockModal,
  getTerminalList,
} from '../../../store/actions/terminal/terminal';
import ModalCommon from './ModalCommon';

class TableTerminal extends Component {
  componentDidUpdate(prevProps, prevState) {
    const { isLockSuccess, dataSearchTerminal, getTerminalList } = this.props;
    if (isLockSuccess !== prevProps.isLockSuccess) {
      getTerminalList(dataSearchTerminal);
    }
  }

  goDetail = (merchantCode, merchantId, terminalId) => {
    const { history } = this.props;
    localStorage.setItem('ID_MERCHANT_TERMINAL', window.btoa(JSON.stringify(merchantId)));
    localStorage.setItem('MERCHANT_CODE', window.btoa(JSON.stringify(merchantCode)));
    localStorage.setItem('ID_TERMINAL', window.btoa(JSON.stringify(terminalId)));
    history.push({
      pathname: '/terminal/detail/',
    });
  };

  goEdit = (merchantCode, merchantId, terminalId) => {
    const { history } = this.props;
    localStorage.setItem('ID_MERCHANT_TERMINAL', window.btoa(JSON.stringify(merchantId)));
    localStorage.setItem('MERCHANT_CODE', window.btoa(JSON.stringify(merchantCode)));
    localStorage.setItem('ID_TERMINAL', window.btoa(JSON.stringify(terminalId)));
    history.push({
      pathname: '/terminal/edit/',
    });
  };

  goApproved = (merchantCode, merchantId, terminalId) => {
    const { history } = this.props;
    localStorage.setItem('ID_MERCHANT_TERMINAL', window.btoa(JSON.stringify(merchantId)));
    localStorage.setItem('MERCHANT_CODE', window.btoa(JSON.stringify(merchantCode)));
    localStorage.setItem('ID_TERMINAL', window.btoa(JSON.stringify(terminalId)));
    history.push({
      pathname: '/terminal/approved/',
    });
  };

  render() {
    const {
      tData, openLockModal, openUnLockModal,
      isOpenLockModal, isOpenUnLockModal, merchantCode,
      closeLockModal, closeUnLockModal,
    } = this.props;

    const notifyModal = {
      title: 'Thông báo',
      content: 'Bạn chắc chắn muốn khóa Terminal này?',
      button: 'Khóa Terminal',
    };

    const notifyUnLockModal = {
      title: 'Thông báo',
      content: 'Bạn chắc chắn muốn mở Terminal này?',
      button: 'Mở khóa Terminal',
    };


    return (
      <div className="fee-table_table w-100 overflow-auto">
        <table className="fee-table__table">
          <thead>
            <tr>
              <th className="text-center">STT</th>
              <th>{Constants.MerchantDetail.terminalID}</th>
              <th>{Constants.MerchantDetail.terminalName}</th>
              <th>{Constants.MnMerchant.nationalMCC}</th>
              <th>{Constants.MnMerchant.address}</th>
              <th>{Constants.MnMerchant.contact}</th>
              <th>{Constants.MnMerchant.contactInfo}</th>
              <th>{Constants.MnMerchant.dateTimeCreate}</th>
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
                  <td className="text-center">{index + 1}</td>
                  <td>{data && data.terminalId}</td>
                  <td>{data && data.terminalName}</td>
                  <td>{data && data.businessProductName}</td>
                  <td>{data && data.terminalAddress}</td>
                  <td>{data && data.contact}</td>
                  <td>{data && data.contactPhone}</td>
                  <td>{data && data.createdDate}</td>
                  <td>
                    { getListTerminalStatus(data.status) || '' }
                  </td>
                  <td className="icon-fee text-left">
                    {
                      <Button
                        title="Chi tiết thông tin Terminal"
                        onClick={
                          () => this.goDetail(data.merchantCode, data.merchantId, data.terminalId)
                        }
                      >
                        <i className="icon-info" />
                      </Button>
                    }
                    {
                      (data.status === 3 ? null : (
                        data.status === 6 ? null : (
                          <Button
                            title="Cập nhật thông tin Terminal"
                            onClick={() => this.goEdit(data.merchantCode, data.merchantId, data.terminalId)}
                          >
                            <i className="icon-note" />
                          </Button>
                        )
                      ))
                    }
                    {
                      // eslint-disable-next-line no-nested-ternary
                      (data.status === 1 || data.status === 6 ? (
                        <Button
                          title="Cập nhật trạng thái Terminal"
                          onClick={() => openLockModal(data)}
                        >
                          <i className="icon-lock" />
                        </Button>
                      ) : (
                        data.status === -1 ? (
                          <Button
                            title="Cập nhật trạng thái Terminal"
                            onClick={() => openUnLockModal(data)}
                          >
                            <i className="icon-lock-open" />
                          </Button>
                        ) : null
                      ))
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
            idTerminal={merchantCode}
            onClickToCloseModal={closeLockModal}
          />
        ) : ('')}
        { isOpenUnLockModal ? (
          <ModalCommon
            notifyModal={notifyUnLockModal}
            isOpen={isOpenUnLockModal}
            idTerminal={merchantCode}
            onClickToCloseModal={closeUnLockModal}
          />
        ) : ('')}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  dataSearchTerminal: state.terminal.dataSearchTerminal,
  isOpenLockModal: state.terminal.isOpenLockModal,
  isOpenUnLockModal: state.terminal.isOpenUnLockModal,
  merchantCode: state.terminal.merchantCode,
  isLockSuccess: state.terminal.isLockSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  openLockModal: (data) => dispatch(onClickOpenLockModal(data)),
  openUnLockModal: (data) => dispatch(onCLickOpenUnLockModal(data)),
  closeLockModal: (data) => dispatch(onClickCloseLockModal(data)),
  closeUnLockModal: (data) => dispatch(onClickCloseUnLockModal(data)),
  getTerminalList: (data) => dispatch(getTerminalList(data)),

});

TableTerminal.propTypes = {
  tData: PropTypes.array,
  dataSearchTerminal: PropTypes.object,
  merchantCode: PropTypes.object,
  isOpenLockModal: PropTypes.bool,
  isOpenUnLockModal: PropTypes.bool,
  openLockModal: PropTypes.func,
  openUnLockModal: PropTypes.func,
  closeLockModal: PropTypes.func,
  closeUnLockModal: PropTypes.func,
  history: PropTypes.object,
  getTerminalList: PropTypes.func,
  isLockSuccess: PropTypes.object,

};

TableTerminal.defaultProps = {
  tData: [],
  dataSearchTerminal: null,
  merchantCode: {},
  isOpenLockModal: false,
  isOpenUnLockModal: false,
  openLockModal: () => {},
  openUnLockModal: () => {},
  closeLockModal: () => {},
  closeUnLockModal: () => {},
  getTerminalList: () => {},
  history: '',
  isLockSuccess: null,

};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TableTerminal));
