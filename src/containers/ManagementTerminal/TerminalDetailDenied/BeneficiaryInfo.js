import React from 'react';
import {
  Collapse, CardBody, Card, Label, Row, Col, FormGroup,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Constants from '../Constants';

import {
  getTerminalDetailDenied,
} from '../../../store/actions/terminal/terminal';

class BeneficiaryInfo extends React.Component {
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
              <span className="text-bold">{Constants.TerminalList.enjoymentInfo}</span>
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
                        {Constants.TerminalList.enjoymentAccountNumber}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>{ terminalDeniedBean && terminalDeniedBean.accEnjoymentBean && terminalDeniedBean.accEnjoymentBean.accountNumber !== null ? terminalDeniedBean && terminalDeniedBean.accEnjoymentBean && terminalDeniedBean.accEnjoymentBean.accountNumber : '' }</Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.TerminalList.enjoymentAccountOwn}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>{ terminalDeniedBean && terminalDeniedBean.accEnjoymentBean && terminalDeniedBean.accEnjoymentBean.accountHolder !== null ? terminalDeniedBean && terminalDeniedBean.accEnjoymentBean && terminalDeniedBean.accEnjoymentBean.accountHolder : '' }</Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.TerminalList.enjoymentBank}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>{ terminalDeniedBean && terminalDeniedBean.accEnjoymentBean && terminalDeniedBean.accEnjoymentBean.bankName !== null ? terminalDeniedBean && terminalDeniedBean.accEnjoymentBean && terminalDeniedBean.accEnjoymentBean.bankName : '' }</Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.TerminalList.enjoymentBranch}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>{ terminalDeniedBean && terminalDeniedBean.accEnjoymentBean && terminalDeniedBean.accEnjoymentBean.branchName !== null ? terminalDeniedBean && terminalDeniedBean.accEnjoymentBean && terminalDeniedBean.accEnjoymentBean.branchName : '' }</Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.currency}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>{ terminalDeniedBean && terminalDeniedBean.currencyCode ? terminalDeniedBean && terminalDeniedBean.currencyCode : '' }</Label>
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

BeneficiaryInfo.defaultProps = {
  terminalDetailDenied: {},
};

BeneficiaryInfo.propTypes = {
  terminalDetailDenied: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BeneficiaryInfo));
