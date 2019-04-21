import React, { Component } from "react";
import UserPaperContainer from "../../../../containers/UserPaperContainer";
import Load from "../../../common/load";
import Pagination from "./UsersPagination";
import UsersSearchPanel from "./UsersSearchPanel";
import Typography from "@material-ui/core/Typography";

class ListOfUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      searchValue: "",
      price: ""
    };
  }
  componentDidMount() {
    this.props.getUsers();
  }
  render() {
    return (
      <>
        <UsersSearchPanel />
        {this.props.users === undefined ? (
          <Load />
        ) : (
          <div>
            {this.props.users.length !== 0 ? (
              this.props.users.map(user => (
                <UserPaperContainer
                  key={user._id}
                  name={user.name}
                  userInfo={user}
                />
              ))
            ) : (
              <Typography variant="h5">There is no users yet</Typography>
            )}
            <Pagination />
          </div>
        )}
      </>
    );
  }
}
export default ListOfUsers;
