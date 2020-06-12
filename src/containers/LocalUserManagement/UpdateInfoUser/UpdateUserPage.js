/* eslint-disable */
import React from 'react';
import Select from 'react-select';
import {Button, Card, CardBody, Col, Collapse, FormGroup, Label} from 'reactstrap';
import PropTypes from 'prop-types';
import Input from 'react-validation/build/input';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import MultiSelect from '../../../components/MutilSelect/MultiSelect';
import {
  animatedComponents,
  MultiValue,
  Option,
  ValueContainer,
} from '../../../components/MutilSelect/CheckBoxMultiSelect';
import {
  getDataLocalUserById,
  updateNewAccount
} from '../../../store/actions/LocalUserManagementAction/UpdatePageAction';
import {convertDepartmentCode, convertDepartmentCodeRoles, convertRoles} from '../../../utils/commonFunction';
import {messageSuccess} from "../../../utils";
import {
  checkEmailFormat,
  checkLength150,
  checkLength3To14,
  checkLength3To150,
  checkPhoneNumber,
  checkRequiredInput,
  checkRequiredSelect,
} from "../../../components/Input/validation";
import Form from 'react-validation/build/form';
import {formatPhoneNumber} from "../../../utils/validation";

class UpdateUserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        roleId: '',
        username: '',
        fullName: '',
        email: '',
        phone: '',
        departmentCode: '',
        departmentCodeRoles: '',
        isValidateSelect: false,
      },
      arrayDepartment: JSON.parse(localStorage.getItem('LIST_BRANCH_BANK_BY_USER')),
      arrayRoles: JSON.parse(localStorage.getItem('ALL_ROLES')),
      createDate: '',
      modifyDate: '',
    };
    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    const {getDataLocalUserById} = this.props;
    const idUser = localStorage.getItem('LOCAL_USER_ID');
    getDataLocalUserById(idUser);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { dataLocalUser, isUpdated, history } = this.props;
    const { arrayDepartment, arrayRoles } = this.state;
    convertDepartmentCode(dataLocalUser && dataLocalUser.departmentCode, arrayDepartment);
    convertRoles(dataLocalUser && dataLocalUser.roleId, arrayRoles);
    convertDepartmentCodeRoles(dataLocalUser && dataLocalUser.departmentCodeRoles, arrayDepartment);
    if(dataLocalUser !== prevProps.dataLocalUser) {
      this.setState({
        ...this.state,
        data: {
          roleId: convertRoles(dataLocalUser && dataLocalUser.roleId, arrayRoles),
          username: dataLocalUser && dataLocalUser.username,
          fullName: dataLocalUser && dataLocalUser.fullName,
          email: dataLocalUser && dataLocalUser.email,
          phone: dataLocalUser && dataLocalUser.phone || '',
          departmentCode:  convertDepartmentCode(dataLocalUser && dataLocalUser.departmentCode, arrayDepartment),
          departmentCodeRoles: convertDepartmentCodeRoles(dataLocalUser && dataLocalUser.departmentCodeRoles, arrayDepartment),
          status: dataLocalUser && dataLocalUser.status,
        },
        createDate: dataLocalUser && dataLocalUser.createDate,
        modifyDate: dataLocalUser && dataLocalUser.modifyDate,
      })
    }
    if (isUpdated !== prevProps.isUpdated ) {
      messageSuccess('Cập nhật thành công');
      history.push('/system/user/list');
    }
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
  }

  onChangePhone = (e) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        phone: e.target.value,
      }
    })
  }

  onChangeGroupRule = (event) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        roleId: event,
      }
    })
  };

  onChangeDepartmentCode = (event) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        departmentCode: event,
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

  addNewAccountInfo = () => {
    const { data } = this.state;
    const { updateNewAccount } = this.props;

    this.setState({
      isValidateSelect: true,
    });

    this.form.validateAll();

    const errors = this.form.getChildContext()._errors.length;

    const isInvalidNumberPhone = data.phone !== '' ? formatPhoneNumber(data.phone) : true;

    if (errors === 0 && isInvalidNumberPhone
      && data.departmentCodeRoles && data.departmentCodeRoles.length > 0) {
      const valueDepartmentCode = data.departmentCode.value;

      const filterValueDepartmentRules = data.departmentCodeRoles.map((item) => (item.value));

      const removedValueAllFromRules = filterValueDepartmentRules.filter(item => {
        return item !== '*';
      });

      const valueRoleId = data.roleId.value;

      const sentData = {
        ...data,
        roleId: valueRoleId,
        departmentCode: valueDepartmentCode,
        departmentCodeRoles: removedValueAllFromRules,
      }
      updateNewAccount(sentData);
    }
  }
  goBack(){
    this.props.history.goBack();
  }

  render() {
    const {arrayDepartment, data, arrayRoles, createDate, modifyDate, isValidateSelect} = this.state;
    const arrayStateBranchBankByUser = arrayDepartment.map((item) => ({
      value: item.departmentCode,
      label: item.departmentName,
    }));
    const arrayStateGroupRole = arrayRoles.map((item) => ({value: item.roleId, label: item.name}));

    return (
      <Form ref={(updateNewAccount) => { this.form = updateNewAccount; }}>
        <div className="col-md-12">
          <div className="widget-box transparent">
            <div
              className="widget-header widget-header-flat"
              role="presentation"
              onClick={this.handOpenInfo}
              onKeyPress={this.handOpenInfo}
            >
              <span className="text-bold">Cập nhật thông tin tài khoản</span>
              <div className="widget-toolbar"/>
            </div>
            <Collapse isOpen className="show-information">
              <Card>
                <CardBody>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        Tên đăng nhập
                        {' '}<span style={{color: 'red'}}>
                          *
                        </span>
                      </Label>
                    </Col>
                    <Col lg="7">
                      <div><span>{data.username}</span></div>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        Họ và tên
                        {' '}<span style={{color: 'red'}}>
                          *
                        </span>
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
                        value={data.fullName}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        Email:
                        {' '}<span style={{color: 'red'}}>
                          *
                        </span>
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
                        value={data.email}
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
                        value={data.phone}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        Chi nhánh trực thuộc
                        {' '}<span style={{color: 'red'}}>
                          *
                        </span>
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Select
                        options={arrayStateBranchBankByUser}
                        onChange={this.onChangeDepartmentCode}
                        value={data.departmentCode}
                      />
                    </Col>
                    {isValidateSelect ? checkRequiredSelect(data.departmentCode, 'Chi nhánh trực thuộc') : ''}
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        Phân quyền
                        {' '}<span style={{color: 'red'}}>
                          *
                        </span>
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Select
                        options={arrayStateGroupRole}
                        onChange={this.onChangeGroupRule}
                        value={data.roleId}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        Chi nhánh quản lý
                        {' '}<span style={{color: 'red'}}>
                          *
                        </span>
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
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        Ngày tạo
                      </Label>
                    </Col>
                    <Col lg="7">
                      <div><span>{createDate}</span></div>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        Ngày cập nhật
                      </Label>
                    </Col>
                    <Col lg="7">
                      <div><span>{modifyDate}</span></div>
                    </Col>
                  </FormGroup>


                  <Col xs="12" style={{textAlign: 'center'}}>
                    <Button
                      color="primary"
                      className="px-4"
                      onClick={this.addNewAccountInfo}
                      style={{marginRight: '20px'}}
                    >
                      Cập Nhật
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
  dataLocalUser: state.UpdatePage.dataLocalUser,
  isUpdated: state.UpdatePage.isUpdated,
});

const mapDispatchToProps = (dispatch) => ({
  getDataLocalUserById: (data) => dispatch(getDataLocalUserById(data)),
  updateNewAccount: (data) => dispatch(updateNewAccount(data))
});

UpdateUserPage.propTypes = {
  getDataLocalUserById: PropTypes.func,
  dataLocalUser: PropTypes.object,
  updateNewAccount: PropTypes.func,
  isUpdated: PropTypes.bool,
};

UpdateUserPage.defaultProps = {
  getDataLocalUserById: () => {
  },
  dataLocalUser: null,
  updateNewAccount: () => {},
  isUpdated: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UpdateUserPage));
