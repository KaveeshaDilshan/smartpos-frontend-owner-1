import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import axios from '../../../axios/axios';
import * as actionTypes from './loginActionsType';
import { auth } from '../../../const/firebase.config';

const loginUserCall = async (data) => {
  const { email, password } = data;

  console.log(email, password);
  const user = await auth.signInWithEmailAndPassword(email, password);

  const token = await auth.currentUser.getIdToken(/* forceRefresh */ true);
  console.log(token);
  localStorage.setItem('idToken', token);
  return user.uid;
};

export function* loginUser(action) {
  const uid = yield call(loginUserCall, action.data);
  if (uid) {
    try {
      const { data } = yield axios.get(`/users/me/${uid}`);
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
