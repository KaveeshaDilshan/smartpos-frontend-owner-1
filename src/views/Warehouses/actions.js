import * as actionTypes from './actionTypes';

export const getWarehouses = (data) => {
  return {
    type: actionTypes.GET_WAREHOUSES,
    payload: data,
  };
};

export const getWarehousesSuccess = (data) => {
  return {
    type: actionTypes.GET_WAREHOUSE_SUCCESS,
    payload: data,
  };
};
