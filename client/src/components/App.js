import React, { Component } from "react";
import {Route,Switch} from 'react-router-dom';
import {loadUser,loadExecutor,loadAdmin} from '../actions/authActions'
import CssBaseline from '@material-ui/core/CssBaseline';
import store from '../store';
import HeaderContainer from '../containers/HeaderContainer';
import HomePageContainer from '../containers/HomePageContainer';
import RegistrationPage from './home/main/RegistrationPage/RegistrationPage';
import LoginPage from './home/main/LoginPage/LoginPage';
import ExecutorConfirmPage from './home/main/LoginPage/ExecutorConfirmPage';

import AdminProfilePage from './home/main/ProfilePage/AdminProfilePage';

import ListOfExecutors from './home/main/AdminPage/ListOfExecutors';
import ListOfExecutorsContainer from '../containers/ListOfExecutorsContainer';

import ListOfUsers from './home/main/AdminPage/ListOfUsers';
import UserOrderPage from './home/main/OrdersPage/UserOrderPage';
import UserProfilePage from './home/main/ProfilePage/UserProfilePage';
import ExecutorOrderPage from './home/main/OrdersPage/ExecutorOrderPage';
import ExecutorProfilePage from './home/main/ProfilePage/ExecutorProfilePage';
import { connect } from 'react-redux';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadAdmin());
    store.dispatch(loadUser());
    store.dispatch(loadExecutor());
  }
  render() {
    return (
      <>
        <CssBaseline />
        <HeaderContainer />
        <Switch>
          <Route path="/register" component={RegistrationPage}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/confirm" component={ExecutorConfirmPage}/>
          
          {this.props.isAuth && this.props.admin &&
            <Route path="/profile" component={AdminProfilePage}/>//admin profile page
          }
          {this.props.isAuth && this.props.admin &&
            <Route path="/users" component={ListOfUsers}/>//admin list of users page
          }
          {this.props.isAuth && this.props.admin &&
            <Route path="/executors" component={ListOfExecutorsContainer}/>//admin list of executors page
          }
          {this.props.isAuth && this.props.user &&
            <Route path="/profile" component={UserProfilePage}/>//user profile page
          }
          {this.props.isAuth && this.props.executor &&
            <Route path="/profile" component={ExecutorProfilePage}/>//executor profile page
          }
          {this.props.isAuth && this.props.user &&
            <Route path="/orders" component={UserOrderPage}/>//user profile page
          }
          {this.props.isAuth && this.props.executor &&
            <Route path="/orders" component={ExecutorOrderPage}/>//executor profile page
          }
          <Route component={HomePageContainer}/>
        </Switch>
      </>  
    );
  }
}

const mapStateToProps = state => ({
  error: state.error,
  isAuth:state.auth.isAuthenticated,
  user:state.auth.user,
  executor:state.auth.executor,
  admin:state.auth.admin
});

export default connect(
  mapStateToProps,
)(App);
