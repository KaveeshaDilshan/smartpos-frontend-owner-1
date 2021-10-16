import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import routes from '../../routes';
import LoginForm from '../login/LoginForm';

function App() {
  const { isLoggedIn } = useSelector((state) => state.loginReducer);

  return (
    <>
      {routes.map((route, key) => {
        console.log(route);
        return (
          <Route
            exact={true}
            path={isLoggedIn ? route.layout + route.path : '/login'}
            component={route.render}
            key={key}
          />
        );
      })}
    </>
  );
}

export default App;
