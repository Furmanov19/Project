import React, { Component } from 'react';
import UserPaperContainer from '../../../../containers/UserPaperContainer';
import Load from '../../../common/load'
import Pagination from "./UsersPagination";
import UsersSearchPanel from './UsersSearchPanel';

class ListOfUsers extends Component {
  constructor(props){
    super(props);
    this.state={
      offset:0,
      searchValue:"",
      price:""
    }
  }
  componentDidMount(){
    this.props.getUsers();
  }
  render() {
    return (
      <>
      <UsersSearchPanel /> 
        {
          (this.props.users === undefined)?
          <Load/>:
          (
            <div>
              {this.props.users.map(user =>
                <UserPaperContainer key={user._id} name={user.name} userInfo={user}/>
              )}
              <Pagination />
            </div>
          )
        }
      </>
    )
  }
}
export default ListOfUsers;