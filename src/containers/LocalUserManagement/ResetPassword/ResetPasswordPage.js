/* eslint-disable */
import React from 'react';
import {Button, Card, CardBody, Col, Collapse, FormGroup, Label,} from 'reactstrap';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getDataLocalUserById} from '../../../store/actions/LocalUserManagementAction/UpdatePageAction';
import generator from "generate-password";
import {resetPasswordLocalAcc} from '../../../store/actions/LocalUserManagementAction/ResetPasswordAction';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import {
  checkContainSpace,
  checkLength6To50,
  checkPasswordFormat,
  checkRequiredInput,
  isValidVietnamese
} from "../../../components/Input/validation";
import {isNumberAndChar} from "../../../utils/validation";
import {messageSuccess} from "../../../utils";

class ResetPasswordPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      repeatPassword: '',
      errorMessRepeatPassword: '',
      changePassword: 0,
      isValidConfirmPassword: false,
    };
    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    const {getDataLocalUser} = this.props;
    const idUser = localStorage.getItem('LOCAL_USER_ID');
    getDataLocalUser(idUser);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { dataLocalUser,isChangePasswordSuccess, history } = this.props;
    // eslint-disable-next-line no-empty
    if (dataLocalUser !== prevProps.dataLocalUser) {
      this.setState({
        ...this.state,
        username: dataLocalUser.username,
      })
    }
    if (isChangePasswordSuccess !== prevProps.isChangePasswordSuccess) {
      messageSuccess( 'Đặt lại mật khẩu thành công');
      history.push('/system/user/list');
    }
  }

  onChangePassword = (e) => {
    const { repeatPassword } = this.state;

    this.setState({
      ...this.state,
     password: e.target.value,
    });

    if (e.target.value !== repeatPassword && repeatPassword
      && isNumberAndChar(repeatPassword) && !checkLength6To50(repeatPassword, 'text')) {
      this.setState({
        errorMessRepeatPassword: 'Giá trị mật khẩu không trùng khớp',
        isValidConfirmPassword: false,
      });
    } else {
      this.setState({
        errorMessRepeatPassword: '',
        isValidConfirmPassword: true,
      });
    }
  }

  onChangeRepeatPassword = (e) => {
    const { password } = this.state;
    this.setState({
      ...this.state,
      repeatPassword: e.target.value,
    });

    if (password !== e.target.value && e.target.value !== ''
      && isNumberAndChar(e.target.value) && !checkLength6To50(e.target.value, 'text')) {
      this.setState({
        errorMessRepeatPassword: 'Giá trị mật khẩu không trùng khớp',
        isValidConfirmPassword: false,
      });
    } else {
      this.setState({
        isValidConfirmPassword: true,
        errorMessRepeatPassword: '',
      });
    }
  }
  goBack(){
    this.props.history.goBack();
  }

  updateChangePassword = () => {
    const {password, isValidConfirmPassword, changePassword, username} = this.state;
    const { resetPasswordLocalAcc } = this.props;

    this.form.validateAll();

    const errors = this.form.getChildContext()._errors.length;

    if (errors === 0 && isValidConfirmPassword) {
      const sendData = {
        username,
        password,
        changePassword
      }
      resetPasswordLocalAcc(sendData);
    }
  }

  randomGeneratePassword = () => {
    const randomPassword = generator.generate({
      length: 10,
      numbers: true,
    })
    this.setState({
      ...this.state,
      password: randomPassword,
    })
  }

  onHandleCheckBox = () => {
    const { changePassword } = this.state;
    changePassword === 0 ? this.setState({
      ...this.state,
      changePassword: 1,
    }) : this.setState({
      ...this.state,
      changePassword: 1,
    })
  };

  render() {
    const { username , password, repeatPassword, errorMessRepeatPassword } = this.state;
    return (
      <Form ref={(resetPasswordLocalAcc) => { this.form = resetPasswordLocalAcc; }}>
        <div className="col-md-12">
          <div className="widget-box transparent">
            <div
              className="widget-header widget-header-flat"
              role="presentation"
              onClick={this.handOpenInfo}
              onKeyPress={this.handOpenInfo}
            >
              <span className="text-bold">Đặt lại mật khẩu</span>
              <div className="widget-toolbar" />
            </div>
            <Collapse isOpen className="show-information">
              <Card>
                <CardBody>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        Tên đăng nhập
                      </Label>
                    </Col>
                    <Col lg="7">
                     <div><span>{username}</span></div>
                    </Col>
                  </FormGroup>


                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        Mật khẩu
                        {' '}<span className="text-danger">*</span>
                      </Label>
                    </Col>
                    <Col lg="5">
                      <Input
                        value={password}
                        label="Mật khẩu mới"
                        type="text"
                        className="form-control"
                        onChange={this.onChangePassword}
                        validations={[
                          checkRequiredInput,
                          checkLength6To50,
                          isValidVietnamese,
                          checkContainSpace,
                          checkPasswordFormat,
                        ]}
                      />
                    </Col>
                    <Col lg="2">
                      <Button color="primary" onClick={this.randomGeneratePassword}>Sinh mật khẩu</Button>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        Xác nhận mật khẩu
                        {' '}<span className="text-danger">*</span>
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Input
                        value={repeatPassword}
                        label="Xác nhận mật khẩu"
                        type="text"
                        className="form-control"
                        onChange={this.onChangeRepeatPassword}
                        validations={[
                          checkRequiredInput,
                          checkLength6To50,
                          isValidVietnamese,
                          checkContainSpace,
                          checkPasswordFormat,
                        ]}
                      />
                      {errorMessRepeatPassword !== '' ? (
                        <small className="form-text text-danger">
                          {errorMessRepeatPassword}
                        </small>
                      ) : (
                        <div style={{height: '0px'}}/>
                      )}
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col lg="5" />
                    <Col lg="7">
                      <Input className="float-left mt-1" type="checkbox"  onChange={this.onHandleCheckBox} />
                      {' '}
                      {' '}
                      <span className="float-left ml-2">Đổi mật khẩu lần đầu tiên</span>
                    </Col>
                  </FormGroup>

                  <Col xs="12" style={{ textAlign: 'center' }}>
                    <Button
                      color="primary"
                      className="px-4"
                      onClick={this.updateChangePassword}
                      style={{ marginRight: '20px' }}
                    >
                      Cập nhật
                    </Button>
                    <Button color="secondary" className="px-4"  onClick={this.goBack}>Bỏ qua</Button>
                  </Col>
                </CardBody>
              </Card>
            </Collapse>
          </div>
        </div>
      </Form>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  dataLocalUser: state.UpdatePage.dataLocalUser,
  isChangePasswordSuccess: state.ResetPasswordLocalAccPage.isChangePasswordSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  getDataLocalUser: (data) => dispatch(getDataLocalUserById(data)),
  resetPasswordLocalAcc: (data) => dispatch(resetPasswordLocalAcc(data))
});


ResetPasswordPage.propTypes = {
  getDataLocalUser: PropTypes.func,
  dataLocalUser: PropTypes.object,
  resetPasswordLocalAcc: PropTypes.func,
  isChangePasswordSuccess: PropTypes.object,
};

ResetPasswordPage.defaultProps = {
  getDataLocalUser: () => {},
  dataLocalUser: null,
  resetPasswordLocalAcc: () => {},
  isChangePasswordSuccess: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ResetPasswordPage));
