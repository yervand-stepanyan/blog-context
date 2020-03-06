import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';

import { ROUTES } from '../../../Routes/Routes';
import { saveState, loadState } from '../../../helpers/localStorage';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CheckIcon from '@material-ui/icons/Check';
import Fab from '@material-ui/core/Fab';

const VARIABLES = {
  title: 'Tell us your story!'
};

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

class CreatePost extends React.Component {
  constructor(props) {
    super(props);

    const currentId = uuid();
    const posts = loadState('posts') || [];

    this.state = {
      title: '',
      content: '',
      posts,
      currentId,
      currentUserId: this.props.currentUserId
    };
  }

  onTitleChange = event => {
    this.setState({ title: event.target.value });
  };

  onContentChange = event => {
    this.setState({ content: event.target.value });
  };

  onPostAdd = () => {
    const date = new Date();
    const now =
      monthNames[date.getMonth()] +
      ' ' +
      date.getDate() +
      ' ' +
      date.getFullYear();

    this.setState(
      state => ({
        posts: [
          {
            id: state.currentId,
            title: state.title,
            content: state.content,
            date: now,
            userId: state.currentUserId
          },
          ...state.posts
        ],
        currentId: uuid(),
        title: '',
        content: ''
      }),
      () => {
        saveState('posts', this.state.posts);

        this.props.handlePostAdd(this.state.posts);
        this.props.history.push(ROUTES.home);
      }
    );
  };

  render() {
    const { title, content } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.createPostContainer}>
        <div className={classes.createPostContent}>
          <Card className={classes.cardSection}>
            <CardContent>
              <Typography className={classes.title} variant="h6" gutterBottom>
                {VARIABLES.title}
              </Typography>
              <div>
                <TextField
                  className={classes.titleTextField}
                  placeholder="Write the title..."
                  id="standard-basic"
                  label="* Title"
                  value={title}
                  onChange={e => this.onTitleChange(e)}
                />
              </div>
              <div className={classes.contentDiv}>
                <TextField
                  className={classes.contentTextField}
                  placeholder="Write the post..."
                  id="standard-multiline-static"
                  label="* Content"
                  multiline
                  rows="10"
                  value={content}
                  onChange={e => this.onContentChange(e)}
                />
              </div>
              <div className={classes.btnDiv}>
                <Fab color="primary" onClick={this.onPostAdd}>
                  <CheckIcon />
                </Fab>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

CreatePost.propTypes = {
  classes: PropTypes.object.isRequired
};

export default CreatePost;
