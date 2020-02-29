import React from 'react';
import { styles } from './styles';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';
import Comment from '../CommentEditable';

function Comments({
  classes,
  comments,
  currentUserId,
  onCommentRemove,
  postId
}) {
  const filteredComments = comments.filter(
    comment => comment.postId === postId
  );

  return (
    <div className={classes.postsContainer}>
      <div className={classes.postSection}>
        <ul className={classes.ul}>
          {filteredComments.map(comment => (
            <Comment
              key={comment.id}
              comment={comment}
              comments={comments}
              currentUserId={currentUserId}
              onCommentRemove={onCommentRemove}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

Comments.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Comments);
