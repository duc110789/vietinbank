import React, { Component } from 'react';
import {
  withRouter,
} from 'react-router-dom';
import {
  CardHeader,
  CardBody,
  Col,
  FormGroup,
  Card,
  Row,
  CardFooter,
  Button,
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getTerminalDetailDenied,
} from '../../../store/actions/terminal/terminal';

import Constants from '../Constants';
import TerminalInfo from './TerminalInfo';
import MerchantInfo from './MerchantInfo';
import BeneficiaryInfo from './BeneficiaryInfo';
import InternationalInfo from './InternationalInfo';
import ContactInfo from './ContactInfo';
import NotificationType from './NotificationType';
import ReasonReject from './ReasonReject';

class TerminalDetailDenied extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listBranchBank: [],
    };
  }

  componentDidMount() {
    const {
      getTerminalDetailDenied,
    } = this.props;
    getTerminalDetailDenied({
      terminalId: JSON.parse(window.atob(localStorage.getItem('ID_TERMINAL'))),
      merchantId: JSON.parse(window.atob(localStorage.getItem('ID_MERCHANT_TERMINAL'))),
      terDeniendID: JSON.parse(window.atob(localStorage.getItem('ID_TERMINAL_DENIED'))),
    });
  }

  render() {
    const {
      history,
    } = this.props;
    return (
      <div className="my-requests">
        <div>
          <Card className="card-my-requests">
            <CardHeader>
              <Col xs="12">
                <FormGroup style={{ marginBottom: 0 }} row>
                  <Col lg="6" style={{ paddingLeft: 0 }}>
                    <span className="text-bold">{Constants.MnMerchant.titleTerminalDetailDenied}</span>
                  </Col>
                </FormGroup>
              </Col>
            </CardHeader>
            <CardBody>
              <Row>
                <Col className="col-md-12 col-12">
                  <ReasonReject />
                </Col>
                <Col className="col-md-6 col-12">
                  <MerchantInfo />
                </Col>
                <Col className="col-md-6 col-12">
                  <TerminalInfo />
                  <InternationalInfo />
                  <BeneficiaryInfo />
                  <ContactInfo />
                  <NotificationType />
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
  responseServer: state.terminal.responseServer,
  terminalDetailDenied: state.terminal.terminalDetailDenied,
});

const mapDispatchToProps = (dispatch) => ({
  getTerminalDetailDenied: (data) => dispatch(getTerminalDetailDenied(data)),
});

TerminalDetailDenied.defaultProps = {
  getTerminalDetailDenied: () => {},
  terminalDetailDenied: {},
  responseServer: {},
  history: {},
};

TerminalDetailDenied.propTypes = {
  getTerminalDetailDenied: PropTypes.func,
  responseServer: PropTypes.object,
  terminalDetailDenied: PropTypes.object,
  history: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TerminalDetailDenied));
