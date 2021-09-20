import axios from 'axios';
import { toast } from 'react-toastify';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './salespersonsActionTypes';
import { BASE_URL } from '../../../../const/config';

export function* getAllSalespersons(action) {
  const search = action.data;
  try {
    const { data } = yield axios.get(
      `${BASE_URL}/manager/salespersons?sortBy=+name&query=${search}`
    );
    yield put({
      type: actionTypes.GET_ALL_SALESPERSONS_SUCCESS,
      data,
    });
  } catch (error) {
    toast.error(error.response.data.message);
    yield put({
      type: actionTypes.GET_ALL_SALESPERSONS_ERROR,
    });
  }
}

const getOneSalespersonCall = async (id) => {
  const result = await axios.get(`${BASE_URL}/manager/salespersons/${id}`);
  return result;
};

export function* getOneSalesperson(action) {
  const id = action.data;
  try {
    const { data } = yield call(getOneSalespersonCall, id);
    yield put({
      type: actionTypes.GET_ONE_SALESPERSON_SUCCESS,
      data,
    });
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

export function* addSalesperson(action) {
  console.log(action.data);
  try {
    yield axios.post(`${BASE_URL}/manager/salespersons`, action.data);
    toast.success('New Salesperson is added successfully');
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

function* ManagerSalespersonsSagas() {
  yield takeLatest(actionTypes.GET_ALL_SALESPERSONS, getAllSalespersons);
  yield takeLatest(actionTypes.GET_ONE_SALESPERSON, getOneSalesperson);
  yield takeLatest(actionTypes.ADD_SALESPERSON, addSalesperson);
}

const managerSalespersonsSagas = [ManagerSalespersonsSagas];

export default managerSalespersonsSagas;
