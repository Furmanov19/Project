import React from "react";
import ReactDOM from "react-dom";
import { connect } from 'react-redux';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";
import { withStyles } from '@material-ui/core/styles';
import { pageChange } from '../../../../actions/searchActions';
import {getUsers } from '../../../../actions/usersActions';

const theme = createMuiTheme({
    typography: {
      useNextVariants: true,
    },
  });
const styles = theme => ({
    root: {
        width:"50%",
        margin:"0 auto",
        display:"flex",
        justifyContent:"center"
    },
  });

class PaginationPaper extends React.Component {
  render() {
    return (
        <MuiThemeProvider theme={theme}>
            <Pagination
            className={this.props.classes.root}
            limit={this.props.limit}
            offset={this.props.offset}
            total={this.props.total}
            onClick={(e, offset) => {this.props.pageChange(offset);this.props.getExecutors()}}
            />
        </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
    total:state.users.users.total,
    limit:state.users.users.limit,
    offset:state.search.offset
});

export default connect(
    mapStateToProps,
    {pageChange,getUsers}
)(withStyles(styles)(PaginationPaper));