/* eslint-disable */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-shadow */
import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Button, Col, FormGroup, Label, Row,} from 'reactstrap';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import 'react-datepicker/dist/react-datepicker.css';
import {connect} from 'react-redux';
import {getListRole} from '../../../store/actions/RoleManagementAction/ListRoleAction';

class SearchByNameRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromRow: 0,
      pageSize: 10,
      data: {
        groupName: '',
        status: 0,
      }
    }
  }


  componentDidMount() {
    const { getListRole } = this.props;
    const sendData = {
      fromRow: 0,
      pageSize: 10,
      data: {
        groupName: '',
        status: 0,
      },
    };
    setTimeout(() => {
      const searchParams = sessionStorage.getItem('searchParams');
      const dataSearch = JSON.parse(searchParams);
      if (searchParams) {
        const newData = {
          ...dataSearch,
        };
        this.setState({
          data: dataSearch.data,
          fromRow: dataSearch.fromRow,
          pageSize: dataSearch.pageSize,
        });
        getListRole(newData);
      } else {
        getListRole(sendData);
      }
    }, 0);
  }

  changeRolesName = (e) => {
    this.setState({
      data: {
        ...this.state.data,
        groupName: e.target.value,
      }
    })
  }

  onHandleSearch = (e) => {
    e.preventDefault();
    const { getListRole } = this.props;
    const { data } = this.state;

    const searchData = {
      data,
      fromRow: 0,
      pageSize: 10,
    };

    sessionStorage.setItem('searchParams', JSON.stringify(searchData));
    this.props.changeSearch();
    getListRole(searchData);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { isChangeStatusRolesSuccess, getListRole, currentPage, perPage } = this.props;
    const { data } = this.state;
    if(isChangeStatusRolesSuccess !== prevProps.isChangeStatusRolesSuccess) {
      getListRole({
        data,
        fromRow: perPage * currentPage - perPage,
        pageSize: perPage,
      });
    }
  }

  render() {
    const { data } = this.state;
    return (
      <Form>
        <Row>
          <Col md="12">
            <FormGroup row>
              <Col lg='2'/>
              <Col lg="2" className="label-left">
                <Label htmlFor="code">
                  <div className="mt-2">Tên nhóm quyền</div>
                </Label>
              </Col>
              <Col lg="5">
                <Input
                  value={data.groupName}
                  className="form-control"
                  type='text'
                  onChange={this.changeRolesName}
                />
              </Col>
            </FormGroup>
          </Col>
          <Col md="6" className="mb-3 mt-3">
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
          <Col md="6" className="mb-3 mt-3">
            <FormGroup row>
              <Col className="text-left btn-search">
                <Link to ='/system/roles/add'>
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
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  isChangeStatusRolesSuccess: state.ListRole.isChangeStatusRolesSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  getListRole: (data) => dispatch(getListRole(data)),
});


SearchByNameRole.propTypes = {
  getListRole: PropTypes.func,
  isChangeStatusRolesSuccess: PropTypes.object,
  currentPage: PropTypes.number,
  perPage: PropTypes.number,
};

SearchByNameRole.defaultProps = {
getListRole: () => {},
  isChangeStatusRolesSuccess: null,
  currentPage: 0,
  perPage: 0,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchByNameRole));
