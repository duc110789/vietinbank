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
import {getDetailTranBusinessSuccess,} from '../../../../store/actions/StatisticalReport/index';

class ReportDetailTranSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      perPage: 10,
    };
  }

  componentDidUpdate(prevProps) {
    const { changePageSearchReportBusiness } = this.props;
    if (changePageSearchReportBusiness !== prevProps.changePageSearchReportBusiness) {
      if (changePageSearchReportBusiness === 1) {
        this.setState({
          currentPage: 1,
        });
      }
    }
  }

  handlePageChange = (pageNumber) => {
    const { getDetailTranBusinessSuccess, dataSearchReportBusiness } = this.props;
    const { perPage } = this.state;
    if (
      Object.entries(dataSearchReportBusiness).length !== 0
      && dataSearchReportBusiness.constructor === Object
    ) {
      this.setState({
        currentPage: pageNumber,
      }, () => {
        dataSearchReportBusiness.fromRow = perPage * this.state.currentPage - perPage;
        getDetailTranBusinessSuccess(dataSearchReportBusiness);
      });
    }
  };

  handleRowPageChange = (e) => {
    const { getDetailTranBusinessSuccess, dataSearchReportBusiness } = this.props;
    this.setState({
      perPage: e.value,
    });
    if (
      Object.entries(dataSearchReportBusiness).length !== 0
      && dataSearchReportBusiness.constructor === Object
    ) {
      this.setState({
        perPage: e.value,
      }, () => {
        dataSearchReportBusiness.pageSize = this.state.perPage;
        getDetailTranBusinessSuccess(dataSearchReportBusiness);
      });
    }
  }

  render() {
    const { currentPage, perPage } = this.state;
    const { listDetailTranBusinessMake } = this.props;
    const totalRow = (listDetailTranBusinessMake && listDetailTranBusinessMake.totalRow) || 0;
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
              <TableReport
                tData={listDetailTranBusinessMake && listDetailTranBusinessMake.data}
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
  listDetailTranBusinessMake: state.statisticalReport.listDetailTranBusinessMake,
  dataSearchReportBusiness: state.statisticalReport.dataSearchReportBusiness,
  changePageSearchReportBusiness: state.statisticalReport.changePageSearchReportBusiness,
});

const mapDispatchToProps = (dispatch) => ({
  getDetailTranBusinessSuccess: (data) => dispatch(getDetailTranBusinessSuccess(data)),
});


ReportDetailTranSuccess.propTypes = {
  listDetailTranBusinessMake: PropTypes.object,
  dataSearchReportBusiness: PropTypes.object,
  changePageSearchReportBusiness: PropTypes.number,
};

ReportDetailTranSuccess.defaultProps = {
  listDetailTranBusinessMake: {},
  dataSearchReportBusiness: {},
  changePageSearchReportBusiness: 0,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportDetailTranSuccess);
