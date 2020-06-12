/* eslint-disable */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-shadow */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import Select from 'react-select';
import {Button, Col, FormGroup, Label, Row,} from 'reactstrap';
import Input from 'react-validation/build/input';
import Form from 'react-validation/build/form';
import 'react-datepicker/dist/react-datepicker.css';
import {connect} from 'react-redux';
import {
  getDataListPage,
  loadAllBranchBankByUser,
  loadAllGroupRole
} from '../../../store/actions/LocalUserManagementAction/ListPageAction'
import {status} from '../commonConstants';
import {checkLength200,} from '../../../components/Input/validation';

class InfoSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayStateGroupRole: '',
      arrayStateBranchBankByUser: '',
      fromRow: 0,
      pageSize: 10,
      data: {
        username: '',
        email: '',
        departmentCode: '',
        status: '',
        roleId: '',
      },
      errorMes: '',
    };
  }

  componentDidMount() {
    const {loadAllGroupRole, loadAllBranchBankByUser } = this.props;
    loadAllGroupRole();
    loadAllBranchBankByUser();
  }

  static getDerivedStateFromProps(props, state) {
    const { arrayGroupRole, arrayBranchBankByUser} = props;
    let arrayStateGroupRole = [{ value: '', label: 'Tất cả' }];
    let arrayStateBranchBankByUser = [{ value: '', label: 'Tất cả' }];
    if( arrayGroupRole) {
      for (let i = 0; i < arrayGroupRole.length; i += 1) {
        if (arrayGroupRole[i].status === 1) {
          arrayStateGroupRole.push({
            value: arrayGroupRole[i].roleId,
            label: `${arrayGroupRole[i].name}`,
          });
        }
      }
    }

    if( arrayBranchBankByUser) {
      for (let i = 0; i < arrayBranchBankByUser.length; i += 1) {
        if (arrayBranchBankByUser[i].status !== -1) {
          arrayStateBranchBankByUser.push({
            value: arrayBranchBankByUser[i].departmentCode,
            label: `${arrayBranchBankByUser[i].departmentName}`,
          });
        }
      }
    }
    return {
      arrayStateGroupRole,
      arrayStateBranchBankByUser,
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { isChangeStatusLocalAccountSuccess, getDataListPage, currentPage, perPage, arrayGroupRole } = this.props;
    const searchParams = sessionStorage.getItem('searchParams');
    const { data } = this.state;
    const dataSearch = JSON.parse(searchParams);
    let newData = {};
    if (searchParams) {
      newData = {
        data: {
          ...dataSearch.data,
          roleId: dataSearch.data.roleId.value || '',
          status: dataSearch.data.status.value || '',
          departmentCode: dataSearch.data.departmentCode.value || '',
        },
      };
    }

    if( isChangeStatusLocalAccountSuccess !== prevProps.isChangeStatusLocalAccountSuccess) {
      getDataListPage({
        data: searchParams ? newData.data : data,
        fromRow: perPage * currentPage - perPage,
        pageSize: perPage,
      });
    }

    if (arrayGroupRole !== prevProps.arrayGroupRole) {
      const sendData = {
        fromRow: 0,
        pageSize: 10,
        data: {
          username: '',
          email: '',
          departmentCode: '',
          status: '',
          roleId: '',
        },
      }
      if (searchParams) {
        this.setState({
          data: dataSearch.data,
          fromRow: dataSearch.fromRow,
          pageSize: dataSearch.pageSize,
        });

        getDataListPage({
          data: newData.data,
          fromRow: dataSearch.fromRow,
          pageSize: dataSearch.pageSize,
        });
      } else {
        getDataListPage(sendData);
      }
    }

  }

  onChangeEmail = (e) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        email: e.target.value,
      }
    })
  }

  onChangeUserName = (e) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
       username: e.target.value,
      }
    })
  }

  onChangeGroupRule = (event) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        roleId: event,
      }
    })
  };

  onChangeStatus = (event) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        status: event,
      }
    })
  };

  onChangeDepartment = (event) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        departmentCode: event,
      }
    })
  };

  onHandleSearch = (e) => {
    e.preventDefault();
    const { data } = this.state;
    const { getDataListPage } = this.props;
    let isValid = true;

    const newData = { ...data };
    newData.roleId = newData.roleId.value || '';
    newData.status = newData.status.value || '';
    newData.departmentCode = newData.departmentCode.value || '';

    const storedData = {
      fromRow: 0,
      pageSize: 10,
      data,
    };

    const searchData = {
      fromRow: 0,
      pageSize: 10,
      data: newData,
    };

    if (
      data.email !== '' && /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/.test(
      data.email.trim(),
      ) === false
    ) {
      isValid = false;
      this.setState({
        ...this.state,
        errorMes: 'Bạn cần nhập email đúng định dạng'
      })
    }

    if(isValid) {
      this.setState({
        ...this.state,
        errorMes: '',
      })
    }
    sessionStorage.setItem('searchParams', JSON.stringify(storedData));
    this.props.changeSearch();
    getDataListPage(searchData);
  }

  render() {
    const {arrayStateGroupRole, arrayStateBranchBankByUser, errorMes, data} = this.state;
    return (
      <Row>
        <div className="col-md-12">
          <Form className="widget-box transparent" ref={(c) => { this.form = c; }}>
            <Row>
              <Col md="6">
                <FormGroup row>
                  <Col lg="5" className="label-left">
                    <Label htmlFor="code">Tên đăng nhập</Label>
                  </Col>
                  <Col lg="7">
                    <Input
                      value={data.username}
                      type="text"
                      onChange={this.onChangeUserName}
                      className="form-control"
                      validations={[
                        checkLength200,
                      ]}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col lg="5" className="label-left">
                    <Label htmlFor="code">Email</Label>
                  </Col>
                  <Col lg="7">
                    <Input
                      type="text"
                      value={data.email}
                      onChange={this.onChangeEmail}
                      label="Email"
                      className="form-control"
                      validations={[
                        checkLength200,
                      ]}
                    />
                    {errorMes !== '' ? (
                      <p style={{
                        color: 'red',
                        fontSize: '13px',
                        margin: '3px auto',
                      }}
                      >
                        {errorMes}
                      </p>
                    ) : (
                      <div style={{height: '0px'}}/>
                    )}
                  </Col>
                </FormGroup>
              </Col>

              <Col md="6">
                <FormGroup row>
                  <Col lg="5" className="label-left">
                    <Label htmlFor="code">Phân quyền</Label>
                  </Col>
                  <Col lg="7">
                    <Select
                      value={data.roleId}
                      onChange={this.onChangeGroupRule}
                      options={arrayStateGroupRole}
                      placeholder="Tất cả"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col lg="5" className="label-left">
                    <Label htmlFor="code">Trạng thái</Label>
                  </Col>
                  <Col lg="7">
                    <Select
                      value={data.status}
                      onChange={this.onChangeStatus}
                      options={status}
                      placeholder="Tất cả"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col lg="5" className="label-left">
                    <Label htmlFor="code">Chi nhánh</Label>
                  </Col>
                  <Col lg="7">
                    <Select
                      value={data.departmentCode}
                      onChange={this.onChangeDepartment}
                      options={arrayStateBranchBankByUser}
                      placeholder="Tất cả"
                    />
                  </Col>
                </FormGroup>
              </Col>
              <Col md="6" className="mt-3">
                <FormGroup row>
                  <Col className="text-right btn-search">
                    <Button
                      type="submit"
                      className="icon-search btn btn-primary"
                      onClick={this.onHandleSearch}
                    >
                      <i className="icon-magnifier" />
                      {' '}
                      Tìm kiếm
                    </Button>
                  </Col>
                </FormGroup>
              </Col>
              <Col md="6" className="mt-3">
                <FormGroup row>
                  <Col className="text-left btn-search">
                    <Link to ='/system/user/addUser'>
                      <Button className="icon-search btn btn-primary" >
                        <i className="fa fa-plus mr-1" />
                        Thêm mới
                      </Button>
                    </Link>
                  </Col>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </div>
      </Row>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  arrayGroupRole: state.ListPage.arrayGroupRole,
  arrayBranchBankByUser: state.ListPage.arrayBranchBankByUser,
  isChangeStatusLocalAccountSuccess: state.ListPage.isChangeStatusLocalAccountSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  loadAllGroupRole: () => dispatch(loadAllGroupRole()),
  loadAllBranchBankByUser: () => dispatch(loadAllBranchBankByUser()),
  getDataListPage: (data) => dispatch(getDataListPage(data)),
});


InfoSearch.propTypes = {
  loadAllGroupRole: PropTypes.func,
  loadAllBranchBankByUser: PropTypes.func,
  arrayGroupRole: PropTypes.array,
  arrayBranchBankByUser:PropTypes.array,
  getDataListPage: PropTypes.func,
  isChangeStatusLocalAccountSuccess: PropTypes.object,
  currentPage: PropTypes.number,
  perPage: PropTypes.number,
};

InfoSearch.defaultProps = {
  loadAllGroupRole: () => {},
  loadAllBranchBankByUser: () => {},
  arrayGroupRole: null,
  arrayBranchBankByUser: null,
  getDataListPage: () => {},
  isChangeStatusLocalAccountSuccess: null,
  currentPage: 0,
  perPage: 0,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(InfoSearch));
