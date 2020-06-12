import React from 'react';
import {
  Card, CardBody, Col, Collapse, FormGroup, Label, Row,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Constants from '../Constants';

import { getStatusUI } from '../../../utils/commonFunction';
import { getTerminalDetailDenied } from '../../../store/actions/terminal/terminal';

class ReasonReject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenInfo: true,
    };
  }

  static getDerivedStateFromProps(props) {
    const {
      terminalDetailDenied,
    } = props;

    return {
      terminalDetailDenied,
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
      terminalDetailDenied,
    } = this.props;
    const terminalDeniedBean = terminalDetailDenied && terminalDetailDenied.terminalBean;
    return (
      <Row>
        <div className="col-md-12">
          <div className="widget-box transparent">
            <div className="widget-header widget-header-flat" role="presentation" onClick={this.handOpenInfo} onKeyPress={this.handOpenInfo}>
              <span className="text-bold">{Constants.MnMerchant.reasonReject}</span>
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
                  <Row>
                    <Col lg="12">
                      <Row>
                        <Col lg="6">
                          <FormGroup row>
                            <Col lg="6">
                              <Label>
                                {Constants.MnMerchant.processUser}
                              </Label>
                            </Col>
                            <Col lg="6">
                              <Label>
                                { (terminalDeniedBean && terminalDeniedBean.processUser !== null) ? terminalDeniedBean && terminalDeniedBean.processUser : '' }
                              </Label>
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Col lg="6">
                              <Label>
                                {Constants.MnMerchant.content}
                              </Label>
                            </Col>
                            <Col lg="6">
                              <Label>
                                { (terminalDeniedBean && terminalDeniedBean.deniedApproveDesc !== null) ? terminalDeniedBean && terminalDeniedBean.deniedApproveDesc : '' }
                              </Label>
                            </Col>
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup row>
                            <Col lg="6">
                              <Label>
                                {Constants.MnMerchant.dateTime}
                              </Label>
                            </Col>
                            <Col lg="6">
                              <Label>
                                { (terminalDeniedBean && terminalDeniedBean.modifyDate !== null) ? terminalDeniedBean && terminalDeniedBean.modifyDate : '' }
                              </Label>
                            </Col>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
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
  terminalDetailDenied: state.terminal.terminalDetailDenied,
});

const mapDispatchToProps = (dispatch) => ({
  getTerminalDetailDenied: (data) => dispatch(getTerminalDetailDenied(data)),
});

ReasonReject.defaultProps = {
  terminalDetailDenied: {},
};

ReasonReject.propTypes = {
  terminalDetailDenied: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ReasonReject));
