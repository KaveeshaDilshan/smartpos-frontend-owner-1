import * as actionTypes from './loginActionsType';

const initialState = {
  user: [],
  isLoggedIn: true,
  loading: false,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.data,
        isLoggedIn: true,
        loading: false,
      };
    default:
      return state;
  }
};

export default loginReducer;
