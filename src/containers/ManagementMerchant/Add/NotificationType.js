import React from 'react';
import {
  Collapse, CardBody, Card, Label, Row, Col, FormGroup, Input,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Constants from '../Constants';

class NotificationType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenInfo: true,
      sms: 1,
      ott: 1,
    };
  }

  componentDidUpdate(prevProps) {
    const {
      passNotificationType,
    } = this.props;
    const {
      sms,
      ott,
    } = this.state;
    const dataNotificationType = {
      sms,
      ott,
    };
    passNotificationType(dataNotificationType);
  }

  handOpenInfo = () => {
    const { isOpenInfo } = this.state;
    this.setState({
      isOpenInfo: !isOpenInfo,
    });
  };

  handleClickSms = (event) => {
    if (event.target.checked) {
      this.setState({
        sms: 1,
      });
    } else {
      this.setState({
        sms: 2,
      });
    }
  };

  handleClickOtt = (event) => {
    if (event.target.checked) {
      this.setState({
        ott: 1,
      });
    } else {
      this.setState({
        ott: 2,
      });
    }
  };

  render() {
    const { isOpenInfo, sms, ott, } = this.state;
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
                          onClick={this.handleClickSms}
                          defaultChecked={sms}
                        />
                        {' '}
                        {Constants.MnMerchant.sms}
                      </Label>
                    </Col>
                    <Col lg="6">
                      <Label>
                        <Input
                          type="checkbox"
                          onClick={this.handleClickOtt}
                          defaultChecked={ott}
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
});

const mapDispatchToProps = (dispatch) => ({
});

NotificationType.defaultProps = {
  passNotificationType: () => {},
};

NotificationType.propTypes = {
  passNotificationType: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NotificationType));
