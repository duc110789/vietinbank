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
  getDetailTransactionMerchant,
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
    const { changePageSearchReportMerchant } = this.props;
    if (changePageSearchReportMerchant !== prevProps.changePageSearchReportMerchant) {
      if (changePageSearchReportMerchant === 1) {
        this.setState({
          currentPage: 1,
        });
      }
    }
  }

  handlePageChange = (pageNumber) => {
    const { getDetailTransactionMerchant, dataSearchReportMerchant } = this.props;
    const { perPage } = this.state;
    if (
      Object.entries(dataSearchReportMerchant).length !== 0
      && dataSearchReportMerchant.constructor === Object
    ) {
      this.setState({
        currentPage: pageNumber,
      }, () => {
        dataSearchReportMerchant.fromRow = perPage * this.state.currentPage - perPage;
        getDetailTransactionMerchant(dataSearchReportMerchant);
      });
    }
  };

  handleRowPageChange = (e) => {
    const { getDetailTransactionMerchant, dataSearchReportMerchant } = this.props;
    this.setState({
      perPage: e.value,
    });
    if (
      Object.entries(dataSearchReportMerchant).length !== 0
      && dataSearchReportMerchant.constructor === Object
    ) {
      this.setState({
        perPage: e.value,
      }, () => {
        dataSearchReportMerchant.pageSize = this.state.perPage;
        getDetailTransactionMerchant(dataSearchReportMerchant);
      });
    }
  }

  render() {
    const { currentPage, perPage } = this.state;
    const { listTransactionMerchant } = this.props;
    const totalRow = (listTransactionMerchant && listTransactionMerchant.totalRow) || 0;
    const showingOption = `Hiển thị ${currentPage * perPage - perPage + 1} - ${(currentPage * perPage) > totalRow ? totalRow : (currentPage * perPage)} của ${totalRow} bản ghi`;
    return (
      <>
        <div className="animated fadeIn fee-table" style={{ background: 'white' }}>
          <Card>
            <CardHeader>
              <span className="text-bold">{Constants.StatisticalReport.reportDetailTransactionMerchant}</span>
            </CardHeader>
            <CardBody>
              <FillReport currentPage={currentPage} perPage={perPage} />
              <TableReport tData={listTransactionMerchant && listTransactionMerchant.data} />
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
  listTransactionMerchant: state.statisticalReport.listTransactionMerchant,
  dataSearchReportMerchant: state.statisticalReport.dataSearchReportMerchant,
  changePageSearchReportMerchant: state.statisticalReport.changePageSearchReportMerchant,
});

const mapDispatchToProps = (dispatch) => ({
  getDetailTransactionMerchant: (data) => dispatch(getDetailTransactionMerchant(data)),
});


ReportDetailTranSuccess.propTypes = {
  listTransactionMerchant: PropTypes.object,
  dataSearchReportMerchant: PropTypes.object,
  changePageSearchReportMerchant: PropTypes.number,
};

ReportDetailTranSuccess.defaultProps = {
  listTransactionMerchant: {},
  dataSearchReportMerchant: {},
  changePageSearchReportMerchant: 0,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportDetailTranSuccess);
