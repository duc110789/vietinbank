import React from 'react';
import {Card, CardBody, Col, Collapse, FormGroup, Label, Row,} from 'reactstrap';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Form from 'react-validation/build/form';
import Constants from '../Constants';

class ContactInfo extends React.Component {
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
    const {
      isOpenInfo
    } = this.state;
    const { merchantApproved } = this.props;
    return (
      <Row>
        <div className="col-md-12">
          <Form className="widget-box transparent">
            <div className="widget-header widget-header-flat" role="presentation" onClick={this.handOpenInfo} onKeyPress={this.handOpenInfo}>
              <span className="text-bold">{Constants.MnMerchant.contactInfo}</span>
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
                        {Constants.MnMerchant.fullName}
                      </Label>
                    </Col>
                    <Col lg="7">
                      { merchantApproved ? merchantApproved.fullName : ''}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.phoneNumber}
                      </Label>
                    </Col>
                    <Col lg="7">
                      { merchantApproved ? merchantApproved.phoneNumber : ''}
                    </Col>
                  </FormGroup>
                  { merchantApproved ? (
                    <FormGroup row>
                      <Col lg="5" />
                      <Col lg="7">
                        {merchantApproved ? merchantApproved.phoneNumber1 : ''}
                      </Col>
                    </FormGroup>
                  ) : null }
                  { merchantApproved ? (
                    <FormGroup row>
                      <Col lg="5" />
                      <Col lg="7">
                        {merchantApproved ? merchantApproved.phoneNumber2 : ''}
                      </Col>
                    </FormGroup>
                  ) : null }
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.email}
                      </Label>
                    </Col>
                    <Col lg="7">
                      { merchantApproved ? merchantApproved.email : ''}
                    </Col>
                    <Col lg="5" />
                    <Col lg="7">
                      { merchantApproved ? merchantApproved.email1 : ''}
                    </Col>
                    <Col lg="5" />
                    <Col lg="7">
                      { merchantApproved ? merchantApproved.email2 : ''}
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

ContactInfo.defaultProps = {
};

ContactInfo.propTypes = {

};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ContactInfo));
