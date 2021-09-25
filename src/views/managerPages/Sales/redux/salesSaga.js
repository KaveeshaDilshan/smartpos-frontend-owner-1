import axios from 'axios';
import { toast } from 'react-toastify';
import { put, takeLatest } from 'redux-saga/effects';
import { BASE_URL } from '../../../../const/config';
import * as actionTypes from './salesActionTypes';

export function* getSalespersonsSales(action) {
  const { warehouseId, startDate, endDate } = action.data;
  try {
    const { data } = yield axios.get(
      `${BASE_URL}/manager/sales/warehouse/${warehouseId}?startDate=${startDate}&endDate=${endDate}`
    );
    console.log(data);
    yield put({
      type: actionTypes.GET_SALESPERSONS_SALES_BY_DATE_RANGE_SUCCESS,
      data,
    });
  } catch (error) {
    toast.error(error.response.data.message);
    yield put({
      type: actionTypes.GET_SALESPERSONS_SALES_BY_DATE_RANGE_ERROR,
    });
  }
}

function* ManagerSalesSagas() {
  yield takeLatest(
    actionTypes.GET_SALESPERSONS_SALES_BY_DATE_RANGE,
    getSalespersonsSales
  );
}

const managerSalesSagas = [ManagerSalesSagas];

export default managerSalesSagas;
