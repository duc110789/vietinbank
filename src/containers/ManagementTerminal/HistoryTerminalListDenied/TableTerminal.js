/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Constants from '../Constants';
import { convertRankTerminal } from '../../../utils/commonFunction';

class TableTerminal extends Component {
  goDetail = (terDeniendID, merchantId, terminalId) => {
    const { history } = this.props;
    localStorage.setItem('ID_MERCHANT_TERMINAL', window.btoa(JSON.stringify(merchantId)));
    localStorage.setItem('ID_TERMINAL', window.btoa(JSON.stringify(terminalId)));
    localStorage.setItem('ID_TERMINAL_DENIED', window.btoa(JSON.stringify(terDeniendID)));
    history.push({
      pathname: '/terminalDetailDenied/detail',
    });
  };

  render() {
    const {
      tData,
    } = this.props;

    return (
      <div className="fee-table_table w-100 overflow-auto">
        <table className="fee-table__table">
          <thead>
            <tr>
              <th className="text-center">STT</th>
              <th>{Constants.MerchantDetail.terminalID}</th>
              <th>{Constants.MerchantDetail.terminalName}</th>
              <th>{Constants.MnMerchant.rank}</th>
              <th>{Constants.MerchantDetail.mcId}</th>
              <th>{Constants.MnMerchant.merchantName}</th>
              <th>{Constants.MnMerchant.deniedDate}</th>
              <th>{Constants.MnMerchant.processUser}</th>
              <th>{Constants.MnMerchant.reason}</th>
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
                  <td>{(data && data.levelTerminal) ? convertRankTerminal(data && data.levelTerminal) : ''}</td>
                  <td>{data && data.merchantCode}</td>
                  <td>{data && data.merchantName}</td>
                  <td>{(data && data.deniedDate) && (data && data.deniedDate).substring(0, 10)}</td>
                  <td>{data && data.processDeniedUser}</td>
                  <td>{data && data.deniedDesc}</td>
                  <td className="icon-fee text-left">
                    <Button
                      title="Chi tiết thông tin Terminal"
                      onClick={() => this.goDetail(data && data.id, data && data.merchantId, data && data.terminalId)}
                    >
                      <i className="icon-info" />
                    </Button>
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
  merchantCode: state.masterMerchant.merchantCode,
});

const mapDispatchToProps = (dispatch) => ({
});

TableTerminal.propTypes = {
  tData: PropTypes.array,
  history: PropTypes.object,
};

TableTerminal.defaultProps = {
  tData: [],
  history: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TableTerminal));
