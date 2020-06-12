import React, {Component} from 'react';
import {Card, CardBody, CardHeader, Col, Row,} from 'reactstrap';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Pagination from 'react-js-pagination';
import Select from 'react-select';
import FillMerchant from './FillMerchant';
import TableTerminal from './TableTerminal';
import CONST_VARIABLE from '../../../utils/constants';
import Constants from '../Constants';
import {getTerminalListDenied,} from '../../../store/actions/terminal/terminal';
import moment from 'moment';
import {clearMerchantCodeName} from "../../../store/actions/masterMerchant/masterMerchant";

class HistoryTerminalListDenied extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      perPage: 10,
      defaultData: {
        fromDate: moment(moment().subtract(1, 'months').toDate()).format('DD/MM/YYYY 00:00:00'),
        toDate: moment(new Date()).format('DD/MM/YYYY 00:00:00'),
        fromRow: 0,
        pageSize: 10,
        data: {
          terminalId: '',
          merchantId: '',
          deniedId: 0,
          deniedUser: '',
          terminalBranchId: '',
          levelTerminal: '',
          type: '1',
        },
      },
    };
  }

  componentDidMount() {
    setTimeout(() => {
      const searchParams = JSON.parse(sessionStorage.getItem('searchParams'));
      if (searchParams && searchParams.terminalListHistoryDenied) {
        this.setState({
          currentPage: searchParams.terminalListHistoryDenied.fromRow / searchParams.terminalListHistoryDenied.pageSize + 1,
          perPage: searchParams.terminalListHistoryDenied.pageSize,
        });
      }
    }, 0);
  }

  componentDidUpdate(prevProps) {
    const { changePageSearchTerminal } = this.props;
    if (changePageSearchTerminal !== prevProps.changePageSearchTerminal) {
      if (changePageSearchTerminal === 1) {
        this.setState({
          currentPage: 1,
        });
      }
    }
  }

  componentWillUnmount() {
    const { clearMerchantCodeName } = this.props;
    clearMerchantCodeName();
  }

  handlePageChange = (pageNumber) => {
    const { getTerminalListDenied, dataSearchTerminal } = this.props;
    const { perPage, defaultData } = this.state;
    if (
      Object.entries(dataSearchTerminal).length !== 0
      && dataSearchTerminal.constructor === Object
    ) {
      this.setState({
        currentPage: pageNumber,
      }, () => {
        dataSearchTerminal.fromRow = perPage * this.state.currentPage - perPage;
        getTerminalListDenied(dataSearchTerminal);

        let storedData = JSON.parse(sessionStorage.getItem('searchParams'));
        storedData = {
          ...(storedData && storedData.terminalListHistoryDenied) || defaultData,
          fromRow: perPage * this.state.currentPage - perPage,
          pageSize: perPage,
        };
        sessionStorage.setItem('searchParams', JSON.stringify({
          terminalListHistoryDenied: storedData,
        }));
      });
    }
  };

  handleRowPageChange = (e) => {
    const { getTerminalListDenied, dataSearchTerminal, defaultData } = this.props;
    this.setState({
      perPage: e.value,
    });
    if (
      Object.entries(dataSearchTerminal).length !== 0
      && dataSearchTerminal.constructor === Object
    ) {
      this.setState({
        perPage: e.value,
        currentPage: 1,
      }, () => {
        dataSearchTerminal.pageSize = this.state.perPage;
        getTerminalListDenied(dataSearchTerminal);

        let storedData = JSON.parse(sessionStorage.getItem('searchParams'));
        storedData = {
          ...(storedData && storedData.terminalListHistoryDenied) || defaultData,
          fromRow: e.value * this.state.currentPage - e.value.value,
          pageSize: e.value,
        };
        sessionStorage.setItem('searchParams', JSON.stringify({
          terminalListHistoryDenied: storedData,
        }));
      });
    }
  }

  render() {
    const { currentPage, perPage } = this.state;
    const { listTerminalTableDenied } = this.props;
    const totalRow = (listTerminalTableDenied && listTerminalTableDenied.totalRow) || 0;
    const showingOption = `Hiển thị ${currentPage * perPage - perPage + 1} - ${(currentPage * perPage) > totalRow ? totalRow : (currentPage * perPage)} của ${totalRow} bản ghi`;
    return (
      <>
        <div className="animated fadeIn fee-table" style={{ background: 'white' }}>
          <Card>
            <CardHeader>
              <span className="text-bold">{Constants.TerminalList.historyTerminalListDenied}</span>
            </CardHeader>
            <CardBody>
              <FillMerchant
                changeSearch={() => { this.setState({ currentPage: 1, perPage: 10 }); }}
                currentPage={currentPage}
                perPage={perPage}
              />
              <TableTerminal tData={listTerminalTableDenied.data} />
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
  listTerminalTableDenied: state.terminal.listTerminalTableDenied,
  dataSearchTerminal: state.terminal.dataSearchTerminal,
  changePageSearchTerminal: state.terminal.changePageSearchTerminal,
});

const mapDispatchToProps = (dispatch) => ({
  getTerminalListDenied: (data) => dispatch(getTerminalListDenied(data)),
  clearMerchantCodeName: () => dispatch(clearMerchantCodeName()),
});


HistoryTerminalListDenied.propTypes = {
  listTerminalTableDenied: PropTypes.object,
  dataSearchTerminal: PropTypes.object,
  changePageSearchTerminal: PropTypes.number,
};

HistoryTerminalListDenied.defaultProps = {
  listTerminalTableDenied: {},
  dataSearchTerminal: {},
  changePageSearchTerminal: 0,
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryTerminalListDenied);
