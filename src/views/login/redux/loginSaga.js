import { call, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './loginActionsType';
import { auth } from '../../../const/firebase.config';

const createUser = async () => {
  console.log('hbcsgcv');
  await auth
    .createUserWithEmailAndPassword('ggabc@gmail.com', '123456')
    .then((user) => console.log(user, 'userrrrr'))
    .catch((error) => console.log(error, 'error'));
};

export function* loginUser() {
  yield call(createUser);
}
function* UserSagas() {
  yield takeLatest(actionTypes.LOGIN, loginUser);
}

const userSagas = [UserSagas];

export default userSagas;
