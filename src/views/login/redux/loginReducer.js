import * as actionTypes from './loginActionsType';

const initialState = {
  user: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.data,
      };
    default:
      return state;
  }
}

export default reducer;
