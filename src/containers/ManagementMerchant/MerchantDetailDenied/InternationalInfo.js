import React from 'react';
import {
  Collapse, CardBody, Card, Row, Col, FormGroup,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Constants from '../Constants';

import {
  getStatusUI,
} from '../../../utils/commonFunction';
import {
  getMerchantDetailDenied,
} from '../../../store/actions/masterMerchant/masterMerchant';

class InternationalInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenInfo: true,
    };
  }

  static getDerivedStateFromProps(props) {
    const {
      merchantDetailDenied,
    } = props;

    return {
      merchantDetailDenied,
    };
  }

  getListMerchantStatus = (itemCode) => {
    const listMerchantStatus = JSON.parse(localStorage && localStorage.getItem('MERCHANT'));
    const status = getStatusUI(listMerchantStatus, itemCode);
    return status;
  };

  handOpenInfo = () => {
    const { isOpenInfo } = this.state;
    this.setState({
      isOpenInfo: !isOpenInfo,
    });
  };

  render() {
    const {
      isOpenInfo,
    } = this.state;

    const {
      merchantDetailDenied,
    } = this.props;
    const terminalDeniedBean = merchantDetailDenied && merchantDetailDenied.terminal;
    return (
      <Row>
        <div className="col-md-12">
          <div className="widget-box transparent">
            <div className="widget-header widget-header-flat" role="presentation" onClick={this.handOpenInfo} onKeyPress={this.handOpenInfo}>
              <span className="text-bold">{Constants.MerchantDetail.organizationInternationalContact}</span>
              <div className="widget-toolbar">
                <span data-action="collapse">
                  {isOpenInfo ? (
                    <i className="ace-icon fa fa-chevron-up" />
                  ) : (
                    <i className="ace-icon fa fa-chevron-down" />
                  )}
                </span>
              </div>
            </div>
            <Collapse isOpen={isOpenInfo} className="show-information">
              <Card>
                <CardBody>
                  <FormGroup row>
                    <Col lg="12">
                      <div className="fee-table_table w-100 overflow-auto">
                        <table className="fee-table__table">
                          <thead>
                            <tr>
                              <th className="text-center">STT</th>
                              <th>{Constants.MerchantDetail.organization}</th>
                              <th>{Constants.MerchantDetail.terminalID}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="text-center">{1}</td>
                              <td>{Constants.MnMerchant.visaPan}</td>
                              <td>{terminalDeniedBean && terminalDeniedBean.visaPan !== null ? terminalDeniedBean && terminalDeniedBean.visaPan : ''}</td>
                            </tr>
                            <tr>
                              <td className="text-center">{2}</td>
                              <td>{Constants.MnMerchant.masterCartPan}</td>
                              <td>{terminalDeniedBean && terminalDeniedBean.masterPan !== null ? terminalDeniedBean && terminalDeniedBean.masterPan : ''}</td>
                            </tr>
                            <tr>
                              <td className="text-center">{3}</td>
                              <td>{Constants.MnMerchant.jCBPan}</td>
                              <td>{terminalDeniedBean && terminalDeniedBean.jcbPan !== null ? terminalDeniedBean && terminalDeniedBean.jcbPan : ''}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </Col>
                  </FormGroup>
                </CardBody>
              </Card>
            </Collapse>
          </div>
        </div>
      </Row>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  merchantDetailDenied: state.masterMerchant.merchantDetailDenied,
});

const mapDispatchToProps = (dispatch) => ({
  getMerchantDetailDenied: (data) => dispatch(getMerchantDetailDenied(data)),
});

InternationalInfo.defaultProps = {
  merchantDetailDenied: {},
};

InternationalInfo.propTypes = {
  merchantDetailDenied: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(InternationalInfo));
