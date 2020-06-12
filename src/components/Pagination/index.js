import React, { Component } from 'react';
import Pagination from 'react-js-pagination';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Label } from 'reactstrap';

const pageOption = [
  { value: 10, label: '10' },
  { value: 20, label: '20' },
  { value: 50, label: '50' },
  { value: 100, label: '100' },
];

const displayItemPagination = (per = null, count = 0, page = null) => {
  let from;
  let to;
  from = ((per * page) + 1) - per;
  if (count === 0) { from = 0; }
  to = (page * per);
  if ((count - from) < per) { to = count; }
  return (
    <Label id="LIMIT_LABEL">{`Showing ${from > count ? count : from} - ${to} of ${count || 0} records`}</Label>
  );
};

export class CustomPagination extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      page: 1,
      selectedPageOption: { value: 10, label: '10' },
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      page, count, pageSize, onChange,
    } = this.props;
    if (page !== nextProps.page || count !== nextProps.count || pageSize !== nextProps.pageSize) {
      this.setState({
        page: nextProps.page,
        pageSize: nextProps.pageSize,
        count: nextProps.count,
        selectedPageOption: { label: nextProps.pageSize, value: nextProps.pageSize },
      });
      onChange(nextProps.page, nextProps.pageSize);
    }
  }

  render() {
    const {
      selectedPageOption,
    } = this.state;
    const { onChange, isdependant } = this.props;
    const { page, count, pageSize } = this.state;

    return (
      <div className="Pagination-container">
        <div style={{ marginLeft: isdependant ? -17 : 0 }} className="page-per-size">
          <Select
            id="LIMIT_DROPDOWN"
            value={selectedPageOption}
            onChange={(e) => {
              this.setState({
                selectedPageOption: e,
                page: 1,
              });
              onChange(1, e.value);
            }}
            options={pageOption}
            placeholder="10"
            className="select-pagination"
            menuPlacement="top"
          />
        </div>
        <div className="number-item-per-page">
          {displayItemPagination(pageSize, count, page)}
        </div>

        {count > 10 && (
        <div style={{ float: 'right', marginRight: isdependant ? -26 : -10 }} className="Table__pagination">
          <Pagination
            itemsCountPerPage={pageSize}
            totalItemsCount={count}
            activePage={page}
            onChange={(_page) => {
              this.setState({ page: _page });
              onChange(_page, selectedPageOption.value);
            }}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
        )}

      </div>
    );
  }
}

export default CustomPagination;

CustomPagination.propTypes = {
  count: PropTypes.number,
  pageSize: PropTypes.number,
  onChange: PropTypes.func,
  page: PropTypes.number,
  isdependant: PropTypes.bool,
};

CustomPagination.defaultProps = {
  count: 0,
  pageSize: 10,
  onChange: null,
  page: 1,
  isdependant: null,
};
