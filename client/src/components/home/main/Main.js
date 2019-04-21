import React, { Component } from "react";
import ExecutorCard from "./ExecutorCard";
import Load from "../../common/load";
import SearchPanel from "./SearchPanel";
import Pagination from "./Pagination";
import Typography from "@material-ui/core/Typography";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      searchValue: "",
      price: ""
    };
  }
  componentDidMount() {
    this.props.getExecutors();
  }
  render() {
    return (
      <>
        <SearchPanel />
        {this.props.executors === undefined ? (
          <Load />
        ) : (
          <div style={{textAlign:"center"}}>
            {this.props.executors.length !== 0 ? (
              this.props.executors.map(executor =>
                !executor.blocking.isBlocked ? (
                  <ExecutorCard
                    key={executor._id}
                    executorInfo={executor}
                    selectExecutorForInfo={this.props.selectExecutorForInfo}
                    name={executor.name}
                    averagePrice={executor.averagePrice}
                    averageRate={executor.averageRate}
                    services={executor.services}
                  />
                ) : null
              )
            ) : (
              <Typography variant="h5">There is no companies yet</Typography>
            )}
            <Pagination />
          </div>
        )}
      </>
    );
  }
}
export default Main;
