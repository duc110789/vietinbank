import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Card, CardBody, Row, Col,
} from 'reactstrap';
import Pagination from 'react-js-pagination';
import Select from 'react-select';
import {
  getListTerminalDetail,
} from '../../../store/actions/masterMerchant/masterMerchant';
import TerminalTable from './TerminalTable';
import CONST_VARIABLE from '../../../utils/constants';

class ListPaymentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      perPage: CONST_VARIABLE.DEFAULT_PERPAGE,
    };
  }

  componentDidMount() {
    const {
      perPage,
      currentPage,
    } = this.state;
    const {
      getListTerminalDetail,
    } = this.props;
    getListTerminalDetail({
      fromRow: perPage * currentPage - perPage,
      pageSize: perPage,
      merchantCode: JSON.parse(window.atob(localStorage.getItem('ID_MERCHANT_DETAIL'))),
    });
  }

  static getDerivedStateFromProps(props) {
    const {
      listTerminalDetail,
    } = props;
    return {
      listTerminalDetail,
    };
  }

  handlePageChange = (pageNumber) => {
    const { getListTerminalDetail } = this.props;
    const {
      perPage,
    } = this.state;

    this.setState({
      currentPage: pageNumber,
    }, () => {
      const paramsData = {
        fromRow: perPage * this.state.currentPage - perPage,
        pageSize: perPage,
        merchantCode: JSON.parse(window.atob(localStorage.getItem('ID_MERCHANT_DETAIL'))),
      };
      getListTerminalDetail(paramsData);
    });
  };

  handleRowPageChange = (e) => {
    const { getListTerminalDetail } = this.props;
    const {
      currentPage,
    } = this.state;

    this.setState({
      perPage: e.value,
    }, () => {
      const paramsData = {
        fromRow: this.state.perPage * currentPage - this.state.perPage,
        pageSize: this.state.perPage,
        merchantCode: JSON.parse(window.atob(localStorage.getItem('ID_MERCHANT_DETAIL'))),
      };
      getListTerminalDetail(paramsData);
    });
  }

  render() {
    const { currentPage, perPage } = this.state;
    const { listTerminalDetail } = this.props;

    const totalRow = (listTerminalDetail && listTerminalDetail.totalRow) || 0;
    const showingOption = `Hiển thị ${currentPage * perPage - perPage + 1} - ${(currentPage * perPage) > totalRow ? totalRow : (currentPage * perPage)} của ${totalRow} bản ghi`;
    return (
      <>
        <div className="animated fadeIn fee-table" style={{ background: 'white' }}>
          <Card>
            <CardBody>
              <TerminalTable tData={listTerminalDetail} />
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
  listTerminalDetail: state.masterMerchant.listTerminalDetail,
});

const mapDispatchToProps = (dispatch) => ({
  getListTerminalDetail: (data) => dispatch(getListTerminalDetail(data)),
});


ListPaymentPage.propTypes = {
  getListTerminalDetail: PropTypes.func,
  tData: PropTypes.array,
};

ListPaymentPage.defaultProps = {
  getListTerminalDetail: () => {},
  tData: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(ListPaymentPage);
