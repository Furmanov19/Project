import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import {EditProfileLink} from '../../../common/Links';
export default class ExecutorProfilePage extends Component {
  render() {
    return (
      <>
        <h1>THERE IS EXECUTOR PROFILE PAGE</h1>
        <Button variant="contained" color="secondary"  component={EditProfileLink}>
              EDIT
            </Button>
      </>
    )
  }
}
