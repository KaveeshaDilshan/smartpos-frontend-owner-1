import { takeLatest, call, put, select } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import moment from 'moment';
import * as actionTypes from './actionTypes';
import axios from '../../../axios/axios';
import { getOneWarehouseSuccess, getWarehousesSuccess } from './actions';

const getAllWarehouses = async (search, page) => {
  if (!page) {
    return axios.get(`/admin/warehouse?limit=9&sortBy=+name&query=`);
  }
  return axios.get(
    `/admin/warehouse?sortBy=+name&query=${search}&limit=9&page=${page}`
  );
};

export function* handleGetWarehouses(data) {
  const { search, page } = data.payload;
  try {
    const response = yield call(getAllWarehouses, search, page);
    if (response.status !== 201) {
      toast.error(response.data.message);
    } else {
      yield put(getWarehousesSuccess(response.data));
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

const getOneWarehouse = async (id) => {
  return axios.get(`/admin/warehouse/${id}`);
};

export function* handleGetOneWarehouse(action) {
  const id = action.payload;
  try {
    const result = yield call(getOneWarehouse, id);
    yield put(getOneWarehouseSuccess(result));
  } catch (error) {
    toast.error(error);
  }
}

const addWarehouse = async (data) => {
  await axios.post(`/admin/warehouse`, data);
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
  await axios.patch(`/admin/warehouse/${data.warehouseId}`, {
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

const getOneWarehouseAnalytics = (id, period) => {
  const day = moment().subtract(period, 'day');
  return axios.get(`/admin/warehouse/${id}/analytics?startDate=${day}`);
};

export function* handleGetOneWarehouseAnalytics(action) {
  const { id, period } = action.payload;
  try {
    const result = yield call(getOneWarehouseAnalytics, id, period);
    yield put({
      type: actionTypes.GET_ONE_WAREHOUSE_ANALYTICS_SUCCESS,
      payload: result.data,
    });
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

const removeManager = async (id) => {
  await axios.delete(`/admin/warehouse/${id}`);
};

export function* handleRemoveManager(action) {
  const id = action.payload;
  try {
    yield call(removeManager, id);
    yield put({ type: actionTypes.REMOVE_MANAGER_FROM_WAREHOUSE_SUCCESS });
    toast.success('Successfully removed manager');
  } catch (error) {
    toast.error('Please try again');
  }
}

function* watchWarehouseSagas() {
  yield takeLatest(actionTypes.ASSIGN_MANAGER, handleAssignManager);
  yield takeLatest(actionTypes.ADD_WAREHOUSE, handleAddWarehouse);
  yield takeLatest(actionTypes.GET_WAREHOUSES, handleGetWarehouses);
  yield takeLatest(actionTypes.GET_ONE_WAREHOUSE, handleGetOneWarehouse);
  yield takeLatest(
    actionTypes.GET_ONE_WAREHOUSE_ANALYTICS,
    handleGetOneWarehouseAnalytics
  );
  yield takeLatest(
    actionTypes.REMOVE_MANAGER_FROM_WAREHOUSE,
    handleRemoveManager
  );
}

const warehouseSagas = [watchWarehouseSagas];

export default warehouseSagas;
