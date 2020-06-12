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
  getDetailTransactionMmc,
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
    const { changePageSearchReportMmc } = this.props;
    if (changePageSearchReportMmc !== prevProps.changePageSearchReportMmc) {
      if (changePageSearchReportMmc === 1) {
        this.setState({
          currentPage: 1,
        });
      }
    }
  }

  handlePageChange = (pageNumber) => {
    const { getDetailTransactionMmc, dataSearchReportMmc } = this.props;
    const { perPage } = this.state;
    if (
      Object.entries(dataSearchReportMmc).length !== 0
      && dataSearchReportMmc.constructor === Object
    ) {
      this.setState({
        currentPage: pageNumber,
      }, () => {
        dataSearchReportMmc.fromRow = perPage * this.state.currentPage - perPage;
        getDetailTransactionMmc(dataSearchReportMmc);
      });
    }
  };

  handleRowPageChange = (e) => {
    const { getDetailTransactionMmc, dataSearchReportMmc } = this.props;
    this.setState({
      perPage: e.value,
    });
    if (
      Object.entries(dataSearchReportMmc).length !== 0
      && dataSearchReportMmc.constructor === Object
    ) {
      this.setState({
        perPage: e.value,
      }, () => {
        dataSearchReportMmc.pageSize = this.state.perPage;
        getDetailTransactionMmc(dataSearchReportMmc);
      });
    }
  }

  render() {
    const { currentPage, perPage } = this.state;
    const { listTransactionMmc } = this.props;
    const totalRow = (listTransactionMmc && listTransactionMmc.totalRow) || 0;
    const showingOption = `Hiển thị ${currentPage * perPage - perPage + 1} - ${(currentPage * perPage) > totalRow ? totalRow : (currentPage * perPage)} của ${totalRow} bản ghi`;
    return (
      <>
        <div className="animated fadeIn fee-table" style={{ background: 'white' }}>
          <Card>
            <CardHeader>
              <span className="text-bold">{Constants.StatisticalReport.reportDetailTransactionMmc}</span>
            </CardHeader>
            <CardBody>
              <FillReport currentPage={currentPage} perPage={perPage} />
              <TableReport tData={listTransactionMmc && listTransactionMmc.data} />
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
  listTransactionMmc: state.statisticalReport.listTransactionMmc,
  dataSearchReportMmc: state.statisticalReport.dataSearchReportMmc,
  changePageSearchReportMmc: state.statisticalReport.changePageSearchReportMmc,
});

const mapDispatchToProps = (dispatch) => ({
  getDetailTransactionMmc: (data) => dispatch(getDetailTransactionMmc(data)),
});


ReportDetailTranSuccess.propTypes = {
  listTransactionMmc: PropTypes.object,
  dataSearchReportMmc: PropTypes.object,
  changePageSearchReportMmc: PropTypes.number,
};

ReportDetailTranSuccess.defaultProps = {
  listTransactionMmc: {},
  dataSearchReportMmc: {},
  changePageSearchReportMmc: 0,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportDetailTranSuccess);
