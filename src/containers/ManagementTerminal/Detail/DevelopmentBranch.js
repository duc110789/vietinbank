import React from 'react';
import {Card, CardBody, Col, Collapse, FormGroup, Label, Row,} from 'reactstrap';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Form from 'react-validation/build/form';
import Constants from '../Constants';

class DevelopmentBranch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenInfo: true,
      developmentUnit: '',
      staffByDepartment: '',
    };
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
    } = this.state;
    const {
      merchantDetail,
    } = this.props;
    return (
      <Row>
        <div className="col-md-12">
          <Form className="widget-box transparent" ref={(developmentBranch) => { this.form = developmentBranch; }}>
            <div className="widget-header widget-header-flat" role="presentation" onClick={this.handOpenInfo} onKeyPress={this.handOpenInfo}>
              <span className="text-bold">{Constants.MnMerchant.agentDevelopmentBranch}</span>
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
                    <Col md="5">
                      <Label>
                        {Constants.MerchantDetail.developmentUnit}
                      </Label>
                    </Col>
                    <Col md="7">
                      <Label>
                        { merchantDetail ? merchantDetail.departmentName : ''}
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="5">
                      <Label>
                        {Constants.MerchantDetail.staff}
                      </Label>
                    </Col>
                    <Col md="7">
                      <Label>
                        { merchantDetail ? merchantDetail.id ? `${merchantDetail.staffCode} - ${merchantDetail.staffName}` : '' : ''}
                      </Label>
                    </Col>
                  </FormGroup>
                </CardBody>
              </Card>
            </Collapse>
          </Form>
        </div>
      </Row>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  merchantDetail: state.masterMerchant.merchantDetail,
});

const mapDispatchToProps = (dispatch) => ({
});

DevelopmentBranch.defaultProps = {
  merchantDetail: {},
};

DevelopmentBranch.propTypes = {
  merchantDetail: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DevelopmentBranch));
