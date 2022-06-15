import axios from 'axios';

const BASE_URL = '/api';

export const mySocialAPi = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
});
