import React, {Component, Suspense} from 'react';
import * as router from 'react-router-dom';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import {Container} from 'reactstrap';
import { connect } from 'react-redux';

import {
  AppBreadcrumb2 as AppBreadcrumb,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';
import { logout } from '../../store/actions/AuthenAction/LoginPageAction';
import {messageError, messageSuccess} from '../../utils';
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { response, history } = this.props;
    const previousPathName = prevProps.location.pathname;
    const pathName = this.props.location.pathname;
    if (previousPathName && pathName && previousPathName !== pathName) {
      const firstStringPathName = pathName.slice(0, this.getPosition(pathName, '/', pathName.indexOf('system') !== -1 ? 3 : 2));
      const firstStringPreviousPathName = previousPathName.slice(0, this.getPosition(previousPathName, '/', previousPathName.indexOf('system') !== -1 ? 3 : 2));
      const secondStringPathName = pathName.slice(this.getPosition(pathName, '/', 2), pathName.length);
      const secondStringPreviousPathName = previousPathName.slice(this.getPosition(previousPathName, '/', 2), previousPathName.length);
      if (firstStringPathName.indexOf('/merchant') !== -1 || firstStringPathName.indexOf('/terminal') !== -1) {
        if (secondStringPathName === secondStringPreviousPathName) {
          sessionStorage.removeItem('searchParams');
        }
      } else if (firstStringPathName !== firstStringPreviousPathName) {
        sessionStorage.removeItem('searchParams');
      }
    }

    if (response !== prevProps.response) {
      if (response.code === '00') {
        messageSuccess('Đăng xuất thành công');
        localStorage.clear();
        sessionStorage.clear();
        history.push('/login');
      } else {
        messageError(response.description);
      }
    }
  }

  getPosition = (string, subString, index) => string.split(subString, index).join(subString).length;

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    const { logout } = this.props;
    e.preventDefault();
    logout();
  }

  render() {
    const token = localStorage.getItem('token_mms');
    const refreshToken = localStorage.getItem('refreshToken');
    if (!token && !refreshToken) {
      this.props.history.push('/login');
    }
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader onLogout={(e) => this.signOut(e)} />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav navConfig={navigation} {...this.props} router={router} />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <div className="breadcrumb-custom">
              <AppBreadcrumb appRoutes={routes} router={router} />
              <div className="last-login">Đăng nhập lần cuối vào lúc {localStorage.getItem('lastLogin')}</div>
            </div>
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => (route.component ? (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={(props) => (
                        <route.component {...props} />
                      )}
                    />
                  ) : null))}
                  <Redirect from="/" to="/login" />
                </Switch>
              </Suspense>
            </Container>
          </main>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  response: state.loginPage.response,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DefaultLayout));
