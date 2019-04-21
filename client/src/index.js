import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import store from "./store";
import axios from "axios";
import { history } from "./reducers/index";
import { ConnectedRouter as Router } from "connected-react-router";
import Boundary from "./components/common/Boundary";
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Boundary>
        <App />
      </Boundary>
    </Router>
  </Provider>,
  document.getElementById("root")
);
