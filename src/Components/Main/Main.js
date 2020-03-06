import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';

import { ROUTES } from '../../Routes/Routes';
import Header from '../Header';
import Home from '../Home';
import CreatePost from '../Post/CreatePost';
import ProtectedRoute from '../ProtectedRoute';
import Posts from '../Post/PostsComponent';
import PostDetails from '../Post/PostDetails';
import ScrollToTop from '../ScrollToTop';
import { saveState, loadState } from '../../helpers/localStorage';

class Main extends React.Component {
  constructor(props) {
    super(props);

    const users = loadState('users') || [];
    const currentId = uuid();
    const posts = loadState('posts') || [];
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
          isLoggedIn,
          currentUserId: loggedUser.id
        }),
        () => saveState('users', this.state.users)
      );
    } else {
      this.setState(
        state => ({
          users: [
            {
              id: state.currentId,
              username,
              password,
              isOnline: true
            },
            ...state.users
          ],
          currentId: uuid(),
          isLoggedIn,
          currentUserId: state.currentId
        }),
        () => saveState('users', this.state.users)
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
        isLoggedIn
      },
      () => saveState('users', this.state.users)
    );
  };

  handleCreatePostClick = isClicked => {
    this.setState({ isCreatePostClicked: isClicked });
  };

  handlePostAdd = posts => {
    this.setState({ posts });
  };

  render() {
    const {
      isLoggedIn,
      isCreatePostClicked,
      currentUserId,
      posts,
      users
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
                <Redirect to={{ pathname: ROUTES.home }} />
              </Route>
              <Route exact path={ROUTES.home}>
                {posts.length > 0 ? (
                  <Posts />
                ) : (
                  <Home isLoggedIn={isLoggedIn} />
                )}
              </Route>
              <ProtectedRoute
                path={ROUTES.create}
                isLoggedIn={isLoggedIn}
                component={CreatePost}
                currentUserId={currentUserId}
                handlePostAdd={this.handlePostAdd}
              />
              <ProtectedRoute
                path={ROUTES.auth}
                users={users}
                isLoggedIn={isLoggedIn}
                isCreatePostClicked={isCreatePostClicked}
                handleLogIn={this.handleLogIn}
                handleLogOut={this.handleLogOut}
                handleCreatePostClick={this.handleCreatePostClick}
              />
              <ProtectedRoute
                path={`${ROUTES.postById}/:id`}
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

export default Main;
