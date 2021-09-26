import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import config from './config.json';

const app = firebase.initializeApp(config.FIREBASE_CONFIG);
export const auth = firebase.auth();
export const storage = firebase.storage(app);
