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
    } = this.state;
    const {
      merchantDetail,
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
                  <div className="row">
                    <FormGroup row className="col-md-6">
                      <Col md="6">
                        <Label>
                          {Constants.MerchantDetail.mcId}
                        </Label>
                      </Col>
                      <Col md="6">
                        <Label>
                          { merchantDetail ? merchantDetail.merchantCode : ''}
                        </Label>
                      </Col>
                    </FormGroup>
                    <FormGroup row className="col-md-6">
                      <Col md="6">
                        <Label>
                          {Constants.MerchantDetail.mcName}
                        </Label>
                      </Col>
                      <Col md="6">
                        <Label>
                          { merchantDetail ? merchantDetail.merchantName : ''}
                        </Label>
                      </Col>
                    </FormGroup>
                    <FormGroup row className="col-md-6">
                      <Col md="6">
                        <Label>
                          {Constants.MerchantDetail.abbreviationName}
                        </Label>
                      </Col>
                      <Col md="6">
                        <Label>
                          { merchantDetail ? merchantDetail.merchantBrand : ''}
                        </Label>
                      </Col>
                    </FormGroup>
                    <FormGroup row className="col-md-6">
                      <Col md="6">
                        <Label>
                          {Constants.MerchantDetail.masterMerchant}
                        </Label>
                      </Col>
                      <Col md="6">
                        <Label>
                          { merchantDetail ? merchantDetail.masterMerchant : ''}
                        </Label>
                      </Col>
                    </FormGroup>
                    <FormGroup row className="col-md-6">
                      <Col md="6">
                        <Label>
                          {Constants.MerchantDetail.billingCode}
                        </Label>
                      </Col>
                      <Col md="6">
                        <Label>
                          { merchantDetail ? merchantDetail.providerCode : ''}
                        </Label>
                      </Col>
                    </FormGroup>
                    <FormGroup row className="col-md-6">
                      <Col md="6">
                        <Label>
                          {Constants.MerchantDetail.mccInternational}
                        </Label>
                      </Col>
                      <Col md="6">
                        <Label>
                          { merchantDetail ? `${merchantDetail.merchantTypeCode} - ${merchantDetail.merchantTypeName}` : ''}
                        </Label>
                      </Col>
                    </FormGroup>
                    <FormGroup row className="col-md-6">
                      <Col md="6">
                        <Label>
                          {Constants.MerchantDetail.addressBusinessRegister}
                        </Label>
                      </Col>
                      <Col md="6">
                        <Label>
                          { merchantDetail ? merchantDetail.merchantBusinessAddress : ''}
                        </Label>
                      </Col>
                    </FormGroup>
                    <FormGroup row className="col-md-6">
                      <Col md="6">
                        <Label>
                          {Constants.MerchantDetail.addressBusiness}
                        </Label>
                      </Col>
                      <Col md="6">
                        <Label>
                          { merchantDetail ? merchantDetail.address : ''}
                        </Label>
                      </Col>
                    </FormGroup>
                    <FormGroup row className="col-md-6">
                      <Col md="6">
                        <Label>
                          {Constants.MerchantDetail.province}
                        </Label>
                      </Col>
                      <Col md="6">
                        <Label>
                          { merchantDetail ? merchantDetail.provinceName : ''}
                        </Label>
                      </Col>
                    </FormGroup>
                    <FormGroup row className="col-md-6">
                      <Col md="6">
                        <Label>
                          {Constants.MerchantDetail.district}
                        </Label>
                      </Col>
                      <Col md="6">
                        <Label>
                          { merchantDetail ? merchantDetail.districtName : ''}
                        </Label>
                      </Col>
                    </FormGroup>
                    <FormGroup row className="col-md-6">
                      <Col md="6">
                        <Label>
                          {Constants.MerchantDetail.zipCode}
                        </Label>
                      </Col>
                      <Col md="6">
                        <Label>
                          { merchantDetail ? merchantDetail.pinCode : ''}
                        </Label>
                      </Col>
                    </FormGroup>
                    <FormGroup row className="col-md-6">
                      <Col md="6">
                        <Label>
                          {Constants.MerchantDetail.taxCode}
                        </Label>
                      </Col>
                      <Col md="6">
                        <Label>
                          { merchantDetail ? merchantDetail.merchantCode : ''}
                        </Label>
                      </Col>
                    </FormGroup>
                    <FormGroup row className="col-md-6">
                      <Col md="6">
                        <Label>
                          {Constants.MerchantDetail.webSite}
                        </Label>
                      </Col>
                      <Col md="6">
                        <Label>
                          { merchantDetail ? merchantDetail.website : ''}
                        </Label>
                      </Col>
                    </FormGroup>
                    <FormGroup row className="col-md-6">
                      <Col md="6">
                        <Label>
                          {Constants.MerchantDetail.status}
                        </Label>
                      </Col>
                      <Col md="6">
                        <Label>
                          { merchantDetail.status ? this.getListMerchantStatus(merchantDetail.status) : '' }
                        </Label>
                      </Col>
                    </FormGroup>
                    <FormGroup row className="col-md-6">
                      <Col md="6">
                        <Label>
                          {Constants.MerchantDetail.businessLicence}
                        </Label>
                      </Col>
                      <Col md="6">
                        <a href={merchantDetail.businessCertUrl}> Download </a>
                      </Col>
                    </FormGroup>
                    <FormGroup row className="col-md-6">
                      <Col md="6">
                        <Label>
                          {Constants.MerchantDetail.domainLicence}
                        </Label>
                      </Col>
                      <Col md="6">
                        <a href={merchantDetail.domainCertUrl}> Download </a>
                      </Col>
                    </FormGroup>
                    <FormGroup row className="col-md-6">
                      <Col md="6">
                        <Label>
                          {Constants.MerchantDetail.accountLicence}
                        </Label>
                      </Col>
                      <Col md="6">
                        <a href={merchantDetail.businessTaxCertUrl}> Download </a>
                      </Col>
                    </FormGroup>
                    <FormGroup row className="col-md-6">
                      <Col md="6">
                        <Label>
                          {Constants.MerchantDetail.contractSign}
                        </Label>
                      </Col>
                      <Col md="6">
                        <a href={merchantDetail.contractUrl}> Download </a>
                      </Col>
                    </FormGroup>
                    <FormGroup row className="col-md-6">
                      <Col md="6">
                        <Label>
                          {Constants.MerchantDetail.identityCard}
                        </Label>
                      </Col>
                      <Col md="6">
                        <a href={merchantDetail.identifyCardUrl}> Download </a>
                      </Col>
                    </FormGroup>
                  </div>
                </CardBody>
              </Card>
            </Collapse>
          </form>
        </div>
        <div className="col-md-12">
          <form className="widget-box transparent">
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
                    <Col md="6">
                      <Label>
                        {Constants.MerchantDetail.accountMerchant}
                      </Label>
                    </Col>
                    <Col md="6">
                      <Label>
                        { merchantDetail ? merchantDetail.merchantSiteUser : ''}
                      </Label>
                    </Col>
                  </FormGroup>
                </CardBody>
              </Card>
            </Collapse>
          </form>
        </div>
        <div className="col-md-12">
          <form className="widget-box transparent">
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
                    <Col md="6">
                      <Label>
                        {Constants.MerchantDetail.developmentUnit}
                      </Label>
                    </Col>
                    <Col md="6">
                      <Label>
                        { merchantDetail ? merchantDetail.departmentName : ''}
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="6">
                      <Label>
                        {Constants.MerchantDetail.staff}
                      </Label>
                    </Col>
                    <Col md="6">
                      <Label>
                        { merchantDetail ? `${merchantDetail.staffCode} - ${merchantDetail.staffName}` : ''}
                      </Label>
                    </Col>
                  </FormGroup>
                </CardBody>
              </Card>
            </Collapse>
          </form>
        </div>
      </Row>
    );
  }
}

MerchantInfo.defaultProps = {
  merchantDetail: {},
};

MerchantInfo.propTypes = {
  merchantDetail: PropTypes.object,
};

export default (withRouter(MerchantInfo));
