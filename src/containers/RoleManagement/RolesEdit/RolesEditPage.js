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
  Input,
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
import {getAllFunction, getGroupDetailRoles} from '../../../store/actions/RoleManagementAction/DetailRolesAction';
import {removeDuplicates} from '../../../utils/commonFunction';
import Validate from "../validateFunction";
import {editRoles} from '../../../store/actions/RoleManagementAction/EditRolesAction'
import {messageSuccess} from "../../../utils";
import classnames from 'classnames';

class EditRoles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 400001,
      resDataFunctionGroup: null,
      dropdownOpen: false,
      arrayChecked: [],
      arrayExpanded: ["120001", "1250001", "200001", "1210001", "1330001", "640001", "760001", "800001", "1280001", "1240001", "1320001", "410001", "610001", "730001", "100001", "1270001", "1230001", "1350001", "300001", "420001", "620001", "740001", "700001", "110001", "1260001", "510002", "1340001", "510001", "630001", "750001", "0", "400001", "500001", "600001"],
      nodesLevel: null,
      groupName: '',
      description: '',
      createDate: null,
      modifyDate: null,
      status: null,
      errorMessDescription: null,
    }
  }


  componentDidMount() {
    const { getAllFunction, getGroupDetailRoles } = this.props;
    const idRoles = localStorage.getItem('GROUP_ID_ROLES');
    getAllFunction();
    getGroupDetailRoles(idRoles);
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
    const { resDetailRules , isEditRolesSuccess, history} = this.props;
    if(resDetailRules !== prevProps.resDetailRules) {
      this.setState({
        groupName: resDetailRules.groupName,
        description: resDetailRules.description,
        createDate: resDetailRules.createDate,
        modifyDate: resDetailRules.modifyDate,
        status: resDetailRules.status,
        arrayChecked: resDetailRules.listFunction.map((item) => (item.toString())),
      })
    }
    if(isEditRolesSuccess !== prevProps.isEditRolesSuccess) {
      messageSuccess('Cập nhật thông tin Nhóm Quyền thành công');
      history.push('/system/roles/list');
    }
  }

  onClickNavLink = (tab) => {
    const { activeTab } = this.state;
    if (activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }

  onChangeRolesDescription = (e) => {
    this.setState({
      description: e.target.value,
    })
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

  updateRoles = () => {
    const { description, arrayChecked, status, groupName} = this.state;
    const { editRoles } = this.props;
    let isValidDescription = true;
    if(!Validate.isDescription(description)) {
      isValidDescription = false;
      this.setState({errorMessDescription: 'Trường miêu tả giới hạn từ 10 đến 150 ký tự'})
    }
    if(description === '') {
      isValidDescription = false;
      this.setState({errorMessDescription: 'Vui lòng nhập mô tả nhóm quyền'})
    } else {
      isValidDescription = true;
      this.setState({errorMessDescription: ''})
    }
    if( isValidDescription) {
      const sendData = {
        groupId: localStorage.getItem('GROUP_ID_ROLES'),
        status,
        groupName,
        description,
        functions: arrayChecked,
      }
      editRoles(sendData);
    }
    isValidDescription === true ?  this.setState({errorMessDescription: ''}) : isValidDescription;
  }

  render() {
    const { activeTab, nodesLevel, groupName, description, createDate, modifyDate, errorMessDescription, arrayExpanded, arrayChecked } = this.state;
    const finalNodes = nodesLevel.length > 0 ? nodesLevel.map((item) => ({value: 0, label: 'Tất cả', children: [item] })) : nodesLevel;
    return (
      <div className="animated fadeIn fee-table" style={{ background: 'white' }}>
        <Card>
          <CardHeader>
            <span className="text-bold">Chỉnh sửa nhóm quyền </span>
          </CardHeader>
        </Card>
        <CardBody>
          <Row>
            <Col md="6">
              <FormGroup row>
                <Col lg="4" className="label-left">
                  <Label htmlFor="code">Tên nhóm quyền</Label>
                </Col>
                <Col lg="8">
                  <div><span>{groupName}</span></div>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col lg="4" className="label-left">
                  <Label htmlFor="code">Mô tả</Label>
                </Col>
                <Col lg="8">
                  <Input
                  value={description} onChange={this.onChangeRolesDescription}/>
                  {errorMessDescription !== '' ? (
                    <p style={{
                      color: 'red',
                      fontSize: '13px',
                      margin: '3px auto',
                    }}
                    >
                      {errorMessDescription}
                    </p>
                  ) : (
                    <div style={{height: '0px'}}/>
                  )}
                </Col>
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup row>
                <Col lg="4" className="label-left">
                  <Label htmlFor="code">Ngày Tạo</Label>
                </Col>
                <Col lg="8">
                  <div>{createDate}</div>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col lg="4" className="label-left">
                  <Label htmlFor="code">Ngày Sửa</Label>
                </Col>
                <Col lg="8">
                  <div>{modifyDate}</div>
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
              <Button color="success" onClick={this.updateRoles} >
                Cập nhật
              </Button>
            </Col>
          </Row>
        </CardBody>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  resDataFunctionGroup: state.DetailRole.resDataFunctionGroup,
  resDetailRules: state.DetailRole.resDetailRules,
  isEditRolesSuccess: state.EditRolePage.isEditRolesSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  getAllFunction: () => dispatch(getAllFunction()),
  getGroupDetailRoles: (data) => dispatch(getGroupDetailRoles(data)),
  editRoles: (data) => dispatch(editRoles(data)),
});


EditRoles.propTypes = {
  getAllFunction: PropTypes.func,
  getGroupDetailRoles: PropTypes.func,
  resDetailRules: PropTypes.object,
  editRoles: PropTypes.func,
  isEditRolesSuccess: PropTypes.object,
};

EditRoles.defaultProps = {
  getAllFunction: () => {},
  getGroupDetailRoles: () => {},
  resDetailRules: null,
  editRoles: () => {},
  isEditRolesSuccess: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditRoles));
