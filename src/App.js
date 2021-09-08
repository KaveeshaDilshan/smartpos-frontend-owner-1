import { BrowserRouter, Switch } from 'react-router-dom';
import React from 'react';
import Layout from './views/Layout';
import Routes from './views/App/App';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Layout />
        <Routes />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
