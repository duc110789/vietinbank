import React, {Component} from 'react';
import {Card, CardBody, CardHeader, Col, Row,} from 'reactstrap';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Pagination from 'react-js-pagination';
import Select from 'react-select';
import FillTransaction from './FillTransaction';
import TableTransaction from './TableTransaction';
import CONST_VARIABLE from '../../../utils/constants';
import Constants from '../Constants';
import {getTransactionList} from '../../../store/actions/ManagementTransaction/index';
import { clearMerchantCodeName } from '../../../store/actions/masterMerchant/masterMerchant';
import moment from 'moment';

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
      if (searchParams && searchParams.listTransaction) {
        this.setState({
          currentPage: searchParams.listTransaction.fromRow / searchParams.listTransaction.pageSize + 1,
          perPage: searchParams.listTransaction.pageSize,
        });
      }
    }, 0);
  }

  componentDidUpdate(prevProps) {
    const { changePageSearchTransaction } = this.props;
    if (changePageSearchTransaction !== prevProps.changePageSearchTransaction) {
      if (changePageSearchTransaction === 1) {
        this.setState({
          currentPage: 1,
        });
      }
    }
  }

  getListSelectBox = () => {
    const listMasterMerchant = JSON.parse(localStorage && localStorage.getItem('LIST_MASTER_MERCHANT'));
    const listMccInternational = JSON.parse(localStorage && localStorage.getItem('LIST_MCC_INTERNATIONAL'));
    const listProvince = JSON.parse(localStorage && localStorage.getItem('LIST_PROVINCE'));
    const listMccInterior = JSON.parse(localStorage && localStorage.getItem('LIST_MCC_INTERIOR'));
    const listBranchBank = JSON.parse(localStorage && localStorage.getItem('LIST_BRANCH_BANK'));
    const listBranchBankByUser = JSON.parse(localStorage && localStorage.getItem('LIST_BRANCH_BANK_BY_USER'));

    const updateListMasterMerchant = [];
    if (listMasterMerchant) {
      for (let i = 0; i < (listMasterMerchant && listMasterMerchant.length); i += 1) {
        updateListMasterMerchant.push({ value: listMasterMerchant[i] && listMasterMerchant[i].bankCode, label: `${listMasterMerchant[i] && listMasterMerchant[i].bankName}` });
      }
    }
    const updateListMccInternational = [];
    if (listMccInternational) {
      for (let i = 0; i < listMccInternational.length; i += 1) {
        updateListMccInternational.push({
          value: listMccInternational[i] && listMccInternational[i].id,
          label: `${listMccInternational[i] && listMccInternational[i].typeCode} - ${listMccInternational[i] && listMccInternational[i].brandName}`,
        });
      }
    }
    const updateListProvince = [];
    if (listProvince) {
      for (let i = 0; i < (listProvince && listProvince.length); i += 1) {
        updateListProvince.push({ value: listProvince[i] && listProvince[i].provinceCode, label: `${listProvince[i] && listProvince[i].provinceName}` });
      }
    }
    const updateListMccInterior = [];
    if (listMccInterior) {
      for (let i = 0; i < (listMccInterior && listMccInterior.length); i += 1) {
        updateListMccInterior.push({
          value: listMccInterior[i] && listMccInterior[i].id,
          label: `${listMccInterior[i] && listMccInterior[i].typeCode} - ${listMccInterior[i] && listMccInterior[i].brandName}`,
        });
      }
    }
    const updateListBranchBank = [];
    if (listBranchBank) {
      for (let i = 0; i < listBranchBank.length; i += 1) {
        updateListBranchBank.push({ value: listBranchBank[i] && listBranchBank[i].departmentId, label: `${listBranchBank[i] && listBranchBank[i].departmentName}` });
      }
    }
    const updateListBranchBankByUser = [];
    if (listBranchBankByUser) {
      for (let i = 0; i < listBranchBankByUser.length; i += 1) {
        updateListBranchBankByUser.push({
          value: listBranchBankByUser[i] && listBranchBankByUser[i].departmentId,
          label: `${listBranchBankByUser[i] && listBranchBankByUser[i].departmentName}`,
          departmentCode: listBranchBankByUser[i] && listBranchBankByUser[i].departmentCode,
        });
      }
    }

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
      listMasterMerchant: updateListMasterMerchant,
      listMccInternational: updateListMccInternational,
      listProvince: updateListProvince,
      listMccInterior: updateListMccInterior,
      listBranchBank: updateListBranchBank,
      listBranchBankByUser: updateListBranchBankByUser,
      listQrChannel: updateListQrChannel,
    });
  };

  handlePageChange = (pageNumber) => {
    const { getTransactionList, dataSearchTransaction } = this.props;
    const { perPage, defaultData } = this.state;
    if (
      Object.entries(dataSearchTransaction).length !== 0
      && dataSearchTransaction.constructor === Object
    ) {
      this.setState({
        currentPage: pageNumber,
      }, () => {
        dataSearchTransaction.fromRow = perPage * this.state.currentPage - perPage;
        getTransactionList(dataSearchTransaction);

        let storedData = JSON.parse(sessionStorage.getItem('searchParams'));
        storedData = {
          ...(storedData && storedData.listTransaction) || defaultData,
          fromRow: perPage * this.state.currentPage - perPage,
          pageSize: perPage,
        };
        sessionStorage.setItem('searchParams', JSON.stringify({
          listTransaction: storedData,
        }));
      });
    }
  };

  componentWillUnmount() {
    const { clearMerchantCodeName } = this.props;
    clearMerchantCodeName();
  }

  handleRowPageChange = (e) => {
    const { getTransactionList, dataSearchTransaction } = this.props;
    const { defaultData } = this.state;
    this.setState({
      perPage: e.value,
    });
    if (
      Object.entries(dataSearchTransaction).length !== 0
      && dataSearchTransaction.constructor === Object
    ) {
      this.setState({
        perPage: e.value,
        currentPage: 1,
      }, () => {
        dataSearchTransaction.pageSize = this.state.perPage;
        getTransactionList(dataSearchTransaction);

        let storedData = JSON.parse(sessionStorage.getItem('searchParams'));
        storedData = {
          ...(storedData && storedData.listTransaction) || defaultData,
          fromRow: e.value * this.state.currentPage - e.value.value,
          pageSize: e.value,
        };
        sessionStorage.setItem('searchParams', JSON.stringify({
          listTransaction: storedData,
        }));
      });
    }
  }

  render() {
    const { currentPage, perPage, listQrChannel } = this.state;
    const { listTransactionTable } = this.props;
    const totalRow = (listTransactionTable && listTransactionTable.totalRow) || 0;
    const showingOption = `Hiển thị ${currentPage * perPage - perPage + 1} - ${(currentPage * perPage) > totalRow ? totalRow : (currentPage * perPage)} của ${totalRow} bản ghi`;
    return (
      <>
        <div className="animated fadeIn fee-table" style={{ background: 'white' }}>
          <Card>
            <CardHeader>
              <span className="text-bold">{Constants.Transaction.titleTransaction}</span>
            </CardHeader>
            <CardBody>
              <FillTransaction
                changeSearch={() => { this.setState({ currentPage: 1, perPage: 10 }); }}
                currentPage={currentPage}
                perPage={perPage}
                listQrChannel={listQrChannel}
              />
              <TableTransaction
                tData={listTransactionTable && listTransactionTable.data}
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
  listTransactionTable: state.Transaction.listTransactionTable,
  dataSearchTransaction: state.Transaction.dataSearchTransaction,
  changePageSearchTransaction: state.Transaction.changePageSearchTransaction,
});

const mapDispatchToProps = (dispatch) => ({
  getTransactionList: (data) => dispatch(getTransactionList(data)),
  clearMerchantCodeName: () => dispatch(clearMerchantCodeName()),
});

index.propTypes = {
  listTransactionTable: PropTypes.object,
  dataSearchTransaction: PropTypes.object,
  changePageSearchTransaction: PropTypes.number,
};

index.defaultProps = {
  listTransactionTable: {},
  dataSearchTransaction: {},
  changePageSearchTransaction: 0,
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
