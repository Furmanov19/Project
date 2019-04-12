import React, { Component } from 'react';
import ExecutorPaperContainer from '../../../../containers/ExecutorPaperContailer';
import Load from '../../../common/load'
import Pagination from "../Pagination";
import ExecutorsSearchPanel from './ExecutorsSearchPanel';

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
      <ExecutorsSearchPanel /> 
        {
          (this.props.executors === undefined)?
          <Load/>:
          (
            <div>
              {this.props.executors.map(executor =>
                <ExecutorPaperContainer key={executor._id} executorInfo={executor}/>
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