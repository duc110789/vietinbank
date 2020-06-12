/* eslint-disable no-nested-ternary */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter,} from 'react-router-dom';
import Constants from '../../Constants';

import {numberWithDots} from '../../../../utils/commonFunction';

class TableReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      tData,
      listTransactionInterMcc,
    } = this.props;

    return (
      <div className="fee-table_table w-100 overflow-auto">
        <table className="fee-table__table">
          <thead>
            <tr>
              <th className="text-center">STT</th>
              <th>{Constants.StatisticalReport.internationalMccName}</th>
              <th>{Constants.StatisticalReport.midTotal}</th>
              <th>{Constants.StatisticalReport.tidTotal}</th>
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
                  <td>{data ? data && data.merchantType : ''}</td>
                  <td>{data ? data && data.totalMid : ''}</td>
                  <td>{data ? data && data.totalTid : ''}</td>
                  <td>{data ? data && data.quantity : ''}</td>
                  <td>{data ? numberWithDots(data && data.totalDebitAmount) : ''}</td>
                </tr>
              )) : null) : null}
          </tbody>
          <tfoot className="tran-mcc">
            <tr>
              <td rowSpan="2" className="text-bold text-center text-danger">Tổng</td>
              <td className="text-bold">{Constants.StatisticalReport.internationalMcc}</td>
              <td className="text-bold">{Constants.StatisticalReport.mid}</td>
              <td className="text-bold">{Constants.StatisticalReport.tid}</td>
              <td className="text-bold">{Constants.StatisticalReport.transactions}</td>
              <td className="text-bold">{Constants.StatisticalReport.sales}</td>
            </tr>
            <tr className="total-tr">
              <td>{listTransactionInterMcc ? listTransactionInterMcc && listTransactionInterMcc.totalRow : ''}</td>
              <td>{listTransactionInterMcc ? listTransactionInterMcc && listTransactionInterMcc.totalMid : ''}</td>
              <td>{listTransactionInterMcc ? listTransactionInterMcc && listTransactionInterMcc.totalTid : ''}</td>
              <td>{listTransactionInterMcc ? listTransactionInterMcc && listTransactionInterMcc.totalTran : ''}</td>
              <td className="text-bold text-danger">{numberWithDots(listTransactionInterMcc && listTransactionInterMcc.totalAmount)}</td>
            </tr>
          </tfoot>
        </table>
        {((tData && tData.length === 0) || (tData === null)) ? <div className="empty-row">Không tồn tại danh sách theo yêu cầu</div> : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  listTransactionInterMcc: state.statisticalReport.listTransactionInterMcc,
});

const mapDispatchToProps = (dispatch) => ({
});

TableReport.propTypes = {
  listTransactionInterMcc: PropTypes.object,
  tData: PropTypes.array,
};

TableReport.defaultProps = {
  listTransactionInterMcc: {},
  tData: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TableReport));
