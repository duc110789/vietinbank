/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Card, CardBody, CardHeader, Col, Row,} from 'reactstrap';
import './index.scss';
import Pagination from 'react-js-pagination';
import Select from 'react-select';
import SearchByNameRole from './SearchByNameRole';
import TableRoles from './TableRoles';
import CONST_VARIABLE from '../../../utils/constants';
import {getListRole} from '../../../store/actions/RoleManagementAction/ListRoleAction';

// eslint-disable-next-line react/prefer-stateless-function
class ListStaffPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      perPage: 10,
      defaultData: {
        data: {
          groupName: '',
          status: '',
        },
      },
    };
  }

  componentDidMount() {
    const searchParams = JSON.parse(sessionStorage.getItem('searchParams'));
    if (searchParams) {
      this.setState({
        currentPage: searchParams.fromRow / searchParams.pageSize + 1,
        perPage: searchParams.pageSize,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { changePageSearchRoles } = this.props;
    if (changePageSearchRoles !== prevProps.changePageSearchRoles) {
      if (changePageSearchRoles === 1) {
        this.setState({
          currentPage: 1,
        });
      }
    }
  }

  handlePageChange = (pageNumber) => {
    const { getListRole, dataSearchRoles } = this.props;
    const { perPage, defaultData } = this.state;
    if (
      Object.entries(dataSearchRoles).length !== 0
      && dataSearchRoles.constructor === Object
    ) {
      this.setState({
        currentPage: pageNumber,
      }, () => {
        dataSearchRoles.fromRow = perPage * this.state.currentPage - perPage;
        getListRole(dataSearchRoles);

        let storedData = JSON.parse(sessionStorage.getItem('searchParams'));
        storedData = {
          ...storedData || defaultData,
          fromRow: perPage * this.state.currentPage - perPage,
          pageSize: perPage,
        };
        sessionStorage.setItem('searchParams', JSON.stringify(storedData));
      });
    }
  };

  handleRowPageChange = (e) => {
    const { getListRole, dataSearchRoles } = this.props;
    const { defaultData } = this.state;
    this.setState({
      perPage: e.value,
    });
    if (
      Object.entries(dataSearchRoles).length !== 0
      && dataSearchRoles.constructor === Object
    ) {
      this.setState({
        perPage: e.value,
      }, () => {
        dataSearchRoles.pageSize = this.state.perPage;
        getListRole(dataSearchRoles);

        let storedData = JSON.parse(sessionStorage.getItem('searchParams'));
        storedData = {
          ...storedData || defaultData,
          fromRow: e.value * this.state.currentPage - e.value,
          pageSize: e.value,
        };
        sessionStorage.setItem('searchParams', JSON.stringify(storedData));
      });
    }
  }

  render() {
    const { currentPage, perPage } = this.state;
    const { resDataRoleGroup } = this.props;
    const totalRow = (resDataRoleGroup && resDataRoleGroup.totalRow) || 0;
    const showingOption = `Hiển thị ${currentPage * perPage - perPage + 1} - ${(currentPage * perPage) > totalRow ? totalRow : (currentPage * perPage)} của ${totalRow} bản ghi`;
    return (
      <>
        <div className="animated fadeIn fee-table" style={{ background: 'white' }}>
          <Card>
            <CardHeader>
              <span className="text-bold">Tổng hợp danh sách phân quyền</span>
            </CardHeader>
            <CardBody>
              <SearchByNameRole
                changeSearch={() => { this.setState({ currentPage: 1, perPage: 10 }); }}
                currentPage={currentPage}
                perPage={perPage}
              />
              <TableRoles perPage={perPage} currentPage={currentPage} />
              <div className="fee-table__pagination">
                <Row>
                  <Col
                    xl={{
                      size: 6,
                    }}
                    lg={{
                      size: 6,
                    }}
                    md={{
                      size: 6,
                    }}
                    sm={{
                      size: 12,
                    }}
                    xs={{
                      size: 12,
                    }}
                  >
                    <div className="select-perpage">
                      <div className="select-perpage__info">
                        <Select
                          id="LIMIT_DROPDOWN"
                          value={{
                            value: perPage,
                            label: perPage,
                          }}
                          onChange={this.handleRowPageChange}
                          options={CONST_VARIABLE.PAGE_OPTION}
                          className="select-pagination"
                          menuPlacement="top"
                        />
                        <p>
                          {showingOption}
                        </p>
                      </div>
                    </div>
                  </Col>
                  <Col
                    xl={{
                      size: 6,
                    }}
                    lg={{
                      size: 6,
                    }}
                    md={{
                      size: 6,
                    }}
                    sm={{
                      size: 12,
                    }}
                    xs={{
                      size: 12,
                    }}
                  >
                    <Pagination
                      activePage={currentPage}
                      itemsCountPerPage={perPage}
                      totalItemsCount={totalRow}
                      pageRangeDisplayed={5}
                      onChange={this.handlePageChange}
                    />
                  </Col>
                </Row>
              </div>
            </CardBody>
          </Card>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  resDataRoleGroup: state.ListRole.resDataRoleGroup,
  dataSearchRoles: state.ListRole.dataSearchRoles,
  changePageSearchRoles: state.ListRole.changePageSearchRoles,
});

const mapDispatchToProps = (dispatch) => ({
  getListRole: (data) => dispatch(getListRole(data)),
});


ListStaffPage.propTypes = {
  resDataRoleGroup: PropTypes.object,
  changePageSearchRoles: PropTypes.number,
  dataSearchRoles: PropTypes.object,
};

ListStaffPage.defaultProps = {
  resDataRoleGroup: null,
  changePageSearchRoles: 0,
  dataSearchRoles: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListStaffPage);
