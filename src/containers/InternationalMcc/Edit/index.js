import React from 'react';
import {Button, Card, CardBody, Col, Collapse, FormGroup, Label, Row,} from 'reactstrap';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Textarea from 'react-validation/build/textarea';
import {editInternationalMcc, getInternationalMcc} from '../../../store/actions/system/internationalMcc';
import {
  checkLength3To50,
  checkLength4To50,
  checkLength6To150,
  checkRequiredInput,
} from '../../../components/Input/validation';
import {messageError, messageSuccess} from '../../../utils';

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        typeCode: '',
        brandName: '',
        description: '',
      },
      createDate: '',
      updateDate: '',
    };
    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    const { getInternationalMcc } = this.props;

    if (window.localStorage.ID_MCC_MANAGER) {
      getInternationalMcc({
        typeCode: JSON.parse(window.atob(window.localStorage.getItem('ID_MCC_MANAGER'))),
      });
    }
  }

  static getDerivedStateFromProps(props) {
    const {
      internationalMccDetail,
    } = props;
    return {
      internationalMccDetail,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      responseEditMcc,
      internationalMccDetail,
      history,
    } = this.props;
    if (responseEditMcc !== prevProps.responseEditMcc) {
      if (responseEditMcc.code !== '00') {
        if (responseEditMcc.code === '79') {
          messageError('Có lỗi trong quá trình Thêm mới');
        } else {
          messageError(responseEditMcc.description);
        }
      } else {
        messageSuccess('Cập nhật MCC quốc tế thành công');
        history.push('/system/international-mcc/list');
      }
    }
    if (internationalMccDetail !== prevProps.internationalMccDetail) {
      this.setState({
        ...this.state,
        data: {
          typeCode: internationalMccDetail.data.typeCode,
          brandName: internationalMccDetail.data.brandName,
          description: internationalMccDetail.data.description,
        },
        createDate: internationalMccDetail.data.createdDate,
        updateDate: internationalMccDetail.data.updatedDate,
      });
    }
  }

  onChangeMerchantCode = (e) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        typeCode: e.target.value,
      },
    });
  };

  onChangeMerchantName = (e) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        brandName: e.target.value,
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

  editNewInternationalMcc = () => {
    const { data } = this.state;
    const { editInternationalMcc } = this.props;
    this.form.validateAll();
    const errors = this.form.getChildContext()._errors.length;
    if (errors === 0) {
      editInternationalMcc(data);
    }
  };

  goBack() {
    const { history } = this.props;
    history.goBack();
  }

  render() {
    const { data, createDate, updateDate } = this.state;
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
              <span className="text-bold">Cập nhật Mcc Quốc tế</span>
              <div className="widget-toolbar" />
            </div>
            <Collapse isOpen className="show-information">
              <Form className="widget-box transparent" ref={(editMccInternational) => { this.form = editMccInternational; }}>
                <Card>
                  <CardBody>
                    <FormGroup row>
                      <Col lg="5">
                        <Label>
                          Mã Mcc quốc tế
                          {' '}
                          <span className="text-danger">*</span>
                        </Label>
                      </Col>
                      <Col lg="7">
                        <Input
                          value={data.typeCode}
                          label="Mã Mcc quốc tế"
                          type="text"
                          className="form-control"
                          name="code"
                          onChange={this.onChangeMerchantCode}
                          validations={[
                            checkRequiredInput,
                            checkLength4To50,
                          ]}
                          disabled
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col lg="5">
                        <Label>
                          Tên Mcc quốc tế
                          {' '}
                          <span className="text-danger">*</span>
                        </Label>
                      </Col>
                      <Col lg="7">
                        <Input
                          value={data.brandName}
                          maxLength="50"
                          minLength="3"
                          label="Tên Mcc quốc tế"
                          type="text"
                          className="form-control"
                          name="code"
                          onChange={this.onChangeMerchantName}
                          validations={[
                            checkRequiredInput,
                            checkLength3To50,
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
                        onClick={this.editNewInternationalMcc}
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
  responseEditMcc: state.internationalMccManager.responseEditMcc,
  internationalMccDetail: state.internationalMccManager.internationalMccDetail,
});

const mapDispatchToProps = (dispatch) => ({
  editInternationalMcc: (data) => dispatch(editInternationalMcc(data)),
  getInternationalMcc: (data) => dispatch(getInternationalMcc(data)),
});

Edit.propTypes = {
  editInternationalMcc: PropTypes.func,
  getInternationalMcc: PropTypes.func,
  history: PropTypes.object,
  responseEditMcc: PropTypes.object,
  internationalMccDetail: PropTypes.object,
};

Edit.defaultProps = {
  editInternationalMcc: () => {},
  getInternationalMcc: () => {},
  history: {},
  responseEditMcc: {},
  internationalMccDetail: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Edit));
