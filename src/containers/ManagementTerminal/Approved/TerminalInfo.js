import React from 'react';
import {Card, CardBody, Col, Collapse, FormGroup, Label, Row,} from 'reactstrap';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Input from 'react-validation/build/input';
import Form from 'react-validation/build/form';
import {getAllStaffByDepartment,} from '../../../store/actions/system/systemModuleAction';
import Constants from '../Constants';
import {getStatusUI,} from '../../../utils/commonFunction';

class TerminalInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenInfo: true,
      isOpenInfoOriginal: true,
      terminalID: '',
      terminalName: '',
      serviceCode: '',
      websiteEcommerce: '',
      businessAddress: '',
      optionMccInternational: '',
      productBusinessDesciption: '',
      optionMccInterior: '',
      facebook: '',
      isBranchTerminal: 1,
      developmentUnit: '',
      staffByDepartment: '',
      visaPan: '',
      masterCartPan: '',
      jCBPan: '',
    };
  }

  static getDerivedStateFromProps(props, state) {
    const {
      cacheTerminal,
      terminalDetail,
    } = props;

    const updateCacheTerminal = [];
    if (cacheTerminal) {
      for (let i = 0; i < cacheTerminal.length; i += 1) {
        updateCacheTerminal.push({
          value: cacheTerminal[i].id,
          label: `${cacheTerminal[i].terminalId} - ${cacheTerminal[i].terminalName}`,
        });
      }
    }

    let cacheTerminalDetail = [];
    if (
      (terminalDetail && terminalDetail.terminalBean !== undefined)
      && (
        terminalDetail && terminalDetail.terminalBean
        && terminalDetail.terminalBean.branchTerminalId !== null
      )
    ) {
      cacheTerminalDetail = cacheTerminal.filter(
        (item) => item.id === terminalDetail.terminalBean.branchTerminalId,
      );
    }

    return {
      cacheTerminal: updateCacheTerminal,
      terminalDetail,
      cacheTerminalDetail,
    };
  }

  componentDidUpdate(prevProps) {
    const {
      terminalDetail,
    } = this.props;

    if (terminalDetail !== prevProps.terminalDetail) {
      const terminalDetailBeean = terminalDetail && terminalDetail.terminalBean;
      this.setState({
        terminalID: terminalDetail && terminalDetail.terminalBean && terminalDetail.terminalBean.terminalId,
        terminalName: terminalDetailBeean && terminalDetailBeean.terminalName,
        serviceCode: terminalDetailBeean && terminalDetailBeean.serviceCode,
        websiteEcommerce: terminalDetailBeean && terminalDetailBeean.website,
        businessAddress: terminalDetailBeean && terminalDetailBeean.businessAddress,
        optionMccInternational: {
          value: terminalDetailBeean && terminalDetailBeean.mccQT && terminalDetailBeean.mccQT.merchantTypeId,
          label: `${terminalDetailBeean && terminalDetailBeean.mccQT && terminalDetailBeean.mccQT.merchantTypeName}`,
        },
        productBusinessDesciption: terminalDetailBeean && terminalDetailBeean.productDescription,
        optionMccInterior: {
          value: terminalDetailBeean && terminalDetailBeean && terminalDetailBeean.mccND.mccId,
          label: `${terminalDetailBeean && terminalDetailBeean && terminalDetailBeean.mccND.mccName}`,
        },
        facebook: terminalDetailBeean && terminalDetailBeean.facebook,
        developmentUnit: {
          value: terminalDetailBeean && terminalDetailBeean.departmentBean && terminalDetailBeean.departmentBean.departmentId,
          label: terminalDetailBeean && terminalDetailBeean.departmentBean && terminalDetailBeean.departmentBean.departmentName
            ? `${terminalDetailBeean && terminalDetailBeean.departmentBean && terminalDetailBeean.departmentBean.departmentName}` : '',
        },
        staffByDepartment: {
          value: terminalDetailBeean && terminalDetailBeean.staffBean && terminalDetailBeean.staffBean.staffId,
          label: terminalDetailBeean && terminalDetailBeean.staffBean && terminalDetailBeean.staffBean.staffName
            ? `${terminalDetailBeean && terminalDetailBeean.staffBean && terminalDetailBeean.staffBean.staffCode}
            -${terminalDetailBeean && terminalDetailBeean.staffBean && terminalDetailBeean.staffBean.staffName}` : '',
        },
        visaPan: terminalDetailBeean && terminalDetailBeean.visaPan,
        masterCartPan: terminalDetailBeean && terminalDetailBeean.masterPan,
        jCBPan: terminalDetailBeean && terminalDetailBeean.jcbPan,
      });
    }
  }

  getListTerminaltatus = (itemCode) => {
    const listTerminalStatus = JSON.parse(localStorage && localStorage.getItem('TERMINAL'));
    const status = getStatusUI(listTerminalStatus, itemCode);
    return status;
  };

  handOpenInfo = () => {
    const { isOpenInfo } = this.state;
    this.setState({
      isOpenInfo: !isOpenInfo,
    });
  };

  handOpenInfoOriginal = () => {
    const { isOpenInfoOriginal } = this.state;
    this.setState({
      isOpenInfoOriginal: !isOpenInfoOriginal,
    });
  };

  render() {
    const {
      isOpenInfo,
      isOpenInfoOriginal,
      terminalDetail,
      terminalID,
      terminalName,
      serviceCode,
      websiteEcommerce,
      businessAddress,
      optionMccInternational,
      productBusinessDesciption,
      optionMccInterior,
      facebook,
      developmentUnit,
      staffByDepartment,
      visaPan,
      masterCartPan,
      jCBPan,
      cacheTerminalDetail,
    } = this.state;

    return (
      <Form ref={(terminalInfo) => { this.form = terminalInfo; }}>
        <Row>
          <div className="col-md-12 ">
            <div className="widget-box transparent mb-0">
              <div className="widget-header widget-header-flat" role="presentation" onClick={this.handOpenInfo} onKeyPress={this.handOpenInfo}>
                <span className="text-bold">{Constants.MnMerchant.terminalTitle}</span>
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
            </div>
            <Collapse isOpen={isOpenInfo} className="show-information">
              <Card>
                <CardBody>
                  <FormGroup row>
                    <Col lg="5">
                      <Label style={{ color: 'red' }}>
                        {Constants.MnTerminal.level}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <FormGroup row className="mb-0">
                        <FormGroup className="col-md-6 text-danger">
                          <Input
                            type="radio"
                            name="terminal"
                            onClick={this.handleChangeBranch}
                            disabled
                            checked={
                              terminalDetail ? terminalDetail.terminalBean
                              && terminalDetail.terminalBean.levelTerminal === '1' : ''
                            }
                          />
                          <span className="ml-1">{Constants.MnTerminal.branch}</span>
                        </FormGroup>
                        <FormGroup className="col-md-6 text-danger">
                          <Input
                            type="radio"
                            name="terminal"
                            onClick={this.handleChangeTerminal}
                            disabled
                            checked={
                              terminalDetail ? terminalDetail.terminalBean
                              && terminalDetail.terminalBean.levelTerminal === '2' : ''
                            }
                          />
                          <span className="ml-1">{Constants.MnTerminal.pointSale}</span>
                        </FormGroup>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label style={{ color: 'red' }}>
                        {Constants.MnTerminal.titleInfoTerminal}
                        {' '}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>{ cacheTerminalDetail && cacheTerminalDetail.length ? cacheTerminalDetail[0].terminalName : '' }</Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.terminalID}
                        {' '}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>{terminalID}</Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.terminalName}
                        {' '}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>{terminalName}</Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.serviceCode}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>{serviceCode}</Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.websiteEcommerce}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>{websiteEcommerce}</Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.businessAddress}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>{businessAddress}</Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.nationalMCC}
                        {' '}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>{optionMccInternational ? optionMccInternational.label : ''}</Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.productBusinessDesciption}
                        {' '}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>{productBusinessDesciption}</Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.inlandMCC}
                        {' '}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>{ optionMccInterior ? optionMccInterior.label : '' }</Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.facebook}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>{facebook}</Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label className="text-danger">
                        {Constants.MnMerchant.status}
                        {' '}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>
                        {terminalDetail && terminalDetail.terminalBean ? this.getListTerminaltatus(terminalDetail && terminalDetail.terminalBean && terminalDetail.terminalBean.status) : ''}
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label className="text-danger">
                        {Constants.MnMerchant.developmentUnit}
                        {' '}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>{developmentUnit ? developmentUnit.label : '' }</Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label className="text-danger">
                        {Constants.MnMerchant.staff}
                        {' '}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Label>{staffByDepartment ? staffByDepartment.label : ''}</Label>
                    </Col>
                  </FormGroup>
                </CardBody>
              </Card>
            </Collapse>
          </div>
          <div className="col-md-12">
            <div className="widget-box transparent">
              <div
                className="widget-header widget-header-flat"
                role="presentation"
                onClick={this.handOpenInfoOriginal}
                onKeyPress={this.handOpenInfoOriginal}
              >
                <span className="text-bold">{Constants.MnMerchant.mccInfo}</span>
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
              <Collapse isOpen={isOpenInfoOriginal} className="show-information">
                <Card>
                  <CardBody>
                    <FormGroup row>
                      <Col lg="5">
                        <Label>
                          {Constants.MnMerchant.visaPan}
                          {' '}
                        </Label>
                      </Col>
                      <Col lg="7">
                        <Label>{visaPan}</Label>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col lg="5">
                        <Label>
                          {Constants.MnMerchant.masterCartPan}
                          {' '}
                        </Label>
                      </Col>
                      <Col lg="7">
                        <Label>{masterCartPan}</Label>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col lg="5">
                        <Label>
                          {Constants.MnMerchant.jCBPan}
                          {' '}
                        </Label>
                      </Col>
                      <Col lg="7">
                        <Label>{jCBPan}</Label>
                      </Col>
                    </FormGroup>
                  </CardBody>
                </Card>
              </Collapse>
            </div>
          </div>
        </Row>
      </Form>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  cacheTerminal: state.terminal.cacheTerminal,
  terminalDetail: state.terminal.terminalDetail,
});

const mapDispatchToProps = (dispatch) => ({
  getAllStaffByDepartment: (data) => dispatch(getAllStaffByDepartment(data)),
});

TerminalInfo.defaultProps = {
  passTerminalInfo: () => {},
  getAllStaffByDepartment: () => {},
  cacheTerminal: [],
  terminalDetail: {},
};

TerminalInfo.propTypes = {
  cacheTerminal: PropTypes.array,
  terminalDetail: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TerminalInfo));
