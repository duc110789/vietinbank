import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  withRouter,
} from 'react-router-dom';
import Constants from '../Constants';

class OrganizationInternationalTable extends Component {
  render() {
    const {
      tData,
    } = this.props;

    return (
      <div className="w-100">
        <table className="fee-table__table">
          <thead>
            <tr>
              <th>{Constants.MerchantDetail.stt}</th>
              <th>{Constants.MerchantDetail.organization}</th>
              <th>{Constants.MerchantDetail.terminalID}</th>
            </tr>
          </thead>
          <tbody>
            {(tData !== undefined)
              ? (tData.map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data.organizationName}</td>
                  <td>{data.organizationMerchanID}</td>
                </tr>
              ))) : null}
          </tbody>
        </table>
        {tData === undefined ? <div className="empty-row">Không có giá trị hợp lệ</div> : null}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = (dispatch) => ({
});


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OrganizationInternationalTable));

OrganizationInternationalTable.propTypes = {
  tData: PropTypes.array,
};

OrganizationInternationalTable.defaultProps = {
  tData: [],
};
