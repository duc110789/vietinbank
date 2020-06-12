/* eslint-disable max-len */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Button, Card, CardBody, CardFooter, CardHeader, Col, Collapse, FormGroup, Label, Row,
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getMerchantCodeName } from '../../../store/actions/masterMerchant/masterMerchant';
import { getCacheTerminal, getTerminalPlace } from '../../../store/actions/terminal/terminal';
import { getUserInfo } from '../../../store/actions/mIdTid/mIdTid';
import { convertAccountTypeMidTid, convertRegisterChannel, getListMerchantStatusUser } from '../../../utils/commonFunction';
import Constants from '../Constants';

class DetailAccountWebApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpenInfo: true,
      isOpenInfoTerminal: true,
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
      cacheTerminal,
      listTerminalPlace,
      detailMidTid,
    } = props;

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
      cacheTerminal: updateCacheTerminal,
      listTerminalPlace: updateListTerminalPlace,
      detailMidTid,
    };
  }

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

  showBranch = (detailMidTid, name) => {
    const listBranch = [];
    if (detailMidTid.length) {
      for (let i = 0; i < detailMidTid.length; i += 1) {
        if (i === 0) {
          listBranch.push(
            <Col md="6" className="mb-2">
              <Label>{name}</Label>
            </Col>,
          );
        } else {
          listBranch.push(
            <Col md="6" className="mb-2">
              <Label />
            </Col>,
          );
        }
        if (name === 'Chi nhánh Merchant') {
          listBranch.push(
            <Col md="6" className="mb-2" key={i}>
              <Label>
                {detailMidTid[i].branchName}
              </Label>
            </Col>,
          );
        } else {
          listBranch.push(
            <Col md="6" className="mb-2" key={i}>
              <Label>
                {detailMidTid[i].terminalName}
              </Label>
            </Col>,
          );
        }
      }
    }
    return listBranch;
  };

  render() {
    const {
      isOpenInfo,
      isOpenInfoTerminal,
      detailMidTid,
    } = this.state;
    const { history } = this.props;

    return (
      <div className="my-requests">
        <div className="widget-box transparent">
          <Card className="card-my-requests">
            <CardHeader>
              <Col xs="12">
                <FormGroup style={{ marginBottom: 0 }} row>
                  <Col lg="12" style={{ paddingLeft: 0 }}>
                    <span className="text-bold">{Constants.MidTid.detailTitleMidTid}</span>
                  </Col>
                </FormGroup>
              </Col>
            </CardHeader>
            <CardBody>
              <div className="col-md-12">
                <div className="widget-box transparent">
                  <div className="widget-header widget-header-flat" role="presentation" onClick={this.handOpenInfo} onKeyPress={this.handOpenInfo}>
                    <span className="text-bold">{Constants.MidTid.accountInfo}</span>
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
                          <Col lg="6">
                            <FormGroup row>
                              <Col md="6" className="mb-2">
                                <Label>{Constants.MidTid.userName}</Label>
                              </Col>
                              <Col md="6" className="mb-2">
                                <Label>{detailMidTid.data && detailMidTid.data.userName}</Label>
                              </Col>
                              <Col md="6" className="mb-2">
                                <Label>{Constants.MidTid.email}</Label>
                              </Col>
                              <Col md="6" className="mb-2">
                                <Label>{detailMidTid.data && detailMidTid.data.email}</Label>
                              </Col>
                              <Col md="6" className="mb-2">
                                <Label>{Constants.MidTid.masterMerchant}</Label>
                              </Col>
                              <Col md="6" className="mb-2">
                                <Label>Vietinbank</Label>
                              </Col>
                              <Col md="6" className="mb-2">
                                <Label>{Constants.MidTid.merchant}</Label>
                              </Col>
                              <Col md="6" className="mb-2">
                                <Label>{detailMidTid.data && detailMidTid.data.merchantName}</Label>
                              </Col>
                              { detailMidTid.data && detailMidTid.data.listBranchUser.length
                                ? this.showBranch(detailMidTid.data.listBranchUser, Constants.MidTid.terminalBranch) : '' }
                              <Col md="6" className="mb-2">
                                <Label>{Constants.MidTid.terminalApp}</Label>
                              </Col>
                              <Col md="6" className="mb-2">
                                <Label>{detailMidTid.data && detailMidTid.data.terminalNameApp}</Label>
                              </Col>
                              { detailMidTid.data && detailMidTid.data.listTidWeb.length
                                ? this.showBranch(detailMidTid.data.listTidWeb, Constants.MidTid.terminalWeb) : '' }
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup row>
                              <Col md="6" className="mb-2">
                                <Label>{Constants.MidTid.accountType}</Label>
                              </Col>
                              <Col md="6" className="mb-2">
                                <Label>
                                  {
                                    convertAccountTypeMidTid(detailMidTid.data && detailMidTid.data.typeAccount)
                                  }
                                </Label>
                              </Col>
                              <Col md="6" className="mb-2">
                                <Label>{Constants.MidTid.registerChannel}</Label>
                              </Col>
                              <Col md="6" className="mb-2">
                                <Label>
                                  {
                                    convertRegisterChannel(detailMidTid.data && detailMidTid.data.channelRegister)
                                  }
                                </Label>
                              </Col>
                              <Col md="6" className="mb-2">
                                <Label>{Constants.MidTid.iniDate}</Label>
                              </Col>
                              <Col md="6" className="mb-2">
                                <Label>{detailMidTid.data && detailMidTid.data.createdDate}</Label>
                              </Col>
                              <Col md="6" className="mb-2">
                                <Label>{Constants.MidTid.status}</Label>
                              </Col>
                              <Col md="6" className="mb-2">
                                <Label>{getListMerchantStatusUser(detailMidTid && detailMidTid.data && detailMidTid.data.status)}</Label>
                              </Col>
                            </FormGroup>
                          </Col>
                        </FormGroup>
                      </CardBody>
                    </Card>
                  </Collapse>
                </div>
              </div>
              <div className="col-md-12">
                <div className="widget-box transparent">
                  <div className="widget-header widget-header-flat" role="presentation" onClick={this.handOpenInfoTerminal} onKeyPress={this.handOpenInfoTerminal}>
                    <span className="text-bold">{Constants.MidTid.activeHistory}</span>
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
                        <Row>
                          <Col className="text-center">
                            <div className="fee-table_table w-100 overflow-auto">
                              <table className="fee-table__table">
                                <thead>
                                  <tr>
                                    <th style={{ textAlign: 'left' }}>imei</th>
                                    <th>iOS</th>
                                    <th>Device</th>
                                    <th>DeviceID</th>
                                    <th>IP request</th>
                                    <th>Active Date</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {(detailMidTid.data && detailMidTid.data.listHisActiveUserApp
                                    && detailMidTid.data.listHisActiveUserApp.length)
                                    ? (detailMidTid.data.listHisActiveUserApp.map((item, index) => (
                                      <tr key={index}>
                                        <td>{item.imei}</td>
                                        <td>{item.os}</td>
                                        <td>{item.pm}</td>
                                        <td>{item.clientId}</td>
                                        <td>{item.requestIP}</td>
                                        <td>{item.activatedTime}</td>
                                      </tr>
                                    ))) : null}
                                </tbody>
                              </table>
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Collapse>
                </div>
              </div>
            </CardBody>
            <CardFooter>
              <Col md="12">
                <Row>
                  <Col className="text-center">
                    <div>
                      <Button className="icon-search btn btn-primary btn btn-secondary" onClick={history.goBack}>
                        {Constants.MidTid.goBackList}
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Col>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  detailMidTid: state.mIdTId.detailMidTid,
  listMerchantCodeName: state.masterMerchant.listMerchantCodeName,
  cacheTerminal: state.terminal.cacheTerminal,
  listTerminalPlace: state.terminal.listTerminalPlace,
});

const mapDispatchToProps = (dispatch) => ({
  getUserInfo: (data) => dispatch(getUserInfo(data)),
  getMerchantCodeName: (data) => dispatch(getMerchantCodeName(data)),
  getCacheTerminal: (data) => dispatch(getCacheTerminal(data)),
  getTerminalPlace: (data) => dispatch(getTerminalPlace(data)),
});

DetailAccountWebApp.defaultProps = {
  getUserInfo: () => {},
  getTerminalPlace: () => {},
  getCacheTerminal: () => {},
  cacheTerminal: [],
  listTerminalPlace: [],
  history: {},
};

DetailAccountWebApp.propTypes = {
  getUserInfo: PropTypes.func,
  getTerminalPlace: PropTypes.func,
  getCacheTerminal: PropTypes.func,
  getMerchantCodeName: PropTypes.func,
  cacheTerminal: PropTypes.array,
  listTerminalPlace: PropTypes.array,
  history: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DetailAccountWebApp));
