import React from 'react';
import {Button, Card, CardBody, CardFooter, CardHeader, Col, FormGroup, Row,} from 'reactstrap';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Constants from '../Constants';
import Refuse from './modal/Refuse';
import MerchantInfo from './MerchantInfo';
import ListOrganizationInternational from './ListOrganizationInternationanl';
import ContactInfo from './ContactInfo';
import NotificationType from './NotificationType';
import TerminalInfo from './TerminalInfo';
import UserAccount from './UserAccount';
import {approvedMerchant, getMerchantInfo} from '../../../store/actions/masterMerchant/masterMerchant';
import {messageError} from '../../../utils';

class MerchantDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModalDenied: false,
      arrDeniedDesc: Constants.MerchantDetail.arrayDenied,
    };
  }

  componentDidMount() {
    const {
      getMerchantInfo,
    } = this.props;
    getMerchantInfo({
      merchantCode: JSON.parse(window.atob(localStorage.getItem('ID_MERCHANT_DETAIL'))),
    });
  }

  static getDerivedStateFromProps(props) {
    const {
      merchantApproved,
    } = props;
    return {
      merchantApproved,
    };
  }

  componentDidUpdate(prevProps) {
    const { responseServer, history } = this.props;
    if (responseServer !== prevProps.responseServer) {
      if (responseServer.code !== '00') {
        messageError(responseServer.description);
      } else {
        history.goBack();
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
    const { merchantApproved } = this.state;
    const {
      approvedMerchant,
    } = this.props;
    if (merchantApproved.merchant !== undefined && merchantApproved.terminalContact !== undefined) {
      const params = {
        processUser: 'string',
        status: 1,
        email: merchantApproved.terminalContact.email,
        phoneNumber: merchantApproved.terminalContact.phoneNumber,
        merchantCode: merchantApproved.merchant.merchantCode,
        merchantBrand: merchantApproved.merchant.merchantBrand,
        userTerminalBranch: merchantApproved.terminalBranch.terminalAppUser,
      };
      approvedMerchant(params);
    }
  };

  render() {
    const {
      isShowModalDenied,
      arrDeniedDesc,
      merchantApproved,
    } = this.state;

    const { history } = this.props;
    return (
      <div className="my-requests">
        <Card className="card-my-requests">
          <CardHeader>
            <Col xs="12">
              <FormGroup style={{ marginBottom: 0 }} row>
                <Col lg="12" style={{ paddingLeft: 0 }}>
                  <span className="text-bold">{Constants.MerchantDetail.titleUnitBusinessInfo}</span>
                </Col>
              </FormGroup>
            </Col>
          </CardHeader>
          <CardBody>
            <Row>
              <Col md="6">
                <MerchantInfo
                  merchantApproved={merchantApproved.merchant}
                  terminalApproved={merchantApproved.terminalBranch}
                />
              </Col>
              <Col className="col-md-6">
                <TerminalInfo
                  terminalApproved={merchantApproved.terminal}
                />
                <ListOrganizationInternational
                  listOrganization={merchantApproved.listOrganization}
                />
                <UserAccount
                  merchantApproved={merchantApproved.terminal}
                />
                <ContactInfo
                  merchantApproved={merchantApproved.terminalContact}
                />
                <NotificationType
                  merchantApproved={merchantApproved.terminal}
                />
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
  merchantApproved: state.masterMerchant.merchantApproved,
  responseServer: state.masterMerchant.responseServer,
});

const mapDispatchToProps = (dispatch) => ({
  getMerchantInfo: (data) => dispatch(getMerchantInfo(data)),
  approvedMerchant: (data) => dispatch(approvedMerchant(data)),
});

MerchantDetail.defaultProps = {
  getMerchantInfo: () => {},
  approvedMerchant: () => {},
  merchantApproved: {},
};

MerchantDetail.propTypes = {
  getMerchantInfo: PropTypes.func,
  approvedMerchant: PropTypes.func,
  merchantApproved: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MerchantDetail));
