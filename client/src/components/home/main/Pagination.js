import React from "react";
import ReactDOM from "react-dom";
import { connect } from 'react-redux';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";
import { withStyles } from '@material-ui/core/styles';
import Load from '../../common/load'
import {getExecutors } from '../../../actions/executorsActions';

const theme = createMuiTheme({
    typography: {
      useNextVariants: true,
    },
  });
const styles = theme => ({
    root: {
        width:"50%",
        margin:"0 auto"
    },
  });

class PaginationPaper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { offset: 0 };
  }
  handleClick(offset) {
    this.setState({ offset });
    console.log(offset);
    this.props.getExecutors(offset);
  }
  render() {
    return (
        <MuiThemeProvider theme={theme}>
            <Pagination
            className={this.props.classes.root}
            limit={this.props.limit}
            offset={this.state.offset}
            total={this.props.total}
            onClick={(e, offset) => this.handleClick(offset)}
            />
        </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
    total:state.executors.executors.total,
    limit:state.executors.executors.limit
});

export default connect(
    mapStateToProps,
    {getExecutors}
)(withStyles(styles)(PaginationPaper));