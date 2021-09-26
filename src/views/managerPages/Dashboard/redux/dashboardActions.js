import * as actionTypes from './dashboardActionTypes';

export function getWarehouseSales(data) {
  return { type: actionTypes.GET_WAREHOUSE_SALES, data };
}
