import React from 'react';
import { Link, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ROUTES } from '../../Routes/Routes';
import Login from '../Authentication/Login/Login';

import Typography from '@material-ui/core/Typography';

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
              <Link to={ROUTES.create}>{VARIABLES.textAsLinkToPosts}</Link>
            </Typography>
          ) : (
            <Typography variant="h4" className={classes.text}>
              <Link to={ROUTES.auth}>{VARIABLES.textAsLinkToLogIn}</Link>
              {VARIABLES.textIsNotLoggedIn}
            </Typography>
          )}
        </div>
        <Route path={ROUTES.auth}>
          <Login />
        </Route>
      </div>
    </div>
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Home;
