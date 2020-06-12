import React from 'react';
import {Card, CardBody, Col, Collapse, FormGroup, Label, Row,} from 'reactstrap';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Form from 'react-validation/build/form';
import Constants from '../Constants';
import {getNameDepartment} from '../../../utils/commonFunction';

class UserAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenInfo: true,
    };
  }

  handOpenInfo = () => {
    const { isOpenInfo } = this.state;
    this.setState({
      isOpenInfo: !isOpenInfo,
    });
  };

  getBranchBank = (itemCode) => {
    const listBranchBank = JSON.parse(localStorage && localStorage.getItem('LIST_BRANCH_BANK'));
    const branchBank = getNameDepartment(listBranchBank, itemCode);
    return branchBank;
  };

  render() {
    const { isOpenInfo } = this.state;
    const {
      merchantApproved,
    } = this.props;
    return (
      <Row>
        <div className="col-md-12">
          <Form className="widget-box transparent">
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
                      { merchantApproved && merchantApproved.accEnjoymentBean && merchantApproved.accEnjoymentBean.accountNumber}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.accountOwn}
                      </Label>
                    </Col>
                    <Col lg="7">
                      { merchantApproved && merchantApproved.accEnjoymentBean && merchantApproved.accEnjoymentBean.accountHolder}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.bank}
                      </Label>
                    </Col>
                    <Col lg="7">
                      { merchantApproved && merchantApproved.accEnjoymentBean
                      && `${merchantApproved.accEnjoymentBean.bankCode} - ${merchantApproved.accEnjoymentBean.bankName}`}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.branch}
                      </Label>
                    </Col>
                    <Col lg="7">
                      { merchantApproved && merchantApproved.accEnjoymentBean
                      && `${merchantApproved.accEnjoymentBean.branch} - ${merchantApproved.accEnjoymentBean.branchName}`}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.currency}
                      </Label>
                    </Col>
                    <Col lg="7">
                      { merchantApproved ? merchantApproved.currencyCode : ''}
                    </Col>
                  </FormGroup>
                </CardBody>
              </Card>
            </Collapse>
          </Form>
        </div>
      </Row>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

UserAccount.defaultProps = {
};

UserAccount.propTypes = {
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserAccount));
