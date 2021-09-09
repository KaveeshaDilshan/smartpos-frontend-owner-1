import { combineReducers } from 'redux';
import warehouseReducer from '../views/Warehouses/readucer';

const rootReducer = combineReducers({
  // appReducer: appReducer,
  warehouseReducer,
});

export default rootReducer;
