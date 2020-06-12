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
import {getQrCodeList,} from '../../../store/actions/qRCode/qRCode';
import {clearMerchantCodeName} from '../../../store/actions/masterMerchant/masterMerchant';
import moment from "moment";

class QRCodeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      perPage: 10,
      defaultData: {
        fromDate: moment().subtract(6, 'months').format('DD/MM/YYYY HH:mm:ss'),
        toDate: moment(new Date()).format('DD/MM/YYYY HH:mm:ss'),
        data: {
          merchantCode: '',
          branchMidId: '',
          terminalID: '',
          status: 0,
          productID: '',
          productName: '',
          payType: '02',
        },
      },
    };
  }

  componentDidMount() {
    const searchParams = JSON.parse(sessionStorage.getItem('searchParams'));
    if (searchParams) {
      this.setState({
        currentPage: searchParams.fromRow / searchParams.pageSize + 1,
        perPage: searchParams.pageSize,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { changePageSearchQrCode } = this.props;
    if (changePageSearchQrCode !== prevProps.changePageSearchQrCode) {
      if (changePageSearchQrCode === 1) {
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
    const { getQrCodeList, dataSearchQrCode } = this.props;
    const { perPage, defaultData } = this.state;
    if (
      Object.entries(dataSearchQrCode).length !== 0
      && dataSearchQrCode.constructor === Object
    ) {
      this.setState({
        currentPage: pageNumber,
      }, () => {
        dataSearchQrCode.fromRow = perPage * this.state.currentPage - perPage;
        getQrCodeList(dataSearchQrCode);

        let storedData = JSON.parse(sessionStorage.getItem('searchParams'));
        storedData = {
          ...storedData || defaultData,
          fromRow: perPage * this.state.currentPage - perPage,
          pageSize: perPage,
        };
        sessionStorage.setItem('searchParams', JSON.stringify(storedData));
      });
    }
  };

  handleRowPageChange = (e) => {
    const { getQrCodeList, dataSearchQrCode } = this.props;
    const { defaultData } = this.state;
    this.setState({
      perPage: e.value,
    });
    if (
      Object.entries(dataSearchQrCode).length !== 0
      && dataSearchQrCode.constructor === Object
    ) {
      this.setState({
        perPage: e.value,
        currentPage: 1,
      }, () => {
        dataSearchQrCode.pageSize = this.state.perPage;
        getQrCodeList(dataSearchQrCode);

        let storedData = JSON.parse(sessionStorage.getItem('searchParams'));
        storedData = {
          ...storedData || defaultData,
          fromRow: e.value * this.state.currentPage - e.value.value,
          pageSize: e.value,
        };
        sessionStorage.setItem('searchParams', JSON.stringify(storedData));
      });
    }
  }

  render() {
    const { currentPage, perPage } = this.state;
    const { listQrCodeTable } = this.props;
    const totalRow = (listQrCodeTable && listQrCodeTable.totalRow) || 0;
    const showingOption = `Hiển thị ${currentPage * perPage - perPage + 1} - ${(currentPage * perPage) > totalRow ? totalRow : (currentPage * perPage)} của ${totalRow} bản ghi`;
    return (
      <>
        <div className="animated fadeIn fee-table" style={{ background: 'white' }}>
          <Card>
            <CardHeader>
              <span className="text-bold">{Constants.QRCode.titleQRCodeList}</span>
            </CardHeader>
            <CardBody>
              <FillMerchant
                changeSearch={() => { this.setState({ currentPage: 1, perPage: 10 }); }}
                currentPage={currentPage}
                perPage={perPage}
              />
              <TableMerchant
                tData={listQrCodeTable && listQrCodeTable.data}
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
  listQrCodeTable: state.qRCode.listQrCodeTable,
  dataSearchQrCode: state.qRCode.dataSearchQrCode,
  changePageSearchQrCode: state.qRCode.changePageSearchQrCode,
});

const mapDispatchToProps = (dispatch) => ({
  getQrCodeList: (data) => dispatch(getQrCodeList(data)),
  clearMerchantCodeName: () => dispatch(clearMerchantCodeName()),
});


QRCodeList.propTypes = {
  listQrCodeTable: PropTypes.object,
  dataSearchQrCode: PropTypes.object,
  changePageSearchQrCode: PropTypes.number,
};

QRCodeList.defaultProps = {
  listQrCodeTable: {},
  dataSearchQrCode: {},
  changePageSearchQrCode: 0,
};

export default connect(mapStateToProps, mapDispatchToProps)(QRCodeList);
