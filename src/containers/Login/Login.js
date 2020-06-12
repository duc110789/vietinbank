/* eslint-disable */
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'reactstrap';
import {login} from '../../store/actions/AuthenAction/LoginPageAction';
import Auth from '../../middleware/Auth';
import {callApiCommon,} from '../../apis/system/commonApi';
import {
  getAllBank,
  getAllBranchBank,
  getAllBranchBankByUser,
  getAllMasterMerchant,
  getAllMccInterior,
  getAllMccInternational,
  getAllProvince,
  getAllUser,
} from '../../store/actions/system/systemModuleAction';
import {loadAllGroupRole} from '../../store/actions/LocalUserManagementAction/ListPageAction';
import {
  checkContainSpace,
  checkLength6To50,
  checkLength3To50,
  isValidVietnamese,
  checkRequiredInput,
} from "../../components/Input/validation";
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      controls: {
        username: {
          value: '',
        },
        password: {
          value: '',
        }
      },
      isInvalid: false,
      keep_logged: false,
      reasonFailLogin: '',
      oldPassword: '',
    }
    localStorage.removeItem('token_mms');
    localStorage.removeItem('refreshToken');
  }

  static getDerivedStateFromProps(props, state) {
    const { reasonFailLogin } = props;
    return {
      reasonFailLogin,
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      getAllMasterMerchant,
      getAllBank,
      getAllMccInternational,
      getAllProvince,
      getAllMccInterior,
      getAllBranchBank,
      getAllBranchBankByUser,
      loadAllGroupRole,
      getAllUser,
    } = this.props;
    const { token, refreshToken, history } = this.props;
    if(token !== prevProps.token && refreshToken !== prevProps.refreshToken) {
      localStorage.setItem("token_mms", token);
      localStorage.setItem("refreshToken", refreshToken);
      const decodeToken = Auth.parseJwt(token);
      localStorage.setItem("username", decodeToken.Username);
      localStorage.setItem("lastLogin", decodeToken.LastTimeLogin);
      const changePass = Auth.parseJwt(token).ChangePass;
      if(changePass === 0) {
        getAllMasterMerchant();
        getAllBank();
        getAllMccInternational();
        getAllProvince();
        getAllMccInterior();
        getAllBranchBank();
        getAllBranchBankByUser();
        getAllUser();
        callApiCommon();
        loadAllGroupRole();
        history.push('/management-transaction/list');
      }
      else {
        history.push(`/resetPassword`);
        localStorage.setItem('oldPassword', this.state.oldPassword);
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
  }

  usernameInputChangeHandle = event =>{
    this.inputChangeHandler(event,'username');

  }
  passwordInputChangeHandle = event =>{
    this.inputChangeHandler(event,'password');
  }

  onSignIn = async (e) =>{
    e.preventDefault();
    const { login } = this.props;
    const data = {
      username: this.state.controls.username.value.trim(),
      password: this.state.controls.password.value,
    };
    this.form.validateAll();
    if (this.form.getChildContext()._errors.length === 0) {
      this.setState({
        oldPassword: this.state.controls.password.value,
      })
      login(data);
    }
  }


  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="5">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form ref={(data) => { this.form = data; }}>
                      <div className="text-center">
                        <img src="../../assets/img/logo/logo.png" className="img-logo" alt="logo" />
                        <div className="header-text hidden-xs">
                          <p className="text-vietinbank-header">
                            <span className="clred">QR</span>
                            <span className="clblue"> Merchant</span>
                            {' '}
                            Management
                          </p>
                        </div>
                        <h4 className="login-text">Đăng nhập</h4>
                      </div>
                      <div className="float-left wrap-icon-login mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                      </div>
                      <div className="float-left wrap-input-login">
                        <Input
                          type="text"
                          className="form-control input-login"
                          label="Tên đăng nhập"
                          placeholder="Tên đăng nhập"
                          autoComplete="username"
                          value={this.state.controls.username.value}
                          onChange = {this.usernameInputChangeHandle}
                          validations={[
                            checkRequiredInput,
                            checkLength3To50,
                            checkContainSpace,
                            isValidVietnamese,
                          ]}
                        />
                      </div>
                      <div className="float-left wrap-icon-login mb-4" style={{ clear: 'left' }}>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                      </div>
                      <div className="float-left wrap-input-login">
                        <Input
                          value={this.state.controls.password.value}
                          type="password"
                          className="form-control input-login"
                          label="Mật khẩu"
                          placeholder="Mật khẩu"
                          autoComplete="current-password"
                          onChange = {this.passwordInputChangeHandle}
                          validations={[
                            checkRequiredInput,
                            checkLength6To50,
                            checkContainSpace,
                          ]}
                        />
                      </div>

                      <div style={{ clear: 'left' }} className="text-right mb-3">
                        <a color="link" className="px-0 text-underline" href="/#/forgetPassword">Quên mật khẩu</a>
                      </div>
                      <div>
                        <button color="primary" className="btn px-4 btn-primary w-100" onClick={this.onSignIn}>Đăng nhập</button>
                      </div>
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
  token: state.loginPage.token,
  refreshToken: state.loginPage.refreshToken,
  reasonFailLogin: state.loginPage.reasonFailLogin,
  username: state.loginPage.username,
});

const mapDispatchToProps = (dispatch) => ({
  login: (data) => dispatch(login(data)),
  getAllMasterMerchant: () => dispatch(getAllMasterMerchant()),
  getAllBank: () => dispatch(getAllBank()),
  getAllMccInternational: () => dispatch(getAllMccInternational()),
  getAllProvince: () => dispatch(getAllProvince()),
  getAllMccInterior: () => dispatch(getAllMccInterior()),
  getAllBranchBank: () => dispatch(getAllBranchBank()),
  getAllBranchBankByUser: () => dispatch(getAllBranchBankByUser()),
  loadAllGroupRole: () => dispatch(loadAllGroupRole()),
  getAllUser: () => dispatch(getAllUser()),
});

Login.propTypes = {
  login: PropTypes.func,
  token: PropTypes.string,
  refreshToken: PropTypes.string,
  reasonFailLogin: PropTypes.string,
  getAllMasterMerchant: PropTypes.func,
  getAllBank: PropTypes.func,
  getAllMccInternational: PropTypes.func,
  getAllProvince: PropTypes.func,
  getAllMccInterior: PropTypes.func,
  getAllBranchBank: PropTypes.func,
  getAllBranchBankByUser: PropTypes.func,
  loadAllGroupRole: PropTypes.func,
  getAllUser: PropTypes.func,
};
Login.defaultProps = {
  login: () => {},
  token: null,
  refreshToken: null,
  reasonFailLogin: '',
  getAllMasterMerchant: () => {},
  getAllBank: () => {},
  getAllMccInternational: () => {},
  getAllProvince: () => {},
  getAllMccInterior: () => {},
  getAllBranchBank: () => {},
  getAllBranchBankByUser: () => {},
  loadAllGroupRole: () => {},
  getAllUser: () => {},
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));;
