import React, { Component } from 'react'

export default class BlockedPage extends Component {
  render() {
    return (
      <div>
        <h1>YOU WAS BLOCKED</h1>
        <h1>{"" +this.props.executorIsBLocked}</h1>
        <h1>{this.props.executorName}</h1>
        <h1>{this.props.executorBlockingReason}</h1>
      </div>
    )
  }
}
