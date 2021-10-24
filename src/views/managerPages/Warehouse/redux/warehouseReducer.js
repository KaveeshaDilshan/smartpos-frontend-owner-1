import * as actionTypes from './warehouseActionTypes';

const initialState = {
  allWarehouseProducts: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_ALL_WAREHOUSE_PRODUCTS:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_ALL_WAREHOUSE_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        allWarehouseProducts: action.data.products,
      };
    case actionTypes.GET_ALL_WAREHOUSE_PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}

export default reducer;
