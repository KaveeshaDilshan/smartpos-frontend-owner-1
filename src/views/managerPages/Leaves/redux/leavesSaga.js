import { toast } from 'react-toastify';
import { put, takeLatest } from 'redux-saga/effects';
import axios from '../../../../axios/axios';
import * as actionTypes from './leavesActionTypes';
import { BASE_URL } from '../../../../const/config';

export function* getLeaves(action) {
  const search = action.data;
  try {
    const { data } = yield axios.get(
      `${BASE_URL}/manager/leaves?sortBy=+name&query=${search}&filter=userId.warehouseId eq 6150c8bc497d385c88837f2a`
    );
    yield put({
      type: actionTypes.GET_LEAVES_SUCCESS,
      data,
    });
  } catch (error) {
    toast.error(error.response.data.message);
    yield put({
      type: actionTypes.GET_LEAVES_ERROR,
    });
  }
}

export function* updateLeave(action) {
  const { id } = action.data;
  try {
    yield axios.patch(`${BASE_URL}/manager/leaves/${id}`, action.data.details);
    yield put({
      type: actionTypes.UPDATE_LEAVE_SUCCESS,
    });
    toast.success('Leave request is Updated');
  } catch (error) {
    toast.error(error.response.data.message);
    yield put({
      type: actionTypes.UPDATE_LEAVE_ERROR,
    });
  }
}

function* ManagerLeavesSagas() {
  yield takeLatest(actionTypes.GET_LEAVES, getLeaves);
  yield takeLatest(actionTypes.UPDATE_LEAVE, updateLeave);
}

const managerLeavesSagas = [ManagerLeavesSagas];

export default managerLeavesSagas;
