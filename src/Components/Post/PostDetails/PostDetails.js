import React from 'react';
import PropTypes from 'prop-types';

import { styles } from './styles';
import Post from '../PostEditable';
import CreateComment from '../../Comment/CreateComment';
import Comments from '../../Comment/Comments';
import { Context } from '../../../Context/context';
import { saveState, loadState } from '../../../helpers/localStorage';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';

const VARIABLES = {
  titlePost: 'Post',
  titleComment: 'Comments'
};

class PostDetails extends React.Component {
  constructor(props) {
    super(props);

    const posts = loadState('posts') || [];
    const post = posts.find(post => post.id === this.props.postId);
    const comments = loadState('comments') || [];

    this.state = {
      posts,
      post,
      comments
    };
  }

  onCommentAdd = comment => {
    this.setState(
      state => ({
        comments: [comment, ...state.comments]
      }),
      () => {
        saveState('comments', this.state.comments);
      }
    );
  };

  onCommentRemove = commentToRemove => {
    this.setState(
      state => ({
        comments: state.comments.filter(
          comment => comment.id !== commentToRemove.id
        )
      }),
      () => saveState('comments', this.state.comments)
    );
  };

  render() {
    const { posts, post, comments } = this.state;
    const { classes, currentUserId, postId } = this.props;

    return (
      <div className={classes.postsContainer}>
        <div className={classes.titleSection}>
          <Typography className={classes.title} variant="h4">
            {VARIABLES.titlePost}
          </Typography>
        </div>
        <div className={classes.postSection}>
          <Post
            key={post.id}
            post={post}
            posts={posts}
            comments={comments}
            currentUserId={currentUserId}
          />
        </div>
        <div className={classes.titleSection}>
          <Typography className={classes.title} variant="h5">
            {VARIABLES.titleComment}
          </Typography>
        </div>
        <div className={classes.createCommentSection}>
          <CreateComment
            post={post}
            onCommentAdd={this.onCommentAdd}
            comments={comments}
            currentUserId={currentUserId}
          />
        </div>
        <div className={classes.commentsSection}>
          <Context.Provider
            value={{
              comments,
              currentUserId,
              onCommentRemove: this.onCommentRemove
            }}
          >
            <Comments comments={comments} postId={postId} />
          </Context.Provider>
        </div>
      </div>
    );
  }
}

PostDetails.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PostDetails);
