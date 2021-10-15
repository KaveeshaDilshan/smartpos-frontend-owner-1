import axios from 'axios';
import { toast } from 'react-toastify';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './salespersonsActionTypes';
import { BASE_URL } from '../../../../const/config';
import { auth } from '../../../../const/firebase.config';

export function* getAllSalespersons(action) {
  const { search, warehouseID, page } = action.data;
  try {
    const { data } = yield axios.get(
      `${BASE_URL}/manager/salespersons/getAll/warehouse/${warehouseID}?sortBy=+firstName&query=${search}&page=${page}`
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

const addSalespersonCall = async (data) => {
  const { user } = await auth.createUserWithEmailAndPassword(
    data.email,
    data.password
  );
  data.uid = user.uid;

  const result = await axios.post(`${BASE_URL}/manager/salespersons`, data);
  return result;
};

export function* addSalesperson(action) {
  try {
    yield call(addSalespersonCall, action.data);
    toast.success('New Salesperson is added successfully');
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.message);
    }
    toast.error(error.message);
  }
}

const editSalespersonCall = async ({ id, details }) => {
  const result = await axios.patch(
    `${BASE_URL}/manager/salespersons/${id}`,
    details
  );
  return result;
};

export function* editSalesperson(action) {
  const { id, details } = action.data;
  try {
    yield call(editSalespersonCall, { id, details });
    toast.success('Salesperson details are edited successfully');
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

export function* getWarehouseShops(action) {
  const warehouseId = action.data;
  try {
    const { data } = yield axios.get(
      `${BASE_URL}/manager/shops/warehouse/${warehouseId}?sortBy=+name`
    );
    yield put({
      type: actionTypes.GET_WAREHOUSE_SHOPS_SUCCESS,
      data,
    });
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

export function* getSalespersonShops(action) {
  const salespersonId = action.data;
  try {
    const { data } = yield axios.get(
      `${BASE_URL}/manager/shops/${salespersonId}`
    );
    yield put({
      type: actionTypes.GET_SALESPERSON_SHOPS_SUCCESS,
      data,
    });
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

export function* addShopsToSalesperson(action) {
  const { id, details } = action.data;
  try {
    yield axios.post(`${BASE_URL}/manager/shops/${id}`, details);
    toast.success('Shops are added successfully');
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

export function* getSalespersonDailyProducts(action) {
  const { id, date } = action.data;
  try {
    const { data } = yield axios.get(
      `${BASE_URL}/manager/dailyproducts/${id}?date=${date}`
    );
    yield put({
      type: actionTypes.GET_SALESPERSON_DAILY_PRODUCTS_SUCCESS,
      data,
    });
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

export function* addDailyProduct(action) {
  const { warehouseId, details } = action.data;
  try {
    yield axios.post(
      `${BASE_URL}/manager/dailyProducts/${warehouseId}`,
      details
    );
    toast.success('Daily Products are updated successfully');
  } catch (error) {
    toast.error(error.response.data.description);
  }
}

function* ManagerSalespersonsSagas() {
  yield takeLatest(actionTypes.GET_ALL_SALESPERSONS, getAllSalespersons);
  yield takeLatest(actionTypes.GET_ONE_SALESPERSON, getOneSalesperson);
  yield takeLatest(actionTypes.ADD_SALESPERSON, addSalesperson);
  yield takeLatest(actionTypes.EDIT_SALESPERSON, editSalesperson);
  yield takeLatest(
    actionTypes.GET_SALESPERSON_DAILY_PRODUCTS,
    getSalespersonDailyProducts
  );
  yield takeLatest(actionTypes.ADD_NEW_DAILY_PRODUCT, addDailyProduct);
  yield takeLatest(actionTypes.ADD_SHOPS_TO_SALESPERSON, addShopsToSalesperson);
  yield takeLatest(actionTypes.GET_WAREHOUSE_SHOPS, getWarehouseShops);
  yield takeLatest(actionTypes.GET_SALESPERSON_SHOPS, getSalespersonShops);
}

const managerSalespersonsSagas = [ManagerSalespersonsSagas];

export default managerSalespersonsSagas;
