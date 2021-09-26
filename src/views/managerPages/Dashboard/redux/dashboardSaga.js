import axios from 'axios';
import { toast } from 'react-toastify';
import { put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './dashboardActionTypes';
import { BASE_URL } from '../../../../const/config';

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

function* ManagerDashboardSagas() {
  yield takeLatest(actionTypes.GET_WAREHOUSE_SALES, getWarehouseSales);
}

const managerDashboardSagas = [ManagerDashboardSagas];

export default managerDashboardSagas;
