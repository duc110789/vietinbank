/* eslint-disable no-nested-ternary */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter,} from 'react-router-dom';
import Constants from '../../Constants';

import {numberWithDots,} from '../../../../utils/commonFunction';

class TableReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      tData,
      listTransactionMerchantBranch,
    } = this.props;

    return (
      <div className="fee-table_table w-100 overflow-auto">
        <table className="fee-table__table">
          <thead>
            <tr>
              <th className="text-center">STT</th>
              <th>{Constants.MnMerchant.merchantName}</th>
              <th>{Constants.MnMerchant.merchantId}</th>
              <th>{Constants.StatisticalReport.merchantBranch}</th>
              <th>{Constants.StatisticalReport.merchantCode}</th>
              <th>{Constants.StatisticalReport.amount}</th>
              <th>{Constants.StatisticalReport.kmBeforeMoney}</th>
              <th>{Constants.StatisticalReport.kmAfterMoney}</th>
            </tr>
          </thead>
          <tbody>
            {(tData !== null && tData
              && Array.isArray(tData))
              // eslint-disable-next-line react/prop-types
              ? (tData.length !== 0 ? tData.map((data, index) => (
                <tr key={index}>
                  <td className="text-center">{index + 1}</td>
                  <td>{data ? data && data.masterMcName : ''}</td>
                  <td>{data ? data && data.merchantId : ''}</td>
                  <td>{data ? data && data.terminalNameBrand : ''}</td>
                  <td>{data ? data && data.terminalName : ''}</td>
                  <td>{data ? numberWithDots(data && data.debitAmount) : ''}</td>
                  <td>{data ? numberWithDots(data && data.realAmount) : ''}</td>
                </tr>
              )) : null) : null}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="5" rowSpan="2" className="text-bold text-right text-danger">Tổng</td>
              <td colSpan="1" className="text-bold text-center">Số lượng</td>
              <td colSpan="1" className="text-bold text-center">Tiền trước km</td>
              <td colSpan="1" className="text-bold text-center">Tiền sau km</td>
            </tr>
            <tr className="total-tr">
              <td colSpan="1" className="text-bold text-center text-danger">{numberWithDots(listTransactionMerchantBranch && listTransactionMerchantBranch.totalTran)}</td>
              <td colSpan="1" className="text-bold text-center text-danger">{numberWithDots(listTransactionMerchantBranch && listTransactionMerchantBranch.totalAmount)}</td>
              <td colSpan="1" className="text-bold text-center text-danger">{numberWithDots(listTransactionMerchantBranch && listTransactionMerchantBranch.totalRealAmount)}</td>
            </tr>
          </tfoot>
        </table>
        {((tData && tData.length === 0) || (tData === null)) ? <div className="empty-row">Không tồn tại danh sách theo yêu cầu</div> : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  listTransactionMerchantBranch: state.statisticalReport.listTransactionMerchantBranch,
});

const mapDispatchToProps = (dispatch) => ({
});

TableReport.propTypes = {
  listTransactionMerchantBranch: PropTypes.object,
  tData: PropTypes.array,
};

TableReport.defaultProps = {
  listTransactionMerchantBranch: {},
  tData: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TableReport));
