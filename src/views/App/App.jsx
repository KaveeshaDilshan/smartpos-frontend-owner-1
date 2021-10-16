import React from 'react';
import { Route } from 'react-router-dom';
import routes from '../../routes';
import LoginForm from '../login/LoginForm';
import PrivateRoute from '../../components/common/PrivateRoute';

function App() {
  return (
    <>
      {routes.map((route, key) => {
        return (
          <PrivateRoute
            exact={true}
            path={route.layout + route.path}
            component={route.render}
            key={key}
          />
        );
      })}
      <Route path="/login" component={LoginForm} />
    </>
  );
}

export default App;
