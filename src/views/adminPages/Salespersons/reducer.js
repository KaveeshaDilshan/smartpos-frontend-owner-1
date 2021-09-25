import * as actionTypes from './actionTypes';

const initialState = {
  salespersons: [],
  salesperson: {},
  totalSalespersons: 0,
  totalIncome: [],
  days: [],
  totalSales: [],
  totalQuantity: [],
  salespersonProducts: [],
  selectedDate: '',
};

const adminSalespersonReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_SALESPERSONS_SUCCESS:
      return {
        ...state,
        salespersons: [...action.payload.items],
        totalSalespersons: action.payload.totalItems,
        loading: true,
      };
    case actionTypes.GET_ONE_SALESPERSON_DETAILS_SUCCESS:
      return {
        ...state,
        salesperson: { ...action.payload.result },
      };
    case actionTypes.GET_ONE_SALESPERSON_ANALYTICS__SALES_SUCCESS:
      return {
        ...state,
        days: [...action.payload.days],
        totalIncome: [...action.payload.totalIncome],
        totalSales: [...action.payload.totalSales],
        totalQuantity: [...action.payload.totalQuantity],
      };
    case actionTypes.GET_ONE_SALESPERSON_PRODUCTS_ONE_DAY_SUCCESS:
      console.log(action.payload.oneDate);
      return {
        ...state,
        salespersonProducts: [...action.payload.data.products],
        selectedDate: action.payload.oneDate,
      };
    default:
      return state;
  }
};

export default adminSalespersonReducer;
