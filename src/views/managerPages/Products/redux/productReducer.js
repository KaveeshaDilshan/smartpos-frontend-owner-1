import * as actionTypes from './productActionTypes';

const initialState = {
  allProducts: [],
  loading: false,
  oneProduct: {},
  oneProductLoading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_ALL_PRODUCTS:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        allProducts: [...action.data.items],
      };
    case actionTypes.GET_ALL_PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.GET_ONE_PRODUCT:
      return {
        ...state,
        oneProductLoading: true,
      };
    case actionTypes.GET_ONE_PRODUCT_SUCCESS:
      return {
        ...state,
        oneProductLoading: false,
        oneProduct: action.data.result,
      };
    case actionTypes.GET_ONE_PRODUCT_ERROR:
      return {
        ...state,
        oneProductLoading: false,
      };
    case actionTypes.ADD_PRODUCT:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.ADD_PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.UPDATE_PRODUCT:
      return {
        ...state,
      };
    case actionTypes.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        oneProduct: action.data.result,
      };
    case actionTypes.UPDATE_PRODUCT_ERROR:
      return {
        ...state,
      };
    default:
      return state;
  }
}

export default reducer;
