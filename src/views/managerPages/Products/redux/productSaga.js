import axios from 'axios';
import { toast } from 'react-toastify';
import { call, put } from 'redux-saga/effects';
import * as actionTypes from './productActionTypes';
import { BASE_URL } from '../../../utils/config';

export function* getAllProducts() {
  try {
    const { data } = yield axios.get(`${BASE_URL}/product?sortBy=+name`);
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
  const result = await axios.get(`${BASE_URL}/product/${id}`);
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
    yield axios.post(`${BASE_URL}/product`, action.data);
    yield put({
      type: actionTypes.ADD_PRODUCT_SUCCESS,
    });

    toast.success('new product is added successfuly');
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
    yield axios.patch(`${BASE_URL}/product/${id}`, action.data.details);
    const { data } = yield call(getOneProductCall, id);
    yield put({
      type: actionTypes.UPDATE_PRODUCT_SUCCESS,
      data,
    });

    toast.success('product is updated successfuly');
  } catch (error) {
    console.log(error);
    toast.error(error.response);
    yield put({
      type: actionTypes.UPDATE_PRODUCT_ERROR,
    });
  }
}

function* ManagerProductSagas() {
  yield takeLatest(productActionTypes.GET_ALL_PRODUCTS, getAllProducts);
  yield takeLatest(productActionTypes.ADD_PRODUCT, addProduct);
  yield takeLatest(productActionTypes.GET_ONE_PRODUCT, getOneProduct);
  yield takeLatest(productActionTypes.UPDATE_PRODUCT, updateProduct);
}

const managerProductSagas = [ManagerProductSagas];

export default managerProductSagas;
