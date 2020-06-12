import React, { Component } from 'react';
import {
  Card, CardHeader, CardBody, Row, Col,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';
import Select from 'react-select';
import FillReport from './FillReport';
import TableReport from './TableReport';
import CONST_VARIABLE from '../../../../utils/constants';
import Constants from '../../Constants';
import {
  getDetailTransactionSuccess,
} from '../../../../store/actions/StatisticalReport/index';

class ReportDetailTranSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      perPage: 10,
    };
  }

  componentDidUpdate(prevProps) {
    const { changePageSearchReport } = this.props;
    if (changePageSearchReport !== prevProps.changePageSearchReport) {
      if (changePageSearchReport === 1) {
        this.setState({
          currentPage: 1,
        });
      }
    }
  }

  handlePageChange = (pageNumber) => {
    const { getDetailTransactionSuccess, dataSearchReport } = this.props;
    const { perPage } = this.state;
    if (
      Object.entries(dataSearchReport).length !== 0
      && dataSearchReport.constructor === Object
    ) {
      this.setState({
        currentPage: pageNumber,
      }, () => {
        dataSearchReport.fromRow = perPage * this.state.currentPage - perPage;
        getDetailTransactionSuccess(dataSearchReport);
      });
    }
  };

  handleRowPageChange = (e) => {
    const { getDetailTransactionSuccess, dataSearchReport } = this.props;
    this.setState({
      perPage: e.value,
    });
    if (
      Object.entries(dataSearchReport).length !== 0
      && dataSearchReport.constructor === Object
    ) {
      this.setState({
        perPage: e.value,
      }, () => {
        dataSearchReport.pageSize = this.state.perPage;
        getDetailTransactionSuccess(dataSearchReport);
      });
    }
  }

  render() {
    const { currentPage, perPage } = this.state;
    const { listDetailTransactionMake } = this.props;
    const totalRow = (listDetailTransactionMake && listDetailTransactionMake.totalRow) || 0;
    const showingOption = `Hiển thị ${currentPage * perPage - perPage + 1} - ${(currentPage * perPage) > totalRow ? totalRow : (currentPage * perPage)} của ${totalRow} bản ghi`;
    return (
      <>
        <div className="animated fadeIn fee-table" style={{ background: 'white' }}>
          <Card>
            <CardHeader>
              <span className="text-bold">{Constants.StatisticalReport.reportDetailTransactionSuccess}</span>
            </CardHeader>
            <CardBody>
              <FillReport currentPage={currentPage} perPage={perPage} />
              <TableReport tData={listDetailTransactionMake && listDetailTransactionMake.data} />
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
  listDetailTransactionMake: state.statisticalReport.listDetailTransactionMake,
  dataSearchReport: state.statisticalReport.dataSearchReport,
  changePageSearchReport: state.statisticalReport.changePageSearchReport,
});

const mapDispatchToProps = (dispatch) => ({
  getDetailTransactionSuccess: (data) => dispatch(getDetailTransactionSuccess(data)),
});


ReportDetailTranSuccess.propTypes = {
  listDetailTransactionMake: PropTypes.object,
  dataSearchReport: PropTypes.object,
  changePageSearchReport: PropTypes.number,
};

ReportDetailTranSuccess.defaultProps = {
  listDetailTransactionMake: {},
  dataSearchReport: {},
  changePageSearchReport: 0,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportDetailTranSuccess);
