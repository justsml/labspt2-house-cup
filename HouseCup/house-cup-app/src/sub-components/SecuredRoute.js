import React from 'react';
import { Route } from 'react-router-dom';
import auth from '../Auth';
import LandingPage from './landingPage';

function SecuredRoute(props) {
  const { component: Component, path } = props;
  return (
    <Route
      path={path}
      render={() => {
        if (!auth.isAuthenticated()) {
          auth.login();
          return <LandingPage />;
        }
        return <Component />;
      }}
    />
  );
}

export default SecuredRoute;
