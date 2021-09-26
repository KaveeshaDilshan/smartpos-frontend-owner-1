import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import axios from 'axios';
import * as actionTypes from './loginActionsType';
import { auth } from '../../../const/firebase.config';
import { BASE_URL } from '../../../const/config';

const loginUserCall = async (data) => {
  const { email, password } = data;
  let uid;
  await auth
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      uid = user.user.uid;
    })
    .catch((error) => toast.error(error.message));
  return uid;
};

export function* loginUser(action) {
  const uid = yield call(loginUserCall, action.data);
  if (uid) {
    try {
      const { data } = yield axios.get(`${BASE_URL}/users/me/${uid}`);
      yield put({
        type: actionTypes.LOGIN_SUCCESS,
        data,
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
}
function* UserSagas() {
  yield takeLatest(actionTypes.LOGIN, loginUser);
}

const userSagas = [UserSagas];

export default userSagas;
