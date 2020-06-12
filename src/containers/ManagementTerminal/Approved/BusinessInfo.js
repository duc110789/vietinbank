import React from 'react';
import {Card, CardBody, Col, Collapse, FormGroup, Label, Row,} from 'reactstrap';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Constants from '../Constants';

import {getStatusUI,} from '../../../utils/commonFunction';
import {getMerchantDetail,} from '../../../store/actions/masterMerchant/masterMerchant';

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
      merchantDetail,
    } = props;

    return {
      merchantDetail,
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
      merchantDetail,
    } = this.props;
    return (
      <Row>
        <div className="col-md-12">
          <div className="widget-box transparent">
            <div className="widget-header widget-header-flat" role="presentation" onClick={this.handOpenInfo} onKeyPress={this.handOpenInfo}>
              <span className="text-bold">Thông tin merchant</span>
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
                        {Constants.MnMerchant.merchantName}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>
                        { merchantDetail ? merchantDetail.merchantCode : ''}
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
                        { merchantDetail ? merchantDetail.merchantBrand : ''}
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
                        { merchantDetail ? merchantDetail.masterMerchant : ''}
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
                        { merchantDetail ? merchantDetail.providerCode : ''}
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
                        { merchantDetail ? `${merchantDetail.merchantTypeCode} - ${merchantDetail.merchantTypeName}` : ''}
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
                        { merchantDetail ? merchantDetail.merchantBusinessAddress : ''}
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
                        { merchantDetail ? merchantDetail.address : ''}
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
                        { merchantDetail ? merchantDetail.provinceName : ''}
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
                        { merchantDetail ? merchantDetail.districtName : ''}
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
                        { merchantDetail ? merchantDetail.pinCode : ''}
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
                        { merchantDetail ? merchantDetail.merchantCode : ''}
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
                        { merchantDetail ? merchantDetail.website : '' }
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
                        { merchantDetail ? this.getListMerchantStatus(merchantDetail.status) : '' || '' }
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
                        { merchantDetail ? merchantDetail.merchantSiteUser : ''}
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
  merchantDetail: state.masterMerchant.merchantDetail,
});

const mapDispatchToProps = (dispatch) => ({
  getMerchantDetail: (data) => dispatch(getMerchantDetail(data)),
});

BusinessInfo.defaultProps = {
  merchantDetail: {},
};

BusinessInfo.propTypes = {
  merchantDetail: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BusinessInfo));
