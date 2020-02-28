import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Login from '../Authentication/Login';
import Logout from '../Authentication/Logout';

export default function ProtectedRoute({ component: Component, ...rest }) {
  const {
    isLoggedIn,
    path,
    handleLogIn,
    handleLogOut,
    handleCreatePostClick,
    isCreatePostClicked,
    currentUserId,
    handlePostAdd,
    posts,
    computedMatch
  } = rest;

  if (path === '/blog-context-api/auth') {
    return isLoggedIn ? (
      <Route path={path}>
        <Logout
          isLoggedIn={handleLogOut}
          isCreatePostClicked={isCreatePostClicked}
          handleCreatePostClick={handleCreatePostClick}
        />
      </Route>
    ) : (
      <Route path={path}>
        <Login
          isLoggedIn={handleLogIn}
          isCreatePostClicked={isCreatePostClicked}
          handleCreatePostClick={handleCreatePostClick}
        />
      </Route>
    );
  } else {
    return isLoggedIn ? (
      <Route path={path}>
        <Component
          currentUserId={currentUserId}
          handlePostAdd={handlePostAdd}
          posts={posts}
          {...rest}
          postId={computedMatch.params.id}
        />
      </Route>
    ) : (
      <Redirect to={{ pathname: '/blog-context-api/auth' }} />
    );
  }
}
