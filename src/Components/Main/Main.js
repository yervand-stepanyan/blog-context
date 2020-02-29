import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';

import { styles } from './styles';
import Header from '../Header';
import Home from '../Home';
import CreatePost from '../Post/CreatePost';
import ProtectedRoute from '../ProtectedRoute';
import Posts from '../Post/PostsComponent';
import PostDetails from '../Post/PostDetails';
import ScrollToTop from '../../Helpers/ScrollToTop';

import { withStyles } from '@material-ui/core';

class Main extends React.Component {
  constructor(props) {
    super(props);

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentId = uuid();
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const isLoggedIn = users.some(user => user.isOnline);
    const currentUserId = isLoggedIn
      ? users.find(user => user.isOnline).id
      : '';

    this.state = {
      isLoggedIn,
      users,
      currentId,
      isCreatePostClicked: false,
      currentUserId,
      posts
    };
  }

  handleLogIn = (isLoggedIn, user) => {
    const { username, password } = user;
    const { users } = this.state;

    const loggedUser = users.find(
      user => user.username === username && user.password === password
    );

    if (loggedUser) {
      this.setState(
        state => ({
          users: state.users.map(user =>
            user.id === loggedUser.id
              ? { ...user, isOnline: true }
              : { ...user, isOnline: false }
          ),
          isLoggedIn: isLoggedIn,
          currentUserId: loggedUser.id
        }),
        () => localStorage.setItem('users', JSON.stringify(this.state.users))
      );
    } else {
      this.setState(
        state => ({
          users: [
            {
              id: state.currentId,
              username: username,
              password: password,
              isOnline: true
            },
            ...state.users
          ],
          currentId: uuid(),
          isLoggedIn: isLoggedIn,
          currentUserId: state.currentId
        }),
        () => localStorage.setItem('users', JSON.stringify(this.state.users))
      );
    }
  };

  handleLogOut = isLoggedIn => {
    const { users } = this.state;

    const newUsers = users.map(user => ({
      ...user,
      isOnline: false
    }));

    this.setState(
      {
        users: newUsers,
        isLoggedIn: isLoggedIn
      },
      () => localStorage.setItem('users', JSON.stringify(this.state.users))
    );
  };

  handleCreatePostClick = isClicked => {
    this.setState({ isCreatePostClicked: isClicked });
  };

  handlePostAdd = posts => {
    this.setState({ posts: posts });
  };

  render() {
    const {
      isLoggedIn,
      isCreatePostClicked,
      currentUserId,
      posts
    } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.mainContainer}>
        <Router>
          <ScrollToTop>
            <Header
              isLoggedIn={isLoggedIn}
              handleCreatePostClick={this.handleCreatePostClick}
            />
            <Switch>
              <Route exact path="/">
                <Redirect to={{ pathname: '/blog-context-api/' }} />
              </Route>
              <Route exact path="/blog-context-api/">
                {posts.length > 0 ? (
                  <Posts />
                ) : (
                  <Home isLoggedIn={isLoggedIn} />
                )}
              </Route>
              <ProtectedRoute
                path={'/blog-context-api/create'}
                isLoggedIn={isLoggedIn}
                component={CreatePost}
                currentUserId={currentUserId}
                handlePostAdd={this.handlePostAdd}
              />
              <ProtectedRoute
                path={'/blog-context-api/auth'}
                isLoggedIn={isLoggedIn}
                isCreatePostClicked={isCreatePostClicked}
                handleLogIn={this.handleLogIn}
                handleLogOut={this.handleLogOut}
                handleCreatePostClick={this.handleCreatePostClick}
              />
              <ProtectedRoute
                path={'/blog-context-api/post/:id'}
                isLoggedIn={isLoggedIn}
                component={PostDetails}
                currentUserId={currentUserId}
                posts={posts}
              />
            </Switch>
          </ScrollToTop>
        </Router>
      </div>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Main);
