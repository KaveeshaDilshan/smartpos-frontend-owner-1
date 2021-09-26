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

export const getOneWarehouse = (data) => {
  return {
    type: actionTypes.GET_ONE_WAREHOUSE,
    payload: data,
  };
};

export const getOneWarehouseSuccess = (data) => {
  return {
    type: actionTypes.GET_ONE_WAREHOUSE_SUCCESS,
    payload: data.data.result,
  };
};

export const addWarehouse = (data) => {
  return {
    type: actionTypes.ADD_WAREHOUSE,
    payload: data,
  };
};

export const assignManager = (data) => {
  return {
    type: actionTypes.ASSIGN_MANAGER,
    payload: data,
  };
};

export const getOneWarehouseAnalytics = (data) => {
  return {
    type: actionTypes.GET_ONE_WAREHOUSE_ANALYTICS,
    payload: data,
  };
};
