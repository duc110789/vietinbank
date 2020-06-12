import React from 'react';
import {
  Collapse, CardBody, Card, Label, Row, Col, FormGroup,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Constants from '../Constants';
import {
  getMerchantDetailDenied,
} from '../../../store/actions/masterMerchant/masterMerchant';

class MerchantInfo extends React.Component {
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
              <span className="text-bold">{Constants.MnMerchant.terminalInfo}</span>
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
                      <Label>
                        {Constants.MerchantDetail.terminalID}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>
                        { terminalDeniedBean && terminalDeniedBean.terminalId !== null ? terminalDeniedBean && terminalDeniedBean.terminalId : ''}
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MerchantDetail.terminalName}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>
                        { terminalDeniedBean && terminalDeniedBean.terminalName !== null ? terminalDeniedBean && terminalDeniedBean.terminalName : '' }
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.serviceCode}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>
                        { terminalDeniedBean && terminalDeniedBean.serviceCode !== null ? terminalDeniedBean && terminalDeniedBean.serviceCode : '' }
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
                        { terminalDeniedBean && terminalDeniedBean.businessAddress !== null ? terminalDeniedBean && terminalDeniedBean.businessAddress : '' }
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.websiteEcommerce}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>
                        { terminalDeniedBean && terminalDeniedBean.websiteBusiness !== null ? terminalDeniedBean && terminalDeniedBean.websiteBusiness : '' }
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
                        { terminalDeniedBean && terminalDeniedBean.mccQT && terminalDeniedBean.mccQT.merchantTypeCode !== null ? terminalDeniedBean && terminalDeniedBean.mccQT && terminalDeniedBean.mccQT.merchantTypeCode : ''}
                        {' - '}
                        { terminalDeniedBean && terminalDeniedBean.mccQT && terminalDeniedBean.mccQT.merchantTypeName !== null ? terminalDeniedBean && terminalDeniedBean.mccQT && terminalDeniedBean.mccQT.merchantTypeName : ''}
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.productBusinessDesciption}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>
                        { terminalDeniedBean && terminalDeniedBean.productDescription !== null ? terminalDeniedBean && terminalDeniedBean.productDescription : '' }
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.inlandMCC}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>
                        { terminalDeniedBean && terminalDeniedBean.mccND && terminalDeniedBean.mccND.mccCode !== null ? terminalDeniedBean && terminalDeniedBean.mccND && terminalDeniedBean.mccND.mccCode : ''}
                        {' - '}
                        { terminalDeniedBean && terminalDeniedBean.mccND && terminalDeniedBean.mccND.mccName !== null ? terminalDeniedBean && terminalDeniedBean.mccND && terminalDeniedBean.mccND.mccName : ''}
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.facebook}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>
                        { terminalDeniedBean && terminalDeniedBean.facebook !== null ? terminalDeniedBean && terminalDeniedBean.facebook : '' }
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
  merchantDetailDenied: state.masterMerchant.merchantDetailDenied,
});

const mapDispatchToProps = (dispatch) => ({
  getMerchantDetailDenied: (data) => dispatch(getMerchantDetailDenied(data)),
});

MerchantInfo.defaultProps = {
  merchantDetailDenied: {},
};

MerchantInfo.propTypes = {
  merchantDetailDenied: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MerchantInfo));
