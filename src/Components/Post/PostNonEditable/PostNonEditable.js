import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { styles } from './styles';
import { ROUTES } from '../../../Routes/Routes';

import { withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

function PostNonEditable(props) {
  const { classes } = props;
  const { title, content, date, userId, id } = props.post;
  const users = JSON.parse(localStorage.getItem('users'));
  const user = users.find(user => user.id === userId);
  const avatar = user.username[0].toUpperCase();

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
            </div>
            <div className={classes.contentSection}>
              <Typography>{content}</Typography>
            </div>
          </CardContent>
          <CardActions className={classes.CardActions}>
            <Link
              to={`${ROUTES.postById}/${id}`}
              className={classes.learnMoreLink}
            >
              <Button size="medium" color="secondary">
                Learn More
              </Button>
            </Link>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}

PostNonEditable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PostNonEditable);
