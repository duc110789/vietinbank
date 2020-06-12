import React, {Component} from 'react';
import {Card, CardBody, CardHeader, Col, Row,} from 'reactstrap';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Pagination from 'react-js-pagination';
import Select from 'react-select';
import FillMerchant from './FillMerchant';
import TableMerchant from './TableMerchant';
import CONST_VARIABLE from '../../../utils/constants';
import Constants from '../Constants';
import moment from 'moment';
import {clearMerchantCodeName, getMerchantListDenied,} from '../../../store/actions/masterMerchant/masterMerchant';

class MerchantList extends Component {
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
          merchantCode: '',
          merchantType: 0,
          processUser: '',
          idDenied: 0,
          merchantBrand: '',
          type: '0',
        },
      },
    };
  }

  componentDidMount() {
    setTimeout(() => {
      const searchParams = JSON.parse(sessionStorage.getItem('searchParams'));
      if (searchParams && searchParams.merchantListHistoryDenied) {
        this.setState({
          currentPage: searchParams.merchantListHistoryDenied.fromRow / searchParams.merchantListHistoryDenied.pageSize + 1,
          perPage: searchParams.merchantListHistoryDenied.pageSize,
        });
      }
    }, 0);
  }

  componentWillUnmount() {
    const { clearMerchantCodeName } = this.props;
    clearMerchantCodeName();
  }

  componentDidUpdate(prevProps) {
    const { changePageSearchMerchant } = this.props;
    if (changePageSearchMerchant !== prevProps.changePageSearchMerchant) {
      if (changePageSearchMerchant === 1) {
        this.setState({
          currentPage: 1,
        });
      }
    }
  }

  handlePageChange = (pageNumber) => {
    const { getMerchantListDenied, dataSearchMerchant } = this.props;
    const { perPage, defaultData } = this.state;
    if (
      Object.entries(dataSearchMerchant).length !== 0
      && dataSearchMerchant.constructor === Object
    ) {
      this.setState({
        currentPage: pageNumber,
      }, () => {
        dataSearchMerchant.fromRow = perPage * this.state.currentPage - perPage;
        getMerchantListDenied(dataSearchMerchant);

        let storedData = JSON.parse(sessionStorage.getItem('searchParams'));
        storedData = {
          ...(storedData && storedData.merchantListHistoryDenied) || defaultData,
          fromRow: perPage * this.state.currentPage - perPage,
          pageSize: perPage,
        };
        sessionStorage.setItem('searchParams', JSON.stringify({
          merchantListHistoryDenied: storedData,
        }));
      });
    }
  };

  handleRowPageChange = (e) => {
    const { getMerchantListDenied, dataSearchMerchant } = this.props;
    const { defaultData } = this.state;
    this.setState({
      perPage: e.value,
    });
    if (
      Object.entries(dataSearchMerchant).length !== 0
      && dataSearchMerchant.constructor === Object
    ) {
      this.setState({
        perPage: e.value,
        currentPage: 1,
      }, () => {
        dataSearchMerchant.pageSize = this.state.perPage;
        getMerchantListDenied(dataSearchMerchant);

        let storedData = JSON.parse(sessionStorage.getItem('searchParams'));
        storedData = {
          ...(storedData && storedData.merchantListHistoryDenied) || defaultData,
          fromRow: e.value * this.state.currentPage - e.value,
          pageSize: e.value,
        };
        sessionStorage.setItem('searchParams', JSON.stringify({
          merchantListHistoryDenied: storedData,
        }));
      });
    }
  }

  render() {
    const { currentPage, perPage } = this.state;
    const { listMerchantDenied } = this.props;
    const totalRow = (listMerchantDenied && listMerchantDenied.totalRow) || 0;
    const showingOption = `Hiển thị ${currentPage * perPage - perPage + 1} - ${(currentPage * perPage) > totalRow ? totalRow : (currentPage * perPage)} của ${totalRow} bản ghi`;
    return (
      <>
        <div className="animated fadeIn fee-table" style={{ background: 'white' }}>
          <Card>
            <CardHeader>
              <span className="text-bold">{Constants.MerchantList.historyMerchantListDenied}</span>
            </CardHeader>
            <CardBody>
              <FillMerchant
                changeSearch={() => { this.setState({ currentPage: 1, perPage: 10 }); }}
                currentPage={currentPage}
                perPage={perPage}
              />
              <TableMerchant
                tData={listMerchantDenied && listMerchantDenied.listData}
                perPage={perPage}
                currentPage={currentPage}
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
  listMerchantDenied: state.masterMerchant.listMerchantDenied,
  dataSearchMerchant: state.masterMerchant.dataSearchMerchant,
  changePageSearchMerchant: state.masterMerchant.changePageSearchMerchant,
});

const mapDispatchToProps = (dispatch) => ({
  getMerchantListDenied: (data) => dispatch(getMerchantListDenied(data)),
  clearMerchantCodeName: () => dispatch(clearMerchantCodeName()),
});


MerchantList.propTypes = {
  listMerchantDenied: PropTypes.object,
  dataSearchMerchant: PropTypes.object,
  changePageSearchMerchant: PropTypes.number,
};

MerchantList.defaultProps = {
  listMerchantDenied: {},
  dataSearchMerchant: {},
  changePageSearchMerchant: 0,
};

export default connect(mapStateToProps, mapDispatchToProps)(MerchantList);
