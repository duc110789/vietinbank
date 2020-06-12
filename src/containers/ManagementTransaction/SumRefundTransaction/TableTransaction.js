/* eslint-disable no-nested-ternary */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'reactstrap';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Constants from '../Constants';

import {
  convertRefundType,
  convertServiceCode,
  getLabel,
  numberWithDots,
  renderRefundStatusColor,
} from '../../../utils/commonFunction';

class TableTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.getListSelectBox();
  }

  goDetail = (id, idRefund, localDate) => {
    const { history } = this.props;
    localStorage.setItem('ID_TRANSACTION', window.btoa(JSON.stringify(id)));
    localStorage.setItem('ID_TRANSACTION_REFUND', window.btoa(JSON.stringify(idRefund)));
    localStorage.setItem('LOCAL_DATE_TRANSACTION_DETAIL_REFUND', window.btoa(JSON.stringify(localDate)));
    history.push({
      pathname: '/management-transaction/refund-detail/',
    });
  };

  goEdit = (id, idRefund, localDate) => {
    const { history } = this.props;
    localStorage.setItem('ID_TRANSACTION', window.btoa(JSON.stringify(id)));
    localStorage.setItem('ID_TRANSACTION_REFUND', window.btoa(JSON.stringify(idRefund)));
    localStorage.setItem('LOCAL_DATE_TRANSACTION_DETAIL_REFUND', window.btoa(JSON.stringify(localDate)));
    history.push({
      pathname: '/management-transaction/update-status-transaction-refund/',
    });
  };

  getListSelectBox = () => {
    const listChannelRefund = JSON.parse(localStorage && localStorage.getItem('CHANNEL_REFUND'));

    const updateChannelRefund = [{ value: '', label: 'Tất cả' }];
    if (listChannelRefund) {
      for (let i = 0; i < listChannelRefund.length; i += 1) {
        updateChannelRefund.push({
          value: listChannelRefund[i].code,
          label: `${listChannelRefund[i].description}`,
        });
      }
    }

    this.setState({
      listChannelRefund: updateChannelRefund,
    });
  };

  render() {
    const { listChannelRefund } = this.state;
    const {
      tData,
    } = this.props;

    return (
      <div className="fee-table_table w-100 overflow-auto">
        <table className="fee-table__table">
          <thead>
            <tr>
              <th className="text-center">STT</th>
              <th>{Constants.Transaction.transactionCodeRefund}</th>
              <th>{Constants.Transaction.transactionCodePayment}</th>
              <th>{Constants.StatisticalReport.billNumber}</th>
              <th>{Constants.Transaction.payCode}</th>
              <th>{Constants.StatisticalReport.merchantBranch}</th>
              <th>{Constants.MnTerminal.pointSale}</th>
              <th>{Constants.StatisticalReport.paymentType}</th>
              <th>{Constants.Transaction.refundType}</th>
              <th>{Constants.Transaction.phoneNumber}</th>
              <th>{Constants.Transaction.realRefund}</th>
              <th>{Constants.Transaction.requestRefund}</th>
              <th>{Constants.MnMerchant.status}</th>
              <th>{Constants.Transaction.requestUser}</th>
              <th>{Constants.Transaction.fromRequest}</th>
              <th>{Constants.StatisticalReport.ttTime}</th>
              <th>{Constants.Transaction.requestTime}</th>
              <th>{Constants.Transaction.refundTime}</th>
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
                    {index + 1}
                  </td>
                  <td>{data ? data && data.idRefund : ''}</td>
                  <td>{data ? data && data.phase2Trace : ''}</td>
                  <td>{data ? data && data.txnId : ''}</td>
                  <td>{data ? data && data.orderCode : ''}</td>
                  <td>{data ? data && data.terminalNameBrand : ''}</td>
                  <td>{data ? data && data.terminalName : ''}</td>
                  <td>{data && data.serviceCode ? convertServiceCode(parseInt(data && data.serviceCode.substring(1, 10), 10)) : ''}</td>
                  <td>{data ? convertRefundType(data && data.typeRefund) : ''}</td>
                  <td>{data ? data && data.mobile : ''}</td>
                  <td>{data ? numberWithDots(data && data.amountRefund) : ''}</td>
                  <td>{data ? numberWithDots(data && data.initAmountRefund) : ''}</td>
                  <td>{data ? renderRefundStatusColor(data && data.statusRefund) : ''}</td>
                  <td>{data ? data && data.requestedUser : ''}</td>
                  <td>{((data && data.channel) !== 0) ? getLabel(listChannelRefund, (data && data.channel)) : ''}</td>
                  <td>{data ? data && data.paymentDate : ''}</td>
                  <td>{data ? data && data.initTime : ''}</td>
                  <td>{data ? data && data.refundTime : ''}</td>
                  <td className="icon-fee text-left">
                    {
                      <Button
                        title="Xem chi tiết giao dịch hoàn"
                        onClick={() => this.goDetail(data && data.id, data && data.idRefund, data && data.localDate)}
                      >
                        <i className="icon-info" />
                      </Button>
                    }
                    {
                      ((data && data.statusRefund === 0) || (data && data.statusRefund === 17) || (data && data.statusRefund === 18)) && (
                        <Button
                          title="Cập nhật trạng thái giao dịch hoàn"
                          onClick={() => this.goEdit(data && data.id, data && data.idRefund, data && data.localDate)}
                        >
                          <i className="icon-note" />
                        </Button>
                      )
                    }
                  </td>
                </tr>
              )) : null) : null}
          </tbody>
        </table>
        {((tData && tData.length === 0) || (tData === null)) ? <div className="empty-row">Không tồn tại danh sách theo yêu cầu</div> : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

TableTransaction.propTypes = {
  tData: PropTypes.array,
  history: PropTypes.object,
};

TableTransaction.defaultProps = {
  tData: [],
  history: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TableTransaction));
