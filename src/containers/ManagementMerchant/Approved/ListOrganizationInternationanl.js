import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Card, CardBody, Row, Collapse,
} from 'reactstrap';

import OrganizationInternationalTable from './OrganizationInternationalTable';
import Constants from '../Constants';

class ListOrganizationInternational extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenInfo: true,
    };
  }

  handOpenInfo = () => {
    const { isOpenInfo } = this.state;
    this.setState({
      isOpenInfo: !isOpenInfo,
    });
  };

  render() {
    const { isOpenInfo } = this.state;
    const { listOrganization } = this.props;

    return (
      <Row>
        <div className="col-md-12">
          <div className="widget-box transparent">
            <div className="widget-header widget-header-flat" role="presentation" onClick={this.handOpenInfo} onKeyPress={this.handOpenInfo}>
              <span className="text-bold">{Constants.MerchantDetail.organizationInternationalContact}</span>
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
                  <OrganizationInternationalTable tData={listOrganization} />
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


ListOrganizationInternational.propTypes = {
  listOrganization: PropTypes.array,
};

ListOrganizationInternational.defaultProps = {
  listOrganization: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(ListOrganizationInternational);
