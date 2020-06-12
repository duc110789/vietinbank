import React from 'react';
import {Card, CardBody, Col, Collapse, FormGroup, Input, Label, Row,} from 'reactstrap';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Constants from '../Constants';

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
      terminalDetail,
    } = props;

    return {
      terminalDetail,
    };
  }

  componentDidUpdate(prevProps) {
    const {
      terminalDetail,
    } = this.props;
    if (prevProps.terminalDetail !== terminalDetail) {
      this.setState({
        sms: terminalDetail && terminalDetail.terminalBean
          && terminalDetail.terminalBean.registerSms,
        ott: terminalDetail && terminalDetail.terminalBean
          && terminalDetail.terminalBean.registerOtt,
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
  terminalDetail: state.terminal.terminalDetail,
});

const mapDispatchToProps = (dispatch) => ({
  // getAllDistrictByProvince: (data) => dispatch(getAllDistrictByProvince(data)),
});

NotificationType.defaultProps = {
  terminalDetail: {},
};

NotificationType.propTypes = {
  terminalDetail: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NotificationType));
