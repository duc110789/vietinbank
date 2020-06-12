import React from 'react';
import {
  Collapse, CardBody, Card, Label, Row, Col, FormGroup, Input,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Constants from '../Constants';
import {
  getMerchantDetailDenied,
} from '../../../store/actions/masterMerchant/masterMerchant';

class NotificationType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenInfo: true,
      sms: null,
      ott: null,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const {
      merchantDetailDenied,
    } = props;

    return {
      merchantDetailDenied,
    };
  }

  componentDidUpdate(prevProps) {
    const {
      merchantDetailDenied,
    } = this.props;
    if (
      merchantDetailDenied !== prevProps.merchantDetailDenied
    ) {
      this.setState({
        sms: merchantDetailDenied.terminal.registerSms,
        ott: merchantDetailDenied.terminal.registerOtt,
      });
    }
  }

  handOpenInfo = () => {
    const { isOpenInfo } = this.state;
    this.setState({
      isOpenInfo: !isOpenInfo,
    });
  };

  render() {
    const {
      isOpenInfo,
      sms,
      ott,
    } = this.state;
    let checkedSms = null;
    if (sms === 1) {
      checkedSms = 'true';
    }
    let checkedOtt = null;
    if (ott === 1) {
      checkedOtt = 'true';
    }
    return (
      <Row>
        <div className="col-md-12">
          <div className="widget-box transparent">
            <div className="widget-header widget-header-flat" role="presentation" onClick={this.handOpenInfo} onKeyPress={this.handOpenInfo}>
              <span className="text-bold">{Constants.MnMerchant.notification}</span>
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
                  <FormGroup>
                    <Col lg="6">
                      <Label>
                        <Input
                          type="checkbox"
                          defaultChecked={checkedSms}
                          disabled
                        />
                        {' '}
                        {Constants.MnMerchant.sms}
                      </Label>
                    </Col>
                    <Col lg="6">
                      <Label>
                        <Input
                          type="checkbox"
                          defaultChecked={checkedOtt}
                          disabled
                        />
                        {' '}
                        {Constants.MnMerchant.ott}
                      </Label>
                    </Col>
                  </FormGroup>
                </CardBody>
              </Card>
            </Collapse>
          </div>
        </div>
      </Row>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  merchantDetailDenied: state.masterMerchant.merchantDetailDenied,
});

const mapDispatchToProps = (dispatch) => ({
  getMerchantDetailDenied: (data) => dispatch(getMerchantDetailDenied(data)),
});

NotificationType.defaultProps = {
  merchantDetailDenied: {},
};

NotificationType.propTypes = {
  merchantDetailDenied: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NotificationType));
