import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import routes from '../../routes';
import LoginForm from '../login/LoginForm';
import { BASE_ADMIN_ROUTE, BASE_MANAGER_ROUTE } from '../../const/config';
import { getToken } from '../login/redux/loginActions';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getToken());
  }, []);
  const { user } = useSelector((state) => state.loginReducer);
  const allRoutes = (currentUser) => {
    if (currentUser && currentUser.role === 'admin') {
      return (
        <>
          {routes
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
                </>
              );
            })}
          <Route exact={true} path="/login" component={LoginForm} key="login" />
          <Route>
            <Redirect to="/login" />
          </Route>
        </>
      );
    }

    if (currentUser && currentUser.role === 'manager') {
      return (
        <>
          {routes
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
                </>
              );
            })}
          <Route exact={true} path="/login" component={LoginForm} key="login" />
          <Route>
            <Redirect to="/login" />
          </Route>
        </>
      );
    }
    return (
      <>
        <Route exact={true} path="/login" component={LoginForm} key="login" />
        <Redirect to="/login" />
      </>
    );
  };
  return <>{allRoutes(user)}</>;
}

export default App;
