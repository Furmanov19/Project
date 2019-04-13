import React, { Component } from 'react';
import ExecutorPaper from './ExecutorCard';
import Load from '../../common/load'
import SearchPanel from './SearchPanel';
import Pagination from "./Pagination";

class Main extends Component {
  constructor(props){
    super(props);
    this.state={
      offset:0,
      searchValue:"",
      price:""
    }
  }
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
          (
            <div>
              {this.props.executors.map(executor =>
                !executor.blocking.isBlocked?<ExecutorPaper key={executor._id} name={executor.name} role={executor.role}/>:null
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