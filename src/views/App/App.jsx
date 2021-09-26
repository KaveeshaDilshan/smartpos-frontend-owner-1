import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import routes from '../../routes';
import LoginForm from '../login/LoginForm';

function App() {
  const { isLoggedIn } = useSelector((state) => state.loginReducer);

  return (
    <>
      {isLoggedIn ? (
        routes.map((route, key) => {
          return (
            <Route
              exact={true}
              path={route.layout + route.path}
              component={route.render}
              key={key}
            />
          );
        })
      ) : (
        <Route exact={true} path="/login" component={LoginForm} />
      )}
    </>
  );
}

export default App;
