import * as actionTypes from './categoryActionTypes';

const initialState = {
  allCategories: [],
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_ALL_CATEGORIES:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        allCategories: action.data.items,
      };
    case actionTypes.ADD_CATEGORY:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.ADD_CATEGORY_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}

export default reducer;
