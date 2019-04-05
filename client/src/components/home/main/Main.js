import React, { Component } from 'react';
import ExecutorPaper from './ExecutorPaper';

class Main extends Component {
  componentWillMount(){
    this.props.getExecutors();
  }
  render() {
    return (
      <>
        {
          this.props.executors.map(executor =>
            <ExecutorPaper key={executor._id} name={executor.name} role={executor.role} />
          )
        }
      </>
    )
  }
}
export default Main;