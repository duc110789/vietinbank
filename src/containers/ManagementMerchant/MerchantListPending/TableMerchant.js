/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  withRouter,
} from 'react-router-dom';
import Constants from '../Constants';
import {
  getListMerchantStatus,
} from '../../../utils/commonFunction';

class TableMerchant extends Component {
  goDetail = (id) => {
    const { history } = this.props;
    history.push({
      pathname: '/merchant/detail/',
    });
    localStorage.setItem('ID_MERCHANT_DETAIL', window.btoa(JSON.stringify(id)));
  };

  goApproved = (id) => {
    const { history } = this.props;
    localStorage.setItem('ID_MERCHANT_DETAIL', window.btoa(JSON.stringify(id)));
    history.push({
      pathname: '/merchant/approved/',
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
              <th>{Constants.MerchantDetail.mcId}</th>
              <th>{Constants.MnMerchant.merchantName}</th>
              <th>{Constants.MnMerchant.nationalMCC}</th>
              <th>Tình trạng</th>
              <th>Ngày tạo</th>
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
                  <td>{data && data.merchantCode}</td>
                  <td>{data && data.merchantName}</td>
                  <td>{`${data && data.merchantTypeCode} - ${data && data.merchantTypeName}`}</td>
                  <td>
                    {getListMerchantStatus(data.status) || ''}
                  </td>
                  <td>{data && data.createDate}</td>
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
                          title="Duyệt thông tin Merchant"
                          onClick={() => this.goApproved(data.merchantCode)}
                        >
                          <i className="icon-blue fa fa-check-circle" />
                        </Button>
                      ) : (
                        data.status === 6 ? null : (
                          <Button
                            title="Chỉnh sửa"
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
};

TableMerchant.defaultProps = {
  tData: [],
  history: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TableMerchant));
