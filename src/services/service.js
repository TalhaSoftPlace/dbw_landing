import axios from 'axios';
import { getCookie } from '../utils';

const config = {
  baseURL: process.env.REACT_APP_API_SERVICE_URL,
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
  },
};

const service = axios.create(config);
service.interceptors.request.use(function (config) {
  const token = getCookie(process.env.REACT_APP_AUTH_COOKIE_NAME);
  if (!!token)
    config.headers[process.env.REACT_APP_AUTH_COOKIE_NAME] = `Bearer ${token}`;
  return config;
});
export { service };
