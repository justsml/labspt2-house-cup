import React from 'react';
import { Route } from 'react-router-dom';
import auth from '../Auth';
import LandingPage from './LandingPage';

function SecuredRoute({ component: Component, ...rest }) {
  // const { component: Component, path } = props;
  const {id, path} = {...rest};
 
  return (
    <Route
      path={path}
      render={(props) => {
        if (!auth.isAuthenticated()) {
          auth.login();
          return <LandingPage />;
        }
        return <Component id={id} />;
      }}
    />
  );
}
export default SecuredRoute;
// function SecuredRoute(props) {
//   const { component: Component, path } = props;
//   return (
//     <Route
//       path={path}
//       render={() => {
//         if (!auth.isAuthenticated()) {
//           auth.login();
//           return <LandingPage />;
//         }
//         return <Component />;
//       }}
//     />
//   );
// }

// const SecretRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={(props) => (
//     AuthService.isAuthenticated === true
//       ? <Component {...props} />
//       : <Redirect to={{
//           pathname: '/login',
//           state: { from: props.location }
//         }} />
//   )} />
// );


