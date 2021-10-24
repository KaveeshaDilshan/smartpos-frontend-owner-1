import * as actionTypes from './dashboardActionTypes';

const initialState = {
  warehouseID: null,
  warehouse: null,
  loading: false,
  warehouseSales: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_WAREHOUSE_SALES:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_WAREHOUSE_SALES_SUCCESS:
      return {
        ...state,
        warehouseSales: action.sales,
        loading: false,
      };
    case actionTypes.GET_WAREHOUSE_SALES_ERROR:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.M_GET_MANAGER_WAREHOUSE_SUCCESS:
      return {
        ...state,
        warehouseID: action.warehouse._id,
        warehouse: action.warehouse,
      };
    default:
      return state;
  }
}

export default reducer;
