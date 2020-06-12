/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {connect} from 'react-redux';
import {Card, CardBody, CardHeader,} from 'reactstrap';
import './index.scss';
import InfoSearchStaff from './InfoSearchStaff';
import TableStaff from './TableStaff';

class ListStaffPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearch: false,
    };
  }

  render() {
    const { isSearch } = this.state;
    return (
      <>
        <div className="animated fadeIn fee-table" style={{ background: 'white' }}>
          <Card>
            <CardHeader>
              <span className="text-bold">Quản lý nhân viên</span>
            </CardHeader>
            <CardBody>
              <InfoSearchStaff changeSearch={() => {
                this.setState({ isSearch: !isSearch });
              }}
              />
              <TableStaff isSearch={isSearch} />
            </CardBody>
          </Card>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({

});

const mapDispatchToProps = (dispatch) => ({
});


ListStaffPage.propTypes = {
};

ListStaffPage.defaultProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(ListStaffPage);
