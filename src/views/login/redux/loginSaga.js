import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import axios from '../../../axios/axios';
import * as actionTypes from './loginActionsType';
import { auth } from '../../../const/firebase.config';

const loginUserCall = async (data) => {
  const { email, password } = data;

  // console.log(email, password);
  const { user } = await auth.signInWithEmailAndPassword(email, password);
  const token = await auth.currentUser.getIdToken(/* forceRefresh */ true);
  // console.log(token);
  localStorage.setItem('idToken', token);
  if (!user.uid) {
    throw new Error('user not exist');
  }
  return user.uid;
};

export function* loginUser(action) {
  try {
    const uid = yield call(loginUserCall, action.data);
    const { data } = yield axios.get(`/users/me/${uid}`);
    yield put({
      type: actionTypes.LOGIN_SUCCESS,
      data,
    });
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

function* UserSagas() {
  yield takeLatest(actionTypes.LOGIN, loginUser);
  yield takeLatest(actionTypes.LOGOUT, logoutUser);
}

const userSagas = [UserSagas];

export default userSagas;
