import React, {Component} from 'react';
import {Card, CardBody, CardHeader, Col, Row,} from 'reactstrap';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Pagination from 'react-js-pagination';
import Select from 'react-select';
import FillReport from './FillReport';
import TableReport from './TableReport';
import CONST_VARIABLE from '../../../../utils/constants';
import Constants from '../../Constants';
import {getDetailTransactionUpdate,} from '../../../../store/actions/StatisticalReport/index';

class ReportDetailTranSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      perPage: 10,
    };
  }

  componentDidUpdate(prevProps) {
    const { changePageSearchReportUpdate } = this.props;
    if (changePageSearchReportUpdate !== prevProps.changePageSearchReportUpdate) {
      if (changePageSearchReportUpdate === 1) {
        this.setState({
          currentPage: 1,
        });
      }
    }
  }

  handlePageChange = (pageNumber) => {
    const { getDetailTransactionUpdate, dataSearchReportUpdate } = this.props;
    const { perPage } = this.state;
    if (
      Object.entries(dataSearchReportUpdate).length !== 0
      && dataSearchReportUpdate.constructor === Object
    ) {
      this.setState({
        currentPage: pageNumber,
      }, () => {
        dataSearchReportUpdate.fromRow = perPage * this.state.currentPage - perPage;
        getDetailTransactionUpdate(dataSearchReportUpdate);
      });
    }
  };

  handleRowPageChange = (e) => {
    const { getDetailTransactionUpdate, dataSearchReportUpdate } = this.props;
    this.setState({
      perPage: e.value,
    });
    if (
      Object.entries(dataSearchReportUpdate).length !== 0
      && dataSearchReportUpdate.constructor === Object
    ) {
      this.setState({
        perPage: e.value,
      }, () => {
        dataSearchReportUpdate.pageSize = this.state.perPage;
        getDetailTransactionUpdate(dataSearchReportUpdate);
      });
    }
  }

  render() {
    const { currentPage, perPage } = this.state;
    const { listDetailTransactionUpdate } = this.props;
    const totalRow = (listDetailTransactionUpdate && listDetailTransactionUpdate.totalRow) || 0;
    const showingOption = `Hiển thị ${currentPage * perPage - perPage + 1} - ${(currentPage * perPage) > totalRow ? totalRow : (currentPage * perPage)} của ${totalRow} bản ghi`;
    return (
      <>
        <div className="animated fadeIn fee-table" style={{ background: 'white' }}>
          <Card>
            <CardHeader>
              <span className="text-bold">{Constants.StatisticalReport.reportDetailTransactionUpdate}</span>
            </CardHeader>
            <CardBody>
              <FillReport currentPage={currentPage} perPage={perPage} />
              <TableReport tData={listDetailTransactionUpdate && listDetailTransactionUpdate.data} />
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
  listDetailTransactionUpdate: state.statisticalReport.listDetailTransactionUpdate,
  dataSearchReportUpdate: state.statisticalReport.dataSearchReportUpdate,
  changePageSearchReportUpdate: state.statisticalReport.changePageSearchReportUpdate,
});

const mapDispatchToProps = (dispatch) => ({
  getDetailTransactionUpdate: (data) => dispatch(getDetailTransactionUpdate(data)),
});


ReportDetailTranSuccess.propTypes = {
  listDetailTransactionUpdate: PropTypes.object,
  dataSearchReportUpdate: PropTypes.object,
  changePageSearchReportUpdate: PropTypes.number,
};

ReportDetailTranSuccess.defaultProps = {
  listDetailTransactionUpdate: {},
  dataSearchReportUpdate: {},
  changePageSearchReportUpdate: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportDetailTranSuccess);
