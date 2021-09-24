import * as actionTypes from './salespersonsActionTypes';

const initialState = {
  allSalespersons: [],
  loading: false,
  oneSalesperson: {},
  warehouseShops: [],
  oneSalespersonDailyProducts: [],
  oneSalespersonAssignedShops: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
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
    case actionTypes.GET_WAREHOUSE_SHOPS_SUCCESS:
      return {
        ...state,
        warehouseShops: action.data.shops,
      };
    case actionTypes.GET_SALESPERSON_SHOPS_SUCCESS:
      return {
        ...state,
        oneSalespersonAssignedShops: action.data.shops,
      };
    case actionTypes.GET_SALESPERSON_DAILY_PRODUCTS_SUCCESS:
      return {
        ...state,
        oneSalespersonDailyProducts: action.data.dailyProducts,
      };
    default:
      return state;
  }
}

export default reducer;
