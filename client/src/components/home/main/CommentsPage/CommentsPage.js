import React, { Component } from 'react'

export default class CommentsPage extends Component {
  componentDidMount(){
    this.props.getExecutorComments();
  }
  render() {
    return (
      <div>
        <h1>comments page</h1>
      </div>
    )
  }
}
