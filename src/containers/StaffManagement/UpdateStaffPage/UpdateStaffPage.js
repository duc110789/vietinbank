/* eslint-disable */
import React from 'react';
import Select from 'react-select';
import {Button, Card, CardBody, Col, Collapse, FormGroup, Label, Row,} from 'reactstrap';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getInfoStaff, updateInfoStaff} from '../../../store/actions/StaffManagementAction/StaffManagementUpdateAction';
import {convertDepartmentCode} from '../../../utils/commonFunction';
import {messageSuccess} from "../../../utils";
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import {
  checkContainSpecialCharacters,
  checkEmailFormat,
  checkLength10To13,
  checkLength6To80,
  checkPhoneNumber,
  checkRequiredInput,
  checkRequiredSelect,
} from "../../../components/Input/validation";


class UpdateStaffPage extends React.Component {
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
      arrayDepartment: JSON.parse(localStorage.getItem('LIST_BRANCH_BANK')),
      createdDate: '',
      modifyDate: '',
    };
    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    const { getInfoStaff } = this.props;
    const codeStaff = localStorage.getItem('STAFF_USER');
    getInfoStaff(codeStaff);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { isGetInfoStaffSuccess, isUpdateInfoStaffSuccess, history } = this.props;
    const { arrayDepartment } = this.state;
    if( isGetInfoStaffSuccess !== prevProps.isGetInfoStaffSuccess ) {
      this.setState({
        ...this.state,
        data: {
          staffCode: isGetInfoStaffSuccess.staffCode,
          fullName: isGetInfoStaffSuccess.fullName,
          email: isGetInfoStaffSuccess.email,
          mobile: isGetInfoStaffSuccess.mobile,
          departCode: convertDepartmentCode(isGetInfoStaffSuccess.departCode, arrayDepartment),
        },
        createdDate: isGetInfoStaffSuccess.createdDate,
        modifyDate: isGetInfoStaffSuccess.modifyDate,
      })
    }
    if( isUpdateInfoStaffSuccess !== prevProps.isUpdateInfoStaffSuccess) {
      messageSuccess('Cập nhật thông tin Nhân viên thành công');
      history.push('/system/staff/list');
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
        mobile: e.target.value,
      }
    })
  }

  onChangeDepartmentCode = (event) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        departCode: event,
      }
    })
  };

  updateInfo = () => {
    const { data } = this.state;
    const { updateInfoStaff } = this.props;

    this.setState({
      isValidateSelect: true,
    });

    this.form.validateAll();

    const errors = this.form.getChildContext()._errors.length;

    if (errors === 0 && data.departCode !== '') {
      updateInfoStaff({
        ...data,
        mobile: data.mobile || '',
        departCode: data.departCode ? data.departCode.value : ''
      });
    }
  }

  goBack(){
    this.props.history.goBack();
  }

  render() {
    const { arrayDepartment, data, createdDate, modifyDate, isValidateSelect } = this.state;
    const formatArrayDepartment = arrayDepartment.map((item) => ({value: item.departmentCode, label: `${item.departmentName}`}))

    return (
      <Form ref={(updateInfoStaff) => { this.form = updateInfoStaff; }}>
        <Row>
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
                          Mã nhân viên
                        </Label>
                      </Col>
                      <Col lg="7">
                        <span>{data.staffCode}</span>
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
                          value={data.fullName}
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
                          value={data.email}
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
                          value={data.mobile}
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
                          value={data.departCode}
                          placeHolder="Chọn"
                          options={formatArrayDepartment}
                          onChange={this.onChangeDepartmentCode}
                        />
                        {isValidateSelect ? checkRequiredSelect(data.departCode, 'Chi nhánh') : ''}
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Col lg="5">
                        <Label>
                          Ngày tạo
                        </Label>
                      </Col>
                      <Col lg="7">
                        <div><span>{createdDate}</span></div>
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
                        onClick={this.updateInfo}
                        style={{marginRight: '20px'}}
                      >
                        Cập nhật
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
  isGetInfoStaffSuccess: state.StaffManagementUpdate.isGetInfoStaffSuccess,
  isUpdateInfoStaffSuccess: state.StaffManagementUpdate.isUpdateInfoStaffSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  getInfoStaff: (data) => dispatch(getInfoStaff(data)),
  updateInfoStaff: (data) => dispatch(updateInfoStaff(data)),
});


UpdateStaffPage.propTypes = {
  getInfoStaff: PropTypes.func,
  isGetInfoStaffSuccess: PropTypes.object,
  updateInfoStaff: PropTypes.func,
  isUpdateInfoStaffSuccess: PropTypes.object,
};

UpdateStaffPage.defaultProps = {
  getInfoStaff: () => {},
  isGetInfoStaffSuccess: null,
  updateInfoStaff: null,
  isUpdateInfoStaffSuccess: null,
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UpdateStaffPage));
