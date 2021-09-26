import * as actionTypes from './actionTypes';

const initialState = {
  loading: false,
  salespersonLeaderboard: [],
};

const adminAnalyticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SALESPERSON_LEADERBOARD:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_SALESPERSON_LEADERBOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        salespersonLeaderboard: [...action.payload.incomes],
      };
    default:
      return state;
  }
};

export default adminAnalyticsReducer;
