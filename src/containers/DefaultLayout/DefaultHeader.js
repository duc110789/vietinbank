import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, UncontrolledDropdown,} from 'reactstrap';
import PropTypes from 'prop-types';
import {AppSidebarToggler} from '@coreui/react';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

// eslint-disable-next-line react/prefer-stateless-function
class DefaultHeader extends Component {
  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <Link to="/" className="QR-logo">
              <span className="clred">QR</span>
              Code
            </Link>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          <div className="header-text hidden-xs">
            <p className="text-vietinbank-header">
              <Link to="/">
                <span className="clred">QR</span>
                <span className="clblue"> Merchant</span>
                {' '}
                Management
              </Link>
            </p>
          </div>
        </Nav>
        <div className="logo-right">
          <Link to="/">
            <img src="../../assets/img/logo/logo.png" className="img-logo" alt="logo" />
          </Link>
        </div>
        <Nav className="ml-auto" navbar>
          <UncontrolledDropdown nav direction="down" className="px-3 account-management">
            <DropdownToggle nav>
              <img src="../../assets/img/avatars/user.png" className="img-avatar" alt="admin" />
              <span className="text-bold">{localStorage.getItem('username')}</span>
            </DropdownToggle>
            <DropdownMenu right className="account-right">
              <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
              <DropdownItem>
                <i className="fa fa-user-o fa-md" />
                {' '}
                <a href="#/system/user/infoUser" title="Thông tin tài khoản">Thông tin tài khoản</a>
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-lock fa-md" />
                {' '}
                <a href="#/system/user/changePassword" title="Đổi mật khẩu đăng nhập">Đổi mật khẩu đăng nhập</a>
              </DropdownItem>
              <DropdownItem onClick={(e) => this.props.onLogout(e)}>
                <i className="fa fa-power-off" />
                {' '}
                Thoát
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
