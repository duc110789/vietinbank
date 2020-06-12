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
  getMerchantDetailDenied,
} from '../../../store/actions/masterMerchant/masterMerchant';

import Constants from '../Constants';
import TerminalInfo from './TerminalInfo';
import MerchantInfo from './MerchantInfo';
import BeneficiaryInfo from './BeneficiaryInfo';
import InternationalInfo from './InternationalInfo';
import ContactInfo from './ContactInfo';
import NotificationType from './NotificationType';
import MerchantBranchInfo from './MerchantBranchInfo';
import ReasonReject from './ReasonReject';

class MerchantDetailDenied extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listBranchBank: [],
    };
  }

  componentDidMount() {
    const {
      getMerchantDetailDenied,
    } = this.props;
    getMerchantDetailDenied({
      merchantDeniedId: JSON.parse(window.atob(localStorage.getItem('DENIED_ID'))),
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
                  <MerchantBranchInfo />
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
  merchantDetailDenied: state.masterMerchant.merchantDetailDenied,
});

const mapDispatchToProps = (dispatch) => ({
  getMerchantDetailDenied: (data) => dispatch(getMerchantDetailDenied(data)),
});

MerchantDetailDenied.defaultProps = {
  getMerchantDetailDenied: () => {},
  merchantDetailDenied: {},
  responseServer: {},
  history: {},
};

MerchantDetailDenied.propTypes = {
  getMerchantDetailDenied: PropTypes.func,
  responseServer: PropTypes.object,
  merchantDetailDenied: PropTypes.object,
  history: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MerchantDetailDenied));
