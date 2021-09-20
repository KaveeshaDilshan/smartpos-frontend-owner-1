import * as actionTypes from './salespersonsActionTypes';

export function setSalespersonsFilter(filter) {
  return { type: actionTypes.SET_SALESPERSONS_FILTER, filter };
}
export const getOneSalesperson = (data) => {
  return {
    type: actionTypes.GET_ONE_SALESPERSON,
    data,
  };
};

export const getAllSalespersons = (data) => {
  return {
    type: actionTypes.GET_ALL_SALESPERSONS,
    data,
  };
};

export function addSalesperson(data) {
  return { type: actionTypes.ADD_SALESPERSON, data };
}

export function editSalesperson(data) {
  return { type: actionTypes.EDIT_SALESPERSON, data };
}

export function getWarehouseShops(data) {
  return { type: actionTypes.GET_WAREHOUSE_SHOPS, data };
}

export function getSalespersonDailyProducts(data) {
  return { type: actionTypes.GET_SALESPERSON_DAILY_PRODUCTS, data };
}

export function addNewDailyProduct(data) {
  return { type: actionTypes.ADD_NEW_DAILY_PRODUCT, data };
}
