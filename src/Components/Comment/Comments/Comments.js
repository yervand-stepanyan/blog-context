import React from 'react';
import PropTypes from 'prop-types';

import Comment from '../CommentEditable';

function Comments({ classes, comments, postId }) {
  const filteredComments = comments.filter(
    comment => comment.postId === postId
  );

  return (
    <div className={classes.postsContainer}>
      <div className={classes.postSection}>
        <ul className={classes.ul}>
          {filteredComments.map(comment => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </ul>
      </div>
    </div>
  );
}

Comments.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Comments;
