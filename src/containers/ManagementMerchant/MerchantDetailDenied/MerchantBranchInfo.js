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

class MerchantBranchInfo extends React.Component {
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
    const merchantBranchDeniedBean = merchantDetailDenied && merchantDetailDenied.terminalBranch;
    return (
      <Row>
        <div className="col-md-12">
          <div className="widget-box transparent">
            <div className="widget-header widget-header-flat" role="presentation" onClick={this.handOpenInfo} onKeyPress={this.handOpenInfo}>
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
            <Collapse isOpen={isOpenInfo} className="show-information">
              <Card>
                <CardBody>
                  <FormGroup row>
                    <Col lg="5">
                      <Label htmlFor="code">
                        {Constants.MnMerchant.terminalID}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>
                        { merchantBranchDeniedBean && merchantBranchDeniedBean.terminalId !== null ? merchantBranchDeniedBean && merchantBranchDeniedBean.terminalId : ''}
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label htmlFor="code">
                        {Constants.MnMerchant.terminalName}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>
                        { merchantBranchDeniedBean && merchantBranchDeniedBean.terminalName !== null ? merchantBranchDeniedBean && merchantBranchDeniedBean.terminalName : '' }
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
                        { merchantBranchDeniedBean && merchantBranchDeniedBean.businessAddress !== null ? merchantBranchDeniedBean && merchantBranchDeniedBean.businessAddress : ''}
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
                        { merchantBranchDeniedBean && merchantBranchDeniedBean.websiteBusiness !== null ? merchantBranchDeniedBean && merchantBranchDeniedBean.websiteBusiness : ''}
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
                        { merchantBranchDeniedBean && merchantBranchDeniedBean.mccQT
                        && `${merchantBranchDeniedBean.mccQT.merchantTypeCode} - ${merchantBranchDeniedBean.mccQT.merchantTypeName}` }
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
                        { merchantBranchDeniedBean && merchantBranchDeniedBean.mccND
                        && `${merchantBranchDeniedBean.mccND.mccCode} - ${merchantBranchDeniedBean.mccND.mccName}` }
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.developmentUnit}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>
                        { merchantBranchDeniedBean && merchantBranchDeniedBean.departmentBean
                        && `${merchantBranchDeniedBean.departmentBean.departmentCode} - ${merchantBranchDeniedBean.departmentBean.departmentName}` }
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
                        { merchantBranchDeniedBean && merchantBranchDeniedBean.departmentBean
                        && `${merchantBranchDeniedBean.staffBean.staffCode} - ${merchantBranchDeniedBean.staffBean.staffName}` }
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.userName}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>
                        { merchantBranchDeniedBean && merchantBranchDeniedBean.terminalAppUser !== null ? merchantBranchDeniedBean && merchantBranchDeniedBean.terminalAppUser : ''}
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

MerchantBranchInfo.defaultProps = {
  merchantDetailDenied: {},
};

MerchantBranchInfo.propTypes = {
  merchantDetailDenied: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MerchantBranchInfo));
