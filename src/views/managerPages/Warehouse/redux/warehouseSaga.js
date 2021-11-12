import { toast } from 'react-toastify';
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from '../../../../axios/axios';
import * as actionTypes from './warehouseActionTypes';

const getAllWarehouseProductsCall = async ({ search, warehouseID }) => {
  const result = await axios.get(
    `/manager/warehouse/${warehouseID}?sortBy=+name&query=${search}`
  );
  return result;
};

export function* getAllWarehouseProducts(action) {
  const { search, warehouseID } = action.data;
  try {
    const { data } = yield call(getAllWarehouseProductsCall, {
      search,
      warehouseID,
    });
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
    yield axios.post(`/manager/warehouse/${warehouseID}`, details);
    toast.success('New Product is added to Warehouse');
  } catch (error) {
    toast.error(error.response.data.description);
  }
}

export function* changeWarehouseProductQuantity(action) {
  const { warehouseID, details } = action.data;
  try {
    yield axios.patch(`/manager/warehouse/${warehouseID}`, details);
    toast.success('Product quantity is changed successfully');
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

export function* deleteWarehouseProduct(action) {
  const { warehouseID, productId } = action.data;
  try {
    yield axios.delete(
      `/manager/warehouse/${warehouseID}/product/${productId}`
    );
    const { data } = yield call(getAllWarehouseProductsCall, {
      search: '',
      warehouseID,
    });
    yield put({
      type: actionTypes.DELETE_WAREHOUSE_PRODUCT_SUCCESS,
      data,
    });
    toast.success('Successfully Removed');
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
  yield takeLatest(
    actionTypes.DELETE_WAREHOUSE_PRODUCT,
    deleteWarehouseProduct
  );
}

const managerWarehouseSagas = [ManagerWarehouseSagas];

export default managerWarehouseSagas;
