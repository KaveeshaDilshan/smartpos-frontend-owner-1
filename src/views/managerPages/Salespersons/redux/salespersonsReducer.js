import * as actionTypes from './salespersonsActionTypes';

const initialState = {
  salespersonsFilter: '',
  allSalespersons: [],
  loading: false,
  oneSalesperson: {},
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_SALESPERSONS_FILTER:
      return {
        ...state,
        salespersonsFilter: action.filter,
      };
    case actionTypes.GET_ALL_SALESPERSONS:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_ALL_SALESPERSONS_SUCCESS:
      return {
        ...state,
        allSalespersons: [...action.data.items],
        loading: false,
      };
    case actionTypes.GET_ALL_SALESPERSONS_ERROR:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.GET_ONE_SALESPERSON_SUCCESS:
      return {
        ...state,
        oneSalesperson: action.data.result,
      };
    default:
      return state;
  }
}

export default reducer;
