import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import * as actionTypes from './actionTypes';
import { BASE_URL } from '../../const/config';
// import { auth } from '../../const/firebase.config';

const getOneManager = async (id) => {
  const result = await axios.get(`${BASE_URL}/admin/managers/${id}`);
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
  // auth
  //   .createUserWithEmailAndPassword('mahela@gmail.com', 'mahela')
  //   .then((userCredential) => {
  //     const { user } = userCredential;
  //     console.log(user, 'ww');
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     // ..
  //   });
  //
  // auth
  //   .signInWithEmailAndPassword('mahela@gmail.com', 'mahela')
  //   .then((userCredential) => {
  //     const { user } = userCredential;
  //     console.log(user, 'gg');
  //     console.log(user.getIdToken());
  //     // ...
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  const result = await axios.get(
    `${BASE_URL}/admin/managers/?sortBy=+createdAt`
  );
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

const addManager = async (data) => {
  await axios.post(`${BASE_URL}/users/register`, data);
};

export function* handleAddManager(action) {
  console.log(action);
  try {
    yield call(addManager, action.payload);
  } catch (error) {
    console.log(error);
  }
}

function* watchManagerSagas() {
  yield takeLatest(actionTypes.ADD_MANAGER, handleAddManager);
  yield takeLatest(actionTypes.GET_ONE_MANAGER, handleGetOneManager);
  yield takeLatest(actionTypes.GET_ALL_MANAGERS, handleGetAllManagers);
}

const managerSagas = [watchManagerSagas];

export default managerSagas;
