import React from 'react';
import { styles } from './styles';
import { Link, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Login from '../Authentication/Login/Login';

const VARIABLES = {
  header: 'There is no post on web-site.',
  textAsLinkToLogIn: 'Log in',
  textIsNotLoggedIn: ' and be our first story teller.',
  textAsLinkToPosts: 'share your story!',
  textIsLoggedIn: "You've logged in, "
};

function Home({ classes, isLoggedIn }) {
  return (
    <div className={classes.homeContainer}>
      <div className={classes.homeContent}>
        <div className={classes.titleSection}>
          <Typography variant="h5" className={classes.title}>
            {VARIABLES.header}
          </Typography>
        </div>
        <div className={classes.textSection}>
          {isLoggedIn ? (
            <Typography variant="h4" className={classes.text}>
              {VARIABLES.textIsLoggedIn}{' '}
              <Link to="/blog-context-api/create">{VARIABLES.textAsLinkToPosts}</Link>
            </Typography>
          ) : (
            <Typography variant="h4" className={classes.text}>
              <Link to="/blog-context-api/auth">{VARIABLES.textAsLinkToLogIn}</Link>
              {VARIABLES.textIsNotLoggedIn}
            </Typography>
          )}
        </div>
        <Route path="/blog-context-api/auth">
          <Login />
        </Route>
      </div>
    </div>
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
