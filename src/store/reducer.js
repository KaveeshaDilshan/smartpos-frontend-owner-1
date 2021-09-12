import { combineReducers } from 'redux';
import warehouseReducer from '../views/Warehouses/reducer';
import managerReducer from '../views/Managers/reducer';

const rootReducer = combineReducers({
  // appReducer: appReducer,
  warehouseReducer,
  managerReducer,
});

export default rootReducer;
