import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import moment from 'moment';
import * as actionTypes from './actionTypes';
import axios from '../../../axios/axios';
import { BASE_URL } from '../../../const/config';

const getSalespersonLeaderboard = async () => {
  const result = await axios.get(
    `${BASE_URL}/admin/salespersons/analyticsByIncome-range?startDate=2021-08-05T19:08:44.274Z&order=asc&endDate=2021-09-23T19:08:44.274Z`
  );
  console.log(result);
};

export function* handleGetSalespersonLeaderboard(action) {
  try {
    yield call(getSalespersonLeaderboard);
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
