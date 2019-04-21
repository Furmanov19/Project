import React, { Component } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { registerConfirmExecutor } from "../../../../actions/authActions";
import { Link } from "react-router-dom";
const queryString = require("query-string");

class ExecutorConfirmPage extends Component {
  componentWillMount() {
    const parsed = queryString.parse(this.props.location.search);
    this.props.registerConfirmExecutor(parsed);
  }
  render() {
    return (
      <>
        <Paper>
          <Typography>
            <h2>Something Wrong!</h2>
            <Link to="/login">Login</Link>
          </Typography>
        </Paper>
      </>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { registerConfirmExecutor }
)(ExecutorConfirmPage);
