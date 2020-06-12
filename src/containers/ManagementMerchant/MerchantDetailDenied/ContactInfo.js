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

class ContactInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenInfo: true,
      numberPhone2: '',
      numberPhone3: '',
      showNumberPhone2: false,
      showNumberPhone3: false,
      email2: '',
      email3: '',
      showEmail2: false,
      showEmail3: false,
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
      merchantDetailDenied,
    } = this.props;
    const terminalDeniedContact = merchantDetailDenied && merchantDetailDenied.terminalContact;
    return (
      <Row>
        <div className="col-md-12">
          <div className="widget-box transparent">
            <div className="widget-header widget-header-flat" role="presentation" onClick={this.handOpenInfo} onKeyPress={this.handOpenInfo}>
              <span className="text-bold">{Constants.MerchantList.contactInfo}</span>
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
                        {Constants.MerchantList.contactFullName}
                      </Label>
                    </Col>
                    <Col lg="7">
                      { terminalDeniedContact && terminalDeniedContact.fullName !== null ? terminalDeniedContact && terminalDeniedContact.fullName : '' }
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MerchantList.contactPhoneNumber}
                      </Label>
                    </Col>
                    <Col lg="7">
                      { terminalDeniedContact && terminalDeniedContact.phoneNumber !== null ? terminalDeniedContact && terminalDeniedContact.phoneNumber : '' }
                    </Col>
                  </FormGroup>
                  { ((showNumberPhone2 || numberPhone2) ? (
                    <FormGroup row>
                      <Col lg="5" />
                      <Col lg="7">
                        { terminalDeniedContact && terminalDeniedContact.phoneNumber1 !== null ? terminalDeniedContact && terminalDeniedContact.phoneNumber1 : '' }
                      </Col>
                    </FormGroup>
                  ) : null)}
                  { (showNumberPhone3 || numberPhone3 ? (
                    <FormGroup row>
                      <Col lg="5" />
                      <Col lg="7">
                        { terminalDeniedContact && terminalDeniedContact.phoneNumber2 !== null ? terminalDeniedContact && terminalDeniedContact.phoneNumber2 : '' }
                      </Col>
                    </FormGroup>
                  ) : null)}
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MerchantList.contactEmail}
                      </Label>
                    </Col>
                    <Col lg="7">
                      { terminalDeniedContact && terminalDeniedContact.email !== null ? terminalDeniedContact && terminalDeniedContact.email : '' }
                    </Col>
                  </FormGroup>
                  { (showEmail2 || email2) ? (
                    <FormGroup row>
                      <Col lg="5" />
                      <Col lg="7">
                        { terminalDeniedContact && terminalDeniedContact.email1 !== null ? terminalDeniedContact && terminalDeniedContact.email1 : '' }
                      </Col>
                    </FormGroup>
                  ) : null }
                  { (showEmail3 || email3) ? (
                    <FormGroup row>
                      <Col lg="5" />
                      <Col lg="7">
                        { terminalDeniedContact && terminalDeniedContact.email2 !== null ? terminalDeniedContact && terminalDeniedContact.email2 : '' }
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
  merchantDetailDenied: state.masterMerchant.merchantDetailDenied,
});

const mapDispatchToProps = (dispatch) => ({
  getMerchantDetailDenied: (data) => dispatch(getMerchantDetailDenied(data)),
});

ContactInfo.defaultProps = {
  merchantDetailDenied: {},
};

ContactInfo.propTypes = {
  merchantDetailDenied: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ContactInfo));
