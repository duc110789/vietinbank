/* eslint-disable max-len */
import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {Button, Card, CardBody, CardFooter, CardHeader, Col, Collapse, FormGroup, Label, Row,} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Input from 'react-validation/build/input';
import Form from 'react-validation/build/form';
import CheckboxTree from 'react-checkbox-tree';
import MultiSelect from '../../../components/MutilSelect/MultiSelect';
import {
  animatedComponents,
  MultiValue,
  Option,
  ValueContainer,
} from '../../../components/MutilSelect/CheckBoxMultiSelect';
import 'react-checkbox-tree/src/scss/react-checkbox-tree.scss';
import {clearMerchantCodeName, getMerchantCodeName} from '../../../store/actions/masterMerchant/masterMerchant';
import {getCacheTerminal, getTerminalPlace} from '../../../store/actions/terminal/terminal';
import {addMidTid} from '../../../store/actions/mIdTid/mIdTid';
import {
  checkContainSpace,
  checkEmailFormat,
  checkPhoneNumber,
  checkRequiredInput,
  checkRequiredSelect,
} from '../../../components/Input/validation';
import Constants from '../Constants';
import {messageError} from '../../../utils';

class AddMidTid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validateForm: false,
      isOpenInfo: true,
      isOpenInfoTerminal: true,
      merchantCode: '',
      terminalBranch: [],
      terminalWeb: '',
      terminalApp: '',
      numberPhone: '',
      email: '',
      arrayCheckedWeb: [],
      arrayExpandedWeb: ['0'],
      arrayCheckedApp: [],
      arrayExpandedApp: ['0'],
      isDisabledMerchantBranch: true,
      isDisabledTerminal: true,
      isClearable: true,
    };
  }

  static getDerivedStateFromProps(props) {
    const {
      listMerchantCodeName,
      cacheTerminal,
      listTerminalPlace,
    } = props;

    const roleMidTid = JSON.parse(localStorage && localStorage.getItem('ROLE_MID_TID'));
    const nodesLevel = [];

    if (roleMidTid) {
      const functionGroupLvOne = roleMidTid.filter((item) => (item.parentId === 0));
      for (let i = 0; i < functionGroupLvOne.length; i += 1) {
        let functionGroupLvTwo = null;
        functionGroupLvTwo = roleMidTid.filter((item) => (
          functionGroupLvOne[i].id === item.parentId
        ));
        nodesLevel.push({
          value: functionGroupLvOne[i].id,
          label: functionGroupLvOne[i].name,
          disabled: functionGroupLvOne[i].status === -1,
          children: functionGroupLvTwo.length > 0 ? functionGroupLvTwo.map((item) => (
            {
              value: item.id,
              label: item.name,
              disabled: item.status === -1,
            }
          )) : null,
        });
      }
    }

    let allNodes = [];
    allNodes = [{
      value: 0, label: 'Tất cả', children: nodesLevel,
    }];

    const updateListMerchantCodeName = [];
    if (listMerchantCodeName) {
      for (let i = 0; i < listMerchantCodeName.length; i += 1) {
        updateListMerchantCodeName.push(
          {
            value: listMerchantCodeName[i].merchantCode,
            label: `${listMerchantCodeName[i].merchantCode} - ${listMerchantCodeName[i].merchantName}`,
            id: listMerchantCodeName[i].id,
          },
        );
      }
    }

    const updateCacheTerminal = [];
    if (cacheTerminal) {
      for (let i = 0; i < cacheTerminal.length; i += 1) {
        updateCacheTerminal.push({
          value: cacheTerminal[i].id,
          label: `${cacheTerminal[i].terminalId} - ${cacheTerminal[i].terminalName}`,
          id: cacheTerminal[i].id,
        });
      }
    }

    const updatelistTerminalPlace = [];
    if (listTerminalPlace) {
      for (let i = 0; i < listTerminalPlace.length; i += 1) {
        updatelistTerminalPlace.push(
          {
            id: listTerminalPlace[i].id,
            terminalId: listTerminalPlace[i].terminalId,
            value: listTerminalPlace[i].terminalId,
            label: `${listTerminalPlace[i].terminalId} - ${listTerminalPlace[i].terminalName}`,
            branchId: listTerminalPlace[i].merchantBranchId,
          },
        );
      }
    }

    return {
      listMerchantCodeName: updateListMerchantCodeName,
      cacheTerminal: updateCacheTerminal,
      listTerminalPlace: updatelistTerminalPlace,
      nodesLevel,
      allNodes,
    };
  }

  componentDidUpdate(prevProps) {
    const { responseServer, history } = this.props;
    if (responseServer !== prevProps.responseServer) {
      if (responseServer.code !== '00') {
        messageError(responseServer.description);
      } else {
        history.push({
          pathname: '/system/accountwebapp/list',
        });
      }
    }
  }

  componentWillUnmount() {
    const { clearMerchantCodeName } = this.props;
    clearMerchantCodeName();
  }

  handleChangeMerchant = (merchantCodeOption) => {
    const {
      merchantCode,
    } = this.state;

    const {
      getCacheTerminal,
    } = this.props;
    this.setState({
      merchantCode: merchantCodeOption,
    }, () => {
      getCacheTerminal({
        merchantCode: merchantCodeOption && merchantCodeOption.value,
        status: '1',
        terminalBranchId: '',
      });
    });
    this.setState({
      isDisabledMerchantBranch: merchantCodeOption && merchantCodeOption.value === '',
    });
    if (!merchantCodeOption || (merchantCodeOption && merchantCode && merchantCodeOption.id !== merchantCode.id)) {
      this.setState({
        terminalBranch: [],
        terminalApp: [],
      });
    }
  };

  handleChangeTerminalweb = (selectTerminalWeb) => {
    if (selectTerminalWeb) {
      this.setState({
        terminalWeb: selectTerminalWeb,
      });
    }
  };

  handleChangeTerminalApp = (cacheTerminalOption) => {
    if (cacheTerminalOption) {
      this.setState({
        terminalApp: cacheTerminalOption,
      });
    }
  };

  handleChangeNumberPhone = (event) => {
    this.setState({
      numberPhone: event.target.value,
    });
  };

  handleChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  onChangeTerminalBranch = (event) => {
    const { merchantCode, terminalBranch } = this.state;
    const { getTerminalPlace } = this.props;
    if (event) {
      this.setState({
        terminalBranch: event,
      }, () => {
        getTerminalPlace({
          merchantCode: merchantCode && merchantCode.value,
          status: '1',
          terminalBranchId: event.id.toString(),
        });
      });
    } else {
      this.setState({
        terminalBranch: [],
      });
    }
    this.setState({
      isDisabledTerminal: event && event.value === '',
    });
    if (!event || (terminalBranch && event && terminalBranch.id !== event.id)) {
      this.setState({
        terminalWeb: [],
        terminalApp: [],
      });
    }
  };

  handOpenInfo = () => {
    const { isOpenInfo } = this.state;
    this.setState({
      isOpenInfo: !isOpenInfo,
    });
  };

  handOpenInfoTerminal = () => {
    const { isOpenInfoTerminal } = this.state;
    this.setState({
      isOpenInfoTerminal: !isOpenInfoTerminal,
    });
  };

  handleSave = () => {
    const {
      merchantCode,
      numberPhone,
      email,
      terminalApp,
      terminalWeb,
      arrayCheckedWeb,
      arrayCheckedApp,
      listTerminalPlace,
    } = this.state;
    this.setState({
      validateForm: true,
    });
    this.form.validateAll();
    const { addMidTid } = this.props;

    let arrListTid = [];
    if (terminalWeb) {
      if (terminalWeb.length > listTerminalPlace.length) {
        arrListTid = listTerminalPlace.map((item) => ({
          branchId: item.branchId,
          terminalId: item.terminalId,
        }));
      } else {
        arrListTid = terminalWeb.map((item) => ({
          branchId: item.branchId,
          terminalId: item.terminalId,
        }));
      }
    }

    const dataAddMidTid = {
      merchantId: merchantCode && merchantCode.id,
      listTid: arrListTid,
      phone: numberPhone,
      email,
      channelRegister: 1,
      branchId: terminalApp.branchId,
      terminalId: terminalApp.terminalId,
      roleWeb: arrayCheckedWeb.toString(),
      roleApp: arrayCheckedApp.toString(),
    };

    const errors = this.form.getChildContext()._errors.length;

    if (errors === 0 && dataAddMidTid.listTid.length && dataAddMidTid.roleApp.length && dataAddMidTid.roleWeb.length) {
      addMidTid(dataAddMidTid);
    }
  };

  goToList = () => {
    const { history } = this.props;
    history.push('/system/accountwebapp/list');
  };

  onInputChangeMerchant = (value) => {
    const { getMerchantCodeName } = this.props;
    if (value && value.length > 2) {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        getMerchantCodeName({
          status: '1',
          paternSearch: value,
        });
      }, 500);
    }
  };

  render() {
    const {
      listMerchantCodeName,
      cacheTerminal,
      validateForm,
      merchantCode,
      terminalWeb,
      terminalApp,
      terminalBranch,
      listTerminalPlace,
      allNodes,
      arrayCheckedWeb,
      arrayExpandedWeb,
      arrayCheckedApp,
      arrayExpandedApp,
      isOpenInfo,
      isOpenInfoTerminal,
      isDisabledMerchantBranch,
      isDisabledTerminal,
      isClearable,
    } = this.state;

    return (
      <div className="my-requests">
        <Form className="widget-box transparent" ref={(addMidTId) => { this.form = addMidTId; }}>
          <Card className="card-my-requests">
            <CardHeader>
              <Col xs="12">
                <FormGroup style={{ marginBottom: 0 }} row>
                  <Col lg="12" style={{ paddingLeft: 0 }}>
                    <span className="text-bold">{Constants.MidTid.titleMidTid}</span>
                  </Col>
                </FormGroup>
              </Col>
            </CardHeader>
            <CardBody>
              <Row>
                <Col className="col-md-2 col-2" />
                <Col className="col-md-8 col-8">
                  <p className="text-danger pb-6">{Constants.MidTid.notice}</p>
                  <FormGroup row>
                    <Col lg="6" className="label-left">
                      <Label htmlFor="code">
                        {' '}
                        {Constants.MnMerchant.merchantName}
                        {' '}
                        <span className="text-danger">*</span>
                      </Label>
                    </Col>
                    <Col lg="6">
                      <Select
                        isClearable={isClearable}
                        onInputChange={this.onInputChangeMerchant}
                        onChange={this.handleChangeMerchant}
                        options={listMerchantCodeName}
                        placeholder="Chọn Merchant"
                      />
                      {
                        validateForm && checkRequiredSelect(merchantCode && merchantCode.value,
                          Constants.MnMerchant.merchantName)
                      }
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="6">
                      <Label>
                        {Constants.MnMerchant.phoneNumber}
                        {' '}
                        <span className="text-danger">*</span>
                      </Label>
                    </Col>
                    <Col lg="6">
                      <Input
                        type="text"
                        label={Constants.MnMerchant.phoneNumber}
                        className="form-control"
                        placeholder="Số điện thoại"
                        name="code"
                        onChange={this.handleChangeNumberPhone}
                        validations={[
                          checkRequiredInput,
                          checkPhoneNumber,
                        ]}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="6">
                      <Label>
                        {Constants.MidTid.email}
                      </Label>
                    </Col>
                    <Col lg="6">
                      <Input
                        type="text"
                        label={Constants.MidTid.email}
                        className="form-control"
                        name="code"
                        maxLength="100"
                        onChange={this.handleChangeEmail}
                        validations={[
                          checkEmailFormat,
                          checkContainSpace,
                        ]}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="6">
                      <Label>
                        {Constants.MidTid.terminalBranch}
                        {' '}
                        <span className="text-danger">*</span>
                      </Label>
                    </Col>
                    <Col lg="6">
                      <Select
                        isClearable={isClearable}
                        isDisabled={isDisabledMerchantBranch}
                        options={cacheTerminal}
                        onChange={this.onChangeTerminalBranch}
                        placeholder="Chọn"
                        value={terminalBranch}
                      />
                      {
                        validateForm && checkRequiredSelect(terminalBranch && terminalBranch.value, Constants.MidTid.terminalBranch)
                      }
                    </Col>
                  </FormGroup>
                </Col>
                <Col className="col-md-2 col-2" />
              </Row>
              <div className="col-md-12">
                <div className="widget-box transparent">
                  <div className="widget-header widget-header-flat" role="presentation" onClick={this.handOpenInfo} onKeyPress={this.handOpenInfo}>
                    <span className="text-bold">{Constants.MidTid.titleWeb}</span>
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
                          <Col lg="2" />
                          <Col lg="4">
                            <Label>
                              {Constants.MidTid.pointSale}
                              {' '}
                              <span className="text-danger">*</span>
                            </Label>
                          </Col>
                          <Col lg="4">
                            <MultiSelect
                              isClearable={isClearable}
                              isDisabled={isDisabledTerminal}
                              options={listTerminalPlace}
                              placeholder="Chọn"
                              isMulti
                              closeMenuOnSelect={false}
                              hideSelectedOptions={false}
                              components={{
                                Option,
                                MultiValue,
                                ValueContainer,
                                animatedComponents,
                              }}
                              allowSelectAll
                              onChange={this.handleChangeTerminalweb}
                              value={terminalWeb}
                            />
                            {
                              validateForm && checkRequiredSelect(terminalWeb && terminalWeb.length,
                                Constants.MidTid.pointSale)
                            }
                          </Col>
                          <Col lg="2" />
                        </FormGroup>
                        <FormGroup row>
                          <Col lg="2" />
                          <Col lg="4">
                            <Label>
                              {Constants.MidTid.webFunction}
                              {' '}
                              <span className="text-danger">*</span>
                            </Label>
                          </Col>
                          <Col lg="4" style={{ fontSize: '12px' }}>
                            <CheckboxTree
                              id="web-account"
                              nodes={allNodes}
                              checked={arrayCheckedWeb}
                              expanded={arrayExpandedWeb}
                              onCheck={(arrayCheckedWeb) => this.setState({ arrayCheckedWeb })}
                              onExpand={(arrayExpandedWeb) => this.setState({ arrayExpandedWeb })}
                              icons={{
                                parentClose: '',
                                parentOpen: '',
                                leaf: '',
                              }}
                              showExpandAll
                              showNodeTitle
                              nativeCheckboxes
                              optimisticToggle={false}
                            />
                            {
                              validateForm && checkRequiredSelect(arrayCheckedWeb && arrayCheckedWeb.length,
                                Constants.MidTid.webFunctionLabel)
                            }
                          </Col>
                          <Col lg="2" />
                        </FormGroup>
                      </CardBody>
                    </Card>
                  </Collapse>
                </div>
              </div>
              <div className="col-md-12">
                <div className="widget-box transparent">
                  <div className="widget-header widget-header-flat" role="presentation" onClick={this.handOpenInfoTerminal} onKeyPress={this.handOpenInfoTerminal}>
                    <span className="text-bold">{Constants.MidTid.titleApp}</span>
                    <div className="widget-toolbar">
                      <span data-action="collapse">
                        {isOpenInfoTerminal ? (
                          <i className="ace-icon fa fa-chevron-up" />
                        ) : (
                          <i className="ace-icon fa fa-chevron-down" />
                        )}
                      </span>
                    </div>
                  </div>
                  <Collapse isOpen={isOpenInfoTerminal} className="show-information">
                    <Card>
                      <CardBody>
                        <FormGroup row>
                          <Col lg="2" />
                          <Col lg="4">
                            <Label>
                              {Constants.MidTid.pointSale}
                              {' '}
                              <span className="text-danger">*</span>
                            </Label>
                          </Col>
                          <Col lg="4">
                            <Select
                              isClearable={isClearable}
                              isDisabled={isDisabledTerminal}
                              onChange={this.handleChangeTerminalApp}
                              options={listTerminalPlace}
                              placeholder="Chọn"
                              value={terminalApp}
                            />
                            {
                              validateForm && checkRequiredSelect(terminalApp && terminalApp.value,
                                Constants.MidTid.pointSale)
                            }
                          </Col>
                          <Col lg="2" />
                        </FormGroup>
                        <FormGroup row>
                          <Col lg="2" />
                          <Col lg="4">
                            <Label>
                              {Constants.MidTid.webFunction}
                              {' '}
                              <span className="text-danger">*</span>
                            </Label>
                          </Col>
                          <Col lg="4">
                            <CheckboxTree
                              id="app-account"
                              nodes={allNodes}
                              checked={arrayCheckedApp}
                              expanded={arrayExpandedApp}
                              onCheck={(arrayCheckedApp) => this.setState({ arrayCheckedApp })}
                              onExpand={(arrayExpandedApp) => this.setState({ arrayExpandedApp })}
                              icons={{
                                parentClose: '',
                                parentOpen: '',
                                leaf: '',
                              }}
                              showExpandAll
                              showNodeTitle
                              nativeCheckboxes
                              optimisticToggle={false}
                            />
                            {
                              validateForm && checkRequiredSelect(arrayCheckedApp && arrayCheckedApp.length,
                                Constants.MidTid.webFunctionLabel)
                            }
                          </Col>
                          <Col lg="2" />
                        </FormGroup>
                      </CardBody>
                    </Card>
                  </Collapse>
                </div>
              </div>
            </CardBody>
            <CardFooter>
              <Col md="12">
                <Row>
                  <Col className="text-center btn-search">
                    <div>
                      <Button className="icon-search btn btn-primary btn btn-secondary mr-3" onClick={() => this.handleSave()}>
                        {Constants.MidTid.createAccount}
                      </Button>
                      <Button className="icon-search btn btn-primary btn btn-secondary" onClick={() => this.goToList()}>
                        {Constants.QRCode.cancel}
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Col>
            </CardFooter>
          </Card>
        </Form>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  responseServer: state.mIdTId.responseServer,
  listMerchantCodeName: state.masterMerchant.listMerchantCodeName,
  cacheTerminal: state.terminal.cacheTerminal,
  listTerminalPlace: state.terminal.listTerminalPlace,
});

const mapDispatchToProps = (dispatch) => ({
  addMidTid: (data) => dispatch(addMidTid(data)),
  getMerchantCodeName: (data) => dispatch(getMerchantCodeName(data)),
  getCacheTerminal: (data) => dispatch(getCacheTerminal(data)),
  getTerminalPlace: (data) => dispatch(getTerminalPlace(data)),
  clearMerchantCodeName: () => dispatch(clearMerchantCodeName()),
});

AddMidTid.defaultProps = {
  addMidTid: () => {},
  getTerminalPlace: () => {},
  getCacheTerminal: () => {},
  getMerchantCodeName: () => {},
  cacheTerminal: [],
  listTerminalPlace: [],
  responseServer: {},
  history: {},
  clearMerchantCodeName: () => {},
};

AddMidTid.propTypes = {
  addMidTid: PropTypes.func,
  getTerminalPlace: PropTypes.func,
  getCacheTerminal: PropTypes.func,
  getMerchantCodeName: PropTypes.func,
  responseServer: PropTypes.object,
  cacheTerminal: PropTypes.array,
  listTerminalPlace: PropTypes.array,
  history: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddMidTid));
