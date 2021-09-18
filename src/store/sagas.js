import { all, fork } from 'redux-saga/effects';
import warehouseSagas from '../views/Warehouses/saga';
import managerSagas from '../views/Managers/saga';
import managerCategorySagas from '../views/managerPages/Category/redux/categorySaga';
import managerProductSagas from '../views/managerPages/Products/redux/productSaga';
import managerLeavesSagas from '../views/managerPages/Leaves/redux/leavesSaga';
import managerSalespersonsSagas from '../views/managerPages/Salespersons/redux/salespersonsSaga';

export default function* rootSaga() {
  // yield all(appSagas.map((s) => fork(s)));
  yield all(warehouseSagas.map((s) => fork(s)));
  yield all(managerSagas.map((s) => fork(s)));
  yield all(managerCategorySagas.map((s) => fork(s)));
  yield all(managerProductSagas.map((s) => fork(s)));
  yield all(managerLeavesSagas.map((s) => fork(s)));
  yield all(managerSalespersonsSagas.map((s) => fork(s)));
}
