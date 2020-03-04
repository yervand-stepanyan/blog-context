import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { styles } from './styles';
import { ROUTES } from '../../../Routes/Routes';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const VARIABLES = {
  title: 'Log in',
  usernameLabel: '* Username',
  passwordLabel: '* Password',
  buttonLabel: 'Log In',
  usernameErrorLabel: '* Username is empty',
  passwordErrorLabel: '* Password is empty',
  incorrectPassword: '* Password is incorrect'
};

class Login extends React.Component {
  constructor(props) {
    super(props);

    const users = props.users || [];

    this.state = {
      username: '',
      password: '',
      isUsernameEmpty: false,
      isPasswordEmpty: false,
      isPasswordCorrect: true,
      users
    };
  }

  onUsernameChange = event => {
    this.setState({ username: event.target.value, isUsernameEmpty: false });
  };

  onPasswordChange = event => {
    this.setState({
      password: event.target.value,
      isPasswordEmpty: false,
      isPasswordCorrect: true
    });
  };

  passUser = (
    user,
    handleLogIn,
    history,
    handleCreatePostClick,
    isCreatePostClicked
  ) => {
    handleLogIn(true, user);

    if (isCreatePostClicked) {
      history.push(ROUTES.create);

      handleCreatePostClick(false);
    } else {
      history.push(ROUTES.home);
    }
  };

  handleSubmitOnEnter = e => {
    if (e.key === 'Enter') {
      this.handleLogIn();
    }
  };

  handleLogIn = () => {
    const { username, password, users } = this.state;
    const {
      handleLogIn,
      history,
      isCreatePostClicked,
      handleCreatePostClick
    } = this.props;

    if (!username && !password) {
      this.setState({ isUsernameEmpty: true, isPasswordEmpty: true });
    } else if (!username) {
      this.setState({ isUsernameEmpty: true });
    } else if (!password) {
      this.setState({ isPasswordEmpty: true });
    } else {
      const newUser = { username: username.trim(), password };

      const isUserRegistered = users.some(
        user => user.username === newUser.username
      );

      if (isUserRegistered) {
        users.forEach(user => {
          if (user.password === newUser.password) {
            this.setState(
              {
                username: '',
                password: '',
                isUsernameEmpty: false,
                isPasswordEmpty: false,
                isPasswordCorrect: true
              },
              () => {
                this.passUser(
                  newUser,
                  handleLogIn,
                  history,
                  handleCreatePostClick,
                  isCreatePostClicked
                );
              }
            );
          } else {
            this.setState({ isPasswordCorrect: false });
          }
        });
      } else {
        this.passUser(
          newUser,
          handleLogIn,
          history,
          handleCreatePostClick,
          isCreatePostClicked
        );
      }
    }
  };

  render() {
    const {
      username,
      password,
      isUsernameEmpty,
      isPasswordEmpty,
      isPasswordCorrect
    } = this.state;
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
                label={
                  isUsernameEmpty
                    ? VARIABLES.usernameErrorLabel
                    : VARIABLES.usernameLabel
                }
                error={isUsernameEmpty}
                fullWidth
                value={username}
                onChange={e => this.onUsernameChange(e)}
                onKeyDown={this.handleSubmitOnEnter}
              />
            </div>
            <div className={classes.passwordInput}>
              <TextField
                id="standard-password-input"
                label={
                  isPasswordCorrect
                    ? isPasswordEmpty
                      ? VARIABLES.passwordErrorLabel
                      : VARIABLES.passwordLabel
                    : VARIABLES.incorrectPassword
                }
                error={isPasswordEmpty || !isPasswordCorrect}
                type="password"
                autoComplete="current-password"
                fullWidth
                value={password}
                onChange={e => this.onPasswordChange(e)}
                onKeyDown={this.handleSubmitOnEnter}
              />
            </div>
            <div className={classes.loginBtn}>
              <Button
                variant="contained"
                size="large"
                color="primary"
                fullWidth
                onClick={this.handleLogIn}
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
