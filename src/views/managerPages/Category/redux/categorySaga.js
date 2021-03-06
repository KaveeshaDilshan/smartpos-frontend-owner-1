import { toast } from 'react-toastify';
import { put, takeLatest } from 'redux-saga/effects';
import axios from '../../../../axios/axios';
import * as actionTypes from './categoryActionTypes';

export function* getAllCategories(action) {
  const search = action.data;
  try {
    const { data } = yield axios.get(
      `/manager/category?sortBy=+name&query=${search}`
    );

    yield put({
      type: actionTypes.GET_ALL_CATEGORIES_SUCCESS,
      data,
    });
  } catch (error) {
    if (error.response.data) {
      toast.error('Network Error');
    } else {
      toast.error(error.response.data.message);
    }
  }
}

export function* addCategory(action) {
  try {
    yield axios.post(`/manager/category`, action.data);
    yield put({
      type: actionTypes.ADD_CATEGORY_SUCCESS,
    });
    toast.success('new category sucessfully added');
  } catch (error) {
    toast.error(error.response.data.message);
    yield put({
      type: actionTypes.ADD_CATEGORY_ERROR,
    });
  }
}

function* ManagerCategorySagas() {
  yield takeLatest(actionTypes.GET_ALL_CATEGORIES, getAllCategories);
  yield takeLatest(actionTypes.ADD_CATEGORY, addCategory);
}

const managerCategorySagas = [ManagerCategorySagas];

export default managerCategorySagas;
