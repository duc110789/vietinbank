import React from 'react';
import {
  Collapse, CardBody, Card, Label, Row, Col, FormGroup, Input,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Constants from '../Constants';
import {
  getTerminalDetailDenied,
} from '../../../store/actions/terminal/terminal';

class NotificationType extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpenInfo: true,
      sms: null,
      ott: 0,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const {
      terminalDetailDenied,
    } = props;

    return {
      terminalDetailDenied,
    };
  }

  componentDidUpdate(prevProps) {
    const {
      terminalDetailDenied,
    } = this.props;
    if (
      terminalDetailDenied !== prevProps.terminalDetailDenied
      && terminalDetailDenied && terminalDetailDenied.terminalBean
    ) {
      this.setState({
        sms: terminalDetailDenied.terminalBean.registerSms,
        ott: terminalDetailDenied.terminalBean.registerOtt,
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
                          checked={sms}
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
                          checked={ott}
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
  terminalDetailDenied: state.terminal.terminalDetailDenied,
});

const mapDispatchToProps = (dispatch) => ({
  getTerminalDetailDenied: (data) => dispatch(getTerminalDetailDenied(data)),
});

NotificationType.defaultProps = {
  terminalDetailDenied: {},
};

NotificationType.propTypes = {
  terminalDetailDenied: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NotificationType));
