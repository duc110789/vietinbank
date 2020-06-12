import React from 'react';
import Select from 'react-select';
import {
  Card, CardBody, Col, Collapse, FormGroup, Label, Row,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Input from 'react-validation/build/input';
import Form from 'react-validation/build/form';
import Constants from '../Constants';
import {
  checkContainSpace,
  checkLength10,
  checkLength100,
  checkLength150,
  checkLength20,
  checkLength25,
  checkRequiredInput,
  checkRequiredSelect,
  isValidVietnamese,
} from '../../../components/Input/validation';
import { getAllDistrictByProvince } from '../../../store/actions/system/systemModuleAction';
import { scroll } from '../../../utils/commonFunction';

class BusinessInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenInfo: true,
      merchantName: '',
      abbreviationName: '',
      masterMerchant: '',
      billingCode: '',
      optionMccInternational: '',
      registerBusinessAddress: '',
      businessAddress: '',
      optionProvince: '',
      optionDistrict: '',
      zipCode: '',
      taxCode: '',
      webSite: '',
    };
  }

  static getDerivedStateFromProps(props, state) {
    const {
      listDistrict,
      validateForm,
    } = props;

    const updateListDistrict = [];

    if (listDistrict) {
      for (let i = 0; i < listDistrict.length; i += 1) {
        updateListDistrict.push(
          { value: listDistrict[i].districtCode, label: listDistrict[i].districtName },
        );
      }
    }
    return {
      updateListDistrict,
      validateForm,
    };
  }

  componentDidUpdate(prevProps) {
    const {
      passDataBusinessInfo,
      validateForm,
    } = this.props;
    const {
      merchantName,
      abbreviationName,
      masterMerchant,
      billingCode,
      optionMccInternational,
      registerBusinessAddress,
      businessAddress,
      optionProvince,
      optionDistrict,
      zipCode,
      taxCode,
      webSite,
    } = this.state;
    const dataBusinessInfo = {
      merchantName,
      abbreviationName,
      masterMerchant,
      billingCode,
      optionMccInternational,
      registerBusinessAddress,
      businessAddress,
      optionProvince,
      optionDistrict: optionDistrict && optionDistrict.value,
      zipCode,
      taxCode,
      webSite,
    };
    if (validateForm !== prevProps.validateForm) {
      this.form.validateAll();

      const errors = this.form.getChildContext()._errors;
      const elements = this.form.state.byId;
      if (errors.length > 0) {
        const elementFiltered = elements[errors[0]];
        scroll(`${elementFiltered.id}`, true);
      } else if (checkRequiredSelect(optionMccInternational) !== false) {
        scroll('add-international-mcc');
      } else if (checkRequiredSelect(optionProvince) !== false) {
        scroll('add-city');
      } else if (checkRequiredSelect(optionDistrict.value) !== false) {
        scroll('add-district');
      }
    }
    if (
      this.form.getChildContext()._errors.length === 0
    ) {
      passDataBusinessInfo(dataBusinessInfo);
    }
  }

  handOpenInfo = () => {
    const { isOpenInfo } = this.state;
    this.setState({
      isOpenInfo: !isOpenInfo,
    });
  };

  handleChangeMerchantName = (event) => {
    this.setState({
      merchantName: event.target.value,
    });
  };

  handleChangeAbbreviationName = (event) => {
    this.setState({
      abbreviationName: event.target.value,
    });
  };

  handleChangeMasterMerchant = (masterMerchantSelected) => {
    if (masterMerchantSelected) {
      this.setState({
        masterMerchant: masterMerchantSelected.value,
      });
    }
  };

  handleChangeSupplier = (event) => {
    this.setState({
      billingCode: event.target.value,
    });
  };

  handleChangeMccInternational = (mccInternationalSelected) => {
    if (mccInternationalSelected) {
      this.setState({
        optionMccInternational: mccInternationalSelected.value,
      });
    }
  };

  handleChangeRegisterBusinessAddress = (event) => {
    this.setState({
      registerBusinessAddress: event.target.value,
    });
  };

  handleChangeBusinessAddress = (event) => {
    this.setState({
      businessAddress: event.target.value,
    });
  };

  handleChangeProvince = (citySelected) => {
    const { getAllDistrictByProvince } = this.props;
    if (citySelected) {
      this.setState({
        optionProvince: citySelected.value,
      }, () => {
        getAllDistrictByProvince({ provinceCode: citySelected.value });
      });
    }
    this.setState({
      optionDistrict: {},
    });
  };

  handleChangeDistrict = (districtSelected) => {
    if (districtSelected) {
      this.setState({
        optionDistrict: districtSelected,
      });
    } else {
      this.setState({
        optionDistrict: {},
      });
    }
  };

  handleChangeZipCode = (event) => {
    this.setState({
      zipCode: event.target.value,
    });
  };

  handleChangeTaxCode = (event) => {
    this.setState({
      taxCode: event.target.value,
    });
  };

  handleChangeWebSite = (event) => {
    this.setState({
      webSite: event.target.value,
    });
  };

  render() {
    const {
      isOpenInfo,
      updateListDistrict,
      optionMccInternational,
      optionProvince,
      optionDistrict,
    } = this.state;

    const {
      listMccInternational,
      listProvince,
      validateForm,
    } = this.props;
    return (
      <Row>
        <div className="col-md-12">
          <Form className="widget-box transparent" ref={(a) => { this.form = a; }}>
            <div className="widget-header widget-header-flat" role="presentation" onClick={this.handOpenInfo} onKeyPress={this.handOpenInfo}>
              <span className="text-bold">{Constants.MnMerchant.businessInfo}</span>
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
                      <Label htmlFor="code">
                        {Constants.MnMerchant.merchantName}
                        {' '}
                        <span className="text-danger">*</span>
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Input
                        id="add-merchant-name"
                        value=""
                        label={Constants.MnMerchant.merchantName}
                        type="text"
                        className="form-control"
                        onChange={this.handleChangeMerchantName}
                        validations={[
                          checkRequiredInput,
                          checkLength100,
                        ]}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.shortName}
                        {' '}
                        <span className="text-danger">*</span>
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Input
                        value=""
                        id="add-short-name"
                        label={Constants.MnMerchant.shortName}
                        type="text"
                        className="form-control"
                        name="code"
                        onChange={this.handleChangeAbbreviationName}
                        validations={[
                          checkRequiredInput,
                          checkLength25,
                          isValidVietnamese,
                        ]}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.masterMerchant}
                        {' '}
                        <span className="text-danger">*</span>
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Select
                        id="add-master-merchant"
                        placeholder="Chọn"
                        type="select"
                        name="code"
                        options={[{ value: '970489', label: 'Viettinbank' }]}
                        value={[{ value: '970489', label: 'Viettinbank' }]}
                        label={Constants.MnMerchant.masterMerchant}
                        // options={listMasterMerchant}
                        onChange={this.handleChangeMasterMerchant}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.supplierCode}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Input
                        value=""
                        id="add-supplier-code"
                        label={Constants.MnMerchant.supplierCode}
                        type="text"
                        className="form-control"
                        name="code"
                        onChange={this.handleChangeSupplier}
                        validations={[
                          checkLength20,
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
                        id="add-international-mcc"
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
                        {Constants.MnMerchant.registeredBusinessAddress}
                        {' '}
                        <span className="text-danger">*</span>
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Input
                        value=""
                        id="add-reg-business"
                        label={Constants.MnMerchant.registeredBusinessAddress}
                        type="text"
                        className="form-control"
                        name="code"
                        onChange={this.handleChangeRegisterBusinessAddress}
                        validations={[
                          checkRequiredInput,
                          checkLength150,
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
                        id="add-address-business"
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
                        {Constants.MnMerchant.city}
                        {' '}
                        <span className="text-danger">*</span>
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Select
                        id="add-city"
                        isClearable
                        placeholder="Chọn"
                        label={Constants.MnMerchant.city}
                        options={listProvince}
                        onChange={this.handleChangeProvince}
                      />
                      {validateForm ? checkRequiredSelect(optionProvince, Constants.MnMerchant.city) : ''}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.district}
                        {' '}
                        <span className="text-danger">*</span>
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Select
                        id="add-district"
                        isClearable
                        placeholder="Chọn"
                        options={updateListDistrict}
                        onChange={this.handleChangeDistrict}
                        value={optionDistrict}
                      />
                      {validateForm ? checkRequiredSelect(optionDistrict.value, Constants.MnMerchant.district) : ''}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.zipCode}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Input
                        id="add-zipcode"
                        value=""
                        label={Constants.MnMerchant.zipCode}
                        type="text"
                        className="form-control"
                        name="code"
                        onChange={this.handleChangeZipCode}
                        validations={[
                          checkLength10,
                        ]}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.taxCode}
                        {' '}
                        <span className="text-danger">*</span>
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Input
                        value=""
                        id="add-tax-code"
                        label={Constants.MnMerchant.taxCode}
                        type="text"
                        className="form-control"
                        name="code"
                        onChange={this.handleChangeTaxCode}
                        validations={[
                          checkRequiredInput,
                          checkLength20,
                          checkContainSpace,
                        ]}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.website}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Input
                        id="add-website"
                        value=""
                        label={Constants.MnMerchant.website}
                        type="text"
                        className="form-control"
                        name="code"
                        validations={[
                          checkContainSpace,
                          checkLength100,
                        ]}
                        onChange={this.handleChangeWebSite}
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
  listDistrict: state.systemModule.listDistrict,
});

const mapDispatchToProps = (dispatch) => ({
  getAllDistrictByProvince: (data) => dispatch(getAllDistrictByProvince(data)),
});

BusinessInfo.defaultProps = {
  getAllDistrictByProvince: () => {},
  listDistrict: [],
  passDataBusinessInfo: () => {},
};

BusinessInfo.propTypes = {
  getAllDistrictByProvince: PropTypes.func,
  passDataBusinessInfo: PropTypes.func,
  listDistrict: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BusinessInfo));
