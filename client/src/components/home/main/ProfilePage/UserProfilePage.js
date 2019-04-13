import React, { Component } from 'react'

export default class UserProfilePage extends Component {
  render() {
    return (
      <>
        <h1>{this.props.id}</h1>
        <h1>{this.props.role}</h1>
      </>
    )
  }
}
