import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter,} from 'react-router-dom';
import {Button} from 'reactstrap';
import Constants from '../Constants';
import {getStatusUI,} from '../../../utils/commonFunction';

class TerminalTable extends Component {

  static getDerivedStateFromProps(props) {
    const {
      merchantDetail,
    } = props;
    return {
      merchantDetail,
    };
  }
  getListTerminalStatus = (itemCode) => {
    const listMerchantStatus = JSON.parse(localStorage && localStorage.getItem('TERMINAL'));
    const status = getStatusUI(listMerchantStatus, itemCode);
    return status;
  };

  goDetailTerminal = (merchantCode, merchantId, terminalId) => {
    const { history } = this.props;
    localStorage.setItem('ID_MERCHANT_TERMINAL', window.btoa(JSON.stringify(merchantId)));
    localStorage.setItem('MERCHANT_CODE', window.btoa(JSON.stringify(merchantCode)));
    localStorage.setItem('ID_TERMINAL', window.btoa(JSON.stringify(terminalId)));
    history.push({
      pathname: '/terminal/detail/',
    });
  };

  goEditTerminal = (merchantCode, merchantId, terminalId) => {
    const { history } = this.props;
    localStorage.setItem('ID_MERCHANT_TERMINAL', window.btoa(JSON.stringify(merchantId)));
    localStorage.setItem('MERCHANT_CODE', window.btoa(JSON.stringify(merchantCode)));
    localStorage.setItem('ID_TERMINAL', window.btoa(JSON.stringify(terminalId)));
    history.push({
      pathname: '/terminal/edit/',
    });
  };

  render() {
    const {
      tData,
    } = this.props;

    const {
      merchantDetail,
    } = this.state;
    return (
      <div className="fee-table_table w-100 overflow-auto">
        <table className="fee-table__table">
          <thead>
            <tr>
              <th>{Constants.MerchantDetail.stt}</th>
              <th>{Constants.MerchantDetail.terminalID}</th>
              <th>{Constants.MerchantDetail.terminalName}</th>
              <th>{Constants.MerchantDetail.rank}</th>
              <th>{Constants.MerchantDetail.registerDate}</th>
              <th>{Constants.MerchantDetail.approveOrDeniedDate}</th>
              <th>{Constants.MerchantDetail.status}</th>
              <th>{Constants.MerchantDetail.action}</th>
            </tr>
          </thead>
          <tbody>
            {(tData.listData && tData.listData.length)
              ? (tData.listData.map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data.terminalId}</td>
                  <td>{data.terminalName}</td>
                  <td>{(data.levelTerminal === 1) ? 'Chi Nhánh' : 'Điểm Bán' || ''}</td>
                  <td>{data.createDate}</td>
                  <td>{data.processDate}</td>
                  <td>{ this.getListTerminalStatus(data.status) || '' }</td>
                  <td>
                    <Button
                      title="Chi tiết Termial"
                      onClick={
                        () => this.goDetailTerminal(
                          data.taxCode, data.merchantId, data.terminalId,
                        )
                      }
                      type="button"
                      className="btn btn-primary text-center bg-transparent border border-0 text-dark"
                    >
                      <i className="fa fa-search-plus" aria-hidden="true" />
                    </Button>
                    { (merchantDetail && merchantDetail.status === 1 && data.status !== 3) ? (
                      <Button
                        title="Chỉnh sửa thông tin Terminal"
                        onClick={
                          () => this.goEditTerminal(
                            data.taxCode, data.merchantId, data.terminalId,
                          )
                        }
                        className="btn btn-primary text-center bg-transparent border border-0"
                      >
                        <i className="icon-note" />
                      </Button>
                    ) : ('')}
                  </td>
                </tr>
              ))) : null}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  merchantDetail: state.masterMerchant.merchantDetail,
});

const mapDispatchToProps = (dispatch) => ({
});


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TerminalTable));

TerminalTable.propTypes = {
  merchantDetail: PropTypes.object,
  tData: PropTypes.array,
  toRow: PropTypes.number,
  fromRow: PropTypes.number,
  history: PropTypes.object,
};

TerminalTable.defaultProps = {
  merchantDetail: {},
  tData: [],
  fromRow: 0,
  toRow: 5,
  history: '',
};
