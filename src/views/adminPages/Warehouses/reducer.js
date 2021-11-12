import * as actionTypes from './actionTypes';

const initialState = {
  warehouses: [],
  managers: [],
  loading: false,
  warehouse: {},
  total: 9,
  warehouseAnalytics: {},
};

const warehouseReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ONE_WAREHOUSE:
      return { ...state, loading: true };
    case actionTypes.GET_WAREHOUSE_SUCCESS:
      return {
        ...state,
        warehouses: [...action.payload.items],
        total: action.payload.totalItems,
      };
    case actionTypes.GET_ONE_WAREHOUSE_SUCCESS:
      return { ...state, warehouse: action.payload, loading: false };
    case actionTypes.GET_ONE_WAREHOUSE_ANALYTICS:
      return {
        ...state,
      };
    case actionTypes.GET_ONE_WAREHOUSE_ANALYTICS_SUCCESS:
      return {
        ...state,
        warehouseAnalytics: { ...action.payload },
        loading: false,
      };
    case actionTypes.REMOVE_MANAGER_FROM_WAREHOUSE_SUCCESS:
      return {
        ...state,
        warehouse: { ...state.warehouse, managerId: undefined },
      };
    default:
      return state;
  }
};

export default warehouseReducer;
