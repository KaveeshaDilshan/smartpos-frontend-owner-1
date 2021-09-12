import * as actionTypes from './actionTypes';

const initialState = {
  manager: {},
  managers: [],
};

const managerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ONE_MANAGER_SUCCESS:
      return {
        ...state,
        manager: action.payload,
      };
    case actionTypes.GET_ALL_MANAGERS_SUCCESS:
      return {
        ...state,
        managers: [...action.payload.items],
      };
    default:
      return initialState;
  }
};

export default managerReducer;
