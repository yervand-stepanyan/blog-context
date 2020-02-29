import React from 'react';
import { styles } from './styles';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import { withStyles } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';

class CommentEditable extends React.Component {
  constructor(props) {
    super(props);

    const { comment, comments, currentUserId } = this.props;
    const commentText = comment.comment;
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(user => user.id === comment.userId);

    this.state = {
      comment,
      comments,
      commentText,
      currentUserId,
      users,
      user,
      isEdit: false
    };
  }

  onCommentChange = event => {
    this.setState({ commentText: event.target.value });
  };

  handleIsEdit = () => {
    this.onSubmit();
  };

  onRemove = () => {
    this.props.onCommentRemove(this.props.comment);
  };

  onSubmit = () => {
    this.setState(
      state => ({
        comment: { ...state.comment, comment: state.commentText }
      }),
      () =>
        this.setState(
          state => ({
            comments: state.comments.map(comment =>
              comment.id === state.comment.id ? state.comment : comment
            ),
            isEdit: !state.isEdit
          }),
          () =>
            localStorage.setItem(
              'comments',
              JSON.stringify(this.state.comments)
            )
        )
    );
  };

  render() {
    const { isEdit, user, currentUserId, commentText } = this.state;
    const { classes } = this.props;
    const { date } = this.state.comment;
    const avatar = user.username[0].toUpperCase();
    const correctUser = currentUserId === user.id;

    return (
      <div className={classes.postContainer}>
        <div className={classes.cardSection}>
          <Card className={classes.cardWrapper}>
            <CardContent className={classes.CardContent}>
              <div className={classes.titleSection}>
                <div className={classes.avatarSection}>
                  <Avatar className={classes.avatar}>{avatar}</Avatar>
                </div>
                <div className={classes.userSection}>
                  <Typography variant="subtitle2" color="textSecondary">
                    {date} by {user.username}
                  </Typography>
                </div>
                <div className={classes.editIcon}>
                  <IconButton
                    onClick={() => this.handleIsEdit()}
                    disabled={!correctUser}
                  >
                    <CreateIcon />
                  </IconButton>
                </div>
              </div>
              <div className={classes.commentSection}>
                {isEdit ? (
                  <TextField
                    className={classes.commentTextField}
                    placeholder="Write the comment..."
                    id="standard-multiline-static"
                    label="Comment"
                    multiline
                    rows="5"
                    value={commentText}
                    onChange={e => this.onCommentChange(e)}
                  />
                ) : (
                  <Typography>{commentText}</Typography>
                )}
              </div>
            </CardContent>
            <CardActions className={classes.CardActions}>
              <div className={classes.buttonsSection}>
                <div className={classes.btnDiv}>
                  <IconButton
                    onClick={this.onRemove}
                    disabled={!correctUser}
                    color="secondary"
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
                <div>
                  <IconButton
                    disabled={!isEdit}
                    onClick={this.onSubmit}
                    color="primary"
                  >
                    <CheckIcon />
                  </IconButton>
                </div>
              </div>
            </CardActions>
          </Card>
        </div>
      </div>
    );
  }
}

CommentEditable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CommentEditable);
