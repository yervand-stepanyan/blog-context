import React from 'react';
import { styles } from './styles';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';

import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import { withStyles } from '@material-ui/core';

const monthNames = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC'
];

class CreateComment extends React.Component {
  constructor(props) {
    super(props);

    const currentId = uuid();

    this.state = {
      comment: '',
      currentId,
      postId: this.props.post.id,
      userId: this.props.currentUserId
    };
  }

  onCommentChange = event => {
    this.setState({ comment: event.target.value });
  };

  onCommentAdd = () => {
    const { currentId, comment, userId, postId } = this.state;
    const date = new Date();
    const now =
      monthNames[date.getMonth()] +
      ' ' +
      date.getDate() +
      ' ' +
      date.getFullYear();

    const newComment = {
      id: currentId,
      comment,
      date: now,
      userId,
      postId
    };

    this.setState({ comment: '', currentId: uuid() }, () => {
      this.props.onCommentAdd(newComment);
    });
  };

  render() {
    const { comment } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.createCommentContainer}>
        <div className={classes.createCommentContent}>
          <div className={classes.commentDiv}>
            <TextField
              className={classes.commentTextField}
              placeholder="Write the comment..."
              id="standard-multiline-static"
              label="* Comment"
              multiline
              rows="4"
              value={comment}
              onChange={e => this.onCommentChange(e)}
            />
          </div>
          <div className={classes.btnDiv}>
            <Fab
              color="primary"
              onClick={this.onCommentAdd}
              disabled={!comment}
            >
              <CheckIcon />
            </Fab>
          </div>
        </div>
      </div>
    );
  }
}

CreateComment.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateComment);
