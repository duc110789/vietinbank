import React, {Component} from 'react';
import {withRouter,} from 'react-router-dom';
import {Button, Card, CardBody, CardFooter, CardHeader, Col, FormGroup, Row,} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import {getMerchantDetail,} from '../../../store/actions/masterMerchant/masterMerchant';
import {getCacheTerminal, getTerminalDetail,} from '../../../store/actions/terminal/terminal';

import Constants from '../Constants';
import BusinessInfo from './BusinessInfo';
import DevelopmentBranch from './DevelopmentBranch';
import TerminalInfo from './TerminalInfo';
import BeneficiaryAccount from './BeneficiaryAccount';
import ContactInfo from './ContactInfo';
import NotificationType from './NotificationType';
import {messageError} from '../../../utils';

class DetailTerminal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPrint: true,
    };
  }

  componentDidMount() {
    const {
      getTerminalDetail,
    } = this.props;
    if (localStorage.getItem('ID_TERMINAL')) {
      getTerminalDetail({
        merchantId: JSON.parse(window.atob(localStorage.getItem('ID_MERCHANT_TERMINAL'))),
        terminalId: JSON.parse(window.atob(localStorage.getItem('ID_TERMINAL'))),
        type: '0',
      });
    }
  }

  componentDidUpdate(prevProps) {
    const {
      responseServer,
      history,
    } = this.props;
    if (responseServer !== prevProps.responseServer) {
      if (responseServer.code !== '00') {
        messageError(responseServer.description);
      } else {
        history.goBack();
      }
    }
  }

  handlePrint = () => {
    this.setState({
      isPrint: false,
    }, () => {
      window.print();
    });
    setTimeout(() => {
      window.close();
      this.setState({
        isPrint: true,
      });
    }, 100);
  };

  render() {
    const {
      history,
      merchantDetail,
    } = this.props;
    const {
      isPrint,
    } = this.state;
    return (
      <div className="my-requests">
        <div>
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
            { isPrint ? (
              <CardFooter>
                <Col md="12">
                  <Row>
                    <Col className="text-center btn-search">
                      <div>
                        <Button onClick={history.goBack} onKeyPress={history.goBack} title="Về danh sách" className="btn bggrey bigger-150 mr-3 text-white">
                          <i className="fa fa-arrow-left mr-2" aria-hidden="true" />
                          {Constants.btnMerchant.comeBackList}
                        </Button>
                        <Button className="icon-search btn btn-primary btn btn-secondary mr-3" onClick={() => this.handlePrint()}>
                          {Constants.MerchantDetail.print}
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </CardFooter>
            ) : null }
          </Card>
        </div>
        { !isPrint ? (
          <div className="clearfix form-actions row">
            <div className="col-md-6 text-left">
              { merchantDetail ? `${merchantDetail.merchantSiteUser}` : ''}
            </div>
            <div className="col-md-6 text-right" id="printTime">
              { moment().format('DD/MM/YYYY') }
            </div>
          </div>
        ) : null }
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  responseServer: state.terminal.responseServer,
  merchantDetail: state.masterMerchant.merchantDetail,
  terminalDetail: state.terminal.terminalDetail,
});

const mapDispatchToProps = (dispatch) => ({
  getMerchantDetail: (data) => dispatch(getMerchantDetail(data)),
  getTerminalDetail: (data) => dispatch(getTerminalDetail(data)),
  getCacheTerminal: (data) => dispatch(getCacheTerminal(data)),
});

DetailTerminal.defaultProps = {
  getMerchantDetail: () => {},
  getTerminalDetail: () => {},
  merchantDetail: {},
  responseServer: {},
  history: {},
};

DetailTerminal.propTypes = {
  getMerchantDetail: PropTypes.func,
  getTerminalDetail: PropTypes.func,
  responseServer: PropTypes.object,
  history: PropTypes.object,
  merchantDetail: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DetailTerminal));
