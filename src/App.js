import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Routes from './views/App/App';
import theme from './util/theme';
import { BASE_ADMIN_ROUTE, BASE_MANAGER_ROUTE } from './const/config';
import LoginForm from './views/login/LoginForm';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Switch>
          <Routes />
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
