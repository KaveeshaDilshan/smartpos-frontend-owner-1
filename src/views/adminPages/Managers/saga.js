import { call, put, takeLatest, select } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import axios from '../../../axios/axios';

import * as actionTypes from './actionTypes';
import { BASE_URL } from '../../../const/config';
import { auth } from '../../../const/firebase.config';

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
    toast.error(error.response.data.message);
  }
}

const getAllManagers = async (page, filter, warehouse) => {
  if (filter === 'all') {
    return axios.get(
      `${BASE_URL}/admin/managers?sortBy=+firstName&page=${page}&limit=9`
    );
  }
  return axios.get(
    `${BASE_URL}/admin/managers?limit=9&sortBy=+firstName&page=${page}&filter=warehouseId eq ${warehouse}`
  );
};

export function* handleGetAllManagers(data) {
  const { page, filter, warehouse } = data.payload;
  try {
    const result = yield call(getAllManagers, page, filter, warehouse);
    yield put({
      type: actionTypes.GET_ALL_MANAGERS_SUCCESS,
      payload: result,
    });
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

const addManager = async (data) => {
  const { user } = await auth.createUserWithEmailAndPassword(
    data.email,
    data.password
  );
  data.uid = user.uid;
  const result = await axios.post(`${BASE_URL}/users/register`, data);

  return result;
};

export function* handleAddManager(action) {
  try {
    yield call(addManager, action.payload);
    toast.success('Successfully added the manager', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.message);
    }
    toast.error(error.message);
  }
}

const getUnassignedManagers = async () => {
  const result = await axios.get(`${BASE_URL}/admin/managers/unassigned`);
  return result.data;
};

export function* handleGetUnassignedManagers() {
  try {
    const result = yield call(getUnassignedManagers);
    yield put({
      type: actionTypes.GET_ALL_UNASSIGNED_MANAGERS_SUCCESS,
      payload: result.result,
    });
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

function* watchManagerSagas() {
  yield takeLatest(actionTypes.GET_ALL_MANAGERS, handleGetAllManagers);
  yield takeLatest(
    actionTypes.GET_ALL_UNASSIGNED_MANAGERS,
    handleGetUnassignedManagers
  );
  yield takeLatest(actionTypes.ADD_MANAGER, handleAddManager);
  yield takeLatest(actionTypes.GET_ONE_MANAGER, handleGetOneManager);
}

const managerSagas = [watchManagerSagas];

export default managerSagas;
