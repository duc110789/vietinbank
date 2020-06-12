/* eslint-disable */
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'reactstrap';
import {accChangePassword} from '../../store/actions/AuthenAction/accPersonalInfoPageAction';
import PropTypes from "prop-types";
import {messageError, messageSuccess} from "../../utils";
import {
  checkContainSpace,
  checkContainSpecialCharacters,
  checkLength6To50,
  checkRequiredInput,
  checkPasswordFormat,
} from "../../components/Input/validation";
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      controls: {
        password: {
          value: '',
        },
        repeatPassword: {
          value: '',
        },
      },
      isInvalid: false,
      keep_logged: false,
      errorMessRepeatPassword: '',
      errorMessPassword: '',
      isValidConfirmPassword: false,
      isValidPassword: false,
    }
  }

  componentDidMount() {
    const { history } = this.props;
    const tokenFromPath = history.location.search;
    if (tokenFromPath !== '') {
      const token = tokenFromPath.slice(tokenFromPath.indexOf('=') + 1, tokenFromPath.length);
      localStorage.setItem('token_mms', token);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { messageChangePass, history } = this.props;
    if (prevProps.messageChangePass !== messageChangePass) {
      if (messageChangePass.description === 'Success') {
        const { history } = this.props;
        const tokenFromPath = history.location.search;
        localStorage.clear();
        sessionStorage.clear();
        history.push('/login');
        messageSuccess(tokenFromPath !== '' ? 'Đặt lại mật khẩu thành công'
          : 'Bạn đã đổi mật khẩu thành công');
      } else {
        messageError(messageChangePass.description);
      }
    }
  }

  inputChangeHandler = (event, controlName) =>
  {
    const updateControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
      }
    };

    this.setState({controls : updateControls});

    let isSame;
    let isSameOldPassword;

    if (controlName === 'password') {
      isSame = event.target.value === this.state.controls.repeatPassword.value;
      isSameOldPassword = event.target.value === localStorage.getItem('oldPassword');
      if (isSameOldPassword) {
        this.setState({
          errorMessPassword: 'Mật khẩu mới không được trùng với mật khẩu cũ',
          isValidPassword: false,
        });
      } else {
        this.setState({
          errorMessPassword: '',
          isValidPassword: true,
        });
      }
    } else {
      isSame = event.target.value === this.state.controls.password.value;
    }

    this.form.validateAll();

    if (this.form.getChildContext()._errors.length === 0 && !isSame) {
      this.setState({
        errorMessRepeatPassword: 'Mật khẩu mới và Nhập lại mật khẩu mới phải trùng nhau',
        isValidConfirmPassword: false,
      });
    } else {
      this.setState({
        errorMessRepeatPassword: '',
        isValidConfirmPassword: true,
      });
    }
  }

  passwordInputHandle = event =>{
    this.inputChangeHandler(event,'password');
  }

  repeatPasswordInputChangeHandle = event =>{
    this.inputChangeHandler(event,'repeatPassword');
  }

  resetPassword = async () => {
    const { accChangePassword } = this.props;
    const { isValidConfirmPassword, isValidPassword } = this.state;
    this.form.validateAll();
    if (this.form.getChildContext()._errors.length === 0 && isValidConfirmPassword && isValidPassword) {
      const sendData = {
        oldPassword: null,
        newPassword: this.state.controls.password.value,
      }
      accChangePassword(sendData);
    }
  }

  render() {
    const { errorMessRepeatPassword, errorMessPassword } = this.state;
    return (
      <div className="col-md-12" style={{marginTop: '100px'}}>
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form ref={(sendData) => { this.form = sendData; }}>
                      <h1 style={{fontSize: '14px'}}>Quý khách vui lòng đổi mật khẩu mới để tiếp tục sử dụng dịch vụ. Xin cảm ơn</h1>
                      <p className="text-muted"/>
                      <div className="float-left wrap-icon-login mb-4" style={{ clear: 'left' }}>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"/>
                          </InputGroupText>
                        </InputGroupAddon>
                      </div>
                      <div className="float-left wrap-input-login">
                        <Input
                          value={this.state.controls.password.value}
                          type="password"
                          className="form-control input-login"
                          label="Mật khẩu mới"
                          placeholder="Mật khẩu mới"
                          autoComplete="new-password"
                          onChange = {this.passwordInputHandle}
                          validations={[
                            checkRequiredInput,
                            checkLength6To50,
                            checkContainSpace,
                            checkContainSpecialCharacters,
                            checkPasswordFormat,
                          ]}
                        />
                      </div>
                      {errorMessPassword !== '' ? (
                        <div className="password-error">
                          <small className="form-text text-danger" style={{ clear: 'left', marginBottom: 10 }}>
                            {errorMessPassword}
                          </small>
                        </div>
                      ) : (
                        <div style={{ height: '0px' }} />
                      )}
                      <div className="float-left wrap-icon-login mb-4" style={{ clear: 'left' }}>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"/>
                          </InputGroupText>
                        </InputGroupAddon>
                      </div>
                      <div className="float-left wrap-input-login">
                        <Input
                          value={this.state.controls.repeatPassword.value}
                          type="password"
                          className="form-control input-login"
                          label="Nhâp lại mật khẩu mới"
                          placeholder="Nhập lại mật khẩu mới"
                          autoComplete="confirm-new-password"
                          onChange = {this.repeatPasswordInputChangeHandle}
                          validations={[
                            checkRequiredInput,
                            checkLength6To50,
                            checkContainSpace,
                            checkContainSpecialCharacters,
                            checkPasswordFormat,
                          ]}
                        />
                      </div>
                      {errorMessRepeatPassword !== '' ? (
                        <div className="password-error">
                          <small className="form-text text-danger" style={{ clear: 'left', marginBottom: 10 }}>
                            {errorMessRepeatPassword}
                          </small>
                        </div>
                      ) : (
                        <div style={{ height: '0px' }} />
                      )}
                      <Row style={{ clear: 'both' }}>
                        <Col xs="12" style={{textAlign: 'center'}}>
                          <Button color="primary" className="px-4" onClick={this.resetPassword}>Hoàn tất</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  messageChangePass: state.accPersonalInfo.messageChangePass,
});

const mapDispatchToProps = (dispatch) => ({
  accChangePassword: (data) => dispatch(accChangePassword(data))
});

ResetPassword.propTypes = {
  accChangePassword: PropTypes.func,
  messageChangePass: PropTypes.string,
};
ResetPassword.defaultProps = {
  accChangePassword: () => {},
  messageChangePass: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ResetPassword));;
