import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import axios from '../../../axios/axios';
import * as actionTypes from './loginActionsType';
import { auth } from '../../../const/firebase.config';

const loginUserCall = async (data) => {
  const { email, password } = data;
  const { user } = await auth.signInWithEmailAndPassword(email, password);
  const token = await auth.currentUser.getIdToken(/* forceRefresh */ true);
  localStorage.setItem('idToken', token);
  axios.defaults.headers.Authorization = `Bearer ${token}`;
  if (!user.uid) {
    throw new Error('user not exist');
  }
  return user.uid;
};

export function* loginUser(action) {
  const { history } = action.data;
  try {
    const uid = yield call(loginUserCall, action.data);
    const { data } = yield axios.get(`/users/me/${uid}`);
    if (data) {
      if (data.role === 'manager' && data.warehouseId) {
        yield put({
          type: actionTypes.LOGIN_SUCCESS,
          data,
        });
        history.push('/manager/dashboard');
      } else if (data.role === 'admin') {
        yield put({
          type: actionTypes.LOGIN_SUCCESS,
          data,
        });
        history.push('/admin/warehouses');
      } else {
        toast.error('You are not allowed to login');
      }
    }
  } catch (error) {
    if (!error.response) {
      toast.error(error.message);
    } else {
      toast.error(error.response.data.message);
    }
  }
}

const logoutUserCall = async () => {
  await auth.signOut();
};

export function* logoutUser(action) {
  const history = action.data;
  try {
    yield call(logoutUserCall);
    yield put({
      type: actionTypes.LOGOUT_SUCCESS,
    });
    localStorage.clear();
    history.push('/login');
  } catch {
    toast.error('logout error');
  }
}

const getToken = async () => {
  await new Promise((resolve) => {
    auth.onAuthStateChanged((user) => {
      resolve(user);
    });
  });
  if (await auth.currentUser) {
    const idToken = await auth.currentUser.getIdToken(true);
    return idToken;
  }
  return null;
};

export function* handleGetToken() {
  const token = yield call(getToken);
  localStorage.setItem('idToken', token);
}

function* UserSagas() {
  yield takeLatest(actionTypes.LOGIN, loginUser);
  yield takeLatest(actionTypes.LOGOUT, logoutUser);
  yield takeLatest(actionTypes.GET_TOKEN, handleGetToken);
}

const userSagas = [UserSagas];

export default userSagas;
