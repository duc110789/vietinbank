import React from 'react';
import {Card, CardBody, Col, Collapse, FormGroup, Label, Row,} from 'reactstrap';
import Select from 'react-select';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Form from 'react-validation/build/form';
import {getAllStaffByDepartment,} from '../../../store/actions/system/systemModuleAction';
import Constants from '../Constants';
import {checkRequiredSelect,} from '../../../components/Input/validation';
import {listStaffDepartment} from '../../../utils/commonFunction';

class DevelopmentBranch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenInfo: true,
      developmentUnit: '',
      staffByDepartment: '',
    };
  }

  static getDerivedStateFromProps(props, state) {
    const {
      listStaffByDepartment,
    } = props;
    let updateListStaffByDepartment = [];
    updateListStaffByDepartment = listStaffDepartment(listStaffByDepartment);
    return {
      updateListStaffByDepartment,
    };
  }

  componentDidUpdate(prevProps) {
    const {
      passDataDevelopmentBranch,
      merchantDetail,
      getAllStaffByDepartment
    } = this.props;
    if (merchantDetail !== prevProps.merchantDetail) {
      this.setState({
        developmentUnit: {
          value: merchantDetail && merchantDetail.departmentId,
          label: merchantDetail && merchantDetail.departmentName,
        },
        staffByDepartment: {
          value: merchantDetail && merchantDetail.staffId,
          label: merchantDetail && `${merchantDetail.staffCode}-${merchantDetail.staffName}`,
        },
      }, () => {
        if (merchantDetail && merchantDetail.departmentId) {
          getAllStaffByDepartment({ departmentCode: merchantDetail.departmentId });
        }
      }
      );
    }
    const {
      developmentUnit,
      staffByDepartment,
    } = this.state;
    const dataDevelopmentBranch = {
      developmentUnit,
      staffByDepartment,
    };
    passDataDevelopmentBranch(dataDevelopmentBranch);
  }

  handleDevelopmentUnit = (unitSelected) => {
    const { getAllStaffByDepartment } = this.props;
    if (unitSelected) {
      this.setState({
        developmentUnit: unitSelected,
        staffByDepartment: {},
      }, () => {
        getAllStaffByDepartment({ departmentCode: unitSelected.departmentCode });
      });
    }else{
      this.setState({
        staffByDepartment: {},
        developmentUnit: {}
      });
    }
  };

  handleStaffByDepartment = (staffByDepartmentSelected) => {
    if (staffByDepartmentSelected) {
      this.setState({
        staffByDepartment: staffByDepartmentSelected,
      });
    }else{
      this.setState({
        staffByDepartment: {},
      });
    }
  };

  handOpenInfo = () => {
    const { isOpenInfo } = this.state;
    this.setState({
      isOpenInfo: !isOpenInfo,
    });
  };

  render() {
    const {
      isOpenInfo,
      updateListStaffByDepartment,
      developmentUnit,
      staffByDepartment,
    } = this.state;
    const {
      listBranchBankByUser,
      validateForm,
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
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.developmentUnit}
                        {' '}
                        <span className="text-danger">*</span>
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Select
                        isClearable
                        value={developmentUnit}
                        options={listBranchBankByUser}
                        onChange={this.handleDevelopmentUnit}
                      />
                      {validateForm ? checkRequiredSelect(developmentUnit, Constants.MnMerchant.developmentUnit) : ''}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.staff}
                        {' '}
                        <span className="text-danger">*</span>
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Select
                         isClearable
                        value={staffByDepartment}
                        options={updateListStaffByDepartment}
                        onChange={this.handleStaffByDepartment}
                      />
                      {validateForm ? checkRequiredSelect(staffByDepartment.value, Constants.MnMerchant.staff) : ''}
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
  listStaffByDepartment: state.systemModule.listStaffByDepartment,
});

const mapDispatchToProps = (dispatch) => ({
  getAllStaffByDepartment: (data) => dispatch(getAllStaffByDepartment(data)),
});

DevelopmentBranch.defaultProps = {
  getAllStaffByDepartment: () => {},
  listStaffByDepartment: [],
  passDataDevelopmentBranch: () => {},
};

DevelopmentBranch.propTypes = {
  getAllStaffByDepartment: PropTypes.func,
  passDataDevelopmentBranch: PropTypes.func,
  listStaffByDepartment: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DevelopmentBranch));
