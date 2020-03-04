import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { styles } from './styles';
import { ROUTES } from '../../../Routes/Routes';

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
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';

class PostEditable extends React.Component {
  constructor(props) {
    super(props);

    const { posts, post, comments, currentUserId } = this.props;
    const content = post.content;
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(user => user.id === post.userId);

    this.state = {
      posts,
      post,
      content,
      comments,
      currentUserId,
      users,
      user,
      isEdit: false
    };
  }

  onContentChange = event => {
    this.setState({ content: event.target.value });
  };

  handleIsEdit = () => {
    this.onSubmit();
  };

  onRemove = () => {
    this.setState(
      state => ({
        posts: state.posts.filter(post => post.id !== state.post.id),
        comments: state.comments.filter(
          comment => comment.postId !== state.post.id
        )
      }),
      () => {
        localStorage.setItem('posts', JSON.stringify(this.state.posts));
        localStorage.setItem('comments', JSON.stringify(this.state.comments));
        this.props.history.push(ROUTES.home);
      }
    );
  };

  onSubmit = () => {
    this.setState(
      state => ({
        post: { ...state.post, content: state.content }
      }),
      () =>
        this.setState(
          state => ({
            posts: state.posts.map(post =>
              post.id === state.post.id ? state.post : post
            ),
            isEdit: !state.isEdit
          }),
          () => localStorage.setItem('posts', JSON.stringify(this.state.posts))
        )
    );
  };

  render() {
    const { content, isEdit, user, currentUserId } = this.state;
    const { classes } = this.props;
    const { title, date } = this.state.post;
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
                <div>
                  <Typography gutterBottom>{title}</Typography>
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
              <div className={classes.contentSection}>
                {isEdit ? (
                  <TextField
                    className={classes.contentTextField}
                    placeholder="Write the post..."
                    id="standard-multiline-static"
                    label="Post"
                    multiline
                    rows="5"
                    value={content}
                    onChange={e => this.onContentChange(e)}
                  />
                ) : (
                  <Typography>{content}</Typography>
                )}
              </div>
            </CardContent>
            <CardActions className={classes.CardActions}>
              <div className={classes.buttonsSection}>
                <div className={classes.btnDiv}>
                  <Fab
                    onClick={this.onRemove}
                    disabled={!correctUser}
                    color="secondary"
                  >
                    <DeleteIcon />
                  </Fab>
                </div>
                <div className={classes.btnDiv}>
                  <Fab
                    color="primary"
                    disabled={!isEdit}
                    onClick={this.onSubmit}
                  >
                    <CheckIcon />
                  </Fab>
                </div>
              </div>
            </CardActions>
          </Card>
        </div>
      </div>
    );
  }
}

PostEditable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(PostEditable));
