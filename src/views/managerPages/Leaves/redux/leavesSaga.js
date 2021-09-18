import axios from 'axios';
import { toast } from 'react-toastify';
import { put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './leavesActionTypes';
import { BASE_URL } from '../../../../const/config';

export function* getLeaves(action) {
  const search = action.data;
  try {
    const { data } = yield axios.get(
      `${BASE_URL}/manager/leaves?sortBy=+name&query=${search}`
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
