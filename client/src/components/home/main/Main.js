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
      searchValue:""
    }
    this.handlePaginateClick=this.handlePaginateClick.bind(this);
    this.handleSearchChange=this.handleSearchChange.bind(this);
  }
  handlePaginateClick(offset) {
    this.setState({offset},()=>{
      this.props.getExecutors(this.state.offset,this.state.searchValue);
    });
    
  }
  handleSearchChange(e) {
    this.setState({[e.target.name]:e.target.value},()=>{
      console.log(this.state.searchValue);
      this.props.getExecutors(this.state.offset,this.state.searchValue);
    });
    
  }
  componentDidMount(){
    this.props.getExecutors(this.state.offset,this.state.searchValue);
  }
  render() {
    return (
      <>
        <SearchPanel handleSearchChange={this.handleSearchChange}/>
        {
          (this.props.executors === undefined)?
          <Load/>:
          (<div>
              {this.props.executors.map(executor =>
                <ExecutorPaper key={executor._id} name={executor.name} />
              )}
              <Pagination handlePaginateClick={this.handlePaginateClick} offset={this.state.offset}/>
            </div>
          )
        }
      </>
    )
  }
}
export default Main;