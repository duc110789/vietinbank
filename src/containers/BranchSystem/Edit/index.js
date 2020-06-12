import React from 'react';
import {Button, Card, CardBody, Col, Collapse, FormGroup, Label, Row,} from 'reactstrap';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Textarea from 'react-validation/build/textarea';
import {editDepartment, getDepartment} from '../../../store/actions/system/department';
import {
  checkContainSpace,
  checkContainSpecialCharacters,
  checkLength6To150,
  checkLength6To20,
  checkLength6To80,
  checkRequiredInput,
  isValidVietnamese,
} from '../../../components/Input/validation';
import {messageError, messageSuccess} from '../../../utils';

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      data: {
        departId: '',
        departCode: '',
        departName: '',
        description: '',
      },
      createDate: '',
      updateDate: '',
    };
    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    const { getDepartment } = this.props;

    if (window.localStorage.ID_DEPARTMENT_BRANCH) {
      getDepartment({
        departCode: JSON.parse(window.atob(window.localStorage.getItem('ID_DEPARTMENT_BRANCH'))),
      });
    }
  }

  static getDerivedStateFromProps(props) {
    const {
      interiorDepartmentDetail,
    } = props;
    return {
      interiorDepartmentDetail,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      responseEditDepartment,
      interiorDepartmentDetail,
      history,
    } = this.props;
    if (responseEditDepartment !== prevProps.responseEditDepartment) {
      if (responseEditDepartment.code !== '00') {
        if (responseEditDepartment.code === '79') {
          messageError('Có lỗi trong quá trình Thêm mới');
        } else {
          messageError(responseEditDepartment.description);
        }
      } else {
        messageSuccess('Cập nhật thông tin Chi nhánh thành công');
        history.push('/system/branch/list');
      }
    }
    if (interiorDepartmentDetail !== prevProps.interiorDepartmentDetail) {
      this.setState({
        ...this.state,
        id: interiorDepartmentDetail.data && interiorDepartmentDetail.data.departId,
        data: {
          departId: interiorDepartmentDetail.data && interiorDepartmentDetail.data.departId,
          departCode: interiorDepartmentDetail.data && interiorDepartmentDetail.data.departCode,
          departName: interiorDepartmentDetail.data && interiorDepartmentDetail.data.departName,
          description: interiorDepartmentDetail.data && interiorDepartmentDetail.data.description,
        },
        createDate: interiorDepartmentDetail.data && interiorDepartmentDetail.data.createdDate,
        updateDate: interiorDepartmentDetail.data && interiorDepartmentDetail.data.updatedDate,
      });
    }
  }

  onChangeDepartmentCode = (e) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        departCode: e.target.value,
      },
    });
  };

  onChangeDepartmentName = (e) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        departName: e.target.value,
      },
    });
  };

  onChangeDescription = (e) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        description: e.target.value,
      },
    });
  };

  editDepartment = () => {
    const { data } = this.state;
    const { editDepartment } = this.props;
    this.form.validateAll();
    const errors = this.form.getChildContext()._errors.length;
    if (errors === 0) {
      editDepartment(data);
    }
  };

  goBack() {
    const { history } = this.props;
    history.goBack();
  }

  render() {
    const {
      id, data, createDate, updateDate,
    } = this.state;
    return (
      <Row>
        <div className="col-md-12">
          <div className="widget-box transparent">
            <div
              className="widget-header widget-header-flat"
              role="presentation"
              onClick={this.handOpenInfo}
              onKeyPress={this.handOpenInfo}
            >
              <span className="text-bold">Cập nhật chi nhánh</span>
              <div className="widget-toolbar" />
            </div>
            <Collapse isOpen className="show-information">
              <Form className="widget-box transparent" ref={(editDepartment) => { this.form = editDepartment; }}>
                <Card>
                  <CardBody>
                    <FormGroup row>
                      <Col lg="5">
                        <Label>
                          #ID
                        </Label>
                      </Col>
                      <Col lg="7">
                        <Label>
                          {id}
                        </Label>
                      </Col>
                      <Col lg="5">
                        <Label>
                          Mã chi nhánh
                          {' '}
                          <span className="text-danger">*</span>
                        </Label>
                      </Col>
                      <Col lg="7">
                        <Input
                          value={data.departCode}
                          label="Mã chi nhánh"
                          type="text"
                          className="form-control"
                          name="code"
                          onChange={this.onChangeDepartmentCode}
                          validations={[
                            checkRequiredInput,
                            checkLength6To20,
                            checkContainSpecialCharacters,
                            checkContainSpace,
                            isValidVietnamese,
                          ]}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col lg="5">
                        <Label>
                          Tên chi nhánh
                          {' '}
                          <span className="text-danger">*</span>
                        </Label>
                      </Col>
                      <Col lg="7">
                        <Input
                          value={data.departName}
                          maxLength="50"
                          minLength="3"
                          label="Tên chi nhánh"
                          type="text"
                          className="form-control"
                          name="code"
                          onChange={this.onChangeDepartmentName}
                          validations={[
                            checkRequiredInput,
                            checkLength6To80,
                          ]}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col lg="5">
                        <Label>
                          Mô tả:
                        </Label>
                      </Col>
                      <Col lg="7">
                        <Textarea
                          value={data.description}
                          maxLength="150"
                          minLength="6"
                          label="Mô tả"
                          type="text"
                          className="form-control"
                          name="code"
                          onChange={this.onChangeDescription}
                          validations={[
                            checkLength6To150,
                          ]}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col lg="5">
                        <Label>
                          Ngày tạo:
                        </Label>
                      </Col>
                      <Col lg="7">
                        <Label>{createDate}</Label>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col lg="5">
                        <Label>
                          Ngày sửa:
                        </Label>
                      </Col>
                      <Col lg="7">
                        <Label>{updateDate}</Label>
                      </Col>
                    </FormGroup>
                    <Col xs="12" style={{ textAlign: 'center', margin: '40px 0' }}>
                      <Button
                        color="primary"
                        className="px-4"
                        onClick={this.editDepartment}
                        style={{ marginRight: '20px' }}
                      >
                        Cập nhật
                      </Button>
                      <Button color="secondary" className="px-4" onClick={this.goBack}>Hủy</Button>
                    </Col>
                  </CardBody>
                </Card>
              </Form>
            </Collapse>
          </div>
        </div>
      </Row>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  responseEditDepartment: state.department.responseEditDepartment,
  interiorDepartmentDetail: state.department.interiorDepartmentDetail,
});

const mapDispatchToProps = (dispatch) => ({
  editDepartment: (data) => dispatch(editDepartment(data)),
  getDepartment: (data) => dispatch(getDepartment(data)),
});

Edit.propTypes = {
  editDepartment: PropTypes.func,
  getDepartment: PropTypes.func,
  history: PropTypes.object,
  responseEditDepartment: PropTypes.object,
  interiorDepartmentDetail: PropTypes.object,
};

Edit.defaultProps = {
  editDepartment: () => {},
  getDepartment: () => {},
  history: {},
  responseEditDepartment: {},
  interiorDepartmentDetail: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Edit));
