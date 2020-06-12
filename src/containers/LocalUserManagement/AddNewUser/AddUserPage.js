/* eslint-disable */
import React from 'react';
import Select from 'react-select';
import {Button, Card, CardBody, Col, Collapse, FormGroup, Label} from 'reactstrap';
import Input from 'react-validation/build/input';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Form from 'react-validation/build/form';
import MultiSelect from '../../../components/MutilSelect/MultiSelect';
import {status} from '../commonConstants';
import {
  animatedComponents,
  MultiValue,
  Option,
  ValueContainer
} from "../../../components/MutilSelect/CheckBoxMultiSelect";
import {addNewUser} from '../../../store/actions/LocalUserManagementAction/AddPageAction';
import generator from 'generate-password';
import {
  checkEmailFormat,
  checkLength150,
  checkLength3To14,
  checkLength3To150,
  checkLength6To50,
  checkPasswordFormat,
  checkPhoneNumber,
  checkRequiredInput,
  checkRequiredSelect,
  isUserName,
} from "../../../components/Input/validation";
import {messageError, messageSuccess} from "../../../utils";
import {formatPhoneNumber, isNumberAndChar} from "../../../utils/validation";

class AddUserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        username: '',
        fullName: '',
        email: '',
        phone: '',
        password: '',
        changePassword: 0,
        departmentCode: '',
        departmentCodeRoles: [],
        status: 1,
        roleId: 1,
      },
      arrayDepartment: JSON.parse(localStorage.getItem('LIST_BRANCH_BANK_BY_USER')),
      arrayRoles: JSON.parse(localStorage.getItem('ALL_ROLES')),
      errorMessRepeatPassword: '',
      repeatPassword: '',
      isValidateSelect: false,
      isValidConfirmPassword: false,
    };
    this.goBack = this.goBack.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {responseAddDataSuccess, history} = this.props;
    if (responseAddDataSuccess !== prevProps.responseAddDataSuccess) {
      if (responseAddDataSuccess.code === '00') {
        messageSuccess('Thêm mới thành công');
        history.push('/system/user/list');
      } else {
        messageError( responseAddDataSuccess.description);
      }
    }
  }

  onChangeUserName = (e) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        username: e.target.value,
      }
    })
  }

  onChangeFullName = (e) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        fullName: e.target.value,
      }
    })
  }

  onChangeEmail = (e) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        email: e.target.value,
      }
    })
  };

  onChangePhone = (e) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        phone: e.target.value,
      }
    })
  }

  onChangePassword = (e) => {
    const { repeatPassword } = this.state;

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

    this.setState({
      data: {
        ...this.state.data,
        password: e.target.value,
      }
    })
  }

  onChangeRepeatPassword = (e) => {
    const { data } = this.state;

    this.setState({
      ...this.state,
      repeatPassword: e.target.value,
    });

    if (data.password !== e.target.value && e.target.value !== '' && isNumberAndChar(e.target.value)
    && !checkLength6To50(e.target.value, 'text')) {
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

  onChangeGroupRule = (event) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        roleId: event.value,
      }
    })
  };

  onChangeDepartmentCode = (event) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        departmentCode: event.value,
      }
    })
  };

  onChangeDepartmentRole = (event) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        departmentCodeRoles: event ? event : [],
      }
    })
  };

  onHandleCheckBox = () => {
    const {data} = this.state;
    data.changePassword === 0 ? this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        changePassword: 1
      }
    }) : this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        changePassword: 0
      }
    })
  };

  addNewAcc = () => {
    const { data, isValidConfirmPassword } = this.state;
    const { addNewUser } = this.props;

    this.setState({
      isValidateSelect: true,
    });

    this.form.validateAll();

    const isInvalidNumberPhone = data.phone !== '' ? formatPhoneNumber(data.phone) : true;

    const errors = this.form.getChildContext()._errors.length;

    if (errors === 0 && data.departmentCode && isValidConfirmPassword && isInvalidNumberPhone && data.departmentCodeRoles.length > 0) {
      const getValueFromEvent = data.departmentCodeRoles.map((item) => (item.value));
      const sendData = {
        ...data,
        departmentCodeRoles: getValueFromEvent,
      };
      addNewUser(sendData);
    }
  };

  randomGeneratePassword = () => {
    const randomPassword = generator.generate({
      length: 10,
      numbers: true,
    })
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        password: randomPassword,
      },
    }, () => {
      this.form.validate('password');
    });
  }

  onChangeStatus = (e) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        status: e.value,
      }
    })
  };

  goBack() {
    this.props.history.goBack();
  }

  render() {
    const {
      arrayDepartment, arrayRoles, data, repeatPassword, isValidateSelect, errorMessRepeatPassword
    } = this.state;
    const arrayStateGroupRole = arrayRoles.map((item) => ({value: item.roleId, label: item.name}));
    const arrayStateBranchBankByUser = arrayDepartment.map((item) => ({
      value: item.departmentCode,
      label: item.departmentName
    }));
    return (
      <Form ref={(addNewUser) => { this.form = addNewUser; }}>
        <div className="col-md-12">
          <div className="widget-box transparent">
            <div
              className="widget-header widget-header-flat"
              role="presentation"
              onClick={this.handOpenInfo}
              onKeyPress={this.handOpenInfo}
            >
              <span className="text-bold">Thêm mới tài khoản</span>
              <div className="widget-toolbar"/>
            </div>
            <Collapse isOpen className="show-information">
              <Card>
                <CardBody>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        Tên đăng nhập
                        {' '}<span className="text-danger">*</span>
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Input
                        value=""
                        label="Tên đăng nhập"
                        type="text"
                        className="form-control"
                        name="username"
                        onChange={this.onChangeUserName}
                        validations={[
                          checkRequiredInput,
                          checkLength3To150,
                          isUserName,
                        ]}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        Họ và tên
                        {' '}<span className="text-danger">*</span>
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Input
                        label="Họ và tên"
                        type="text"
                        className="form-control"
                        name="code"
                        onChange={this.onChangeFullName}
                        validations={[
                          checkRequiredInput,
                          checkLength3To150,
                        ]}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        Email
                        {' '}<span className="text-danger">*</span>
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Input
                        type="text"
                        className="form-control"
                        name="code"
                        label="Email"
                        onChange={this.onChangeEmail}
                        validations={[
                          checkRequiredInput,
                          checkLength150,
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
                        type="text"
                        label="Số điện thoại"
                        className="form-control"
                        onChange={this.onChangePhone}
                        validations={[
                          checkLength3To14,
                          checkPhoneNumber,
                        ]}
                      />
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
                        onChange={this.onChangePassword}
                        type="text"
                        className="form-control"
                        name="password"
                        label="Mật khẩu"
                        value={data.password}
                        validations={[
                          checkRequiredInput,
                          checkLength6To50,
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
                        type="text"
                        label="Xác nhận mật khẩu"
                        className="form-control"
                        onChange={this.onChangeRepeatPassword}
                        validations={[
                          checkRequiredInput,
                          checkLength6To50,
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
                    <Col lg="5">
                      <Label>
                        Chi nhánh trực thuộc
                        {' '}<span className="text-danger">*</span>
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Select
                        placeholder="Chọn"
                        options={arrayStateBranchBankByUser}
                        onChange={this.onChangeDepartmentCode}
                      />
                      {isValidateSelect ? checkRequiredSelect(data.departmentCode, 'Chi nhánh trực thuộc') : ''}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        Trạng thái
                        {' '}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Select
                        onChange={this.onChangeStatus}
                        options={status}
                        placeholder="Hoạt động"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        Phân quyền
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Select
                        options={arrayStateGroupRole}
                        onChange={this.onChangeGroupRule}
                        placeholder="Admin"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5"/>
                    <Col lg="7">
                      <Input className="float-left mt-1" type="checkbox" onChange={this.onHandleCheckBox}/>
                      {' '}
                      {' '}
                      <span className="float-left ml-2">Đổi mật khẩu lần đầu tiên</span>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        Chi nhánh quản lý
                        {' '}<span className="text-danger">*</span>
                      </Label>
                    </Col>
                    <Col lg="7">
                      <div
                        data-toggle="popover"
                        data-trigger="focus"
                        data-content="Please select account(s)"
                      >
                        <MultiSelect
                          placeholder="Chọn"
                          options={arrayStateBranchBankByUser}
                          isMulti
                          closeMenuOnSelect={false}
                          hideSelectedOptions={false}
                          components={{
                            Option,
                            MultiValue,
                            ValueContainer,
                            animatedComponents,
                          }}
                          allowSelectAll
                          onChange={this.onChangeDepartmentRole}
                          value={data.departmentCodeRoles}
                        />
                      </div>
                      {isValidateSelect ? checkRequiredSelect(data.departmentCodeRoles.length, 'Chi nhánh quản lý') : ''}
                    </Col>
                  </FormGroup>

                  <Col xs="12" style={{textAlign: 'center'}}>
                    <Button
                      color="primary"
                      className="px-4"
                      onClick={this.addNewAcc}
                      style={{marginRight: '20px'}}
                    >
                      Thêm mới
                    </Button>
                    <Button color="secondary" className="px-4" onClick={this.goBack}>Bỏ qua</Button>
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
  responseAddDataSuccess: state.AddPage.responseAddDataSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  addNewUser: (data) => dispatch(addNewUser(data)),
});

AddUserPage.propTypes = {
  addNewUser: PropTypes.func,
  responseAddDataSuccess: PropTypes.object,

};

AddUserPage.defaultProps = {
  addNewUser: () => {
  },
  responseAddDataSuccess: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddUserPage));
