import axios from 'axios';
import { BASE_URL } from '../const/config';

const idToken = localStorage.getItem('idToken');
const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${idToken}`,
  },
});

export default instance;
