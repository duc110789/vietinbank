import React from 'react';
import {Card, CardBody, Col, Collapse, FormGroup, Label, Row,} from 'reactstrap';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Form from 'react-validation/build/form';

import Constants from '../Constants';

class TerminalInfo extends React.Component {
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

  render() {
    const { isOpenInfo } = this.state;
    const {
      terminalApproved,
    } = this.props;
    return (
      <Row>
        <div className="col-md-12">
          <Form className="widget-box transparent">
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
                        {Constants.MnMerchant.terminalID}
                      </Label>
                    </Col>
                    <Col lg="7">
                      { terminalApproved ? terminalApproved.terminalId : ''}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.terminalName}
                      </Label>
                    </Col>
                    <Col lg="7">
                      { terminalApproved ? terminalApproved.terminalName : ''}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.serviceCode}
                      </Label>
                    </Col>
                    <Col lg="7">
                      { terminalApproved ? terminalApproved.serviceCode : ''}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.websiteEcommerce}
                      </Label>
                    </Col>
                    <Col lg="7">
                      { terminalApproved ? terminalApproved.websiteBusiness : ''}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.businessAddress}
                      </Label>
                    </Col>
                    <Col lg="7">
                      { terminalApproved ? terminalApproved.businessAddress : ''}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.nationalMCC}
                      </Label>
                    </Col>
                    <Col lg="7">
                      { terminalApproved && terminalApproved.mccQT && terminalApproved.mccQT.merchantTypeCode && `${terminalApproved.mccQT.merchantTypeCode} - ${terminalApproved.mccQT.merchantTypeName}`}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.productBusinessDesciption}
                      </Label>
                    </Col>
                    <Col lg="7">
                      { terminalApproved ? terminalApproved.productDescription : ''}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.inlandMCC}
                      </Label>
                    </Col>
                    <Col lg="7">
                      { terminalApproved && terminalApproved.mccND && terminalApproved.mccND.mccCode && `${terminalApproved.mccND.mccCode} - ${terminalApproved.mccND.mccName}`}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.facebook}
                      </Label>
                    </Col>
                    <Col lg="7">
                      { terminalApproved ? terminalApproved.facebook : ''}
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

TerminalInfo.defaultProps = {
};

TerminalInfo.propTypes = {
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TerminalInfo));
