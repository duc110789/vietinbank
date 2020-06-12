/* eslint-disable max-len */
import React, {Component} from 'react';
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
import {getMerchantCodeName} from '../../../store/actions/masterMerchant/masterMerchant';
import {getCacheTerminal, getTerminalPlace} from '../../../store/actions/terminal/terminal';
import {editMidTid, getUserInfo} from '../../../store/actions/mIdTid/mIdTid';

import {
  checkContainSpace,
  checkEmailFormat,
  checkPhoneNumber,
  checkRequiredInput,
  checkRequiredSelect,
} from '../../../components/Input/validation';
import Constants from '../Constants';
import {messageError} from '../../../utils';

class EditAccountWebApp extends Component {
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
      userName: '',
      typeAccount: 0,
      email: '',
      arrayCheckedWeb: [],
      arrayExpandedWeb: ['0'],
      arrayCheckedApp: [],
      arrayExpandedApp: ['0'],
      isClearable: true
    };
  }

  componentDidMount() {
    const {
      getMerchantCodeName,
      getUserInfo,
    } = this.props;

     getMerchantCodeName({
      status: '1',
    });

    if (window.localStorage.getItem('ID_USER_MIDTID')) {
      getUserInfo({
        userId: JSON.parse(window.atob(window.localStorage.getItem('ID_USER_MIDTID'))),
      });
    }
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
          label: `${cacheTerminal[i].id} - ${cacheTerminal[i].terminalName}`,
          id: cacheTerminal[i].id,
        });
      }
    }

    const updateListTerminalPlace = [];
    if (listTerminalPlace) {
      for (let i = 0; i < listTerminalPlace.length; i += 1) {
        updateListTerminalPlace.push(
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
      listTerminalPlace: updateListTerminalPlace,
      allNodes,
    };
  }

  componentDidUpdate(prevProps) {
    const {
      responseServer,
      detailMidTid,
      getCacheTerminal,
      getTerminalPlace,
      history,
    } = this.props;
    if (responseServer !== prevProps.responseServer) {
      if (responseServer.code !== '00') {
        messageError(responseServer.description);
      } else {
        history.push({
          pathname: '/system/accountwebapp/list',
        });
      }
    }
    if (detailMidTid !== prevProps.detailMidTid) {
      let arrTidWeb = [];
      if (
        detailMidTid.data
        && detailMidTid.data.listTidWeb
        && detailMidTid.data.listTidWeb.length
      ) {
        arrTidWeb = detailMidTid.data.listTidWeb.map((item) => ({
          value: item.terminalId,
          label: item.terminalName,
          terminalId: item.terminalId,
          branchId: item.branchId,
        }));
      }
      let arrBranchUser = [];
      if (
        detailMidTid.data
        && detailMidTid.data.listBranchUser
        && detailMidTid.data.listBranchUser.length
      ) {
        arrBranchUser = detailMidTid.data.listBranchUser.map((item) => ({
          value: item.branchId,
          label: `${item.branchId}-${item.branchName}`,
          branchId: item.branchId,
          branchName: item.branchName,
        }));
      }
      this.setState({
        merchantCode: detailMidTid && detailMidTid.data && {
          value: detailMidTid.data.merchantCode,
          label: `${detailMidTid.data.merchantCode}-${detailMidTid.data.merchantName}`,
          id: detailMidTid.data.merchantId,
        },
        userName: detailMidTid && detailMidTid.data && detailMidTid.data.userName,
        typeAccount: detailMidTid && detailMidTid.data && detailMidTid.data.typeAccount,
        email: detailMidTid && detailMidTid.data && detailMidTid.data.email,
        terminalBranch: arrBranchUser,
        terminalWeb: arrTidWeb,
        terminalApp: {
          branchId: detailMidTid.data.branchIdApp || '',
          terminalId: detailMidTid.data.terminalIdApp || '',
          value: detailMidTid.data.terminalIdApp || '',
          label: `${detailMidTid.data.terminalIdApp}-${detailMidTid.data.terminalNameApp}` || '',
        },
        arrayCheckedWeb: detailMidTid.data.roleWeb ? detailMidTid.data.roleWeb.split(',') : [],
        arrayCheckedApp: detailMidTid.data.roleApp ? detailMidTid.data.roleApp.split(',') : [],
      }, () => {
        if (this.state.merchantCode.value) {
          getCacheTerminal({
            merchantCode: this.state.merchantCode.value,
            status: '1',
            terminalBranchId: '',
          });
        }

        if (detailMidTid && detailMidTid.data && detailMidTid.data.branchMidId) {
          getTerminalPlace({
            merchantCode: this.state.merchantCode.value,
            status: '1',
            terminalBranchId: detailMidTid.data.branchMidId,
          });
        }
      });
    }
  }

  handleChangeMerchant = (merchantCodeOption) => {
    const {
      getCacheTerminal,
    } = this.props;

    this.setState({
      merchantCode: merchantCodeOption,
    }, () => {
      getCacheTerminal({
        merchantCode: merchantCodeOption.value,
        status: '1',
        terminalBranchId: '',
        allTerminal: true,
      });
    });
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
    if (!cacheTerminalOption) {
      this.setState({
        terminalApp: [],
      });
    }
  };

  handleChangeNumberPhone = (event) => {
    this.setState({
      userName: event.target.value,
    });
  };

  handleChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  onChangeTerminalBranch = (event) => {
    const {
      merchantCode,
      terminalWeb,
      terminalApp,
    } = this.state;
    if (terminalWeb.length || terminalApp.length) {
      this.setState({
        terminalApp: [],
        terminalWeb: [],
      });
    }
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
    if(!event){
      this.setState({
        terminalApp: {},
        terminalWeb: {}
      })
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
      userName,
      typeAccount,
      email,
      terminalApp,
      terminalWeb,
      arrayCheckedWeb,
      arrayCheckedApp,
      listTerminalPlace,
    } = this.state;

    const { detailMidTid } = this.props;
    this.setState({
      validateForm: true,
    });
    this.form.validateAll();
    const { editMidTid } = this.props;

    let arrListTid = [];
    if (terminalWeb) {
      if ((terminalWeb.length > listTerminalPlace.length) && (listTerminalPlace.length > 0)) {
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
      userId: detailMidTid.data && detailMidTid.data.id,
      merchantId: merchantCode && merchantCode.id,
      userName,
      typeAccount,
      email,
      listTid: arrListTid,
      branchIdApp: terminalApp.branchId,
      terminalIdApp: terminalApp.terminalId,
      roleWeb: arrayCheckedWeb.toString(),
      roleApp: arrayCheckedApp.toString(),
    };
    const errors = this.form.getChildContext()._errors.length;

    if (typeAccount === 1) {
      if (
        errors === 0 && dataAddMidTid.roleApp.length && dataAddMidTid.roleWeb.length
      ) {
        editMidTid(dataAddMidTid);
      }
    } else if (typeAccount === 2) {
      if (
        errors === 0 && dataAddMidTid.listTid.length && dataAddMidTid.branchIdApp
        && dataAddMidTid.terminalIdApp && dataAddMidTid.roleApp.length && dataAddMidTid.roleWeb.length
      ) {
        editMidTid(dataAddMidTid);
      }
    } else if (typeAccount === 3) {
      if (
        errors === 0 && dataAddMidTid.roleApp.length && dataAddMidTid.roleWeb.length
      ) {
        editMidTid(dataAddMidTid);
      }
    }
  };

  showBranch = (detailMidTid) => {
    const listBranch = [];
    if (detailMidTid.length) {
      for (let i = 0; i < detailMidTid.length; i += 1) {
        listBranch.push(
          <div key={i}>
            <Label>
              {detailMidTid[i].branchName}
            </Label>
          </div>,
        );
      }
    }
    return listBranch;
  };

  render() {
    const {
      listMerchantCodeName,
      cacheTerminal,
      validateForm,
      merchantCode,
      userName,
      typeAccount,
      email,
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
      isClearable
    } = this.state;
    const { history, detailMidTid } = this.props;
    return (
      <div className="my-requests">
        <Form className="widget-box transparent" ref={(editMidTId) => { this.form = editMidTId; }}>
          <Card className="card-my-requests">
            <CardHeader>
              <Col xs="12">
                <FormGroup style={{ marginBottom: 0 }} row>
                  <Col lg="12" style={{ paddingLeft: 0 }}>
                    <span className="text-bold">{Constants.MidTid.edittitleMidTid}</span>
                  </Col>
                </FormGroup>
              </Col>
            </CardHeader>
            <CardBody>
              <Row>
                <Col className="col-md-2 col-2" />
                <Col className="col-md-8 col-8">
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
                        onChange={this.handleChangeMerchant}
                        options={listMerchantCodeName}
                        placeholder="Chọn Merchant"
                        value={merchantCode}
                        isDisabled
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="6">
                      <Label>
                        {Constants.MidTid.userName}
                        {' '}
                        <span className="text-danger">*</span>
                      </Label>
                    </Col>
                    <Col lg="6">
                      {
                        (typeAccount === 1 || typeAccount === 3) ? (
                          <Input
                            type="text"
                            label={Constants.MnMerchant.phoneNumber}
                            className="form-control"
                            placeholder="Số điện thoại"
                            name="code"
                            value={userName}
                            disabled
                          />
                        ) : null
                      }
                      {
                        (typeAccount === 2) && (
                          <>
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
                              value={userName}
                              disabled
                            />
                          </>
                        )
                      }
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
                        value={email}
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
                      {
                        (typeAccount === 1) ? (
                          <Select
                            isClearable={isClearable}
                            value={{
                              value: 0,
                              label: 'Tất cả',
                            }}
                            isDisabled
                          />
                        ) : ('')
                      }
                      {
                        (typeAccount === 2) ? (
                          <>
                            <Select
                              isClearable={isClearable}
                              options={cacheTerminal}
                              onChange={this.onChangeTerminalBranch}
                              placeholder="Chọn"
                              value={terminalBranch}
                            />
                            {
                              validateForm && checkRequiredSelect(terminalBranch && terminalBranch.length,
                                Constants.MidTid.terminalBranch)
                            }
                          </>
                        ) : ('')
                      }
                      {
                        (typeAccount === 3) ? (
                          <div>
                            { detailMidTid.data && detailMidTid.data.listBranchUser.length
                              ? this.showBranch(detailMidTid.data.listBranchUser, Constants.MidTid.terminalBranch) : '' }
                          </div>
                        ) : ('')
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
                            {
                              (typeAccount === 1 || typeAccount === 3) ? (
                                <Select
                                  isClearable={isClearable}
                                  value={{
                                    value: 0,
                                    label: 'Tất cả',
                                  }}
                                  isDisabled
                                />
                              ) : (
                                <>
                                  <MultiSelect
                                    isClearable={isClearable}
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
                                </>
                              )
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
                                Constants.MidTid.webFunction)
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
                            {
                              (typeAccount === 1 || typeAccount === 3) ? (
                                <Select
                                  isClearable={isClearable}
                                  value={{
                                    value: 0,
                                    label: 'Tất cả',
                                  }}
                                  isDisabled
                                />
                              ) : (
                                <>
                                  <Select
                                    isClearable={isClearable}
                                    onChange={this.handleChangeTerminalApp}
                                    options={listTerminalPlace}
                                    placeholder="Chọn"
                                    value={terminalApp}
                                  />
                                  {
                                    validateForm && checkRequiredSelect(terminalApp && terminalApp.value,
                                      Constants.MidTid.pointSale)
                                  }
                                </>
                              )
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
                                Constants.MidTid.webFunction)
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
                        {Constants.MidTid.update}
                      </Button>
                      <Button className="icon-search btn btn-primary btn btn-secondary" onClick={history.goBack}>
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
  detailMidTid: state.mIdTId.detailMidTid,
  listMerchantCodeName: state.masterMerchant.listMerchantCodeName,
  cacheTerminal: state.terminal.cacheTerminal,
  listTerminalPlace: state.terminal.listTerminalPlace,
});

const mapDispatchToProps = (dispatch) => ({
  editMidTid: (data) => dispatch(editMidTid(data)),
  getUserInfo: (data) => dispatch(getUserInfo(data)),
  getMerchantCodeName: (data) => dispatch(getMerchantCodeName(data)),
  getCacheTerminal: (data) => dispatch(getCacheTerminal(data)),
  getTerminalPlace: (data) => dispatch(getTerminalPlace(data)),
});

EditAccountWebApp.defaultProps = {
  editMidTid: () => {},
  getUserInfo: () => {},
  getTerminalPlace: () => {},
  getCacheTerminal: () => {},
  getMerchantCodeName: () => {},
  cacheTerminal: [],
  listTerminalPlace: [],
  responseServer: {},
  history: {},
};

EditAccountWebApp.propTypes = {
  editMidTid: PropTypes.func,
  getUserInfo: PropTypes.func,
  getTerminalPlace: PropTypes.func,
  getCacheTerminal: PropTypes.func,
  getMerchantCodeName: PropTypes.func,
  responseServer: PropTypes.object,
  cacheTerminal: PropTypes.array,
  listTerminalPlace: PropTypes.array,
  history: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditAccountWebApp));
