import React from "react";
import { connect } from "react-redux";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";
import { withStyles } from "@material-ui/core/styles";
import { pageChange } from "../../../../actions/searchActions";
import { getExecutorOrders } from "../../../../actions/executorsActions";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
});
const styles = theme => ({
  root: {
    width: "50%",
    margin: "0 auto",
    display: "flex",
    justifyContent: "center"
  }
});

class PaginationPaper extends React.Component {
  render() {
    console.log(this.props);
    return (
      <MuiThemeProvider theme={theme}>
        <Pagination
          className={this.props.classes.root}
          limit={this.props.limit}
          offset={this.props.offset}
          total={this.props.total}
          onClick={(e, offset) => {
            this.props.pageChange(offset);
            this.props.getUserOrders();
          }}
        />
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  total: state.executors.orders.total,
  limit: state.executors.orders.limit,
  offset: state.search.offset
});

export default connect(
  mapStateToProps,
  { pageChange, getExecutorOrders }
)(withStyles(styles)(PaginationPaper));
