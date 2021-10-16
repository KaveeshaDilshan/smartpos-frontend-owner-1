import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import routes from '../../routes';
import LoginForm from '../login/LoginForm';
import { BASE_ADMIN_ROUTE, BASE_MANAGER_ROUTE } from '../../const/config';

function App() {
  const { user } = useSelector((state) => state.loginReducer);
  const allRoutes = (currentUser) => {
    if (currentUser && currentUser.role === 'admin') {
      return routes
        .filter((route) => route.layout === BASE_ADMIN_ROUTE)
        .map((route, key) => {
          return (
            <>
              <Route
                exact={true}
                path={route.layout + route.path}
                component={route.render}
                key={key}
              />
              <Redirect to="/admin" />
            </>
          );
        });
    }
    if (currentUser && currentUser.role === 'manager') {
      return routes
        .filter((route) => route.layout === BASE_MANAGER_ROUTE)
        .map((route, key) => {
          return (
            <>
              <Route
                exact={true}
                path={route.layout + route.path}
                component={route.render}
                key={key}
              />
              <Redirect to="/manager/dashboard" />
            </>
          );
        });
    }

    return (
      <>
        <Route exact={true} path="*" component={LoginForm} key="login" />
        <Redirect to="/login" />
      </>
    );
  };

  return <>{allRoutes(user)}</>;
}

export default App;
