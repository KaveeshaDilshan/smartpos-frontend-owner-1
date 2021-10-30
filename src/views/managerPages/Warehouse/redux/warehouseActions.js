import * as actionTypes from './warehouseActionTypes';

export const getAllWarehouseProducts = (data) => {
  return {
    type: actionTypes.GET_ALL_WAREHOUSE_PRODUCTS,
    data,
  };
};

export const addProductToWarehouse = (data) => {
  return {
    type: actionTypes.ADD_PRODUCT_TO_WAREHOUSE,
    data,
  };
};

export const changeWarehouseProductQuantity = (data) => {
  return {
    type: actionTypes.CHANGE_WAREHOUSE_PRODUCT_QUANTITY,
    data,
  };
};

export const deleteWarehouseProduct = (data) => {
  return {
    type: actionTypes.DELETE_WAREHOUSE_PRODUCT,
    data,
  };
};
