import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import config from './config.json';

firebase.initializeApp(config.FIREBASE_CONFIG);
export const storage = firebase.storage();

export const auth = firebase.auth();
