/* eslint-disable no-nested-ternary */
import React, {Component} from 'react';
import {Button} from 'reactstrap';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Constants from '../Constants';
import ModalCommon from './ModalCommon';
import {
  getQrCodeList,
  onClickCloseLockModal,
  onClickCloseUnLockModal,
  onClickOpenLockModal,
  onCLickOpenUnLockModal,
} from '../../../store/actions/qRCode/qRCode';

import {getListQRCodeStatus, numberWithDots} from '../../../utils/commonFunction';

class TableMerchant extends Component {
  componentDidUpdate(prevProps, prevState) {
    const { isLockSuccess, dataSearchQrCode, getQrCodeList } = this.props;
    if (isLockSuccess !== prevProps.isLockSuccess) {
      getQrCodeList(dataSearchQrCode);
    }
  }

  goDetail = (id) => {
    const { history } = this.props;
    localStorage.setItem('ID_QRCODE', window.btoa(JSON.stringify(id)));
    history.push({
      pathname: '/qrcode/detail/',
    });
  };

  goCreateQrCode = (id) => {
    const { history } = this.props;
    localStorage.setItem('ID_QRCODE', window.btoa(JSON.stringify(id)));
    history.push({
      pathname: '/qrcode/createresult/',
    });
  };

  goEdit = (id) => {
    const { history } = this.props;
    localStorage.setItem('ID_QRCODE', window.btoa(JSON.stringify(id)));
    history.push({
      pathname: '/qrcode/edit/',
    });
  };

  render() {
    const {
      tData, openLockModal, openUnLockModal,
      isOpenLockModal, isOpenUnLockModal, qrcodeId,
      closeLockModal, closeUnLockModal, currentPage, perPage,
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
    return (
      <div className="fee-table_table w-100 overflow-auto">
        <table className="fee-table__table">
          <thead>
            <tr>
              <th className="text-center">STT</th>
              <th>{Constants.MerchantDetail.mcId}</th>
              <th>{Constants.QRCode.pointSaleCode}</th>
              <th>{Constants.QRCode.pointSaleName}</th>
              <th>{Constants.QRCode.productCode}</th>
              <th>{Constants.QRCode.productName}</th>
              <th>{Constants.QRCode.productPrice}</th>
              <th>{Constants.MnMerchant.currency}</th>
              <th>{Constants.QRCode.expireQRCode}</th>
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
                  <td>{data && data.terminalID}</td>
                  <td>{data && data.terminalName}</td>
                  <td>{data && data.productID}</td>
                  <td>{data && data.productName}</td>
                  <td>{data && numberWithDots(data.amount)}</td>
                  <td>{data && data.ccy}</td>
                  <td>{data && data.expireDate}</td>
                  <td>
                    { getListQRCodeStatus(data.status) || '' }
                  </td>
                  <td className="icon-fee text-left">
                    {
                      <Button
                        title="Chi tiết thông tin QR Code sản phẩm"
                        onClick={() => this.goDetail(data.id)}
                      >
                        <i className="icon-info" />
                      </Button>
                    }
                    {
                      data.status === -1 ? null : (data.status === 3 ? null : (
                        data.status === 6 ? null : (
                          <Button
                            title="Cập nhật thông tin QR Code sản phẩm"
                            onClick={() => this.goEdit(data.id)}
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
                          title="Cập nhật trạng thái hoạt động"
                          onClick={() => openLockModal(data && data.id)}
                        >
                          <i className="icon-lock" />
                        </Button>
                      ) : (
                        data.status === -1 ? (
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
                      data && data.status === 1 && (
                        <Button
                          title="QR Code"
                          onClick={() => this.goCreateQrCode(data.id)}
                        >
                          <i className="fa fa-qrcode fa-lg mt-2" />
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
            qrcodeId={qrcodeId}
            onClickToCloseModal={closeLockModal}
          />
        ) : ('')}
        { isOpenUnLockModal ? (
          <ModalCommon
            notifyModal={notifyUnLockModal}
            isOpen={isOpenUnLockModal}
            qrcodeId={qrcodeId}
            onClickToCloseModal={closeUnLockModal}
          />
        ) : ('')}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  dataSearchQrCode: state.qRCode.dataSearchQrCode,
  isOpenLockModal: state.qRCode.isOpenLockModal,
  isOpenUnLockModal: state.qRCode.isOpenUnLockModal,
  qrcodeId: state.qRCode.qrcodeId,
  isLockSuccess: state.qRCode.isLockSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  openLockModal: (data) => dispatch(onClickOpenLockModal(data)),
  openUnLockModal: (data) => dispatch(onCLickOpenUnLockModal(data)),
  closeLockModal: (data) => dispatch(onClickCloseLockModal(data)),
  closeUnLockModal: (data) => dispatch(onClickCloseUnLockModal(data)),
  getQrCodeList: (data) => dispatch(getQrCodeList(data)),
});

TableMerchant.propTypes = {
  tData: PropTypes.array,
  dataSearchQrCode: PropTypes.object,
  qrcodeId: PropTypes.object,
  isOpenLockModal: PropTypes.bool,
  isOpenUnLockModal: PropTypes.bool,
  openLockModal: PropTypes.func,
  openUnLockModal: PropTypes.func,
  closeLockModal: PropTypes.func,
  closeUnLockModal: PropTypes.func,
  history: PropTypes.object,
  getQrCodeList: PropTypes.func,
  isLockSuccess: PropTypes.object,
  currentPage: PropTypes.number,
  perPage: PropTypes.number,
};

TableMerchant.defaultProps = {
  tData: [],
  dataSearchQrCode: null,
  qrcodeId: {},
  isOpenLockModal: false,
  isOpenUnLockModal: false,
  openLockModal: () => {},
  openUnLockModal: () => {},
  closeLockModal: () => {},
  closeUnLockModal: () => {},
  getQrCodeList: () => {},
  history: '',
  isLockSuccess: null,
  currentPage: 0,
  perPage: 0,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TableMerchant));
