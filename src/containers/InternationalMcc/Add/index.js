import React from 'react';
import {Button, Card, CardBody, Col, Collapse, FormGroup, Label, Row,} from 'reactstrap';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Textarea from 'react-validation/build/textarea';
import {addInternationalMcc} from '../../../store/actions/system/internationalMcc';
import {
  checkLength3To50,
  checkLength4To50,
  checkLength6To150,
  checkRequiredInput,
} from '../../../components/Input/validation';
import {messageError, messageSuccess} from '../../../utils';

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        typeCode: '',
        brandName: '',
        description: '',
      },
    };
    this.goBack = this.goBack.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { responseAddMcc, history } = this.props;
    if (responseAddMcc !== prevProps.responseAddMcc) {
      if (responseAddMcc.code !== '00') {
        if (responseAddMcc.code === '79') {
          messageError('Có lỗi trong quá trình Thêm mới');
        } else {
          messageError(responseAddMcc.description);
        }
      } else {
        messageSuccess('Thêm mới MCC quốc tế thành công');
        history.push('/system/international-mcc/list');
      }
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

  addNewInternationalMcc = () => {
    const { data } = this.state;
    const { addInternationalMcc } = this.props;
    this.form.validateAll();
    const errors = this.form.getChildContext()._errors.length;
    if (errors === 0) {
      addInternationalMcc(data);
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
              <span className="text-bold">Thêm mới Mcc Quốc tế</span>
              <div className="widget-toolbar" />
            </div>
            <Collapse isOpen className="show-information">
              <Form className="widget-box transparent" ref={(addMccInternational) => { this.form = addMccInternational; }}>
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
                          value=""
                          label="Mã Mcc quốc tế"
                          type="text"
                          className="form-control"
                          name="code"
                          onChange={this.onChangeMerchantCode}
                          validations={[
                            checkRequiredInput,
                            checkLength4To50,
                          ]}
                          maxLength="50"
                          minLength="4"
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
                          maxLength="50"
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
                        onClick={this.addNewInternationalMcc}
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
  responseAddMcc: state.internationalMccManager.responseAddMcc,
});

const mapDispatchToProps = (dispatch) => ({
  addInternationalMcc: (data) => dispatch(addInternationalMcc(data)),
});

Add.propTypes = {
  addInternationalMcc: PropTypes.func,
  history: PropTypes.object,
  responseAddMcc: PropTypes.object,
};

Add.defaultProps = {
  addInternationalMcc: () => {},
  history: {},
  responseAddMcc: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Add));
