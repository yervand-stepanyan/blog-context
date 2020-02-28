import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { styles } from './styles';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const VARIABLES = {
  title: 'Log in',
  usernameLabel: '* Username',
  passwordLabel: '* Password',
  buttonLabel: 'Log In'
};

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

  onUsernameChange = event => {
    this.setState({ username: event.target.value });
  };

  onPasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  handleLogIn = () => {
    const { username, password } = this.state;
    const {
      isLoggedIn,
      history,
      isCreatePostClicked,
      handleCreatePostClick
    } = this.props;

    if (username && password) {
      const newUser = { username, password };

      this.setState({ username: '', password: '' }, () => {
        isLoggedIn(true, newUser);

        if (isCreatePostClicked) {
          history.push('/blog-context-api/create');

          handleCreatePostClick(false);
        } else {
          history.push('/blog-context-api/');
        }
      });
    }
  };

  render() {
    const { username, password } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.loginContainer}>
        <div className={classes.loginContent}>
          <div className={classes.titleSection}>
            <Typography variant="h4" className={classes.title}>
              {VARIABLES.title}
            </Typography>
          </div>
          <div>
            <div className={classes.usernameInput}>
              <TextField
                id="standard-basic"
                label={VARIABLES.usernameLabel}
                fullWidth
                value={username}
                onChange={e => this.onUsernameChange(e)}
              />
            </div>
            <div className={classes.passwordInput}>
              <TextField
                id="standard-password-input"
                label={VARIABLES.passwordLabel}
                type="password"
                autoComplete="current-password"
                fullWidth
                value={password}
                onChange={e => this.onPasswordChange(e)}
              />
            </div>
            <div className={classes.loginBtn}>
              <Button
                variant="contained"
                size="large"
                color="primary"
                fullWidth
                onClick={() => this.handleLogIn()}
              >
                {VARIABLES.buttonLabel}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(Login));
