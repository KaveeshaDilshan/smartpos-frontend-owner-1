import { all, fork } from 'redux-saga/effects';
import warehouseSagas from '../views/Warehouses/saga';
import managerSagas from '../views/Managers/saga';

export default function* rootSaga() {
  // yield all(appSagas.map((s) => fork(s)));
  yield all(warehouseSagas.map((s) => fork(s)));
  yield all(managerSagas.map((s) => fork(s)));
}
