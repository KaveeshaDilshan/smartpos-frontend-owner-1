import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import configureStore from './store/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
// eslint-disable-next-line import/order
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { store, persister } = configureStore();
const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persister}>
      <ToastContainer autoClose={3000} hideProgressBar position="top-right" />
      <App history={history} />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
