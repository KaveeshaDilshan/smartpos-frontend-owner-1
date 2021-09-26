import * as actionTypes from './actionTypes';

const initialState = {
  manager: {},
  unassignedManagers: [],
  managers: [],
  totalManagers: 9,
  loading: false,
};

const managerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ONE_MANAGER_SUCCESS:
      return {
        ...state,
        manager: action.payload,
      };
    case actionTypes.GET_ALL_MANAGERS:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_ALL_MANAGERS_SUCCESS:
      return {
        ...state,
        managers: [...action.payload.data.items],
        totalManagers: action.payload.data.totalItems,
        loading: false,
      };
    case actionTypes.GET_ALL_UNASSIGNED_MANAGERS:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_ALL_UNASSIGNED_MANAGERS_SUCCESS:
      return {
        ...state,
        unassignedManagers: [...action.payload],
        loading: false,
      };
    default:
      return initialState;
  }
};

export default managerReducer;
