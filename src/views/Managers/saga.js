import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import * as actionTypes from './actionTypes';
import { BASE_URL } from '../../const/config';
import { auth } from '../../const/firebase.config';

const getOneManager = async (id) => {
  const result = await axios.get(`${BASE_URL}/managers/${id}`);
  return result;
};

export function* handleGetOneManager(action) {
  const id = action.payload;
  try {
    const result = yield call(getOneManager, id);
    yield put({ type: actionTypes.GET_ONE_MANAGER_SUCCESS, payload: result });
  } catch (error) {
    console.log(error, '17 saga manager');
  }
}

const getAllManagers = async () => {
  auth
    .createUserWithEmailAndPassword('mahela@gmail.com', 'mahela')
    .then((userCredential) => {
      const { user } = userCredential;
      console.log(user, 'ww');
    })
    .catch((error) => {
      console.log(error);
      // ..
    });

  auth
    .signInWithEmailAndPassword('mahela@gmail.com', 'mahela')
    .then((userCredential) => {
      const { user } = userCredential;
      console.log(user, 'gg');
      console.log(user.getIdToken());
      // ...
    })
    .catch((error) => {
      console.log(error);
    });

  const result = await axios.get(`${BASE_URL}/managers/?sortBy=+createdAt`);
  return result;
};

export function* handleGetAllManagers() {
  try {
    const result = yield call(getAllManagers);
    yield put({
      type: actionTypes.GET_ALL_MANAGERS_SUCCESS,
      payload: result.data,
    });
  } catch (error) {
    console.log(error, '30 sasga manager');
  }
}

function* watchManagerSagas() {
  yield takeLatest(actionTypes.GET_ONE_MANAGER, handleGetOneManager);
  yield takeLatest(actionTypes.GET_ALL_MANAGERS, handleGetAllManagers);
}

const managerSagas = [watchManagerSagas];

export default managerSagas;
