import * as actionTypes from './actionTypes';

export const getOneManager = (data) => {
  return {
    type: actionTypes.GET_ONE_MANAGER,
    payload: data,
  };
};

export const getAllManagers = (data) => {
  return {
    type: actionTypes.GET_ALL_MANAGERS,
    payload: data,
  };
};
