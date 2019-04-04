import React, { Component } from "react";
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import {loadUser} from '../actions/authActions'
import CssBaseline from '@material-ui/core/CssBaseline';
import Home from './home/Home';
import store from '../store';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <CssBaseline />
          <Switch>
            <Route path="/" component ={Home}/>
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
