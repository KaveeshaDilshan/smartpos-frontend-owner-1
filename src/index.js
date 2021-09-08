import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import App from './App';
import configureStore from './store/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const store = configureStore();
const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App history={history} />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
