import * as actionTypes from './loginActionsType';

export function loginUser(data) {
  return { type: actionTypes.LOGIN, data };
}
