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
