import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import moment from 'moment';
import * as actionTypes from './actionTypes';
import axios from '../../../axios/axios';

const getAllSalespersons = async (page, filter, warehouse) => {
  if (filter === 'all') {
    return axios.get(
      `/admin/salespersons?limit=9&sortBy=+firstName&page=${page}`
    );
  }
  return axios.get(
    `/admin/salespersons?limit=9&sortBy=+firstName&page=${page}&filter=warehouseId eq ${warehouse}`
  );
};

export function* handleGetAllSalespersons(action) {
  const { page, filter, warehouse } = action.payload;
  try {
    const result = yield call(getAllSalespersons, page, filter, warehouse);
    yield put({
      type: actionTypes.GET_ALL_SALESPERSONS_SUCCESS,
      payload: result.data,
    });
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

const getOneSalesperson = async (id) => {
  const result = await axios.get(`/admin/salespersons/${id}`);
  return result;
};

export function* handleGetOneSalesperson(action) {
  try {
    const result = yield call(getOneSalesperson, action.payload);
    yield put({
      type: actionTypes.GET_ONE_SALESPERSON_DETAILS_SUCCESS,
      payload: result.data,
    });
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

const getSalesAnalyticsOne = async (id, startDate, endDate) => {
  const result = await axios.get(
    `/admin/salespersons/${id}/analytics/sales/range?startDate=${startDate}&endDate=${endDate}`
  );
  const totalIncome = [];
  const totalQuantity = [];
  const totalSales = [];
  const days = Object.keys(result.data);
  Object.values(result.data).forEach((value) => {
    totalIncome.push(value.totalIncome);
    totalQuantity.push(value.totalQuantity);
    totalSales.push(value.totalSales);
  });
  return { totalIncome, totalQuantity, totalSales, days };
};

export function* handleGetSalesAnalytics(data) {
  const { id, startDate, endDate } = data.payload;
  try {
    const result = yield call(getSalesAnalyticsOne, id, startDate, endDate);
    yield put({
      type: actionTypes.GET_ONE_SALESPERSON_ANALYTICS__SALES_SUCCESS,
      payload: result,
    });
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

const getOneSalespersonProducts = async (id, oneDate) => {
  const result = await axios.get(
    `admin/salespersons/${id}/analytics/products/date?date=${oneDate}`
  );
  return result;
};

export function* handleGetOneSalespersonProducts(data) {
  const { id, oneDate } = data.payload;
  try {
    const result = yield call(getOneSalespersonProducts, id, oneDate);

    yield put({
      type: actionTypes.GET_ONE_SALESPERSON_PRODUCTS_ONE_DAY_SUCCESS,
      payload: {
        data: result.data,
        oneDate: moment(oneDate).format('YYYY-MM-DD'),
      },
    });
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

function* watchSalespersonSagas() {
  yield takeLatest(actionTypes.GET_ALL_SALESPERSONS, handleGetAllSalespersons);
  yield takeLatest(
    actionTypes.GET_ONE_SALESPERSON_DETAILS,
    handleGetOneSalesperson
  );
  yield takeLatest(
    actionTypes.GET_ONE_SALESPERSON_ANALYTICS_SALES,
    handleGetSalesAnalytics
  );
  yield takeLatest(
    actionTypes.GET_ONE_SALESPERSON_PRODUCTS_ONE_DAY,
    handleGetOneSalespersonProducts
  );
}

const salespersonSagas = [watchSalespersonSagas];

export default salespersonSagas;
