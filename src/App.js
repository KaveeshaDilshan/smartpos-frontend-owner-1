import { BrowserRouter, Switch } from 'react-router-dom';
import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import Routes from './views/App/App';
import theme from './util/theme';

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
