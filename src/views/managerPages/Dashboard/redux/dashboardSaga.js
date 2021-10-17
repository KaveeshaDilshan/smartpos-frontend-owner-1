import axios from 'axios';
import { toast } from 'react-toastify';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './dashboardActionTypes';
import { BASE_URL } from '../../../../const/config';
import { auth } from '../../../../const/firebase.config';

export function* getWarehouseSales(action) {
  const { warehouseID, startDate, endDate } = action.data;
  try {
    const { data } = yield axios.get(
      `${BASE_URL}/manager/sales/warehousesales/${warehouseID}/?startDate=${startDate}&endDate=${endDate}`
    );
    const sales = Object.keys(data).map((key, index) => ({
      date: key,
      totalSales: data[key].totalIncome,
    }));
    yield put({
      type: actionTypes.GET_WAREHOUSE_SALES_SUCCESS,
      sales,
    });
  } catch (error) {
    toast.error(error.response.data.message);
    yield put({
      type: actionTypes.GET_WAREHOUSE_SALES_ERROR,
    });
  }
}

const getManagerWarehouseCall = async (id) => {
  return axios.get(`${BASE_URL}/manager/warehouse/${id}/details`);
};

export function* getManagerWarehouse(action) {
  const id = action.data;
  try {
    const { data } = yield call(getManagerWarehouseCall, id);
    const warehouse = data.result;
    yield put({
      type: actionTypes.M_GET_MANAGER_WAREHOUSE_SUCCESS,
      warehouse,
    });
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

function* ManagerDashboardSagas() {
  yield takeLatest(actionTypes.GET_WAREHOUSE_SALES, getWarehouseSales);
  yield takeLatest(actionTypes.M_GET_MANAGER_WAREHOUSE, getManagerWarehouse);
}

const managerDashboardSagas = [ManagerDashboardSagas];

export default managerDashboardSagas;
