import React from 'react';
import {
  Collapse, CardBody, Card, Label, Row, Col, FormGroup,
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

class ReasonReject extends React.Component {
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
    const merchantDeniedBean = merchantDetailDenied && merchantDetailDenied.merchant;
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
                                {Constants.MnMerchant.deniedUser}
                              </Label>
                            </Col>
                            <Col lg="6">
                              <Label>
                                { merchantDeniedBean && merchantDeniedBean.processUser !== null ? merchantDeniedBean && merchantDeniedBean.processUser : '' }
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
                                { merchantDeniedBean && merchantDeniedBean.deniedApproveDesc ? merchantDeniedBean && merchantDeniedBean.deniedApproveDesc : '' }
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
                                { merchantDeniedBean && merchantDeniedBean.modifyDate ? merchantDeniedBean && merchantDeniedBean.modifyDate : '' }
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
  merchantDetailDenied: state.masterMerchant.merchantDetailDenied,
});

const mapDispatchToProps = (dispatch) => ({
  getMerchantDetailDenied: (data) => dispatch(getMerchantDetailDenied(data)),
});

ReasonReject.defaultProps = {
  merchantDetailDenied: {},
};

ReasonReject.propTypes = {
  merchantDetailDenied: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ReasonReject));
