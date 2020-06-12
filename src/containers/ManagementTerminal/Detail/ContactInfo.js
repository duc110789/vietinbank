import React from 'react';
import {Card, CardBody, Col, Collapse, FormGroup, Label, Row,} from 'reactstrap';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Form from 'react-validation/build/form';
import Constants from '../Constants';

class ContactInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenInfo: true,
      fullName: '',
      numberPhone: '',
      numberPhone2: '',
      numberPhone3: '',
      email: '',
      email2: '',
      email3: '',
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
      && terminalDetail && terminalDetail.terminalContact
    ) {
      this.setState({
        fullName: terminalDetail.terminalContact.fullName,
        numberPhone: terminalDetail.terminalContact.phoneNumber,
        numberPhone2: terminalDetail.terminalContact.phoneNumber1,
        numberPhone3: terminalDetail.terminalContact.phoneNumber2,
        email: terminalDetail.terminalContact.email,
        email2: terminalDetail.terminalContact.email1,
        email3: terminalDetail.terminalContact.email2,
      });
    }
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
      fullName,
      numberPhone,
      numberPhone2,
      numberPhone3,
      email,
      email2,
      email3,
    } = this.state;
    return (
      <Row>
        <div className="col-md-12">
          <Form className="widget-box transparent" ref={(contactInfo) => { this.form = contactInfo; }}>
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
                      <Label>{fullName}</Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.phoneNumber}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>{numberPhone}</Label>
                    </Col>
                  </FormGroup>
                  { (numberPhone2) ? (
                    <FormGroup row>
                      <Col lg="5" />
                      <Col lg="7">
                        <Label>{numberPhone2}</Label>
                      </Col>
                    </FormGroup>
                  ) : null}
                  { (numberPhone3 ? (
                    <FormGroup row>
                      <Col lg="5" />
                      <Col lg="7">
                        <Label>{numberPhone3}</Label>
                      </Col>
                    </FormGroup>
                  ) : null)}
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.email}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>{email}</Label>
                    </Col>
                  </FormGroup>
                  { (email2) ? (
                    <FormGroup row>
                      <Col lg="5" />
                      <Col lg="7">
                        <Label>{email2}</Label>
                      </Col>
                    </FormGroup>
                  ) : null }
                  { (email3) ? (
                    <FormGroup row>
                      <Col lg="5" />
                      <Col lg="7">
                        <Label>{email3}</Label>
                      </Col>
                    </FormGroup>
                  ) : null }
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
  terminalDetail: state.terminal.terminalDetail,
});

const mapDispatchToProps = (dispatch) => ({
  // getAllDistrictByProvince: (data) => dispatch(getAllDistrictByProvince(data)),
});

ContactInfo.defaultProps = {
  terminalDetail: {},
};

ContactInfo.propTypes = {
  terminalDetail: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ContactInfo));
