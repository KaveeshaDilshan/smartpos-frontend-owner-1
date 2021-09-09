import { takeLatest, call, put } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import axios from '../../axios/axios';
import { BASE_URL } from '../../const/config';
import { getWarehousesSuccess } from './actions';

// import { checkErrorResponse } from '../../util/commonFunctions';

const getAllWarehouses = async () => {
  const result = await axios.get(`${BASE_URL}/warehouse?sortBy=+name`);
  return result;
};

export function* handleGetWarehouses() {
  try {
    const response = yield call(getAllWarehouses);
    if (response.status !== 201) {
      console.log('error');
    } else {
      yield put(getWarehousesSuccess(response.data.items));
    }
  } catch (error) {
    // checkErrorResponse(error);
    // yield put(setLoading(false));
    console.log(error);
  }
}

function* watchWarehouseSagas() {
  yield takeLatest(actionTypes.GET_WAREHOUSES, handleGetWarehouses);
}

const warehouseSagas = [watchWarehouseSagas];

export default warehouseSagas;
