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
            <ExecutorPaper key={executor._id} username={executor.username} role={executor.role} />
          )
        }
      </>
    )
  }
}
export default Main;