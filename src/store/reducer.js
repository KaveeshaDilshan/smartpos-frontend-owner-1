import { combineReducers } from 'redux';
import warehouseReducer from '../views/adminPages/Warehouses/reducer';
import salespersonsReducer from '../views/managerPages/Salespersons/redux/salespersonsReducer';
import categoryReducer from '../views/managerPages/Category/redux/categoryReducer';
import productReducer from '../views/managerPages/Products/redux/productReducer';
import managerReducer from '../views/adminPages/Managers/reducer';
import leavesReducer from '../views/managerPages/Leaves/redux/leavesReducer';
import dashboardReducer from '../views/managerPages/Dashboard/redux/dashboardReducer';

const rootReducer = combineReducers({
  // appReducer: appReducer,
  warehouseReducer,
  managerReducer,
  salespersonsReducer,
  categoryReducer,
  productReducer,
  leavesReducer,
  dashboardReducer,
});

export default rootReducer;
