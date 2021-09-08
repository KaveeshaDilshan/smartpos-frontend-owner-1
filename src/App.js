import React from 'react';
import { Redirect } from 'react-router';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routes from './routes';
import { BASE_ROUTE } from './const/config';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {routes.map((route, key) => (
          <Route
            exact
            path={route.layout + route.path}
            component={route.render}
            key={key}
          />
        ))}
        <Redirect to={BASE_ROUTE} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
