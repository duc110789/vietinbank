/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  withRouter,
} from 'react-router-dom';
import Constants from '../Constants';
import { getMerchantListDenied } from '../../../store/actions/masterMerchant/masterMerchant';

class TableMerchant extends Component {
  goDetail = (deniedId) => {
    const { history } = this.props;
    history.push({
      pathname: '/historyMerchantDenied/detail',
    });
    localStorage.setItem('DENIED_ID', window.btoa(JSON.stringify(deniedId)));
  };

  render() {
    const {
      tData, perPage, currentPage,
    } = this.props;

    return (
      <div className="fee-table_table w-100 overflow-auto">
        <table className="fee-table__table">
          <thead>
            <tr>
              <th className="text-center">STT</th>
              <th>{Constants.MerchantDetail.mcId}</th>
              <th>{Constants.MnMerchant.merchantName}</th>
              <th>{Constants.MnMerchant.nationalMCC}</th>
              <th>{Constants.MnMerchant.reason}</th>
              <th>{Constants.MnMerchant.processDate}</th>
              <th>{Constants.MnMerchant.deniedUser}</th>
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
                  <td>{data && data.merchantName}</td>
                  <td>{data && data.merchantTypeName}</td>
                  <td>{data && data.processDesc}</td>
                  <td>{data && data.processDate}</td>
                  <td>
                    {data && data.processUser}
                  </td>
                  <td className="icon-fee text-left">
                    <Button
                      title="Thông tin chi tiết Merchant bị từ chối"
                      onClick={() => this.goDetail(data.deniedId)}
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
  dataSearchMerchant: state.masterMerchant.dataSearchMerchant,
  isOpenLockModal: state.masterMerchant.isOpenLockModal,
  isOpenUnLockModal: state.masterMerchant.isOpenUnLockModal,
  merchantCode: state.masterMerchant.merchantCode,
});

const mapDispatchToProps = (dispatch) => ({
  getMerchantListDenied: (data) => dispatch(getMerchantListDenied(data)),
});

TableMerchant.propTypes = {
  tData: PropTypes.array,
  dataSearchMerchant: PropTypes.object,
  merchantCode: PropTypes.object,
  history: PropTypes.object,
  getMerchantListDenied: PropTypes.func,
  currentPage: PropTypes.number,
  perPage: PropTypes.number,
};

TableMerchant.defaultProps = {
  tData: [],
  dataSearchMerchant: null,
  merchantCode: {},
  getMerchantListDenied: () => {},
  history: '',
  currentPage: 0,
  perPage: 0,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TableMerchant));
