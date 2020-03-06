import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ROUTES } from '../../Routes/Routes';
import HomeIcon from './HomeIcon';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

const VARIABLES = {
  home: 'Blog',
  createPost: 'Create Post',
  loginButtonLabel: 'Log in',
  logoutButtonLabel: 'Log out'
};

class Header extends React.Component {
  handleCreatePostClick = icClicked => {
    const { isLoggedIn, handleCreatePostClick } = this.props;

    if (!isLoggedIn) {
      handleCreatePostClick(icClicked);
    }
  };

  render() {
    const { classes, isLoggedIn } = this.props;

    return (
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Link to={ROUTES.home} className={classes.logo}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="blog"
              onClick={e => this.handleCreatePostClick(false, e)}
            >
              <HomeIcon fontSize="large" />
              <Typography variant="h4">{VARIABLES.home}</Typography>
            </IconButton>
          </Link>
          <Link to={ROUTES.create} className={classes.createPostLink}>
            <Button
              className={classes.linkBtn}
              color="inherit"
              size="large"
              onClick={() => this.handleCreatePostClick(true)}
            >
              {VARIABLES.createPost}
            </Button>
          </Link>
          <Link to={ROUTES.auth} className={classes.authLink}>
            {isLoggedIn ? (
              <Button className={classes.linkBtn} size="large">
                {VARIABLES.logoutButtonLabel}
              </Button>
            ) : (
              <Button
                className={classes.linkBtn}
                size="large"
                onClick={() => this.handleCreatePostClick(false)}
              >
                {VARIABLES.loginButtonLabel}
              </Button>
            )}
          </Link>
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Header;
