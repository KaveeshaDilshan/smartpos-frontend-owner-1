import * as actionTypes from './actionTypes';

export const getSalespersonLeaderboard = (data) => {
  return {
    type: actionTypes.GET_SALESPERSON_LEADERBOARD,
    payload: data,
  };
};
