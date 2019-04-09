import React, { Component } from 'react';
import ExecutorPaper from './ExecutorCard';
import Load from '../../common/load'
import SearchPanel from './SearchPanel';
import Pagination from "./Pagination";

class Main extends Component {
  componentDidMount(){
    this.props.getExecutors();
  }

  render() {
    return (
      <>
        <SearchPanel />
        {
          (this.props.executors === undefined)?
          <Load/>:
          (<div>
              {this.props.executors.map(executor =>
                <ExecutorPaper key={executor._id} name={executor.name} />
              )}
              <Pagination />
            </div>
          )
        }
      </>
    )
  }
}
export default Main;