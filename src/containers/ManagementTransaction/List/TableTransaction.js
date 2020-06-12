/* eslint-disable no-nested-ternary */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'reactstrap';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Constants from '../Constants';

import {
  getLabel, numberWithDots, renderTransactionStatusColor, convertServiceCode, convertBankCode,
} from '../../../utils/commonFunction';

const listMasterMerchant = [
  { value: '', label: 'Tất cả' },
  { value: '970489', label: 'VIETINBANK' },
  { value: '908405', label: 'VNPAY' },
];

const listbankCode = [
  { value: '', label: 'Tất cả' },
  { value: '970489', label: 'VIETINBANK' },
  { value: '908405', label: 'VNPAY' },
];

class TableTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  goDetail = (id, status, noteChaneStatus, localDate, online, changeData) => {
    const { history } = this.props;
    localStorage.setItem('ID_TRANSACTION', window.btoa(JSON.stringify(id)));
    localStorage.setItem('STATUS_TRANSACTION_DETAIL', window.btoa(JSON.stringify(status)));
    localStorage.setItem('NOTE_CHANGE_STATUS_TRANSACTION_DETAIL', window.btoa(JSON.stringify(noteChaneStatus)));
    localStorage.setItem('LOCAL_DATE_TRANSACTION_DETAIL', window.btoa(JSON.stringify(localDate)));
    localStorage.setItem('ONLINE_TRANSACTION_DETAIL', window.btoa(JSON.stringify(online)));
    localStorage.setItem('CHANGE_DATA_TRANSACTION_DETAIL', window.btoa(JSON.stringify(changeData)));
    history.push({
      pathname: '/management-transaction/detail/',
    });
  };

  goRefund = (id, status, noteChaneStatus, localDate, online, changeData) => {
    const { history } = this.props;
    localStorage.setItem('ID_TRANSACTION', window.btoa(JSON.stringify(id)));
    localStorage.setItem('STATUS_TRANSACTION_DETAIL', window.btoa(JSON.stringify(status)));
    localStorage.setItem('NOTE_CHANGE_STATUS_TRANSACTION_DETAIL', window.btoa(JSON.stringify(noteChaneStatus)));
    localStorage.setItem('LOCAL_DATE_TRANSACTION_DETAIL', window.btoa(JSON.stringify(localDate)));
    localStorage.setItem('ONLINE_TRANSACTION_DETAIL', window.btoa(JSON.stringify(online)));
    localStorage.setItem('CHANGE_DATA_TRANSACTION_DETAIL', window.btoa(JSON.stringify(changeData)));
    history.push({
      pathname: '/management-transaction/refund-create/',
    });
  };

  goEdit = (id, status, noteChaneStatus, localDate, online, changeData) => {
    const { history } = this.props;
    localStorage.setItem('ID_TRANSACTION', window.btoa(JSON.stringify(id)));
    localStorage.setItem('STATUS_TRANSACTION_DETAIL', window.btoa(JSON.stringify(status)));
    localStorage.setItem('NOTE_CHANGE_STATUS_TRANSACTION_DETAIL', window.btoa(JSON.stringify(noteChaneStatus)));
    localStorage.setItem('LOCAL_DATE_TRANSACTION_DETAIL', window.btoa(JSON.stringify(localDate)));
    localStorage.setItem('ONLINE_TRANSACTION_DETAIL', window.btoa(JSON.stringify(online)));
    localStorage.setItem('CHANGE_DATA_TRANSACTION_DETAIL', window.btoa(JSON.stringify(changeData)));
    history.push({
      pathname: '/management-transaction/update-status-transaction-payment/',
    });
  };

  render() {
    const {
      tData,
      listTransactionTable,
      currentPage,
      perPage,
    } = this.props;
    
    return (
      <div className="fee-table_table w-100 overflow-auto">
        <table className="fee-table__table">
          <thead>
            <tr>
              <th className="text-center">STT</th>
              <th>{Constants.StatisticalReport.transactionCode}</th>
              <th>{Constants.StatisticalReport.billNumber}</th>
              <th>{Constants.MnMerchant.merchantName}</th>
              <th>{Constants.StatisticalReport.merchantBranch}</th>
              <th>{Constants.QRCode.pointSaleName}</th>
              <th>{Constants.StatisticalReport.ttUnit}</th>
              <th>{Constants.MnMerchant.masterMerchant}</th>
              <th>{Constants.StatisticalReport.ttType}</th>
              <th>{Constants.Transaction.phoneNumber}</th>
              <th>{Constants.Transaction.cardAccountNumber}</th>
              <th>{Constants.StatisticalReport.kmBeforeMoney}</th>
              <th>{Constants.StatisticalReport.kmAfterMoney}</th>
              <th>{Constants.MnMerchant.status}</th>
              <th>{Constants.Transaction.errorCode}</th>
              <th>{Constants.StatisticalReport.ttTime}</th>
              <th>{Constants.MerchantDetail.action}</th>
            </tr>
          </thead>
          <tbody>
            {(tData !== null && tData
              && Array.isArray(tData))
              // eslint-disable-next-line react/prop-types
              ? (tData.length !== 0 ? tData.map((data, index) => (
                <tr key={index}>
                  <td className="text-center">
                    {(currentPage - 1) * perPage + index + 1}
                  </td>
                  <td>{data ? data && data.qrTrace : ''}</td>
                  <td>{data ? data && data.txnId : ''}</td>
                  <td>{data ? data && data.merchantName : ''}</td>
                  <td>{data ? data && data.terminalNameBrand : ''}</td>
                  <td>{data ? data && data.terminalName : ''}</td>
                  <td>{data ? getLabel(listbankCode, data && convertBankCode(data.bankCode)) : ''}</td>
                  <td>{data ? getLabel(listMasterMerchant, data && data.masterMcCode) === 'VIETINBANK'
                    ? getLabel(listMasterMerchant, data && data.masterMcCode) : 'VNPAY' : ''}</td>
                  <td>{data && data.serviceCode ? convertServiceCode(parseInt(data && data.serviceCode.substring(1, 10), 10)) : ''}</td>
                  <td>{data ? data && data.mobile : ''}</td>
                  <td>{data ? data && data.accountNo : ''}</td>
                  <td>{data ? numberWithDots(data && data.debitAmount) : ''}</td>
                  <td>{data ? numberWithDots(data && data.realAmount) : ''}</td>
                  <td>
                    { data ? renderTransactionStatusColor(data && data.status) : '' }
                  </td>
                  <td>{data ? data && data.resCodeTrans : ''}</td>
                  <td>{data ? data && data.paymentDate : ''}</td>
                  <td className="icon-fee text-left">
                    {
                      <Button
                        title="Xem chi tiết giao dịch"
                        onClick={() => this.goDetail(data && data.id, data && data.status, data && data.noteChaneStatus, data && data.localDate, data && data.online)}
                      >
                        <i className="icon-info" />
                      </Button>
                    }
                    {
                      data.status === 0 && data.masterMcCode === '970489' && (
                        <Button
                          title="Hoàn tiền giao dịch"
                          onClick={() => this.goRefund(data && data.id, data && data.status, data && data.noteChaneStatus, data && data.localDate, data && data.online)}
                        >
                          <i className="icon-action-undo" />
                        </Button>
                      )
                    }
                    {
                      data && data.status === 8 && (
                        <Button
                          title="Cập nhật trạng thái"
                          onClick={() => this.goEdit(data && data.id, data && data.status, data && data.noteChaneStatus, data && data.localDate, data && data.online)}
                        >
                          <i className="icon-note" />
                        </Button>
                      )
                    }
                  </td>
                </tr>
              )) : null) : null}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="5" rowSpan="2" className="text-bold text-right text-danger">Tổng</td>
              <td colSpan="4" className="text-bold text-center">Tổng GD</td>
              <td colSpan="4" className="text-bold text-center">Số tiền trước KM</td>
              <td colSpan="4" className="text-bold text-center">Số tiền sau KM</td>
            </tr>
            <tr className="total-tr">
              <td colSpan="4" className="text-bold text-center text-danger">{numberWithDots(listTransactionTable && listTransactionTable.totalRow)}</td>
              <td colSpan="4" className="text-bold text-center text-danger">{numberWithDots(listTransactionTable && listTransactionTable.totalAmount)}</td>
              <td colSpan="4" className="text-bold text-center text-danger">{numberWithDots(listTransactionTable && listTransactionTable.totalRealAmount)}</td>
            </tr>
          </tfoot>
        </table>
        {((tData && tData.length === 0) || (tData === null)) ? <div className="empty-row">Không tồn tại danh sách theo yêu cầu</div> : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  listTransactionTable: state.Transaction.listTransactionTable,
});

const mapDispatchToProps = (dispatch) => ({
});

TableTransaction.propTypes = {
  listTransactionTable: PropTypes.object,
  tData: PropTypes.array,
  history: PropTypes.object,
  currentPage: PropTypes.number,
  perPage: PropTypes.number,
};

TableTransaction.defaultProps = {
  listTransactionTable: {},
  tData: [],
  history: '',
  currentPage: 0,
  perPage: 0,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TableTransaction));
