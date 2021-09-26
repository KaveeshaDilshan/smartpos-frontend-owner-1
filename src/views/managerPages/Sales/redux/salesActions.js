import * as actionTypes from './salesActionTypes';

export function getSalespersonsSalesByDateRange(data) {
  return { type: actionTypes.GET_SALESPERSONS_SALES_BY_DATE_RANGE, data };
}
