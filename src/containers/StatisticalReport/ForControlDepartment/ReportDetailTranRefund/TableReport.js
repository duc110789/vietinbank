/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Constants from '../../Constants';

import { numberWithDots } from '../../../../utils/commonFunction';

class TableReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      tData,
      listTransactionRefund,
    } = this.props;

    return (
      <div className="fee-table_table w-100 overflow-auto">
        <table className="fee-table__table">
          <thead>
            <tr>
              <th className="text-center">STT</th>
              <th>{Constants.StatisticalReport.tranCodeRoot}</th>
              <th>{Constants.StatisticalReport.tranCodeRefund}</th>
              <th>{Constants.StatisticalReport.billNumber}</th>
              <th>{Constants.StatisticalReport.ttUnit}</th>
              <th>{Constants.MnMerchant.merchantName}</th>
              <th>{Constants.MnMerchant.merchantId}</th>
              <th>{Constants.StatisticalReport.merchantBranch}</th>
              <th>{Constants.StatisticalReport.merchantCode}</th>
              <th>{Constants.QRCode.pointSaleName}</th>
              <th>{Constants.QRCode.pointSaleCode}</th>
              <th>{Constants.StatisticalReport.payAmount}</th>
              <th>{Constants.StatisticalReport.payRefund}</th>
              <th>{Constants.StatisticalReport.payDate}</th>
              <th>{Constants.QRCode.productNote}</th>
            </tr>
          </thead>
          <tbody>
            {(tData !== null && tData
              && Array.isArray(tData))
              // eslint-disable-next-line react/prop-types
              ? (tData.length !== 0 ? tData.map((data, index) => (
                <tr key={index}>
                  <td className="text-center">{index + 1}</td>
                  <td>{data ? data && data.transactionId : ''}</td>
                  <td>{data ? data && data.transactionRefundId : ''}</td>
                  <td>{data ? data && data.orderCode : ''}</td>
                  <td>{data ? data && data.bankName : ''}</td>
                  <td>{data ? data && data.merchantName : ''}</td>
                  <td>{data ? data && data.merchantCode : ''}</td>
                  <td>{data ? data && data.terminalNameBrand : ''}</td>
                  <td>{data ? data && data.terminalIdBrand : ''}</td>
                  <td>{data ? data && data.terminalName : ''}</td>
                  <td>{data ? data && data.terminalId : ''}</td>
                  <td>{data ? numberWithDots(data && data.inputAmountRefund) : ''}</td>
                  <td>{data ? numberWithDots(data && data.amountRefund) : ''}</td>
                  <td>{data ? data && data.paymentDate : ''}</td>
                  <td>{data ? data && data.typeRefund : ''}</td>
                </tr>
              )) : null) : null}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="6" rowSpan="2" className="text-bold text-right text-danger">Tổng</td>
              <td colSpan="5" className="text-bold text-center">Số tiền yêu cầu hoàn</td>
              <td colSpan="5" className="text-bold text-center">Số tiền hoàn thực</td>
            </tr>
            <tr className="total-tr">
              <td colSpan="5" className="text-bold text-center text-danger">{numberWithDots(listTransactionRefund && listTransactionRefund.totalAmount)}</td>
              <td colSpan="5" className="text-bold text-center text-danger">{numberWithDots(listTransactionRefund && listTransactionRefund.totalRealAmount)}</td>
            </tr>
          </tfoot>
        </table>
        {((tData && tData.length === 0) || (tData === null)) ? <div className="empty-row">Không tồn tại danh sách theo yêu cầu</div> : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  listTransactionRefund: state.statisticalReport.listTransactionRefund,
});

const mapDispatchToProps = (dispatch) => ({
});

TableReport.propTypes = {
  listTransactionRefund: PropTypes.object,
  tData: PropTypes.array,
};

TableReport.defaultProps = {
  listTransactionRefund: {},
  tData: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TableReport));
