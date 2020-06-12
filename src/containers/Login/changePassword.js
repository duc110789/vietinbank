import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button, Card, CardBody, CardHeader, Col, FormGroup, Label, Row,
} from 'reactstrap';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { accChangePassword } from '../../store/actions/AuthenAction/accPersonalInfoPageAction';
import {
  checkContainSpace,
  checkLength6To50,
  checkPasswordFormat,
  checkRequiredInput,
  isValidVietnamese,
} from '../../components/Input/validation';
import { isNumberAndChar } from '../../utils/validation';
import { messageError, messageSuccess } from '../../utils';

class changePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isValidConfirmPassword: false,
      isValidPassword: false,
      errorMessRepeatPassword: '',
      errorMessPassWord: '',
      isSameCurrentPassword: false,
      errorMessSamePassword: '',
      data: {
        password: '',
        newPassword: '',
        repeatNewPassword: '',
      },
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { messageChangePass, history } = this.props;
    if (prevProps.messageChangePass !== messageChangePass) {
      if (messageChangePass.description === 'Success') {
        history.push('/login');
        localStorage.clear();
        sessionStorage.clear();
        messageSuccess('Đổi mật khẩu thành công');
      } else if (messageChangePass.description === 'Change password fail') {
        messageError('Mật khẩu hiện tại không đúng');
      } else {
        messageError('Thay đổi mật khẩu thất bại');
      }
    }
  }

  onChangeRepeatPassword = (e) => {
    const { data } = this.state;

    this.setState({
      data: {
        ...data,
        repeatNewPassword: e.target.value,
      },
    });

    if (data.newPassword !== e.target.value && e.target.value !== ''
      && isNumberAndChar(e.target.value) && !checkLength6To50(e.target.value, 'text')) {
      this.setState({
        errorMessRepeatPassword: 'Mật khẩu mới không trùng khớp',
        isValidConfirmPassword: false,
      });
    } else {
      this.setState({
        isValidConfirmPassword: true,
        errorMessRepeatPassword: '',
      });
    }
  }

  onChangePassword = (e) => {
    const { data } = this.state;
    this.setState({
      data: {
        ...data,
        password: e.target.value,
      },
    });

    if (data.newPassword === e.target.value && e.target.value !== ''
      && isNumberAndChar(e.target.value) && !checkLength6To50(e.target.value, 'text')) {
      this.setState({
        errorMessPassword: 'Mật khẩu mới trùng với mật khẩu hiện tại',
        isValidPassword: false,
      });
    } else {
      this.setState({
        isValidPassword: true,
        errorMessPassword: '',
      });
    }

    if (data.newPassword === e.target.value && e.target.value !== ''
      && isNumberAndChar(e.target.value) && !checkLength6To50(e.target.value, 'text')) {
      this.setState({
        errorMessSamePassword: 'Mật khẩu mới không được trùng với mật khẩu cũ.',
        isSameCurrentPassword: true,
      });
    } else {
      this.setState({
        isSameCurrentPassword: false,
        errorMessSamePassword: '',
      });
    }
  }

  onChangeNewPassword = (e) => {
    const { data } = this.state;
    if (data.password === e.target.value && e.target.value !== ''
      && isNumberAndChar(e.target.value) && !checkLength6To50(e.target.value, 'text')) {
      this.setState({
        errorMessPassword: 'Mật khẩu mới trùng với mật khẩu hiện tại',
        isValidPassword: false,
      });
    } else {
      this.setState({
        isValidPassword: true,
        errorMessPassword: '',
      });
    }

    if (e.target.value !== data.repeatNewPassword && data.repeatNewPassword
      && isNumberAndChar(data.repeatNewPassword) && !checkLength6To50(data.repeatNewPassword, 'text')) {
      this.setState({
        errorMessRepeatPassword: 'Mật khẩu mới không trùng khớp',
        isValidConfirmPassword: false,
      });
    } else {
      this.setState({
        errorMessRepeatPassword: '',
        isValidConfirmPassword: true,
      });
    }

    if (e.target.value === data.password && data.password
      && isNumberAndChar(data.password) && !checkLength6To50(data.password, 'text')) {
      this.setState({
        errorMessSamePassword: 'Mật khẩu mới không được trùng với mật khẩu cũ.',
        isSameCurrentPassword: true,
      });
    } else {
      this.setState({
        errorMessSamePassword: '',
        isSameCurrentPassword: false,
      });
    }

    this.setState({
      data: {
        ...data,
        newPassword: e.target.value,
      },
    });
  }

  updatePassword = async () => {
    const { data, isValidConfirmPassword, isSameCurrentPassword } = this.state;
    const { accChangePassword } = this.props;

    this.form.validateAll();

    const errors = this.form.getChildContext()._errors.length;

    if (errors === 0 && isValidConfirmPassword && !isSameCurrentPassword) {
      const sendData = {
        oldPassword: data.password,
        newPassword: data.newPassword,
      };
      accChangePassword(sendData);
    }
  }

  render() {
    const { errorMessRepeatPassword, data, errorMessPassword } = this.state;
    const { history } = this.props;
    return (
      <div className="col-md-12">
        <Row className="justify-content-center">
          <Col md="8">
            <Form className="widget-box transparent" ref={(accChangePassword) => { this.form = accChangePassword; }}>
              <Card>
                <CardHeader>
                  <span className="text-bold">Tạo mật khẩu mới</span>
                </CardHeader>
                <CardBody>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        Mật khẩu hiện tại
                        {' '}
                        <span className="text-danger">*</span>
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Input
                        label="Mật khẩu hiện tại"
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
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        Mật khẩu mới
                        {' '}
                        <span className="text-danger">*</span>
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Input
                        value={data.newPassword}
                        label="Mật khẩu mới"
                        type="text"
                        className="form-control"
                        onChange={this.onChangeNewPassword}
                        validations={[
                          checkRequiredInput,
                          checkLength6To50,
                          isValidVietnamese,
                          checkContainSpace,
                          checkPasswordFormat,
                        ]}
                      />
                      {errorMessPassword !== '' ? (
                        <small className="form-text text-danger">
                          {errorMessPassword}
                        </small>
                      ) : (
                        <div style={{ height: '0px' }} />
                      )}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        Xác nhận mật khẩu mới
                        {' '}
                        <span className="text-danger">*</span>
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Input
                        value={data.repeatNewPassword}
                        label="Xác nhận mật khẩu mới"
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
                        <div style={{ height: '0px' }} />
                      )}
                    </Col>
                  </FormGroup>
                  <Col xs="12" style={{ textAlign: 'center', margin: '40px 0' }}>
                    <Button
                      color="primary"
                      className="px-4 mr-3"
                      onClick={this.updatePassword}
                    >
                      Cập nhật
                    </Button>
                    <Button onClick={() => history.push('/management-transaction/list')} color="secondary" className="px-4">Bỏ qua</Button>
                  </Col>
                </CardBody>
              </Card>
            </Form>
          </Col>
        </Row>

      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  messageChangePass: state.accPersonalInfo.messageChangePass,
});

const mapDispatchToProps = (dispatch) => ({
  accChangePassword: (data) => dispatch(accChangePassword(data)),
});

changePassword.propTypes = {
  accChangePassword: PropTypes.func,
  messageChangePass: PropTypes.string,
  history: PropTypes.object,
};
changePassword.defaultProps = {
  accChangePassword: () => {},
  messageChangePass: null,
  history: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(changePassword));
