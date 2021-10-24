import * as actionTypes from './dashboardActionTypes';

export function getWarehouseSales(data) {
  return { type: actionTypes.GET_WAREHOUSE_SALES, data };
}

export function getManagerWarehouse(data) {
  return { type: actionTypes.M_GET_MANAGER_WAREHOUSE, data };
}
