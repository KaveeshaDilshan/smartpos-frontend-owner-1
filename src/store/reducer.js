import { combineReducers } from 'redux';
import warehouseReducer from '../views/adminPages/Warehouses/reducer';
import salespersonsReducer from '../views/managerPages/Salespersons/redux/salespersonsReducer';
import categoryReducer from '../views/managerPages/Category/redux/categoryReducer';
import productReducer from '../views/managerPages/Products/redux/productReducer';
import managerReducer from '../views/adminPages/Managers/reducer';

const rootReducer = combineReducers({
  // appReducer: appReducer,
  warehouseReducer,
  managerReducer,
  salespersonsReducer,
  categoryReducer,
  productReducer,
});

export default rootReducer;
