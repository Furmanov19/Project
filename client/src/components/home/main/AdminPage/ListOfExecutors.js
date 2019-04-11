import React, { Component } from 'react';
import ExecutorPaper from './ExecutorPaper';
import Load from '../../../common/load'
import Pagination from "../Pagination";

class ListOfExecutors extends Component {
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
        {
          (this.props.executors === undefined)?
          <Load/>:
          (
            <div>
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
export default ListOfExecutors;