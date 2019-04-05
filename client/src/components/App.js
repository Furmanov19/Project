import React, { Component } from "react";
import {Route,Switch} from 'react-router-dom';
import {loadUser,loadExecutor} from '../actions/authActions'
import CssBaseline from '@material-ui/core/CssBaseline';
import Home from './home/Home';
import store from '../store';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
    store.dispatch(loadExecutor());
  }
  render() {
    return (
      <>
        <CssBaseline />
        <Switch>
          <Route path="/" component ={Home}/>
        </Switch>
      </>  
    );
  }
}

export default App;
