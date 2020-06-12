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

class ContactInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenInfo: true,
      numberPhone: '',
      numberPhone2: '',
      numberPhone3: '',
      showNumberPhone2: false,
      showNumberPhone3: false,
      email: '',
      email2: '',
      email3: '',
      showEmail2: false,
      showEmail3: false,
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

  handOpenAccount = () => {
    const { isOpenAccount } = this.state;
    this.setState({
      isOpenAccount: !isOpenAccount,
    });
  };

  render() {
    const {
      isOpenInfo,
      showNumberPhone2,
      showNumberPhone3,
      showEmail2,
      showEmail3,
      numberPhone2,
      numberPhone3,
      email2,
      email3,
    } = this.state;

    const {
      terminalDetailDenied,
    } = this.props;
    const terminalDeniedContact = terminalDetailDenied && terminalDetailDenied.terminalContact;
    return (
      <Row>
        <div className="col-md-12">
          <div className="widget-box transparent">
            <div className="widget-header widget-header-flat" role="presentation" onClick={this.handOpenInfo} onKeyPress={this.handOpenInfo}>
              <span className="text-bold">{Constants.TerminalList.contactInfo}</span>
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
                        {Constants.TerminalList.contactFullName}
                      </Label>
                    </Col>
                    <Col lg="7">
                      { terminalDeniedContact && terminalDeniedContact.fullName ? terminalDeniedContact && terminalDeniedContact.fullName : '' }
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.TerminalList.contactPhoneNumber}
                      </Label>
                    </Col>
                    <Col lg="7">
                      { terminalDeniedContact && terminalDeniedContact.phoneNumber ? terminalDeniedContact && terminalDeniedContact.phoneNumber : '' }
                    </Col>
                  </FormGroup>
                  { ((showNumberPhone2 || numberPhone2) ? (
                    <FormGroup row>
                      <Col lg="5" />
                      <Col lg="7">
                        { terminalDeniedContact && terminalDeniedContact.phoneNumber1 ? terminalDeniedContact && terminalDeniedContact.phoneNumber1 : '' }
                      </Col>
                    </FormGroup>
                  ) : null)}
                  { (showNumberPhone3 || numberPhone3 ? (
                    <FormGroup row>
                      <Col lg="5" />
                      <Col lg="7">
                        { terminalDeniedContact && terminalDeniedContact.phoneNumber2 ? terminalDeniedContact && terminalDeniedContact.phoneNumber2 : '' }
                      </Col>
                    </FormGroup>
                  ) : null)}
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.TerminalList.contactEmail}
                      </Label>
                    </Col>
                    <Col lg="7">
                      { terminalDeniedContact && terminalDeniedContact.email ? terminalDeniedContact && terminalDeniedContact.email : '' }
                    </Col>
                  </FormGroup>
                  { (showEmail2 || email2) ? (
                    <FormGroup row>
                      <Col lg="5" />
                      <Col lg="7">
                        { terminalDeniedContact && terminalDeniedContact.email1 ? terminalDeniedContact && terminalDeniedContact.email1 : '' }
                      </Col>
                    </FormGroup>
                  ) : null }
                  { (showEmail3 || email3) ? (
                    <FormGroup row>
                      <Col lg="5" />
                      <Col lg="7">
                        { terminalDeniedContact && terminalDeniedContact.email2 ? terminalDeniedContact && terminalDeniedContact.email2 : '' }
                      </Col>
                    </FormGroup>
                  ) : null }
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

ContactInfo.defaultProps = {
  terminalDetailDenied: {},
};

ContactInfo.propTypes = {
  terminalDetailDenied: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ContactInfo));
