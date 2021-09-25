import * as actionTypes from './actionTypes';

export const getAllSalesperson = (data) => {
  return { type: actionTypes.GET_ALL_SALESPERSONS, payload: data };
};

export const getOneSalesperson = (data) => {
  return { type: actionTypes.GET_ONE_SALESPERSON_DETAILS, payload: data };
};

export const getOneSalespersonAnalytics = (data) => {
  return {
    type: actionTypes.GET_ONE_SALESPERSON_ANALYTICS_SALES,
    payload: data,
  };
};

export const getOneSalespersonProducts = (data) => {
  return {
    type: actionTypes.GET_ONE_SALESPERSON_PRODUCTS_ONE_DAY,
    payload: data,
  };
};
