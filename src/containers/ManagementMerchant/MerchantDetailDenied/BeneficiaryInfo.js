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
import {
  getBranchBank,
} from '../../../utils/commonFunction';

class BeneficiaryInfo extends React.Component {
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
    const listBranchBank = JSON.parse(localStorage && localStorage.getItem('LIST_BRANCH_BANK'));

    return {
      merchantDetailDenied,
      listBranchBank,
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
      isOpenInfo, listBranchBank,
    } = this.state;

    const {
      merchantDetailDenied,
    } = this.props;
    const terminalDeniedBean = merchantDetailDenied && merchantDetailDenied.terminal;
    const terminalAccEnjoyment = terminalDeniedBean && terminalDeniedBean.accEnjoymentBean;
    return (
      <Row>
        <div className="col-md-12">
          <div className="widget-box transparent">
            <div className="widget-header widget-header-flat" role="presentation" onClick={this.handOpenInfo} onKeyPress={this.handOpenInfo}>
              <span className="text-bold">{Constants.MerchantList.enjoymentInfo}</span>
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
                        {Constants.MerchantList.enjoymentAccountNumber}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>{ terminalAccEnjoyment && terminalAccEnjoyment.accountNumber !== null ? terminalAccEnjoyment && terminalAccEnjoyment.accountNumber : '' }</Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MerchantList.enjoymentAccountOwn}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>{ terminalAccEnjoyment && terminalAccEnjoyment.accountHolder !== null ? terminalAccEnjoyment && terminalAccEnjoyment.accountHolder : '' }</Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MerchantList.enjoymentBank}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>{ terminalAccEnjoyment && terminalAccEnjoyment.bankName !== null ? terminalAccEnjoyment && terminalAccEnjoyment.bankName : '' }</Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MerchantList.enjoymentBranch}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>{ terminalAccEnjoyment && terminalAccEnjoyment.branch !== null ? getBranchBank(listBranchBank, terminalAccEnjoyment && terminalAccEnjoyment.branch) : '' }</Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.currency}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>{ terminalDeniedBean && terminalDeniedBean.currencyCode !== null ? terminalDeniedBean && terminalDeniedBean.currencyCode : '' }</Label>
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

BeneficiaryInfo.defaultProps = {
  merchantDetailDenied: {},
};

BeneficiaryInfo.propTypes = {
  merchantDetailDenied: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BeneficiaryInfo));
