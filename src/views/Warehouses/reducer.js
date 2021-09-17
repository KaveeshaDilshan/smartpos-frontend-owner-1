import * as actionTypes from './actionTypes';

const initialState = {
  warehouses: [],
  managers: [],
  loading: false,
  warehouse: {},
};

const warehouseReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_WAREHOUSE_SUCCESS:
      return {
        ...state,
        warehouses: [...action.payload],
        loading: true,
      };
    case actionTypes.GET_ONE_WAREHOUSE_SUCCESS:
      return { ...state, warehouse: action.payload };
    default:
      return state;
  }
};

export default warehouseReducer;
