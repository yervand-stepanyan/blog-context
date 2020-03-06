import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const VARIABLES = {
  title: 'Log out',
  text: 'Are you sure you want to log out?',
  buttonLabel: 'Log out'
};

class Logout extends React.Component {
  handleLogOut = () => {
    const {
      handleLogOut,
      isCreatePostClicked,
      handleCreatePostClick
    } = this.props;
    handleLogOut(false);

    if (isCreatePostClicked) {
      handleCreatePostClick(false);
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.logoutContainer}>
        <div className={classes.logoutContent}>
          <div className={classes.logoutTitleSection}>
            <Typography variant="h4" className={classes.title}>
              {VARIABLES.title}
            </Typography>
          </div>
          <div className={classes.logoutText}>
            <Typography variant="h6">{VARIABLES.text}</Typography>
          </div>
          <div>
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={() => this.handleLogOut()}
            >
              {VARIABLES.buttonLabel}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

Logout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Logout;
