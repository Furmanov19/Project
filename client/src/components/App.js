import React, { Component } from "react";
import {Route,Switch} from 'react-router-dom';
import {loadUser,loadExecutor} from '../actions/authActions'
import CssBaseline from '@material-ui/core/CssBaseline';
import store from '../store';
import HeaderContainer from '../containers/HeaderContainer';
import HomePageContainer from '../containers/HomePageContainer';
import RegistrationPage from '../components/home/main/RegistrationPage';
import LoginPage from '../components/home/main/LoginPage';

import UserOrderPage from '../components/home/main/UserOrderPage';
import UserProfilePage from '../components/home/main/UserProfilePage';
import ExecutorOrderPage from '../components/home/main/ExecutorOrderPage';
import ExecutorProfilePage from '../components/home/main/ExecutorProfilePage';
import { connect } from 'react-redux';

class App extends Component {
  componentDidMount() {
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
  executor:state.auth.executor
});

export default connect(
  mapStateToProps,
)(App);
