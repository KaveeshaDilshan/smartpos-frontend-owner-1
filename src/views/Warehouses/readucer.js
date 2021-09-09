import * as actionTypes from './actionTypes';

const initialState = {
  warehouses: [],
  loading: false,
};

const warehouseReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_WAREHOUSE_SUCCESS:
      return {
        ...state,
        warehouses: [...state.warehouses, ...action.payload],
        loading: true,
      };

    default:
      return state;
  }
};

export default warehouseReducer;
