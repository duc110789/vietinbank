import React from 'react';
import Select from 'react-select';
import {Card, CardBody, Col, Collapse, FormGroup, Label, Row,} from 'reactstrap';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Input from 'react-validation/build/input';
import Textarea from 'react-validation/build/textarea';
import Form from 'react-validation/build/form';
import {
  checkContainSpace,
  checkContainSpecialCharacters,
  checkLength100,
  checkLength150,
  checkLength20,
  checkLength200,
  checkLength8,
  checkRequiredInput,
  checkRequiredSelect,
  isValidVietnamese,
} from '../../../components/Input/validation';
import Constants from '../Constants';
import {scroll} from "../../../utils/commonFunction";

class TerminalInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenInfo: true,
      terminalID: '',
      terminalName: '',
      serviceCode: '',
      websiteEcommerce: '',
      businessAddress: '',
      optionMccInternational: '',
      productBusinessDesciption: '',
      optionMccInterior: '',
      facebook: '',
    };
  }

  componentDidUpdate(prevProps) {
    const {
      passTerminalInfo,
      validateForm
    } = this.props;
    const {
      terminalID,
      terminalName,
      serviceCode,
      websiteEcommerce,
      businessAddress,
      optionMccInternational,
      productBusinessDesciption,
      optionMccInterior,
      facebook,
    } = this.state;
    const dataTerminalInfo = {
      terminalID,
      terminalName,
      serviceCode,
      websiteEcommerce,
      businessAddress,
      optionMccInternational,
      productBusinessDesciption,
      optionMccInterior,
      facebook,
    };
    passTerminalInfo(dataTerminalInfo);
    if (validateForm !== prevProps.validateForm) {
      this.form.validateAll();

      const errors = this.form.getChildContext()._errors;
      const elements = this.form.state.byId;
      if (errors.length > 0) {
        const elementFiltered = elements[errors[0]];
        scroll(`${elementFiltered.id}`, true);
      } else if (checkRequiredSelect(optionMccInternational) !== false) {
        scroll('add-terminal-mcc-international');
      } else if (checkRequiredSelect(optionMccInterior) !== false) {
        scroll('add-terminal-mcc-inland');
      }
    }
  }

  handleChangeTerminalID = (event) => {
    this.setState({
      terminalID: event.target.value,
    });
  };

  handleChangeTerminalName = (event) => {
    this.setState({
      terminalName: event.target.value,
    });
  };

  handleChangeServiceCode = (event) => {
    this.setState({
      serviceCode: event.target.value,
    });
  };

  handleChangeWebsiteEcommerce = (event) => {
    this.setState({
      websiteEcommerce: event.target.value,
    });
  };

  handleChangeBusinessAddress = (event) => {
    this.setState({
      businessAddress: event.target.value,
    });
  };

  handleChangeMccInternational = (mccInternationalSelected) => {
    if (mccInternationalSelected) {
      this.setState({
        optionMccInternational: mccInternationalSelected.value,
      });
    }
  };

  handleChangeProductBusinessDesciption = (event) => {
    this.setState({
      productBusinessDesciption: event.target.value,
    });
  };

  handleChangeMccInterior = (mccInteriorSelected) => {
    if (mccInteriorSelected) {
      this.setState({
        optionMccInterior: mccInteriorSelected.value,
      });
    }
  };

  handleChangeFacebook = (event) => {
    this.setState({
      facebook: event.target.value,
    });
  };

  handOpenInfo = () => {
    const { isOpenInfo } = this.state;
    this.setState({
      isOpenInfo: !isOpenInfo,
    });
  }

  render() {
    const {
      isOpenInfo,
      optionMccInternational,
      optionMccInterior,
    } = this.state;
    const {
      listMccInterior,
      listMccInternational,
      validateForm,
    } = this.props;
    return (
      <Row>
        <div className="col-md-12">
          <Form className="widget-box transparent" ref={(c) => { this.form = c; }}>
            <div className="widget-header widget-header-flat" role="presentation" onClick={this.handOpenInfo} onKeyPress={this.handOpenInfo}>
              <span className="text-bold">{Constants.MnMerchant.terminalInfo}</span>
              <div className="widget-toolbar">
                <span data-action="collapse">
                  {isOpenInfo ? (
                    <i className="ace-icon fa fa-chevron-up" />
                  ) : (
                    <i className="ace-icon fa fa-chevron-down" />
                  )}
                </span>
              </div>
            </div>
            <Collapse isOpen={isOpenInfo} className="show-information">
              <Card>
                <CardBody>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.terminalID}
                        {' '}
                        <span className="text-danger">*</span>
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Input
                        id="add-terminal-id"
                        value=""
                        label={Constants.MnMerchant.terminalID}
                        type="text"
                        className="form-control"
                        name="code"
                        onChange={this.handleChangeTerminalID}
                        maxLength={8}
                        validations={[
                          checkRequiredInput,
                          checkLength8,
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
                        {Constants.MnMerchant.terminalName}
                        {' '}
                        <span className="text-danger">*</span>
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Input
                        id="add-terminal-name"
                        value=""
                        label={Constants.MnMerchant.terminalName}
                        type="text"
                        className="form-control"
                        name="code"
                        maxLength={20}
                        onChange={this.handleChangeTerminalName}
                        validations={[
                          checkRequiredInput,
                          checkContainSpecialCharacters,
                          isValidVietnamese,
                          checkLength20,
                        ]}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.serviceCode}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Input
                        id="add-service-code"
                        value=""
                        label={Constants.MnMerchant.serviceCode}
                        type="text"
                        className="form-control"
                        name="code"
                        onChange={this.handleChangeServiceCode}
                        maxLength={20}
                        validations={[
                          checkLength20,
                        ]}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.websiteEcommerce}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Input
                        id="add-website-ecommerce"
                        value=""
                        label={Constants.MnMerchant.websiteEcommerce}
                        type="text"
                        className="form-control"
                        name="code"
                        onChange={this.handleChangeWebsiteEcommerce}
                        validations={[
                          checkLength100,
                          checkContainSpace,
                        ]}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.businessAddress}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Input
                        id="add-terminal-business-address"
                        value=""
                        label={Constants.MnMerchant.businessAddress}
                        type="text"
                        className="form-control"
                        name="code"
                        onChange={this.handleChangeBusinessAddress}
                        validations={[
                          checkLength150,
                        ]}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.nationalMCC}
                        {' '}
                        <span className="text-danger">*</span>
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Select
                        id="add-terminal-mcc-international"
                        placeholder="Chọn"
                        options={listMccInternational}
                        onChange={this.handleChangeMccInternational}
                      />
                      {validateForm ? checkRequiredSelect(optionMccInternational, Constants.MnMerchant.nationalMCC) : ''}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.productBusinessDesciption}
                        {' '}
                        {optionMccInternational === -1 && (
                          <span className="text-danger">*</span>
                        )}
                      </Label>
                    </Col>
                    <Col lg="7">
                      {optionMccInternational === -1 ? (
                        <FormGroup style={{ width: '100%', display: 'inline-block' }}>
                          <Textarea
                            id="add-des"
                            label={Constants.MnMerchant.productBusinessDesciption}
                            name="productBusinessDescription"
                            className="form-control"
                            style={{ height: '90px' }}
                            maxLength={200}
                            onChange={this.handleChangeProductBusinessDesciption}
                            validations={[
                              checkRequiredInput,
                              checkLength200,
                            ]}
                          />
                        </FormGroup>
                      ) : (
                        <Textarea
                          id="add-des"
                          label={Constants.MnMerchant.productBusinessDesciption}
                          name="productBusinessDescription"
                          className="form-control"
                          style={{ height: '90px' }}
                          maxLength={200}
                          onChange={this.handleChangeProductBusinessDesciption}
                          validations={[
                            checkLength200,
                          ]}
                        />
                      )}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.inlandMCC}
                        {' '}
                        <span className="text-danger">*</span>
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Select
                        id="add-terminal-mcc-inland"
                        placeholder="Chọn"
                        options={listMccInterior}
                        onChange={this.handleChangeMccInterior}
                      />
                      {validateForm ? checkRequiredSelect(optionMccInterior, Constants.MnMerchant.inlandMCC) : ''}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.facebook}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Input
                        id="add-facebook"
                        value=""
                        label={Constants.MnMerchant.facebook}
                        type="text"
                        className="form-control"
                        name="code"
                        onChange={this.handleChangeFacebook}
                        validations={[
                          checkLength100,
                          checkContainSpace,
                        ]}
                      />
                    </Col>
                  </FormGroup>
                </CardBody>
              </Card>
            </Collapse>
          </Form>
        </div>
      </Row>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  // listDistrict: state.systemModule.listDistrict,
});

const mapDispatchToProps = (dispatch) => ({
  // getAllDistrictByProvince: (data) => dispatch(getAllDistrictByProvince(data)),
});

TerminalInfo.defaultProps = {
  passTerminalInfo: () => {},
  listMccInterior: [],
  listMccInternational: [],
};

TerminalInfo.propTypes = {
  passTerminalInfo: PropTypes.func,
  listMccInterior: PropTypes.array,
  listMccInternational: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TerminalInfo));
