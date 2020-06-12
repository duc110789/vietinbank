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
  getDetailTransactionMerchantBranch,
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
    const { changePageSearchReportMerchantBranch } = this.props;
    if (changePageSearchReportMerchantBranch !== prevProps.changePageSearchReportMerchantBranch) {
      if (changePageSearchReportMerchantBranch === 1) {
        this.setState({
          currentPage: 1,
        });
      }
    }
  }

  handlePageChange = (pageNumber) => {
    const { getDetailTransactionMerchantBranch, dataSearchReportMerchantBranch } = this.props;
    const { perPage } = this.state;
    if (
      Object.entries(dataSearchReportMerchantBranch).length !== 0
      && dataSearchReportMerchantBranch.constructor === Object
    ) {
      this.setState({
        currentPage: pageNumber,
      }, () => {
        dataSearchReportMerchantBranch.fromRow = perPage * this.state.currentPage - perPage;
        getDetailTransactionMerchantBranch(dataSearchReportMerchantBranch);
      });
    }
  };

  handleRowPageChange = (e) => {
    const { getDetailTransactionMerchantBranch, dataSearchReportMerchantBranch } = this.props;
    this.setState({
      perPage: e.value,
    });
    if (
      Object.entries(dataSearchReportMerchantBranch).length !== 0
      && dataSearchReportMerchantBranch.constructor === Object
    ) {
      this.setState({
        perPage: e.value,
      }, () => {
        dataSearchReportMerchantBranch.pageSize = this.state.perPage;
        getDetailTransactionMerchantBranch(dataSearchReportMerchantBranch);
      });
    }
  }

  render() {
    const { currentPage, perPage } = this.state;
    const { listTransactionMerchantBranch } = this.props;
    const totalRow = (listTransactionMerchantBranch && listTransactionMerchantBranch.totalRow) || 0;
    const showingOption = `Hiển thị ${currentPage * perPage - perPage + 1} - ${(currentPage * perPage) > totalRow ? totalRow : (currentPage * perPage)} của ${totalRow} bản ghi`;
    return (
      <>
        <div className="animated fadeIn fee-table" style={{ background: 'white' }}>
          <Card>
            <CardHeader>
              <span className="text-bold">{Constants.StatisticalReport.reportDetailTransactionMerchantBranch}</span>
            </CardHeader>
            <CardBody>
              <FillReport currentPage={currentPage} perPage={perPage} />
              <TableReport tData={listTransactionMerchantBranch && listTransactionMerchantBranch.data} />
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
  listTransactionMerchantBranch: state.statisticalReport.listTransactionMerchantBranch,
  dataSearchReportMerchantBranch: state.statisticalReport.dataSearchReportMerchantBranch,
  changePageSearchReportMerchantBranch: state.statisticalReport.changePageSearchReportMerchantBranch,
});

const mapDispatchToProps = (dispatch) => ({
  getDetailTransactionMerchantBranch: (data) => dispatch(getDetailTransactionMerchantBranch(data)),
});


ReportDetailTranSuccess.propTypes = {
  listTransactionMerchantBranch: PropTypes.object,
  dataSearchReportMerchantBranch: PropTypes.object,
  changePageSearchReportMerchantBranch: PropTypes.number,
};

ReportDetailTranSuccess.defaultProps = {
  listTransactionMerchantBranch: {},
  dataSearchReportMerchantBranch: {},
  changePageSearchReportMerchantBranch: 0,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportDetailTranSuccess);
