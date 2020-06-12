import React from 'react';
import {Button, Card, CardBody, Col, Collapse, FormGroup, Label, Row,} from 'reactstrap';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Constants from '../Constants';
import {
  checkContainSpace,
  checkContainSpecialCharacters,
  checkEmailFormat,
  checkLength50,
  checkPhoneNumber,
  checkRequiredInput, checkRequiredSelect,
  notAllowInputNumber,
} from '../../../components/Input/validation';
import { scroll } from '../../../utils/commonFunction';

class ContactInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenInfo: true,
      fullName: '',
      numberPhone: '',
      numberPhone2: '',
      numberPhone3: '',
      numberClickAddPhone: 0,
      showNumberPhone2: false,
      showNumberPhone3: false,
      email: '',
      email2: '',
      email3: '',
      numberClickAddEmail: 0,
      showEmail2: false,
      showEmail3: false,
      isNumberPhoneSame: '',
      isEmailSame: '',
      isValidEmail: true,
      isValidPhone: true,
    };
  }

  componentDidUpdate(prevProps) {
    const {
      passContactInfo,
      validateForm,
    } = this.props;
    const {
      fullName,
      numberPhone,
      numberPhone2,
      numberPhone3,
      email,
      email2,
      email3,
      isValidEmail,
      isValidPhone,
    } = this.state;
    const dataContactInfo = {
      fullName,
      numberPhone,
      numberPhone2,
      numberPhone3,
      email,
      email2,
      email3,
    };

    if (validateForm !== prevProps.validateForm) {
      this.form.validateAll();

      const errors = this.form.getChildContext()._errors;
      const elements = this.form.state.byId;
      if (errors.length > 0) {
        const elementFiltered = elements[errors[0]];
        scroll(`${elementFiltered.id}`, true);
      }
    }
    if (
      this.form.getChildContext()._errors.length === 0 && isValidEmail && isValidPhone
    ) {
      passContactInfo(dataContactInfo);
    }
  }

  handleChangeFullName = (event) => {
    this.setState({
      fullName: event.target.value,
    });
  };

  handleChangeNumberPhone = (event) => {
    const { numberPhone2, numberPhone3 } = this.state;
    this.setState({
      numberPhone: event.target.value,
    });
    if (numberPhone2 && numberPhone3 && (event.target.value === numberPhone3 || event.target.value === numberPhone2)) {
      this.setState({
        isNumberPhoneSame: 'Số điện thoại trùng nhau',
        isValidPhone: false,
      });
    } else if (numberPhone2 !== numberPhone3 && event.target.value !== numberPhone3 && event.target.value !== numberPhone2) {
      this.setState({
        isNumberPhoneSame: '',
        isValidPhone: true,
      });
    } else if (numberPhone2 && (event.target.value === numberPhone3 || event.target.value === numberPhone2)) {
      this.setState({
        isNumberPhoneSame: 'Số điện thoại trùng nhau',
        isValidPhone: false,
      });
    } else if (!event.target.value && !numberPhone2 && !numberPhone3) {
      this.setState({
        isValidPhone: true,
        isNumberPhoneSame: '',
      });
    } 
  };

  handleChangeNumberPhone2 = (event) => {
    const { numberPhone, numberPhone3 } = this.state;
    this.setState({
      numberPhone2: event.target.value,
    });
    if (numberPhone && (event.target.value === numberPhone || (numberPhone3 && event.target.value === numberPhone3))) {
      this.setState({
        isNumberPhoneSame: 'Số điện thoại trùng nhau',
        isValidPhone: false,
      });
    } else if (numberPhone3 !== numberPhone && numberPhone !== event.target.value && event.target.value !== numberPhone3) {
      this.setState({
        isNumberPhoneSame: '',
        isValidPhone: true,
      });
    }
  };

  handleChangeNumberPhone3 = (event) => {
    const { numberPhone2, numberPhone } = this.state;
    this.setState({
      numberPhone3: event.target.value,
    });
    if (numberPhone2 && numberPhone
      && (event.target.value === numberPhone2 || event.target.value === numberPhone)) {
      this.setState({
        isNumberPhoneSame: 'Số điện thoại trùng nhau',
        isValidPhone: false,
      });
    } else if (numberPhone2 !== numberPhone
      && event.target.value !== numberPhone2 && event.target.value !== numberPhone) {
      this.setState({
        isNumberPhoneSame: '',
        isValidPhone: true,
      });
    }
  };

  handleChangeEmail = (event) => {
    const { email2, email3 } = this.state;
    this.setState({
      email: event.target.value,
    });
    if (email2 && email3 && (event.target.value === email3 || event.target.value === email2)) {
      this.setState({
        isEmailSame: 'Email trùng nhau',
        isValidEmail: false,
      });
    } else if (email2 !== email3
      && event.target.value !== email3
      && event.target.value !== email2) {
      this.setState({
        isEmailSame: '',
        isValidEmail: true,
      });
    } else if (email2 && (event.target.value === email3 || event.target.value === email2)) {
      this.setState({
        isEmailSame: 'Email trùng nhau',
        isValidEmail: false,
      });
    } else if (!event.target.value && !email2 && !email3) {
      this.setState({
        isValidEmail: true,
        isEmailSame: '',
      });
    }
  };

  handleChangeEmail2 = (event) => {
    const { email, email3 } = this.state;
    this.setState({
      email2: event.target.value,
    });
    if (email && (event.target.value === email || (email3 && event.target.value === email3))) {
      this.setState({
        isEmailSame: 'Email trùng nhau',
        isValidEmail: false,
      });
    } else if (email3 !== email && email !== event.target.value && event.target.value !== email3) {
      this.setState({
        isEmailSame: '',
        isValidEmail: true,
      });
    }
  };

  handleChangeEmail3 = (event) => {
    const { email, email2 } = this.state;
    this.setState({
      email3: event.target.value,
    });
    if (email2 && email && (event.target.value === email2 || event.target.value === email)) {
      this.setState({
        isEmailSame: 'Email trùng nhau',
        isValidEmail: false,
      });
    } else if (email2 !== email && event.target.value !== email2 && event.target.value !== email) {
      this.setState({
        isEmailSame: '',
        isValidEmail: true,
      });
    }
  };

  addNewRowPhone = () => {
    const {
      numberClickAddPhone,
      numberPhone,
      numberPhone2,
    } = this.state;
    if (numberClickAddPhone === 0) {
      if (numberPhone) {
        this.setState({
          numberClickAddPhone: 1,
          showNumberPhone2: true,
        });
      }
    } else if (numberPhone2) {
      this.setState({
        showNumberPhone3: true,
      });
    }
  };

  deleteNewRowPhone2 = () => {
    const { numberPhone, numberPhone3 } = this.state;
    const {
      showNumberPhone3,
    } = this.state;
    if (!showNumberPhone3) {
      this.setState({
        numberClickAddPhone: 0,
        showNumberPhone2: false,
        numberPhone2: '',
      });
    }
    if (numberPhone3 !== numberPhone || !numberPhone3) {
      this.setState({
        isValidPhone: true,
        isNumberPhoneSame: '',
      });
    }
  };

  deleteNewRowPhone3 = () => {
    const { numberPhone2, numberPhone } = this.state;
    this.setState({
      numberClickAddPhone: 1,
      showNumberPhone3: false,
      numberPhone3: '',
    });
    if (numberPhone2 !== numberPhone || !numberPhone2) {
      this.setState({
        isValidPhone: true,
        isNumberPhoneSame: '',
      });
    }
  };

  addNewRowEmail = () => {
    const {
      numberClickAddEmail,
      email,
      email2,
    } = this.state;
    if (numberClickAddEmail === 0) {
      if (email) {
        this.setState({
          numberClickAddEmail: 1,
          showEmail2: true,
        });
      }
    } else if (email2) {
      this.setState({
        showEmail3: true,
      });
    }
  };

  deleteNewRowEmail2 = () => {
    const { email, email3 } = this.state;
    const {
      showEmail3,
    } = this.state;
    if (!showEmail3) {
      this.setState({
        numberClickAddEmail: 0,
        showEmail2: false,
        email2: '',
      });
    }
    if (email3 !== email || !email3) {
      this.setState({
        isValidEmail: true,
        isEmailSame: '',
      });
    }
  };

  deleteNewRowEmail3 = () => {
    const { email, email2 } = this.state;
    this.setState({
      numberClickAddEmail: 1,
      showEmail3: false,
      email3: '',
    });
    if (email2 !== email || !email2) {
      this.setState({
        isValidEmail: true,
        isEmailSame: '',
      });
    }
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
      showNumberPhone2,
      showNumberPhone3,
      showEmail2,
      showEmail3,
      isNumberPhoneSame,
      isEmailSame,
    } = this.state;
    return (
      <Row>
        <div className="col-md-12">
          <Form className="widget-box transparent" ref={(d) => { this.form = d; }}>
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
                        {' '}
                        <span className="text-danger">*</span>
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Input
                        id="add-full-name"
                        label={Constants.MnMerchant.fullName}
                        type="text"
                        className="form-control"
                        name="code"
                        maxLength={50}
                        onChange={this.handleChangeFullName}
                        validations={[
                          checkRequiredInput,
                          checkLength50,
                          checkContainSpecialCharacters,
                          notAllowInputNumber,
                        ]}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.phoneNumber}
                        {' '}
                        <span className="text-danger">*</span>
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Row className="mb-2">
                        <Col lg="9">
                          <Input
                            id="add-phone-number"
                            type="text"
                            label={Constants.MnMerchant.phoneNumber}
                            className="form-control"
                            name="code"
                            onChange={this.handleChangeNumberPhone}
                            validations={[
                              checkRequiredInput,
                              checkPhoneNumber,
                            ]}
                          />
                        </Col>
                        <Col lg="3">
                          <Button
                            onClick={() => this.addNewRowPhone()}
                            type="button"
                            className="btn btn-primary text-center"
                          >
                            <i className="fa fa-plus-circle" aria-hidden="true" />
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </FormGroup>
                  { showNumberPhone2 ? (
                    <FormGroup row>
                      <Col lg="5" />
                      <Col lg="7">
                        <Row className="mb-2">
                          <Col lg="9">
                            <Input
                              id="add-phone-number-2"
                              type="text"
                              className="form-control"
                              name="code"
                              onChange={this.handleChangeNumberPhone2}
                              validations={[
                                checkPhoneNumber,
                              ]}
                            />
                          </Col>
                          <Col lg="3">
                            <Button
                              onClick={() => this.deleteNewRowPhone2()}
                              type="button"
                              className="btn btn-danger text-center"
                            >
                              <i className="fa fa-minus" aria-hidden="true" />
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    </FormGroup>
                  ) : null }
                  { showNumberPhone3 ? (
                    <FormGroup row>
                      <Col lg="5" />
                      <Col lg="7">
                        <Row className="mb-2">
                          <Col lg="9">
                            <Input
                              id="add-phone-number-3"
                              type="text"
                              className="form-control"
                              name="code"
                              onChange={this.handleChangeNumberPhone3}
                              validations={[
                                checkPhoneNumber,
                              ]}
                            />
                          </Col>
                          <Col lg="3">
                            <Button
                              onClick={() => this.deleteNewRowPhone3()}
                              type="button"
                              className="btn btn-danger text-center"
                            >
                              <i className="fa fa-minus" aria-hidden="true" />
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    </FormGroup>
                  ) : null }
                  <FormGroup row>
                    <Col lg="5"></Col>
                    <Col lg="7">
                      {isNumberPhoneSame !== '' ? (
                        <small className="form-text text-danger">
                          {isNumberPhoneSame}
                        </small>
                      ) : (
                        <div style={{ height: '0px' }} />
                      )}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.email}
                        {' '}
                        <span className="text-danger">*</span>
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Row className="mb-2">
                        <Col lg="9">
                          <Input
                            id="add-email"
                            type="text"
                            label={Constants.MnMerchant.email}
                            className="form-control"
                            name="code"
                            onChange={this.handleChangeEmail}
                            validations={[
                              checkRequiredInput,
                              checkEmailFormat,
                              checkContainSpace,
                            ]}
                          />
                        </Col>
                        <Col lg="3">
                          <Button
                            onClick={() => this.addNewRowEmail()}
                            type="button"
                            className="btn btn-primary text-center"
                          >
                            <i className="fa fa-plus-circle" aria-hidden="true" />
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </FormGroup>
                  { showEmail2 ? (
                    <FormGroup row>
                      <Col lg="5" />
                      <Col lg="7">
                        <Row className="mb-2">
                          <Col lg="9">
                            <Input
                              id="add-email-2"
                              type="text"
                              className="form-control"
                              name="code"
                              label="Email"
                              onChange={this.handleChangeEmail2}
                              validations={[
                                checkEmailFormat,
                                checkContainSpace,
                              ]}
                            />
                          </Col>
                          <Col lg="3">
                            <Button
                              onClick={() => this.deleteNewRowEmail2()}
                              type="button"
                              className="btn btn-danger text-center"
                            >
                              <i className="fa fa-minus" aria-hidden="true" />
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    </FormGroup>
                  ) : null }
                  { showEmail3 ? (
                    <FormGroup row>
                      <Col lg="5" />
                      <Col lg="7">
                        <Row className="mb-2">
                          <Col lg="9">
                            <Input
                              id="add-email-3"
                              type="text"
                              className="form-control"
                              name="code"
                              label="Email"
                              onChange={this.handleChangeEmail3}
                              validations={[
                                checkEmailFormat,
                                checkContainSpace,
                              ]}
                            />
                          </Col>
                          <Col lg="3">
                            <Button
                              onClick={() => this.deleteNewRowEmail3()}
                              type="button"
                              className="btn btn-danger text-center"
                            >
                              <i className="fa fa-minus" aria-hidden="true" />
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    </FormGroup>
                  ) : null }
                  <FormGroup row>
                    <Col lg="5"></Col>
                    <Col lg="7">
                      {isEmailSame !== '' ? (
                        <small className="form-text text-danger">
                          {isEmailSame}
                        </small>
                      ) : (
                        <div style={{ height: '0px' }} />
                      )}
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
  passContactInfo: () => {},
};

ContactInfo.propTypes = {
  passContactInfo: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ContactInfo));
