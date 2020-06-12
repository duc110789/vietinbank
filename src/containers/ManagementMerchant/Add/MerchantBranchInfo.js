import React from 'react';
import Select from 'react-select';
import {Card, CardBody, Col, Collapse, FormGroup, Label, Row,} from 'reactstrap';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Input from 'react-validation/build/input';
import Form from 'react-validation/build/form';
import {
  checkContainSpace,
  checkContainSpecialCharacters,
  checkLength100,
  checkLength150,
  checkLength20,
  checkLength8,
  checkPhoneNumber,
  checkRequiredInput,
  checkRequiredSelect,
  isValidVietnamese,
} from '../../../components/Input/validation';
import Constants from '../Constants';
import {getAllStaffByDepartment} from '../../../store/actions/system/systemModuleAction';
import {formatPhoneNumber} from '../../../utils/validation';
import { scroll } from '../../../utils/commonFunction';

class MerchantBranchInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenInfo: true,
      terminalId: '',
      terminalName: '',
      businessAddress: '',
      websiteEcommerce: '',
      optionMccInternational: '',
      optionMccInterior: '',
      developmentUnit: '',
      optionStaffByDepartment: '',
      staffName: '',
    };
  }

  static getDerivedStateFromProps(props, state) {
    const {
      listStaffByDepartment,
    } = props;

    const updateListStaffByDepartment = [];

    if (listStaffByDepartment) {
      for (let i = 0; i < listStaffByDepartment.length; i += 1) {
        updateListStaffByDepartment.push(
          {
            value: listStaffByDepartment[i].id,
            label: `${listStaffByDepartment[i].staffCode}-${listStaffByDepartment[i].fullName}`,
          },
        );
      }
    }
    return {
      updateListStaffByDepartment,
    };
  }

  componentDidUpdate(prevProps) {
    const {
      passMerchantBranchInfo,
      validateForm,
    } = this.props;
    const {
      terminalId,
      terminalName,
      businessAddress,
      websiteEcommerce,
      optionMccInternational,
      optionMccInterior,
      developmentUnit,
      optionStaffByDepartment,
      staffName,
    } = this.state;
    const dataMerchantBranchInfo = {
      terminalId,
      terminalName,
      businessAddress,
      websiteEcommerce,
      optionMccInternational,
      optionMccInterior,
      developmentUnit,
      optionStaffByDepartment,
      staffName,
    };
    const isValidateMobile = !formatPhoneNumber(staffName);
    this.props.changeValidateMobile(!isValidateMobile);
    passMerchantBranchInfo(dataMerchantBranchInfo);
    if (validateForm !== prevProps.validateForm) {
      this.form.validateAll();

      const errors = this.form.getChildContext()._errors;
      const elements = this.form.state.byId;
      if (errors.length > 0) {
        const elementFiltered = elements[errors[0]];
        scroll(`${elementFiltered.id}`, true);
      } else if (checkRequiredSelect(optionMccInternational) !== false) {
        scroll('add-merchant-national-mmc');
      } else if (checkRequiredSelect(optionMccInterior) !== false) {
        scroll('add-merchant-interior-mmc');
      } else if (checkRequiredSelect(developmentUnit) !== false) {
        scroll('add-merchant-dev-unit');
      } else if (checkRequiredSelect(optionStaffByDepartment) !== false) {
        scroll('add-merchant-staff');
      }
    }
  }

  handleChangeTerminalID = (event) => {
    this.setState({
      terminalId: event.target.value,
    });
  };

  handleChangeTerminalName = (event) => {
    this.setState({
      terminalName: event.target.value,
    });
  };

  handleChangeBusinessAddress = (event) => {
    this.setState({
      businessAddress: event.target.value,
    });
  };

  handleChangeWebsiteEcommerce = (event) => {
    this.setState({
      websiteEcommerce: event.target.value,
    });
  };

  handleChangeMccInternational = (mccInternationalSelected) => {
    if (mccInternationalSelected) {
      this.setState({
        optionMccInternational: mccInternationalSelected.value,
      });
    }
  };

  handleChangeMccInterior = (mccInteriorSelected) => {
    if (mccInteriorSelected) {
      this.setState({
        optionMccInterior: mccInteriorSelected.value,
      });
    }
  };

  handleDevelopmentUnit = (unitSelected) => {
    const { getAllStaffByDepartment } = this.props;
    if (unitSelected) {
      this.setState({
        developmentUnit: unitSelected.value,
      }, () => {
        getAllStaffByDepartment({ departmentCode: unitSelected.departmentCode });
      });
    }
  };

  handleChangeStaffByDepartment = (mccStaffByDepartmentSelected) => {
    if (mccStaffByDepartmentSelected) {
      this.setState({
        optionStaffByDepartment: mccStaffByDepartmentSelected.value,
      });
    }
  };

  handleChangeStaffName = (event) => {
    this.setState({
      staffName: event.target.value,
    });
  };

  handOpenInfo = () => {
    const { isOpenInfo } = this.state;
    this.setState({
      isOpenInfo: !isOpenInfo,
    });
  };

  render() {
    const {
      isOpenInfo,
      updateListStaffByDepartment,
      optionMccInternational,
      optionMccInterior,
      developmentUnit,
      optionStaffByDepartment,
    } = this.state;
    const {
      listMccInterior,
      listMccInternational,
      listBranchBankByUser,
      validateForm,
    } = this.props;
    return (
      <Row>
        <div className="col-md-12">
          <Form className="widget-box transparent" ref={(b) => { this.form = b; }}>
            <div className="widget-header widget-header-flat" role="presentation" onClick={this.handOpenInfo} onKeyPress={this.handOpenInfo}>
              <span className="text-bold">{Constants.MnMerchant.merchantBranchInfo}</span>
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
                        id="add-merchant-terminal-id"
                        value=""
                        label={Constants.MnMerchant.terminalID}
                        type="text"
                        className="form-control"
                        name="code"
                        onChange={this.handleChangeTerminalID}
                        maxLength={8}
                        validations={[
                          checkRequiredInput,
                          checkContainSpecialCharacters,
                          checkContainSpace,
                          checkLength8,
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
                        id="add-merchant-terminal-name"
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
                        {Constants.MnMerchant.businessAddress}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Input
                        id="add-merchant-business-address"
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
                        {Constants.MnMerchant.websiteEcommerce}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Input
                        id="add-merchant-web-ecommerce"
                        value=""
                        label={Constants.MnMerchant.websiteEcommerce}
                        type="text"
                        className="form-control"
                        name="code"
                        onChange={this.handleChangeWebsiteEcommerce}
                        validations={[
                          checkContainSpace,
                          checkLength100,
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
                        id="add-merchant-national-mmc"
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
                        {Constants.MnMerchant.inlandMCC}
                        {' '}
                        <span className="text-danger">*</span>
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Select
                        id="add-merchant-interior-mmc"
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
                        {Constants.MnMerchant.developmentUnit}
                        {' '}
                        <span className="text-danger">*</span>
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Select
                        id="add-merchant-dev-unit"
                        placeholder="Chọn"
                        options={listBranchBankByUser}
                        onChange={this.handleDevelopmentUnit}
                      />
                      {validateForm ? checkRequiredSelect(developmentUnit, Constants.MnMerchant.developmentUnit) : ''}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.staff}
                        {' '}
                        <span className="text-danger">*</span>
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Select
                        id="add-merchant-staff"
                        placeholder="Chọn"
                        options={updateListStaffByDepartment}
                        onChange={this.handleChangeStaffByDepartment}
                      />
                      {validateForm ? checkRequiredSelect(optionStaffByDepartment, Constants.MnMerchant.staff) : ''}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.userName}
                        {' '}
                        <span className="text-danger">*</span>
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Input
                        id="add-merchant-username"
                        value=""
                        label={Constants.MnMerchant.userName}
                        type="text"
                        className="form-control"
                        name="code"
                        placeholder="Nhập số điện thoại"
                        onChange={this.handleChangeStaffName}
                        validations={[
                          checkRequiredInput,
                          checkPhoneNumber,
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
  listStaffByDepartment: state.systemModule.listStaffByDepartment,
});

const mapDispatchToProps = (dispatch) => ({
  getAllStaffByDepartment: (data) => dispatch(getAllStaffByDepartment(data)),
});

MerchantBranchInfo.defaultProps = {
  getAllStaffByDepartment: () => {},
  getDataMerchantBranchInfo: () => {},
  listMccInterior: [],
  listMccInternational: [],
  listBranchBankByUser: [],
};

MerchantBranchInfo.propTypes = {
  getAllStaffByDepartment: PropTypes.func,
  getDataMerchantBranchInfo: PropTypes.func,
  listMccInterior: PropTypes.array,
  listMccInternational: PropTypes.array,
  listBranchBankByUser: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MerchantBranchInfo));
