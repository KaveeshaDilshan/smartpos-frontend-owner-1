import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import App from './App';
import configureStore from './store/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
// eslint-disable-next-line import/order
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const store = configureStore();
const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <ToastContainer autoClose={3000} hideProgressBar position="top-right" />
    <App history={history} />
  </Provider>,
  document.getElementById('root')
);
