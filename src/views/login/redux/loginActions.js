import * as actionTypes from './loginActionsType';

export function loginUser(data) {
  return { type: actionTypes.LOGIN, data };
}

export function logoutUser(data) {
  return { type: actionTypes.LOGOUT, data };
}

export function getToken() {
  return { type: actionTypes.GET_TOKEN };
}
