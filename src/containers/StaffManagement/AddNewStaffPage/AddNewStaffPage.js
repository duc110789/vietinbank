/* eslint-disable */
import React from 'react';
import Select from 'react-select';
import {Button, Card, CardBody, Col, Collapse, FormGroup, Label, Row,} from 'reactstrap';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {addNewStaff} from '../../../store/actions/StaffManagementAction/StaffManagementAddAction';
import {messageSuccess} from "../../../utils";
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import {
  checkContainSpecialCharacters,
  checkEmailFormat,
  checkLength10To13,
  checkLength6To20,
  checkLength6To80,
  checkPhoneNumber,
  checkRequiredInput,
  checkRequiredSelect,
  checkStaffCode,
} from "../../../components/Input/validation";

class AddNewStaffPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        staffCode: '',
        fullName: '',
        email: '',
        mobile: '',
        departCode: '',
      },
      isValidateSelect: false,
    };
    this.goBack = this.goBack.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { isAddStaffSuccess, history} = this.props;
    if( isAddStaffSuccess !== prevProps.isAddStaffSuccess) {
      messageSuccess('Thêm mới Nhân viên thành công');
      history.push('/system/staff/list');
    }
  }

  onChangeStaffCode = (e) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        staffCode: e.target.value,
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
  }

  onChangePhone = (e) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        mobile: e.target.value,
      }
    })
  }


  onChangeDepartmentCode = (event) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        departCode: event.value,
      }
    })
  };



  addNewAcc = () => {
    const { data } = this.state;
    const { addNewStaff } = this.props;

    this.setState({
      isValidateSelect: true,
    });

    this.form.validateAll();

    const errors = this.form.getChildContext()._errors.length;
    if (errors === 0 && data.departCode !== '') {
      addNewStaff(data);
    }
  }

  goBack(){
    this.props.history.goBack();
  }

  render() {
    const { isValidateSelect, data } = this.state;
    const arrayDepartment = JSON.parse(localStorage.getItem('LIST_BRANCH_BANK'));
    const arrayShowDepartment = arrayDepartment.map((item) => ({ value: item.departmentCode, label: item.departmentName}))
    return (
      <Form ref={(addNewStaff) => { this.form = addNewStaff; }}>
        <Row>
          <div className="col-md-12">
            <div className="widget-box transparent">
              <div
                className="widget-header widget-header-flat"
                role="presentation"
                onClick={this.handOpenInfo}
                onKeyPress={this.handOpenInfo}
              >
                <span className="text-bold">Thêm mới nhân viên</span>
                <div className="widget-toolbar" />
              </div>
              <Collapse isOpen className="show-information">
                <Card>
                  <CardBody>
                    <FormGroup row>
                      <Col lg="5">
                        <Label>
                          Mã nhân viên
                          {' '}<span className="text-danger">*</span>
                        </Label>
                      </Col>
                      <Col lg="7">
                        <Input
                          value=""
                          label="Mã nhân viên"
                          type="text"
                          className="form-control"
                          name="code"
                          onChange={this.onChangeStaffCode}
                          validations={[
                            checkRequiredInput,
                            checkLength6To20,
                            checkStaffCode,
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
                          value=""
                          label="Họ và tên"
                          type="text"
                          className="form-control"
                          name="code"
                          onChange={this.onChangeFullName}
                          validations={[
                            checkRequiredInput,
                            checkLength6To80,
                            checkContainSpecialCharacters,
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
                          value=""
                          label="Email"
                          type="text"
                          className="form-control"
                          name="code"
                          onChange={this.onChangeEmail}
                          validations={[
                            checkRequiredInput,
                            checkLength6To80,
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
                          value=""
                          label="Số điện thoại"
                          type="text"
                          className="form-control"
                          name="code"
                          onChange={this.onChangePhone}
                          validations={[
                            checkLength10To13,
                            checkPhoneNumber,
                          ]}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col lg="5">
                        <Label>
                          Chi nhánh
                          {' '}<span className="text-danger">*</span>
                        </Label>
                      </Col>
                      <Col lg="7">
                        <Select
                          placeholder="Chọn"
                          options={arrayShowDepartment}
                          onChange={this.onChangeDepartmentCode}
                        />
                        {isValidateSelect ? checkRequiredSelect(data.departCode.length, 'Chi nhánh') : ''}
                      </Col>
                    </FormGroup>
                    <Col xs="12" style={{ textAlign: 'center' }}>
                      <Button
                        color="primary"
                        className="px-4"
                        onClick={this.addNewAcc}
                        style={{ marginRight: '20px' }}
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
        </Row>
      </Form>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  isAddStaffSuccess: state.StaffManagementAdd.isAddStaffSuccess
});

const mapDispatchToProps = (dispatch) => ({
  addNewStaff: (data) => dispatch(addNewStaff(data))
});

AddNewStaffPage.propTypes = {
  addNewStaff: PropTypes.func,
  isAddStaffSuccess: PropTypes.object,
};

AddNewStaffPage.defaultProps = {
addNewStaff: () => {},
  isAddStaffSuccess: null
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddNewStaffPage));
