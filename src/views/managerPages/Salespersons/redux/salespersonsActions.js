import * as actionTypes from './salespersonsActionTypes';

export function setSalespersonsFilter(filter) {
  return { type: actionTypes.SET_SALESPERSONS_FILTER, filter };
}
export function temporary(filter) {
  return { type: actionTypes.SET_SALESPERSONS_FILTER, filter };
}
