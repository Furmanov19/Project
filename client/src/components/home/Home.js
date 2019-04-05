import React, {Component} from "react";
import {Route, Switch} from 'react-router-dom';
import Header from './header/Header';
import HeaderContainer from '../../containers/HeaderContainer';
import HomePageContainer from '../../containers/HomePageContainer';
import LoginPage from '../home/main/LoginPage';
import RegistrationPage from '../home/main/RegistrationPage';

export default class Home extends Component {
    render() {
      return (
        <>
        <HeaderContainer />
            <Switch>
                <Route path="/register" component={RegistrationPage}/>
                <Route path="/login" component={LoginPage}/>
                <Route component={HomePageContainer}/>
            </Switch>
        </>
      )
    }
  }
