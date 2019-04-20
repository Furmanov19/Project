import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Load from "../../../common/load";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: "50%",
    margin: "10px auto",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
    position:"relative"
  },
  comment: {
    width: "100%",
    display: "flex",
    alignItems: "center"
  },
  wrapper: {
    width: "100%"
  },
  newComment: {
    width: "100%",
    padding: theme.spacing.unit * 2,
    paddingLeft: 0
  },
  info: {
    margin: theme.spacing.unit * 2
  },
  button1: {
    margin: "0 auto"
  },
  divider: {
    width: "97%",
    margin: "0 auto",
    marginLeft: "0"
  },
  iconButton:{
    position:"absolute",
    top:0,
    right:0
  }
});

class CommentsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      perPage: 5,
      comment: "",
      inputDisabled: !Boolean(this.props.isAuth && this.props.user),
      buttonDisabled: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickMore = this.handleClickMore.bind(this);
    this.handleButtonDisable = this.handleButtonDisable.bind(this);
  }
  componentDidMount() {
    this.props.getExecutorComments();
  }
  handleChange(e) {
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => {
        this.handleButtonDisable();
      }
    );
  }
  handleButtonDisable() {
    this.state.comment.length > 0 &&
      this.setState({ buttonDisabled: false }, () => {
        console.log(this.state);
      });
  }
  handleClick() {
    const newComment = {
      userName: this.props.user.name,
      userComment: this.state.comment
    };
    this.props.postComment(newComment);
    this.setState({ comment: "", buttonDisabled: true });
  }
  handleClickMore() {
    this.setState({ perPage: this.state.perPage + 5 },()=>{this.props.getExecutorComments(this.state.perPage)});
  }
  render() {
    const date = new Date();
    const { classes } = this.props;
    return (
      <>
        {this.props.comments === undefined ? (
          <Load />
        ) : (
          <Paper className={classes.root}>
            {this.props.comments.map(comment => (
              <div className={classes.wrapper} key={comment._id}>
                <div className={classes.comment}>
                  <div className={classes.info}>
                    <Typography variant="h5">{comment.userName}</Typography>
                    <Typography variant="caption">
                      {date.getFullYear(comment.created_at)}-
                      {date.getMonth(comment.created_at)}-
                      {date.getDate(comment.created_at)},{" "}
                      {date.getHours(comment.created_at)}:
                      {date.getMinutes(comment.created_at)}
                    </Typography>
                  </div>
                  <Typography variant="subtitle2">{comment.comment}</Typography>
                </div>
                <Divider className={classes.divider} variant="inset" />
              </div>
            ))}
            <div className={classes.newComment}>
              <TextField
                label="Comment..."
                multiline
                rowsMax="4"
                className={classes.textField}
                margin="normal"
                fullWidth
                name="comment"
                value={this.state.comment}
                variant="outlined"
                onChange={this.handleChange}
                disabled={this.state.inputDisabled}
              />
              <Button
                type="submit"
                key="submit"
                variant="contained"
                color="secondary"
                size="small"
                className={classes.button}
                disabled={this.state.buttonDisabled}
                onClick={this.handleClick}
              >
                Paste
              </Button>
            </div>
            <Button
              type="submit"
              key="submit"
              variant="contained"
              color="primary"
              size="small"
              className={classes.button1}
              onClick={this.handleClickMore}
            >
              More
            </Button>
            <IconButton className={classes.iconButton} onClick={()=>{this.props.goBackFanc()}}>
              <i className="material-icons">cancel</i>
            </IconButton>
          </Paper>
        )}
      </>
    );
  }
}

export default withStyles(styles)(CommentsPage);
