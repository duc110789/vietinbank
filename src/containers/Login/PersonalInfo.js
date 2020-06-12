import React from 'react';
import {Link, withRouter,} from 'react-router-dom';
import {Button, Card, CardBody, CardGroup, CardHeader, Col, FormGroup, Label, Row,} from 'reactstrap';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Input from 'react-validation/build/input';
import Form from 'react-validation/build/form';
import {getAccPersonalInfo, updateAccInfo} from '../../store/actions/AuthenAction/accPersonalInfoPageAction';
import {renderUIStatusAuthen} from '../../utils/commonFunction';
import {messageError, messageSuccess} from '../../utils';
import {
  checkPhoneNumber,
  checkRequiredInput,
  checkEmailFormat,
} from '../../components/Input/validation';

class personalInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      controls: {
        email: {
          value: '',
        },
        userName: {
          value: '',
        },
        phoneNumber: {
          value: '',
        },
      },
    };
  }

  componentDidMount() {
    const { accPersonalInfo } = this.props;
    accPersonalInfo();
  }


  componentDidUpdate(prevProps, prevState, snapshot) {
    const { accPersonalInfoData, responseUpdateAcc } = this.props;
    if (prevProps.accPersonalInfoData !== accPersonalInfoData) {
      this.setState({
        controls: {
          email: {
            value: accPersonalInfoData && accPersonalInfoData.email,
          },
          userName: {
            value: accPersonalInfoData && accPersonalInfoData.fullName,
          },
          phoneNumber: {
            value: accPersonalInfoData && accPersonalInfoData.phone,
          },
        },
      });
    }

    if (responseUpdateAcc !== prevProps.responseUpdateAcc) {
      if (responseUpdateAcc.code !== '00') {
        messageError(responseUpdateAcc.description);
      } else {
        messageSuccess('Thay đổi thông tin tài khoản thành công');
      }
    }
  }

  inputChangeHandler = (event, controlName) => {
    const { controls } = this.state;
    const updateControls = {
      ...controls,
      [controlName]: {
        ...controls[controlName],
        value: event.target.value,
      },
    };
    this.setState({ controls: updateControls });
  }

  emailInputChangeHandle = (event) => {
    this.inputChangeHandler(event, 'email');
  }

  userNameInputChangeHandle = (event) => {
    this.inputChangeHandler(event, 'userName');
  }

  phoneNameInputChangeHandle = (event) => {
    this.inputChangeHandler(event, 'phoneNumber');
  }

  updateChangeInfo = async () => {
    const { controls } = this.state;
    const { updateAccInfo } = this.props;
    const data = {
      email: controls.email.value && controls.email.value.trim(),
      fullName: controls.userName.value && controls.userName.value.trim(),
      phone: controls.phoneNumber.value && controls.phoneNumber.value.trim(),
    };

    this.form.validateAll();

    const errors = this.form.getChildContext()._errors.length;
    if (errors === 0) {
      updateAccInfo(data);
    }
  }


  render() {
    const { controls } = this.state;
    const { accPersonalInfoData, history } = this.props;
    return (
      <Form ref={(data) => { this.form = data; }}>
        <Row className="justify-content-center">
          <div className="col-md-8 col-xs-12">
            <CardGroup>
              <Card>
                <CardHeader>
                  <span className="text-bold">Thông tin tài khoản</span>
                </CardHeader>
                <CardBody>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        Tên đăng nhập
                      </Label>
                    </Col>
                    <Col lg="7">
                      <div>
                        <span>{accPersonalInfoData ? accPersonalInfoData.userName : null}</span>
                      </div>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        Họ và tên
                        {' '}
                        <span className="text-danger">*</span>
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Input
                        value={controls.userName.value}
                        label="Họ và tên"
                        type="text"
                        className="form-control"
                        onChange={this.userNameInputChangeHandle}
                        maxLength={200}
                        validations={[
                          checkRequiredInput,
                        ]}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        Email
                        {' '}
                        <span className="text-danger">*</span>
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Input
                        value={controls.email.value}
                        label="Email"
                        type="text"
                        className="form-control"
                        onChange={this.emailInputChangeHandle}
                        maxLength={200}
                        validations={[
                          checkRequiredInput,
                          checkEmailFormat,
                        ]}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        Số điện thoại
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Input
                        value={controls.phoneNumber.value}
                        label="Số điện thoại"
                        type="text"
                        className="form-control"
                        onChange={this.phoneNameInputChangeHandle}
                        maxLength={200}
                        validations={[
                          checkPhoneNumber,
                        ]}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        Mật khẩu
                      </Label>
                    </Col>
                    <Col lg="7">
                      **************
                      <Link to="/system/user/changePassword" className="pl-2">Đổi mật khẩu</Link>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        Phân quyền
                      </Label>
                    </Col>
                    <Col lg="7">
                      <div>
                        <span>{accPersonalInfoData ? accPersonalInfoData.roleName : null}</span>
                      </div>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        Trạng thái
                      </Label>
                    </Col>
                    <Col lg="7">
                      <div>
                      <span>
                        {accPersonalInfoData
                          ? renderUIStatusAuthen(
                            accPersonalInfoData && accPersonalInfoData.status
                          ) : null}
                      </span>
                      </div>
                    </Col>
                  </FormGroup>
                  <Col xs="12" style={{ textAlign: 'center' }}>
                    <Button
                      color="primary"
                      className="px-4"
                      onClick={this.updateChangeInfo}
                      style={{ marginRight: '20px' }}
                    >
                      Cập nhật

                    </Button>
                    <Button
                      color="secondary"
                      className="px-4"
                      onClick={() => history.push('/management-transaction/list')}
                    >
                      Bỏ qua
                    </Button>
                  </Col>
                </CardBody>
              </Card>
            </CardGroup>
          </div>
        </Row>
      </Form>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  accPersonalInfoData: state.accPersonalInfo.accPersonalInfoData,
  responseUpdateAcc: state.accPersonalInfo.responseUpdateAcc,
});

const mapDispatchToProps = (dispatch) => ({
  accPersonalInfo: (data) => dispatch(getAccPersonalInfo()),
  updateAccInfo: (data) => dispatch(updateAccInfo(data)),
});


personalInfo.propTypes = {
  accPersonalInfo: PropTypes.func,
  accPersonalInfoData: PropTypes.object,
  updateAccInfo: PropTypes.func,
  responseUpdateAcc: PropTypes.object,
};

personalInfo.defaultProps = {
  accPersonalInfo: () => {},
  accPersonalInfoData: null,
  updateAccInfo: () => {},
  responseUpdateAcc: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(personalInfo));
