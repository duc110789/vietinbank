/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Constants from '../Constants';
import { convertRankTerminal } from '../../../utils/commonFunction';

class TableTerminal extends Component {
  goDetail = (merchantCode, merchantId, terminalId) => {
    const { history } = this.props;
    localStorage.setItem('ID_MERCHANT_TERMINAL', window.btoa(JSON.stringify(merchantId)));
    localStorage.setItem('MERCHANT_CODE', window.btoa(JSON.stringify(merchantCode)));
    localStorage.setItem('ID_TERMINAL', window.btoa(JSON.stringify(terminalId)));
    history.push({
      pathname: '/terminal/detail/',
    });
  };

  goApproved = (merchantCode, merchantId, terminalId) => {
    const { history } = this.props;
    localStorage.setItem('ID_MERCHANT_TERMINAL', window.btoa(JSON.stringify(merchantId)));
    localStorage.setItem('MERCHANT_CODE', window.btoa(JSON.stringify(merchantCode)));
    localStorage.setItem('ID_TERMINAL', window.btoa(JSON.stringify(terminalId)));
    history.push({
      pathname: '/terminal/approved/',
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
              <th>{Constants.MerchantDetail.rank}</th>
              <th>{Constants.MerchantDetail.mcId}</th>
              <th>{Constants.MerchantDetail.mcName}</th>
              <th>{Constants.MnMerchant.nationalMCC}</th>
              <th>{Constants.MnMerchant.address}</th>
              <th>{Constants.MnMerchant.contact}</th>
              <th>{Constants.MnMerchant.contactInfo}</th>
              <th>{Constants.MnMerchant.dateTimeCreate}</th>
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
                  <td>{data && data.businessProductName}</td>
                  <td>{data && data.terminalAddress}</td>
                  <td>{data && data.contact}</td>
                  <td>{data && data.contactPhone}</td>
                  <td>{data && data.createdDate}</td>
                  <td className="icon-fee text-left">
                    {
                      <Button
                        title="Chi tiết thông tin Terminal"
                        onClick={() => this.goDetail(data.merchantCode, data.merchantId, data.terminalId)}
                      >
                        <i className="icon-info" />
                      </Button>
                    }
                    {
                      <Button
                        title="Duyệt thông tin Terminal"
                        onClick={() => this.goApproved(data.merchantCode, data.merchantId, data.terminalId)}
                      >
                        <i className="icon-blue fa fa-check-circle" />
                      </Button>
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

TableTerminal.propTypes = {
  tData: PropTypes.array,
  history: PropTypes.object,
};

TableTerminal.defaultProps = {
  tData: [],
  history: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TableTerminal));
