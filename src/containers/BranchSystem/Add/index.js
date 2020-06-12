import React from 'react';
import {Button, Card, CardBody, Col, Collapse, FormGroup, Label, Row,} from 'reactstrap';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Textarea from 'react-validation/build/textarea';
import {addDepartment} from '../../../store/actions/system/department';
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

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        departCode: '',
        departName: '',
        description: '',
      },
    };
    this.goBack = this.goBack.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { responseAddDepartment, history } = this.props;
    if (responseAddDepartment !== prevProps.responseAddDepartment) {
      if (responseAddDepartment.code !== '00') {
        if (responseAddDepartment.code === '79') {
          messageError('Có lỗi trong quá trình Thêm mới');
        } else {
          messageError(responseAddDepartment.description);
        }
      } else {
        messageSuccess('Thêm mới Chi nhánh thành công');
        history.push('/system/branch/list');
      }
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

  addNewDepartment = () => {
    const { data } = this.state;
    const { addDepartment } = this.props;
    this.form.validateAll();
    const errors = this.form.getChildContext()._errors.length;
    if (errors === 0) {
      addDepartment(data);
    }
  };

  goBack() {
    const { history } = this.props;
    history.goBack();
  }

  render() {
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
              <span className="text-bold">Thêm mới chi nhánh</span>
              <div className="widget-toolbar" />
            </div>
            <Collapse isOpen className="show-information">
              <Form className="widget-box transparent" ref={(addDepartment) => { this.form = addDepartment; }}>
                <Card>
                  <CardBody>
                    <FormGroup row>
                      <Col lg="5">
                        <Label>
                          Mã chi nhánh
                          {' '}
                          <span className="text-danger">*</span>
                        </Label>
                      </Col>
                      <Col lg="7">
                        <Input
                          value=""
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
                          maxLength="20"
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
                          maxLength="80"
                          minLength="6"
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
                    <Col xs="12" style={{ textAlign: 'center', margin: '40px 0' }}>
                      <Button
                        color="primary"
                        className="px-4"
                        onClick={this.addNewDepartment}
                        style={{ marginRight: '20px' }}
                      >
                        Thêm mới
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
  responseAddDepartment: state.department.responseAddDepartment,
});

const mapDispatchToProps = (dispatch) => ({
  addDepartment: (data) => dispatch(addDepartment(data)),
});

Add.propTypes = {
  addDepartment: PropTypes.func,
  history: PropTypes.object,
  responseAddDepartment: PropTypes.object,
};

Add.defaultProps = {
  addDepartment: () => {},
  history: {},
  responseAddDepartment: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Add));
