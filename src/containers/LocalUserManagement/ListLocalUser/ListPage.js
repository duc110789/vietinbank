/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {connect} from 'react-redux';
import {Card, CardBody, CardHeader, Col, Row,} from 'reactstrap';
import './index.scss';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Pagination from 'react-js-pagination';
import InfoSearch from './InfoSearch';
import TableLocalUser from './TableLocalUser';
import CONST_VARIABLE from '../../../utils/constants';
import {getDataListPage} from '../../../store/actions/LocalUserManagementAction/ListPageAction';

// eslint-disable-next-line react/prefer-stateless-function
class ListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      perPage: 10,
      defaultData: {
        data: {
          username: '',
          email: '',
          departmentCode: '',
          status: '',
          roleId: '',
        },
      },
      isSearch: false,
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
    const { changePageSearchLocals } = this.props;
    if (changePageSearchLocals !== prevProps.changePageSearchLocals) {
      if (changePageSearchLocals === 1) {
        this.setState({
          currentPage: 1,
        });
      }
    }
  }

  handlePageChange = (pageNumber) => {
    const { getDataListPage, dataSearchLocals } = this.props;
    const { perPage, defaultData } = this.state;

    if (
      Object.entries(dataSearchLocals).length !== 0
      && dataSearchLocals.constructor === Object
    ) {
      this.setState({
        currentPage: pageNumber,
      }, () => {
        dataSearchLocals.fromRow = perPage * this.state.currentPage - perPage;
        getDataListPage(dataSearchLocals);

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
    const { getDataListPage, dataSearchLocals } = this.props;
    const { defaultData } = this.state;
    this.setState({
      perPage: e.value,
      currentPage: 1,
    });
    if (
      Object.entries(dataSearchLocals).length !== 0
      && dataSearchLocals.constructor === Object
    ) {
      this.setState({
        perPage: e.value,
      }, () => {
        let storedData = JSON.parse(sessionStorage.getItem('searchParams'));
        dataSearchLocals.pageSize = this.state.perPage;
        storedData = {
          ...storedData || defaultData,
          fromRow: e.value * this.state.currentPage - e.value,
          pageSize: e.value,
        };
        sessionStorage.setItem('searchParams', JSON.stringify(storedData));
        dataSearchLocals.fromRow = 0;
        getDataListPage(dataSearchLocals);
      });
    }
  }

  render() {
    const { currentPage, perPage } = this.state;
    const { resDataListPage } = this.props;
    const totalRow = resDataListPage ? (resDataListPage && resDataListPage.totalRow) : 0;
    const showingOption = `Hiển thị ${currentPage * perPage - perPage + 1} - ${(currentPage * perPage) > totalRow ? totalRow : (currentPage * perPage)} của ${totalRow} bản ghi`;
    return (
      <>
        <div className="animated fadeIn fee-table" style={{ background: 'white' }}>
          <Card>
            <CardHeader>
              <span className="text-bold">Quản lý tài khoản Local</span>
            </CardHeader>
            <CardBody>
              <InfoSearch
                changeSearch={() => { this.setState({ currentPage: 1, perPage: 10 }); }}
                currentPage={currentPage}
                perPage={perPage}
              />
              <TableLocalUser
                currentPage={currentPage}
                perPage={perPage}
              />
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
                      pageRangeDisplayed={10}
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
  resDataListPage: state.ListPage.resDataListPage,
  dataSearchLocals: state.ListPage.dataSearchLocals,
  changePageSearchLocals: state.ListPage.changePageSearchLocals,
});

const mapDispatchToProps = (dispatch) => ({
  getDataListPage: (data) => dispatch(getDataListPage(data)),
});


ListPage.propTypes = {
  resDataListPage: PropTypes.object,
  changePageSearchLocals: PropTypes.number,
  dataSearchLocals: PropTypes.object,
};

ListPage.defaultProps = {
  resDataListPage: {},
  changePageSearchLocals: 0,
  dataSearchLocals: () => {},
};

export default connect(mapStateToProps, mapDispatchToProps)(ListPage);
