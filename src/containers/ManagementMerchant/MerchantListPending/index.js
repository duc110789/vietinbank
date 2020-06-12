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
import {clearMerchantCodeName, getMerchantList,} from '../../../store/actions/masterMerchant/masterMerchant';
import moment from "moment";

class MerchantList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      perPage: 10,
      defaultData: {
        fromDate: moment(moment().subtract(3, 'days').toDate()).format('DD/MM/YYYY 00:00:00'),
        toDate: moment(new Date()).format('DD/MM/YYYY 00:00:00'),
        fromRow: 0,
        pageSize: 10,
        data: {
          merchantCode: '',
          status: 0,
          merchantType: 0,
          merchantBrand: '',
          type: '1',
        },
      },
    };
  }

  componentDidMount() {
    setTimeout(() => {
      const searchParams = JSON.parse(sessionStorage.getItem('searchParams'));
      if (searchParams && searchParams.merchantListPending) {
        this.setState({
          currentPage: searchParams.merchantListPending.fromRow / searchParams.merchantListPending.pageSize + 1,
          perPage: searchParams.merchantListPending.pageSize,
        });
      }
    }, 0);
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

  componentWillUnmount() {
    const { clearMerchantCodeName } = this.props;
    clearMerchantCodeName();
  }

  handlePageChange = (pageNumber) => {
    const { getMerchantList, dataSearchMerchant } = this.props;
    const { perPage, defaultData } = this.state;
    if (
      Object.entries(dataSearchMerchant).length !== 0
      && dataSearchMerchant.constructor === Object
    ) {
      this.setState({
        currentPage: pageNumber,
      }, () => {
        dataSearchMerchant.fromRow = perPage * this.state.currentPage - perPage;
        getMerchantList(dataSearchMerchant);

        let storedData = JSON.parse(sessionStorage.getItem('searchParams'));
        storedData = {
          ...(storedData && storedData.merchantListPending) || defaultData,
          fromRow: perPage * this.state.currentPage - perPage,
          pageSize: perPage,
        };
        sessionStorage.setItem('searchParams', JSON.stringify({
          merchantListPending: storedData,
        }));
      });
    }
  };

  handleRowPageChange = (e) => {
    const { getMerchantList, dataSearchMerchant } = this.props;
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
        getMerchantList(dataSearchMerchant);

        let storedData = JSON.parse(sessionStorage.getItem('searchParams'));
        storedData = {
          ...(storedData && storedData.merchantListPending) || defaultData,
          fromRow: e.value * this.state.currentPage - e.value.value,
          pageSize: e.value,
        };
        sessionStorage.setItem('searchParams', JSON.stringify({
          merchantListPending: storedData,
        }));
      });
    }
  }

  render() {
    const { currentPage, perPage } = this.state;
    const { listMerchantTable } = this.props;
    const totalRow = (listMerchantTable && listMerchantTable.totalRow) || 0;
    const showingOption = `Hiển thị ${currentPage * perPage - perPage + 1} - ${(currentPage * perPage) > totalRow ? totalRow : (currentPage * perPage)} của ${totalRow} bản ghi`;
    return (
      <>
        <div className="animated fadeIn fee-table" style={{ background: 'white' }}>
          <Card>
            <CardHeader>
              <span className="text-bold">{Constants.MerchantList.merchantListPending}</span>
            </CardHeader>
            <CardBody>
              <FillMerchant
                changeSearch={() => { this.setState({ currentPage: 1, perPage: 10 }); }}
                currentPage={currentPage}
                perPage={perPage}
              />
              <TableMerchant tData={listMerchantTable && listMerchantTable.merchantList} />
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
  listMerchantTable: state.masterMerchant.listMerchantTable,
  dataSearchMerchant: state.masterMerchant.dataSearchMerchant,
  changePageSearchMerchant: state.masterMerchant.changePageSearchMerchant,
});

const mapDispatchToProps = (dispatch) => ({
  getMerchantList: (data) => dispatch(getMerchantList(data)),
  clearMerchantCodeName: () => dispatch(clearMerchantCodeName()),
});


MerchantList.propTypes = {
  listMerchantTable: PropTypes.object,
  dataSearchMerchant: PropTypes.object,
  changePageSearchMerchant: PropTypes.number,
};

MerchantList.defaultProps = {
  listMerchantTable: {},
  dataSearchMerchant: {},
  changePageSearchMerchant: 0,
};

export default connect(mapStateToProps, mapDispatchToProps)(MerchantList);
