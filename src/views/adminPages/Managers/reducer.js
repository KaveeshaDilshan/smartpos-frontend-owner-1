import * as actionTypes from './actionTypes';

const initialState = {
  manager: {},
  unassignedManagers: [],
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
    case actionTypes.GET_ALL_UNASSIGNED_MANAGERS_SUCCESS:
      return {
        ...state,
        unassignedManagers: [...action.payload],
      };
    default:
      return initialState;
  }
};

export default managerReducer;
