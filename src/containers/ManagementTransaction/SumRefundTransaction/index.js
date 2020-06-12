import React, { Component } from 'react';
import {
  Card, CardBody, CardHeader, Col, Row,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';
import Select from 'react-select';
import moment from 'moment';
import FillTransaction from './FillTransaction';
import TableTransaction from './TableTransaction';
import CONST_VARIABLE from '../../../utils/constants';
import Constants from '../Constants';
import { getTransactionListRefund } from '../../../store/actions/ManagementTransaction/index';
import { clearMerchantCodeName } from '../../../store/actions/masterMerchant/masterMerchant';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      perPage: 10,
      defaultData: {
        data: { status: -1 },
        online: true,
        fromDate: moment(new Date()).format('DD/MM/YYYY 00:00:00'),
        toDate: moment(new Date()).format('DD/MM/YYYY 23:59:59'),
      },
    };
  }

  componentDidMount() {
    this.getListSelectBox();
    setTimeout(() => {
      const searchParams = JSON.parse(sessionStorage.getItem('searchParams'));
      if (searchParams && searchParams.listTransactionRefund) {
        this.setState({
          currentPage: searchParams.listTransactionRefund.fromRow / searchParams.listTransactionRefund.pageSize + 1,
          perPage: searchParams.listTransactionRefund.pageSize,
        });
      }
    }, 0);
  }

  componentDidUpdate(prevProps) {
    const { changePageSearchTransactionRefund } = this.props;
    if (changePageSearchTransactionRefund !== prevProps.changePageSearchTransactionRefund) {
      if (changePageSearchTransactionRefund === 1) {
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

  getListSelectBox = () => {
    const listQrChannel = JSON.parse(localStorage && localStorage.getItem('QR_CHANNEL'));

    const updateListQrChannel = [{ value: '', label: 'Tất cả' }];
    if (listQrChannel) {
      for (let i = 0; i < listQrChannel.length; i += 1) {
        updateListQrChannel.push({
          value: listQrChannel[i].code,
          label: `${listQrChannel[i].description}`,
        });
      }
    }

    this.setState({
      listQrChannel: updateListQrChannel,
    });
  };

  handlePageChange = (pageNumber) => {
    const { getTransactionListRefund, dataSearchTransactionRefund } = this.props;
    const { perPage, defaultData } = this.state;
    if (
      Object.entries(dataSearchTransactionRefund).length !== 0
      && dataSearchTransactionRefund.constructor === Object
    ) {
      this.setState({
        currentPage: pageNumber,
      }, () => {
        dataSearchTransactionRefund.fromRow = perPage * this.state.currentPage - perPage;
        getTransactionListRefund(dataSearchTransactionRefund);

        let storedData = JSON.parse(sessionStorage.getItem('searchParams'));
        storedData = {
          ...(storedData && storedData.listTransactionRefund) || defaultData,
          fromRow: perPage * this.state.currentPage - perPage,
          pageSize: perPage,
        };
        sessionStorage.setItem('searchParams', JSON.stringify({
          listTransactionRefund: storedData,
        }));
      });
    }
  };

  handleRowPageChange = (e) => {
    const { getTransactionListRefund, dataSearchTransactionRefund } = this.props;
    const { defaultData } = this.state;
    this.setState({
      perPage: e.value,
      currentPage: 1,
    });
    if (
      Object.entries(dataSearchTransactionRefund).length !== 0
      && dataSearchTransactionRefund.constructor === Object
    ) {
      this.setState({
        perPage: e.value,
      }, () => {
        dataSearchTransactionRefund.pageSize = this.state.perPage;
        getTransactionListRefund(dataSearchTransactionRefund);

        let storedData = JSON.parse(sessionStorage.getItem('searchParams'));
        storedData = {
          ...(storedData && storedData.listTransactionRefund) || defaultData,
          fromRow: e.value * this.state.currentPage - e.value.value,
          pageSize: e.value,
        };
        sessionStorage.setItem('searchParams', JSON.stringify({
          listTransactionRefund: storedData,
        }));
      });
    }
  }

  render() {
    const { currentPage, perPage, listQrChannel } = this.state;
    const { listTransactionTableRefund } = this.props;
    const totalRow = (listTransactionTableRefund && listTransactionTableRefund.totalRow) || 0;
    const showingOption = `Hiển thị ${currentPage * perPage - perPage + 1} - ${(currentPage * perPage) > totalRow ? totalRow : (currentPage * perPage)} của ${totalRow} bản ghi`;
    return (
      <>
        <div className="animated fadeIn fee-table" style={{ background: 'white' }}>
          <Card>
            <CardHeader>
              <span className="text-bold">{Constants.Transaction.titleTransactionRefund}</span>
            </CardHeader>
            <CardBody>
              <FillTransaction
                changeSearch={() => { this.setState({ currentPage: 1, perPage: 10 }); }}
                currentPage={currentPage}
                perPage={perPage}
                listQrChannel={listQrChannel}
              />
              <TableTransaction tData={listTransactionTableRefund && listTransactionTableRefund.data} />
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
  listTransactionTableRefund: state.Transaction.listTransactionTableRefund,
  dataSearchTransactionRefund: state.Transaction.dataSearchTransactionRefund,
  changePageSearchTransactionRefund: state.Transaction.changePageSearchTransactionRefund,
});

const mapDispatchToProps = (dispatch) => ({
  getTransactionListRefund: (data) => dispatch(getTransactionListRefund(data)),
  clearMerchantCodeName: () => dispatch(clearMerchantCodeName()),
});


index.propTypes = {
  listTransactionTableRefund: PropTypes.object,
  dataSearchTransactionRefund: PropTypes.object,
  changePageSearchTransactionRefund: PropTypes.number,
};

index.defaultProps = {
  listTransactionTableRefund: {},
  dataSearchTransactionRefund: {},
  changePageSearchTransactionRefund: 0,
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
