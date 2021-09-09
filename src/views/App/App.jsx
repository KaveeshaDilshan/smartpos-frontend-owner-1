import React from 'react';
import { Route } from 'react-router-dom';
import routes from '../../routes';

function App() {
  return (
    <>
      {routes.map((route, key) => (
        <Route
          exact={true}
          path={route.layout + route.path}
          component={route.render}
          key={key}
        />
      ))}
    </>
  );
}

export default App;
