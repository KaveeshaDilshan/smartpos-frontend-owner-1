import axios from 'axios';
import { toast } from 'react-toastify';
import { put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './categoryActionTypes';
import { BASE_URL } from '../../../../const/config';

export function* getAllCategories() {
  try {
    const { data } = yield axios.get(
      `${BASE_URL}/manager/category?sortBy=+name`
    );
    yield put({
      type: actionTypes.GET_ALL_CATEGORIES_SUCCESS,
      data,
    });
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

export function* addCategory(action) {
  try {
    yield axios.post(`${BASE_URL}/manager/category`, action.data);
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
