import { all, fork } from 'redux-saga/effects';
import warehouseSagas from '../views/Warehouses/saga';

export default function* rootSaga() {
  // yield all(appSagas.map((s) => fork(s)));
  yield all(warehouseSagas.map((s) => fork(s)));
}
