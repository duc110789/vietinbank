import React from 'react';
import {Card, CardBody, Col, Collapse, FormGroup, Label, Row,} from 'reactstrap';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Form from 'react-validation/build/form';
import Constants from '../Constants';

class BeneficiaryAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenInfo: true,
      isOpenAccount: true,
      accountNumber: '',
      accountOwn: '',
      bankCode: '970489',
      branchBank: '',
      currency: 'VNĐ',
      accountTerminal: '',
    };
  }

  static getDerivedStateFromProps(props, state) {
    const {
      terminalDetail,
    } = props;

    return {
      terminalDetail,
    };
  }

  componentDidUpdate(prevProps) {
    const {
      terminalDetail,
    } = this.props;

    if (
      terminalDetail !== prevProps.terminalDetail
      && terminalDetail && terminalDetail.terminalBean
    ) {
      this.setState({
        accountNumber: terminalDetail.terminalBean.accEnjoymentBean.accountNumber,
        accountOwn: terminalDetail.terminalBean.accEnjoymentBean.accountHolder,
        bankCode: '970489',
        branchBank: {
          value: terminalDetail.terminalBean.accEnjoymentBean.accEnjoymentId,
          label: terminalDetail.terminalBean.accEnjoymentBean.branchName
            ? `${terminalDetail.terminalBean.accEnjoymentBean.branchName}` : '',
        },
        currency: 'VNĐ',
        accountTerminal: terminalDetail.terminalBean.terminalAppUser,
      });
    }
  }

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

  handleChangeAccountNumber = (event) => {
    this.setState({
      accountNumber: event.target.value,
    });
  };

  render() {
    const {
      isOpenInfo,
      isOpenAccount,
      accountNumber,
      accountOwn,
      branchBank,
      accountTerminal,
    } = this.state;
    return (
      <Form ref={(beneficiaryAccount) => { this.form = beneficiaryAccount; }}>
        <Row>
          <div className="col-md-12">
            <div className="widget-box transparent">
              <div className="widget-header widget-header-flat" role="presentation" onClick={this.handOpenInfo} onKeyPress={this.handOpenInfo}>
                <span className="text-bold">{Constants.MnMerchant.beneficiaryAccount}</span>
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
                          {Constants.MnMerchant.accountNumber}
                        </Label>
                      </Col>
                      <Col lg="7">
                        <Label>{accountNumber}</Label>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col lg="5">
                        <Label>
                          {Constants.MnMerchant.accountOwn}
                        </Label>
                      </Col>
                      <Col lg="7">
                        <Label>{accountOwn}</Label>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col lg="5">
                        <Label>
                          {Constants.MnMerchant.bank}
                        </Label>
                      </Col>
                      <Col lg="7">
                        <Label>Viettinbank</Label>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col lg="5">
                        <Label>
                          {Constants.MnMerchant.branch}
                        </Label>
                      </Col>
                      <Col lg="7">
                        <Label>{branchBank ? branchBank.label : ''}</Label>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col lg="5">
                        <Label>
                          {Constants.MnMerchant.currency}
                        </Label>
                      </Col>
                      <Col lg="7">
                        <Label>VND</Label>
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
                <span className="text-bold">{Constants.MerchantDetail.accountTerminalWebAndApp}</span>
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
                        <Label>{accountTerminal}</Label>
                      </Col>
                    </FormGroup>
                  </CardBody>
                </Card>
              </Collapse>
            </div>
          </div>
        </Row>
      </Form>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  terminalDetail: state.terminal.terminalDetail,
});

const mapDispatchToProps = (dispatch) => ({
});

BeneficiaryAccount.defaultProps = {
  passBeneficiaryAccount: () => {},
  terminalDetail: {},
};

BeneficiaryAccount.propTypes = {
  passBeneficiaryAccount: PropTypes.func,
  terminalDetail: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BeneficiaryAccount));
