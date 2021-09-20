import { all, fork } from 'redux-saga/effects';
import warehouseSagas from '../views/adminPages/Warehouses/saga';
import managerCategorySagas from '../views/managerPages/Category/redux/categorySaga';
import managerProductSagas from '../views/managerPages/Products/redux/productSaga';
import managerSagas from '../views/adminPages/Managers/saga';

export default function* rootSaga() {
  // yield all(appSagas.map((s) => fork(s)));
  yield all(warehouseSagas.map((s) => fork(s)));
  yield all(managerSagas.map((s) => fork(s)));
  yield all(managerCategorySagas.map((s) => fork(s)));
  yield all(managerProductSagas.map((s) => fork(s)));
}
