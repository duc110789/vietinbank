import React from 'react';
import Select from 'react-select';
import {Card, CardBody, Col, Collapse, FormGroup, Label, Row,} from 'reactstrap';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Constants from '../Constants';
import {
  checkContainSpace,
  checkContainSpecialCharacters,
  checkLength30,
  checkRequiredInput,
  checkRequiredSelect,
  isValidVietnamese,
  notAllowInputNumber,
} from '../../../components/Input/validation';
import { scroll } from '../../../utils/commonFunction';

class BeneficiaryAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenInfo: true,
      accountNumber: '',
      accountOwn: '',
      bankCode: '970489',
      branchBank: '',
      currency: 'VNĐ',
    };
  }

  componentDidUpdate(prevProps) {
    const {
      passBeneficiaryAccount,
      validateForm
    } = this.props;
    const {
      accountNumber,
      accountOwn,
      bankCode,
      branchBank,
      currency,
    } = this.state;
    const dataBeneficiaryAccount = {
      accountNumber,
      accountOwn,
      bankCode,
      branchBank,
      currency,
    };
    if (validateForm !== prevProps.validateForm) {
      this.form.validateAll();

      const errors = this.form.getChildContext()._errors;
      const elements = this.form.state.byId;
      if (errors.length > 0) {
        const elementFiltered = elements[errors[0]];
        scroll(`${elementFiltered.id}`, true);
      } else if (checkRequiredSelect(branchBank) !== false) {
        scroll('add-branch');
      }
    }
    if (
      this.form.getChildContext()._errors.length === 0
    ) {
      passBeneficiaryAccount(dataBeneficiaryAccount);
    }
  }

  handOpenInfo = () => {
    const { isOpenInfo } = this.state;
    this.setState({
      isOpenInfo: !isOpenInfo,
    });
  };

  handleChangeAccountNumber = (event) => {
    this.setState({
      accountNumber: event.target.value,
    });
  };

  handleChangeAccountOwn = (event) => {
    this.setState({
      accountOwn: event.target.value,
    });
  };

  handleChangeBranchBank = (branchBankSelected) => {
    if (branchBankSelected) {
      this.setState({
        branchBank: branchBankSelected.value,
      });
    }
  };

  render() {
    const {
      isOpenInfo,
      branchBank,
    } = this.state;
    const {
      listBranchBank,
      validateForm,
    } = this.props;
    return (
      <Row>
        <div className="col-md-12">
          <Form className="widget-box transparent" ref={(d) => { this.form = d; }}>
            <div className="widget-header widget-header-flat" role="presentation" onClick={this.handOpenInfo} onKeyPress={this.handOpenInfo}>
              <span className="text-bold">{Constants.MnMerchant.beneficiaryAccount}</span>
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
                        {Constants.MnMerchant.accountNumber}
                        {' '}
                        <span className="text-danger">*</span>
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Input
                        id="add-account-number"
                        value=""
                        label={Constants.MnMerchant.accountNumber}
                        type="text"
                        className="form-control"
                        name="code"
                        onChange={this.handleChangeAccountNumber}
                        maxLength={30}
                        validations={[
                          checkLength30,
                          checkRequiredInput,
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
                        {Constants.MnMerchant.accountOwn}
                        {' '}
                        <span className="text-danger">*</span>
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Input
                        id="add-account-own"
                        value=""
                        label={Constants.MnMerchant.accountOwn}
                        type="text"
                        className="form-control"
                        name="code"
                        onChange={this.handleChangeAccountOwn}
                        validations={[
                          checkRequiredInput,
                          checkLength30,
                          checkContainSpecialCharacters,
                          notAllowInputNumber,
                        ]}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.bank}
                        {' '}
                        <span className="text-danger">*</span>
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Select
                        placeholder="Chọn"
                        options={[{ value: '970489', label: 'Viettinbank' }]}
                        value={[{ value: '970489', label: 'Viettinbank' }]}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.branch}
                        {' '}
                        <span className="text-danger">*</span>
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Select
                        id="add-branch"
                        options={listBranchBank}
                        onChange={this.handleChangeBranchBank}
                      />
                      {validateForm ? checkRequiredSelect(branchBank, Constants.MnMerchant.branch) : ''}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.currency}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Select
                        placeholder="Chọn"
                        options={[{ value: '0', label: 'VNĐ' }]}
                        value={[{ value: '0', label: 'VNĐ' }]}
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

BeneficiaryAccount.defaultProps = {
  passBeneficiaryAccount: () => {},
};

BeneficiaryAccount.propTypes = {
  passBeneficiaryAccount: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BeneficiaryAccount));
