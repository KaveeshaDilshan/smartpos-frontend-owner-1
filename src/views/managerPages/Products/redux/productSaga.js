import axios from 'axios';
import { toast } from 'react-toastify';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './productActionTypes';
import { BASE_URL } from '../../../../const/config';

export function* getAllProducts(action) {
  const { search, category } = action.data;
  let filter = 'archived eq false';
  if (category) {
    filter = `categoryId eq ${category},archived eq false`;
  }
  try {
    const { data } = yield axios.get(
      `${BASE_URL}/manager/product?sortBy=+name&query=${search}&filter=${filter}`
    );
    yield put({
      type: actionTypes.GET_ALL_PRODUCTS_SUCCESS,
      data,
    });
  } catch (error) {
    toast.error(error.response.data.message);
    yield put({
      type: actionTypes.GET_ALL_PRODUCTS_ERROR,
    });
  }
}

const getOneProductCall = async (id) => {
  const result = await axios.get(`${BASE_URL}/manager/product/${id}`);
  return result;
};

export function* getOneProduct(action) {
  const id = action.data;
  try {
    const { data } = yield call(getOneProductCall, id);
    yield put({
      type: actionTypes.GET_ONE_PRODUCT_SUCCESS,
      data,
    });
  } catch (error) {
    toast.error(error.response.data.message);
    yield put({
      type: actionTypes.GET_ONE_PRODUCT_ERROR,
    });
  }
}

export function* addProduct(action) {
  try {
    yield axios.post(`${BASE_URL}/manager/product`, action.data);
    yield put({
      type: actionTypes.ADD_PRODUCT_SUCCESS,
    });

    toast.success('New product is added successfully');
  } catch (error) {
    toast.error(error.response.data.message);
    yield put({
      type: actionTypes.ADD_PRODUCT_ERROR,
    });
  }
}

export function* updateProduct(action) {
  const { id } = action.data;
  try {
    yield axios.patch(`${BASE_URL}/manager/product/${id}`, action.data.details);
    const { data } = yield call(getOneProductCall, id);
    yield put({
      type: actionTypes.UPDATE_PRODUCT_SUCCESS,
      data,
    });

    toast.success('Product is updated successfully');
  } catch (error) {
    toast.error(error.response);
    yield put({
      type: actionTypes.UPDATE_PRODUCT_ERROR,
    });
  }
}

export function* deleteProduct(action) {
  const id = action.data;
  try {
    yield axios.delete(`${BASE_URL}/manager/product/${id}`);
    toast.success('Product is successfully deleted');
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

function* ManagerProductSagas() {
  yield takeLatest(actionTypes.GET_ALL_PRODUCTS, getAllProducts);
  yield takeLatest(actionTypes.ADD_PRODUCT, addProduct);
  yield takeLatest(actionTypes.GET_ONE_PRODUCT, getOneProduct);
  yield takeLatest(actionTypes.UPDATE_PRODUCT, updateProduct);
  yield takeLatest(actionTypes.DELETE_PRODUCT, deleteProduct);
}

const managerProductSagas = [ManagerProductSagas];

export default managerProductSagas;
