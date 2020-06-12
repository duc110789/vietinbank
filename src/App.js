import React, { Component } from 'react';
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./containers/Login/Login'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const FogertPassword = React.lazy(() => import('./containers/Login/forgetPassword'));
const ResetPassowrd = React.lazy(() => import('./containers/Login/ResetPassword'));


class App extends Component {

  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route
                exact
                path="/login"
                name="Login Page"
                render={(props) => localStorage.getItem('token_mms')
                  ? (<Redirect to="/management-transaction/list" />)
                  : (<Login {...props} />)
                }
              />
              <Route exact path="/forgetPassword" name="forgetPassword Page" render={props => <FogertPassword {...props}/>} />
              <Route exact path="/resetPassword" name="Register Page" render={props => <ResetPassowrd {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route
                path="/"
                name="Home"
                render={(props) => localStorage.getItem('token_mms')
                  ? <DefaultLayout {...props} />
                  : <Redirect to="/login" />
                }
              />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
