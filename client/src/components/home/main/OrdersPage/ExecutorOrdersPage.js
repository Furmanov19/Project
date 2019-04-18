import React, { Component } from 'react'

export default class ExecutorOrderPage extends Component {
  componentDidMount(){
    this.props.getExecutorOrders();
  }
  render() {
    return (
      <>
        <h1>THERE IS EXECUTOR ORDERS PAGE</h1>
      </>
    )
  }
}
