import React, { Component } from 'react'

export default class ExecutorBlockedPage extends Component {
  render() {
    return (
      <div>
        <h1>YOU WAS BLOCKED</h1>
        <h1>{"" +this.props.user.name}</h1>
        <h1>{this.props.user.reason}</h1>
        <h1>{this.props.user._id}</h1>
      </div>
    )
  }
}
