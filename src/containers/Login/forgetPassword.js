/* eslint-disable */
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'reactstrap';
import {resetPassword} from '../../store/actions/AuthenAction/ResetPasswordAction';
import {messageError, messageSuccess} from "../../utils";

class forgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      controls: {
        email: {
          value: '',
          validation: {
            required: true,
            isEmail: true,
            minLength: 6,
            maxLength: 200,
          },
          valid: true,
          errorMes: ''
        },
      },
      isInvalid: false,
      keep_logged: false,
    }
    this.goBack = this.goBack.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { responseServer } = this.props;

    if (responseServer !== prevProps.responseServer) {
      if (responseServer.description === 'Success') {
        messageSuccess('Vui lòng kiểm tra email để nhận đường dẫn thay đổi mật khẩu');
      } else {
        messageError(responseServer.description);
      }
    }
  }

  checkValidity(value, rules){
    let isValid = true;
    if(!rules){
      return true;
    }

    if(rules.required){
      isValid = value.trim() !== "" && isValid;
    }
    if(rules.minLength){
      isValid = value.length >= rules.minLength && isValid;
    }
    if(rules.maxLength){
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
      isValid = pattern.test(value.trim()) && isValid;
    }
    return isValid;
  }

  inputChangeHandler = (event, controlName) =>
  {
    const updateControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        errorMes: '',
      }
    };
    this.setState({controls : updateControls});
  }


  emailInputChangeHandle = event =>{
    this.inputChangeHandler(event,'email');

  }

  handleForgetPassword = async () => {
    const { resetPassword } = this.props;
    const data = {
      email: this.state.controls.email.value.trim(),
    };
    let emailInValid =  null;

    if(
      data.email !== '' &&   /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/.test(
      data.email.trim()
      ) === false
    ){
      emailInValid = {
        ...this.state.controls.email,
        errorMes: 'Email không hợp lệ'
      };
    }
    if(data.email === '') {
      emailInValid = {
        ...this.state.controls.email,
        errorMes: 'Vui lòng nhập email',
      };
    }

    if(data.email.length > 200 ) {
      emailInValid = {
        ...this.state.controls.email,
        errorMes: 'Email có độ dài tối đa 200 ký tự',
      };
    }

    let updateMes = {
      email: emailInValid !== null ? emailInValid : this.state.controls.email,
    };
    this.setState({controls: updateMes});
    if (
      this.state.controls.email.valid === true && this.state.controls.email.value !== ''
    ) {
      resetPassword({email: this.state.controls.email.value, type: 'EMAIL' })
    }

  }
  goBack(){
    this.props.history.push('/login');
  }

  render() {
    return (
      <div className="col-md-12" style={{marginTop: '100px'}}>
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1 style={{fontSize: '14px'}}>Đổi mật khẩu</h1>
                      <p className="text-muted"></p>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" maxlength="200" placeholder="Nhập email" autoComplete="email" onChange = {this.emailInputChangeHandle} />
                      </InputGroup>
                      {this.state.controls.email.errorMes !== '' ? (
                        <p style = {{
                          color: "red",
                          fontSize: '13px',
                          margin: '3px auto'
                        }}>{this.state.controls.email.errorMes}</p>
                      ) : (
                        <div style = {{height: '0px'}}></div>
                      )}
                      <Row>
                        <Col xs="12" style={{textAlign: 'center'}}>
                          <Button color="primary" className="px-4" onClick={this.handleForgetPassword} style={{marginRight: '20px'}}>Gửi lại mật khẩu</Button>
                          <Button color="secondary" className="px-4" onClick={this.goBack}>Bỏ qua</Button>
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
  responseServer: state.resetPassword.description,
});

const mapDispatchToProps = (dispatch) => ({
  resetPassword: (data) => dispatch(resetPassword(data)),
});

forgetPassword.propTypes = {
  resetPassword: PropTypes.func,


};
forgetPassword.defaultProps = {
  resetPassword: () => {},

};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(forgetPassword));
