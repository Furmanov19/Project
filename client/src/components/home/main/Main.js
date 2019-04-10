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
    this.handlePaginateClick=this.handlePaginateClick.bind(this);
    this.handleSearchChange=this.handleSearchChange.bind(this);
    this.handlePriceChange=this.handlePriceChange.bind(this);
  }
  handlePaginateClick(offset) {
    this.setState({offset},()=>{
      this.props.getExecutors(this.state.offset,this.state.searchValue);
    });
    
  }
  handleSearchChange(e) {
    this.setState({[e.target.name]:e.target.value},()=>{
      this.props.getExecutors(this.state.offset,this.state.searchValue);
    });
  }
  handlePriceChange(e) {
    this.setState({[e.target.name]:e.target.value},()=>{
      console.log("price",this.state.price);
      this.props.getExecutors(this.state.offset,this.state.searchValue);
    });
  }
  componentDidMount(){
    this.props.getExecutors();
  }
  render() {
    return (
      <>
        <SearchPanel handleSearchChange={this.handleSearchChange} handlePriceChange={this.handlePriceChange}/>
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