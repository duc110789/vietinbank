import React, { Component } from 'react';
import {
  Card, CardHeader, CardBody, Row, Col,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';
import Select from 'react-select';
import FillMerchant from './FillMerchant';
import TableMerchant from './TableMerchant';
import CONST_VARIABLE from '../../../utils/constants';
import Constants from '../Constants';
import {
  getMidTidList,
} from '../../../store/actions/mIdTid/mIdTid';

class UserManagerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      perPage: 10,
    };
  }

  componentDidUpdate(prevProps) {
    const { changePageSearchMidTid } = this.props;
    if (changePageSearchMidTid !== prevProps.changePageSearchMidTid) {
      if (changePageSearchMidTid === 1) {
        this.setState({
          currentPage: 1,
        });
      }
    }
  }

  handlePageChange = (pageNumber) => {
    const { getMidTidList, dataSearchMidTid } = this.props;
    const { perPage } = this.state;
    if (
      Object.entries(dataSearchMidTid).length !== 0
      && dataSearchMidTid.constructor === Object
    ) {
      this.setState({
        currentPage: pageNumber,
      }, () => {
        dataSearchMidTid.fromRow = perPage * this.state.currentPage - perPage;
        getMidTidList(dataSearchMidTid);
      });
    }
  };

  handleRowPageChange = (e) => {
    const { getMidTidList, dataSearchMidTid } = this.props;
    this.setState({
      perPage: e.value,
    });
    if (
      Object.entries(dataSearchMidTid).length !== 0
      && dataSearchMidTid.constructor === Object
    ) {
      this.setState({
        perPage: e.value,
      }, () => {
        dataSearchMidTid.pageSize = this.state.perPage;
        getMidTidList(dataSearchMidTid);
      });
    }
  }

  render() {
    const { currentPage, perPage } = this.state;
    const { listMidTidTable } = this.props;
    const totalRow = (listMidTidTable && listMidTidTable.totalRow) || 0;
    const showingOption = `Hiển thị ${currentPage * perPage - perPage + 1} - ${(currentPage * perPage) > totalRow ? totalRow : (currentPage * perPage)} của ${totalRow} bản ghi`;
    return (
      <>
        <div className="animated fadeIn fee-table" style={{ background: 'white' }}>
          <Card>
            <CardHeader>
              <span className="text-bold">{Constants.AccountWebApp.titleUserManagerList}</span>
            </CardHeader>
            <CardBody>
              <FillMerchant currentPage={currentPage} perPage={perPage} />
              <TableMerchant
                tData={listMidTidTable && listMidTidTable.data}
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
  listMidTidTable: state.mIdTId.listMidTidTable,
  dataSearchMidTid: state.mIdTId.dataSearchMidTid,
  changePageSearchMidTid: state.mIdTId.changePageSearchMidTid,
});

const mapDispatchToProps = (dispatch) => ({
  getMidTidList: (data) => dispatch(getMidTidList(data)),
});


UserManagerList.propTypes = {
  listMidTidTable: PropTypes.object,
  dataSearchMidTid: PropTypes.object,
  changePageSearchMidTid: PropTypes.number,
};

UserManagerList.defaultProps = {
  listMidTidTable: {},
  dataSearchMidTid: {},
  changePageSearchMidTid: 0,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManagerList);
