import React from 'react';
import Select from 'react-select';
import {Card, CardBody, Col, Collapse, FormGroup, Label, Row,} from 'reactstrap';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
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
import {getAllDistrictByProvince,} from '../../../store/actions/system/systemModuleAction';
import {getStatusUI, listDistrictByProvince,} from '../../../utils/commonFunction';

class BusinessInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenInfo: true,
      isOpenAccount: true,
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
    } = props;

    let updateListDistrict = [];

    updateListDistrict = listDistrictByProvince(listDistrict);
    return {
      updateListDistrict,
    };
  }

  componentDidUpdate(prevProps) {
    const {
      getAllDistrictByProvince,
      merchantDetail,
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
      optionDistrict,
      zipCode,
      taxCode,
      webSite,
    };
    if (merchantDetail !== prevProps.merchantDetail) {
      this.setState({
        merchantName: (merchantDetail && merchantDetail.merchantName),
        abbreviationName: (merchantDetail && merchantDetail.merchantBrand),
        masterMerchant: {
          value: (merchantDetail && merchantDetail.masterMerchantCode),
          label: (merchantDetail && merchantDetail.masterMerchant),
        },
        billingCode: merchantDetail && merchantDetail.providerCode,
        optionMccInternational: {
          value: merchantDetail && merchantDetail.merchantType,
          label: merchantDetail && `${merchantDetail.merchantTypeCode}-${merchantDetail.merchantTypeName}`,
        },
        registerBusinessAddress: merchantDetail && merchantDetail.address,
        businessAddress: merchantDetail && merchantDetail.merchantBusinessAddress,
        optionProvince: {
          value: merchantDetail && merchantDetail.provinceCode,
          label: merchantDetail && merchantDetail.provinceName,
        },
        optionDistrict: {
          value: merchantDetail && merchantDetail.districtCode,
          label: merchantDetail && merchantDetail.districtName,
        },
        zipCode: merchantDetail && merchantDetail.pinCode,
        taxCode: merchantDetail && merchantDetail.merchantCode,
        webSite: merchantDetail && merchantDetail.website,
      });
      if ((merchantDetail && merchantDetail.provinceCode) !== undefined) {
        getAllDistrictByProvince({ provinceCode: (merchantDetail && merchantDetail.provinceCode) });
      }
    }

    if (validateForm !== prevProps.validateForm) {
      this.form.validateAll();
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

  handOpenAccount = () => {
    const { isOpenAccount } = this.state;
    this.setState({
      isOpenAccount: !isOpenAccount,
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

  handleChangeSupplier = (event) => {
    this.setState({
      billingCode: event.target.value,
    });
  };

  handleChangeMccInternational = (mccInternationalSelected) => {
    if (mccInternationalSelected) {
      this.setState({
        optionMccInternational: mccInternationalSelected,
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
        optionProvince: citySelected,
        optionDistrict: {},
      }, () => {
        getAllDistrictByProvince({ provinceCode: citySelected.value });
      });
    }else{
      this.setState({
        optionProvince: {},
        optionDistrict: {},
      })
    }
  };

  handleChangeDistrict = (districtSelected) => {
    if (districtSelected) {
      this.setState({
        optionDistrict: districtSelected,
      });
    }else{
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
    const { merchantDetail, changeTaxNumber } = this.props;
    this.setState({
      taxCode: event.target.value,
    });

    changeTaxNumber(event.target.value !== merchantDetail.merchantCode);
  };

  handleChangeWebSite = (event) => {
    this.setState({
      webSite: event.target.value,
    });
  };

  getListMerchantStatus = (itemCode) => {
    const listMerchantStatus = JSON.parse(localStorage && localStorage.getItem('MERCHANT'));
    const status = getStatusUI(listMerchantStatus, itemCode);
    return status;
  };

  render() {
    const {
      isOpenInfo,
      isOpenAccount,
      updateListDistrict,
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

    const {
      listMccInternational,
      listProvince,
      merchantDetail,
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
                        {Constants.MnMerchant.merchantId}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>{merchantDetail ? merchantDetail.merchantCode : ''}</Label>
                    </Col>
                  </FormGroup>
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
                        value={merchantName}
                        label={Constants.MnMerchant.merchantName}
                        type="text"
                        className="form-control"
                        name="code"
                        maxLength={100}
                        onChange={this.handleChangeMerchantName}
                        validations={[
                          checkRequiredInput,
                          checkLength100,
                        ]}
                        disabled={merchantDetail && merchantDetail.status === 1}
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
                        value={abbreviationName}
                        label={Constants.MnMerchant.shortName}
                        type="text"
                        className="form-control"
                        name="code"
                        maxLength={25}
                        onChange={this.handleChangeAbbreviationName}
                        validations={[
                          checkRequiredInput,
                          checkLength25,
                          isValidVietnamese,
                        ]}
                        disabled={merchantDetail && merchantDetail.status === 1}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.masterMerchant}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Select
                        type="select"
                        label={Constants.MnMerchant.masterMerchant}
                        value={masterMerchant}
                        isDisabled
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
                        value={billingCode}
                        label={Constants.MnMerchant.supplierCode}
                        type="text"
                        className="form-control"
                        name="code"
                        maxLength={20}
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
                        value={optionMccInternational}
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
                        value={registerBusinessAddress}
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
                        value={businessAddress}
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
                        isClearable
                        value={optionProvince}
                        label={Constants.MnMerchant.businessAddress}
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
                        isClearable
                        value={optionDistrict}
                        options={updateListDistrict}
                        onChange={this.handleChangeDistrict}
                      />
                      {validateForm ? checkRequiredSelect(optionDistrict && optionDistrict.value, Constants.MnMerchant.district) : ''}
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
                        value={zipCode}
                        label={Constants.MnMerchant.zipCode}
                        type="text"
                        className="form-control"
                        name="code"
                        maxLength={10}
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
                        value={taxCode}
                        label={Constants.MnMerchant.taxCode}
                        type="text"
                        className="form-control"
                        name="code"
                        maxLength={20}
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
                        value={webSite}
                        label={Constants.MnMerchant.website}
                        type="text"
                        className="form-control"
                        name="code"
                        maxLength={100}
                        validations={[
                          checkContainSpace,
                          checkLength100,
                        ]}
                        onChange={this.handleChangeWebSite}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.status}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>{ this.getListMerchantStatus((merchantDetail && merchantDetail.status)) || '' }</Label>
                    </Col>
                  </FormGroup>
                </CardBody>
              </Card>
            </Collapse>
          </Form>
        </div>
        <div className="col-md-12">
          <div className="widget-box transparent">
            <div className="widget-header widget-header-flat" role="presentation" onClick={this.handOpenAccount} onKeyPress={this.handOpenAccount}>
              <span className="text-bold">{Constants.MerchantDetail.accountMerchantWebAndApp}</span>
              <div className="widget-toolbar">
                <span data-action="collapse">
                  {isOpenAccount ? (
                    <i className="ace-icon fa fa-chevron-up" />
                  ) : (
                    <i className="ace-icon fa fa-chevron-down" />
                  )}
                </span>
              </div>
            </div>
            <Collapse isOpen={isOpenAccount} className="show-information">
              <Card>
                <CardBody>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MerchantDetail.accountMerchant}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>
                        { merchantDetail ? merchantDetail.merchantSiteUser : ''}
                      </Label>
                    </Col>
                  </FormGroup>
                </CardBody>
              </Card>
            </Collapse>
          </div>
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
  listMccInternational: [],
  listProvince: [],
  getAllDistrictByProvince: () => {},
  listDistrict: [],
  merchantDetail: {},
  passDataBusinessInfo: () => {},
  changeTaxNumber: () => {},
};

BusinessInfo.propTypes = {
  getAllDistrictByProvince: PropTypes.func,
  passDataBusinessInfo: PropTypes.func,
  listProvince: PropTypes.array,
  listMccInternational: PropTypes.array,
  listDistrict: PropTypes.array,
  merchantDetail: PropTypes.object,
  changeTaxNumber: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BusinessInfo));
