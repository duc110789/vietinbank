import React from 'react';
import {Card, CardBody, Col, Collapse, FormGroup, Label, Row,} from 'reactstrap';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import Constants from '../Constants';
import {getStatusUI,} from '../../../utils/commonFunction';

class MerchantInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenInfo: true,
      isOpenAccount: true,
      isOpenDevelopmentUnit: true,
      isOpenInfoTerminal: true,
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

  handOpenAccount = () => {
    const { isOpenAccount } = this.state;
    this.setState({
      isOpenAccount: !isOpenAccount,
    });
  };

  handOpenTerminal = () => {
    const { isOpenInfoTerminal } = this.state;
    this.setState({
      isOpenInfoTerminal: !isOpenInfoTerminal,
    });
  };

  handOpenDevelopmentUnit = () => {
    const { isOpenDevelopmentUnit } = this.state;
    this.setState({
      isOpenDevelopmentUnit: !isOpenDevelopmentUnit,
    });
  };

  render() {
    const {
      isOpenInfo,
      isOpenAccount,
      isOpenDevelopmentUnit,
      isOpenInfoTerminal,
    } = this.state;
    const {
      merchantApproved,
      terminalApproved,
    } = this.props;
    return (
      <Row>
        <div className="col-md-12">
          <form className="widget-box transparent">
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
                    <Col lg="6">
                      <Label>
                        {Constants.MerchantDetail.mcId}
                      </Label>
                    </Col>
                    <Col lg="6">
                      <Label>
                        { merchantApproved ? merchantApproved && merchantApproved.merchantCode : ''}
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="6">
                      <Label>
                        {Constants.MerchantDetail.mcName}
                      </Label>
                    </Col>
                    <Col lg="6">
                      <Label>
                        { merchantApproved ? merchantApproved && merchantApproved.merchantName : ''}
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="6">
                      <Label>
                        {Constants.MerchantDetail.abbreviationName}
                      </Label>
                    </Col>
                    <Col lg="6">
                      <Label>
                        { merchantApproved ? merchantApproved && merchantApproved.merchantBrand : ''}
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="6">
                      <Label>
                        {Constants.MerchantDetail.masterMerchant}
                      </Label>
                    </Col>
                    <Col lg="6">
                      <Label>
                        { merchantApproved ? merchantApproved && merchantApproved.masterMerchantCode : ''}
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="6">
                      <Label>
                        {Constants.MerchantDetail.billingCode}
                      </Label>
                    </Col>
                    <Col lg="6">
                      <Label>
                        { merchantApproved ? merchantApproved && merchantApproved.providerCode : ''}
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="6">
                      <Label>
                        {Constants.MerchantDetail ? Constants.MerchantDetail.mccInternational : []}
                      </Label>
                    </Col>
                    <Col lg="6">
                      <Label>
                        { merchantApproved && merchantApproved.merchantTypeBean && `${merchantApproved.merchantTypeBean.merchantTypeCode} - ${merchantApproved.merchantTypeBean.merchantTypeName}`}
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="6">
                      <Label>
                        {Constants.MerchantDetail.addressBusinessRegister}
                      </Label>
                    </Col>
                    <Col lg="6">
                      <Label>
                        { merchantApproved ? merchantApproved && merchantApproved.address : ''}
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="6">
                      <Label>
                        {Constants.MerchantDetail.addressBusiness}
                      </Label>
                    </Col>
                    <Col lg="6">
                      <Label>
                        { merchantApproved ? merchantApproved && merchantApproved.businessAddress : ''}
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="6">
                      <Label>
                        {Constants.MerchantDetail.province}
                      </Label>
                    </Col>
                    <Col lg="6">
                      <Label>
                        { merchantApproved ? merchantApproved && merchantApproved.provinceName : ''}
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="6">
                      <Label>
                        {Constants.MerchantDetail.district}
                      </Label>
                    </Col>
                    <Col lg="6">
                      <Label>
                        { merchantApproved ? merchantApproved && merchantApproved.districtName : ''}
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="6">
                      <Label>
                        {Constants.MerchantDetail.zipCode}
                      </Label>
                    </Col>
                    <Col lg="6">
                      <Label>
                        { merchantApproved ? merchantApproved && merchantApproved.pinCode : ''}
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="6">
                      <Label>
                        {Constants.MerchantDetail.taxCode}
                      </Label>
                    </Col>
                    <Col lg="6">
                      <Label>
                        { merchantApproved ? merchantApproved && merchantApproved.merchantCode : ''}
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="6">
                      <Label>
                        {Constants.MerchantDetail.webSite}
                      </Label>
                    </Col>
                    <Col lg="6">
                      <Label>
                        { merchantApproved ? merchantApproved && merchantApproved.website : ''}
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="6">
                      <Label>
                        {Constants.MerchantDetail.status}
                      </Label>
                    </Col>
                    <Col lg="6">
                      <Label>
                        { this.getListMerchantStatus(merchantApproved && merchantApproved.status) || '' }
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="6">
                      <Label>
                        {Constants.MerchantDetail.businessLicence}
                      </Label>
                    </Col>
                    <Col lg="6">
                      <a href={merchantApproved && merchantApproved.businessCertUrl}> Download </a>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="6">
                      <Label>
                        {Constants.MerchantDetail.domainLicence}
                      </Label>
                    </Col>
                    <Col lg="6">
                      <a href={merchantApproved && merchantApproved.domainCertUrl}> Download </a>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="6">
                      <Label>
                        {Constants.MerchantDetail.accountLicence}
                      </Label>
                    </Col>
                    <Col lg="6">
                      <a href={merchantApproved && merchantApproved.businessTaxCertUrl}> Download </a>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="6">
                      <Label>
                        {Constants.MerchantDetail.contractSign}
                      </Label>
                    </Col>
                    <Col lg="6">
                      <a href={merchantApproved && merchantApproved.contractUrl}> Download </a>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="6">
                      <Label>
                        {Constants.MerchantDetail.identityCard}
                      </Label>
                    </Col>
                    <Col lg="6">
                      <a href={merchantApproved && merchantApproved.identifyCardUrl}> Download </a>
                    </Col>
                  </FormGroup>
                </CardBody>
              </Card>
            </Collapse>
          </form>
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
                        { merchantApproved ? merchantApproved && merchantApproved.merchantSiteUser : ''}
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
            <div className="widget-header widget-header-flat" role="presentation" onClick={this.handOpenDevelopmentUnit} onKeyPress={this.handOpenDevelopmentUnit}>
              <span className="text-bold">{Constants.MerchantDetail.agentDevelopmentBranch}</span>
              <div className="widget-toolbar">
                <span data-action="collapse">
                  {isOpenDevelopmentUnit ? (
                    <i className="ace-icon fa fa-chevron-up" />
                  ) : (
                    <i className="ace-icon fa fa-chevron-down" />
                  )}
                </span>
              </div>
            </div>
            <Collapse isOpen={isOpenDevelopmentUnit} className="show-information">
              <Card>
                <CardBody>
                  <FormGroup row>
                    <Col lg="6">
                      <Label>
                        {Constants.MerchantDetail.developmentUnit}
                      </Label>
                    </Col>
                    <Col lg="6">
                      <Label>
                        { merchantApproved && merchantApproved.departmentBean
                        && `${merchantApproved.departmentBean.departmentCode} - ${merchantApproved.departmentBean.departmentName}`}
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="6">
                      <Label>
                        {Constants.MerchantDetail.staff}
                      </Label>
                    </Col>
                    <Col lg="6">
                      <Label>
                        {merchantApproved && merchantApproved.staffBean
                        && `${merchantApproved && merchantApproved.staffBean.staffCode} - ${merchantApproved.staffBean.staffName}`}
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
            <div className="widget-header widget-header-flat" role="presentation" onClick={this.handOpenTerminal} onKeyPress={this.handOpenTerminal}>
              <span className="text-bold">{Constants.MnMerchant.merchantBranchInfo}</span>
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
            <Collapse isOpen={isOpenInfoTerminal} className="show-information">
              <Card>
                <CardBody>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.terminalID}
                      </Label>
                    </Col>
                    <Col lg="7">
                      { terminalApproved ? terminalApproved && terminalApproved.terminalId : ''}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.terminalName}
                      </Label>
                    </Col>
                    <Col lg="7">
                      { terminalApproved ? terminalApproved && terminalApproved.terminalName : ''}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.businessAddress}
                      </Label>
                    </Col>
                    <Col lg="7">
                      { terminalApproved ? terminalApproved && terminalApproved.businessAddress : ''}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.websiteEcommerce}
                      </Label>
                    </Col>
                    <Col lg="7">
                      { terminalApproved ? terminalApproved && terminalApproved.websiteBusiness : ''}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.nationalMCC}
                      </Label>
                    </Col>
                    <Col lg="7">
                      { terminalApproved && terminalApproved.mccND && `${terminalApproved.mccND.mccCode} - ${terminalApproved.mccND.mccName}`}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.inlandMCC}
                      </Label>
                    </Col>
                    <Col lg="7">
                      { terminalApproved && terminalApproved.mccQT && `${terminalApproved.mccQT.merchantTypeCode} - ${terminalApproved.mccQT.merchantTypeName}`}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.developmentUnit}
                      </Label>
                    </Col>
                    <Col lg="7">
                      { terminalApproved && terminalApproved.departmentBean && `${terminalApproved.departmentBean.departmentCode} - ${terminalApproved.departmentBean.departmentName}`}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.staff}
                      </Label>
                    </Col>
                    <Col lg="7">
                      { terminalApproved && terminalApproved.staffBean && `${terminalApproved.staffBean.staffCode} - ${terminalApproved.staffBean.staffName}`}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.userName}
                      </Label>
                    </Col>
                    <Col lg="7">
                      { terminalApproved ? terminalApproved && terminalApproved.terminalAppUser : ''}
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

MerchantInfo.defaultProps = {
  merchantApproved: {},
};

MerchantInfo.propTypes = {
  merchantApproved: PropTypes.object,
};

export default (withRouter(MerchantInfo));
