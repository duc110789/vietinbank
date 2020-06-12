import React from 'react';
import {Button, Card, CardBody, Col, Collapse, FormGroup, Label, Row,} from 'reactstrap';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Textarea from 'react-validation/build/textarea';
import {addInteriorMcc} from '../../../store/actions/system/interiorMcc';
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
        messageSuccess('Thêm mới MCC nội địa thành công');
        history.push('/system/interior-mcc/list');
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

  addNewInteriorMcc = () => {
    const { data } = this.state;
    const { addInteriorMcc } = this.props;
    this.form.validateAll();
    const errors = this.form.getChildContext()._errors.length;
    if (errors === 0) {
      addInteriorMcc(data);
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
              <span className="text-bold">Thêm mới Mcc nội địa</span>
              <div className="widget-toolbar" />
            </div>
            <Collapse isOpen className="show-information">
              <Form className="widget-box transparent" ref={(addMccInterior) => { this.form = addMccInterior; }}>
                <Card>
                  <CardBody>
                    <FormGroup row>
                      <Col lg="5">
                        <Label>
                          Mã Mcc nội địa
                          {' '}
                          <span className="text-danger">*</span>
                        </Label>
                      </Col>
                      <Col lg="7">
                        <Input
                          value=""
                          label="Mã Mcc nội địa"
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
                          Tên Mcc nội địa
                          {' '}
                          <span className="text-danger">*</span>
                        </Label>
                      </Col>
                      <Col lg="7">
                        <Input
                          maxLength="50"
                          minLength="3"
                          label="Tên Mcc nội địa"
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
                        onClick={this.addNewInteriorMcc}
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
  responseAddMcc: state.interiorMcc.responseAddMcc,
});

const mapDispatchToProps = (dispatch) => ({
  addInteriorMcc: (data) => dispatch(addInteriorMcc(data)),
});

Add.propTypes = {
  addInteriorMcc: PropTypes.func,
  history: PropTypes.object,
  responseAddMcc: PropTypes.object,
};

Add.defaultProps = {
  addInteriorMcc: () => {},
  history: {},
  responseAddMcc: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Add));
