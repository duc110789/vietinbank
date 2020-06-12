/* eslint-disable no-nested-ternary */
import React, {Component} from 'react';
import {Button} from 'reactstrap';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Constants from '../Constants';
import ModalCommon from './ModalCommon';
import {
  getMerchantList,
  onClickCloseLockModal,
  onClickCloseUnLockModal,
  onClickOpenLockModal,
  onCLickOpenUnLockModal,
} from '../../../store/actions/masterMerchant/masterMerchant';
import {getListMerchantStatus} from '../../../utils/commonFunction';
import {messageSuccess} from '../../../utils';

class TableMerchant extends Component {
  componentDidUpdate(prevProps, prevState) {
    const { isLockSuccess, dataSearchMerchant, getMerchantList } = this.props;
    if (isLockSuccess !== prevProps.isLockSuccess) {
      if (isLockSuccess && isLockSuccess.code === '00') {
        getMerchantList(dataSearchMerchant);
      } else {
        messageSuccess(isLockSuccess.description);
      }
    }
  }

  goDetail = (id) => {
    const { history } = this.props;
    localStorage.setItem('ID_MERCHANT_DETAIL', window.btoa(JSON.stringify(id)));
    history.push({
      pathname: '/merchant/detail/',
    });
  };

  goEdit = (id) => {
    const { history } = this.props;
    localStorage.setItem('ID_MERCHANT_DETAIL', window.btoa(JSON.stringify(id)));
    history.push({
      pathname: '/merchant/edit/',
    });
  };

  goAddTerminal = (id) => {
    const { history } = this.props;
    localStorage.setItem('ID_MERCHANT_DETAIL', window.btoa(JSON.stringify(id)));
    history.push({
      pathname: '/terminal/add/',
      state: { haveMerchantId: true },
    });
  };

  render() {
    const {
      tData, openLockModal, openUnLockModal,
      isOpenLockModal, isOpenUnLockModal, merchantCode,
      closeLockModal, closeUnLockModal, perPage, currentPage,
    } = this.props;

    const notifyModal = {
      title: 'Thông báo',
      content: 'Bạn chắc chắn muốn khóa Merchant này?',
      button: 'Khóa Merchant',
    };

    const notifyUnLockModal = {
      title: 'Thông báo',
      content: 'Bạn chắc chắn muốn mở Merchant này?',
      button: 'Mở khóa Merchant',
    };
    return (
      <div className="fee-table_table w-100 overflow-auto">
        <table className="fee-table__table">
          <thead>
            <tr>
              <th className="text-center">STT</th>
              <th>{Constants.MerchantDetail.mcId}</th>
              <th>{Constants.MnMerchant.merchantName}</th>
              <th>{Constants.MnMerchant.branch}</th>
              <th>{Constants.MnMerchant.nationalMCC}</th>
              <th>{Constants.MnMerchant.address}</th>
              <th>{Constants.MnMerchant.contact}</th>
              <th>{Constants.MnMerchant.contactInfo}</th>
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
                  <td>{data && data.merchantCode}</td>
                  <td>{data && data.merchantName}</td>
                  <td>{data && data.departmentName}</td>
                  <td>{data && data.merchantTypeName}</td>
                  <td>{data && data.merchantAddress}</td>
                  <td>{data && data.contactFullName}</td>
                  <td>{data && data.contactPhone}</td>
                  <td>{(data && data.createDate).substring(0, 10)}</td>
                  <td>
                    { getListMerchantStatus(data.status) || '' }
                  </td>
                  <td className="icon-fee text-left">
                    {
                      <Button
                        title="Chi tiết thông tin Merchant"
                        onClick={() => this.goDetail(data.merchantCode)}
                      >
                        <i className="icon-info" />
                      </Button>
                    }
                    {
                      (data.status === 3 ? null : (
                        data.status === 6 ? null : (
                          <Button
                            title="Cập nhật thông tin Merchant"
                            onClick={() => this.goEdit(data.merchantCode)}
                          >
                            <i className="icon-note" />
                          </Button>
                        )
                      ))
                    }
                    {
                      data && data.status === 1 && (
                        <Button
                          title="Thêm mới Terminal"
                          onClick={() => this.goAddTerminal(data.merchantCode)}
                        >
                          <i className="icon-plus" />
                        </Button>
                      )
                    }
                    {
                      // eslint-disable-next-line no-nested-ternary
                      (data.status === 1 || data.status === 6 ? (
                        <Button
                          title="Cập nhật trạng thái Merchant"
                          onClick={() => openLockModal(data.merchantCode)}
                        >
                          <i className="icon-lock" />
                        </Button>
                      ) : (
                        data.status === -1 ? (
                          <Button
                            title="Cập nhật trạng thái Merchant"
                            onClick={() => openUnLockModal(data.merchantCode)}
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
            codeMerchant={merchantCode}
            onClickToCloseModal={closeLockModal}
          />
        ) : ('')}
        { isOpenUnLockModal ? (
          <ModalCommon
            notifyModal={notifyUnLockModal}
            isOpen={isOpenUnLockModal}
            codeMerchant={merchantCode}
            onClickToCloseModal={closeUnLockModal}
          />
        ) : ('')}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  dataSearchMerchant: state.masterMerchant.dataSearchMerchant,
  isOpenLockModal: state.masterMerchant.isOpenLockModal,
  isOpenUnLockModal: state.masterMerchant.isOpenUnLockModal,
  merchantCode: state.masterMerchant.merchantCode,
  isLockSuccess: state.masterMerchant.isLockSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  openLockModal: (data) => dispatch(onClickOpenLockModal(data)),
  openUnLockModal: (data) => dispatch(onCLickOpenUnLockModal(data)),
  closeLockModal: (data) => dispatch(onClickCloseLockModal(data)),
  closeUnLockModal: (data) => dispatch(onClickCloseUnLockModal(data)),
  getMerchantList: (data) => dispatch(getMerchantList(data)),
});

TableMerchant.propTypes = {
  tData: PropTypes.array,
  dataSearchMerchant: PropTypes.object,
  merchantCode: PropTypes.object,
  isOpenLockModal: PropTypes.bool,
  isOpenUnLockModal: PropTypes.bool,
  openLockModal: PropTypes.func,
  openUnLockModal: PropTypes.func,
  closeLockModal: PropTypes.func,
  closeUnLockModal: PropTypes.func,
  history: PropTypes.object,
  getMerchantList: PropTypes.func,
  isLockSuccess: PropTypes.object,
  currentPage: PropTypes.number,
  perPage: PropTypes.number,
};

TableMerchant.defaultProps = {
  tData: [],
  dataSearchMerchant: null,
  merchantCode: {},
  isOpenLockModal: false,
  isOpenUnLockModal: false,
  openLockModal: () => {},
  openUnLockModal: () => {},
  closeLockModal: () => {},
  closeUnLockModal: () => {},
  getMerchantList: () => {},
  history: '',
  isLockSuccess: null,
  currentPage: 0,
  perPage: 0,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TableMerchant));
