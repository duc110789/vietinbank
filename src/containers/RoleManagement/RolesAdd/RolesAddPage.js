/* eslint-disable */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-shadow */
import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from 'reactstrap';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-checkbox-tree/src/scss/react-checkbox-tree.scss';
import CheckboxTree from 'react-checkbox-tree';
import {connect} from 'react-redux';
import {getAllFunction} from '../../../store/actions/RoleManagementAction/DetailRolesAction';
import {removeDuplicates} from '../../../utils/commonFunction';
import {addNewRoles} from '../../../store/actions/RoleManagementAction/AddNewRolesAction';
import {ToastContainer} from 'react-toastr';
import Form from 'react-validation/build/form';
import {messageSuccess} from "../../../utils";
import Input from 'react-validation/build/input';
import classnames from 'classnames';
import {
  checkLength10To150,
  checkLength6To150,
  checkRequiredInput,
  isFullName,
} from "../../../components/Input/validation";
import {loadAllGroupRole} from "../../../store/actions/LocalUserManagementAction/ListPageAction";

class AddRoles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 400001,
      resDataFunctionGroup: null,
      dropdownOpen: false,
      arrayChecked: [],
      arrayExpanded: ["0", "400001", "410001", "420001", "300001", "200001", "1280001", "500001", "510001", "510002", "600001", "630001", "620001", "640001", "610001", "800001", "700001", "750001", "730001", "760001", "740001", "100001", "110001", "120001", "1210001", "1250001", "1230001", "1270001", "1260001", "1240001", "1330001", "1340001", "1320001", "1350001"],
      nodesLevel: null,
      groupName: '',
      description: '',
      status: null,
      sendingCheckData: [],
      errorMessGroupName: null,
      errorMessDescription: null,
    }
  }

  componentDidMount() {
    const { getAllFunction } = this.props;
    getAllFunction();
  }

  static getDerivedStateFromProps(props, state) {
    const { resDataFunctionGroup } = props;
    const nodesLevel = [];
    if(resDataFunctionGroup) {
      const functionGroupLvOne = resDataFunctionGroup.filter((item) => (item.parentId === 0));
      for(let i = 0; i < functionGroupLvOne.length; i+= 1) {
        let functionGroupLvTwo = null;
        let functionGroupLvThree = null;
        functionGroupLvTwo = resDataFunctionGroup.filter((item) => ( functionGroupLvOne[i].functionId === item.parentId));
        nodesLevel.push({
          value: functionGroupLvOne[i].functionId,
          label: functionGroupLvOne[i].functionName,
          children: functionGroupLvTwo.map((item) => ({value: item.functionId, label: item.functionName, children: []}))
        })
        for( let j = 0; j < functionGroupLvTwo.length; j += 1) {
          functionGroupLvThree = resDataFunctionGroup.filter((item) =>(functionGroupLvTwo[j].functionId === item.parentId));
          const tempData = nodesLevel[i].children[j];
          const updateLevelThreeArray = {
            ...tempData,
            children: functionGroupLvThree.length > 0 ? functionGroupLvThree.map((item) => ({value: item.functionId, label: item.functionName})) : null,
          };
          nodesLevel[i].children[j] = updateLevelThreeArray;
        }
      }
    }
    return {
      resDataFunctionGroup,
      nodesLevel,
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { isAddNewRolesSuccess, history, loadAllGroupRole } = this.props;
    if(isAddNewRolesSuccess !== prevProps.isAddNewRolesSuccess) {
      loadAllGroupRole();
      messageSuccess('Thêm mới Nhóm Quyền thành công');
      history.push('/system/roles/list');
    }
  }

  onHandleChecked = (checked, targetNode) => {
    const { arrayChecked } = this.state;
    let newArrayAfterClick = [];
    if (targetNode.checked === false) {
      if (targetNode.children) {
        if (targetNode.children.length === 0) {
          newArrayAfterClick = arrayChecked.filter((item) => ( item !== targetNode.value.toString()));
        } else {
          const arrayChildren = this.recursion(targetNode.children, []);
          newArrayAfterClick = arrayChecked.filter(item => {
            return arrayChildren.indexOf(Number(item)) === -1;
          });
        }
      } else {
        newArrayAfterClick = arrayChecked.filter((item) => ( item !== targetNode.value.toString()))
      }
    }
    else {
      const combineArray = [ ...arrayChecked, ...checked];
      newArrayAfterClick = removeDuplicates(combineArray);
    }

    this.setState({
      arrayChecked: newArrayAfterClick,
    })
  }

  recursion = (children, arrayChildren) => {
    children.map(item => {
      arrayChildren.push(item.value);
      if (item.children) {
        this.recursion(item.children, arrayChildren);
      }
    });
    return arrayChildren;
  };

  onHandleExpand = (expanded, targetNode) => {
    const { arrayExpanded } = this.state;
     let newArrayAfterExpand = [];
    if(targetNode.expanded === false) {
      newArrayAfterExpand = arrayExpanded.filter((item) => ( item !== targetNode.value.toString()));
    }
    else {
      const combineArray = [ ...arrayExpanded, ...expanded, targetNode.value.toString()];
      newArrayAfterExpand = removeDuplicates(combineArray);
    }
    this.setState({
      arrayExpanded: newArrayAfterExpand,
    })
  }

  onClickNavLink = (tab) => {
    const { activeTab } = this.state;
    if (activeTab !== tab) {
      this.setState({
        activeTab: tab,
      })
    }
  }

  onChangeRolesName = (e) => {
    this.setState({
      groupName: e.target.value,
    })
  }

  onChangeRolesDescription = (e) => {
    this.setState({
      description: e.target.value,
    })
  }

  addNewRoles = () => {
    const {groupName, description, arrayChecked} = this.state;
    const { addNewRoles } = this.props;

    this.form.validateAll();

    const errors = this.form.getChildContext()._errors.length;

    if(errors === 0) {
      const sendData = {
        groupName,
        description,
        functions: arrayChecked,
      }
      addNewRoles(sendData);
    }
  }

  render() {
    const { activeTab, nodesLevel, arrayExpanded, arrayChecked } = this.state;
    const finalNodes = nodesLevel.length > 0 ? nodesLevel.map((item) => ({value: 0, label: 'Tất cả', children: [item] })) : nodesLevel;
    return (
      <div className="animated fadeIn fee-table" style={{ background: 'white' }}>
        <Form ref={(addNewRoles) => { this.form = addNewRoles; }}>
          <Card>
            <CardHeader>
              <span className="text-bold">Thêm mới nhóm quyền</span>
            </CardHeader>
          </Card>
          <CardBody>
            <Row>
              <Col md="6">
                <FormGroup row>
                  <Col lg="4" className="label-left">
                    <Label htmlFor="code">
                      <div className="mt-2">
                        Tên nhóm quyền
                        {' '}<span className="text-danger">*</span>
                      </div>
                    </Label>
                  </Col>
                  <Col lg="8">
                    <Input
                      value=""
                      label="Tên nhóm quyền"
                      type="text"
                      className="form-control"
                      name="role"
                      onChange={this.onChangeRolesName}
                      validations={[
                        checkRequiredInput,
                        checkLength6To150,
                        isFullName,
                      ]}
                    />
                  </Col>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup row>
                  <Col lg="3" className="label-left">
                    <Label htmlFor="code">
                      <div className="mt-2">
                        Mô tả
                        {' '}<span className="text-danger">*</span>
                      </div>
                    </Label>
                  </Col>
                  <Col lg="9">
                    <Input
                      value=""
                      label="Mô tả"
                      type="text"
                      className="form-control"
                      name="description"
                      onChange={this.onChangeRolesDescription}
                      validations={[
                        checkRequiredInput,
                        checkLength10To150,
                      ]}
                    />
                  </Col>
                </FormGroup>
              </Col>
            </Row>

            <Row style={{marginTop: '20px', paddingBottom: '30px'}}>
              <div style={{width: '100%'}}>
                <Nav tabs>
                  { finalNodes && finalNodes.length > 0 ? finalNodes.map((item, index) => (
                    <div key={index} >
                      <NavItem className={classnames({ active: activeTab === item.children[0].value })}>
                        <NavLink
                          onClick={() => this.onClickNavLink(item.children[0].value)}
                        >
                          {item.children[0].label}
                        </NavLink>
                      </NavItem>
                    </div>
                  )) : null}
                </Nav>
                <div className="activeTab-body">
                  {finalNodes && finalNodes.length > 0 ? finalNodes.map((item, index) => (
                    <TabContent activeTab={activeTab}>
                      <TabPane tabId={item.children[0].value}>
                        <Row>
                          <Col sm="12" style={{ color:'#404040', fontSize: '12px', fontFamily: 'Roboto, sans-serif'}}>
                            <CheckboxTree
                              nodes={[item]}
                              checked={arrayChecked}
                              expanded={arrayExpanded}
                              onCheck={(checked, targetNode) => this.onHandleChecked(checked, targetNode)}
                              onExpand={(expanded, targetNode) => this.onHandleExpand(expanded, targetNode)}
                              icons={{
                                parentClose: '',
                                parentOpen: '',
                                leaf: '',
                              }}
                              showExpandAll
                              showNodeTitle
                              nativeCheckboxes
                              optimisticToggle={false}
                            />
                          </Col>
                        </Row>
                      </TabPane>
                    </TabContent>
                  )) : null}
                </div>
              </div>
            </Row>
            <Row>
              <Col lg={'6'} className="text-right">
                <Link to ='/system/roles/list'>
                  <Button className="btn bggrey bigger-150 text-white btn btn-secondary" >
                    <i className="fa fa-arrow-left mr-2" aria-hidden="true" />
                    Về danh sách
                  </Button>
                </Link>
              </Col>
              <Col lg={'6'}>
                <Button color="success" onClick={this.addNewRoles} >
                  Thêm mới
                </Button>
              </Col>
            </Row>
          </CardBody>
          <ToastContainer
            ref={(ref) => { this.toastContainer = ref; }}
            className="toast-top-right"
          />
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  resDataFunctionGroup: state.DetailRole.resDataFunctionGroup,
  isAddNewRolesSuccess: state.AddRolePage.isAddNewRolesSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  getAllFunction: () => dispatch(getAllFunction()),
  addNewRoles: (data) => dispatch(addNewRoles(data)),
  loadAllGroupRole: () => dispatch(loadAllGroupRole())
});

AddRoles.propTypes = {
  loadAllGroupRole: PropTypes.func,
  getAllFunction: PropTypes.func,
  addNewRoles: PropTypes.func,
  isAddNewRolesSuccess: PropTypes.number,
};

AddRoles.defaultProps = {
  loadAllGroupRole: () => {},
  getAllFunction: () => {},
  addNewRoles: () => {},
  isAddNewRolesSuccess: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddRoles));
