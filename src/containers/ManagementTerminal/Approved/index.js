import React, {Component} from 'react';
import {withRouter,} from 'react-router-dom';
import {Button, Card, CardBody, CardFooter, CardHeader, Col, FormGroup, Row,} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getMerchantDetail,} from '../../../store/actions/masterMerchant/masterMerchant';
import {approvedTerminal, getCacheTerminal, getTerminalDetail,} from '../../../store/actions/terminal/terminal';

import Constants from '../Constants';
import BusinessInfo from './BusinessInfo';
import DevelopmentBranch from './DevelopmentBranch';
import TerminalInfo from './TerminalInfo';
import BeneficiaryAccount from './BeneficiaryAccount';
import ContactInfo from './ContactInfo';
import NotificationType from './NotificationType';
import {messageError, messageSuccess} from '../../../utils';
import Refuse from './modal/Refuse';

class ApprovedMerchant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModalDenied: false,
      arrDeniedDesc: Constants.MerchantDetail.arrayDenied,
    };
  }

  componentDidMount() {
    const {
      getMerchantDetail,
      getCacheTerminal,
      getTerminalDetail,
    } = this.props;
    if (localStorage.getItem('MERCHANT_CODE') && localStorage.getItem('ID_TERMINAL')) {
      getMerchantDetail({
        merchantCode: JSON.parse(window.atob(localStorage.getItem('MERCHANT_CODE'))),
        type: '0',
      });
      getCacheTerminal({
        merchantCode: JSON.parse(window.atob(localStorage.getItem('MERCHANT_CODE'))),
        status: '1',
        terminalBranchId: '',
      });
      getTerminalDetail({
        merchantId: JSON.parse(window.atob(localStorage.getItem('ID_MERCHANT_TERMINAL'))),
        terminalId: JSON.parse(window.atob(localStorage.getItem('ID_TERMINAL'))),
        type: '0',
      });
    }
  }

  static getDerivedStateFromProps(props) {
    const {
      terminalDetail,
    } = props;
    return {
      terminalDetail,
    };
  }

  componentDidUpdate(prevProps) {
    const {
      responseServer,
      responseServerApproved,
      history,
    } = this.props;
    if (responseServer !== prevProps.responseServer) {
      if (responseServer.code !== '00') {
        messageError(responseServer.description);
      } else {
        history.goBack();
        messageSuccess('Từ chối Terminal thành công');
      }
    }

    if (responseServerApproved !== prevProps.responseServerApproved) {
      if (responseServerApproved.code !== '00') {
        messageError(responseServerApproved.description);
      } else {
        history.goBack();
        messageSuccess('Duyệt Terminal thành công');
      }
    }
  }

  toggleModalDenied = () => {
    const { isShowModalDenied } = this.state;
    this.setState({
      isShowModalDenied: !isShowModalDenied,
    });
  };

  openDeniedMerchant = () => {
    this.toggleModalDenied();
  };

  approved = () => {
    const { terminalDetail } = this.state;
    const {
      approvedTerminal,
    } = this.props;
    const params = {
      terminalId: terminalDetail && terminalDetail.terminalBean
        && terminalDetail.terminalBean.terminalId,
      merchantId: terminalDetail && terminalDetail.terminalBean
        && terminalDetail.terminalBean.merchantId,
      processUser: 'string',
      terminalAppUser: terminalDetail && terminalDetail.terminalBean
        && terminalDetail.terminalBean.terminalAppUser,
      terminalAppPassword: '',
      terminalLevel: terminalDetail && terminalDetail.terminalBean
        && terminalDetail.terminalBean.levelTerminal,
    };
    approvedTerminal(params);
  };

  render() {
    const {
      history,
    } = this.props;
    const {
      isShowModalDenied,
      arrDeniedDesc,
      merchantApproved,
    } = this.state;
    return (
      <div className="my-requests">
        <Card className="card-my-requests">
          <CardHeader>
            <Col xs="12">
              <FormGroup style={{ marginBottom: 0 }} row>
                <Col lg="6" style={{ paddingLeft: 0 }}>
                  <span className="text-bold">{Constants.MnTerminal.terminalDetail}</span>
                </Col>
              </FormGroup>
            </Col>
          </CardHeader>
          <CardBody>
            <Row>
              <Col className="col-md-6 col-12">
                <TerminalInfo />
                <BeneficiaryAccount />
                <NotificationType />
                <ContactInfo />
              </Col>
              <Col className="col-md-6 col-12">
                <BusinessInfo />
                <DevelopmentBranch />
              </Col>
            </Row>
          </CardBody>
          <CardFooter>
            <Col md="12">
              <Row>
                <Col className="text-center btn-search">
                  <div>
                    <Button onClick={history.goBack} onKeyPress={history.goBack} title="Về danh sách" className="btn bggrey bigger-150 mr-3 text-white">
                      <i className="fa fa-arrow-left mr-2" aria-hidden="true" />
                      {Constants.btnMerchant.comeBackList}
                    </Button>
                    <Button className="icon-search btn btn-primary btn btn-secondary mr-3" onClick={() => this.openDeniedMerchant()}>
                      {Constants.MerchantDetail.denied}
                    </Button>
                    <Button className="icon-search btn btn-primary btn btn-secondary mr-3" onClick={this.approved}>
                      {Constants.MerchantDetail.approved}
                    </Button>
                  </div>
                </Col>
              </Row>
            </Col>
          </CardFooter>
        </Card>
        {
          isShowModalDenied
          && (
            <div>
              <Refuse
                toggleModalDenied={this.toggleModalDenied}
                isShowModalDenied={isShowModalDenied}
                arrDeniedDesc={arrDeniedDesc}
                merchantApproved={merchantApproved}
                history={history}
              />
            </div>
          )
        }
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  responseServer: state.terminal.responseServer,
  responseServerApproved: state.terminal.responseServerApproved,
  merchantDetail: state.masterMerchant.merchantDetail,
  terminalDetail: state.terminal.terminalDetail,
});

const mapDispatchToProps = (dispatch) => ({
  getMerchantDetail: (data) => dispatch(getMerchantDetail(data)),
  getTerminalDetail: (data) => dispatch(getTerminalDetail(data)),
  getCacheTerminal: (data) => dispatch(getCacheTerminal(data)),
  approvedTerminal: (data) => dispatch(approvedTerminal(data)),
});

ApprovedMerchant.defaultProps = {
  getMerchantDetail: () => {},
  getTerminalDetail: () => {},
  approvedMerchant: () => {},
  merchantDetail: {},
  responseServer: {},
  responseServerApproved: {},
  history: {},
};

ApprovedMerchant.propTypes = {
  getMerchantDetail: PropTypes.func,
  getTerminalDetail: PropTypes.func,
  responseServer: PropTypes.object,
  responseServerApproved: PropTypes.object,
  history: PropTypes.object,
  merchantDetail: PropTypes.object,
  approvedMerchant: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ApprovedMerchant));
