import * as actionTypes from './salespersonsActionTypes';

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

export function getSalespersonShops(data) {
  return { type: actionTypes.GET_SALESPERSON_SHOPS, data };
}

export function addShopsToSalesperson(data) {
  return { type: actionTypes.ADD_SHOPS_TO_SALESPERSON, data };
}

export function getSalespersonDailyProducts(data) {
  return { type: actionTypes.GET_SALESPERSON_DAILY_PRODUCTS, data };
}

export function addDailyProduct(data) {
  return { type: actionTypes.ADD_NEW_DAILY_PRODUCT, data };
}

// export function changeDailyProductCount(data) {
//   return { type: actionTypes.CHANGE_DAILY_PRODUCT_COUNT, data };
// }
