import { BrowserRouter, Switch } from 'react-router-dom';
import React from 'react';
import Routes from './views/App/App';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Routes />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
