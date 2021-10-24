import * as actionTypes from './leavesActionTypes';

const initialState = {
  allLeaves: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_LEAVES:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_LEAVES_SUCCESS:
      return {
        ...state,
        loading: false,
        allLeaves: action.data.items,
      };
    case actionTypes.GET_LEAVES_ERROR:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.UPDATE_LEAVE_SUCCESS:
      return {
        ...state,
      };
    case actionTypes.UPDATE_LEAVE_ERROR:
      return {
        ...state,
      };
    default:
      return state;
  }
}

export default reducer;
