/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  withRouter,
} from 'react-router-dom';
import Constants from '../Constants';

class TableMerchant extends Component {
  goDetail = (id) => {
    const { history } = this.props;
    history.push({
      pathname: '/merchant/detail/',
    });
    localStorage.setItem('ID_MERCHANT_DETAIL', window.btoa(JSON.stringify(id)));
  };

  goEdit = (id) => {
    const { history } = this.props;
    history.push({
      pathname: '/merchant/edit/',
    });
    localStorage.setItem('ID_MERCHANT_DETAIL', window.btoa(JSON.stringify(id)));
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
                    {
                      <Button
                        title="Chi tiết thông tin Merchant"
                        onClick={() => this.goDetail(data.merchantCode)}
                      >
                        <i className="icon-info" />
                      </Button>
                    }
                    {
                      data.status === -1 ? null : (data.status === 3 ? (
                        <Button
                          title="Phê duyệt"
                          onClick={() => this.goApproved(data.merchantCode)}
                        >
                          <i className="icon-blue fa fa-check-circle" />
                        </Button>
                      ) : (
                        data.status === 6 ? null : (
                          <Button
                            title="Cập nhật thông tin Merchant"
                            onClick={() => this.goEdit(data.merchantCode)}
                          >
                            <i className="icon-note" />
                          </Button>
                        )
                      ))
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

TableMerchant.propTypes = {
  tData: PropTypes.array,
  history: PropTypes.object,
  currentPage: PropTypes.number,
  perPage: PropTypes.number,
};

TableMerchant.defaultProps = {
  tData: [],
  history: '',
  currentPage: 0,
  perPage: 0,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TableMerchant));
