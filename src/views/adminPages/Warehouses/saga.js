import { takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as actionTypes from './actionTypes';
import axios from '../../../axios/axios';
import { BASE_URL } from '../../../const/config';
import { getOneWarehouseSuccess, getWarehousesSuccess } from './actions';

const getAllWarehouses = async (search, page) => {
  const result = await axios.get(
    `${BASE_URL}/admin/warehouse?sortBy=+name&query=${search}&limit=9&page=${page}`
  );
  return result;
};

export function* handleGetWarehouses(data) {
  const { search, page } = data.payload;
  try {
    const response = yield call(getAllWarehouses, search, page);
    if (response.status !== 201) {
      toast.error(response.data.message);
    } else {
      yield put(getWarehousesSuccess(response.data.items));
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
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
    console.log(error);
    toast.error(error);
  }
}

const addWarehouse = async (data) => {
  await axios.post(`${BASE_URL}/admin/warehouse`, data);
};

export function* handleAddWarehouse(action) {
  try {
    yield call(addWarehouse, action.payload);
    toast.success('Successfully added the warehouse', {
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

const assignManager = async (data) => {
  await axios.patch(`${BASE_URL}/admin/warehouse/${data.warehouseId}`, {
    managerId: data.managerId,
  });
};

export function* handleAssignManager(action) {
  const data = action.payload;
  try {
    yield call(assignManager, data);
    toast.success('Successfully assigned the manager', {
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
  yield takeLatest(actionTypes.ASSIGN_MANAGER, handleAssignManager);
  yield takeLatest(actionTypes.ADD_WAREHOUSE, handleAddWarehouse);
  yield takeLatest(actionTypes.GET_WAREHOUSES, handleGetWarehouses);
  yield takeLatest(actionTypes.GET_ONE_WAREHOUSE, handleGetOneWarehouse);
}

const warehouseSagas = [watchWarehouseSagas];

export default warehouseSagas;
