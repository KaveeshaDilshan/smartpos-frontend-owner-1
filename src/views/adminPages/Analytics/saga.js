import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as actionTypes from './actionTypes';
import axios from '../../../axios/axios';

const getSalespersonLeaderboard = async () => {
  return axios.get(
    `/admin/salespersons/analyticsByIncome-range?startDate=2021-08-05T19:08:44.274Z&order=asc`
  );
};

export function* handleGetSalespersonLeaderboard() {
  try {
    const result = yield call(getSalespersonLeaderboard);
    yield put({
      type: actionTypes.GET_SALESPERSON_LEADERBOARD_SUCCESS,
      payload: result.data,
    });
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

export function* watchAnalyticsSagas() {
  yield takeLatest(
    actionTypes.GET_SALESPERSON_LEADERBOARD,
    handleGetSalespersonLeaderboard
  );
}

const analyticsSagas = [watchAnalyticsSagas];

export default analyticsSagas;
