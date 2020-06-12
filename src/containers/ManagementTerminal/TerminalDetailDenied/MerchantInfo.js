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

class MerchantInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenInfo: true,
      isOpenAccount: true,
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

  getListTerminaltatus = (itemCode) => {
    const listTerminalStatus = JSON.parse(localStorage && localStorage.getItem('TERMINAL'));
    const status = getStatusUI(listTerminalStatus, itemCode);
    return status;
  };

  handOpenInfo = () => {
    const { isOpenInfo } = this.state;
    this.setState({
      isOpenInfo: !isOpenInfo,
    });
  };

  handOpenAccount = () => {
    const { isOpenAccount } = this.state;
    this.setState({
      isOpenAccount: !isOpenAccount,
    });
  };

  render() {
    const {
      isOpenInfo,
      isOpenAccount,
    } = this.state;

    const {
      terminalDetailDenied,
    } = this.props;
    const terminalDeniedBean = terminalDetailDenied && terminalDetailDenied.terminalBean;
    const merchantDeniedBean = terminalDetailDenied && terminalDetailDenied.merchantBean;
    return (
      <Row>
        <div className="col-md-12">
          <div className="widget-box transparent">
            <div className="widget-header widget-header-flat" role="presentation" onClick={this.handOpenInfo} onKeyPress={this.handOpenInfo}>
              <span className="text-bold">{Constants.MerchantDetail.mcInfo}</span>
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
                    <Col lg="5">
                      <Label htmlFor="code">
                        {Constants.MnMerchant.merchantId}
                        {' '}
                        *
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>
                        { (merchantDeniedBean && merchantDeniedBean.merchantCode !== null) ? merchantDeniedBean && merchantDeniedBean.merchantCode : ''}
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label htmlFor="code">
                        {Constants.MnMerchant.merchantName}
                        {' '}
                        *
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>
                        { (merchantDeniedBean && merchantDeniedBean.merchantName !== null) ? merchantDeniedBean && merchantDeniedBean.merchantName : '' }
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.shortName}
                        {' '}
                        *
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>
                        { (merchantDeniedBean && merchantDeniedBean.merchantBrand !== null) ? merchantDeniedBean && merchantDeniedBean.merchantBrand : '' }
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.masterMerchant}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>
                        { (merchantDeniedBean && merchantDeniedBean.masterMerchantCode !== null) ? merchantDeniedBean && merchantDeniedBean.masterMerchantCode : '' }
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.supplierCode}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>
                        { (merchantDeniedBean && merchantDeniedBean.providerCode !== null) ? merchantDeniedBean && merchantDeniedBean.providerCode : '' }
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.nationalMCC}
                        {' '}
                        *
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>
                        {terminalDeniedBean && terminalDeniedBean.mccQT && terminalDeniedBean.mccQT.merchantTypeId !== null ? terminalDeniedBean && terminalDeniedBean.mccQT && terminalDeniedBean.mccQT.merchantTypeCode : ''}
                        {' - '}
                        {terminalDeniedBean && terminalDeniedBean.mccQT && terminalDeniedBean.mccQT.merchantTypeName !== null ? terminalDeniedBean && terminalDeniedBean.mccQT && terminalDeniedBean.mccQT.merchantTypeName : ''}
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.registeredBusinessAddress}
                        {' '}
                        *
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>
                        { merchantDeniedBean && merchantDeniedBean.businessAddress !== null ? merchantDeniedBean && merchantDeniedBean.businessAddress : ''}
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.businessAddress}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>
                        { merchantDeniedBean && merchantDeniedBean.address !== null ? merchantDeniedBean && merchantDeniedBean.address : ''}
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.city}
                        {' '}
                        *
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>
                        { merchantDeniedBean && merchantDeniedBean.provinceName !== null ? merchantDeniedBean && merchantDeniedBean.provinceName : ''}
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.district}
                        {' '}
                        *
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>
                        { merchantDeniedBean && merchantDeniedBean.districtCode !== null ? merchantDeniedBean && merchantDeniedBean.districtCode : ''}
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.zipCode}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>
                        { merchantDeniedBean && merchantDeniedBean.pinCode !== null ? merchantDeniedBean && merchantDeniedBean.pinCode : ''}
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.taxCode}
                        {' '}
                        *
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>
                        { merchantDeniedBean && terminalDeniedBean.taxCode !== null ? merchantDeniedBean && terminalDeniedBean.taxCode : '' }
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.website}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>
                        { merchantDeniedBean && terminalDeniedBean.website !== null ? merchantDeniedBean && terminalDeniedBean.website : '' }
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.status}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>
                        { terminalDeniedBean && terminalDeniedBean.status !== null ? this.getListTerminaltatus(terminalDeniedBean && terminalDeniedBean.status) : ''}
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MerchantDetail.businessLicence}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <a href={merchantDeniedBean && merchantDeniedBean.businessCertUrl}> Download </a>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MerchantDetail.domainLicence}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>
                        <a href={merchantDeniedBean && merchantDeniedBean.domainCertUrl}> Download </a>
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MerchantDetail.accountLicence}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>
                        <a href={merchantDeniedBean && merchantDeniedBean.businessTaxCertUrl}> Download </a>
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MerchantDetail.contractSign}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>
                        <a href={merchantDeniedBean && merchantDeniedBean.contractUrl}> Download </a>
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.numberCard}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>
                        <a href={merchantDeniedBean && merchantDeniedBean.identifyCardUrl}> Download </a>
                      </Label>
                    </Col>
                  </FormGroup>
                </CardBody>
              </Card>
            </Collapse>
          </div>
        </div>
        <div className="col-md-12">
          <div className="widget-box transparent">
            <div className="widget-header widget-header-flat" role="presentation" onClick={this.handOpenAccount} onKeyPress={this.handOpenAccount}>
              <span className="text-bold">{Constants.MerchantDetail.accountMerchantWebAndApp}</span>
              <div className="widget-toolbar">
                <span data-action="collapse">
                  {isOpenAccount ? (
                    <i className="ace-icon fa fa-chevron-up" />
                  ) : (
                    <i className="ace-icon fa fa-chevron-down" />
                  )}
                </span>
              </div>
            </div>
            <Collapse isOpen={isOpenAccount} className="show-information">
              <Card>
                <CardBody>
                  <FormGroup row>
                    <Col lg="6">
                      <Label>
                        {Constants.MerchantDetail.accountMerchant}
                      </Label>
                    </Col>
                    <Col lg="6">
                      <Label>
                        { merchantDeniedBean && merchantDeniedBean.merchantSiteUser !== null ? merchantDeniedBean && merchantDeniedBean.merchantSiteUser : ''}
                      </Label>
                    </Col>
                  </FormGroup>
                </CardBody>
              </Card>
            </Collapse>
          </div>
        </div>
        <div className="col-md-12">
          <div className="widget-box transparent">
            <div className="widget-header widget-header-flat" role="presentation" onClick={this.handOpenAccount} onKeyPress={this.handOpenAccount}>
              <span className="text-bold">{Constants.MerchantDetail.agentDevelopmentBranch}</span>
              <div className="widget-toolbar">
                <span data-action="collapse">
                  {isOpenAccount ? (
                    <i className="ace-icon fa fa-chevron-up" />
                  ) : (
                    <i className="ace-icon fa fa-chevron-down" />
                  )}
                </span>
              </div>
            </div>
            <Collapse isOpen={isOpenAccount} className="show-information">
              <Card>
                <CardBody>
                  <FormGroup row>
                    <Col lg="6">
                      <Label>
                        {Constants.MnMerchant.developmentUnit}
                      </Label>
                    </Col>
                    <Col lg="6">
                      <Label>
                        { merchantDeniedBean && merchantDeniedBean.departmentBean && merchantDeniedBean.departmentBean.departmentName ? merchantDeniedBean && merchantDeniedBean.departmentBean && merchantDeniedBean.departmentBean.departmentName : ''}
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="6">
                      <Label>
                        {Constants.MnMerchant.staff}
                      </Label>
                    </Col>
                    <Col lg="6">
                      <Label>
                        { merchantDeniedBean && merchantDeniedBean.staffBean && merchantDeniedBean.staffBean.staffCode !== null ? merchantDeniedBean && merchantDeniedBean.staffBean && merchantDeniedBean.staffBean.staffCode : ''}
                        {' - '}
                        { merchantDeniedBean && merchantDeniedBean.staffBean && merchantDeniedBean.staffBean.staffName !== null ? merchantDeniedBean && merchantDeniedBean.staffBean && merchantDeniedBean.staffBean.staffName : ''}
                      </Label>
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
  terminalDetailDenied: state.terminal.terminalDetailDenied,
});

const mapDispatchToProps = (dispatch) => ({
  getTerminalDetailDenied: (data) => dispatch(getTerminalDetailDenied(data)),
});

MerchantInfo.defaultProps = {
  terminalDetailDenied: {},
};

MerchantInfo.propTypes = {
  terminalDetailDenied: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MerchantInfo));
