import * as actionTypes from './salesActionTypes';

const initialState = {
  sales: [],
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_SALESPERSONS_SALES_BY_DATE_RANGE:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_SALESPERSONS_SALES_BY_DATE_RANGE_SUCCESS:
      return {
        ...state,
        sales: [...action.data.incomes],
        loading: false,
      };
    case actionTypes.GET_SALESPERSONS_SALES_BY_DATE_RANGE_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}

export default reducer;
