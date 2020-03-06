import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import { Context } from '../../../Context/context';
import { saveState, loadState } from '../../../helpers/localStorage';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';

function CommentEditable(props) {
  const context = useContext(Context);

  const [comment, setComment] = useState(props.comment);
  const [comments, setComments] = useState(context.comments);
  const [commentText, setCommentText] = useState(comment.comment);
  const [currentUserId] = useState(context.currentUserId);
  const [users] = useState(loadState('users'));
  const [user] = useState(users.find(user => user.id === comment.userId));
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setComments(
      comments.map(singleComment =>
        singleComment.id === comment.id
          ? { ...comment, comment: commentText }
          : singleComment
      )
    );
  }, [comment]);

  useEffect(() => {
    saveState('comments', comments);
  }, [comments]);

  const onCommentChange = event => {
    setCommentText(event.target.value);
  };

  const handleIsEdit = () => {
    onSubmit();
  };

  const onRemove = () => {
    context.onCommentRemove(comment);
  };

  const onSubmit = () => {
    setComment(prevState => ({ ...prevState, comment: commentText }));

    setIsEdit(!isEdit);
  };

  const { classes } = props;
  const { date } = comment;
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
                  onClick={() => handleIsEdit()}
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
                  onChange={e => onCommentChange(e)}
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
                  onClick={onRemove}
                  disabled={!correctUser}
                  color="secondary"
                >
                  <DeleteIcon />
                </IconButton>
              </div>
              <div>
                <IconButton
                  disabled={!isEdit}
                  onClick={onSubmit}
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

CommentEditable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default CommentEditable;
