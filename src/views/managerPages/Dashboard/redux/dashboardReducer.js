import * as actionTypes from './dashboardActionTypes';

const initialState = {
  warehouseID: '6150c8bc497d385c88837f2a',
  warehouse: {
    district: 'Colombo',
    town: 'Colombo',
    telephone: '0571234567',
    name: 'Mahela warehouse',
  },
  loading: false,
  warehouseSales: [],
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
    default:
      return state;
  }
}

export default reducer;
