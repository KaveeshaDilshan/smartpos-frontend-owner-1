import { combineReducers } from 'redux';
import warehouseReducer from '../views/adminPages/Warehouses/reducer';
import salespersonsReducer from '../views/managerPages/Salespersons/redux/salespersonsReducer';
import categoryReducer from '../views/managerPages/Category/redux/categoryReducer';
import productReducer from '../views/managerPages/Products/redux/productReducer';
import managerReducer from '../views/adminPages/Managers/reducer';
import leavesReducer from '../views/managerPages/Leaves/redux/leavesReducer';
import dashboardReducer from '../views/managerPages/Dashboard/redux/dashboardReducer';
import adminSalespersonReducer from '../views/adminPages/Salespersons/reducer';
import managerWarehouseReducer from '../views/managerPages/Warehouse/redux/warehouseReducer';
import salesReducer from '../views/managerPages/Sales/redux/salesReducer';
import adminAnalyticsReducer from '../views/adminPages/Analytics/reducer';
import loginReducer from '../views/login/redux/loginReducer';

const rootReducer = combineReducers({
  // appReducer: appReducer,
  warehouseReducer,
  managerReducer,
  adminSalespersonReducer,
  salespersonsReducer,
  categoryReducer,
  productReducer,
  leavesReducer,
  dashboardReducer,
  managerWarehouseReducer,
  salesReducer,
  adminAnalyticsReducer,
  loginReducer,
});

export default rootReducer;
