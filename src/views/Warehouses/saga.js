import { takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as actionTypes from './actionTypes';
import axios from '../../axios/axios';
import { BASE_URL } from '../../const/config';
import { getOneWarehouseSuccess, getWarehousesSuccess } from './actions';

// import { checkErrorResponse } from '../../util/commonFunctions';

const getAllWarehouses = async (search) => {
  const result = await axios.get(
    `${BASE_URL}/admin/warehouse?sortBy=+name&query=${search}`
  );
  console.log(result, 'result');
  return result;
};

export function* handleGetWarehouses(data) {
  const search = data.payload;
  try {
    const response = yield call(getAllWarehouses, search);
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

const getOneWarehouse = async (id) => {
  const result = await axios.get(`${BASE_URL}/admin/warehouse/${id}`);
  return result;
};

export function* handleGetOneWarehouse(action) {
  const id = action.payload;
  try {
    const result = yield call(getOneWarehouse, id);
    yield put(getOneWarehouseSuccess(result));
  } catch (error) {
    console.log(error, '33 saga warehouse');
  }
}

const addWarehouse = async (data) => {
  await axios.post(`${BASE_URL}/admin/warehouse`, data);
};

export function* handleAddWarehouse(action) {
  try {
    yield call(addWarehouse, action.payload);
    toast.success('Successfully added the manager', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    window.location.reload();
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

function* watchWarehouseSagas() {
  yield takeLatest(actionTypes.ADD_WAREHOUSE, handleAddWarehouse);
  yield takeLatest(actionTypes.GET_WAREHOUSES, handleGetWarehouses);
  yield takeLatest(actionTypes.GET_ONE_WAREHOUSE, handleGetOneWarehouse);
}

const warehouseSagas = [watchWarehouseSagas];

export default warehouseSagas;
