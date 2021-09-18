import * as actionTypes from './leavesActionTypes';

export function getLeaves(data) {
  return { type: actionTypes.GET_LEAVES, data };
}
export function updateLeaves(data) {
  return { type: actionTypes.UPDATE_LEAVE, data };
}
