import React from 'react';
import {
  Card, CardBody, Col, Collapse, FormGroup, Label, Row,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Constants from '../Constants';

import { getStatusUI } from '../../../utils/commonFunction';
import { getTerminalDetail } from '../../../store/actions/terminal/terminal';

class BusinessInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenInfo: true,
      isOpenAccount: true,
    };
  }

  static getDerivedStateFromProps(props) {
    const {
      terminalDetail,
    } = props;

    return {
      terminalDetail,
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

  render() {
    const {
      isOpenInfo,
      isOpenAccount,
    } = this.state;

    const {
      terminalDetail,
    } = this.props;
    return (
      <Row>
        <div className="col-md-12">
          <div className="widget-box transparent">
            <div className="widget-header widget-header-flat" role="presentation" onClick={this.handOpenInfo} onKeyPress={this.handOpenInfo}>
              <span className="text-bold">Thông tin Merchant</span>
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
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>
                        { terminalDetail && terminalDetail.merchantBean
                        && terminalDetail.merchantBean.merchantCode }
                      </Label>
                    </Col>
                  </FormGroup>
                   <FormGroup row>
                    <Col lg="5">
                      <Label htmlFor="code">
                        {Constants.MnMerchant.merchantName}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>
                        { terminalDetail && terminalDetail.merchantBean
                        && terminalDetail.merchantBean.merchantName }
                      </Label>
                    </Col>
                   </FormGroup>
                   <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.shortName}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>
                        { terminalDetail && terminalDetail.merchantBean
                        && terminalDetail.merchantBean.merchantBrand }
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
                        { terminalDetail && terminalDetail.merchantBean
                        && terminalDetail.merchantBean.masterMerchantCode }
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
                        { terminalDetail && terminalDetail.merchantBean
                        && terminalDetail.merchantBean.providerCode }
                      </Label>
                    </Col>
                   </FormGroup>
                   <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.nationalMCC}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>
                        { terminalDetail && terminalDetail.merchantBean
                        && `${terminalDetail.merchantBean.merchantTypeBean.merchantTypeCode}
                        - ${terminalDetail.merchantBean.merchantTypeBean.merchantTypeName}` }
                      </Label>
                    </Col>
                   </FormGroup>
                   <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.registeredBusinessAddress}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>
                        { terminalDetail && terminalDetail.merchantBean
                        && terminalDetail.merchantBean.address }
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
                        { terminalDetail && terminalDetail.merchantBean
                        && terminalDetail.merchantBean.businessAddress }
                      </Label>
                    </Col>
                   </FormGroup>
                   <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.city}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>
                        { terminalDetail && terminalDetail.merchantBean
                        && terminalDetail.merchantBean.provinceName }
                      </Label>
                    </Col>
                   </FormGroup>
                   <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.district}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>
                        { terminalDetail && terminalDetail.merchantBean
                        && terminalDetail.merchantBean.districtName }
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
                        { terminalDetail && terminalDetail.merchantBean
                        && terminalDetail.merchantBean.pinCode }
                      </Label>
                    </Col>
                   </FormGroup>
                   <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.taxCode}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>
                        { terminalDetail && terminalDetail.merchantBean
                        && terminalDetail.merchantBean.merchantCode }
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
                        { terminalDetail && terminalDetail.merchantBean
                        && terminalDetail.merchantBean.website }
                      </Label>
                    </Col>
                   </FormGroup>
                   <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MerchantDetail.status}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>
                        { terminalDetail && terminalDetail.merchantBean
                        && this.getListMerchantStatus(terminalDetail.merchantBean.status) }
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
                    <Col lg="5">
                      <Label>
                        {Constants.MerchantDetail.accountMerchant}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>
                        { terminalDetail && terminalDetail.merchantBean
                        && terminalDetail.merchantBean.merchantSiteUser }
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
  terminalDetail: state.terminal.terminalDetail,
});

const mapDispatchToProps = (dispatch) => ({
  getTerminalDetail: (data) => dispatch(getTerminalDetail(data)),
});

BusinessInfo.defaultProps = {
  terminalDetail: {},
};

BusinessInfo.propTypes = {
  terminalDetail: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BusinessInfo));
