/* eslint-disable */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-shadow */
import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import Select from 'react-select';
import PropTypes from 'prop-types';
import {Button, Col, FormGroup, Label, Row,} from 'reactstrap';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import 'react-datepicker/dist/react-datepicker.css';
import {connect} from 'react-redux';
import {status} from '../commonConstants';
import {loadDefaultDataStaff} from '../../../store/actions/StaffManagementAction/StaffManagementListAction'

class InfoSearchStaff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayDepartment: JSON.parse(localStorage.getItem('LIST_BRANCH_BANK')),
      data: {
        fromRow: 0,
        pageSize: 10,
        staffCode: '',
        fullName: '',
        departCode: '',
        status: 0,
      }
    }
  }

  componentDidMount() {
    const { loadDefaultDataStaff } = this.props;
    const { data } = this.state;
    setTimeout(() => {
      const searchParams = sessionStorage.getItem('searchParams');
      const dataSearch = JSON.parse(searchParams);
      if (searchParams) {
        const newData = {
          ...dataSearch,
          status: dataSearch.status.value || '',
          departCode: dataSearch.departCode.value || '',
        };
        this.setState({
          data: dataSearch,
          fromRow: dataSearch.fromRow,
          pageSize: dataSearch.pageSize,
        });
        loadDefaultDataStaff(newData);
      } else {
        loadDefaultDataStaff(data);
      }
    }, 0);
  }

  onHandleSearch = (e) => {
    e.preventDefault();
    const { loadDefaultDataStaff } = this.props;
    const { data } = this.state;

    const newData = { ...data };
    newData.status = newData.status.value || '';
    newData.departCode = newData.departCode.value || '';

    const storedData = {
      ...data,
      fromRow: 0,
      pageSize: 10,
    };

    const searchData = {
      ...newData,
      fromRow: 0,
      pageSize: 10,
    };

    sessionStorage.setItem('searchParams', JSON.stringify(storedData));
    this.props.changeSearch();
    loadDefaultDataStaff(searchData);
  }

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
        departCode: event,
      }
    })
  };

  onChangeFullName = (e) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        fullName: e.target.value,
      }
    })
  }

  onChangeStaffCode = (e) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        staffCode: e.target.value,
      }
    })
  }


  render() {
    const {arrayDepartment, data} = this.state;
    let convertArrayDepartment =  [{ value: '', label: 'Tất cả' }];
    arrayDepartment.forEach((item, i) => {
      convertArrayDepartment.push({
        value: arrayDepartment[i].departmentCode,
        label: arrayDepartment[i].departmentName,
      })
    });

    return (
      <Form>
        <Row>
          <Col md="6">
            <FormGroup row>
              <Col lg="5" className="label-left">
                <Label htmlFor="code">Mã nhân viên</Label>
              </Col>
              <Col lg="7">
                <Input
                  value={data.staffCode}
                  type='text'
                  className="form-control"
                  onChange={this.onChangeStaffCode}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col lg="5" className="label-left">
                <Label htmlFor="code">Tên đầy đủ</Label>
              </Col>
              <Col lg="7">
                <Input
                  value={data.fullName}
                  type="text"
                  className="form-control"
                  onChange={this.onChangeFullName}
                />
              </Col>
            </FormGroup>
          </Col>

          <Col md="6">
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
                  value={data.departCode}
                  onChange={this.onChangeDepartment}
                  options={convertArrayDepartment}
                  placeholder="Tất cả"
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
                <Link to ='/system/staff/add'>
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

});

const mapDispatchToProps = (dispatch) => ({
  loadDefaultDataStaff: (data) => dispatch(loadDefaultDataStaff(data))
});


InfoSearchStaff.propTypes = {
  loadDefaultDataStaff: PropTypes.func,

};

InfoSearchStaff.defaultProps = {
  loadDefaultDataStaff: () => {},
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(InfoSearchStaff));
