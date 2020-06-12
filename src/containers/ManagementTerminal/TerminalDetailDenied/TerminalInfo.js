import React from 'react';
import {
  Card, CardBody, Col, Collapse, FormGroup, Label, Row,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Constants from '../Constants';
import { convertRankTerminal } from '../../../utils/commonFunction';
import { getTerminalDetailDenied } from '../../../store/actions/terminal/terminal';

class MerchantInfo extends React.Component {
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
                      <Label htmlFor="code">
                        {Constants.MnMerchant.rank}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>
                        { terminalDeniedBean && terminalDeniedBean.levelTerminal !== null ? convertRankTerminal(parseInt(`${terminalDeniedBean && terminalDeniedBean.levelTerminal}`), 10) : '' }
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label htmlFor="code">
                        {Constants.MnMerchant.mcBranch}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>
                        { terminalDeniedBean && terminalDeniedBean.bankBranch !== null ? terminalDeniedBean && terminalDeniedBean.bankBranch : '' }
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label htmlFor="code">
                        {Constants.MerchantDetail.terminalID}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>
                        { terminalDeniedBean && terminalDeniedBean.terminalId !== null ? terminalDeniedBean && terminalDeniedBean.terminalId : '' }
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
                        { terminalDeniedBean && terminalDeniedBean && terminalDeniedBean.terminalName !== null ? terminalDeniedBean && terminalDeniedBean.terminalName : '' }
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
                        {' '}
                        *
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
                        {terminalDeniedBean && terminalDeniedBean.facebook !== null ? terminalDeniedBean && terminalDeniedBean.facebook : '' }
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MerchantDetail.developmentUnit}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>
                        {terminalDeniedBean && terminalDeniedBean.departmentBean && terminalDeniedBean.departmentBean.departmentName !== null ? terminalDeniedBean && terminalDeniedBean.departmentBean && terminalDeniedBean.departmentBean.departmentName : ''}
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.staff}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>
                        {terminalDeniedBean && terminalDeniedBean.staffBean && terminalDeniedBean.staffBean.departmentName !== 'null' ? terminalDeniedBean && terminalDeniedBean.staffBean && terminalDeniedBean.staffBean.staffName : ''}
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
