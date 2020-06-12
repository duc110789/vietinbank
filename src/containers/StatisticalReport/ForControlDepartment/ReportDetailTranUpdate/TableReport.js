/* eslint-disable no-nested-ternary */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
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
      listDetailTransactionUpdate,
    } = this.props;

    return (
      <div className="fee-table_table w-100 overflow-auto">
        <table className="fee-table__table">
          <thead>
            <tr>
              <th className="text-center">STT</th>
              <th>{Constants.StatisticalReport.transactionCode}</th>
              <th>{Constants.StatisticalReport.billNumber}</th>
              <th>{Constants.MnMerchant.masterMerchant}</th>
              <th>{Constants.MnMerchant.merchantName}</th>
              <th>{Constants.StatisticalReport.merchantBranch}</th>
              <th>{Constants.QRCode.pointSaleName}</th>
              <th>{Constants.StatisticalReport.ttUnit}</th>
              <th>{Constants.StatisticalReport.ttType}</th>
              <th>{Constants.StatisticalReport.kmBeforeMoney}</th>
              <th>{Constants.StatisticalReport.kmAfterMoney}</th>
              <th>{Constants.MnMerchant.status}</th>
              <th>{Constants.StatisticalReport.ttTime}</th>
              <th>{Constants.StatisticalReport.updateTimeTransaction}</th>
            </tr>
          </thead>
          <tbody>
            {(tData !== null && tData
              && Array.isArray(tData))
              // eslint-disable-next-line react/prop-types
              ? (tData.length !== 0 ? tData.map((data, index) => (
                <tr key={index}>
                  <td className="text-center">{index + 1}</td>
                  <td>{data ? data && data.qrTrace : ''}</td>
                  <td>{data ? data && data.billNumber : ''}</td>
                  <td>{data ? data && data.masterMcName : ''}</td>
                  <td>{data ? data && data.merchantName : ''}</td>
                  <td>{data ? data && data.terminalNameBrand : ''}</td>
                  <td>{data ? data && data.terminalName : ''}</td>
                  <td>{data ? data && data.bankCode : ''}</td>
                  <td>{data ? data && data.payType : ''}</td>
                  <td>{data ? numberWithDots(data && data.debitAmount) : ''}</td>
                  <td>{data ? numberWithDots(data && data.realAmount) : ''}</td>
                  <td>
                    { data ? data && data.status : '' }
                  </td>
                  <td>{data ? data && data.paymentDate : ''}</td>
                  <td>{data ? data && data.modifyDate : ''}</td>
                </tr>
              )) : null) : null}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="6" rowSpan="2" className="text-bold text-right text-danger">Tổng</td>
              <td colSpan="4" className="text-bold text-center">Số tiền trước KM</td>
              <td colSpan="4" className="text-bold text-center">Số tiền sau KM</td>
            </tr>
            <tr className="total-tr">
              <td colSpan="4" className="text-bold text-center text-danger">{numberWithDots(listDetailTransactionUpdate && listDetailTransactionUpdate.totalAmount)}</td>
              <td colSpan="4" className="text-bold text-center text-danger">{numberWithDots(listDetailTransactionUpdate && listDetailTransactionUpdate.totalRealAmount)}</td>
            </tr>
          </tfoot>
        </table>
        {((tData && tData.length === 0) || (tData === null)) ? <div className="empty-row">Không tồn tại danh sách theo yêu cầu</div> : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  listDetailTransactionUpdate: state.statisticalReport.listDetailTransactionUpdate,
});

const mapDispatchToProps = (dispatch) => ({
});

TableReport.propTypes = {
  listDetailTransactionUpdate: PropTypes.object,
  tData: PropTypes.array,
};

TableReport.defaultProps = {
  listDetailTransactionUpdate: {},
  tData: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TableReport));
