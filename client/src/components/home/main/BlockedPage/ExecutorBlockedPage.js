import React, { Component } from 'react'

export default class ExecutorBlockedPage extends Component {
  render() {
    return (
      <div>
        <h1>YOU WAS BLOCKED</h1>
        <h1>{"" +this.props.executor.name}</h1>
        <h1>{this.props.executor.reason}</h1>
        <h1>{this.props.executor._id}</h1>
      </div>
    )
  }
}
