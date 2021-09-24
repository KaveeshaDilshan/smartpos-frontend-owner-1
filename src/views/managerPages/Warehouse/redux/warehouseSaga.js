import axios from 'axios';
import { toast } from 'react-toastify';
import { put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './warehouseActionTypes';
import { BASE_URL } from '../../../../const/config';

export function* getAllWarehouseProducts(action) {
  const { search, warehouseID } = action.data;

  try {
    const { data } = yield axios.get(
      `${BASE_URL}/manager/warehouse/${warehouseID}?sortBy=+name&query=${search}`
    );

    yield put({
      type: actionTypes.GET_ALL_WAREHOUSE_PRODUCTS_SUCCESS,
      data,
    });
  } catch (error) {
    toast.error(error.response.data.message);
    yield put({
      type: actionTypes.GET_ALL_WAREHOUSE_PRODUCTS_ERROR,
    });
  }
}

export function* addProductToWarehouse(action) {
  const { warehouseID, details } = action.data;
  try {
    yield axios.post(`${BASE_URL}/manager/warehouse/${warehouseID}`, details);
    toast.success('New Product is added to Warehouse');
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

export function* changeWarehouseProductQuantity(action) {
  const { warehouseID, details } = action.data;
  try {
    yield axios.patch(`${BASE_URL}/manager/warehouse/${warehouseID}`, details);
    toast.success('Product quantity is changed successfully');
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

function* ManagerWarehouseSagas() {
  yield takeLatest(
    actionTypes.GET_ALL_WAREHOUSE_PRODUCTS,
    getAllWarehouseProducts
  );
  yield takeLatest(actionTypes.ADD_PRODUCT_TO_WAREHOUSE, addProductToWarehouse);
  yield takeLatest(
    actionTypes.CHANGE_WAREHOUSE_PRODUCT_QUANTITY,
    changeWarehouseProductQuantity
  );
}

const managerWarehouseSagas = [ManagerWarehouseSagas];

export default managerWarehouseSagas;
