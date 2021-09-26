import { all, fork } from 'redux-saga/effects';
import warehouseSagas from '../views/adminPages/Warehouses/saga';
import managerCategorySagas from '../views/managerPages/Category/redux/categorySaga';
import managerProductSagas from '../views/managerPages/Products/redux/productSaga';
import managerSagas from '../views/adminPages/Managers/saga';
import managerLeavesSagas from '../views/managerPages/Leaves/redux/leavesSaga';
import managerSalespersonsSagas from '../views/managerPages/Salespersons/redux/salespersonsSaga';
import salespersonSagas from '../views/adminPages/Salespersons/saga';
import managerWarehouseSagas from '../views/managerPages/Warehouse/redux/warehouseSaga';
import managerSalesSagas from '../views/managerPages/Sales/redux/salesSaga';
import managerDashboardSagas from '../views/managerPages/Dashboard/redux/dashboardSaga';
import userSagas from '../views/login/redux/loginSaga';

export default function* rootSaga() {
  // yield all(appSagas.map((s) => fork(s)));
  yield all(warehouseSagas.map((s) => fork(s)));
  yield all(managerSagas.map((s) => fork(s)));
  yield all(managerCategorySagas.map((s) => fork(s)));
  yield all(managerProductSagas.map((s) => fork(s)));
  yield all(managerLeavesSagas.map((s) => fork(s)));
  yield all(managerSalespersonsSagas.map((s) => fork(s)));
  yield all(salespersonSagas.map((s) => fork(s)));
  yield all(managerWarehouseSagas.map((s) => fork(s)));
  yield all(managerSalesSagas.map((s) => fork(s)));
  yield all(managerDashboardSagas.map((s) => fork(s)));
  yield all(userSagas.map((s) => fork(s)));
}
