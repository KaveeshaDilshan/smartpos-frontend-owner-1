// import * as actionTypes from './salespersonsActionTypes';

const initialState = {
  warehouseID: '61364110017b454634bf0b99',
};

function reducer(state = initialState, action) {
  switch (action.type) {
    // case actionTypes.SET_SALESPERSONS_FILTER:
    //   return {
    //     ...state,
    //     salespersonsFilter: action.filter,
    //   };
    default:
      return state;
  }
}

export default reducer;
