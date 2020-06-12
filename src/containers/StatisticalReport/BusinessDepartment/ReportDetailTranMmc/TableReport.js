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
      listTransactionMmc,
    } = this.props;

    return (
      <div className="fee-table_table w-100 overflow-auto">
        <table className="fee-table__table">
          <thead>
            <tr>
              <th className="text-center">STT</th>
              <th>{Constants.MnMerchant.merchantName}</th>
              <th>{Constants.StatisticalReport.merchantBranch}</th>
              <th>{Constants.QRCode.pointSaleName}</th>
              <th>{Constants.StatisticalReport.transactionTotal}</th>
              <th>{Constants.StatisticalReport.salesTotal}</th>
            </tr>
          </thead>
          <tbody>
            {(tData !== null && tData
              && Array.isArray(tData))
              // eslint-disable-next-line react/prop-types
              ? (tData.length !== 0 ? tData.map((data, index) => (
                <tr key={index}>
                  <td className="text-center">{index + 1}</td>
                  <td>{data ? data && data.merchantName : ''}</td>
                  <td>{data ? data && data.merchantBranchName : ''}</td>
                  <td>{data ? data && data.terminalName : ''}</td>
                  <td>{data ? data && data.quantity : ''}</td>
                  <td>{data ? numberWithDots(data && data.totalDebitAmount) : ''}</td>
                </tr>
              )) : null) : null}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4" rowSpan="2" className="text-bold text-right text-danger">Tổng</td>
              <td className="text-bold">{Constants.StatisticalReport.transactions}</td>
              <td className="text-bold">{Constants.StatisticalReport.sales}</td>
            </tr>
            <tr className="total-tr">
              <td colSpan="1" className="text-bold text-danger">{numberWithDots(listTransactionMmc && listTransactionMmc.totalTran)}</td>
              <td colSpan="1" className="text-bold text-danger">{numberWithDots(listTransactionMmc && listTransactionMmc.totalAmount)}</td>
            </tr>
          </tfoot>
        </table>
        {((tData && tData.length === 0) || (tData === null)) ? <div className="empty-row">Không tồn tại danh sách theo yêu cầu</div> : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  listTransactionMmc: state.statisticalReport.listTransactionMmc,
});

const mapDispatchToProps = (dispatch) => ({
});

TableReport.propTypes = {
  listTransactionMmc: PropTypes.object,
  tData: PropTypes.array,
};

TableReport.defaultProps = {
  listTransactionMmc: {},
  tData: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TableReport));
