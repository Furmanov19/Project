import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { loadUser, loadExecutor, loadAdmin } from "../actions/authActions";
import CssBaseline from "@material-ui/core/CssBaseline";
import store from "../store";
import HeaderContainer from "../containers/HeaderContainer";
import HomePageContainer from "../containers/HomePageContainer";
import RegistrationPage from "./home/main/RegistrationPage/RegistrationPage";
import LoginPage from "./home/main/LoginPage/LoginPage";
import ExecutorConfirmPage from "./home/main/LoginPage/ExecutorConfirmPage";
import AdminProfileContainer from "../containers/AdminProfileContainer";
import BlockExecutorFormContainer from "../containers/BlockExecutorFormContainer";
import BlockUserFormContainer from "../containers/BlockUserFormContainer";
import ListOfUsersContainer from "../containers/ListOfUsersContainer";
import ListOfExecutorsContainer from "../containers/ListOfExecutorsContainer";
import UserOrdersPageContainer from "../containers/UserOrdersPageContainer";
import UserEditProfileContainer from "../containers/UserEditProfileContainer";
import UserProfileContainer from "../containers/UserProfileContainer";
import ExecutorOrdersPageContainer from "../containers/ExecutorOrdersPageContainer";
import ExecutorProfileContainer from "../containers/ExecutorProfileContainer";
import ExecutorEditProfileContainer from "../containers/ExecutorEditProfileContainer";
import BookingPageContainer from "../containers/BookingPageContainer";
import ExecutorBlockedPageContainer from "../containers/ExecutorBlockedPageContainer";
import UserBlockedPageContainer from "../containers/UserBlockedPageContainer";
import CommentsPageContainer from "../containers/CommentsPageContainer";
import { connect } from "react-redux";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadAdmin());
    store.dispatch(loadUser());
    store.dispatch(loadExecutor());
  }
  render() {
    return (
      <div>
        <CssBaseline />
        <HeaderContainer />
        <Switch>
          <Route path="/register" component={RegistrationPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/confirm" component={ExecutorConfirmPage} />

          {this.props.isAuth && this.props.admin && (
            <Route path="/profile" component={AdminProfileContainer} />
          )}
          {this.props.isAuth && this.props.admin && (
            <Route path="/users" component={ListOfUsersContainer} />
          )}
          {this.props.isAuth && this.props.admin && (
            <Route path="/executors" component={ListOfExecutorsContainer} />
          )}
          {this.props.isAuth && this.props.admin && (
            <Route
              path="/executors-blocking"
              component={BlockExecutorFormContainer}
            />
          )}
          {this.props.isAuth && this.props.admin && (
            <Route path="/users-blocking" component={BlockUserFormContainer} />
          )}
          {!this.props.isAuth && this.props.user && (
            <Route path="/user-blocked" component={UserBlockedPageContainer} />
          )}
          {!this.props.isAuth && this.props.executor && (
            <Route
              path="/executor-blocked"
              component={ExecutorBlockedPageContainer}
            />
          )}
          {this.props.isAuth && this.props.user && (
            <Route path="/profile" component={UserProfileContainer} />
          )}
          {this.props.isAuth && this.props.user && (
            <Route path="/profile-edit" component={UserEditProfileContainer} />
          )}
          {this.props.isAuth && this.props.executor && (
            <Route path="/profile" component={ExecutorProfileContainer} />
          )}
          {this.props.isAuth && this.props.executor && (
            <Route
              path="/profile-edit"
              component={ExecutorEditProfileContainer}
            />
          )}
          {this.props.isAuth && this.props.user && (
            <Route path="/orders" component={UserOrdersPageContainer} />
          )}
          {this.props.isAuth && this.props.executor && (
            <Route path="/orders" component={ExecutorOrdersPageContainer} />
          )}
          <Route exact path="/comments" component={CommentsPageContainer} />
          <Route exact path="/" component={HomePageContainer} />
          <Route exact path="/company" component={BookingPageContainer} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.error,
  isAuth: state.auth.isAuthenticated,
  user: state.auth.user,
  executor: state.auth.executor,
  admin: state.auth.admin
});

export default connect(mapStateToProps)(App);
