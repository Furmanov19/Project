import React, { Component } from "react";
import ExecutorCard from "./ExecutorCard";
import Load from "../../common/load";
import SearchPanel from "./SearchPanel";
import Pagination from "./Pagination";

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
          <div>
            {this.props.executors.map(executor =>
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
            )}
            <Pagination />
          </div>
        )}
      </>
    );
  }
}
export default Main;
